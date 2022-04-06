import { Module } from '@cbidigital/heron-common';
// import { TodoControllers } from './app';
import { TodoRepository, TodoService } from './domain';

@Module({
    // controllers: [TodoControllers],
    providers: [TodoRepository, TodoService]
})
export class TodosModule {

}