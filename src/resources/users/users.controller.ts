import { Body, Controller, Param, Patch, Post, Request, UsePipes } from '@nestjs/common';
import { JoiValidationPipe } from 'src/pipes/joiValidationPipe';
import { RequestWithSession } from 'src/types/http';
import { Authentication } from 'src/utils/secure';
import { registerShopSchema, updateProfileSchema } from './joiSchema';
import { RegisterShopDto, UpdateProfileDto } from './users.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {

    constructor(private readonly usersService: UsersService) { }

    @Patch('profile')
    @Authentication()
    @UsePipes(new JoiValidationPipe(updateProfileSchema))
    patchProfile(@Request() req: RequestWithSession, @Body() payload: UpdateProfileDto) {
        return this.usersService.updateProfile(req.session.id, payload);
    }
}
