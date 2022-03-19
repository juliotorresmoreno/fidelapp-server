import { ApiProperty } from "@nestjs/swagger";
import { Roles } from "src/types/roles";

export class UpdateProfileDto {

    @ApiProperty({
        description: `User's identifier`,
        example: 95845,
    })
    id: number;

    @ApiProperty({
        description: 'verified',
        example: 'boolean',
    })
    verified: boolean;

    @ApiProperty({
        description: 'Name of user',
        example: 'Pedro',
    })
    name?: string;

    @ApiProperty({
        description: 'Lastname of user',
        example: 'Fernandez',
    })
    last_name?: string;

    @ApiProperty({
        description: 'Email of user',
        example: 'pepe.fernandez@gmail.com',
    })
    email?: string;

    @ApiProperty({
        description: `Url of s3 user's lawyer Rut`,
        example: 'https://s3.aws.com/assets/rutlawyer.pdf',
    })
    photo_url?: string;

    @ApiProperty({
        description: 'Identifier of user rol',
        example: '1',
    })
    rol?: Roles;
}