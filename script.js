var tbl;
var s;
var gridSize = [4,4];
function main ()
{
 if (!(localStorage.getItem('numRow') == null))
 {
	 gridSize = [localStorage.getItem("numRow"),localStorage.getItem("numCol")];
 }

JsonStuff();


	tbl = document.getElementById('tablehere');
	btn = document.getElementById('buttonhere');
	var removeCheck = tbl.firstChild;
    tbl.removeChild(removeCheck);

	var b = document.createElement("button");
	b.innerHTML = "Restart";
	b.addEventListener("click", function() {restart()} );

	s = document.createElement("P");
	s.innerHTML = "Score: 0"
	s.className = "score";
	btn.appendChild(b);
	btn.appendChild(s);

	initialize(gridSize[0],gridSize[1]);
	makeTable(tbl,gridSize[0],gridSize[1]);
	addRandomTile();
	update(tbl,gridSize[0],gridSize[1]);

	if (Math.abs(gridSize[0] - gridSize[1]) > 3)
	{
		var t = document.getElementById("texthere");
		t.innerHTML = "that's an odd grid size... are you sure you want to play on that?";
	}
}

document.addEventListener('keydown',    keyPress,    false);
function ClearLStorage(){localStorage.clear();}
function restart()
{
	 newGame();
	 update(tbl,gridSize[0],gridSize[1]);

	var t = document.getElementById("texthere");//resets bottom text
	 t.innerHTML = "";
}

function keyPress(event) {
	var k = event.keyCode;
	if (k == 80) {k = Math.floor(Math.random() * 4) + 37;}
  switch(k)
  {
	case 37: left();event.preventDefault(); break;
	case 38: up(); event.preventDefault(); break;
	case 39: right();event.preventDefault();  break;
	case 40: down();event.preventDefault(); break;
	return;
  }
  update(tbl,gridSize[0],gridSize[1]);

}


function makeTable(main, height, width)
{
	var TB = document.createElement("table");
	var TD;
	var TR;
	for (i = 0; i < height; i++){
		idx++; //offsets each row by one to checker
		 TR = document.createElement('tr');
		for (j = 0; j < width; j++){
			TD = document.createElement('td');
			TD.innerHTML = getTile(i,j);
			if (TD.innerHTML == 0) //makes empty tiles blank
				TD.innerHTML = "";
			TD.className = returnClass(TD); //adds style to the cell
			TR.appendChild(TD);	//adds the tile to the row

		}
		TB.appendChild(TR); //adds a row to the table

	}
	main.appendChild(TB);
}

function update(main, height, width)
{
	idx = 0;
  if (getScore() > localStorage.getItem("PHighScore")) {localStorage.setItem("PHighScore",getScore())}
	s.innerHTML = "Score: " + getScore() + "   high Score: " + localStorage.getItem("PHighScore");
	for (i = 0; i < height; i++){
		if (gridSize[1] %2 == 0){idx++; }//offsets each row by one to checker
		for (j = 0; j < width; j++){
			TileNum = getTile(i,j);
			if (TileNum == 0)
			main.children[0].children[i].children[j].innerHTML = "";
		else
			main.children[0].children[i].children[j].innerHTML = TileNum;

			main.children[0].children[i].children[j].className = returnClass(main.children[0].children[i].children[j]);
		}


	}
	if (checkLose())
  {


	  var w = isWin();
	  var t = document.getElementById("texthere");

	  t.innerHTML = w?("Good Game, You Won!!!"):("Sorry, you Lost! \n \n I guess you just weren't good enough! \n\n to try again, press \"restart\"");


  }
}


//style code
var idx = 0; //how many tiles have been assigned a style, used to make a checkered pattern
function returnClass(el) //adds styles to cells with a given value. el is the Data element. Num is an identifier
{

	idx++;
	switch(el.innerHTML)
	{
	case "2": return "two";
	case "4": return "four";
	case "8": return "eight";
	case "16": return "sixteen";
	case "32": return "thirtytwo";
	case "64": return  "sixtyfour";
	case "128": return "onetwentyeight";
	case "256": return "twofiftysix";
	case "512": return "fivetwelve";
	case "1024": return "onetwentyfour";
	case "2048": return "twentyfourtyeight";
	case "4096": return "fourtyninetysix";
	}
	if (idx % 2 == 0)
		return "blank1";
	else
		return "blank2";


}

function JsonStuff()
{
  try
  {
    var file = new XMLHttpRequest();
    file.open("GET", "highScores.json", false);
    file.send();
    var responseJson = JSON.parse(file.responseText);
    var jName = responseJson.gameState["names"];
    var jscore = responseJson.gameState["scores"];
    var highScore = document.getElementById('highScoreTable');
    var tempTable = document.createElement("table");
    for (i = 0; i<5;i++)
    {

      var tempCell = document.createElement("td");
      var tempCell2 = document.createElement("td");
      var tempRow = document.createElement("tr");
      tempCell = document.createElement("td");
      tempCell.className = "boring";
      tempCell2.className = "boring";
      tempRow.className = "boring";
      tempCell.innerHTML = jName[i];
      tempRow.appendChild(tempCell);
      tempCell2.innerHTML = jscore[i];
      tempRow.appendChild(tempCell2);
      tempTable.appendChild(tempRow);
    }
    tempTable.className = "boring";
    highScore.appendChild(tempTable);
  }
  catch (e)
  {
    alert("it looks like your browser doesn't support me trying to load highscores from a local json file. You could try again on a browser that cares. Your error is: " + e)
  }

}
