import Sequelize from 'sequelize'
import config from 'config'
import { defineModels } from '../../models'

let sequelize = null

function init(){
  const poolMax = 5
  const poolMin = 0
  const poolAcquire = 30000
  const poolIdle = 10000
  const dbConfig = config.get('db')
  
  sequelize = new Sequelize(dbConfig.name, dbConfig.user, dbConfig.password, {
      host: dbConfig.host,
      dialect: 'postgres',
      operatorsAliases: false,
      pool: {
        max: poolMax,
        min: poolMin,
        acquire: poolAcquire,
        idle: poolIdle
      },
      define: {
        timestamps: false 
      }
  });
  
  sequelize
    .authenticate()
    .then(() => {
      console.log('sequelize: Postgres connection has been established successfully.');
    })
    .catch(err => {
      console.error('sequelize: Postgres unable to connect to the database:', err);
    });
  
  defineModels(sequelize);
}

function getSequelize(){
  return sequelize
}

export default{
  init,
  getSequelize
}