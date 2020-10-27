/*!
 * particle-bg v0.5.0
 * https://github.com/PengJiyuan/particle-bg
 *
 * Copyright (c) 2018 PengJiyuan
 * Licensed under the MIT license.
 */
function scale (canvasList, opt) {
  var ratio = window.devicePixelRatio || 1,
    ctx = null;

  canvasList.forEach(function (canvas) {
    ctx = canvas.getContext('2d');
    canvas.style.position = opt.position;
    canvas.style.width = opt.width + 'px';
    canvas.style.height = opt.height + 'px';
    canvas.width = opt.width * ratio;
    canvas.height = opt.height * ratio;
    ctx.scale(ratio, ratio);
  });

  return canvasList;
}

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
  this.rate = config.rate || this.width / 10000;
  this.resize = typeof config.resize === 'boolean' ? config.resize : true;
  this.line = typeof config.line === 'boolean' ? config.line : true;
  this.bounce = typeof config.bounce === 'boolean' ? config.bounce : false;
  this.appendCanvas();
  for (var i = 0; i < this.count; i++) {
    this.points.push(this.getPoint());
  }

  if (this.resize) {
    window.onresize = function () {
      this$1.width = this$1.element.clientWidth;
      this$1.height = this$1.element.clientHeight;
      this$1.distance = config.distance || this$1.width / 10;
      this$1.rate = config.rate || this$1.width / 10000;
      this$1.canvas.width = this$1.width;
      this$1.canvas.height = this$1.height;
      scale([this$1.canvas], {
        width: this$1.width,
        height: this$1.height
      });
    };
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
  scale([this.canvas], {
    width: this.width,
    height: this.height
  });
  this.canvas.style.zIndex = this.zIndex;
  this.element.appendChild(this.canvas);
};

Particle.prototype.draw = function draw () {
  this.ctx.clearRect(0, 0, this.width, this.height);
  this.drawPoints();
  if (this.line) {
    this.drawLines();
  }
  window.requestAnimationFrame(this.draw.bind(this));
};

Particle.prototype.drawPoints = function drawPoints () {
    var this$1 = this;

  this.points.forEach(function (item, i) {
    this$1.ctx.beginPath();
    this$1.ctx.arc(item.x, item.y, item.r, 0, Math.PI*2, false);
    this$1.ctx.fillStyle = this$1.color;
    this$1.ctx.fill();
    if (this$1.bounce) {
      if (item.x >= item.r && item.x <= this$1.width - item.r && item.y >= item.r && item.y <= this$1.height - item.r) {
        item.x += item.rateX * this$1.rate;
        item.y += item.rateY * this$1.rate;
      } else {
        if (item.x < item.r || item.x > this$1.width - item.r) {
          item.rateX = -item.rateX;
        }
        if (item.y < item.r || item.y > this$1.height - item.r) {
          item.rateY = -item.rateY;
        }
        item.x += item.rateX * this$1.rate;
        item.y += item.rateY * this$1.rate;
      }
    } else {
      if(item.x >= 0 - item.r && item.x <= this$1.width + item.r && item.y >= 0 - item.r && item.y <= this$1.height + item.r) {
        item.x += item.rateX * this$1.rate;
        item.y += item.rateY * this$1.rate;
      } else {
        this$1.points.splice(i, 1);
        this$1.points.push(this$1.getPoint(this$1.radius));
      }
    }
  });
};

Particle.prototype.dis = function dis (x1, y1, x2, y2) {
  var disX = Math.abs(x1 - x2),
    disY = Math.abs(y1 - y2);
  
  return Math.sqrt(disX * disX + disY * disY);
};

Particle.prototype.drawLines = function drawLines () {
  var len = this.points.length;
  //对圆心坐标进行两两判断
  for(var i = 0; i < len; i++) {
    for(var j = len - 1; j >= 0; j--) {
      var x1 = this.points[i].x,
        y1 = this.points[i].y,
        x2 = this.points[j].x,
        y2 = this.points[j].y,
        disPoint = this.dis(x1, y1, x2, y2);
  
      if(disPoint <= this.distance) {
        this.ctx.beginPath();
        this.ctx.moveTo(x1, y1);
        this.ctx.lineTo(x2, y2);
        this.ctx.strokeStyle = this.color;
        //两点之间距离越大，线越细，反之亦然
        this.ctx.lineWidth = 1 - disPoint / this.distance;
        this.ctx.stroke();
      }
    }
  }
};

function index (element, color) {
  new Particle(element, color).draw();
}

export default index;
