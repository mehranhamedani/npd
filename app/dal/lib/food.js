import models from '../../models'

async function getAllFoods(){
    return await models.getFoodModel().findAll()
}

export default{
    getAllFoods
}