import { DatabaseClient, DatabaseDriver } from '@cbidigital/heron-common';
import { CommonDatabaseConfig } from '@cbidigital/heron-common/consts/database.consts';

export const MySQLDatabaseConfiguration = {
    client: DatabaseClient.KNEX,
    config: <CommonDatabaseConfig>{
        host: process.env.MYSQL_HOST || 'localhost',
        port: process.env.MYSQL_PORT || 3306,
        user: process.env.MYSQL_USER || 'root',
        password: process.env.MYSQL_PASSWORD || 'password',
        database: process.env.MYSQL_DATABASE || 'deron',
        pooling: { min: 1, max: 10 },
        driver: DatabaseDriver.MYSQL,
        cluster: {
            slaves: process.env.MYSQL_SLAVES || `tcp://localhost:3306?user=root&password=password&database=deron`
        }
    }
};

export const PostgresDatabaseConfiguration = {
    client: DatabaseClient.KNEX,
    config: <CommonDatabaseConfig>{
        host: process.env.POSTGRES_HOST || '178.128.119.213',
        port: process.env.POSTGRES_PORT || 5432,
        user: process.env.POSTGRES_USER || 'dev',
        password: process.env.POSTGRES_PASSWORD || 'dev@123',
        database: process.env.POSTGRES_DATABASE || 'dev',
        pooling: { min: 1, max: 10 },
        driver: DatabaseDriver.POSTGRES,
        cluster: {
            slaves: process.env.POSTGRES_SLAVES || 'tcp://178.128.119.213:5432?user=dev&password=dev@123&database=dev'
        }
    }
};