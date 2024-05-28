#include <stdio.h>
#include "mpesa.h"


int main(void){
    struct string token;
    init_string(&token);

    char *consumer_key = "CONSUMER_KEY";
    char *consumer_secret = "CONSUMER_SECRET";

    get_oauth_token(consumer_key, consumer_secret, &token);

    if(token.ptr){
        printf("Token: %s\n", token.ptr);
        initiate_stk_push(token.ptr);
        free(token.ptr);
    }

    return 0;
}