import { Entity, Column, PrimaryGeneratedColumn, Unique } from 'typeorm'

@Entity()
@Unique('unique_tbUser_userName', ['userName'])
@Unique('unique_tbUser_userNickName', ['userNickName'])
export class User {
  @PrimaryGeneratedColumn('uuid')
  userId: string

  @Column({ type: 'char', length: 35, nullable: false })
  userName: string

  @Column({ type: 'char', length: 100, nullable: false })
  userNickName: string

  @Column({
    type: 'char',
    length: 100,
    nullable: true,
    default: '/profile/default.png',
  })
  userProfilePhoto: string

  @Column({
    type: 'enum',
    enum: ['Y', 'N'],
  })
  loginType: string

  @Column({ type: 'float', nullable: false, default: '0' })
  userLevel: number

  @Column({ type: 'char', length: 200, nullable: true })
  userTitle: string
}
