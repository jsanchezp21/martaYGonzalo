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
exports.RsvpController = void 0;
const common_1 = require("@nestjs/common");
const rsvp_service_1 = require("./rsvp.service");
const create_rsvp_dto_1 = require("./dto/create-rsvp.dto");
const jwt_guard_1 = require("../auth/jwt.guard");
const list_rsvp_dto_1 = require("./dto/list-rsvp.dto");
let RsvpController = class RsvpController {
    constructor(service) {
        this.service = service;
    }
    async create(dto) {
        const saved = await this.service.create(dto);
        return { ok: true, id: saved._id, firstName: saved.firstName };
    }
    async list(query) {
        const items = await this.service.findAllFiltered({
            attending: query.attending === undefined ? undefined : query.attending === 'true',
            dietaryRestrictions: query.dietaryRestrictions === undefined ? undefined : query.dietaryRestrictions === 'true',
            bus: query.bus,
            q: query.q
        });
        return { ok: true, items };
    }
    async delete(id) {
        await this.service.remove(id);
        return { ok: true };
    }
};
exports.RsvpController = RsvpController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_rsvp_dto_1.CreateRsvpDto]),
    __metadata("design:returntype", Promise)
], RsvpController.prototype, "create", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [list_rsvp_dto_1.ListRsvpDto]),
    __metadata("design:returntype", Promise)
], RsvpController.prototype, "list", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RsvpController.prototype, "delete", null);
exports.RsvpController = RsvpController = __decorate([
    (0, common_1.Controller)('rsvp'),
    __metadata("design:paramtypes", [rsvp_service_1.RsvpService])
], RsvpController);
//# sourceMappingURL=rsvp.controller.js.map