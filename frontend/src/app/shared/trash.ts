// import {ElementRef, ViewChild} from "@angular/core";
// import {RequestService} from "./service/request.service";
// import {Utility} from "./globals";
//
// @ViewChild('myCanvas') canvasRef: ElementRef;
//
// hello = 'loading..';
// pageTitle: string;
//
// source;
//
// private tick: number;
// private width: number;
// private height: number;
//
// private entitiesLeft: Entity[] = [];
// private entitiesRight: Entity[] = [];
//
// private ctx: CanvasRenderingContext2D;
//
// constructor(private element: ElementRef,
//   private requestService: RequestService) {}
//
// ngOnInit(): void {
//   // console.log(this.element.nativeElement);
//   // (<HTMLElement>this.element.nativeElement).style.backgroundColor = 'red';
//   this.pageTitle = Utility.getPageTitle();
// this.requestService.getHello()
//   .subscribe((name: string) => { this.hello = name; });
// // this.source = new Image();
// // this.source.src = 'assets/guy.png';
// // this.initCanvas();
// // this.addEntity();
// // setInterval(() => this.addEntity(), 500);
// }
//
// initCanvas() {
//   this.tick = 0;
//   this.initCanvasSize();
//   this.ctx = this.canvasRef.nativeElement.getContext('2d');
//   this.ctx.fillStyle = '#242424';
//   this.paintLoop();
// }
//
// initCanvasSize() {
//   this.width = document.body.clientWidth;
//   this.height = document.body.clientHeight;
//   this.canvasRef.nativeElement.width = this.width;
//   this.canvasRef.nativeElement.height = this.height;
// }
//
// paintLoop() {
//   if (this.tick >= ENTITY_INTERVAL) {
//     // this.addEntity();
//     this.tick = 0;
//   }
//   this.tick++;
//
//   this.updateEntities(this.entitiesLeft, 1);
//   this.updateEntities(this.entitiesRight, -1);
//
//   this.clearCanvas();
//   // this.drawGuys();
//   this.drawEntities(this.entitiesLeft, 1);
//   this.drawEntities(this.entitiesRight, -1);
//   this.drawCollisions(this.entitiesLeft);
//   this.drawCollisions(this.entitiesRight);
//
//   requestAnimationFrame(() => { this.paintLoop(); });
// }
//
// private addEntity() {
//   // get direction
//   let dir = 1;
//   if (Math.random() > 0.5) { dir = -1; }
//   // get side of entities array
//   let entities = this.entitiesLeft;
//   let entitiesReverse = this.entitiesRight;
//   if (dir > 0) {
//     entities = this.entitiesRight;
//     entitiesReverse = this.entitiesLeft;
//   }
//   // try to find the right position
//   while (true) {
//     // get params
//     const x = this.getRandomPosition(dir);
//     const speed = (Math.random() + 0.5) * ENTITY_SPEED;
//     // check and add the entity
//     if (this.checkPosition(entitiesReverse, x, speed, dir)) {
//       console.log('new ENTITY ' + x + ' speed ' + speed + ' dir ' + dir);
//       const len = (Math.random() + 0.5);
//       entities.push(new Entity(x, x, 0, len, speed));
//       break;
//     } else {
//       console.log("no ENTITY");
//     }
//   }
// }
//
// private getRandomPosition(direction: number) {
//   const line = (this.width / 2 + this.height) * Math.random();
//   const slots_count = Math.floor(line / DISTANCE_BETWEEN);
//   return this.width / 2 + (DISTANCE_BETWEEN * slots_count * direction);
// }
//
// private checkPosition(entitiesReverse: Entity[], x: number, speed: number, direction: number) {
//   // TODO check my side intersection
//   for (let entityReverse of entitiesReverse) {
//
//     // const intersectionY = Math.abs(x - entityReverse.startX) / 2;
//     // const entityDist = intersectionY * Math.SQRT2;
//     // const entityTime = entityDist;
//     // console.log(intersectionY + ' dist ' + entityDist + ' time ' + entityTime + ' speed ' + speed);
//     //
//     // const entityRevDist = (intersectionY - entityReverse.y) * Math.SQRT2;
//     // const entityRevTime = entityRevDist;
//     //
//     // const timeDif = Math.abs(entityTime - entityRevTime);
//     const hDiff = entityReverse.y;
//     if (hDiff < 40) {
//       return false;
//     }
//
//     // calc time to reach intersection
//     // calc entity reverse distance
//     // calc time to reach intersection
//     // compare times with bias
//     // if no intersection return true;
//     // else return false;
//   }
//   return true;
// }
//
// private updateEntities(entities: Entity[], direction: number) {
//   for (let entity of entities) {
//     if (entity.y > (this.height + 50)) {
//       entities.splice(entities.indexOf(entity), 1);
//     }
//     this.updateEntity(entity, direction);
//   }
// }
//
// private updateEntity(entity: Entity, direction: number) {
//   this.checkColliding(entity);
//   entity.x += 1 * direction;
//   entity.y += 1;
//   // if (!entity.collide) {
//   //   console.log(' collision! ');
//   // }
// }
//
// private clearCanvas() {
//   this.ctx.fillStyle =  'rgb(253, 220, 45)';
//   this.ctx.fillRect(0, 0, this.canvasRef.nativeElement.clientWidth, this.canvasRef.nativeElement.clientHeight);
// }
//
// private drawEntities(entities: Entity[], direction: number) {
//   this.ctx.strokeStyle = 'rgba(0, 0, 0, .5)';
//   this.ctx.beginPath();
//   for (let entity of entities) {
//     this.drawLine(entity, direction);
//   }
//   this.ctx.stroke();
// }
//
// private drawLine(entity: Entity, direction: number) {
//   const len = ENTITY_LENGTH;
//   if (direction < 0) {
//     this.ctx.moveTo(entity.x + len + 15, entity.y - len - 10);
//     this.ctx.lineTo(entity.x + 15, entity.y - 10);
//
//     this.ctx.moveTo(entity.x + len + 15, entity.y - len - 20);
//     this.ctx.lineTo(entity.x + 15, entity.y - 20);
//
//     this.ctx.moveTo(entity.x + len + 25, entity.y - len - 10);
//     this.ctx.lineTo(entity.x + 35, entity.y - 20);
//   } else {
//     this.ctx.moveTo(entity.x - len - 15, entity.y - len - 10);
//     this.ctx.lineTo(entity.x - 15, entity.y - 10);
//
//     this.ctx.moveTo(entity.x - len - 15, entity.y - len - 20);
//     this.ctx.lineTo(entity.x - 15, entity.y - 20);
//
//     this.ctx.moveTo(entity.x - len - 25, entity.y - len - 10);
//     this.ctx.lineTo(entity.x - 35, entity.y - 20);
//   }
// }
//
// private drawGuys() {
//   for (let entity of this.entitiesLeft) {
//     this.drawGuy(entity);
//   }
// }
//
// private drawGuy(entity: Entity) {
//   const angle = 0;
//   const scaleX = -entity.dir;
//   const scaleY = entity.l;
//   this.ctx.translate(entity.x, entity.y);
//   this.ctx.scale(scaleX, 1);
//   this.ctx.rotate(angle);
//   // draw guy
//   this.ctx.drawImage(this.source, -this.source.width / 2, -this.source.height / 2, this.source.width, this.source.height);
//   this.ctx.rotate(-angle);
//   this.ctx.scale(scaleX, 1);
//   this.ctx.translate(-entity.x, -entity.y);
// }
//
// drawCollisions(entities: Entity[]) {
//   for (let entity of entities) {
//     // draw collision
//     if (entity.collide) {
//       this.ctx.strokeStyle = 'rgba(255, 0, 0, .5)';
//     } else {
//       this.ctx.strokeStyle = 'rgba(0, 0, 0, .5)';
//     }
//     this.ctx.beginPath();
//     this.ctx.arc(entity.x, entity.y, COLLISION_DIST, 0, 2 * Math.PI);
//     this.ctx.stroke();
//   }
// }
//
// checkColliding(entityColl: Entity) {
//   const min_dist = COLLISION_DIST * 2;
//   for (let entity of this.entitiesLeft) {
//     if (entity !== entityColl && !entity.collide) {
//       const dist = this.getDistance(entityColl.x, entityColl.y, entity.x, entity.y);
//       if (dist < min_dist) {
//         if (entityColl.y < entity.y) {
//           entityColl.collide = true;
//         } else {
//           entity.collide = true;
//         }
//         return;
//       }
//     }
//   }
//   entityColl.collide = false;
// }
//
// getDistance(xA: number, yA: number, xB: number, yB: number) {
//   const x2 = xB - xA;
//   const y2 = yB - yA;
//   return Math.sqrt(x2 * x2 + y2 * y2);
// }
//
// getBackgroundColor() {
//   return Utility.getPageBackground();
// }
// }
//
// export class Entity {
//
//   startX: number; x: number; y: number; l: number; speed: number; dir: number; collide: boolean;
//
//   constructor(startX: number, x: number, y: number, l: number, speed: number) {
//     this.startX = startX;
//     this.x = x;
//     this.y = y;
//     this.l = l;
//     this.speed = speed;
//     this.collide = false;
//   }
// }
