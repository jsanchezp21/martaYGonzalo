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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RsvpService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const rsvp_schema_1 = require("./rsvp.schema");
let RsvpService = class RsvpService {
    constructor(model) {
        this.model = model;
    }
    create(dto) { return this.model.create(dto); }
    findAll() { return this.model.find().sort({ createdAt: -1 }).lean(); }
    remove(id) { return this.model.findByIdAndDelete(id); }
    findAllFiltered(f) {
        const where = {};
        if (typeof f.attending === 'boolean')
            where.attending = f.attending;
        if (typeof f.dietaryRestrictions === 'boolean')
            where.dietaryRestrictions = f.dietaryRestrictions;
        if (f.bus)
            where.bus = f.bus;
        if (f.q) {
            const re = new RegExp(f.q.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i');
            where.$or = [{ firstName: re }, { lastName: re }, { email: re }];
        }
        return this.model.find(where).sort({ createdAt: -1 }).lean();
    }
};
exports.RsvpService = RsvpService;
exports.RsvpService = RsvpService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(rsvp_schema_1.Rsvp.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], RsvpService);
//# sourceMappingURL=rsvp.service.js.map