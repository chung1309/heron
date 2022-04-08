import {TodoService} from '../../../../features/todos/domain';
import {Context, GraphQL, GraphQLSchema, Info, Params, Resolver} from '@cbidigital/heron-graphql';
import {Any, Guard} from '@cbidigital/heron-common';
import {Param} from '@cbidigital/heron-graphql/decorators/graphql-param.decorator';

export const TodoType: GraphQLSchema = {
  typeDefs: `
        type Todo {
            id: Int
            title:String
            description: String
            createdAt: Int
            updatedAt: Int
        }`,
  Query: `
        todos: [Todo]
        todo(id:Int!):Todo
    `,
};

type TodoFilter = {
    id: number;
}

@GraphQL(TodoType)
@Guard({roles: ['admin2']})
export class TodoGraphController {
  constructor(private readonly _service: TodoService) {
  }

    @Resolver()
    @Guard({roles: ['admin']})
  async todos() {
    return await this._service.findAll();
  }

    @Resolver()
    async todo(@Params() filter: TodoFilter, @Context() context: Any, @Info() info: Any, @Param('id') id: number) {
      return this._service.getById(filter.id);
    }
}
