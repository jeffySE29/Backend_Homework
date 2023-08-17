import { DataTypes } from 'sequelize';
import sequelize from '../database/database.js';//sequelize mac dinh doc cho la tu tao con minh tao roi nen lay cai tao san

import SQLModel from '../common/SQLModel.js'
import User from '../models/User.js'

const table_name = "albums"

const Song = sequelize.define(table_name, {//users is a table name | User is object name  
    // Model attributes are defined here
    album_name: {
        type: DataTypes.STRING,
        // type: DataTypes.STRING(32), co the de nhu nay de set length cho string
        allowNull: false,//null is not allow
    },
    userID: {
        type: DataTypes.INTEGER,
        references:{
            model: User,
            id: 'id'
        }
    }, 
    isPrivate:{
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    },
    ...SQLModel,//cai ...SQLModel nay de lay cac attribute cua SQLModel
});

User.hasMany(Album)
Album.belongsTo(User)

User.sync().then(() => {
    console.log(`${table_name} table is created`)
})


export default Album