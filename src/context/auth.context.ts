import { Any, Resolver, SecureContext, SecureProperty, } from '@cbidigital/heron-common';
import { Observable, of } from 'rxjs';

export type SampleSecurityType = {
    roles: string[],
    permissions: string[],
    accessType?: number
}

export const AuthContextResolver: Resolver<SampleSecurityType> = {
    http: ['header', 'authorization'], ws: ['handshake', 'token'],

    resolve: async (data?: string): Promise<Any> => {
        return data;
    }
};

export class AuthContext implements SecureContext<SampleSecurityType, SecureProperty> {
    OnGuard(data: SampleSecurityType): Observable<SecureProperty> {
        // if (!auth) throw new APIError(StatusCodes.UNAUTHORIZED, 'Invalid Token!');
        return of(data || { roles: ['admin', 'moderator'], permissions: ['add-user'] });
    }
}
