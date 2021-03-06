import Sequelize from 'sequelize'
import db from '../connect'

const Group = db.define('group', {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: ""
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false,
    defaultValue: ""
  },
}, {
  freezeTableName: true
})


export default Group
