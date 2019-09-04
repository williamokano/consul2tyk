const {
    createClient,
    createWatcherForDirFactory,
    createWatcherForKeyFactory,
    terminateWatchers
} = require('./consul');

const consulHost = process.env.CONSUL_HOST || '127.0.0.1';
const consulPort = process.env.CONSUL_PORT || 8500;

const tykAppsKeys = process.env.TYK_APPS_KEY || 'tyk/apps/';
const tykPoliciesKey = process.env.TYK_POLICIES_KEY || 'tyk/policies'

const client = createClient({
    host: consulHost,
    port: consulPort,
    promisify: true,
});

const createWatcherForDir = createWatcherForDirFactory(client);
const createWatcherForKey = createWatcherForKeyFactory(client);

createWatcherForDir(tykAppsKeys).on('change', data => {
    if (data) {
        data.forEach(item => {
            const { Key, Value } = item;
            console.log(`Found data change on key ${Key}`);
            console.log(JSON.parse(Value, null, 2));
        });
    }
});

createWatcherForKey(tykPoliciesKey).on('change', data => {

});

process.on('SIGINT', () => {
    console.log('Terminating app');
    terminateWatchers();
});