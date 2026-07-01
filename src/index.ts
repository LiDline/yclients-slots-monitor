import { loadConfig } from './config/index.js';
import { createLogger } from './logger/index.js';

const config = loadConfig();
const logger = createLogger(config);

logger.info({ environment: config.nodeEnv }, 'YCLIENTS slots monitor scaffold initialized');
