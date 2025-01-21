import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";
import { AuthService } from "src/auth/auth.service";
import { Roles, ROLES_KEY } from "src/common/decorators/roles.decorator";
import { ManageError } from "src/common/Errors/custom.error";

interface TokensAuth {
    access_token: string;
    refresh_token: string;
}

interface ReturnTokens {
    access_token: string;
    refresh_token: string;
}

interface PayloadToken {
    id: number;
    email: string;
    name: string
}

@Injectable()
export class JwtGuard implements CanActivate {

    constructor(
        private JwtService: JwtService,
        private authService: AuthService
    ) { }

    async canActivate(context: ExecutionContext) {
        //const roles=this.reflector.get(Roles(ROLES_KEY),context.getHandler());
        const request: Request = context.switchToHttp().getRequest();
        const headers: TokensAuth | any = request.headers;
        try {            
            await this.JwtService.verify(headers["access_token"]);
            const decodeToken: PayloadToken = await this.JwtService.decode(headers["access_token"]);
            request["user"] = decodeToken;
            return true;
        } catch (err: any) {
            if (err.message == "jwt expired") {
                const tokens: ReturnTokens = await this.authService.renovateToken(headers["refresh_token"]);
                request["user"] = tokens;
                return true;
            }
            else if (err) {
                throw new ManageError({
                    type: "UNAUTHORIZED",
                    message: "THE TOKEN MUST BE PROVIDER"
                });
            }
            throw ManageError.signedError(err.message);

        }
    }
}