import Sequelize from "sequelize"

const UUIDModel = { //tao ra id ngau nhien
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKet: true,
    }
}

export default UUIDModel