function rand(max) {
    return Math.floor(Math.random() * max);
}

 function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--){
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
 }
 
 function changeBrightness(factor, sprite) {
    const virtCanvas = document.createElement("canvas");
    virtCanvas.width = 500;
    virtCanvas.height = 500;
    const context = virtCanvas.getContext("2d");
    context.drawImage(sprite, 0, 0, 500, 500);
  
    const imgData = context.getImageData(0, 0, 500, 500);
  
    for (let i = 0; i < imgData.data.length; i += 4) {
      imgData.data[i] = imgData.data[i] * factor;
      imgData.data[i + 1] = imgData.data[i + 1] * factor;
      imgData.data[i + 2] = imgData.data[i + 2] * factor;
    }
    context.putImageData(imgData, 0, 0);
  
    const spriteOutput = new Image();
    spriteOutput.src = virtCanvas.toDataURL();
    virtCanvas.remove();
    return spriteOutput;
  }  

 function displayVictoryMess(moves) {
    document.getElementById("moves").innerHTML = "You Moved " + moves + " Steps.";
    toggleVisablity("Message-Container");
 }

 function toggleVisablity(id) {
    if (document.getElementById(id).style.visibility == "visible") {
        document.getElementById(id).style.visibility = "hidden";
    } else {
        document.getElementById(id).style.visibility = "visible";
    }
 }

 function Maze(Width, Height) {
    let mazeMap;
    const width = Width;
    const height = Height;
    let startCoord, endCoord;
    const dirs = ["n", "s", "e", "w"];
    const modDir = {
        n: {
            y: -1,
            x: 0,
            o: "s"
        },
        s: {
            y: 1,
            x: 0,
            o: "n"
        },
        e: {
            y: 0,
            x: 1,
            o: "w"
        },
        w: {
            y: 0,
            x: -1,
            o: "e"
        }
    };

    this.map = function() {
        return mazeMap;
    };
    this.startCoord = function() {
        return startCoord;
    };
    this.endCoord = function() {
        return endCoord;
    };

    function genMap() {
        mazeMap = new Array(height);
        for (let y = 0; y < height; y++) {
            mazeMap[y] = new Array(width);
            for (let x = 0; x < width; ++x) {
                mazeMap[y][x] = {
                    n: false,
                    s: false,
                    e: false,
                    w: false,
                    visited: false,
                    priorPos: null
                };
            }
        }
    }

    function defineMaze() {
        let isComp = false;
        let move = false;
        let cellsVisited = 1;
        let numLoops = 0;
        let maxLoops = 0;
        let pos = {
            x: 0,
            y: 0
        };
        const numCells = width * height;
        while (!isComp) {
            move = false;
            mazeMap[pos.x][pos.y].visited = true;

            if (numLoops >= maxLoops) {
                shuffle(dirs);
                maxLoops = Math.round(rand(height / 8));
                numLoops = 0;
            }
            numLoops++;
            for (let index = 0; index < dirs.length; index++) {
                const direction = dirs[index];
                const nx = pos.x + modDir[direction].x;
                const ny = pos.y + modDir[direction].y;

                if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
                    //To check if the title is visited
                    if (!mazeMap[nx][ny].visited) {
                        //Carve through walls from this title to next
                        mazeMap[pos.x][pos.y][direction] = true;
                        mazeMap[nx][ny][modDir[direction].o] = true;

                        //Set Currentcell as next cell's prior visited
                        mazeMap[nx][ny].priorPos = pos;
                        //Update Cell position to newly visited location
                        pos = {
                            x: nx,
                            y: ny
                        };
                        cellsVisited++;
                        //Recursively call this method on the next tile
                        move = true;
                        break;
                    }
                }
            }

            if (!move) {
                // If it failed to find a direction, move to the current position back to the prior cell and recall the method
                pos = mazeMap[pos.x][pos.y].priorPos;
            }
            if (numCells === cellsVisited) {
                isComp = true;
            }
        }
    }

    function defineStartEnd() {
        const positions = [
            { startX: 0, startY: 0, endX: height - 1, endY: width - 1 },
            { startX: 0, startY: width - 1, endX: height - 1, endY: 0 },
            { startX: height - 1, startY: 0, endX: 0, endY: width - 1 },
            { startX: height - 1, startY: width - 1, endX: 0, endY: 0 }
        ];
    
        const randomIndex = Math.floor(Math.random() * positions.length);
        const { startX, startY, endX, endY } = positions[randomIndex];
    
        startCoord = { x: startX, y: startY };
        endCoord = { x: endX, y: endY };
    }    

    genMap();
    defineStartEnd();
    defineMaze();
}

function DrawMaze(Maze, ctx, cellSize, endSprite = null) {
    let map = Maze.map();
    let cellSize = cellSize;
    let drawEndMethod;
    ctx.lineWidth = cellSize / 40;

    this.redrawMaze = function(size) {
        cellSize = size;
        ctx.lineWidth = cellSize / 50;
        drawMap();
        drawEndMethod();
    };

    function drawCell(xCord, yCord, cell) {
        let x = xCord * cellSize;
        let y = yCord * cellSize;

        if (cell.n == false) {
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(x + cellSize, y);
            ctx.stroke();
        }
        if (cell.s === false) {
            ctx.beginPath();
            ctx.moveTo(x, y + cellSize);
            ctx.lineTo(x + cellSize, y + cellSize);
            ctx.stroke();
        }
        if (cell.e === false) {
            ctx.beginPath();
            ctx.moveTo(x + cellSize, y);
            ctx.lineTo(x + cellSize, y + cellSize);
            ctx.stroke();
        }
        if (cell.w === false) {
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(x, y + cellSize);
            ctx.stroke();
        }
    }

    function drawMap() {
        for (let x = 0; x < map.length; x++) {
            for (let y = 0; y < map[x].length; y++) {
                drawCell(x, y, map[x][y]);
            }
        }
    }
  
    function drawEndFlag() {
        let coord = Maze.endCoord();
        let gridSize = 4;
        let fraction = cellSize / gridSize - 2;
        let colorSwap = true;
        for (let y = 0; y < gridSize; y++) {
            if (gridSize % 2 == 0) {
                colorSwap = !colorSwap;
            }
            for (let x = 0; x < gridSize; x++) {
                ctx.beginPath();
                ctx.rect(
                    coord.x * cellSize + x * fraction + 4.5,
                    coord.y * cellSize + y * fraction + 4.5,
                    fraction,
                    fraction
                );
                if (colorSwap) {
                    ctx.fillStyle = "rgba(0, 0, 0, 0.8)";
                } else {
                    ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
                }
                ctx.fill();
                colorSwap = !colorSwap;
            }
        }
    }

    function drawEndSprite() {
        let offsetLeft = cellSize / 50;
        let offsetRight = cellSize / 25;
        let coord = Maze.endCoord();
        ctx.drawImage(
            endSprite,
            2,
            2,
            endSprite.width,
            endSprite.height,
            coord.x * cellSize + offsetLeft,
            coord.y * cellSize + offsetLeft,
            cellSize - offsetRight,
            cellSize - offsetRight
        );
    }      
}