import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: process.env.AUTH_SECRET,
    });
  }

  async validate(payload: { sub: string }): Promise<string> {
    if (payload.sub === 'flashcards') {
      return payload.sub;
    }
    throw new UnauthorizedException();
  }
}
