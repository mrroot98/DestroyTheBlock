var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var x,y,dx,dy,ballRadius,paddleHeight,paddleWidth;
x= canvas.width/2;
y=canvas.height-30;
dx=2;dy=-2;ballRadius=10;
paddleWidth = 75;
paddleHeight = 10;
var paddleX = (canvas.width - paddleWidth)/2;
var paddleY = canvas.height - paddleHeight ;
var leftPressed,rightPressed;
leftPressed = false; rightPressed = false;

document.addEventListener("keydown",keyDownPress,false);
document.addEventListener("keyup",keyUpPress,false);

function keyDownPress(e){
	if(e.key == "Right" || e.key == "ArrowRight"){
		rightPressed = true;
	}else if(e.key == "Left" || e.key =="ArrowLeft"){
		leftPressed = true;
	}
}

function keyUpPress(e){
	if(e.key == "Right" || e.key == "ArrowRight"){
		rightPressed = false;
	}else if(e.key == "Left" || e.key =="ArrowLeft"){
		leftPressed = false;
	}
}

function drawpaddle(){
	ctx.beginPath();
	ctx.rect(paddleX,paddleY,paddleWidth,paddleHeight);
	ctx.fillstyle = "#0095DD";
	ctx.fill();
	ctx.closePath();
}

function drawBall(){
	ctx.beginPath();
	ctx.arc(x,y,ballRadius,0,Math.PI*2);
	ctx.fillStyle= "#0095DD";
	ctx.fill();
	ctx.closePath();
}

function draw(){
	//Draw code goes here
	ctx.clearRect(0,0,canvas.width,canvas.height);
	drawBall();
	drawpaddle();
	if(x+dx>(canvas.width-ballRadius) || x+dx<ballRadius){
		dx = -dx;
	}
	if(y+dy<ballRadius){
		dy = -dy;
	} else if(y+dy>(canvas.height-ballRadius)){
		if(x>paddleX && x< paddleX + paddleWidth){
			dy = -dy;
		}
		else{
			alert("Game Over!");
			document.location.reload();
			clearInterval(interval);
		}
	}
	if(rightPressed){
		paddleX+=6;
		if (paddleX + paddleWidth > canvas.width){
	        paddleX = canvas.width - paddleWidth;
	    }	
	} else if(leftPressed){
		paddleX-=6;
		if (paddleX <0){
	        paddleX = 0;
	    }
	}
	x = x+dx;
	y= y+dy;
}
var interval = setInterval(draw,10);