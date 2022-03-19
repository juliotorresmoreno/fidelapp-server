import { ApiProperty } from "@nestjs/swagger"

export class SignInDto {

    @ApiProperty()
    email: string;

    @ApiProperty()
    password: string;
}

export class PhoneSignInDto {

    @ApiProperty()
    phone: string;
}

export class SignUpDto {

    @ApiProperty()
    name: string;

    @ApiProperty()
    lastname: string;

    @ApiProperty()
    phone: string;
    
    @ApiProperty()
    email: string;

    @ApiProperty()
    password: string;
}

export class VerificationCodeDto {
    @ApiProperty()
    code: string;
    
    @ApiProperty()
    phone: string;

    @ApiProperty()
    email: string;
}

