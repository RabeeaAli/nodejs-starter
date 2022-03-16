import express, { Application } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import compression from 'compression';
import { createConnection } from 'typeorm';
import Controller from '@/utils/interfaces/controller.interface';
import errorMiddleware from '@/middlewares/error.middleware';
import helmet from 'helmet';

class App {
    public express: Application;
    public port: number;

    constructor(controllers: Controller[], port: number) {
        this.express = express()
        this.port = port

        this.initialiseDatabaseConnection();
        this.initialiseMiddleware();
        this.initialiseControllers(controllers);
        this.initialiseErrorHandling();
    }

    /**
    * Initialise database connection
    */
    private initialiseDatabaseConnection() {
        createConnection({
            type: process.env.DB_TYPE as any,
            host: process.env.DB_HOST,
            port: Number(process.env.DB_PORT),
            username: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE,
            synchronize: process.env.DB_SYNCHRONIZE === 'true',
            entities: [
                __dirname + '/pkgs/*/**/*.model.{ts,js}',
            ]
        })
            .then(() => console.log('Database connection successful'))
            .catch(error => console.log('Database connection error: ', error));
    }

    /**
    * Initialise middleware d
    */
    public initialiseMiddleware() {
        this.express.use(cors());
        this.express.use(compression());
        this.express.use(morgan('dev'));
        this.express.use(express.json());
        this.express.use(express.urlencoded({ extended: false }));
        this.express.use(helmet());
    }

    /**
     * Initialise controllers
     */
    private initialiseControllers(controllers: Controller[]): void {
        controllers.forEach((controller: Controller) => {
            this.express.use('/api', controller.router);
        });
    }

    /**
     * Initialise error handling
     */
    private initialiseErrorHandling(): void {
        this.express.use(errorMiddleware);
    }

    /**
     * Start the express server
     */
    public listen(): void {
        this.express.listen(this.port, () => {
            console.log(`App listening on the port ${this.port}`);
        });
    }
}

export default App;
