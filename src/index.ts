import 'reflect-metadata';
import { AppModule } from './app';
import { Heron } from '@cbidigital/heron';
import { GlobalApiErrorInterceptor } from './interceptors';

const main = async () => {
    const app = await Heron.create({ module: AppModule });
    await app.listen({
        port: 4000,
        options: {
            cors: { origin: '*', preflightContinue: false, methods: 'GET,HEAD,PUT,PATCH,POST,DELETE' },
            globalError: GlobalApiErrorInterceptor,
        }
    });
};

(async () => await main())();