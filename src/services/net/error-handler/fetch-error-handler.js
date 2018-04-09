import {ErrorHandler} from '../error-handler/error-handler';

export class FetchErrorHandler extends ErrorHandler {
  opts = {
    prefixTitle: 'Server: '
  };

  handleDataType(errData) {
    if (errData.errors) {
      errData.errors.forEach(e => {
        const mgs = `${this.opts.prefixTitle + e.message}`;
        console.log(mgs);
      });
    }
  }

  handleErrorType(errData) {
    console.log(errData);
  }
}
