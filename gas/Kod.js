const onOpen = (e) => {
  SpreadsheetApp.getUi().createAddonMenu()
    .addItem('Start', 'start') 
    .addSeparator()
    .addItem('Tutorial', tutorial)
    .addToUi()
}


const onInstall = (e) => onOpen(e)


const start = () => {
  const html = HtmlService.createHtmlOutput( includePro('sidebar') ).setTitle('Pixel Art Image Import')
  SpreadsheetApp.getUi().showSidebar(html) 
}

const tutorial = () => {
  SpreadsheetApp.getUi().alert('tutorial section is still to be developed...')
}

const includePro = (filename,data={}) => {
  const template = HtmlService.createTemplateFromFile(filename)
  template.data=data
  return HtmlService.createHtmlOutput( template.evaluate()).getContent()
}

const pixelArt = async (parameters) => {
  const {data=[],width,height,resolution=1} = parameters
  if(!data || !width || !height) return new Error('no valid parameters were passed')

  SpreadsheetApp.getUi().alert('starting paii...')
  const sh = SpreadsheetApp.getActiveSheet()
  let i = 0

 
  SpreadsheetApp.getUi().alert(`${sh.getMaxColumns()} , ${sh.getMaxRows()}`)
  
  if(width>sh.getMaxColumns()) await  sh.insertColumns(1,width-sh.getMaxColumns())
  if(height>sh.getMaxRows()) await sh.insertRows(1,height-sh.getMaxRows())

  sh.setColumnWidths(1,width,resolution)
  sh.setRowHeights(1,height,resolution)
  sh.clear()

  for(let h=0;h<height;++h)
  for(let w=0;w<width;++w)
    sh.getRange(h+1,w+1).setBackgroundRGB(data[h][w][0],data[h][w][1],data[h][w][2])
    

  SpreadsheetApp.getUi().alert('...finished') 
} 
    
 