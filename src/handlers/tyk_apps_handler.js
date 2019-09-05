const api = require('../api');
const logger = require('../logger');
const { mergeDeep } = require('../utils');

const getFileNameFromKey = key => key.split('/').slice(-1).pop();

const getApi = async id => await api.get(`/tyk/apis/${id}`);

const containsApi = async apiDefinition => {
    if (!apiDefinition.api_id) {
        return false;
    }

    try {
        await getApi(apiDefinition.api_id);
        return true;
    } catch {
        return false;
    }
};

const reloadTykDefinitions = async () => {
    await api.get('/tyk/reload/group');
    logger.info('Reloading Tyk definitions');
};

const createApi = async definition => {
    try {
        logger.info(`Attempting to create API definition`, definition);
        const { data } = await api.post('/tyk/apis', definition);
        logger.info(`New API definition created with id ${data.key}`);
    } catch (e) {
        logger.error(e.response);
        logger.error(e);
    }
};

const updateApi = async (id, definition) => {
    try {
        const { data } = await getApi(id);
        const updateDefinition = mergeDeep(data, definition);

        logger.info(`Attempting to update api id ${id}`);
        logger.debug(updateDefinition);
        await api.put(`/tyk/apis/${id}`, updateDefinition);
        logger.info(`API ${id} updated with success.`);
    } catch (e) {
        console.error(e.response.body);
        throw e;
    }
};

const onChange = async data => {
    if (data) {
        const promises = data.map(async item => {
            const { Key, Value } = item;
            const filename = getFileNameFromKey(Key);
            logger.info(`Evaluating file ${filename}`);
    
            try {
                const apiDefinition = JSON.parse(Value);
                if (await containsApi(apiDefinition)) {
                    await updateApi(apiDefinition.api_id, apiDefinition);
                } else {
                    await createApi(apiDefinition);
                }
            } catch (e) {
                logger.error(e);
            }
        });

        await Promise.all(promises);
        await reloadTykDefinitions();
        logger.info('Watch completed');
    }
};

const onError = error => logger.error(error);

module.exports = watcher => {
    watcher.on('change', onChange);
    watcher.on('error', onError);
}