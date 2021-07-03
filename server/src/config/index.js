module.exports = {
    port: process.env.NODE_ENV !== 'test' ? 9090 : 9999,
    logs: {
        level: process.env.LOG_LEVEL || 'silly',
    },
    api: {
        prefix: '/api/v1',
    },
};
