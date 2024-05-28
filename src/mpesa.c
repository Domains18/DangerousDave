//
// Created by alpha on 5/28/24.
//


#include <stdio.h>
#include "mpesa.h"
#include <string.h>
#include <curl/curl.h>
#include <stdlib.h>



void init_string(struct string *s){
    s->len = 0;
    s->ptr = malloc(s->len + 1);
    if(s->ptr == NULL){
        fprintf(stderr, "malloc() failed\n");
        exit(EXIT_FAILURE);
    }
    s->ptr[0] = '\0';
}


size_t writefunc(void *ptr, size_t size, size_t nmemb, struct string *s){
    size_t new_len = s->len + size*nmemb;
    s->ptr = realloc(s->ptr, new_len + 1);
    if(s->ptr == NULL){
        fprintf(stderr, "realloc() failed\n");
        exit(EXIT_FAILURE);
    }
    memcpy(s->ptr + s->len, ptr, size*nmemb);
    s->ptr[new_len] = '\0';
    s->len = new_len;

    return size*nmemb;
}

void get_oauth_token(char *consumer_key, char *consumer_secret, struct string *token) {
    CURL *curl;
    CURLcode res;

    curl = curl_easy_init();
    if(curl){
        struct curl_slist *headers = NULL;
        headers = curl_slist_append(headers, "Content-Type: application/json");
        headers = curl_slist_append(headers, "Accept: application/json");

        curl_easy_setopt(curl, CURLOPT_URL, "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials");
        curl_easy_setopt(curl, CURLOPT_USERPWD, consumer_key);
        curl_easy_setopt(curl, CURLOPT_USERPWD, consumer_secret);
        curl_easy_setopt(curl, CURLOPT_HTTPHEADER, headers);
        curl_easy_setopt(curl, CURLOPT_WRITEFUNCTION, writefunc);
        curl_easy_setopt(curl, CURLOPT_WRITEDATA, token);

        res = curl_easy_perform(curl);
        if(res != CURLE_OK){
            fprintf(stderr, "curl_easy_perform() failed: %s\n", curl_easy_strerror(res));
        }

        curl_easy_cleanup(curl);
    }
}


void initiate_stk_push(const char *token){
    CURL *curl;
    CURLcode res;

    curl = curl_easy_init();
    if(curl){
        struct curl_slist *headers = NULL;
        headers = curl_slist_append(headers, "Content-Type: application/json");
        headers = curl_slist_append(headers, "Accept: application/json");
        headers = curl_slist_append(headers, "Authorization: Bearer ");
        headers = curl_slist_append(headers, token);

        curl_easy_setopt(curl, CURLOPT_URL, "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest");
        curl_easy_setopt(curl, CURLOPT_HTTPHEADER, headers);
        curl_easy_setopt(curl, CURLOPT_WRITEFUNCTION, writefunc);

        res = curl_easy_perform(curl);
        if(res != CURLE_OK){
            fprintf(stderr, "curl_easy_perform() failed: %s\n", curl_easy_strerror(res));
        }

        curl_easy_cleanup(curl);
    }
    free(s.ptr);
    curl_global_cleanup();
}