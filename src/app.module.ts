
import { MongooseModule } from '@nestjs/mongoose'
import { Module } from '@nestjs/common'
import { AppController } from './app.controller.js'
import { AppService } from './app.service.js'
import { UsersModule } from './users/users.module.js'
import { AuthModule } from './auth/auth.module.js'

@Module({
  imports: [
    UsersModule,
    AuthModule,
    MongooseModule.forRoot(String(process.env.MONGO_URI))
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
