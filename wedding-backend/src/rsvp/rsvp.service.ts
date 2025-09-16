import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateRsvpDto } from './dto/create-rsvp.dto';
import { Rsvp, RsvpDocument } from './rsvp.schema';

@Injectable()
export class RsvpService {
  constructor(@InjectModel(Rsvp.name) private model: Model<RsvpDocument>) {}
  create(dto: CreateRsvpDto) { return this.model.create(dto); }
  findAll() { return this.model.find().sort({ createdAt: -1 }).lean(); }
  remove(id: string) { return this.model.findByIdAndDelete(id); }
	findAllFiltered(f: { attending?: boolean; dietaryRestrictions?: boolean; bus?: 'ida'|'ida_vuelta'|'ninguno'; q?: string }) {
  const where: any = {};
  if (typeof f.attending === 'boolean') where.attending = f.attending;
  if (typeof f.dietaryRestrictions === 'boolean') where.dietaryRestrictions = f.dietaryRestrictions;
  if (f.bus) where.bus = f.bus;
  if (f.q) {
    const re = new RegExp(f.q.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i');
    where.$or = [{ firstName: re }, { lastName: re }, { email: re }];
  }
  return this.model.find(where).sort({ createdAt: -1 }).lean();
}

}
