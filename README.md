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
    - ```rand```  - generates random numbers; 
    - ```shuffle``` - shuffle arrays, 
    - ```changeBrightness``` - change brightness of an image;
    - ```displayVictoryMess``` - display victory message; 
    - ```toggleVisablity``` - toggle visibility of an HTML element.

- ***The maze function:***
    - ```maze``` - is a constructor function that creates a new maze object. It takes the width and height of the maze as parameters. Inside the constructor, it initializes the maze map, start and end coordinates, and defines methods for accessing the map, start coordinate, and end coordinate;
        1. ```genMap``` - generates the initial map for the maze. It creates a two-dimensional array and initializes each cell with properties for different directions (north, south, east, west), visited status, and prior position;
        2.  ```defineMaze``` - generates the maze by carving paths through the map using a recursive backtracking algorithm. It starts at a random cell and randomly selects a neighboring unvisited cell to carve a path towards. This process is repeated until all cells have been visited;
        3.  ```defineStartEnd``` - randomly selects the start and end coordinates for the maze from predefined positions. It assigns the start and end coordinates to the respective variables.

- ***The drawMaze function:***
    - ```drawMaze``` - takes a maze object, a canvas context, cell size, and an optional end sprite as parameters. It draws the maze on the canvas by iterating through the map and drawing the walls of each cell. It also draws the end flag or end sprite at the end coordinate;
        1. ```redrawMaze``` - is used to redraw the maze with a new cell size. It takes the new size as a parameter and updates the cell size and line width accordingly;
        2. ```drawCell``` - used to draw individual cells of the maze. It takes the x and y coordinates of the cell and the cell object as parameters. It draws the walls of the cell based on the cell's properties (north, south, east, and west walls);
        3. ```drawMap``` - is responsible for drawing the entire maze by iterating over the labyrinth's map and calling ```drawCell``` for each cell;
        4. ```drawEndFlag``` - is used to draw the end point of the maze as a checkered flag. It calculates the coordinates of the end point, divides the cell into a grid, and alternates the color of each grid square to create a checkered pattern;
        5. ```drawEndSprite``` - is used to draw the end point of the maze as a sprite image. It calculates the coordinates and dimensions of the end point, and draws the sprite image on the canvas;
        6. ```clear``` - is used to clear the canvas by removing all previously drawn elements.

- ***The player function:*** 
    - ```player``` - creates a new player object. It takes a maze object, a canvas element, cell size, a callback function for when the player reaches the end, and an optional sprite as parameters. Inside the constructor, it initializes the player's position, cell size, and draws the player on the canvas.
        1. ```redrawPlayer``` - allows the player to be redrawn with a different cell size.
        2. ```drawSpriteCircle``` - used to draw the player as a circle on the canvas.
        3. ```drawSpriteImg``` - used to draw the player using an image sprite on the canvas.
        4. ```removeSprite``` - used to clear the player's previous position on the canvas.
        5. ```check``` - is called when a key is pressed or a touch event is triggered. It checks the pressed key or touch direction and moves the player accordingly if the movement is valid.
        6. ```handleTouchStart``` - is called when a touchstart event is triggered. It stores the initial touch coordinates.
        7. ```handleTouchMove``` - is called when a touchmove event is triggered. It calculates the swipe direction based on the initial and current touch coordinates and calls the check function with the corresponding key code.
        8. ```bindKeyDown``` - binds the check function to the "keydown" event and the touch event handlers to the canvas.
        9. ```unbindKeyDown``` - unbinds the event handlers from the corresponding events.

- ***The remaining code:*** 
    - handles the initialization of the maze game. It sets up the canvas dimensions, loads the sprite;
    - ```drawMaze``` - defines event handlers and initializes the maze drawing based on user actions.

### How to open the game and play it?
<hr>

> **NOTE:** you don't need to have Node.js on your machine

**How to open the game?**

To open game you need to:
* write an URL-adress: sachkomaxim.github.io/maze-project/maze/
    
    *or*

* click on this link: https://sachkomaxim.github.io/maze-project/maze/

**How to play the game?**

  * #### *To create the maze*:

    Click on the button labeled **`Easy`**.
    
    ![image](https://github.com/SachkoMaxim/maze-project/assets/114748761/e0fa103b-3af0-494a-8e9b-4da6fa4d10b5)
    
    Choose between **`Easy`**, **`Medium`**, **`Hard`** and **`Extreme`** difficulties.
    
    ![image](https://github.com/SachkoMaxim/maze-project/assets/114748761/751ae82b-5156-4efd-8f51-af1f6e204d16)
    
    Then click on the **`Start`** button.
    
    ![image](https://github.com/SachkoMaxim/maze-project/assets/114748761/64f40ba4-3011-4737-9bda-cf1a822efbcd)
    
    And the maze will be created.
    
    ![image](https://github.com/SachkoMaxim/maze-project/assets/114748761/1269cdcc-d359-434f-9175-2a534b29a71c)

  * #### *To play the game*:

    * On phone:

        Swipe your finger where you want to direct the player (spartan).

    * On computer, laptop:

        Use W, A, S, D buttons to move the player (spartan):

        * **W** - move the player to the up;
        * **A** - move the player to the left;
        * **S** - move the player to the down;
        * **D** - move the player to the right.
    
  * #### *Goal*:

    You need to reach to the end point - to the temple.

  * #### *If reached the end*:

    After reaching the end, click the **`Cool!`** button. 
    
    ![image](https://github.com/SachkoMaxim/maze-project/assets/114748761/59628e57-5610-4c54-a701-36f6142a7b94)
    
    Then switch the difficulty, if you want, and click **`Start`** button. The maze will redraw and you begin a new game. You can play until you became bored.

### Help
<hr>

Ask questions at https://t.me/BL_OD and post issues on GitHub.

### License
<hr>

[MIT License](LICENSE)
