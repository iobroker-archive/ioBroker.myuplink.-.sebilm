"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var myUplinkRepository_exports = {};
__export(myUplinkRepository_exports, {
  MyUplinkRepository: () => MyUplinkRepository
});
module.exports = __toCommonJS(myUplinkRepository_exports);
var import_axios = __toESM(require("axios"));
function setProperty(obj, propertyName, value) {
  obj[propertyName] = value;
}
class MyUplinkRepository {
  constructor(options, log) {
    this.log = log;
    this.options = options;
    import_axios.default.defaults.baseURL = options.baseUrl;
    import_axios.default.defaults.headers.common["user-agent"] = options.userAgent;
    import_axios.default.defaults.timeout = options.timeout;
  }
  getSystemsAndDevicesAsync(accessToken) {
    return this.getFromMyUplinkAsync("/v2/systems/me", accessToken);
  }
  getDevicePointsAsync(deviceId, accessToken) {
    return this.getFromMyUplinkAsync(`/v3/devices/${deviceId}/points`, accessToken);
  }
  setDevicePointAsync(deviceId, accessToken, parameterId, value) {
    const body = {};
    setProperty(body, parameterId, value);
    return this.setDevicePointsAsync(deviceId, accessToken, body);
  }
  setDevicePointsAsync(deviceId, accessToken, keyValueDictionary) {
    return this.patchToMyUplinkAsync(`/v2/devices/${deviceId}/points`, keyValueDictionary, accessToken);
  }
  getActiveNotificationsAsync(systemId, accessToken) {
    return this.getFromMyUplinkAsync(`/v2/systems/${systemId}/notifications/active?itemsPerPage=100`, accessToken);
  }
  async getFromMyUplinkAsync(url, accessToken) {
    const lang = this.options.language;
    this.log.debug(`GET ${url} (lang: ${lang})`);
    try {
      const { data } = await import_axios.default.get(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Accept-Language": lang
        }
      });
      this.log.silly(`Response from GET ${url} (lang: ${lang}): ${JSON.stringify(data, null, " ")}`);
      return data;
    } catch (error) {
      throw this.checkError(url, error);
    }
  }
  async patchToMyUplinkAsync(url, body, accessToken) {
    const lang = this.options.language;
    this.log.debug(`PATCH ${url} (lang: ${lang})`);
    this.log.silly(`PATCH body: ${JSON.stringify(body, null, " ")}`);
    try {
      const { data } = await import_axios.default.patch(url, body, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Accept-Language": lang
        }
      });
      this.log.debug(`Response from PATCH ${url} (lang: ${lang}): ${JSON.stringify(data, null, " ")}`);
      return data;
    } catch (error) {
      throw this.checkError(url, error);
    }
  }
  checkError(suburl, error) {
    this.log.error(`error from ${suburl}`);
    this.log.error(JSON.stringify(error, null, " "));
    if (import_axios.default.isAxiosError(error)) {
      const axiosError = error;
      if (axiosError.response != null) {
        if (axiosError.response.data != null) {
          const responseText = JSON.stringify(axiosError.response.data, null, " ");
          const errorMessage = `${axiosError.response.statusText}: ${responseText}`;
          return new Error(errorMessage);
        } else {
          return new Error(axiosError.response.statusText);
        }
      }
    }
    return error;
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  MyUplinkRepository
});
//# sourceMappingURL=myUplinkRepository.js.map
