// Load boards

const easy = [
    "6------7------5-2------1---362----81--96-----71--9-4-5-2---651---78----345-------",
    "685329174971485326234761859362574981549618732718293465823946517197852643456137298"
  ];
const medium = [
    "--9-------4----6-758-31----15--4-36-------4-8----9-------75----3-------1--2--3--",
    "619472583243985617587316924158247369926531478734698152891754236365829741472163895"
  ];
const hard = [
    "-1-5-------97-42----5----7-5---3---7-6--2-41---8--5---1-4------2-3-----9-7----8--",
    "712583694639714258845269173521436987367928415498175326184697532253841769976352841"
  ];

var board;
var solution;
var timer;
var lives;
var selectedTile;
var selectedNum;
var disableSelect;


function startGame(){
    // Changing theme
    var theme = getRadioValueSelected('theme');
    if(theme === 'Light')
       document.querySelector('body').classList.remove('dark');
    else
       document.querySelector('body').classList.add('dark'); 
    
    // display initial lives   
    lives=3;
    document.getElementById("lives").textContent = "Lives remaining : 3";

    // Generating board according to difficulty
    var diffLevel = getRadioValueSelected('diff');
    switch(diffLevel){
      case 'Easy'  : board = easy[0]; 
                     solution = easy[1];
                     break;
      case 'Medium': board = medium[0];
                     solution = medium[1];
                     break;
      default:       board = hard[0];
                     solution = hard[1];
    }
    generateBoard(board);

    // setting timer
    startTimer(timer);
       
    // displaying number plate to select numbers from
    numberPallete();
    
} // func startGame()



function generateBoard(board){ // generating initial board, everything should be deselected
     clearPrevious();
     let boardBox= document.querySelector("#board");
     boardBox.classList.remove("hidden"); // making empty board visible
     let numbers;
     for(let i=0; i<81; i++){
           numbers= board[i];
           let tile= document.createElement("p");
           tile.classList.add("tile");
                 if(numbers !== '-')
                      tile.textContent= numbers;
                 else{
                   tile.addEventListener("click", function(){
                     //If selection enabled
                    if(!disableSelect){
                      //if already selected then deselect
                        if(tile.classList.contains("selected")){
                              tile.classList.remove("selected");
                              selectedTile=null;
                        }//if
                        else{
                              //deslect everything snd select this tile
                              for(let l=0; l<81; l++)
                                   boardBox.children[l].classList.remove("selected");
                               tile.classList.add("selected");
                               selectedTile= tile;
                               updateMove();  
                            }//else
                     }//if
                   });
                 }
           boardBox.append(tile);
           tile.id=i; // creating id's of tiles from '0' to '80'. Select a tile and in the insepct console do console.log(selectedTile) to get id.
           }//for
      // Updating moves
      updateMove();
}//func generateBoard

function clearPrevious(){
    // removing all tiles from DOM so they dont overlap on new board
    let tiles= document.querySelectorAll(".tile");
    for(let i=0; i<tiles.length; i++)
    tiles[i].remove();

    //clearing timer if it is there
    if(timer)
    clearTimeout(timer);

    let number= document.querySelectorAll(".numberTile");  //removing number plate from DOM as it will be generated again?
      for(let i=0; i<number.length; i++)
          number[i].remove();

    //clear selected variables
    selectedTile = null;
    selectedNum = null;
    disableSelect=false;
}//clearPrevious


function numberPallete(){
  // creating number pallete
  let numberPlate=document.getElementById("number-plate"); 
  numberPlate.classList.remove("hidden"); 
  numberPlate.classList.add("numberPlate");
  for(let i=1; i<10; i++){
        let tile= document.createElement("p");
        tile.textContent= i;
        tile.classList.add("numberTile");
        numberPlate.append(tile);
  }//for
  for(let i=0; i<9; i++){
    // Adding Event listener
    numberPlate.children[i].addEventListener("click", function(){
         //if selecting enabled
         if(!disableSelect){
         // if number already selected, then deselect it
               if(numberPlate.children[i].classList.contains("selected")){
                       numberPlate.children[i].classList.remove("selected");
                       selectedNum= null;
                 }//if
               else{ //if that tile is not selected then deselect all other tiles and select this tile
                        for(let l=0; l<9; l++)
                               numberPlate.children[l].classList.remove("selected");
                       selectedNum= numberPlate.children[i];
                       numberPlate.children[i].classList.add("selected");
                       updateMove();
                     }// else
           }//if
       }); // event listener
  }//for
}// func numberPallete



function updateMove(){
  //if selectedNum and selectedTile are not null
  if(selectedNum && selectedTile){
      selectedTile.textContent= selectedNum.textContent;
       if(checkCorrect(selectedTile)){
        // deselect the tiles
        selectedNum.classList.remove("selected");
        selectedTile.classList.remove("selected");
        // clear the selected variables
        selectedNum=null;
        selectedTile=null;
         // Check if all tiles are corrrect
         if(checkDone())
            endGame();
       }
       else{
             // disable seleting new numbers for one second
            disableSelect=true;
            //make tile red
            selectedTile.classList.add("incorrect");
            // run in one second
            setTimeout(function(){
              //substract lives by one
              lives--;
              // if lives 0 endgame
              if(lives===0)
              endGame();
              //if lives not 0
              else{
              // update lives text
              document.getElementById("lives").textContent="Lives remaining: "+ lives;
              disableSelect=false;
              }
              // restore tile color and remove selectedd from both
              selectedTile.classList.remove("selected");
              selectedTile.classList.remove("incorrect");
              selectedNum.classList.remove("selected");
              // clear tiles text and clear selected variables
              selectedTile.textContent="";
              selectedTile=null;
              selectedNum=null;
          }, 1000);
        }//else
   }//if
}//func updateMove

function checkCorrect(tile){
   if(selectedNum.textContent == solution[selectedTile.id])
   return true;
   else
   return false;
}
function endGame(){
  disableSelect==true;
  document.getElementById("timer").textContent= "---"
  clearTimeout(timer);
      //Display win or loss
      if(lives===0 || timeRemaining===0)
          document.getElementById("lives").textContent="You lost!!";
      else
          document.getElementById("lives").textContent="You won!!";
}// func endGame()



function startTimer(){
    var time = getRadioValueSelected('time'); 
    let timeRemaining;
       switch(time){
          case '30': timeRemaining=30*60; // Converting in seconds
                 break;
          case '45': timeRemaining=45*60;
                 break;
          default  : timeRemaining=60*60;
        }//switch
    timer= setInterval(function() {     //in endGame() and clearPrevious() we write 'clearTimeout(timer);' to stop timer
       timeRemaining--;
       if(timeRemaining===0)
       endGame();
       document.getElementById("timer").textContent= timeConversion(timeRemaining);
       }, 1000); //setInterval
}// func startTimer

function timeConversion(timeRemaining){
    let minutes=Math.floor(timeRemaining/60);
    let seconds= timeRemaining%60;
    if(minutes<10)
    minutes=`0${minutes}`;  //using template literals (back ticks under esc key)
    if(seconds<10)
    seconds=`0${seconds}`;
    return `${minutes}:${seconds}`;
}



   // helper func

function getRadioValueSelected(name){
    buttonList= document.getElementsByName(name);
    for(let i=0; i<buttonList.length; i++)
        if(buttonList[i].checked)
           return buttonList[i].value;
}

