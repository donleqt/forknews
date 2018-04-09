export class ErrorHandler {
  static ErrorTypes = {
    network: 'network',
    system: 'system',
    api: 'api'
  };

  handle(errData, type) {
    const {ErrorTypes} = ErrorHandler;

    switch (type) {
      case ErrorTypes.network:
        break;
      case ErrorTypes.system:
        this.handleErrorType(errData);
        break;
      case ErrorTypes.api:
        this.handleDataType(errData);
        break;
      default:
        break;
    }
  }

  handleErrorType(errData) {
  }

  handleDataType(errData) {
  }
}

