
import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { User } from '../users/models/user.model.js'
import jwt from 'jsonwebtoken'
import { Request } from 'express'
import { JwtPayload } from './models/jwt-payload.model.js'

@Injectable()
export class AuthService {

    constructor(
        @InjectModel('User')
        private readonly usersModel: Model<User>
    ) {}

    public async createAcessToken(userId: string): Promise<string> {
        return jwt.sign({ userId }, String(process.env.JWT_SECRET), {
            expiresIn: Number(process.env.JWT_EXPIRATION)
        })
    }

    public async validateUser(jwtPayload: JwtPayload): Promise<User> {
        const user = await this.usersModel.findOne({ _id: jwtPayload.userId })
        if(!user) {
            throw new UnauthorizedException('User not found')
        }

        return user
    }

    private jwtExtractor(req: Request): string {
        const authHeader = req.headers.authorization

        if(!authHeader) {
            throw new BadRequestException('Bad request')
        }

        const [, token] = authHeader.split(' ')

        return token
    }

    public returnJwtExtractor(): (req: Request) => string {
        return this.jwtExtractor
    }

}
