import { cleanEnv, str, port } from 'envalid';

function validateEnv(): void {
    cleanEnv(process.env, {
        NODE_ENV: str({
            choices: ['development', 'production'],
        }),
        PORT: port({ default: 3000 }),
        DB_TYPE: str(),
        DB_HOST: str(),
        DB_PORT: str(),
        DB_USERNAME: str(),
        DB_DATABASE: str(),
        DB_PASSWORD: str(),
    });
}

export default validateEnv;
