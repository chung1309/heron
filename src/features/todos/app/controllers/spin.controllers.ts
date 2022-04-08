import {
  Body,
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
import {HttpRequest, HttpResponse} from '@cbidigital/heron-express';
import {StatusCodes} from 'http-status-codes';
import {SpinModel, SpinService} from '../../domain';

@Controller('/api/spins')
@Guard({'roles': ['admin', 'moderator']})
export class SpinControllers {
  constructor(
        private _service: SpinService,
  ) {}

    @Get({uri: '/:id'})
    @Guard({'roles': ['admin', 'moderator'], 'permissions': ['add-user']})
  public async getTodoById(@Param('id') id: number, @Query('filter') test: string): Promise<any> {
    const data = await this._service.getById(id);
    return data;
  }

    @Get({
      uri: '/',
      headers: {'x-ray-id': () => Date.now()},
    })
    @Guard({'roles': ['admin', 'moderator']})
    public async findAll(@Request() http: HttpRequest): Promise<SpinModel[]> {
      const data = await this._service.findAll();
      return data;
    }

    @Post({uri: '/'})
    @Guard({'roles': ['admin']})
    public async create(
        @Body() body: SpinModel,
        @Request() req: HttpRequest,
        @Response() res: HttpResponse,
    ) {
      return res.send({
        task: 'create',
        message: await this._service.create(body),
      });
    }

    @Put({uri: '/:id', code: StatusCodes.NO_CONTENT})
    @Guard({'roles': ['admin', 'moderator']})
    public async update(@Param('id') id: number, @Body() body: SpinModel) {
      return {
        task: 'update',
        message: await this._service.update(id, body),
      };
    }

    @Delete({uri: '/:id'})
    public async delete(@Param('id') id: number) {
      return {
        task: 'deleted',
        message: await this._service.delete(id),
      };
    }
}
