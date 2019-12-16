import { customerOrderDAL, foodDAL } from '../../dal'
import enums from '../../resources/enums'
import texts from '../../resources/texts'
import { hasValue } from '../../utilities/funcs'
import { CustomError } from '../../dto'
import values from '../../resources/values'

async function getFoods(){
    return await foodDAL.getAllFoods()
}

async function order(customerName, customerAddress, orderDetails){
    return await customerOrderDAL.createCustomerOrder(customerName, customerAddress, orderDetails)
}

async function getOrderByRefID(refID){
    return await customerOrderDAL.getCustomerOrderByRefID(refID)
}

async function getOrderByID(customerOrderID){
    return await customerOrderDAL.getCustomerOrderByID(customerOrderID)
}

async function updateOrder(customerOrderID, customerName, customerAddress, orderDetails){
    let customerOrder = await customerOrderDAL.getCustomerOrderByID(customerOrderID)
    if(!hasValue(customerOrder)) throw new CustomError(400, texts.one)
    if(customerOrder.statusID > enums.customerOrderStatus.preparing) throw new CustomError(400, texts.yoipaycnuyo)
    return await customerOrderDAL.updateCustomerOrder(customerOrderID, customerOrder.customer.customerID, customerName, customerAddress, orderDetails)
}

async function updateOrderStatus(customerOrderID, customerOrderStatusID){
    return await customerOrderDAL.updateCustomerOrderStatus(customerOrderID, customerOrderStatusID)
}

async function deleteOrder(customerOrderID){
    let customerOrder = await customerOrderDAL.getCustomerOrderByID(customerOrderID)
    if(!hasValue(customerOrder)) throw new CustomError(400, texts.one)
    return await customerOrderDAL.deleteCustomerOrder(customerOrder.customer.customerID, customerOrderID)
}

async function getOrders(name, statusID, pageNumber){
    const skip = (pageNumber - 1) * values.pageNumber
    return await customerOrderDAL.getCustomerOrders(name, statusID, skip, values.pageNumber)
}

export default{
    getFoods,
    order,
    getOrderByRefID,
    getOrderByID,
    updateOrder,
    updateOrderStatus,
    deleteOrder,
    getOrders
}