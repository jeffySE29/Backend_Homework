import { DataTypes } from 'sequelize';
import sequelize from '../database/database.js';//sequelize mac dinh doc cho la tu tao con minh tao roi nen lay cai tao san
import UUIDModel from '../common/UUIDModel.js';
import SQLModel from '../common/SQLModel.js'
import Order from './Order.js';
import Book from './Book.js';

const OrderItem = sequelize.define('order_items', {//orders is a table name | User is object name  
    // Model attributes are defined here
    orderId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        // type: DataTypes.STRING(32), co the de nhu nay de set length cho string
        references:{
            model:Order,
            key: 'id'
        }
    },
    bookId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        // type: DataTypes.STRING(32), co the de nhu nay de set length cho string
        references:{
            model:Book,
            key: 'id'
        }
    },
    amount:{
        type:DataTypes.INTEGER,
        defaultValue: 1,
        allowNull: false,
    },
    ...SQLModel,//cai ...SQLModel nay de lay cac attribute cua SQLModel
});

Order.hasMany(OrderItem, {
    as: 'items'
})
OrderItem.belongsTo(Order)

Book.hasMany(OrderItem)
OrderItem.belongsTo(Book)


OrderItem.sync().then(() => {
    console.log('order_items table is created')
})

export default OrderItem

// `sequelize.define` also returns the model
