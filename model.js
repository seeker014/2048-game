var data;
var TableSize; //height, width
var win = 0;
var gameOver = 0;
var turn = 0;
var score = 0;
var Win_val = 2048;

function getTile(row,col)
{
	if ((row < 0) || (row >= TableSize[0]) || (col < 0) || (col >= TableSize[1]))
		throw "tile requested outside of range";

	return data[row][col];

}

function initialize(height,width)//sets the game grid to all 0's
{

	TableSize = [height,width];
	var ful = [];//the full table data
	var row = [];//the data for one row
	for (j = 0; j<width; j++)
	{
		row.push(0);
	}
	for (i = 0;i<height;i++)
	{
		var temp = [...row];
		ful.push(temp);
	}
	data = ful;


}
function isWin()
{
	if (win > 0)
	{return true;}
	else {return false;}
}
function up()
{
	var mov = 0; //has this function changed data yet?

	for (i = 1;i < TableSize[0]; i++) //top to bottom
	{
		for (j = 0; j < TableSize[1]; j++) //from left to right
		{



			if (data[i][j] == 0) // skips unnecesary movements
			{ continue;}

			mov |= moveTile("up", i,j); //main purpose is to run moveTile, but it also sets mov to 1 if anything has been moved


		}
	}
	if (!(mov ==0))
	{
		addRandomTile();
	}

}
function moveTile(dir, row, col)
{

	if (data[row][col] == 0) //skips unnecesary computation
	{return;}
	switch (dir){
	case ("up"):
		if (row - 1 >= 0)//verifies that there is a space to move the tile to
		{

			next = data[row-1][col];
			if (next == 0) //checks to see if next tile is blank
			{
				data[row-1][col] += data[row][col];//moves it
				data[row][col] = 0;
				moveTile(dir, row-1,col);//checks to see if it can move again
				return 1;
			}
			if (data[row][col] == next)//checks to see if it can merge
			{
				data[row-1][col] += data[row][col];
				score += 2* next;
				data[row][col] = 0;
				return 1;
			}

		}
	break;
	case ("down")://see comments on up
		if (row + 1 < TableSize[0])
		{

			next = data[row+1][col];
			if (next == 0)
			{
				data[row+1][col] += data[row][col];
				data[row][col] = 0;
				moveTile(dir, row+1,col);
				return 1;
			}
			if (data[row][col] == next)
			{
				score+= 2*next;
				data[row+1][col] += data[row][col];
				data[row][col] = 0;
				return 1;
			}

		}
	break;
	case ("left")://see comments on up
		if (col - 1 >= 0)
		{

			next = data[row][col-1];
			if (next == 0)
			{
				data[row][col-1] += data[row][col];
				data[row][col] = 0;
				moveTile(dir, row, col-1);
				return 1;
			}
			if (data[row][col] == next)
			{
				score+= 2*next;
				data[row][col-1] += data[row][col];
				data[row][col] = 0;
				return 1;
			}

		}
	break;
	case ("right")://see comments on up
		if (col + 1 < TableSize[1])
		{

			next = data[row][col+1];
			if (next == 0)
			{
				data[row][col+1] += data[row][col];
				data[row][col] = 0;
				moveTile(dir, row,col+1);
				return 1;
			}
			if (data[row][col] == next)
			{
				score+= 2*next;
				data[row][col+1] += data[row][col];
				data[row][col] = 0;
				return 1;
			}

		}
	break;
	}

}
function newGame()
{
	initialize(TableSize[0],TableSize[1]);
	addRandomTile();
	win = 0;
	gameOver = 0;
	score = 0;

}
function getScore()
{
	return score;
}
function addRandomTile()
{

	for (i = 0; i < 16; i++) //tries to find a random tile, up to 16 times
	{

		var r = Math.floor(Math.random() * TableSize[0]);//random row
		var c = Math.floor( Math.random() * TableSize[1]);//random column
		if (data[r][c] == 0)
		{
			data[r][c] = 2 * Math.floor(Math.random() * 2 + 1);
			return;
		}
	}
	for (i = 0; i<TableSize[0];i++)// if a random tile could not be found, place it in the top left most open tile.
	{
		for (j = 0; j<TableSize[1];j++)
		{
		
			if (data[i][j] == 0)
			{
				data[i][j] = 2 * Math.floor((Math.random() * 2) + 1);
				return;
			}
		}
	}

}
function right()
{
	 var mov = 0;
	for (j = TableSize[1] -1; j >= 0; j--) //from right to left
	{

		for (i = 0; i < TableSize[0]; i++) //from top to bottom
		{
			mov |= moveTile("right",i,j);
		}
	}
	if (!(mov == 0))//don't add a tile if the previous move didn't move anything
	addRandomTile();
}
function left()
{
	var mov = 0;//a bool to see if anything has moved
	 var saveData = data;
	for (i = 0;i<TableSize[0] ;i++) //from left to right
	{

		for (j = 0; j < TableSize[1]; j++) //from top to bottom

			mov |= moveTile("left",i,j);
	}
	if (!(mov == 0))
	addRandomTile();
}
function down()
 {
	 var mov = 0;
	 var saveData = data;
	for (i = TableSize[0] -1; i>=0;i--) //from top to bottom
	{
		for (j = 0; j < TableSize[1]; j++) //from left to right
		{
			if (data[i][j] == 0) // skips unnecesary movements. Doesn't change result, just saves time
			{ continue;}

			mov |= moveTile("down", i,j);
		}
	}
	if (!(mov == 0))
	addRandomTile();
 }
 function checkLose() //checks to see if there is a valid move by going through each row, then each column
 {

	 var t = 0;

	 for (i = 0; i < TableSize[0]; i++) //checks every row
	 {
		 for (j = 0; j < TableSize[1]; j++)
		 {
			  if (data[i][j] >= 2048)
			 {
				 win = 1;

			 }
			 if (t == data[i][j])// if element is the same as previous one, return false
			 {
				 return false;
			 }
			 if (data[i][j] == 0)// checks to see if there is a 0 anywhere, might as well be here so I don't have to write another for loop!
			 {
				 return false;
			 }

			 t = data[i][j];

		 }
		 t = 0; //resets t to avoid it thinking "line jumps" are valid moves
	 }
	 for (j = 0; j < TableSize[1]; j++) //checks every column
	 {
		 for (i = 0; i < TableSize[0]; i++)
		 {
			 if (t == data[i][j])// if element is the same as previous one, return false
			 {
				 return false;
			 }
			 t = data[i][j];

		 }
		 t = 0; //resets t to avoid it thinking "line jumps" are valid moves
	 }
	 gameOver = 1;
	 return true;
 }
