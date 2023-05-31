import { Branch } from "./branch.js";

export class Tree {
  constructor(ctx, posX, posY) {
    this.ctx = ctx;
    this.posX = posX;
    this.posY = posY;
    this.branches = [];
    this.depth = 11;

    this.init();
  }
  init() {
    this.createBranch(this.posX, this.posY, -90, 0);
    this.draw(this.ctx);
  }
  createBranch(startX, startY, angle, depth) {
    if (depth === this.depth) return;
    const len = depth === 0 ? this.random(9, 14) : this.random(0, 11);
    // 가지 생성
    const endX = startX + this.cos(angle) * len * (this.depth - depth);
    const endY = startY + this.sin(angle) * len * (this.depth - depth);
    this.branches.push(
      new Branch(startX, startY, endX, endY, this.depth - depth)
    );
    this.createBranch(endX, endY, angle - this.random(15, 23), depth + 1);
    this.createBranch(endX, endY, angle + this.random(15, 23), depth + 1);
  }
  draw(ctx) {
    // 가지들을 캔버스에 draw
    for (let i = 0; i < this.branches.length; i++) {
      this.branches[i].draw(ctx);
    }
  }
  cos(angle) {
    return Math.cos(this.degToRad(angle));
  }
  sin(angle) {
    return Math.sin(this.degToRad(angle));
  }
  degToRad(angle) {
    return (angle / 180.0) * Math.PI;
  }
  random(min, max) {
    return min + Math.floor(Math.random() * (max - min + 1));
  }
}
