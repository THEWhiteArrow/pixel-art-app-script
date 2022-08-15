const includePro_ = (filename,data={}) => {
    const template = HtmlService.createTemplateFromFile(filename)
    template.data=data
    return HtmlService.createHtmlOutput( template.evaluate()).getContent()
}

const componentToHex_ = (c) => {
    var hex = c.toString(16)
    return hex.length == 1 ? "0" + hex : hex
}
  
const rgbToHex_ = (r, g, b) => "#" + componentToHex_(r) + componentToHex_(g) + componentToHex_(b)

const toast = (msg,title='Notice',timeoutSeconds) => SpreadsheetApp.getActiveSpreadsheet().toast(msg,title,timeoutSeconds)
const alert = (msg) => SpreadsheetApp.getUi().alert(msg)
const floor_ = Math.floor.bind()

const luminosity_ = (r,g,b) => floor_(0.3 * r + 0.59 * g + 0.11 * b)

const grayScale_ = (r,g,b) =>   {
  const nr=Math.min(r,255)
  const ng=Math.min(g,255)
  const nb=Math.min(b,255)
  const scale = luminosity_(nr,ng,nb)
  return rgbToHex_(scale,scale,scale)
}


const ascii = "$@B%8&WM#*oahkbdpqwmZO0QLCJUYXzcvunxrjft/\|()1{}[]?-_+~<>i!lI;:," + '"' + "^`'. "
const asciiScale_ = (r,g,b) => ascii[ floor_(luminosity_(r,g,b)*ascii.length/255) ]
 
const emojis = `⬛⚫⬛⚫⬛⚫⬛⚫⛰⛴⛷⛸❤❣⤴✈✏✒✔✖➡❔❕➕➖➗➰➿♈♉♊♋♌♍♎♏♐♑♒♓⛎⌚☔⏩⏪⏫⏬⏭⏮⏯⏸⏹⏺Ⓜ⏲⚓♿☕⚡⛔⛽❌❓❗⏰⛺✅❎✊☝✋✌✍⭐✨⏳⛵⛹⛪⌛⛲⏱⚽⤵♟⛏⛱⛑✉⛓⛩✂⬅⬆⬇✝✡✳✴❄❇⚪⚾⛄⛅⬜`
const emojisScale_ = (r,g,b) => emojis[ floor_(luminosity_(r,g,b)*emojis.length/255) ]

const emojisObject = {
    "⬛": "#000000",
    "⚫": "#000000",
    "⛰": "#000000",
    "⛴": "#000000",
    "⛷": "#000000",
    "⛸": "#2b2b2b",
    "❤": "#2b2b2b",
    "❣": "#2b2b2b",
    "⤴": "#2b2b2b",
    "✈": "#2b2b2b",
    "✏": "#2b2b2b",
    "✒": "#2b2b2b",
    "Ⓜ": "#2b2b2b",
    "✔": "#2b2b2b",
    "✖": "#2b2b2b",
    "➡": "#2b2b2b",
    "⤵": "#383838",
    "♟": "#383838",
    "⛏": "#383838",
    "⛱": "#383838",
    "⛑": "#383838",
    "✉": "#383838",
    "⛓": "#383838",
    "⛩": "#383838",
    "✂": "#383838",
    "⬅": "#383838",
    "⬆": "#383838", 
    "✝": "#383838",
    "✡": "#383838",
    "✳": "#383838",
    "✴": "#383838",
    "❄": "#383838",
    "❇": "#383838",
    "❔": "#b4acbc",
    "❕": "#b4acbc",
    "➕": "#635994",
    "➖": "#635994",
    "➗": "#635994",
    "➰": "#635994",
    "➿": "#635994",
    "♈": "#8d65c5",
    "♉": "#8d65c5",
    "♊": "#8d65c5",
    "♋": "#8d65c5",
    "♌": "#8d65c5",
    "♍": "#8d65c5",
    "♎": "#8d65c5",
    "♏": "#8d65c5",
    "♐": "#8d65c5",
    "♑": "#8d65c5",
    "♒": "#8d65c5",
    "♓": "#8d65c5",
    "⛎": "#8d65c5",
    "⌚": "#979ce0",
    "☔": "#8d65c5",
    "⏩": "#00a6ed",
    "⏪": "#00a6ed",
    "⏫": "#00a6ed",
    "⏬": "#00a6ed",
    "⏭": "#00a6ed",
    "⏮": "#00a6ed",
    "⏯": "#00a6ed",
    "⏸": "#00a6ed",
    "⏹": "#00a6ed",
    "⏺": "#00a6ed",
    "⏲": "#00a6ed",
    "⚓": "#00a6ed",
    "♿": "#00a6ed",
    "☕": "#7d4533",
    "⚡": "#ff822d",
    "⛔": "#f8312f",
    "⛽": "#f8312f",
    "❌": "#f92f60",
    "❓": "#f8312f",
    "❗": "#f8312f",
    "⏰": "#c12b2a",
    "⛺": "#86d72f",
    "✅": "#00d26a",
    "❎": "#00d26a",
    "✊": "#fdd641",
    "☝": "#fdd641",
    "✋": "#fdd641",
    "✌": "#fdd641",
    "✍": "#fdd641",
    "⭐": "#fdd641",
    "✨": "#fdd641",
    "⏳": "#ffb02e",
    "⛵": "#fcd53f",
    "⛹": "#ff6723",
    "⛪": "#ffce7c", 
    "⛲": "#b4acbc",
    "⏱": "#ffffff",
    "⚽": "#3f5fff",
    "⚪": "#ffffff",
    "⚾": "#f4f4f4",
    "⛄": "#ffffff",
    "⛅": "#fee9b8",
    "⬜": "#ffffff"
  }







const deltaRgb_ = (rgb1, rgb2) => {
  const [ r1, g1, b1 ] = rgb1,
        [ r2, g2, b2 ] = rgb2,
        drp2 = Math.pow(r1 - r2, 2),
        dgp2 = Math.pow(g1 - g2, 2),
        dbp2 = Math.pow(b1 - b2, 2),
        t = (r1 + r2) / 2

  return Math.sqrt(2 * drp2 + 4 * dgp2 + 3 * dbp2 + t * (drp2 - dbp2) / 256)
}
 

const rgbToXYZ_ = (r,g,b)=>{
  var var_R = ( r / 255 )
  var var_G = ( g / 255 )
  var var_B = ( b / 255 )

  if ( var_R > 0.04045 ) var_R = Math.pow( ( ( var_R + 0.055 ) / 1.055 ) , 2.4 )
  else                   var_R = var_R / 12.92
  if ( var_G > 0.04045 ) var_G = Math.pow( ( ( var_G + 0.055 ) / 1.055 ) , 2.4 )
  else                   var_G = var_G / 12.92
  if ( var_B > 0.04045 ) var_B = Math.pow( ( ( var_B + 0.055 ) / 1.055 ) , 2.4 )
  else                   var_B = var_B / 12.92

  var_R = var_R * 100
  var_G = var_G * 100
  var_B = var_B * 100

  var X = var_R * 0.4124 + var_G * 0.3576 + var_B * 0.1805
  var Y = var_R * 0.2126 + var_G * 0.7152 + var_B * 0.0722
  var Z = var_R * 0.0193 + var_G * 0.1192 + var_B * 0.9505
  return [X,Y,Z]
}

const xyzToLAB_ = (arr) => {
  var [X,Y,Z] = arr
  var var_X = X / 100
  var var_Y = Y / 100
  var var_Z = Z / 100

  if ( var_X > 0.008856 ) var_X = Math.pow( var_X , ( 1/3 ) )
  else                    var_X = ( 7.787 * var_X ) + ( 16 / 116 )
  if ( var_Y > 0.008856 ) var_Y = Math.pow( var_Y , ( 1/3 ) )
  else                    var_Y = ( 7.787 * var_Y ) + ( 16 / 116 )
  if ( var_Z > 0.008856 ) var_Z = Math.pow( var_Z , ( 1/3 ) )
  else                    var_Z = ( 7.787 * var_Z ) + ( 16 / 116 )

  var L = ( 116 * var_Y ) - 16
  var a = 500 * ( var_X - var_Y )
  var b = 200 * ( var_Y - var_Z )
  return [L,a,b]
}

function deltaE_(labA, labB){
  var deltaL = labA[0] - labB[0];
  var deltaA = labA[1] - labB[1];
  var deltaB = labA[2] - labB[2];
  var c1 = Math.sqrt(labA[1] * labA[1] + labA[2] * labA[2]);
  var c2 = Math.sqrt(labB[1] * labB[1] + labB[2] * labB[2]);
  var deltaC = c1 - c2;
  var deltaH = deltaA * deltaA + deltaB * deltaB - deltaC * deltaC;
  deltaH = deltaH < 0 ? 0 : Math.sqrt(deltaH);
  var sc = 1.0 + 0.045 * c1;
  var sh = 1.0 + 0.015 * c1;
  var deltaLKlsl = deltaL / (1.0);
  var deltaCkcsc = deltaC / (sc);
  var deltaHkhsh = deltaH / (sh);
  var i = deltaLKlsl * deltaLKlsl + deltaCkcsc * deltaCkcsc + deltaHkhsh * deltaHkhsh;
  return i < 0 ? 0 : Math.sqrt(i);
}

function hexToRgb_(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? [
    parseInt(result[1], 16),
    parseInt(result[2], 16),
    parseInt(result[3], 16)
   ] : null;
}

const R_ = (a=1,b=2) => ( Math.floor(Math.random()*(b-a+1))+a )
 
const getEmoji_ = (r,g,b) => { 
  let diff = Infinity,hex=''
  const lab = xyzToLAB_( rgbToXYZ_(r,g,b) )
  for(let key in emojisObject){
    const arr = hexToRgb_(emojisObject[key])
    const labPom = xyzToLAB_( rgbToXYZ_(...arr) )
    const del = deltaE_(lab,labPom)
    if(del<diff){
      diff=del 
      hex=emojisObject[key]
    }
  }
  let similar = []
  for(let key in emojisObject)
    if(emojisObject[key]==hex)
      similar.push(key)
  return similar[R_(0,similar.length-1)]
}


const LZW={compress:function(f){"use strict";var a,g,d,c={},b="",e=[],h=256;for(a=0;a<256;a+=1)c[String.fromCharCode(a)]=a;for(a=0;a<f.length;a+=1)d=b+(g=f.charAt(a)),c.hasOwnProperty(d)?b=d:(e.push(c[b]),c[d]=h++,b=String(g));return""!==b&&e.push(c[b]),e},decompress:function(e){"use strict";var a,b,f,g,d=[],c="",h=256;for(a=0;a<256;a+=1)d[a]=String.fromCharCode(a);for(a=1,f=b=String.fromCharCode(e[0]);a<e.length;a+=1){if(d[g=e[a]])c=d[g];else{if(g!==h)return null;c=b+b.charAt(0)}f+=c,d[h++]=b+c.charAt(0),b=c}return f}}

 