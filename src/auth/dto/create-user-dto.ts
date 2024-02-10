import {IsEmail, IsNotEmpty, MinLength, Validate} from "class-validator";
import {IsPasswordsMatchingConstraint} from "y/common/decorators/validation/password-match";

export class CreateUserDto {

    @IsEmail()
    @IsNotEmpty()
    readonly email: string;

    @IsNotEmpty()
    readonly name: string;

    @IsNotEmpty()
    @MinLength(8)
    readonly password: string;

    @Validate(IsPasswordsMatchingConstraint)
    readonly passwordRepeat: string;
}