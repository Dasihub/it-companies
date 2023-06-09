import { PostService } from './post.service';
import { CreatePostDto, UpdatePostDto } from './post.dto';
import { FileService } from '../file/file.service';
export declare class PostController {
    private postService;
    private fileService;
    constructor(postService: PostService, fileService: FileService);
    findOnePost({ id_post }: {
        id_post: string;
    }): Promise<{
        message: string;
        type: string;
        data: {};
    }>;
    findPosts({ id_user }: {
        id_user: string;
    }): Promise<{
        message: string;
        type: string;
        data: (import("mongoose").Document<unknown, {}, import("./post.schema").PostDocument> & Omit<import("./post.schema").Post & import("mongoose").Document<any, any, any> & {
            _id: import("mongoose").Types.ObjectId;
        }, never>)[];
    }>;
    createPost(body: CreatePostDto, img: any): Promise<{
        message: string;
        type: string;
        data: import("mongoose").Document<unknown, {}, import("./post.schema").PostDocument> & Omit<import("./post.schema").Post & import("mongoose").Document<any, any, any> & {
            _id: import("mongoose").Types.ObjectId;
        }, never>;
    }>;
    updatePost(body: UpdatePostDto, img: any): Promise<{
        message: string;
        type: string;
        data: import("mongoose").UpdateWriteOpResult;
    }>;
    deletePost({ id_post }: {
        id_post: string;
    }): Promise<{
        message: string;
        type: string;
        data: any[];
    }>;
}
