# Maze-project

This project is maze. It created by using JavaScript, HTML, CSS, node JS.

### What can this maze project provide you?
<hr>

* problem-solving skills
* spatial reasoning
* educational tool
* fun and entertainment

### How does this project work?
<hr>

- ***There are several helper functions such as:***
    - **'rand'**  - generates random numbers; 
    - **'shuffle'** - shuffle arrays, 
    - **'changeBrightness'** - change brightness of an image;
    - **'displayVictoryMess'** - display victory message; 
    - **'toggleVisablity'** - toggle visibility of an HTML element.

- ***The maze function:***
    - **'maze'** - is a constructor function that creates a new maze object. It takes the width and height of the maze as parameters. Inside the constructor, it initializes the maze map, start and end coordinates, and defines methods for accessing the map, start coordinate, and end coordinate;
    * **'genMap'** - generates the initial map for the maze. It creates a two-dimensional array and initializes each cell with properties for different directions (north, south, east, west), visited status, and prior position;
    *  **'defineMaze'** - generates the maze by carving paths through the map using a recursive backtracking algorithm. It starts at a random cell and randomly selects a neighboring unvisited cell to carve a path towards. This process is repeated until all cells have been visited;
    *  **'defineStartEnd'** - randomly selects the start and end coordinates for the maze from predefined positions. It assigns the start and end coordinates to the respective variables.

- ***The drawMaze function:***
    - **'drawMaze'** - takes a maze object, a canvas context, cell size, and an optional end sprite as parameters. It draws the maze on the canvas by iterating through the map and drawing the walls of each cell. It also draws the end flag or end sprite at the end coordinate;
    * **'redrawMaze'** - is used to redraw the maze with a new cell size. It takes the new size as a parameter and updates the cell size and line width accordingly;
    * **'drawCell'** - used to draw individual cells of the maze. It takes the x and y coordinates of the cell and the cell object as parameters. It draws the walls of the cell based on the cell's properties (north, south, east, and west walls);
    * **'drawMap'** - is responsible for drawing the entire maze by iterating over the labyrinth's map and calling **drawCell** for each cell;
    * **'drawEndFlag'** - is used to draw the end point of the maze as a checkered flag. It calculates the coordinates of the end point, divides the cell into a grid, and alternates the color of each grid square to create a checkered pattern;
    * **'drawEndSprite'** - is used to draw the end point of the maze as a sprite image. It calculates the coordinates and dimensions of the end point, and draws the sprite image on the canvas;
    * **'clear*'* - is used to clear the canvas by removing all previously drawn elements.

- ***The player function:*** 
    - **'player'** - creates a new player object. It takes a maze object, a canvas element, cell size, a callback function for when the player reaches the end, and an optional sprite as parameters. Inside the constructor, it initializes the player's position, cell size, and draws the player on the canvas.
    * **'redrawPlayer'** - allows the player to be redrawn with a different cell size.
    * **'drawSpriteCircle'** - used to draw the player as a circle on the canvas.
    * **'drawSpriteImg'** - used to draw the player using an image sprite on the canvas.
    * **'removeSprite'** - used to clear the player's previous position on the canvas.
    * **'check'** - is called when a key is pressed or a touch event is triggered. It checks the pressed key or touch direction and moves the player accordingly if the movement is valid.
    * **'handleTouchStart'** - is called when a touchstart event is triggered. It stores the initial touch coordinates.
    * **'handleTouchMove'** - is called when a touchmove event is triggered. It calculates the swipe direction based on the initial and current touch coordinates and calls the check function with the corresponding key code.
    * **'bindKeyDown'** - binds the check function to the "keydown" event and the touch event handlers to the canvas.
    * **'unbindKeyDown'** - unbinds the event handlers from the corresponding events.

- ***The remaining code:*** 
    * handles the initialization of the maze game. It sets up the canvas dimensions, loads the sprite;
    * **'drawMaze'** - defines event handlers and initializes the maze drawing based on user actions.

### How to open the game and play it?
<hr>

> **NOTE:** you don't need to have node js on your machine

**How to open the game?**

To open game you need to:
* write an URL-adress sachkomaxim.github.io/maze-project/maze/
    
    *or*

* click on this link: https://sachkomaxim.github.io/maze-project/maze/

**How to play the game?**

  * ## To create the maze:
        Click on the button labeled 'Easy'. Choose between 'Easy', 'Medium', 'Hard' and 'Extreme' difficulties. Then click on the 'Start' button and the maze will be created.

  * ## To play the game:

    * # On phone:
        * Swipe your finger where you want to direct the player (knight).

    * # On computer, laptop:

        * Use W, A, S, D to move the player (knight):
<pr>
                W - move the player to the up;
                A - move the player to the left;
                S - move the player to the down;
                D - move the player to the right.
    
  * ## Goal:
   
    * You need to reach to the end point - to the castle.

  * ## If reached the end:

        After reaching the end, click the 'Cool!' button. Then switch the difficulty, if you want, and click 'Start' button. The maze will redraw and you begin a new game. You can play until you became bored.

### Help
<hr>

Ask questions at https://t.me/BL_OD and post issues on GitHub.

### License
<hr>

[MIT License](LICENSE)