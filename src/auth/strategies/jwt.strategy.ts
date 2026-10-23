
import { BadRequestException, Injectable } from "@nestjs/common"
import { PassportStrategy } from "@nestjs/passport"
import { Strategy } from 'passport-jwt'
import { AuthService } from "../auth.service.js"
import { JwtPayload } from "../models/jwt-payload.model.js"
import { User } from "../../users/models/user.model.js"

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

    constructor(private readonly authService: AuthService) {
        
        const secret = process.env.JWT_SECRET

        if(!secret) {
            throw new BadRequestException('Bad request')
        }
        super({
            jwtFromRequest: authService.returnJwtExtractor(),
            ignoreExpiration: false,
            secretOrKey: secret
        })
    }

    async validate(jwtPayload: JwtPayload): Promise<User> {
        return this.authService.validateUser(jwtPayload)
    }

}
