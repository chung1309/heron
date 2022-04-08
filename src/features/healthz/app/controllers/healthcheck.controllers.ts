import {
  Controller,
  EventHandler,
  EventLookup,
  Get,
  Guard,
  Post,
  Request,
  UseInterceptors,
} from '@cbidigital/heron-common';
import {Observable, of} from 'rxjs';
import {RouteInterceptor} from '../../../../interceptors';
import {HttpRequest} from '@cbidigital/heron-express';
import {TodoEntity} from '../../../todos/domain';

@Controller('/healthz')
export class HealthCheckControllers {
  constructor(@EventLookup('test-messaging') private _event: EventHandler<TodoEntity>) {
  }

    @Get({uri: '/liveness'})
    @UseInterceptors([RouteInterceptor])
  public async liveness(): Promise<any> {
    return {status: 'ok'};
  }

    @Get({uri: '/readiness'})
    public readiness(): Observable<any> {
      return of({status: 'ok'});
    }

    @Post({uri: '/upload'})
    @UseInterceptors([RouteInterceptor])
    public async uploadFile(@Request() request: HttpRequest): Promise<any> {
      return { };
    }
}
