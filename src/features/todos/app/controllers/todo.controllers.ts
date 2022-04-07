import {
    Body,
    CacheLookup,
    Controller,
    Delete,
    Get,
    Guard,
    Param,
    Post,
    Put,
    Query,
    Request,
    Response,
} from '@cbidigital/heron-common';
import { HttpRequest, HttpResponse } from '@cbidigital/heron-express';
import { from, Observable, of, switchMap, tap } from 'rxjs';
import { TodoModel, TodoService } from '../../domain';
// import { CacheHandler, CacheStore } from '@cbidigital/heron/cache';

@Controller('/api/todos')
@Guard({ 'roles': ['admin', 'moderator'] })
export class TodoControllers {
//     private readonly _cacheStore?: CacheHandler;

    constructor(
        private _service: TodoService,
//         @CacheLookup() readonly cacheStore: CacheStore
    ) {
//         this._cacheStore = cacheStore.get();
    }

    @Get({ uri: '/:id' })
    @Guard({ 'roles': ['admin', 'moderator'], 'permissions': ['add-user'] })
    public async getTodoById(@Param('id') id: number, @Query('filter') test: string): Promise<any> {
        // const key = 'findById:' + id;
        // let data = await this._cacheStore?.get(key);
        // if (data) return data;
        // else {
            const data = await this._service.getById(id);
        //     if (data) this._cacheStore?.set(key, data);
        // }
        // const a = await this._cacheStore?.keys();
        // console.table(a);
        return data;
    }

    @Get({
        uri: '/',
        headers: { 'x-ray-id': () => Date.now() },
    })
    @Guard({ 'roles': ['admin', 'moderator'] })
    public async findAll(@Request() http: HttpRequest): Promise<TodoModel[]> {
        // const key = 'findAll';
        // const $process = from(this._service.findAll()).pipe(
        //     tap((value) => {
        //         if (value) {
        //             this._cacheStore?.set(key, value);
        //         }
        //     })
        // );
        // if (this._cacheStore) {
        //     return from(this._cacheStore.get(key)).pipe(
        //         switchMap((value: any) => {
        //             if (!value) return $process;
        //             return of(value);
        //         })
        //     );
        // }
        const data = await this._service.findAll()
        return data;
    }

    @Post({ uri: '/' })
    @Guard({ 'roles': ['admin'] })
    public async create(
        @Body() body: TodoModel,
        @Request() req: HttpRequest,
        @Response() res: HttpResponse
    ) {
        return res.send({
            task: 'create',
            message: await this._service.create(body),
        });
    }

    @Put({ uri: '/:id' })
    @Guard({ 'roles': ['admin', 'moderator'] })
    public async update(@Param('id') id: number, @Body() body: TodoModel) {
        return {
            task: 'update',
            message: await this._service.update(id, body),
        };
    }

    @Delete({ uri: '/:id' })
    public async delete(@Param('id') id: number) {
        return {
            task: 'deleted',
            message: await this._service.delete(id),
        };
    }
}
