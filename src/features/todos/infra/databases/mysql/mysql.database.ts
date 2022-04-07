import { KnexClient } from "@cbidigital/heron";
import {
    Any,
    DatabaseContext,
    Default,
    UseConfig,
} from "@cbidigital/heron-common";
import { MySQLDatabaseConfiguration } from "../../../../../configs";
import {
    AbstractDatabaseClient,
    AbstractKnexDatabaseClient,
} from "@cbidigital/heron/database";

@UseConfig(MySQLDatabaseConfiguration)
@Default()
export class MYSQLDatabase extends AbstractKnexDatabaseClient<KnexClient> {
    constructor() {
        super();
    }
    context(): DatabaseContext<any, any> {
        return this;
    }
}
