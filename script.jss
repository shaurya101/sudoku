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
var timer;
var lives;
var selectedTile;
var selectedNum;


function startGame(){
    // Changing theme
    var theme = getRadioValueSelected('theme');
    if(theme === 'Light')
       document.querySelector('body').classList.remove('dark');
    else
       document.querySelector('body').classList.add('dark'); 
    
    // display initial lives   
    document.getElementById("lives").textContent = "Lives remaining : 3";

    // Generating board according to difficulty
    var diffLevel = getRadioValueSelected('diff');
    switch(diffLevel){
      case 'Easy'  : board = easy[0]; 
                           break;
      case 'Medium': board = medium[0];
                             break;
      default:       board = hard[0];
    }
    generateBoard(board);

    // setting timer
    startTimer(timer);
       
    // displaying number plate to select numbers from
    numberPallete();
    
} // func startGame()


function generateBoard(board){ // generating initial board, everything should be deselected
     clearPrevious();
     document.querySelector("#board").classList.remove("hidden"); // making empty board visible
     let numbers;
     for(let i=0; i<81; i++){
         numbers= board[i];
         let tiles= document.createElement("p");
         tiles.classList.add("tile");
              if(numbers !== '-')
                  tiles.appendChild(document.createTextNode(numbers));
         let boardBox= document.querySelector("#board");
         boardBox.append(tiles);
         }//for
      // Updating moves
      updateMove();
}//func generateBoard


function updateMove(){

}

function clearPrevious(){
     selectedNum=null;
     selectedTile=null;



}//clearPrevious

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
    setInterval(function() {
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

function numberPallete(){
     let numberPlate=document.getElementById("number-plate"); 
     numberPlate.classList.remove("hidden"); 
     numberPlate.classList.add("numberPlate");
     for(let i=1; i<10; i++){
       let tile= document.createElement("p");
       let text= document.createTextNode(i);
       tile.append(text);
       numberPlate.append(tile);
       tile.classList.add("numberTile");
       // Adding Event listener
       

     }//for
}// func numberPalette


   // helper func

function getRadioValueSelected(name){
    buttonList= document.getElementsByName(name);
    for(let i=0; i<buttonList.length; i++)
        if(buttonList[i].checked)
           return buttonList[i].value;
}
