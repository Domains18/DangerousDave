#ifndef RENDERER_H
#define RENDERER_H

#include <SDL2/SDL.h>

void render_map(SDL_Renderer *renderer, SDL_Texture *wallTex,
                SDL_Texture *trophyText);
void render_player(SDL_Renderer *renderer, SDL_Texture *daveTex, int daveX,
                   int daveY);

#endif