const defaultConfig = require('./default.json');

class Config {

  constructor(env = 'development') {
    this.env = env;
    // Assign default config and environmental config
    Object.assign(this, defaultConfig, require(`./${env}.json`));
    this.mergeApi();
  }

  //Merge api host with api paths
  mergeApi() {
    for (const [key, value] of Object.entries(this.api)) {
      const base = this.apiPath[key];
      if (base) {
        for (const [name, path] of Object.entries(value)) {
          if (!this.api[name]) {
            this.api[name] = `${base}${path}`;
          }
          else {
            throw new Error(`Duplicate Api name: ${name} of ${key} path`)
          }
        }
      }
      else {
        throw new Error(`Can't not find api path for : ${key}`);
      }
    }
  }
}
export const config = new Config(process.env.NODE_ENV);