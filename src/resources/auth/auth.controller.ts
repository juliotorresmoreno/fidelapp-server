
import { Body, Controller, Get, Post, Request, UsePipes } from '@nestjs/common';
import { JoiValidationPipe } from 'src/pipes/joiValidationPipe';
import { RequestWithSession } from 'src/types/http';
import { Authentication } from 'src/utils/secure';
import { PhoneSignInDto, VerificationCodeDto } from './auth.dto';
import { AuthService } from './auth.service';
import { phoneSignInSchema, verificationCodechema } from './joiSchema';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('sign-in')
    @UsePipes(new JoiValidationPipe(phoneSignInSchema))
    postPhoneSignIn(@Body() payload: PhoneSignInDto) {
        return this.authService.phoneSignIn(payload);
    }

    @Post('verification-code')
    @UsePipes(new JoiValidationPipe(verificationCodechema))
    postVerificationCode(@Body() payload: VerificationCodeDto) {
        return this.authService.verificationCode(payload);
    }

    @Get('session')
    @Authentication()
    getSession(@Request() req: RequestWithSession) {
        return this.authService.getSession(req.session.id, req.token);
    }
}
