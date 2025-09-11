import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
export type RsvpDocument = HydratedDocument<Rsvp>;

@Schema({ timestamps: true })
export class Rsvp {
  @Prop({ required: true }) firstName!: string;
  @Prop({ required: true }) lastName!: string;
  @Prop({ trim: true, lowercase: true }) email?: string;
  @Prop({ required: true }) attending!: boolean;
  @Prop({ default: 0, min: 0, max: 10 }) plusOnes!: number;
  @Prop({ trim: true }) companions?: string;
  @Prop({ enum: ['ida', 'ida_vuelta', 'ninguno'], default: 'ninguno' }) bus!: 'ida'|'ida_vuelta'|'ninguno';
  @Prop({ default: false }) dietaryRestrictions!: boolean;
  @Prop({ trim: true }) dietaryDetails?: string;
  @Prop({ trim: true, maxlength: 1000 }) message?: string;
}
export const RsvpSchema = SchemaFactory.createForClass(Rsvp);
