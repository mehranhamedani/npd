import request from 'supertest'
import app from '../../index'

describe('Test getFoods API', () => {
  it('should get foods', async () => {
    const res = await request(app).get('/food/getFoods')
    expect(res.statusCode).toEqual(200)
    expect(res.body.hasError).toEqual(false)
  })
})

describe('Test order API', () => {
  it('should create order', async () => {
    const res = await request(app)
      .post('/food/order')
      .send({
        customerName: "Mehran Hamedani Nezhad",
        customerAddress: "Tehran, Iran",
        orderDetails: [
          {
            foodID: 1,
            foodSizeTypeID: 1,
            count: 2
          },
          {
            foodID: 2,
            foodSizeTypeID: 2,
            count: 3
          },
          {
            foodID: 3,
            foodSizeTypeID: 3,
            count: 4
          }
        ]
      });
    expect(res.statusCode).toEqual(200)
    expect(res.body.hasError).toEqual(false)
  })
})

describe('Test getOrderByRefID API', () => {
  it('should get order by refID', async () => {
    const res = await request(app).get('/food/getOrderByRefID/test')
    expect(res.statusCode).toEqual(200)
    expect(res.body.hasError).toEqual(false)
  })
})

describe('Test getOrderByID API', () => {
  it('should get order by ID', async () => {
    const res = await request(app).get('/food/getOrderByID/1')
    expect(res.statusCode).toEqual(200)
    expect(res.body.hasError).toEqual(false)
  })
})

describe('Test updateOrder API', () => {
  it('should update Order', async () => {
    const res = await request(app)
      .put('/food/updateOrder')
      .send({
        customerOrderID: 1,
        customerName: "Mehran Hamedani Nezhad",
        customerAddress: "Tehran, Iran",
        orderDetails: [
          {
            foodID: 1,
            foodSizeTypeID: 1,
            count: 2
          },
          {
            foodID: 2,
            foodSizeTypeID: 2,
            count: 3
          },
          {
            foodID: 3,
            foodSizeTypeID: 3,
            count: 4
          }
        ]
      })
    expect(res.statusCode).toEqual(200)
    expect(res.body.hasError).toEqual(false)
  })
})

describe('Test updateOrderStatus API', () => {
  it('should update order status', async () => {
    const res = await request(app)
      .put('/food/updateOrderStatus')
      .send({
        customerOrderID: 1,
        statusID: 1
      })
    expect(res.statusCode).toEqual(200)
    expect(res.body.hasError).toEqual(false)
  })
})

describe('Test deleteOrder API', () => {
  it('should delete order', async () => {
    const res = await request(app).put('/food/deleteOrder/1')
    expect(res.statusCode).toEqual(200)
    expect(res.body.hasError).toEqual(false)
  })
})

describe('Test getOrders API', () => {
  it('should get orders', async () => {
    const res = await request(app).put('/food/getOrders?name=Mehran Hamedani Nezhad&statusID=1&pageNumber=1')
    expect(res.statusCode).toEqual(200)
    expect(res.body.hasError).toEqual(false)
  })
})