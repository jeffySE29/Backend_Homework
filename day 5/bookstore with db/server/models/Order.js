import { DataTypes } from 'sequelize';
import sequelize from '../database/database.js';//sequelize mac dinh doc cho la tu tao con minh tao roi nen lay cai tao san

import SQLModel from '../common/SQLModel.js'
import User from './User.js';


const Order = sequelize.define('orders', {//orders is a table name | User is object name  
    // Model attributes are defined here
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        // type: DataTypes.STRING(32), co the de nhu nay de set length cho string
        references:{
            model: User,
            id: 'id'
        }
    },
    ...SQLModel,//cai ...SQLModel nay de lay cac attribute cua SQLModel
});

User.hasMany(Order)
Order.belongsTo(User)

Order.sync().then(() => {
    console.log('orders table is created')
})

export default Order

// `sequelize.define` also returns the model
