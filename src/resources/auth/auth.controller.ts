
import { Body, Controller, Post, Request, UsePipes } from '@nestjs/common';
import { JoiValidationPipe } from 'src/pipes/joiValidationPipe';
import { RequestWithSession } from 'src/types/http';
import { SignInDto, SignUpDto, VerificationCodeDto } from './auth.dto';
import { AuthService } from './auth.service';
import { signInSchema, signUpSchema, verificationCodechema } from './joiSchema';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('sign-in')
    @UsePipes(new JoiValidationPipe(signInSchema))
    postSignIn(@Body() payload: SignInDto, @Request() req: RequestWithSession) {
        return this.authService.signIn(payload);
    }

    @Post('sign-up')
    @UsePipes(new JoiValidationPipe(signUpSchema))
    postSignUp(@Body() payload: SignUpDto) {
        return this.authService.signUp(payload);
    }

    @Post('verification-code')
    @UsePipes(new JoiValidationPipe(verificationCodechema))
    postVerificationCode(@Body() payload: VerificationCodeDto) {
        return this.authService.verificationCode(payload);
    }
}
