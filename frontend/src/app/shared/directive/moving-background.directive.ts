import {AfterViewChecked, AfterViewInit, Directive, ElementRef, HostListener, Input, OnInit} from '@angular/core';
import {d, p} from "@angular/core/src/render3";

const LINE_LENGTH = 768;

@Directive({
  selector: '[appMovingBackground]'
})
export class MovingBackgroundDirective implements OnInit {
  @Input() backgroundColor: string;

  private width: number;
  private height: number;

  private ctx: CanvasRenderingContext2D;
  private canvas: HTMLCanvasElement;

  private entities: Entity[] = [];

  constructor(private backgroundElement: ElementRef) {}

  ngOnInit(): void {
    this.canvas = <HTMLCanvasElement>this.backgroundElement.nativeElement;
    this.ctx = this.canvas.getContext('2d');
    this.canvas.style.position = 'absolute';
    this.canvas.style.top  = '0';
    this.canvas.style.bottom  = '0';
    this.canvas.style.left  = '0';
    this.canvas.style.right  = '0';
    this.onCanvasChange();
    this.paintLoop();
    setInterval(() => this.addEntity(), 500);
  }

  @HostListener('window:resize')
  onWindowResize() {
    this.onCanvasChange();
  }

  onCanvasChange(): void {
    this.canvas.width = document.body.clientWidth;
    this.canvas.height = document.body.clientHeight;
  }

  private paintLoop() {
    this.clearCanvas();

    this.updateEntities();
    this.drawEntities();

    requestAnimationFrame(() => { this.paintLoop(); });
  }

  private clearCanvas() {
    this.ctx.fillStyle = this.backgroundColor;
    this.ctx.fillRect(0, 0, this.canvas.clientWidth, this.canvas.clientHeight);
    // this.ctx.clearRect(0, 0, this.canvas.clientWidth, this.canvas.clientHeight);
  }

  private addEntity() {
    const DISTANCE_BETWEEN = 96;
    const len = (Math.random() + 0.5) * LINE_LENGTH;
    const line = (this.canvas.width + this.canvas.height) * Math.random();
    const slots_count = Math.floor(line / DISTANCE_BETWEEN);
    let position = DISTANCE_BETWEEN * slots_count;
    let dir = 1;
    if (Math.random() > 0.5) { dir = -1; }
    let y = 0; let x = 0;
    if (dir > 0) { x = this.canvas.width; }
    if (position <= this.canvas.height) {
      y = position;
    } else {
      if (dir > 0) {
        x = position - this.canvas.height;
      } else {
        x = this.canvas.width - (position - this.canvas.height);
      }
    }
    this.entities.push(new Entity(x, y, len, dir));
  }

  private updateEntities() {
    for (let entity of this.entities) {
      entity.update();
      if (entity.pos > (this.canvas.height + LINE_LENGTH)) {
        this.entities.splice(this.entities.indexOf(entity), 1);
      }
    }
  }

  private drawEntities() {
    this.ctx.strokeStyle = 'rgba(0, 0, 0, .5)';
    this.ctx.beginPath();
    for (let entity of this.entities) {
      entity.draw(this.ctx);
    }
    this.ctx.stroke();
  }
}

export class Entity {

  readonly SPEED_GAIN = 1.25;

  x: number; y: number; pos: number; len: number; speed: number; dir: number;

  constructor(x: number, y: number, len: number, dir: number) {
    this.x = x;
    this.y = y;
    this.pos = 0;
    this.len = len;
    this.speed = (Math.random() + 0.5) * this.SPEED_GAIN;
    this.dir = dir;
  }

  update() {
    this.pos += this.speed;
  }

  draw(ctx: CanvasRenderingContext2D) {
    const len = this.len;
    let x = this.x + this.pos * -this.dir;
    let y = this.y + this.pos;
    const LINES_OFFSET = 10;
    if (this.dir > 0) {
      ctx.moveTo(x + len, y - len);
      ctx.lineTo(x, y);

      ctx.moveTo(x + len, y - len - LINES_OFFSET);
      ctx.lineTo(x, y - LINES_OFFSET);

      ctx.moveTo(x + len + LINES_OFFSET, y - len);
      ctx.lineTo(x + LINES_OFFSET, y );
    } else {
      ctx.moveTo(x - len, y - len);
      ctx.lineTo(x, y);

      ctx.moveTo(x - len, y - len - LINES_OFFSET);
      ctx.lineTo(x , y - LINES_OFFSET);

      ctx.moveTo(x - len - LINES_OFFSET, y - len);
      ctx.lineTo(x - LINES_OFFSET, y);
    }

    // ctx.strokeStyle = 'rgba(0, 0, 0, .5)';
    // ctx.beginPath();
    // ctx.arc(this.x, this.y, 50, 0, 2 * Math.PI);
    // ctx.stroke();
  }
}
