const canvas = document.querySelector("#etch-a-sketch");
const shakeButton = document.querySelector(".shake");
const ctx = canvas.getContext("2d");
const MOVE_AMOUNT = 10;

// Setup canvas for Drawing
ctx.lineJoin = "round";
ctx.lineCap = "round";
ctx.lineWidth = MOVE_AMOUNT;
let hue = 0;

//Make a variable from the same properties on canvas
const { width, height } = canvas;

//Create random x and y starting point on canvas
let x = Math.floor(Math.random() * width);
let y = Math.floor(Math.random() * height);

// Start the drawing
ctx.beginPath();
ctx.moveTo(x, y);
ctx.lineTo(x, y);
ctx.stroke();

//Write a draw function
function draw({ key }) {
  //Increment the hue
  hue = hue + 5;
  ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
  //Start the path
  ctx.beginPath();
  ctx.moveTo(x, y);
  //Move our x and y values depending on what the user did
  switch (key) {
    case "ArrowUp":
      y = y - MOVE_AMOUNT;
      break;
    case "ArrowDown":
      y = y + MOVE_AMOUNT;
      break;
    case "ArrowLeft":
      x = x - MOVE_AMOUNT;
      break;
    case "ArrowRight":
      x = x + MOVE_AMOUNT;
      break;
    default:
      break;
  }
  ctx.lineTo(x, y);
  ctx.stroke();
}

//Writing handler for the keys
function handleKey(e) {
  if (e.key.includes("Arrow")) {
    e.preventDefault();
    draw({ key: e.key });
  }
}

//Listen for arrow keys
window.addEventListener("keydown", handleKey);

//Assigning clear function to button
shakeButton.addEventListener("click", clearCanvas);

//Clear function
function clearCanvas() {
  canvas.classList.add("shake");
  ctx.clearRect(0, 0, width, height);
  canvas.addEventListener(
    "animationend",
    function () {
      canvas.classList.remove("shake");
    },
    { once: true }
  );
}
