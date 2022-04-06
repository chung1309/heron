import {
    Any,
    APIError,
    DatabaseLookup,
    ModuleDatabase,
    Optional,
    Provider,
    Scope,
    UseConfig,
} from '@cbidigital/heron-common';
import { KnexClient } from '@cbidigital/heron';
import { TodoEntity } from '../entity';
import { StatusCodes } from 'http-status-codes';
import { MYSQLDatabase } from '../../infra/databases';

export interface ITodoRepository {
    findAll: () => Promise<TodoEntity[]>;
    getById: (id: number) => Promise<TodoEntity | undefined>;
    create: (todo: TodoEntity) => Promise<number[] | undefined>;
    update: (id: number, todo: TodoEntity) => Promise<number | undefined>;
    delete: (id: number) => Promise<number | undefined>;
}

@Provider({ token: 'todo.provider', scope: Scope.SINGLETON })
@UseConfig({test:'ahihi'})
export class TodoRepository implements ITodoRepository {
    private readonly _client: Optional<KnexClient>;

    constructor(
        @DatabaseLookup(MYSQLDatabase.name)
        private readonly _db2: ModuleDatabase<KnexClient>,
        @DatabaseLookup() private readonly _db: ModuleDatabase<KnexClient>,
    ) {
        this._client = _db.database();
    }

    public findAll = async () => {
        if (this._client) {
            return this._client.select('*').from('todos');
        } else return [];
    };

    public getById = async (id: number) => {
        if (this._client) {
            return this._client
                .select('*')
                .from<TodoEntity>('todos')
                .where({
                    id,
                })
                .first();
        }
    };

    public create = async (todo: TodoEntity) => {
        try {
            if (this._client) {
                return await this._client('todos').insert(todo);
            }
        } catch (e: any) {
            throw new APIError(StatusCodes.CONFLICT, e.message);
        }
    };

    public update = async (id: number, todo: Omit<TodoEntity, 'id'>) => {
        if (this._client) {
            return this._client('todos').update(todo).where({ id });
        }
    };

    public delete = async (id: number) => {
        if (this._client) {
            return this._client('todos').delete().where({ id });
        }
    };
}
