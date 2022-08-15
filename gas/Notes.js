/**
 * 
const shrinkDimensionalArray = (arr, limit) => {
  const height = Math.floor(arr.length/2)*2 , width = Math.floor(arr[0]?.length/2)*2
  if(height<=limit && width<=limit) return { shrankArray: arr, shrankHeight : arr.length , shrankWidth:arr[0].length }

  const shrankArray = new Array
  for(let j=0; j<height;j+=2){
    let row = new Array
    for(let i=0;i<width;i+=2){
        row.push( avgV2(
            arr[j][i],
            arr[j][i+1],
            arr[j+1][i],
            arr[j+1][i+1]
        ) )
    }
    shrankArray.push(row)
  }
  if( height/2 <= limit && width/2 <=limit) return {  shrankArray, shrankHeight : height/2 , shrankWidth:width/2 }
  else return shrinkDimensionalArray(shrankArray,limit)
}

const prepareDimensionalArrayV2 = (data, width, height) => {
  const arr = new Array
  data.forEach( (el,i) => { 
    if( i%(3*width)==0 ) 
      arr.push( [[el]] )
    else if( i%3==0)
      arr[ floor( i/(3*width) ) ].push([el])
    else
      arr[ floor( i/(3*width) ) ][ floor(i%(3*width)/3) ].push(el)
  })
  return arr
}
 
const avgV2 = (...arrays) => arrays
  .reduce( (prev,arr) => arr.map( (el,index) => Math.floor(el+prev[index])  ) )
  .map( el => Math.floor(el/arrays.length) )


const LZW = {
  compress: function (uncompressed) {
      "use strict";
      // Build the dictionary.
      var i,
          dictionary = {},
          c,
          wc,
          w = "",
          result = [],
          dictSize = 256;
      for (i = 0; i < 256; i += 1) {
          dictionary[String.fromCharCode(i)] = i;
      }

      for (i = 0; i < uncompressed.length; i += 1) {
          c = uncompressed.charAt(i);
          wc = w + c;
          //Do not use dictionary[wc] because javascript arrays 
          //will return values for array['pop'], array['push'] etc
        // if (dictionary[wc]) {
          if (dictionary.hasOwnProperty(wc)) {
              w = wc;
          } else {
              result.push(dictionary[w]);
              // Add wc to the dictionary.
              dictionary[wc] = dictSize++;
              w = String(c);
          }
      }

      // Output the code for w.
      if (w !== "") {
          result.push(dictionary[w]);
      }
      return result;
  },

  decompress: function (compressed) {
      "use strict";
      // Build the dictionary.
      var i,
          dictionary = [],
          w,
          result,
          k,
          entry = "",
          dictSize = 256;
      for (i = 0; i < 256; i += 1) {
          dictionary[i] = String.fromCharCode(i);
      }

      w = String.fromCharCode(compressed[0]);
      result = w;
      for (i = 1; i < compressed.length; i += 1) {
          k = compressed[i];
          if (dictionary[k]) {
              entry = dictionary[k];
          } else {
              if (k === dictSize) {
                  entry = w + w.charAt(0);
              } else {
                  return null;
              }
          }

          result += entry;

          // Add w+entry[0] to the dictionary.
          dictionary[dictSize++] = w + entry.charAt(0);

          w = entry;
      }
      return result;
  }
}
 */
