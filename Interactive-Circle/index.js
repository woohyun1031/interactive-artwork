const container = document.querySelector(".container");
const circle = document.querySelector(".circle");

let isMouseDown = false;
let previousAngle = 0;
let rotationAngle = 0;

const radToDeg = 180 / Math.PI;
const clientRect = container.getBoundingClientRect();
const center = {
  x: clientRect.left + clientRect.width / 2,
  y: clientRect.top + clientRect.height / 2,
};

container.addEventListener("mousedown", (event) => {
  event.preventDefault();
  const { clientX: clickedX, clientY: clickedY } = event;
  const currentAngle =
    Math.atan2(clickedY - center.y, clickedX - center.x) * radToDeg;
  isMouseDown = true;
  previousAngle = currentAngle;
});

container.addEventListener("mousemove", (event) => {
  event.preventDefault();
  if (isMouseDown) {
    const { clientX: clickedX, clientY: clickedY } = event;
    const currentAngle =
      Math.atan2(clickedY - center.y, clickedX - center.x) * radToDeg;
    const angleDiff = currentAngle - previousAngle;
    const newAngle = rotationAngle + angleDiff;
    if (newAngle >= 360 || newAngle < 0) return;
    circle.style.transform = `rotate(${newAngle}deg)`;
    previousAngle += angleDiff;
    rotationAngle = newAngle;
  }
});

container.addEventListener("mouseup", () => {
  isMouseDown = false;
  previousAngle = 0;
});
