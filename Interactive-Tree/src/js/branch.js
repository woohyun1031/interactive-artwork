export class Branch {
  constructor(startX, startY, endX, endY, lineWidth) {
    this.startX = startX;
    this.startY = startY;
    this.endX = endX;
    this.endY = endY;
    this.color = "#000000";
    this.lineWidth = lineWidth;

    this.frame = 12;
    this.cntFrame = 0;
    this.gapX = (this.endX - this.startX) / this.frame;
    this.gapY = (this.endY - this.startY) / this.frame;
    this.currentX = this.startX;
    this.currentY = this.startY;
  }
  draw(ctx) {
    if (this.cntFrame === this.frame) return true;
    ctx.beginPath();

    this.currentX += this.gapX;
    this.currentY += this.gapY;

    ctx.moveTo(this.startX, this.startY); // 선의 시작 위치 지정
    ctx.lineTo(this.currentX, this.currentY); // 시작위치에서 이동하는 위치 지정

    ctx.lineWidth = this.lineWidth;

    ctx.fillStyle = this.color;
    ctx.strokeStyle = this.color;

    ctx.stroke();
    ctx.closePath();
    this.cntFrame++;
    return false;
  }
}
