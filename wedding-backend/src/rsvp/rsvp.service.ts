import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateRsvpDto } from './dto/create-rsvp.dto';
import { Rsvp, RsvpDocument } from './rsvp.schema';

@Injectable()
export class RsvpService {
  constructor(@InjectModel(Rsvp.name) private model: Model<RsvpDocument>) {}
  create(dto: CreateRsvpDto) { return this.model.create(dto); }
}
