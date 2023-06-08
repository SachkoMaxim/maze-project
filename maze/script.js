const rand = (max) => Math.floor(Math.random() * max);

const shuffle = (a) => {
  for (let i = a.length - 1; i > 0; i--){
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

const changeBrightness = (factor, sprite) => {
  const virtCanvas = document.createElement("canvas");
  virtCanvas.width = 500;
  virtCanvas.height = 500;
  const context = virtCanvas.getContext("2d");
  context.drawImage(sprite, 0, 0, 500, 500);

  const imgData = context.getImageData(0, 0, 500, 500);

  for (let i = 0; i < imgData.data.length; i += 4) {
    imgData.data[i] *= factor;
    imgData.data[i + 1] *= factor;
    imgData.data[i + 2] *= factor;
  }
  context.putImageData(imgData, 0, 0);

  const spriteOutput = new Image();
  spriteOutput.src = virtCanvas.toDataURL();
  virtCanvas.remove();
  return spriteOutput;
};

const displayVictoryMess = (moves) => {
  document.getElementById("moves").innerHTML = "You Moved " + moves + " Steps.";
  toggleVisablity("Message-Container");
};

const toggleVisablity = (id) => {
  if (document.getElementById(id).style.visibility == "visible") {
      document.getElementById(id).style.visibility = "hidden";
  } else {
      document.getElementById(id).style.visibility = "visible";
  }
};

function maze (width, height) {
  let mazeMap;
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

  this.map = () => {
      return mazeMap;
  };
  this.startCoord = () => {
      return startCoord;
  };
  this.endCoord = () => {
      return endCoord;
  };

  const genMap = () => {
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
  };

  const defineMaze = () => {
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
  };

  const defineStartEnd = () => {
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
  };

  genMap();
  defineStartEnd();
  defineMaze();
}

function drawMaze(labyrinth, ctx, cellSized, endSprite = null) {
  const map = labyrinth.map();
  let cellSize = cellSized;
  let drawEndMethod;
  ctx.lineWidth = cellSize / 40;

  this.redrawMaze = (size) => {
      cellSize = size;
      ctx.lineWidth = cellSize / 50;
      drawMap();
      drawEndMethod();
  };

  const drawCell = (xCord, yCord, cell) => {
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
  };

  const drawMap = () => {
      for (let x = 0; x < map.length; x++) {
          for (let y = 0; y < map[x].length; y++) {
              drawCell(x, y, map[x][y]);
          }
      }
  };

  const drawEndFlag = () => {
      let coord = labyrinth.endCoord();
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
                  ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
              }
              ctx.fill();
              colorSwap = !colorSwap;
          }
      }
  };

  const drawEndSprite = () => {
      let offsetLeft = cellSize / 50;
      let offsetRight = cellSize / 25;
      let coord = labyrinth.endCoord();
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
  };
  
  const clear = () => {
      const canvasSize = cellSize * map.length;
      ctx.clearRect(0, 0, canvasSize, canvasSize);
  };
  
  if (endSprite != null) {
      drawEndMethod = drawEndSprite;
  } else {
      drawEndMethod = drawEndFlag;
  }

  clear();
  drawMap();
  drawEndMethod();
}

function player(labyrinth, canvas, cellSized, onComplete, sprite = null) {
  const ctx = canvas.getContext("2d");
  let drawSprite;
  let moves = 0;
  drawSprite = drawSpriteCircle;
  if (sprite != null) {
      drawSprite = drawSpriteImg;
  }
  const gamer = this;
  const map = labyrinth.map();
  let cellCoords = {
      x: labyrinth.startCoord().x,
      y: labyrinth.startCoord().y
  };
  let cellSize = cellSized;
  const halfCellSize = cellSize / 2;

  this.redrawPlayer = (cellSized) => {
      cellSize = cellSized;
      drawSpriteImg(cellCoords);
  };

  function drawSpriteCircle(coord) {
      ctx.beginPath();
      ctx.fillStyle = "yellow";
      ctx.arc(
          (coord.x + 1) * cellSize - halfCellSize,
          (coord.y + 1) * cellSize - halfCellSize,
          halfCellSize - 2,
          0,
          2 * Math.PI
      );
      ctx.fill();
      if (coord.x === labyrinth.endCoord().x && coord.y === labyrinth.endCoord().y) {
          onComplete(moves);
          gamer.unbindKeyDown();
      }
  }

  function drawSpriteImg(coord) {
      const offsetLeft = cellSize / 50;
      const offsetRight = cellSize / 25;
      ctx.drawImage(
          sprite,
          0,
          0,
          sprite.width,
          sprite.height,
          coord.x * cellSize + offsetLeft,
          coord.y * cellSize + offsetLeft,
          cellSize - offsetRight,
          cellSize - offsetRight
      );
      if (coord.x === labyrinth.endCoord().x && coord.y === labyrinth.endCoord().y) {
          onComplete(moves);
          gamer.unbindKeyDown();
      }
  }

  function removeSprite(coord) {
      const offsetLeft = cellSize / 50;
      const offsetRight = cellSize / 25;
      ctx.clearRect(
          coord.x * cellSize + offsetLeft,
          coord.y * cellSize + offsetLeft,
          cellSize - offsetRight,
          cellSize - offsetRight
      );
  }

  function check(e) {
      const cell = map[cellCoords.x][cellCoords.y];
      moves++;

      const keyMap = {
          65: { prop: "w", x: -1, y: 0 },  // A button to go left
          87: { prop: "n", x: 0, y: -1 },  // W button to go up
          68: { prop: "e", x: 1, y: 0 },   // D button to go right
          83: { prop: "s", x: 0, y: 1 },   // S button to go down
      };

      const keyCode = e.keyCode;
      const key = keyMap[keyCode];

      if (key && cell[key.prop] === true) {
          removeSprite(cellCoords);
          cellCoords = {
              x: cellCoords.x + key.x,
              y: cellCoords.y + key.y
          };
          drawSprite(cellCoords);
      }
  }

  function handleTouchStart(event) {
      xDown = event.touches[0].clientX;
      yDown = event.touches[0].clientY;
  }

  function handleTouchMove(event) {
      if (!xDown || !yDown) {
          return;
      }

      const xUp = event.touches[0].clientX;
      const yUp = event.touches[0].clientY;

      const xDiff = xDown - xUp;
      const yDiff = yDown - yUp;

      if (Math.abs(xDiff) > Math.abs(yDiff)) {
          if (xDiff > 0) {
              check({ keyCode: 65 }); // Left swipe
          } else {
              check({ keyCode: 68 }); // Right swipe
          }
      } else {
          if (yDiff > 0) {
              check({ keyCode: 87 }); // Up swipe
          } else {
              check({ keyCode: 83 }); // Down swipe
          }
      }

      xDown = null;
      yDown = null;
  }

  this.bindKeyDown = function () {
      window.addEventListener("keydown", check, false);

      canvas.addEventListener("touchstart", handleTouchStart, false);
      canvas.addEventListener("touchmove", handleTouchMove, false);
  };

  this.unbindKeyDown = function () {
      window.removeEventListener("keydown", check, false);
      canvas.removeEventListener("touchstart", handleTouchStart, false);
      canvas.removeEventListener("touchmove", handleTouchMove, false);
  };

  drawSprite(labyrinth.startCoord());

  this.bindKeyDown();
}

const mazeCanvas = document.getElementById("mazeCanvas");
const ctx = mazeCanvas.getContext("2d");
let sprite;
let finishSprite;
let labyrinth, draw, gamer;
let cellSize;
let difficulty;

window.onload = () => {
  let viewWidth = document.getElementById("view").clientWidth;
  let viewHeight = document.getElementById("view").clientHeight;
  if (viewHeight < viewWidth) {
      ctx.canvas.width = viewHeight - viewHeight / 100;
      ctx.canvas.height = viewHeight - viewHeight / 100;
  } else {
      ctx.canvas.width = viewWidth - viewWidth / 100;
      ctx.canvas.height = viewWidth - viewWidth / 100;
  }

  // Load and edit sprites
  let completeOne = false;
  let completeTwo = false;
  const isComplete = () => {
      if (completeOne === true && completeTwo === true) {
          console.log("Runs");
          setTimeout(function() {
              makeMaze();
          }, 500);
      }
  };

  sprite = new Image();
  sprite.src = "./spartan.png" + "?" + new Date().getTime();
  sprite.setAttribute("crossOrigin", " ");
  sprite.onload = function() {
      sprite = changeBrightness(1.2, sprite);
      completeOne = true;
      console.log(completeOne);
      isComplete();
  };

  finishSprite = new Image();
  finishSprite.src = "./temple.png" + "?" + new Date().getTime();
  finishSprite.setAttribute("crossOrigin", " ");
  finishSprite.onload = function() {
      finishSprite = changeBrightness(1.1, finishSprite);
      completeTwo = true;
      console.log(completeTwo);
      isComplete();
  };
};

window.onresize = () => {
  let viewWidth = document.getElementById("view").clientWidth;
  let viewHeight = document.getElementById("view").clientHeight;
  if (viewHeight < viewWidth) {
      ctx.canvas.width = viewHeight - viewHeight / 100;
      ctx.canvas.height = viewHeight - viewHeight / 100;
  } else {
      ctx.canvas.width = viewWidth - viewWidth / 100;
      ctx.canvas.height = viewWidth - viewWidth / 100;
  }
  cellSize = mazeCanvas.width / difficulty;
  if (gamer != null) {
      draw.redrawMaze(cellSize);
      gamer.redrawPlayer(cellSize);
  }
};

const makeMaze = () => {
  if (gamer != undefined) {
      gamer.unbindKeyDown();
      gamer = null;
  }
  const e = document.getElementById("diffSelect");
  difficulty = e.options[e.selectedIndex].value;
  cellSize = mazeCanvas.width / difficulty;
  labyrinth = new maze(difficulty, difficulty);
  draw = new drawMaze(labyrinth, ctx, cellSize, finishSprite);
  gamer = new player(labyrinth, mazeCanvas, cellSize, displayVictoryMess, sprite);
  if (document.getElementById("mazeContainer").style.opacity < "100") {
      document.getElementById("mazeContainer").style.opacity = "100";
  }
};