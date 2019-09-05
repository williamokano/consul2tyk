const logger = require('../logger');

const onChange = data => {
    if (data) {
        data.forEach(item => {
            const { Key, Value } = item;
            logger.info(`Found data change on key ${Key}`);
            logger.info(JSON.parse(Value, null, 2));
        });
    }
};

const onError = error => logger.error(error);

module.exports = watcher => {
    watcher.on('change', onChange);
    watcher.on('error', onError);
}