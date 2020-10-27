# particle-bg

生成粒子背景。

## Install

#### NPM

```bash
npm i particle-bg
```

#### CDN

[https://unpkg.com/particle-bg/lib/particle-bg.umd.min.js](https://unpkg.com/particle-bg/lib/particle-bg.umd.min.js)

## Usage

#### ES Module

```javascript
import particleBg from 'particle-bg';

particleBg('body');
```

#### Browser

```html
<script src="https://unpkg.com/particle-bg/lib/particle-bg.umd.min.js"></script>
<script>
  particleBg('body');
</script>
```

## API

### particleBg(element, config)

#### element

要插入粒子背景的DOM。

#### config [Object]

粒子背景的一些配置。

#### config.color

`default: '#fff'`

粒子的颜色。

#### config.count

`default: 100`

粒子的数量

#### config.radius

`default: 2`

粒子的半径

#### config.distance

`default: width / 10`

粒子间距小于多少会连线

#### config.rate

`default: width / 10000`

粒子运动的速率

#### config.zIndex

`default: 1`

canvas的z-index.

#### config.resize

`default: true`

是否监听`window.resize`，自动缩放粒子背景。

#### config.line

`default: true`

粒子之间是否连线。

#### config.bounce

`default: false`

是否触碰边界进行反弹。

## LICENSE

[MIT](./LICENSE) © PengJiyuan
