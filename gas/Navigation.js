const onOpen = (e) => {
  SpreadsheetApp.getUi().createAddonMenu()
    .addItem('Open', 'start')  
    .addSeparator()
    .addItem('Tutorial', 'tutorial')
    .addToUi()
}

const onInstall = (e) => onOpen(e)

const start = () => 
  SpreadsheetApp.getUi().showSidebar( new Template('html/boilerplate',{body:'html/step1'}).evaluateWithTitle('Pixel Art Creator') ) 
 
const tutorial = () => SpreadsheetApp.getUi().showModelessDialog(
   HtmlService.createHtmlOutput( includePro_('html/boilerplate',{body:'html/tutorial',logo:false,footer:false}) ), 'Pixel Art Creator - Tutorial') 

const thanks = (data) => SpreadsheetApp.getUi().showSidebar(new Template('html/boilerplate',{body:'html/thanks',...data}).evaluateWithTitle('Pixel Art Creator - Thanks') ) 
 