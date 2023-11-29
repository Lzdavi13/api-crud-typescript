import knex from 'knex'
import config from './config'

const Knex = knex(config)

export default Knex
