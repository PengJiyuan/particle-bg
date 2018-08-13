class Particle {
  /**
   * @param {DOM} element
   * @param {Object} config
   * 
   * @param {Number} config.distance
   * @param {String} config.color
   * @param {Number} config.radius
   * @param {Number} config.count
   * @param {Number} config.zIndex
   * @param {Float} config.rate
   * @param {Boolean} config.resize
   */
  constructor(element, config = {}) {
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
    this.resize = config.resize || true;
    this.appendCanvas();
    for (let i = 0; i < this.count; i++) {
      this.points.push(this.getPoint());
    }

    if (this.resize) {
      window.onresize = () => {
        this.width = this.element.clientWidth;
        this.height = this.element.clientHeight;
        this.distance = config.distance || this.width / 10;
        this.rate = config.rate || this.width / 10000;
        this.canvas.width = this.width;
        this.canvas.height = this.height;
      };
    }
  }

  // getRgb(color) {
  //   const [r, g, b] = color.slice(4).slice(0, -1).split(',');
  //   return { r, g, b };
  // }

  getPoint() {
    const x = Math.ceil(Math.random() * this.width),
      y = Math.ceil(Math.random() * this.height),
      r = +(Math.random() * this.radius).toFixed(4),
      rateX = +(Math.random() * 2 - 1).toFixed(4),
      rateY = +(Math.random() * 2 - 1).toFixed(4);

    return { x, y, r, rateX, rateY };
  }

  appendCanvas() {
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    this.canvas.style.zIndex = this.zIndex;
    this.element.appendChild(this.canvas);
  }

  draw() {
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.drawPoints();
    this.drawLines();
    window.requestAnimationFrame(this.draw.bind(this));
  }

  drawPoints() {
    this.points.forEach((item, i) => {
      this.ctx.beginPath();
      this.ctx.arc(item.x, item.y, item.r, 0, Math.PI*2, false);
      this.ctx.fillStyle = this.color;
      this.ctx.fill();
      if(item.x > 0 && item.x < this.width && item.y > 0 && item.y < this.height) {
        item.x += item.rateX * this.rate;
        item.y += item.rateY * this.rate;
      } else {
        this.points.splice(i, 1);
        this.points.push(this.getPoint(this.radius));
      }
    });
  }

  dis(x1, y1, x2, y2) {
    var disX = Math.abs(x1 - x2),
      disY = Math.abs(y1 - y2);
  
    return Math.sqrt(disX * disX + disY * disY);
  }

  drawLines() {
    const len = this.points.length;
    //对圆心坐标进行两两判断
    for(let i = 0; i < len; i++) {
      for(let j = len - 1; j >= 0; j--) {
        const x1 = this.points[i].x,
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
  }
}

export default (element, color) => {
  new Particle(element, color).draw();
};
