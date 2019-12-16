import shortid from 'shortid'
import db from '../../db'
import models from '../../models'
import { CustomError } from '../../dto'
import { hasValue } from '../../utilities/funcs'
import texts from '../../resources/texts'
import enums from '../../resources/enums'
import { Sequelize } from 'sequelize'

async function createCustomerOrder(customerName, customerAddress, orderDetails){
    let transaction
    try{
        let sequelize = db.sequelize.getSequelize()
        transaction = await sequelize.transaction()
        let customer = await models.getCustomerModel().create(
            {
                name: customerName, 
                address: customerAddress
            },
            {
                transaction: transaction
            })
        let customerOrder = await models.getCustomerOrderModel().create(
            {
                customerID: customer.customerID, 
                refID: shortid.generate().toUpperCase(), 
                statusID: enums.customerOrderStatus.new
            }, 
            {
                transaction: transaction
            })
        let customerOrderDetails = orderDetails.map(orderDetail =>{
            return {
                customerOrderID: customerOrder.customerOrderID,
                foodID: orderDetail.foodID,
                foodSizeTypeID: orderDetail.foodSizeTypeID,
                count: orderDetail.count
            }
        })
        await models.getCustomerOrderDetailModel().bulkCreate(customerOrderDetails, {transaction: transaction})
        await transaction.commit();
        return customerOrder
    }
    catch(err){
        if (transaction) await transaction.rollback();
        throw new CustomError(500, err.message)
    }
}

async function getCustomerOrderByRefID(refID){
    return await models.getCustomerOrderModel().findOne(
        { 
            where: { refID: refID.toUpperCase() },
            include:[
            {
                model: models.getCustomerOrderDetailModel(),
                include:{
                    model: models.getFoodModel()
                }
            },
            {
                model: models.getCustomerModel()
            }]
        })
}

async function getCustomerOrderByID(customerOrderID){
    return await models.getCustomerOrderModel().findOne(
        { 
            where: { customerOrderID: customerOrderID },
            include:[
            {
                model: models.getCustomerOrderDetailModel(),
                include:{
                    model: models.getFoodModel()
                }
            },
            {
                model: models.getCustomerModel()
            }]
        })
}

async function updateCustomerOrder(customerOrderID, customerID, customerName, customerAddress, orderDetails){
    let transaction
    try{
        const nowTime = Date.now()
        let sequelize = db.sequelize.getSequelize()
        transaction = await sequelize.transaction()

        await models.getCustomerModel()
            .update(
                {
                    name: customerName, 
                    address: customerAddress, 
                    updatedAt: nowTime
                },
                {
                    where:{
                        customerID: customerID
                    }
                },
                {
                    transaction: transaction
                })

        await models.getCustomerOrderDetailModel()
            .destroy(
                { 
                    where: { customerOrderID: customerOrderID }},
                {
                    transaction: transaction
                })

        let customerOrderDetails = orderDetails.map(orderDetail =>{
            return {
                customerOrderID: customerOrderID,
                foodID: orderDetail.foodID,
                foodSizeTypeID: orderDetail.foodSizeTypeID,
                count: orderDetail.count
            }
        })
        await models.getCustomerOrderDetailModel().bulkCreate(customerOrderDetails, {transaction: transaction})

        await models.getCustomerOrderModel()
            .update(
                {
                    updatedAt: nowTime
                },
                {
                    where:{
                        customerOrderID: customerOrderID
                    }
                },
                {
                    transaction: transaction
                })

        await transaction.commit();
    }
    catch(err){
        if (transaction) await transaction.rollback();
        throw new CustomError(500, err.message)
    }
}

async function updateCustomerOrderStatus(customerOrderID, customerOrderStatusID){
    try{
        await models.getCustomerOrderModel()
            .update(
                {
                    statusID: customerOrderStatusID,
                    updatedAt: Date.now()
                },
                {
                    where:{
                        customerOrderID: customerOrderID
                    }
                })
    }
    catch(err){
        throw new CustomError(500, err.message)
    }
}

async function deleteCustomerOrder(customerID, customerOrderID){
    let transaction
    try{
        let sequelize = db.sequelize.getSequelize()
        transaction = await sequelize.transaction()
        
        await models.getCustomerOrderDetailModel()
            .destroy(
                { 
                    where: { customerOrderID: customerOrderID }},
                {
                    transaction: transaction
                })

        await models.getCustomerOrderModel()
            .destroy(
                { 
                    where: { customerOrderID: customerOrderID }},
                {
                    transaction: transaction
                })

        await models.getCustomerModel()
            .destroy(
                { 
                    where: { customerID: customerID }},
                {
                    transaction: transaction
                })

        await transaction.commit();
    }
    catch(err){
        if (transaction) await transaction.rollback();
        throw new CustomError(500, err.message)
    }
}

async function getCustomerOrders(name, statusID, skip, limit){
    try{
        let whereClause = []
        if(hasValue(name) && name !== ''){
            whereClause.push({'customer.name':name})
        }
        if(hasValue(statusID) && statusID > -1){
            whereClause.push({statusID:statusID})
        }
        return await models.getCustomerOrderModel()
            .findAll({
                where:{
                    statusID: statusID
                },
                include:[
                    {
                        model: models.getCustomerOrderDetailModel(),
                        include:{
                            model: models.getFoodModel()
                        }
                    },
                    {
                        model: models.getCustomerModel(),
                        where:{
                            '$customer.name$': name
                        }
                    }
                ],
                order: [
                    [ 'customerID', 'ASC' ]
                ],
                offset: skip,
                limit: limit
            })
    }
    catch(err){
        throw new CustomError(500, err.message)
    }
}

export default{
    createCustomerOrder,
    getCustomerOrderByRefID,
    getCustomerOrderByID,
    updateCustomerOrder,
    updateCustomerOrderStatus,
    deleteCustomerOrder,
    getCustomerOrders
}