NAME = text-editor
CC = cc
CFLAGS = -Wall -Wextra -Werror -pedantic -std=c99 -g
RM = rm -f

SRC = src/main.c \
	src/terminal.c \
	src/buffer.c \
	src/output.c \
	src/input.c \
	src/init.c \
	src/file.c \
	src/find.c \
	src/row_operations.c \
	src/editor_operations.c
	src/syntax_highlight.c



OBJ = $(SRC:.c=.o)

$(NAME): $(OBJ)
	$(CC) $(CFLAGS) $(OBJ)-o $(NAME) 


clean:
	$(RM) $(OBJ) $(NAME)