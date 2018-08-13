/*!
 * particle-bg v0.1.1
 * https://github.com/PengJiyuan/particle-bg
 *
 * Copyright (c) 2018 PengJiyuan
 * Licensed under the MIT license.
 */
var Particle = function Particle(element, config) {
  var this$1 = this;
  if ( config === void 0 ) config = {};

  this.element = document.querySelector(element);
  this.color = config.color || '#fff';
  this.width = this.element.clientWidth;
  this.height = this.element.clientHeight;
  this.distance = config.distance || this.width / 10;
  this.radius = config.radius || 2;
  this.points = [];
  this.count = config.count || 100;
  this.zIndex = config.zIndex || 1;
  this.rate = config.rate || 0.2;
  this.appendCanvas();
  for (var i = 0; i < this.count; i++) {
    this$1.points.push(this$1.getPoint());
  }
};

// getRgb(color) {
// const [r, g, b] = color.slice(4).slice(0, -1).split(',');
// return { r, g, b };
// }

Particle.prototype.getPoint = function getPoint () {
  var x = Math.ceil(Math.random() * this.width),
    y = Math.ceil(Math.random() * this.height),
    r = +(Math.random() * this.radius).toFixed(4),
    rateX = +(Math.random() * 2 - 1).toFixed(4),
    rateY = +(Math.random() * 2 - 1).toFixed(4);

  return { x: x, y: y, r: r, rateX: rateX, rateY: rateY };
};

Particle.prototype.appendCanvas = function appendCanvas () {
  this.canvas = document.createElement('canvas');
  this.ctx = this.canvas.getContext('2d');
  this.canvas.width = this.width;
  this.canvas.height = this.height;
  this.canvas.style.zIndex = this.zIndex;
  this.element.appendChild(this.canvas);
};

Particle.prototype.draw = function draw () {
  this.ctx.clearRect(0, 0, this.width, this.height);
  this.drawPoints();
  this.drawLines();
  window.requestAnimationFrame(this.draw.bind(this));
};

Particle.prototype.drawPoints = function drawPoints () {
    var this$1 = this;

  this.points.forEach(function (item, i) {
    this$1.ctx.beginPath();
    this$1.ctx.arc(item.x, item.y, item.r, 0, Math.PI*2, false);
    this$1.ctx.fillStyle = this$1.color;
    this$1.ctx.fill();
    if(item.x > 0 && item.x < this$1.width && item.y > 0 && item.y < this$1.height) {
      item.x += item.rateX * this$1.rate;
      item.y += item.rateY * this$1.rate;
    } else {
      this$1.points.splice(i, 1);
      this$1.points.push(this$1.getPoint(this$1.radius));
    }
  });
};

Particle.prototype.dis = function dis (x1, y1, x2, y2) {
  var disX = Math.abs(x1 - x2),
    disY = Math.abs(y1 - y2);
  
  return Math.sqrt(disX * disX + disY * disY);
};

Particle.prototype.drawLines = function drawLines () {
    var this$1 = this;

  var len = this.points.length;
  //对圆心坐标进行两两判断
  for(var i = 0; i < len; i++) {
    for(var j = len - 1; j >= 0; j--) {
      var x1 = this$1.points[i].x,
        y1 = this$1.points[i].y,
        x2 = this$1.points[j].x,
        y2 = this$1.points[j].y,
        disPoint = this$1.dis(x1, y1, x2, y2);
  
      if(disPoint <= this$1.distance) {
        this$1.ctx.beginPath();
        this$1.ctx.moveTo(x1, y1);
        this$1.ctx.lineTo(x2, y2);
        this$1.ctx.strokeStyle = this$1.color;
        //两点之间距离越大，线越细，反之亦然
        this$1.ctx.lineWidth = 1 - disPoint / this$1.distance;
        this$1.ctx.stroke();
      }
    }
  }
};

function index (element, color) {
  new Particle(element, color).draw();
}

export default index;
