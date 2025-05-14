import { NhostClient } from '@nhost/nhost-js'
import { secureStorageAdapter } from './secureStorage';

export const nhost = new NhostClient({
    subdomain: 'bjvosmhhedwdbtdkflex',
    region: 'sa-east-1',
    clientStorageType: 'react-native',
    clientStorage: secureStorageAdapter,

})
