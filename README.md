# particle-bg

生成粒子背景。

## Install

#### NPM

```bash
npm i particle-bg
```

#### CDN

TODO...

## Usage

#### ES Module

```javascript
import particleBg from 'particle-bg';

particleBg('body');
```

#### Browser

```html
<script src="/path/particle-bg.min.js"></script>
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

`default: 150`

粒子间距小于多少会连线

#### config.rate

`default: 0.2`

粒子运动的速率

#### config.zIndex

`default: 1`

canvas的z-index.

## LICENSE

[MIT](./LICENSE) © PengJiyuan
