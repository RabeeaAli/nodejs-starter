import { Post } from '@/pkgs/post/post.model';
import { getRepository } from "typeorm";

class PostService {

    /**
     * get full posts
     */
    public async index() {
        try {
            const posts = await getRepository(Post).find();

            return posts;
        } catch (error) {
            throw new Error('Unable to get posts');
        }
    }

    /**
     * get a post by id
     */
    public async show(id: string) {
        try {
            const post = await getRepository(Post).findOneOrFail(id);

            return post;
        } catch (error) {
            throw new Error('Unable to get post');
        }
    }

    /**
     * Create a new post
     */
    public async create(title: string, body: string): Promise<Post> {
        try {
            const post = getRepository(Post).save({ title, body, created_at: new Date() });

            return post;
        } catch (error) {
            throw new Error('Unable to create post');
        }
    }
}

export default PostService;
