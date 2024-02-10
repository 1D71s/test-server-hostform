import { IsString, IsNotEmpty, IsIP, IsAlphanumeric, IsInt, Min, Max } from 'class-validator';

export class CreateDomainDto {
    @IsNotEmpty()
    @IsString()
    domainName: string;

    @IsNotEmpty()
    @IsIP('4', { message: 'Invalid IPv4 address' })
    serverIpAddress: string;

    @IsNotEmpty()
    @IsString()
    sshUsername: string;

    @IsNotEmpty()
    @IsString()
    @IsAlphanumeric()
    sshPassword: string;

    @IsNotEmpty()
    @IsInt()
    @Min(1)
    @Max(65535)
    port: number;
}
