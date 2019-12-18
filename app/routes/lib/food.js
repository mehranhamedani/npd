import { Router } from 'express'
import { foodController } from '../../controllers'
import { CustomError } from '../../dto'
import texts from '../../resources/texts'
import { hasValue, checkOrderDetails } from '../../utilities/funcs'

let router = Router()

// TODO: data input validation

router.get('/getFoods', async function (req, res, next) {
  try{
    req.data = await foodController.getFoods()
    next()
  }
  catch(err){
    next(err)
  }
})

router.post('/order', async function (req, res, next) {
  try{
    if(!hasValue(req.body.customerName) || req.body.customerName === '') throw new CustomError(400, texts.cnir)
    if(!hasValue(req.body.customerAddress) || req.body.customerAddress === '') throw new CustomError(400, texts.cair)
    if(!hasValue(req.body.orderDetails)) throw new CustomError(400, texts.odir)
    const checkOrderResult = checkOrderDetails(req.body.orderDetails)
    if(checkOrderResult.hasError) throw new CustomError(400, checkOrderResult.message)

    let customerOrder = await foodController.order(req.body.customerName, req.body.customerAddress, req.body.orderDetails)
    req.data = {
      refID: customerOrder.refID
    }
    next()
  }
  catch(err){
    next(err)
  }
})

router.get('/getOrderByRefID/:refID', async function (req, res, next) {
  try{
    const refID = req.params['refID']
    if(!hasValue(refID) || refID === '') throw new CustomError(400, texts.rir)

    req.data = await foodController.getOrderByRefID(refID)
    next()
  }
  catch(err){
    next(err)
  }
})

router.get('/getOrderByID/:id', async function (req, res, next) {
  try{
    const customerOrderID = req.params['id']
    if(!hasValue(customerOrderID) || customerOrderID === '') throw new CustomError(400, texts.rir)

    req.data = await foodController.getOrderByID(customerOrderID)
    next()
  }
  catch(err){
    next(err)
  }
})

router.put('/updateOrder', async function (req, res, next) {
  try{
    if(!hasValue(req.body.customerOrderID)) throw new CustomError(400, texts.coir)
    if(!hasValue(req.body.customerName) || req.body.customerName === '') throw new CustomError(400, texts.cnir)
    if(!hasValue(req.body.customerAddress) || req.body.customerAddress === '') throw new CustomError(400, texts.cair)
    const checkOrderResult = checkOrderDetails(req.body.orderDetails)
    if(checkOrderResult.hasError) throw new CustomError(400, checkOrderResult.message)

    await foodController.updateOrder(req.body.customerOrderID, req.body.customerName, req.body.customerAddress, req.body.orderDetails)
    next()
  }
  catch(err){
    next(err)
  }
})

router.put('/updateOrderStatus', async function (req, res, next) {
  try{
    if(!hasValue(req.body.customerOrderID)) throw new CustomError(400, texts.coir)
    if(!hasValue(req.body.statusID)) throw new CustomError(400, texts.sir)

    await foodController.updateOrderStatus(req.body.customerOrderID, req.body.statusID)
    next()
  }
  catch(err){
    next(err)
  }
})

router.delete('/deleteOrder/:id', async function (req, res, next) {
  try{
    const customerOrderID = req.params['id']
    if(!hasValue(customerOrderID)) throw new CustomError(400, texts.coir)

    await foodController.deleteOrder(parseInt(customerOrderID))
    next()
  }
  catch(err){
    next(err)
  }
})

router.get('/getOrders', async function (req, res, next) {
  try{
    if(!hasValue(req.query.pageNumber)) throw new CustomError(400, texts.pnir)

    let customerName = ''
    let statusID = -1
    if(hasValue(req.query.name)) customerName = req.query.name
    if(hasValue(req.query.statusID)) statusID = parseInt(req.query.statusID)
    const pageNumber = parseInt(req.query.pageNumber)

    req.data = await foodController.getOrders(customerName, statusID, pageNumber)
    next()
  }
  catch(err){
    next(err)
  }
})

export default router