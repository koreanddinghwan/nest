import 'reflect-metadata'
import { DataSource } from 'typeorm'
import { User } from './users/users.entity'

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.HOST,
  port: Number.parseInt(process.env.PORT) | 3306,
  username: process.env.DBUSER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  entities: [User],
  synchronize: true, //특정 조건하에서 모든 데이터를 삭제하는 것 같습니다. 프로덕션에서는 사용하지 않는게 좋습니다.
  logging: true,
})

// to initialize initial connection with the database, register all entities
// and "synchronize" database schema, call "initialize()" method of a newly created database
// once in your application bootstrap
// AppDataSource.initialize()
//   .then(() => {
//     // here you can start to work with your database
//   })
//   .catch((error) => {
//     console.log(error)
//     AppDataSource.destroy()
//   })
