var colors = generateRandomColors(6);
var squares = document.querySelectorAll(".square");
var pickedColor = pickColor();
var colorDisplay = document.getElementById("colordisplay");
var messageDisplay = document.getElementById("message")
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#reset");
var easyButton = document.querySelector("#easy");
var hardButton = document.querySelector("#hard");
colorDisplay.textContent = pickedColor;

easyButton.addEventListener("click", function(){
    easyButton.classList.add("selected");
    hardButton.classList.remove("selected");
    colors = generateRandomColors(3);
    for (var i = 3; i < squares.length; i++){
        squares[i].style.display = "none";
    }
    reset();
})

hardButton.addEventListener("click", function(){
    hardButton.classList.add("selected");
    easyButton.classList.remove("selected");
    colors = generateRandomColors(6);
    for (var i = 3; i < squares.length; i++){
        squares[i].style.display = "block";
    }
    reset();
})
resetButton.addEventListener("click", reset);

for(var i = 0; i < colors.length; i++){
    //Set Colors For Square
    squares[i].style.backgroundColor = colors[i];

    //Add Click Listeners To Squares
    squares[i].addEventListener("click", function(){
        //Get color of picked square.
        var clickedColor = this.style.backgroundColor;
        if(clickedColor === pickedColor){
            messageDisplay.textContent = "Correct!";
            changeColors(clickedColor);
            h1.style.backgroundColor = clickedColor;
            resetButton.textContent = "Play Again?"
        }
        else{
            this.style.background = "#232323";
            messageDisplay.textContent = "Try Again!";
        }
    })

}

function changeColors(color){
    for(var i = 0; i < colors.length; i++){
        squares[i].style.backgroundColor = color;
    }
}

function pickColor(){
    var ranNum = Math.floor(Math.random() * colors.length);
    return colors[ranNum];
}

function generateRandomColors(amount){
    var endColors = [];
    var random;
    for(var i = 0; i < amount; i++){
        var endColor = "rgb("
        for(var j = 0; j < 3; j++){
            random = Math.floor(Math.random() * 256);
            endColor += random;
            if (j === (2)){
                endColor += ")";
            }
            else{
                endColor += ", ";
            }
        }
        endColors[i] = endColor;
    }
    return endColors;
}

function reset(){
        //Change Button back to New Colors
        resetButton.textContent = "New Colors";
        //Generate All New Colors
        
        colors = generateRandomColors(colors.length);
    
        //Pick New Random Color
        pickedColor = pickColor();
    
        //Change Dispayed RGB
        colorDisplay.textContent = pickedColor;
    
        //Change Colors of Squares
        for(var i = 0; i < squares.length; i++){
            squares[i].style.backgroundColor = colors[i];
        }
    
        //Change h1 Background to Original.
        h1.style.backgroundColor = "steelblue";

        messageDisplay.textContent = "";
}