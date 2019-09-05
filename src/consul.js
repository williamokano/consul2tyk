const Consul = require('consul');

const logger = require('./logger');

const watchers = [];

const createClient = config => Consul(config);

const createWatcherForDirFactory = consul => key => createWatcher(consul, key, true);
const createWatcherForKeyFactory = consul => key => createWatcher(consul, key, false);

const createWatcher = (consul, key, recurse) => {
    logger.info(`Watching ${recurse ? 'dir' : 'key'} ${key}`)
    const watcher = consul.watch({
        method: consul.kv.get,
        options: { key, recurse },
        backoffFactor: 1000,
    });

    watchers.push(watcher);

    return watcher;
};

const terminateWatcher = watcher => { console.log(`Terminating watcher for ${watcher._options.key}`); watcher.end(); }
const terminateWatchers = () => watchers.forEach(terminateWatcher);

module.exports = {
    createClient,
    createWatcherForDirFactory,
    createWatcherForKeyFactory,
    terminateWatcher,
    terminateWatchers,
};