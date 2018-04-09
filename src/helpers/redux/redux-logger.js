import {createLogger} from 'redux-logger'
import {config} from '../../config/config'

let logger = null;
if (config.reduxLog && console[config.reduxLog]) {
  logger = createLogger({
    level: config.reduxLog
  });
}
export default logger;
