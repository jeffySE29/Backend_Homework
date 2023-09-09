import { DataTypes, INTEGER } from 'sequelize';
import sequelize from '../database/database.js';//sequelize mac dinh doc cho la tu tao con minh tao roi nen lay cai tao san
import User from '../models/User.js'
import SQLModel from '../common/SQLModel.js'
import UUIDModel from '../common/UUIDModel.js';

const Book = sequelize.define('books', {//books is a table name | Book is object name  
    // Model attributes are defined here
    title: {
        type: DataTypes.STRING,
        // type: DataTypes.STRING(32), co the de nhu nay de set length cho string
        allowNull: false,//null is not allow
    },
    author: {
        type: DataTypes.STRING,
        allowNull: true,//default value is true
    },
    summary: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    creatorId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id',
        }
    },
    thumbnailImage: {
        type: DataTypes.STRING
    },
    ...SQLModel,//cai ...SQLModel nay de lay cac attribute cua SQLModel
});


User.hasMany(Book, {
    foreignKey: 'creatorId'
})
Book.belongsTo(User, {
    foreignKey: 'creatorId'
})

Book.sync().then(() => {
    console.log('books table is created')
})


export default Book

// `sequelize.define` also returns the model
