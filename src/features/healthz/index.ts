import { Module } from '@cbidigital/heron-common';
import { HealthCheckControllers } from './app/controllers';
import { EventsControllers } from './events';

@Module({
    controllers: [HealthCheckControllers, EventsControllers]
})
export class HealthCheckModule {

}