'use babel';

import entityProvider from './entityProvider';
import vmProvider from './vmProvider';

export default {
    getProvider() {
        // return a single provider, or an array of providers to use together
        return [entityProvider, vmProvider];
    }
};
