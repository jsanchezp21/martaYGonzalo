import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RsvpController } from './rsvp.controller';
import { RsvpService } from './rsvp.service';
import { Rsvp, RsvpSchema } from './rsvp.schema';
import { AuthModule } from '../auth/auth.module';   // <-- importa el módulo de auth
import { JwtAuthGuard } from '../auth/jwt.guard';   // <-- importa el guard

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Rsvp.name, schema: RsvpSchema }]),
    AuthModule,                                      // <-- añade aquí
  ],
  controllers: [RsvpController],
  providers: [RsvpService, JwtAuthGuard],            // <-- registra el guard aquí
})
export class RsvpModule {}
