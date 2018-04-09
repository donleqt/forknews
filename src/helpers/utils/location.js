export const LocationHelper = {
  getUrlParams: (str = location.search) => {
    const query = str.replace(/^([^=]*?\?)|(^\/)/, '');
    const result = {};

    if (query) {
      query.split("&").forEach(function (part) {
        const item = part.split("=");
        if (item.length === 2) {
          result[item[0]] = decodeURIComponent(item[1]);
        }
        else {
          result[item[0]] = true;
        }
      });
    }
    return result;
  },
};