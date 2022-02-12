import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { Route } from '../shared/enums';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthDto } from './dto/auth.dto';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { Auth } from './auth.decorator';
import { AuthGuard } from './auth.guard';
import { AuthOperation } from '../shared/docs';
import { AuthResponseDto } from './dto/auth-response.dto';

@ApiTags(Route.Auth)
@Controller(Route.Auth)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: AuthOperation.Auth })
  @ApiResponse({ type: AuthResponseDto })
  @Auth()
  @UseGuards(AuthGuard)
  @Get()
  auth(): Observable<AuthResponseDto> {
    return this.authService.auth();
  }

  @ApiOperation({ summary: AuthOperation.Login })
  @ApiResponse({ type: AuthResponseDto })
  @Post()
  login(@Body() dto: AuthDto): Observable<AuthResponseDto> {
    return this.authService.login(dto);
  }
}
