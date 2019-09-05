const {
    createClient,
    createWatcherForDirFactory,
    createWatcherForKeyFactory,
    terminateWatchers,
} = require('./consul');

const {
    appsHandler,
    policiesHandler,
} = require('./handlers');

const consulHost = process.env.CONSUL_HOST || '127.0.0.1';
const consulPort = process.env.CONSUL_PORT || 8500;

const tykAppsKeys = process.env.TYK_APPS_KEY || 'tyk/apps/';
const tykPoliciesKey = process.env.TYK_POLICIES_KEY || 'tyk/policies.json'

const client = createClient({
    host: consulHost,
    port: consulPort,
    promisify: true,
});

const createWatcherForDir = createWatcherForDirFactory(client);
const createWatcherForKey = createWatcherForKeyFactory(client);

appsHandler(createWatcherForDir(tykAppsKeys));
policiesHandler(createWatcherForKey(tykPoliciesKey));

process.on('SIGINT', () => {
    console.log('Terminating app');
    terminateWatchers();
});