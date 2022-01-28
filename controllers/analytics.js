const moment = require('moment')
const Order = require('../models/Order')
const errorHandler = require('../utils/errorHandler')


module.exports.overview = async function (req, res) {
    try {
        const allOrders = await Order.find({user: req.user.id}).sort({date: 1})
        const ordersMap = getOrdersMap(allOrders)
        const yesterdayOrders = ordersMap[moment().add(-1, 'd').format('DD.MM.YYYY')] || []

        //Количество заказов вчера
        const yesterdayOrdersNumber = yesterdayOrders.length
        //Количество заказов
        const totalOrdersNumber = allOrders.length
        // Количество дней всего
        const daysNumber = Object.keys(ordersMap).length
        // Заказов в день
        const ordersPerDay = (totalOrdersNumber / daysNumber).toFixed(0)
        // Процент для кол-во заказов
        const ordersPrecent = (((yesterdayOrdersNumber / ordersPerDay)-1)*100).toFixed(2)
        //ОБщая выручка
        const totalGain = calculatePrice(allOrders)
        //Выручка в день
        const gainPerDay = totalGain / daysNumber
        //выручка за вчера
        const ysterdayGain = calculatePrice(yesterdayOrders)
        // Процент выручки
        const gainPrecent = (((ysterdayGain / gainPerDay)-1)*100).toFixed(2)
        //Сравнение выручки
        const compareGain = (ysterdayGain - gainPerDay).toFixed(2)
        //Сравнение кол-во заказов
        const compareNumber = (yesterdayOrdersNumber - ordersPerDay).toFixed(2)


        res.status(200).json({
            gain: {
                precent: Math.abs(+gainPrecent),
                compare: Math.abs(+compareGain),
                yesterday: +ysterdayGain,
                isHigher: +gainPrecent
            },
            orders: {
                precent: Math.abs(+ordersPrecent),
                compare: Math.abs(+compareNumber),
                yesterday: +yesterdayOrdersNumber,
                isHigher: +ordersPrecent > 0
            }
        })


    } catch (e) {
        errorHandler(res, e)
    }


}

module.exports.analytics = async function (req, res) {
    try {
        const allOrders  = await Order.find({user: req.user.id}.sort({date: 1}))
        const ordersMap = getOrdersMap(allOrders)

        const average = +(calculatePrice(allOrders) / Object.keys(ordersMap).length).toFixed(2)

        const chart = Object.keys(ordersMap).map(label => {
            // label == 05.05.2021
            const gain = calculatePrice(ordersMap[label])
            const order = ordersMap[label].length
            return {gain, order, label}
        })
        res.status(200).json({average, chart})
    } catch (e) {
        errorHandler(res, e)
    }

}

function getOrdersMap(orders = []) {
    const daysOrders = {}
    orders.forEach(order => {
        const date = moment(order.date).format('DD.MM.YYYY')

        if (date === moment().format('DD.MM.YYYY')) {
            return
        }

        if (!daysOrders[date]) {
            daysOrders[date] = []
        }

        daysOrders[date].push(order)

    })
    return daysOrders
}


function calculatePrice(orders = []) {
    return orders.reduce((total, order) => {
        const orderPrice = order.list.reduce((orderTotal, item) => {
            return orderTotal += item.cost * item.quantity
        }, 0)
        return total += orderPrice
    }, 0)

}
