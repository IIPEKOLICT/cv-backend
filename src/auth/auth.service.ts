import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthDto } from './dto/auth.dto';
import { from, map, Observable, reduce } from 'rxjs';
import { REQUIRED_LOGIN, REQUIRED_PASSWORD } from '../configs/auth.config';
import { ErrorMessage } from '../shared/enums';
import { ApiError } from '../errors/api.error';
import { AuthResponseDto } from './dto/auth-response.dto';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  private generateToken(dto: AuthDto): Observable<AuthResponseDto> {
    return from(this.jwtService.sign(dto))
      .pipe(reduce((acc: string, letter: string) => acc + letter))
      .pipe(map((token: string) => ({ token })));
  }

  auth(): Observable<AuthResponseDto> {
    return this.generateToken({
      login: REQUIRED_LOGIN,
      password: REQUIRED_PASSWORD,
    });
  }

  login(dto: AuthDto): Observable<AuthResponseDto> {
    if (dto.login !== REQUIRED_LOGIN) {
      ApiError.badRequest(ErrorMessage.InvalidLogin);
    }

    if (dto.password !== REQUIRED_PASSWORD) {
      ApiError.badRequest(ErrorMessage.InvalidPassword);
    }

    return this.generateToken(dto);
  }
}
