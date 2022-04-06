import { KnexClient } from '@cbidigital/heron';
import { Any, Default, UseConfig } from '@cbidigital/heron-common';
import { MySQLDatabaseConfiguration } from '../../../../../configs';
import { AbstractDatabaseClient, AbstractKnexDatabaseClient } from '@cbidigital/heron/database';

@UseConfig(MySQLDatabaseConfiguration)
export class MYSQLDatabase extends AbstractKnexDatabaseClient<KnexClient> {
    constructor() {
        super();
    }
}
