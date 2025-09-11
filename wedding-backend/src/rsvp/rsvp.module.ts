import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RsvpController } from './rsvp.controller';
import { RsvpService } from './rsvp.service';
import { Rsvp, RsvpSchema } from './rsvp.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Rsvp.name, schema: RsvpSchema }])],
  controllers: [RsvpController],
  providers: [RsvpService]
})
export class RsvpModule {}
