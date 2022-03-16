import { Router, Request, Response, NextFunction } from 'express';
import response from '@/utils/response';
import Controller from '@/utils/interfaces/controller.interface';
import HttpException from '@/utils/exceptions/http.exception';
import validationMiddleware from '@/middlewares/validation.middleware';
import validate from '@/pkgs/post/post.validation';
import PostService from '@/pkgs/post/post.service';

class PostController implements Controller {
    public path = '/posts';
    public router = Router();
    private PostService = new PostService();

    constructor() {
        this.initialiseRoutes();
    }

    private initialiseRoutes(): void {
        this.router.get(
            `${this.path}`,
            this.index
        );
        this.router.get(
            `${this.path}/show/:id`,
            this.show
        );
        this.router.post(
            `${this.path}`,
            validationMiddleware(validate.create),
            this.create
        );
    }

    private index = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const posts = await this.PostService.index();

            response.success(200, 'posts', [], posts, res);
        } catch (error) {
            next(new HttpException(400, '', ['Cannot get posts'], ''));
        }
    };

    private show = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const post = await this.PostService.show(req.params.id);

            response.success(200, 'post', [], post, res);
        } catch (error) {
            next(new HttpException(400, '', ['Cannot get a post'], ''));
        }
    };

    private create = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const { title, body } = req.body;

            const post = await this.PostService.create(title, body);

            response.success(201, 'Post created', [], post, res);
        } catch (error) {
            next(new HttpException(400, '', ['Cannot create post'], ''));
        }
    };
}

export default PostController;
