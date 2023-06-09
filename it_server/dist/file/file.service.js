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
exports.FileService = void 0;
const fs = require("fs");
const uuid_1 = require("uuid");
const common_1 = require("@nestjs/common");
let FileService = class FileService {
    constructor() { }
    async saveProfileImg(img) {
        try {
            if (!fs.existsSync('public/posts')) {
                fs.mkdir('public/posts', err => {
                    if (err) {
                        console.log(err, 'Error create dir');
                    }
                });
            }
            const fileName = (0, uuid_1.v4)() + '.jpg';
            await fs.writeFile('public/posts/' + fileName, img.buffer, err => {
                if (err) {
                    console.log(err, 'Error save img');
                }
            });
            return fileName;
        }
        catch (e) {
            console.log(e);
        }
    }
    async delete(fileName) {
        try {
            await fs.unlink('public/posts/' + fileName, err => {
                if (err) {
                    console.log(err, 'Error remove img');
                }
            });
        }
        catch (e) {
            console.log(e);
        }
    }
};
FileService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], FileService);
exports.FileService = FileService;
//# sourceMappingURL=file.service.js.map