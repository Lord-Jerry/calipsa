module.exports = {
    port: process.env.PORT || 9090,
    logs: {
        level: process.env.LOG_LEVEL || 'silly',
    },
    api: {
        prefix: '/api/v1',
    },
};
