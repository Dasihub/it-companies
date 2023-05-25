import {
    Controller,
    HttpCode,
    Post,
    Get,
    Put,
    Delete,
    HttpStatus,
    HttpException,
    Param,
    Body,
    UseInterceptors, UploadedFile, UseGuards
} from '@nestjs/common'
import {PostService} from './post.service'
import {CreatePostDto, UpdatePostDto} from './post.dto'
import {FileInterceptor} from "@nestjs/platform-express";
import {FileService} from "../file/file.service";
import {UserAuthGuard} from "../user/user.auth.guard";

@Controller('post')
export class PostController {
    constructor(private postService: PostService, private fileService: FileService) {
    }

    @HttpCode(HttpStatus.OK)
    @UseGuards(UserAuthGuard)
    @Get('find-one/:id_post')
    async findOnePost(@Param() {id_post}: { id_post: string }) {
        try {
            const data = await this.postService.findOnePost(id_post)

            return {
                message: 'Данные успешно получены',
                type: 'success',
                data: data ? data : {}
            }
        } catch (e) {
            throw new HttpException('Ошибка в сервере', HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    @HttpCode(HttpStatus.OK)
    @UseGuards(UserAuthGuard)
    @Get(':id_user')
    async findPosts(@Param() {id_user}: { id_user: string }) {
        try {
            const data = await this.postService.findPosts(id_user)

            return {
                message: 'Данные успешно получены',
                type: 'success',
                data
            }
        } catch (e) {
            throw new HttpException('Ошибка в сервере', HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    @HttpCode(HttpStatus.CREATED)
    @UseGuards(UserAuthGuard)
    @UseInterceptors(FileInterceptor('img'))
    @Post()
    async createPost(@Body() body: CreatePostDto, @UploadedFile() img) {
        try {
            const {description, id_user, title, message, author} = body
            const fileName = await this.fileService.saveProfileImg(img)
            const data = await this.postService.createPost(description, id_user, title, message, author, fileName)

            return {
                message: 'Данные успешно сохранены',
                type: 'success',
                data
            }
        } catch (e) {
            throw new HttpException('Ошибка в сервере', HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    @HttpCode(HttpStatus.OK)
    @UseGuards(UserAuthGuard)
    @Put()
    async updatePost(@Body() body: UpdatePostDto) {
        try {
            const {description, id_post, message, author, title} = body

            await this.postService.updatePost(description, id_post, message, author, title)
            return {
                message: 'Данные успешно обновлены',
                type: 'success',
                data: []
            }
        } catch (e) {
            throw new HttpException('Ошибка в сервере', HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    @HttpCode(HttpStatus.OK)
    @UseGuards(UserAuthGuard)
    @Delete(':id_post')
    async deletePost(@Param() {id_post}: { id_post: string }) {
        try {
            await this.postService.deletePost(id_post)

            return {
                message: 'Данные успешно удалено',
                type: 'success',
                data: []
            }
        } catch (e) {
            throw new HttpException('Ошибка в сервере', HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
}
