import { Body, Controller, Post, Get, Delete, Param, UseGuards, Query } from '@nestjs/common';
import { RsvpService } from './rsvp.service';
import { CreateRsvpDto } from './dto/create-rsvp.dto';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { ListRsvpDto } from './dto/list-rsvp.dto';

@Controller('rsvp')
export class RsvpController {
  constructor(private service: RsvpService) {}

  @Post()
  async create(@Body() dto: CreateRsvpDto) {
    const saved = await this.service.create(dto);
    return { ok: true, id: saved._id, firstName: saved.firstName };
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async list(@Query() query: ListRsvpDto) {
    const items = await this.service.findAllFiltered({
      attending: query.attending === undefined ? undefined : query.attending === 'true',
      dietaryRestrictions: query.dietaryRestrictions === undefined ? undefined : query.dietaryRestrictions === 'true',
      bus: query.bus,
      q: query.q
    });
    return { ok: true, items };
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: string) {
    await this.service.remove(id);
    return { ok: true };
  }
}
