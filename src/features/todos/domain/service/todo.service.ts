import {APIError, Inject, Provider, Scope} from '@cbidigital/heron-common';
import {TodoRepository} from '../repository';
import {TodoEntity} from '../entity';
import {TodoModel} from '../model';
import {StatusCodes} from 'http-status-codes';

export interface ITodoService {
    findAll: () => Promise<TodoModel[]>;
    getById: (id: number) => Promise<TodoModel | undefined>;
    create: (todo: TodoModel) => Promise<number[] | undefined>;
    update: (id: number, todo: TodoModel) => Promise<number | undefined>;
    delete: (id: number) => Promise<number | undefined>;
}

@Provider({scope: Scope.TRANSIENT})
export class TodoService implements ITodoService {
  constructor(@Inject('todo.provider') private readonly _repo: TodoRepository) {
  }

  findAll(): Promise<TodoModel[]> {
    return this._repo.findAll();
  }

  getById(id: number): Promise<TodoModel | undefined> {
    return this._repo.getById(id);
  }

  create(todo: TodoModel): Promise<number[] | undefined> {
    return this._repo.create(todo);
  }

  delete(id: number): Promise<number | undefined> {
    return this._repo.delete(id);
  }

  update(id: number, todo: TodoEntity): Promise<number | undefined> {
    return this._repo.update(id, todo);
  }
}
