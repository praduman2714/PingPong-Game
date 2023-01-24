var ball = document.getElementById("ball");
var bar1 = document.getElementById("bar1");
var bar2 = document.getElementById("bar2");

var movement=20;
// bar1.style.backgroundColor="green";

let moveX=5;
let moveY=5;
let ballMoving;
let border=12;
let score;
let highScore;
let gameStart=false;



//Moving the bars and if you press Enter then the game will start.
document.addEventListener("keypress", function(event){
    // This is for movement of the bar
    var left = bar1.offsetLeft;
    var right = bar1.offsetLeft;
    // This will ensure the movement of bar in right
    var key = event.key;
    if(key == 'D' || key== 'd'){

         if(parseInt(bar1.style.left)<(window.innerWidth-bar1.offsetWidth-border)){
            right+=movement;
            bar1.style.left = right+"px";
            bar2.style.left = right+"px";
         }

    }

    else if(key == 'a' || key =='A'){
       
        if(parseInt(bar1.style.left) > border){
        // console.log("left");
        left-=movement;
        bar1.style.left = left+"px";
        bar2.style.left = bar1.style.left;
       };
        
        
    };
    // console.log(key);
    if(event.keyCode == 13){
        if(!gameStart){
            console.log("Enter");
            gameStart = true;
            let ballReactProperty = ball.getBoundingClientRect();
            let ballX = ballReactProperty.x;
            let ballY = ballReactProperty.y;
            let ballWidth = ballReactProperty.width;

            let bar1Width = bar1.offsetWidth;
            let bar1Height = bar1.offsetHeight;

            let bar2Width = bar2.offsetWidth;
            let bar2Height = bar2.offsetHeight;

            ballMoving = setInterval(function(){
                let bar1X=bar1.getBoundingClientRect().x;
                let bar2X=bar2.getBoundingClientRect().x;
                let ballCentre=ballX+ballWidth/2;

                ballX+= moveX;
                ballY+=moveY;
                ball.style.left = ballX +"px";
                ball.style.top = ballY +"px";

                if(((ballX+ballWidth)>window.innerWidth) || (ballX<0)){
                    moveX=-moveX;
                }

                if(ballY<=bar1Height){
                    moveY=-moveY;
                    score++;
                    if((ballCentre<bar1X) || (ballCentre>(bar1X+bar1Width))){
                        dataStoring(score,thisBar2);
                    }
                }

                if((ballY+ballWidth)>=(window.innerHeight-bar2Height)){
                    moveY=-moveY;
                    score++;
                    if((ballCentre<bar2X) || (ballCentre>(bar2X+bar2Width))){
                        dataStoring(score,thisBar1);
                    }
                }

            }, 15);

        }
    }
})



// This part is for storing the score , and displaying the score of winners
const thisBar1="Bar-1";
const thisBar2="Bar-2";
const storeName="nameOfBar";
const storeScore="score";


localStorage.setItem(storeScore, "null");
localStorage.setItem(storeName, "null");

var information = () =>{
    highScore = localStorage.getItem(storeScore);
    barName = localStorage.getItem(storeName);

    if(barName == "null" || highScore == "null"){
        alert("Hello! this is Your first game. Please Press Enter to start the game");
        highScore = 0;
        barName = storeName;
    }else{
        alert(barName , "is the winner, and the score is ", score*100);
    }
    gameReset(barName);

} ;
information();

// This function will reset the game
// Basically it will place the bar in middle of the scree, and ball according to the winner or looser.
function gameReset(barName){
    bar1.style.left = ((window.innerWidth - bar1.offsetWidth)/2) +"px";
    bar2.style.left = ((window.innerWidth - bar2.offsetWidth) / 2) + "px";
    ball.style.left = ((window.innerWidth - ball.offsetWidth) / 2) + "px";
    // In my game there is some advantage to the loosing side, so if you loose the point you'll get the set, 
    // then you'll get the chance to server. (Nothing realistic, just fantasy :) ).
    if(barName == thisBar1){
        ball.style.top=bar2.getBoundingClientRect().y-bar2.getBoundingClientRect().height+"px";
        moveY=-5;
    }else if(barName==thisBar2){
         ball.style.top=bar1.getBoundingClientRect().y + bar1.getBoundingClientRect().height+"px";
        // ball.style.top = "30px";
        // ball.style.left = "49%";
        moveY=5;
    }
    score = 0;
    gameStart = false;
}

function dataStoring(score, winner){
    if(score > highScore){
        highScore = score;
        localStorage.setItem(storeName, winner);
        localStorage.setItem(storeScore, highScore);
    }
    clearInterval(ballMoving);
    alert(winner + " won!! with the score of " +( score * 100) + " . and hold the Best score of "+ highScore*100);
    gameReset(winner);
}
