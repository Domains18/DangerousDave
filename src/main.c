#include "../include/lib.h"

struct editorConfig E;

int main(int argc, char *argv[])
{
    enableRawMode();
    initEditor();
    if (argc >= 2)
    {
        editorOpen(argv[1]);
    }
    editorSetStatusMessage("Help: Ctrl-S = save | ctrl-Q = quit | ctrl-F = find");

    while(1)
    {
        editorRefreshScreen();
        editorProcessKeypress();
    }

    return 0;
}