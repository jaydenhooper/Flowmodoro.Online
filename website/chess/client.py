import sys
import pygame

WIDTH = 960
HEIGHT = 540

pygame.init()
screen = pygame.display.set_mode((WIDTH, HEIGHT))
pygame.display.set_caption('Chess')

client_number = 0

def redraw_window():
    screen.fill((255, 255, 255))
    pygame.display.update()

def main():
    while True:
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                pygame.quit()
                sys.exit()

        redraw_window()

if __name__ == "__main__":
    main()  

from pieces import * 
from render import *

P: Abstract_Piece = Pawn(2, 1, 50, 50, True, "/pawn.img")
K: Abstract_Piece = Knight(1, 3, 50, 50, True, "/knight.img")

render_piece(P)
render_piece(K)
