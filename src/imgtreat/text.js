
import extend from "extend"

// 输出文本
// 位置都以左上角为准
export let textDraw = (canvas, text, posX, posY, option) => {
  const defaultOption = {
    font : '20px 黑体',
    fillStyle : 'blue',
    lineSpacing : 1,    // 行间距，倍数
    wordSpacing : 1,    // 字间距，倍数
    isVertical : false
  };
  let opt = extend({}, defaultOption, option)
  //
  let context = canvas.getContext("2d");
  context.font = opt.font;
  context.fillStyle = opt.fillStyle;
  let textHeight = parseInt(context.font.match(/\d+/), 10) * opt.lineSpacing;
  if (opt.isVertical == true) {
    let maxCharWidth = 0;
    for (let i=0; i<text.length; i++) {
      let width = context.measureText(text[i]).width
      if (width > maxCharWidth) maxCharWidth = width;
    }
    maxCharWidth = maxCharWidth * opt.wordSpacing
    //
    let textLineArray = text.split("\n");
    for (let i=0; i<textLineArray.length; i++) {
      for (let j=0; j<textLineArray[i].length; j++) {
          let char = textLineArray[i][j];
          context.fillText(char, posX + maxCharWidth * i, posY + textHeight * (j+1));
      }
    }
  } else {
    let maxCharWidth = 0;
    for (let i=0; i<text.length; i++) {
      let width = context.measureText(text[i]).width
      if (width > maxCharWidth) maxCharWidth = width;
    }
    maxCharWidth = maxCharWidth * opt.wordSpacing
    //
    let textLineArray = text.split("\n");
    for (let i=0; i<textLineArray.length; i++) {
      for (let j=0; j<textLineArray[i].length; j++) {
          let char = textLineArray[i][j];
          context.fillText(char, posX + maxCharWidth * (j), posY + textHeight * (i+1));
      }
    }
  }
}
