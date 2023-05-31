export class Branch {
  constructor(startX, startY, endX, endY, lineWidth) {
    this.startX = startX;
    this.startY = startY;
    this.endX = endX;
    this.endY = endY;
    this.color = "#000000";
    this.lineWidth = lineWidth;
  }
  draw(ctx) {
    ctx.beginPath();

    ctx.moveTo(this.startX, this.startY); // 선의 시작 위치 지정
    ctx.lineTo(this.endX, this.endY); // 시작위치에서 이동하는 위치 지정

    if (this.lineWidth < 2) {
      ctx.lineWidth = 0.8;
    } else if (this.lineWidth < 3) {
      ctx.lineWidth = 1;
    } else if (this.lineWidth < 4) {
      ctx.lineWidth = this.lineWidth * 0.6;
    } else if (this.lineWidth < 5) {
      ctx.lineWidth = this.lineWidth * 0.7;
    } else if (this.lineWidth < 7) {
      ctx.lineWidth = this.lineWidth * 0.8;
    } else if (this.lineWidth < 10) {
      ctx.lineWidth = this.lineWidth * 0.9;
    } else {
      ctx.lineWidth = this.lineWidth;
    }

    ctx.fillStyle = this.color;
    ctx.strokeStyle = this.color;

    ctx.stroke();
    ctx.closePath();
  }
}
