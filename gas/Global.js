const ERROR_USER_UNAUTHORIZED    = ['You are not authorized. Lacking privilages.', 401] 
const ERROR_ITEM_NOT_FOUND       = ['Item not found or does not exist.',404]
const ERROR_BAD_REQUEST          = ['Bad request. Error on a client side.',400]
const ERROR_INTERNAL_SERVER      = ['Something went wrong on a server side.',500]

const QUALITY_LOW     = 32
const QUALITY_MEDIUM = 128
const QUALITY_HIGH   = 258  
const QUALITY_ULTRA   = 512  

class Template {
    constructor(filename='boilerplate',data={}){
      this.template = HtmlService.createTemplateFromFile(filename)
      this.template.data=data
    }
    evaluateWithTitle (title='template title') { return this.template.evaluate().setTitle(title) }
  }
  
class AppError extends Error {
    constructor(...arg) {
        super();
        this.message = arg[0] || ERROR_INTERNAL_SERVER[0]
        this.statusCode = arg[1] || ERROR_INTERNAL_SERVER[1]
        this.returnTo = arg[2] || 'step1'
    }
}