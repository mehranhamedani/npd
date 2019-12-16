import Sequelize from 'sequelize';
import CustomerhModel from './lib/customer';
import CustomerOrderModel from './lib/customerOrder';
import CustomerOrderDetailModel from './lib/customerOrderDetail';
import FoodModel from './lib/food';

let customerModel =            null
let customerOrderModel =       null
let customerOrderDetailModel = null
let foodModel =                null

export function defineModels(sequelize){

    customerModel =            CustomerhModel(sequelize, Sequelize)
    customerOrderModel =       CustomerOrderModel(sequelize, Sequelize)
    customerOrderDetailModel = CustomerOrderDetailModel(sequelize, Sequelize)
    foodModel =                FoodModel(sequelize, Sequelize)
    
    customerModel.hasMany(customerOrderModel, { foreignKey: 'customerID', targetKey: 'customerID' })
    
    customerOrderModel.belongsTo(customerModel, { foreignKey: 'customerID', targetKey: 'customerID' })
    customerOrderModel.hasMany(customerOrderDetailModel, { foreignKey: 'customerOrderID', targetKey: 'customerOrderID' })
    
    customerOrderDetailModel.belongsTo(customerOrderModel, { foreignKey: 'customerOrderID', targetKey: 'customerOrderID' })
    customerOrderDetailModel.belongsTo(foodModel, { foreignKey: 'foodID', targetKey: 'foodID' })

    foodModel.hasMany(customerOrderDetailModel, { foreignKey: 'foodID', targetKey: 'foodID' })
}

const getCustomerModel = () => customerModel
const getCustomerOrderModel = () => customerOrderModel
const getCustomerOrderDetailModel = () => customerOrderDetailModel
const getFoodModel = () => foodModel

export default{
    getCustomerModel,
    getCustomerOrderModel,
    getCustomerOrderDetailModel,
    getFoodModel
}


