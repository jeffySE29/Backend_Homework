import { DataTypes } from 'sequelize';
import sequelize from '../database/database.js';//sequelize mac dinh doc cho la tu tao con minh tao roi nen lay cai tao san

import SQLModel from '../common/SQLModel.js'

const table_name = "songs"

const Song = sequelize.define(table_name, {//users is a table name | User is object name  
    // Model attributes are defined here
    song_name: {
        type: DataTypes.STRING,
        // type: DataTypes.STRING(32), co the de nhu nay de set length cho string
        allowNull: false,//null is not allow
    },
    composer: {
        type: DataTypes.STRING,
        allowNull: false,//null is not allow
    }, 
    isPrivate:{
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    },
    listen_Count:{
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
    save_path: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    ...SQLModel,//cai ...SQLModel nay de lay cac attribute cua SQLModel
});

User.sync().then(() => {
    console.log(`${table_name} table is created`)
})


export default Song