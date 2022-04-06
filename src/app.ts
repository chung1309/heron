import { Databases, GateKeeper, Module, Stores, } from '@cbidigital/heron-common';
import { AuthContext, AuthContextResolver } from './context/auth.context';
import { HealthCheckModule } from './features/healthz';
import { MemoryCacheConfig } from './configs';
import { MYSQLDatabase, PostgresDatabase, } from './features/todos/infra/databases';
import { TodosModule } from './features/todos';
import { TestIntervalService, TestMessagingService, TestService } from './services';
import { Ws1Controller, Ws2Controller } from './websocket';
import { TodoGraphController, VersionController } from './graphql/version/app';

@Module({
    imports: [HealthCheckModule, TodosModule],
    services: [TestIntervalService, TestService, TestMessagingService],
    websockets: [Ws1Controller, Ws2Controller],
    graphqls: [VersionController,TodoGraphController]
})
@GateKeeper(AuthContext, AuthContextResolver)
@Databases([MYSQLDatabase, PostgresDatabase])
@Stores([MemoryCacheConfig])
export class AppModule {
}
