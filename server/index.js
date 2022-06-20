const { server, io } = require('./app');
const config = require('./utils/config');
const logger = require('./utils/logger');

server.listen(config.PORT, () => {
  logger.info(`Server is running on port ${config.PORT}`);
});
