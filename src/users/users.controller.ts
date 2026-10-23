
import { Body, Controller, Get, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common'
import { UsersService } from './users.service.js'
import { SignupDTO } from './dtos/signup.dto.js'
import { User } from './models/user.model.js'
import { SigninDTO } from './dtos/signin.dto.js'
import { AuthGuard } from '@nestjs/passport'

@Controller('users')
export class UsersController {

    constructor(private readonly usersService: UsersService) {}

    @Post('signup')
    @HttpCode(HttpStatus.CREATED)
    public async signup(@Body() body: SignupDTO): Promise<User> {
        return this.usersService.signup(body)
    }

    @Post('signin')
    @HttpCode(HttpStatus.CREATED)
    public async signin(@Body() body: SigninDTO): Promise<{ name: string, jwtToken: string, email: string }> {
        return this.usersService.signin(body)
    }

    @Get('/')
    @UseGuards(AuthGuard('jwt'))
    @HttpCode(HttpStatus.OK)
    public async getAll(): Promise<User[]> {
        return this.usersService.findAll()
    }

}
