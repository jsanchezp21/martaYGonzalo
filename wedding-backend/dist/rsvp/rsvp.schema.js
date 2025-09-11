"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RsvpSchema = exports.Rsvp = void 0;
const mongoose_1 = require("@nestjs/mongoose");
let Rsvp = class Rsvp {
};
exports.Rsvp = Rsvp;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Rsvp.prototype, "firstName", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Rsvp.prototype, "lastName", void 0);
__decorate([
    (0, mongoose_1.Prop)({ trim: true, lowercase: true }),
    __metadata("design:type", String)
], Rsvp.prototype, "email", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Boolean)
], Rsvp.prototype, "attending", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 0, min: 0, max: 10 }),
    __metadata("design:type", Number)
], Rsvp.prototype, "plusOnes", void 0);
__decorate([
    (0, mongoose_1.Prop)({ trim: true }),
    __metadata("design:type", String)
], Rsvp.prototype, "companions", void 0);
__decorate([
    (0, mongoose_1.Prop)({ enum: ['ida', 'ida_vuelta', 'ninguno'], default: 'ninguno' }),
    __metadata("design:type", String)
], Rsvp.prototype, "bus", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: false }),
    __metadata("design:type", Boolean)
], Rsvp.prototype, "dietaryRestrictions", void 0);
__decorate([
    (0, mongoose_1.Prop)({ trim: true }),
    __metadata("design:type", String)
], Rsvp.prototype, "dietaryDetails", void 0);
__decorate([
    (0, mongoose_1.Prop)({ trim: true, maxlength: 1000 }),
    __metadata("design:type", String)
], Rsvp.prototype, "message", void 0);
exports.Rsvp = Rsvp = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], Rsvp);
exports.RsvpSchema = mongoose_1.SchemaFactory.createForClass(Rsvp);
//# sourceMappingURL=rsvp.schema.js.map