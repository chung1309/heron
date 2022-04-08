import {Controller, EventHandler, EventLookup, Get, Guard, Message} from '@cbidigital/heron-common';
import {TodoEntity} from '../../todos/domain';
import {TestIntervalService} from '../../../services';

@Controller('/events')
export class EventsControllers {
  constructor(@EventLookup('test-messaging') private _event: EventHandler<TodoEntity>, @EventLookup(TestIntervalService.name) private _interval: EventHandler<void>) {
  }

    @Get({uri: '/emit'})
  public async emit(): Promise<any> {
    const data = {
      id: Math.random() * 1000,
      title: `Title ${Math.random() * 1000}`,
    };
    this._event.emit('data', <Message<TodoEntity>>{data});
    return data;
  };

    @Get({uri: '/stop'})
    public async stop(): Promise<any> {
      this._event.emit('destroy');
    };

    @Get({uri: '/stop_interval'})
    public async stopInterval(): Promise<any> {
      this._interval.dispose();
    }
}
