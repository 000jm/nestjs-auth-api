
import { NotFoundException, Injectable, BadRequestException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { User } from './models/user.model.js'
import { AuthService } from '../auth/auth.service.js'
import { SignupDTO } from './dtos/signup.dto.js'
import { SigninDTO } from './dtos/signin.dto.js'
import bcrypt from "bcrypt"

@Injectable()
export class UsersService {

    constructor(
        @InjectModel('User')
        private readonly usersModel: Model<User>,
        private readonly authService: AuthService
    ) {}

    public async signup(signupDTO: SignupDTO): Promise<User> {
        const user = new this.usersModel(signupDTO)
        return user.save()
    }

    public async signin(signinDTO: SigninDTO): Promise<{ name: string, jwtToken: string, email: string }> {
        const { email, password } = signinDTO
        const user = await this.findByEmail(email)
        await this.validatePassword(password, user)
        const jwtToken = await this.authService.createAcessToken(String(user._id))

        return { name: user.name, jwtToken, email }
    }

    public async findAll(): Promise<User[]> {
        return this.usersModel.find()
    }

    private async findByEmail(email: string) {
        const user = await this.usersModel.findOne({ email })
        if(!user) {
            throw new NotFoundException('User not found')
        }

        return user
    }

    private async validatePassword(password: string, user: User): Promise<boolean> {
        const { password: hashedPassword } = await this.findByEmail(user.email)
        const match = await bcrypt.compare(password, hashedPassword)
        if(!match) {
            throw new BadRequestException('Password not match')
        }

        // return match
        return true
    }

}
