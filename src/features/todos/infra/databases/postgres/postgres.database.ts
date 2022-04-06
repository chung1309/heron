import { KnexClient } from '@cbidigital/heron';
import { Any, DatabaseConnector, Default, UseConfig } from '@cbidigital/heron-common';
import { PostgresDatabaseConfiguration } from '../../../../../configs';
import { AbstractDatabaseClient, AbstractKnexDatabaseClient } from '@cbidigital/heron/database';

@UseConfig(PostgresDatabaseConfiguration)
@Default()
export class PostgresDatabase extends AbstractKnexDatabaseClient<KnexClient> {
    constructor() {
        super();
    }
}

@UseConfig(PostgresDatabaseConfiguration)
@Default()
export class CassandraDatabase extends AbstractDatabaseClient<Any> {
    init(): DatabaseConnector<Any> {
        return {
            connect: () => {
            },
            get: () => {
            }
        };
    }
}
