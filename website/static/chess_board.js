

function draw_board() {

    // define useful constants
    const canvas = document.querySelector(".chess_board");
    const maxSize = 650;
    const minSize = 450;
    const smallestDimension = Math.min(window.innerWidth, window.innerHeight);
    const context = canvas.getContext("2d");

    // Set canvas size
    if (smallestDimension > maxSize) {
        size = canvas.height = canvas.width = maxSize - 150;
    } else if (smallestDimension < minSize) {
        size = canvas.height = canvas.width = minSize - 150;
    } else {
        size = canvas.height = canvas.width = smallestDimension - 150;
    }

    // useful drawing variables
    const thickness = size / 200
    const brown = "rgb(150 76 0)"
    const black = "rgb(0 0 0)"
    
    // draw chessboard 
    context.fillStyle = brown;
    context.fillRect(0, 0, size, size);

    // draw outline
    context.strokeStyle = black;
    context.lineWidth = thickness;
    context.strokeRect(0, 0, size, size);
    
    // draw squares
    context.fillStyle = black;
    for (let i = 1; i < 8; i++) {
        const left = size * i / 8
        const top = size * i / 8
        // vertical lines
        context.fillRect(left, 0, thickness, size);
        // horizontal lines
        context.fillRect(0, top, size, thickness);
    }
}

draw_board()