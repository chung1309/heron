import {
  APIError,
  DatabaseLookup,
  ModuleDatabase,
  Provider,
  Scope,
  UseConfig,
} from '@cbidigital/heron-common';
import {KnexClient} from '@cbidigital/heron';
import {StatusCodes} from 'http-status-codes';
import {SpinEntity} from '../entity';
export interface ISpinRepository {
    findAll: () => Promise<SpinEntity[]>;
    getById: (id: number) => Promise<SpinEntity | undefined>;
    create: (spin: SpinEntity) => Promise<number[] | undefined>;
    update: (id: number, spin: SpinEntity) => Promise<number | undefined>;
    delete: (id: number) => Promise<number | undefined>;
}

@Provider({token: 'spin.provider', scope: Scope.SINGLETON})
@UseConfig({test: 'ahihi'})
export class SpinRepository implements ISpinRepository {
  private readonly _client: KnexClient;

  constructor(
        @DatabaseLookup() private readonly _db: ModuleDatabase<KnexClient>,
  ) {
    this._client = _db.database()!;
  }

  public findAll = async () => {
    return this._client.select('*').from('spins');
  };

  public getById = async (id: number) => {
    const query = this._client
        .select('*')
        .from<SpinEntity>('spins')
        .leftJoin('todos', 'todos.spin_id', 'spins.id')
        .where('spins.id', id);
    const data = await query;
    console.log(data);

    const spin = query.first();
    return spin;
  };

  public create = async (spin: SpinEntity) => {
    try {
      const newSpin = await this._client('spins').insert(spin);
      return newSpin;
    } catch (e: any) {
      throw new APIError(StatusCodes.CONFLICT, e.message);
    }
  };

  public update = async (id: number, spin: Omit<SpinEntity, 'id'>) => {
    return this._client('spins').update(spin).where({id});
  };

  public delete = async (id: number) => {
    return this._client('spins').delete().where({id});
  };
}
