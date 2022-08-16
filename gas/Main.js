const render = async (parameters) => {
  try{
    const {compressedPixelsArray,height,width,type,sheet='new'} = parameters
    let { cellResolution = 10 } = parameters

    if(!compressedPixelsArray || !height ||  !width || !type || Math.max(width,height)>QUALITY_ULTRA) throw new AppError(...ERROR_BAD_REQUEST)

    toast('Decompressing the picture...','Notice 4 ouf of 9',30)
    const pixelsArray = JSON.parse( LZW.decompress(compressedPixelsArray) )
    
    toast('Creating a new sheet...','Notice 5 ouf of 9')
    const sh = sheet == 'new' ? SpreadsheetApp.getActiveSpreadsheet().insertSheet() : SpreadsheetApp.getActiveSheet()
    sh.getRange(1,1,height,width)
    
    const content = new Array
    const colors = new Array 

    toast('Extracting colors...','Notice 6 ouf of 9')
    if(type==='colors')
      pixelsArray.forEach( row => colors.push( row.map( ([r,g,b]) => rgbToHex_(r,g,b) )  ) )
    else if(type==='gray')
      pixelsArray.forEach( row => colors.push( row.map( ([r,g,b]) => grayScale_(r,g,b) )  )  )
  
    else if(type==='ascii')
      pixelsArray.forEach( row => {
        colors.push( row.map( ([r,g,b]) => rgbToHex_(r,g,b) )  )
        content.push( row.map( ([r,g,b]) => asciiScale_(r,g,b) ) ) 
      })
    else if(type==='emojis'){
      pixelsArray.forEach( row => content.push( row.map( ([r,g,b]) => `=UNICHAR( ${getEmojiUnicode_(r,g,b)} )` ) ) )
      content.forEach( row => colors.push( row.map( unicode => EMOJIS[unicode.match(/\d+/)[0]] ) ) )
    }

    toast('Adding neccessary changes to the sheet...','Notice 7 ouf of 9')
    if(width>sh.getMaxColumns()) sh.insertColumns(1,width-sh.getMaxColumns())
    if(height>sh.getMaxRows()) sh.insertRows(1,height-sh.getMaxRows())

    toast('Drawing an art work...','Notice 8 ouf of 9',15) 
    if(type==='colors' || type==='gray')
      sh.getRange(1,1,height,width).setBackgrounds(colors) 
    else if(type==='ascii'){
      sh.getRange(1,1,height,width)
      .setFontColors(colors)
      .setFontWeight('bold')
      .setValues(content)
      .setFontSize(cellResolution-4) 
    }else if(type==='emojis'){
      sh.getRange(1,1,height,width)
        .setBackgrounds(colors)
        .setFormulas(content)
        .setFontWeight('bold')
        .setFontSize(cellResolution-4) 
    }
    sh.setRowHeightsForced(1,height,cellResolution)
    sh.setColumnWidths(1,width,cellResolution)
    
    toast('The pixel art is ready! Enjoy!','Notice 9 out of 9')
    return {success:true}
  }catch(e){
    toast(`An error occured. Please try again. E:${e}`,'Error',10)
    return start()
  }
} 
 

