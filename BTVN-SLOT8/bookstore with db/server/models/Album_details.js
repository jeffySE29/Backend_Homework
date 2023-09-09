import { DataTypes } from 'sequelize';
import sequelize from '../database/database.js';//sequelize mac dinh doc cho la tu tao con minh tao roi nen lay cai tao san

import SQLModel from '../common/SQLModel.js'
import Album from '../models/Album.js'
import Song from '../models/Song.js'

const table_name = "album_details"

const Song = sequelize.define(table_name, {//users is a table name | User is object name  
    // Model attributes are defined here
    album_ID: {
        type: DataTypes.INTEGER,
        // type: DataTypes.STRING(32), co the de nhu nay de set length cho string
        references:{
            model: Album,
            id: 'id'
        }
    },
    song_ID: {
        type: DataTypes.INTEGER,
        references:{
            model: Song,
            id: 'id'
        }
    }, 
    ...SQLModel,//cai ...SQLModel nay de lay cac attribute cua SQLModel
});

// Album.hasMany(Album_details)
// Song.hasMany(Album_details)
// Album_details.belongsTo(Album)
// Album_details.belongsTo(Song)

User.sync().then(() => {
    console.log(`${table_name} table is created`)
})


export default Album_details