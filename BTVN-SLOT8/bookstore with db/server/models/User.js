import { DataTypes } from 'sequelize';
import sequelize from '../database/database.js';//sequelize mac dinh doc cho la tu tao con minh tao roi nen lay cai tao san

import SQLModel from '../common/SQLModel.js'

const table_name = "users"

const User = sequelize.define(table_name, {//users is a table name | User is object name  
    // Model attributes are defined here
    username: {
        type: DataTypes.STRING,
        // type: DataTypes.STRING(32), co the de nhu nay de set length cho string
        allowNull: false,//null is not allow
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,//null is not allow
    }, 
    role: {
        type: DataTypes.STRING,
        defaultValue: 'user',
    },
    ...SQLModel,//cai ...SQLModel nay de lay cac attribute cua SQLModel
});

User.sync().then(() => {
    console.log(`${table_name} table is created`)
})


export default User

// `sequelize.define` also returns the model
