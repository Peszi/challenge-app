import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {RequestService} from "./services/request.service";
import {b, e, p} from "@angular/core/src/render3";

const ENTITIES_COUNT = 512;
const ENTITY_INTERVAL = 5;
const ENTITY_SPEED = 2;
const ENTITY_LENGTH = 32;

const COLLISION_DIST = 20;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  @ViewChild('myCanvas') canvasRef: ElementRef;

  title = 'app';

  source;

  private tick: number;
  private width: number;
  private height: number;

  private entities: Entity[] = [];

  private ctx: CanvasRenderingContext2D;

  constructor(private requestService: RequestService) {}

  ngOnInit(): void {
    this.requestService.getHello()
      .subscribe((name: string) => { this.title = name; });
    this.source = new Image();
    this.source.src = 'assets/guy.png';
    this.initCanvas();
  }

  initCanvas() {
    this.tick = 0;
    this.initCanvasSize();
    this.ctx = this.canvasRef.nativeElement.getContext('2d');
    this.ctx.fillStyle = '#242424';
    this.paintLoop();
  }

  initCanvasSize() {
    this.width = document.body.clientWidth;
    this.height = document.body.clientHeight;
    this.canvasRef.nativeElement.width = this.width;
    this.canvasRef.nativeElement.height = this.height;
  }

  paintLoop() {
    if (this.tick >= ENTITY_INTERVAL) {
      this.addEntity();
      this.tick = 0;
    }
    this.tick++;

    this.updateEntities();

    this.clearCanvas();
    this.drawGuys();
    this.drawEntities();
    this.drawCollisions();

    requestAnimationFrame(() => { this.paintLoop(); });
  }

  private addEntity() {
    let dir = 1;
    if (Math.random() > 0.5) { dir = -1; }

    const DISTANCE_BETWEEN = 96;
    const line = (this.width + this.height) * Math.random();
    const slots_count = Math.floor(line / DISTANCE_BETWEEN);
    const position = DISTANCE_BETWEEN * slots_count;

    let x = 0;
    let y = 0;
    if (position <= this.width) {
      x = position;
    } else {
      y = position - this.width;
      if (dir < 0) {
        x = this.width;
      }
    }

    const l = (Math.random() + 0.5);
    const speed = (Math.random() + 0.5) * ENTITY_SPEED;

    this.entities.push(new Entity(x, y, l, speed, dir));
    if (this.entities.length > ENTITIES_COUNT) {
      this.entities.shift();
    }
  }

  private updateEntities() {
    for (let entity of this.entities) {
      this.checkColliding(entity);
      if (!entity.collide) {
        entity.x += entity.speed * entity.dir;
        entity.y += entity.speed;
      }
    }
  }

  private clearCanvas() {
    this.ctx.fillStyle =  'rgb(253, 220, 45)';
    this.ctx.fillRect(0, 0, this.canvasRef.nativeElement.clientWidth, this.canvasRef.nativeElement.clientHeight);
  }

  private drawEntities() {
    this.ctx.strokeStyle = 'rgba(0, 0, 0, .5)';
    this.ctx.beginPath();
    for (let entity of this.entities) {
      this.drawLine(entity);
    }
    this.ctx.stroke();
  }

  private drawLine(entity: Entity) {
    const len = ENTITY_LENGTH;
    if (entity.dir < 0) {
      this.ctx.moveTo(entity.x + len + 15, entity.y - len - 10);
      this.ctx.lineTo(entity.x + 15, entity.y - 10);

      this.ctx.moveTo(entity.x + len + 15, entity.y - len - 20);
      this.ctx.lineTo(entity.x + 15, entity.y - 20);

      this.ctx.moveTo(entity.x + len + 25, entity.y - len - 10);
      this.ctx.lineTo(entity.x + 35, entity.y - 20);
    } else {
      this.ctx.moveTo(entity.x - len - 15, entity.y - len - 10);
      this.ctx.lineTo(entity.x - 15, entity.y - 10);

      this.ctx.moveTo(entity.x - len - 15, entity.y - len - 20);
      this.ctx.lineTo(entity.x - 15, entity.y - 20);

      this.ctx.moveTo(entity.x - len - 25, entity.y - len - 10);
      this.ctx.lineTo(entity.x - 35, entity.y - 20);
    }
  }

  private drawGuys() {
    for (let entity of this.entities) {
      this.drawGuy(entity);
    }
  }

  private drawGuy(entity: Entity) {
    const angle = 0;
    const scaleX = -entity.dir;
    const scaleY = entity.l;
    this.ctx.translate(entity.x, entity.y);
    this.ctx.scale(scaleX, 1);
    this.ctx.rotate(angle);
    // draw guy
    this.ctx.drawImage(this.source, -this.source.width / 2, -this.source.height / 2, this.source.width, this.source.height);
    this.ctx.rotate(-angle);
    this.ctx.scale(scaleX, 1);
    this.ctx.translate(-entity.x, -entity.y);
  }

  drawCollisions() {
    for (let entity of this.entities) {
      // draw collision
      if (entity.collide) {
        this.ctx.strokeStyle = 'rgba(255, 0, 0, .5)';
      } else {
        this.ctx.strokeStyle = 'rgba(0, 0, 0, .5)';
      }
      this.ctx.beginPath();
      this.ctx.arc(entity.x, entity.y, COLLISION_DIST, 0, 2 * Math.PI);
      this.ctx.stroke();
    }
  }

  checkColliding(entityColl: Entity) {
    const min_dist = COLLISION_DIST * 2;
    for (let entity of this.entities) {
      if (entity !== entityColl && !entity.collide) {
        const dist = this.getDistance(entityColl, entity);
        if (dist < min_dist) {
          if (entityColl.y < entity.y) {
            entityColl.collide = true;
          } else {
            entity.collide = true;
          }
          return;
        }
      }
    }
    entityColl.collide = false;
  }

  getDistance(entityA: Entity, entityB: Entity) {
    const x2 = entityB.x - entityA.x;
    const y2 = entityB.y - entityA.y;
    return Math.sqrt(x2 * x2 + y2 * y2);
  }
}

export class Entity {

  x: number; y: number; l: number; speed: number; dir: number; collide: boolean;


  constructor(x: number, y: number, l: number, speed: number, dir: number) {
    this.x = x;
    this.y = y;
    this.l = l;
    this.speed = speed;
    this.dir = dir;
    this.collide = false;
  }
}
