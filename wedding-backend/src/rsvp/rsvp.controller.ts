import { Body, Controller, Post } from '@nestjs/common';
import { RsvpService } from './rsvp.service';
import { CreateRsvpDto } from './dto/create-rsvp.dto';

@Controller('rsvp')
export class RsvpController {
  constructor(private service: RsvpService) {}
  @Post()
  async create(@Body() dto: CreateRsvpDto) {
    const saved = await this.service.create(dto);
    return { ok: true, id: saved._id, firstName: saved.firstName };
    }
}
