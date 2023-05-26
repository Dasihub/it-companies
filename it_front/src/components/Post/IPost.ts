import { IPost } from "../../pages/PostPage/IPostPage";

export interface IPostProps {
    posts: IPost[]
    deletePost: (id_post: string) => void
    changePost: (post: IPost) => void
}