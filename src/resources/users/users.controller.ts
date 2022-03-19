import { Body, Controller, Get, Param, Patch, Request, UsePipes } from '@nestjs/common';
import { JoiValidationPipe } from 'src/pipes/joiValidationPipe';
import { RequestWithSession } from 'src/types/http';
import { Authentication } from 'src/utils/secure';
import { updateProfileSchema } from './joiSchema';
import { UpdateProfileDto } from './users.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Patch('profile')
    @UsePipes(new JoiValidationPipe(updateProfileSchema))
    @Authentication()
    patchProfile(@Request() req: RequestWithSession, @Body() payload: UpdateProfileDto) {
        return this.usersService.updateProfile(req.session.id, payload);
    }
}
