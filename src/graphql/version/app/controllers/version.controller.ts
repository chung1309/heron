import { Context, GraphQL, Resolver, GraphQLSchema, Info } from '@cbidigital/heron-graphql';
import { Any, Guard } from '@cbidigital/heron-common';

export const VersionType: GraphQLSchema = {
    typeDefs: `
        type Version {
            version: Int
            name: String
            createdAt: Int
            updatedAt: Int
        }`,
    Query: `
        versions: [Version]
        version(name:String!):[Version]
    `
};

@GraphQL()
@Guard({ role: ['admin', 'moderator'], permissions: ['test'] })
export class VersionController {
    private _versions = [{
        version: 1,
        name: 'version1',
        createdAt: 223123,
        updatedAt: 55343
    }, {
        version: 2,
        name: 'version2',
        createdAt: 223123,
        updatedAt: 55343
    }];

    constructor() {
    }

    @Resolver({ name: 'version3' })
    @Guard({ roles: ['admin'] })
    async version(@Context() context: Any, @Info() info: Any) {
        return this._versions.filter(x => x.name === 'version1'); //name
    };

    @Resolver()
    async versions() {
        return this._versions;
    };

}