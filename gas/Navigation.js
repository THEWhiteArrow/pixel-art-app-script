const onOpen = (e) => {
  SpreadsheetApp.getUi().createAddonMenu()
    .addItem('Open', 'start')  
    .addSeparator()
    .addItem('Tutorial', tutorial)
    .addToUi()
}

const onInstall = (e) => onOpen(e)

const start = () => 
  SpreadsheetApp.getUi().showSidebar( new Template('html/boilerplate',{body:'html/step1'}).evaluateWithTitle('Pixel Art Creator') ) 

const tutorial = () => SpreadsheetApp.getUi().alert('tutorial section is still to be developed...')

const thanks = (data) => SpreadsheetApp.getUi().showSidebar( new Template('html/boilerplate',{body:'html/thanks',...data}).evaluateWithTitle('Pixel Art Creator - Thanks') ) 
 
 