import enums from "../resources/enums"
import texts from "../resources/texts"

export function hasValue(value){
    return (value !== null) && (value !== undefined) && (typeof value !== 'undefined')
}

export function checkOrderDetails(orderDetails){
    if(typeof orderDetails !== 'object') return { hasError: true, message: texts.odtii }
    if(!hasValue(orderDetails.length) || orderDetails.length < 1) return { hasError: true, message: texts.odcii }
    for(let i = 0; i < orderDetails.length; i++){
        const orderDetail = orderDetails[i]
        if(!hasValue(orderDetail.foodID) || (typeof orderDetail.foodID !== 'number')) return { hasError: true, message: texts.fii }
        if(!hasValue(orderDetail.foodSizeTypeID) || (typeof orderDetail.foodSizeTypeID !== 'number') || (orderDetail.foodSizeTypeID < enums.foodSizeType.small) || (orderDetail.foodSizeTypeID > enums.foodSizeType.large)) return { hasError: true, message: texts.fstii }
        if(!hasValue(orderDetail.count) || (typeof orderDetail.count !== 'number') || (orderDetail.count < 1)) return { hasError: true, message: texts.cii }
    }
    return { hasError: false, message: '' }
}