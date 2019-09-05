const logger = require('../logger');

const onChange = data => {
    if (data) {
        const { Key, Value } = data;
        logger.info(`Found data change on key ${Key}`);
        //logger.info(JSON.stringify(Value, null, 2));
    }
};

const onError = error => logger.error(error);

module.exports = watcher => {
    watcher.on('change', onChange);
    watcher.on('error', onError);
}