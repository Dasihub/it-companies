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
exports.PostService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const post_schema_1 = require("./post.schema");
let PostService = class PostService {
    constructor(postModel) {
        this.postModel = postModel;
    }
    async findPosts(id_user) {
        try {
            return await this.postModel.find({ id_user });
        }
        catch (e) {
            console.log(e);
        }
    }
    async findOnePost(id_post) {
        try {
            return await this.postModel.findOne({ _id: id_post });
        }
        catch (e) {
            console.log(e);
        }
    }
    async createPost(description, id_user, title, message, author, fileName) {
        try {
            return await this.postModel.create({ id_user, title, message, author, fileName, description });
        }
        catch (e) {
            console.log(e);
        }
    }
    async updatePost(description, id_post, message, author, title, fileName) {
        try {
            return await this.postModel.updateOne({ _id: id_post }, { description, message, author, title, fileName });
        }
        catch (e) {
            console.log(e);
        }
    }
    async deletePost(id_post) {
        try {
            return await this.postModel.deleteOne({ _id: id_post });
        }
        catch (e) {
            console.log(e);
        }
    }
};
PostService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(post_schema_1.Post.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], PostService);
exports.PostService = PostService;
//# sourceMappingURL=post.service.js.map