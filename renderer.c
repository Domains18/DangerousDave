#include "tiles.h"
#include <SDL2/SDL.h>

void render_map(SDL_Renderer *renderer, SDL_Texture *wallTex,
                SDL_Texture *trophyText) {
  for (int y = 0; y < MAP_HEIGHT; y++) {
    for (int x = 0; x < MAP_WIDTH; x++) {
      SDL_Rect dest = {x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE};

      switch (level1_map[y][x]) {
      case WALL:
        SDL_RenderCopy(renderer, wallTex, NULL, &dest);
        break;
      case TROPHY:
        SDL_RenderCopy(renderer, trophyText, NULL, &dest);
        break;
      }
    }
  }
}

void render_player(SDL_Renderer *renderer, SDL_Texture *daveTex, int daveX,
                   int daveY) {
  SDL_Rect dest = {daveX, daveY, TILE_SIZE, TILE_SIZE};
  SDL_RenderCopy(renderer, daveTex, NULL, &dest);
}