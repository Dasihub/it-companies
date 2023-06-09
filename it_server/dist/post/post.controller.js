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
exports.PostController = void 0;
const common_1 = require("@nestjs/common");
const post_service_1 = require("./post.service");
const post_dto_1 = require("./post.dto");
const platform_express_1 = require("@nestjs/platform-express");
const file_service_1 = require("../file/file.service");
const user_auth_guard_1 = require("../user/user.auth.guard");
let PostController = class PostController {
    constructor(postService, fileService) {
        this.postService = postService;
        this.fileService = fileService;
    }
    async findOnePost({ id_post }) {
        try {
            const data = await this.postService.findOnePost(id_post);
            return {
                message: 'Данные успешно получены',
                type: 'success',
                data: data ? data : {}
            };
        }
        catch (e) {
            throw new common_1.HttpException('Ошибка в сервере', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async findPosts({ id_user }) {
        try {
            const data = await this.postService.findPosts(id_user);
            return {
                message: 'Данные успешно получены',
                type: 'success',
                data
            };
        }
        catch (e) {
            throw new common_1.HttpException('Ошибка в сервере', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async createPost(body, img) {
        try {
            const { description, id_user, title, message, author } = body;
            let fileName = '';
            if (img) {
                fileName = await this.fileService.saveProfileImg(img);
            }
            const data = await this.postService.createPost(description, id_user, title, message, author, fileName);
            return {
                message: 'Данные успешно сохранены',
                type: 'success',
                data
            };
        }
        catch (e) {
            throw new common_1.HttpException('Ошибка в сервере', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async updatePost(body, img) {
        try {
            const { description, id_post, message, author, title } = body;
            const { fileName: f } = await this.postService.findOnePost(id_post);
            let fileName = '';
            if (f === null || f === void 0 ? void 0 : f.length) {
                await this.fileService.delete(f);
            }
            if (img) {
                fileName = await this.fileService.saveProfileImg(img);
            }
            const data = await this.postService.updatePost(description, id_post, message, author, title, fileName);
            return {
                message: 'Данные успешно обновлены',
                type: 'success',
                data
            };
        }
        catch (e) {
            throw new common_1.HttpException('Ошибка в сервере', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async deletePost({ id_post }) {
        try {
            const { fileName } = await this.postService.findOnePost(id_post);
            if (fileName === null || fileName === void 0 ? void 0 : fileName.length) {
                await this.fileService.delete(fileName);
            }
            await this.postService.deletePost(id_post);
            return {
                message: 'Данные успешно удалено',
                type: 'success',
                data: []
            };
        }
        catch (e) {
            throw new common_1.HttpException('Ошибка в сервере', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.UseGuards)(user_auth_guard_1.UserAuthGuard),
    (0, common_1.Get)('find-one/:id_post'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "findOnePost", null);
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.UseGuards)(user_auth_guard_1.UserAuthGuard),
    (0, common_1.Get)(':id_user'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "findPosts", null);
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, common_1.UseGuards)(user_auth_guard_1.UserAuthGuard),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('img')),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [post_dto_1.CreatePostDto, Object]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "createPost", null);
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.UseGuards)(user_auth_guard_1.UserAuthGuard),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('img')),
    (0, common_1.Put)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [post_dto_1.UpdatePostDto, Object]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "updatePost", null);
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.UseGuards)(user_auth_guard_1.UserAuthGuard),
    (0, common_1.Delete)(':id_post'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "deletePost", null);
PostController = __decorate([
    (0, common_1.Controller)('post'),
    __metadata("design:paramtypes", [post_service_1.PostService, file_service_1.FileService])
], PostController);
exports.PostController = PostController;
//# sourceMappingURL=post.controller.js.map