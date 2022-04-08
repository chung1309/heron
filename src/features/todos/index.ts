import {Module} from '@cbidigital/heron-common';
import {TodoControllers, SpinControllers} from './app';
import {TodoRepository, TodoService, SpinService, SpinRepository} from './domain';

@Module({
  controllers: [TodoControllers, SpinControllers],
  providers: [
    TodoRepository,
    TodoService,
    SpinService,
    SpinRepository,
  ],
})
export class TodosModule {

}
