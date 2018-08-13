import buble from 'rollup-plugin-buble';
import { uglify } from 'rollup-plugin-uglify';
import pkg from './package.json';

const banner = `/*!
 * ${pkg.name} v${pkg.version}
 * https://github.com/PengJiyuan/${pkg.name}
 *
 * Copyright (c) 2018 ${pkg.author}
 * Licensed under the ${pkg.license} license.
 */`;

const min = process.env.min;

const config = {
  input: './src/index.js',
  plugins: [
    buble()
  ],
  output: {
    banner
  }
};

if(min) {
  config.plugins.push(uglify({
    output: {
      comments: function(node, comment) {
        var text = comment.value;
        var type = comment.type;
        // to preserve comment begin with !
        if (type == "comment2") {
            return /^!/i.test(text);
        }
      }
    }
  }));
}

export default config;
