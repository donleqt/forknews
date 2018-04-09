import {FetchErrorHandler, ErrorTypes} from './error-handler';
import fetch from 'isomorphic-fetch';

const NetMethods = ["PUT", "POST", "GET", "DELETE"];

export class NetService {
  constructor(defaultOption = {}, errHandler = new FetchErrorHandler()) {
    this.errHandler = errHandler;
    this.net = new Proxy({}, {
      get: (target, name) => {
        if (typeof name === 'string') {
          name = name.toUpperCase();
          if (NetMethods.indexOf(name) !== -1) {
            return (url, opt = {}) => {
              opt = {
                ...defaultOption,
                ...opt,
              };
              opt.method = name;
              if (defaultOption.query) {
                opt.query = {
                  ...defaultOption.query,
                  ...opt.query
                }
              }

              if (opt.cached) {
                return Promise.resolve({
                  data: opt.cached
                })
              }
              else {
                return this._wrappedRequest(url, opt);
              }
            }
          }

        }
      }
    })
  }

  _wrappedRequest(url, opt = {}) {
    const headers = {};
    if (!opt.isFile) {
      // headers['Accept'] = 'application/json';
      // headers['Content-Type'] = 'application/json; charset=utf-8';
      opt.body ? opt.body = JSON.stringify(opt.body) : 0;
    }
    opt.headers ? Object.assign(opt.headers, headers) : opt.headers = headers;
    // opt.credentials = opt.credentials || 'include';
    if (opt.query) {
      url += '?' + Object.entries(opt.query).map(arr => {
            const v2 = Array.isArray(arr[1]) ? arr[1].join(',') : arr[1].toString();
            return arr[0].toString() + '=' + v2;
          }).join('&');
    }
    if (opt.inUrl) {
      Object.keys(opt.inUrl).map(key => {
        url = url.replace(`:${key}`, opt.inUrl[key]);
      });
    }
    const promise = fetch(url, opt)
        .then(res => {
          return new Promise((resolve, reject) => {
            res[opt.textBody ? 'arrayBuffer' : 'json']()
                .then(data => resolve(data))
                .catch(err => {
                  reject(err);
                  this.errHandler.handle(res, ErrorTypes.network);
                })
          })
        })
        .then(resp => {
          if (resp && resp.status !== 'OK') {
            !opt.silentMode && this.errHandler.handle(resp, ErrorTypes.api);
          }
          return opt.getResponse ? opt.getResponse(resp) : resp;
        });

    promise.catch(err => {
      this.errHandler.handle(err, ErrorTypes.system);
    });

    return promise;
  }
}