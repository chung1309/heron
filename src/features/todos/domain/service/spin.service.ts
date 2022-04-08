import {Inject, Provider, Scope} from '@cbidigital/heron-common';
import {SpinRepository} from '../repository';
import {SpinEntity} from '../entity';
import {SpinModel} from '../model';

export interface ISpinService {
    findAll: () => Promise<SpinModel[]>;
    getById: (id: number) => Promise<SpinModel | undefined>;
    create: (spin: SpinModel) => Promise<number[] | undefined>;
    update: (id: number, spin: SpinModel) => Promise<number | undefined>;
    delete: (id: number) => Promise<number | undefined>;
}

@Provider({scope: Scope.TRANSIENT})
export class SpinService implements ISpinService {
  constructor(@Inject('spin.provider') private readonly _repo: SpinRepository) {
  }

  findAll(): Promise<SpinModel[]> {
    return this._repo.findAll();
  }

  getById(id: number): Promise<SpinModel | undefined> {
    return this._repo.getById(id);
  }

  create(spin: SpinModel): Promise<number[] | undefined> {
    return this._repo.create(spin);
  }

  delete(id: number): Promise<number | undefined> {
    return this._repo.delete(id);
  }

  update(id: number, spin: SpinEntity): Promise<number | undefined> {
    return this._repo.update(id, spin);
  }
}
