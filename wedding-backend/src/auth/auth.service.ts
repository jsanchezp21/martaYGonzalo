import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(private jwt: JwtService, private cfg: ConfigService) {}

  async login(username: string, password: string) {
    const u = this.cfg.get<string>('ADMIN_USER') || 'admin';
    const p = this.cfg.get<string>('ADMIN_PASS') || 'admin';
    if (username !== u || password !== p) {
      throw new UnauthorizedException('Credenciales inválidas');
    }
    const token = await this.jwt.signAsync({ sub: 'admin', role: 'admin' });
    return { ok: true, token };
  }

  async verify(token: string) {
    try {
      const payload = await this.jwt.verifyAsync(token);
      return payload;
    } catch {
      throw new UnauthorizedException('Token no válido');
    }
  }
}
