export const getContrastColor = (color) => {
  let contrast = '';
  if (color && color.startsWith('#')) {
    let temp = color.split('');
    temp.shift();
    contrast = temp.map(i => i = swap(i));
    contrast = `#${contrast.join('')}`;
  }
  else if ((color && color.startsWith('RGB')) || (color && color.startsWith('rgb'))) {
    // console.log('rgb!');
  }
  else {
    // console.log('nope');
  }
  return contrast;
};

export const swap = (i) => {
  switch(i) {
  case '0':
    i = 'F';
    break;
  case '1':
    i = 'E';
    break;
  case '2':
    i = 'D';
    break;
  case '3':
    i = 'C';
    break;
  case '4':
    i = 'B';
    break;
  case '5':
    i = 'A';
    break;
  case '6':
    i = '9';
    break;
  case '7':
    i = '8';
    break;
  case '8':
    i = '7';
    break;
  case '9':
    i = '6';
    break;
  case 'A':
    i = '5';
    break;
  case 'B':
    i = '4';
    break;
  case 'C':
    i = '3';
    break;
  case 'D':
    i = '2';
    break;
  case 'E':
    i = '1';
    break;
  case 'F':
    i = '0';
    break;
  case 'a':
    i = '5';
    break;
  case 'b':
    i = '4';
    break;
  case 'c':
    i = '3';
    break;
  case 'd':
    i = '2';
    break;
  case 'e':
    i = '1';
    break;
  case 'f':
    i = '0';
    break;
  default:
    i = '0';
  }
  return i;
};

export const hexCodes = {
  0: '0',
  1: '1',
  2: '2',
  3: '3',
  4: '4',
  5: '5',
  6: '6',
  7: '7',
  8: '8',
  9: '9',
  10: 'A',
  11: 'B',
  12: 'C',
  13: 'D',
  14: 'E',
  15: 'F'
};

export const rgbVals = {
  0: 0,
  1: 1,
  2: 2,
  3: 3,
  4: 4,
  5: 5,
  6: 6,
  7: 7,
  8: 8,
  9: 9,
  A: 10,
  B: 11,
  C: 12,
  D: 13,
  E: 14,
  F: 15
};

export const colorNames = {'aliceblue':'#f0f8ff','antiquewhite':'#faebd7','aqua':'#00ffff','aquamarine':'#7fffd4','azure':'#f0ffff',
  'beige':'#f5f5dc','bisque':'#ffe4c4','black':'#000000','blanchedalmond':'#ffebcd','blue':'#0000ff','blueviolet':'#8a2be2','brown':'#a52a2a','burlywood':'#deb887',
  'cadetblue':'#5f9ea0','chartreuse':'#7fff00','chocolate':'#d2691e','coral':'#ff7f50','cornflowerblue':'#6495ed','cornsilk':'#fff8dc','crimson':'#dc143c','cyan':'#00ffff',
  'darkblue':'#00008b','darkcyan':'#008b8b','darkgoldenrod':'#b8860b','darkgray':'#a9a9a9','darkgreen':'#006400','darkkhaki':'#bdb76b','darkmagenta':'#8b008b','darkolivegreen':'#556b2f',
  'darkorange':'#ff8c00','darkorchid':'#9932cc','darkred':'#8b0000','darksalmon':'#e9967a','darkseagreen':'#8fbc8f','darkslateblue':'#483d8b','darkslategray':'#2f4f4f','darkturquoise':'#00ced1',
  'darkviolet':'#9400d3','deeppink':'#ff1493','deepskyblue':'#00bfff','dimgray':'#696969','dodgerblue':'#1e90ff',
  'firebrick':'#b22222','floralwhite':'#fffaf0','forestgreen':'#228b22','fuchsia':'#ff00ff',
  'gainsboro':'#dcdcdc','ghostwhite':'#f8f8ff','gold':'#ffd700','goldenrod':'#daa520','gray':'#808080','green':'#008000','greenyellow':'#adff2f',
  'honeydew':'#f0fff0','hotpink':'#ff69b4',
  'indianred ':'#cd5c5c','indigo':'#4b0082','ivory':'#fffff0','khaki':'#f0e68c',
  'lavender':'#e6e6fa','lavenderblush':'#fff0f5','lawngreen':'#7cfc00','lemonchiffon':'#fffacd','lightblue':'#add8e6','lightcoral':'#f08080','lightcyan':'#e0ffff','lightgoldenrodyellow':'#fafad2',
  'lightgrey':'#d3d3d3','lightgreen':'#90ee90','lightpink':'#ffb6c1','lightsalmon':'#ffa07a','lightseagreen':'#20b2aa','lightskyblue':'#87cefa','lightslategray':'#778899','lightsteelblue':'#b0c4de',
  'lightyellow':'#ffffe0','lime':'#00ff00','limegreen':'#32cd32','linen':'#faf0e6',
  'magenta':'#ff00ff','maroon':'#800000','mediumaquamarine':'#66cdaa','mediumblue':'#0000cd','mediumorchid':'#ba55d3','mediumpurple':'#9370d8','mediumseagreen':'#3cb371','mediumslateblue':'#7b68ee',
  'mediumspringgreen':'#00fa9a','mediumturquoise':'#48d1cc','mediumvioletred':'#c71585','midnightblue':'#191970','mintcream':'#f5fffa','mistyrose':'#ffe4e1','moccasin':'#ffe4b5',
  'navajowhite':'#ffdead','navy':'#000080',
  'oldlace':'#fdf5e6','olive':'#808000','olivedrab':'#6b8e23','orange':'#ffa500','orangered':'#ff4500','orchid':'#da70d6',
  'palegoldenrod':'#eee8aa','palegreen':'#98fb98','paleturquoise':'#afeeee','palevioletred':'#d87093','papayawhip':'#ffefd5','peachpuff':'#ffdab9','peru':'#cd853f','pink':'#ffc0cb','plum':'#dda0dd','powderblue':'#b0e0e6','purple':'#800080',
  'rebeccapurple':'#663399','red':'#ff0000','rosybrown':'#bc8f8f','royalblue':'#4169e1',
  'saddlebrown':'#8b4513','salmon':'#fa8072','sandybrown':'#f4a460','seagreen':'#2e8b57','seashell':'#fff5ee','sienna':'#a0522d','silver':'#c0c0c0','skyblue':'#87ceeb','slateblue':'#6a5acd','slategray':'#708090','snow':'#fffafa','springgreen':'#00ff7f','steelblue':'#4682b4',
  'tan':'#d2b48c','teal':'#008080','thistle':'#d8bfd8','tomato':'#ff6347','turquoise':'#40e0d0',
  'violet':'#ee82ee',
  'wheat':'#f5deb3','white':'#ffffff','whitesmoke':'#f5f5f5',
  'yellow':'#ffff00','yellowgreen':'#9acd32'};

export const getSecondVal = (val) => {
  const temp = `${val}`.split('.')[1];
  const final = Math.floor(Number(`.${temp || 0}`) * 16);
  return final;
};