
import { Module } from '@nestjs/common'
import { UsersController } from './users.controller.js'
import { UsersService } from './users.service.js'
import { MongooseModule } from '@nestjs/mongoose'
import { UsersSchema } from './schema/user.schema.js'
import { AuthModule } from '../auth/auth.module.js'

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'User',
        schema: UsersSchema
      }
    ]),
    AuthModule
  ],
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule {}
