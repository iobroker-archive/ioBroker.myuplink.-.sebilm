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
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var myUplink_exports = {};
__export(myUplink_exports, {
  MyUplink: () => MyUplink
});
module.exports = __toCommonJS(myUplink_exports);
var path = __toESM(require("path"));
var import_authRepository = require("./authRepository");
var import_myUplinkRepository = require("./myUplinkRepository");
class MyUplink {
  constructor(dataTarget, config, storeDir, log) {
    this.STRICT_FORBIDDEN_CHARS = /[^a-zA-Z0-9_-]+/gu;
    this.systemIds = /* @__PURE__ */ new Map();
    this.deviceIds = /* @__PURE__ */ new Map();
    this.categories = /* @__PURE__ */ new Map();
    this.parameterIds = /* @__PURE__ */ new Map();
    this.parameterIdToCategory = /* @__PURE__ */ new Map();
    this.objectIdIdByParameterIdByDeviceId = /* @__PURE__ */ new Map();
    this.existingSystemIds = [];
    this.existingCategoryPaths = [];
    var _a, _b, _c, _d;
    this.dataTarget = dataTarget;
    this.config = config;
    this.log = log;
    (_a = config.RenameSystemIds) == null ? void 0 : _a.forEach((renameData) => {
      if (renameData.OriginalId && renameData.NewId) {
        const newSystemId = this.replaceForbiddenCharacters(renameData.NewId);
        this.log.debug(`Map System ID: ${renameData.OriginalId} -> ${newSystemId}`);
        this.systemIds.set(renameData.OriginalId, newSystemId);
      }
    });
    (_b = config.RenameDeviceIds) == null ? void 0 : _b.forEach((renameData) => {
      if (renameData.OriginalId && renameData.NewId) {
        const newDeviceId = this.replaceForbiddenCharacters(renameData.NewId);
        this.log.debug(`Map Device ID: ${renameData.OriginalId} -> ${newDeviceId}`);
        this.deviceIds.set(renameData.OriginalId, newDeviceId);
      }
    });
    (_c = config.RenameCategories) == null ? void 0 : _c.forEach((renameData) => {
      if (renameData.OriginalId && renameData.NewId) {
        const newCategory = this.replaceForbiddenCharacters(renameData.NewId);
        this.log.debug(`Map Category: ${renameData.OriginalId} -> ${newCategory}`);
        this.categories.set(renameData.OriginalId, newCategory);
      }
    });
    (_d = config.RenameDataIds) == null ? void 0 : _d.forEach((renameData) => {
      if (renameData.OriginalId && renameData.NewId) {
        const newId = this.replaceForbiddenCharacters(renameData.NewId);
        this.log.debug(`Map Data ID: ${renameData.OriginalId} -> ${newId}`);
        this.parameterIds.set(renameData.OriginalId, newId);
        if (renameData.Category) {
          const category = this.replaceForbiddenCharacters(renameData.Category);
          this.log.debug(`Set Data ID Category: ${renameData.OriginalId}: ${category}`);
          this.parameterIdToCategory.set(renameData.OriginalId, category);
        }
      }
    });
    const identifier = config.Identifier.trim();
    const secret = config.Secret.trim();
    const callbackURL = config.CallbackURL.trim();
    const configured = config.Configured;
    let error = false;
    if (identifier == "" || identifier == null) {
      if (configured != false) {
        this.log.error("Missing Identifier in the settings!");
      }
      error = true;
    }
    if (secret == "" || secret == null) {
      if (configured != false) {
        this.log.error("Missing Secret in the settings!");
      }
      error = true;
    }
    if (callbackURL == "" || callbackURL == null) {
      if (configured != false) {
        this.log.error("Missing Callback URL in the settings!");
      }
      error = true;
    }
    if (error) {
      throw new Error("Missing settings!");
    }
    const storeFile = path.join(storeDir, "session.json");
    this.authRepository = new import_authRepository.AuthRepository(
      {
        clientId: identifier,
        clientSecret: secret,
        useAuthorizationCodeGrant: config.UseAuthorizationCodeGrant,
        redirectUri: callbackURL,
        authCode: config.AuthCode.trim(),
        sessionStoreFilePath: storeFile,
        baseUrl: "https://api.myuplink.com",
        scope: "READSYSTEM WRITESYSTEM",
        timeout: 45e3,
        userAgent: "iobroker.myuplink",
        renewBeforeExpiry: 5 * 60 * 1e3
      },
      log
    );
    this.myUplinkRepository = new import_myUplinkRepository.MyUplinkRepository(
      {
        baseUrl: "https://api.myuplink.com",
        timeout: 45e3,
        userAgent: "iobroker.myuplink",
        language: config.Language
      },
      this.log
    );
  }
  async GetDataAsync() {
    try {
      const accessToken = await this.authRepository.getAccessTokenAsync();
      const systems = await this.myUplinkRepository.getSystemsAndDevicesAsync(accessToken);
      if (systems.systems) {
        for (const value of systems.systems) {
          await this.setSystemWithDevicesAsync(value, accessToken);
        }
      }
    } catch (error) {
      const errorString = `${error}`;
      this.log.error(errorString);
      return errorString;
    }
  }
  async SetDataAsync(id, value, deviceId, parameterId, isRawJson) {
    try {
      const accessToken = await this.authRepository.getAccessTokenAsync();
      if (accessToken) {
        const valueAsString = value.toString();
        if (parameterId) {
          const result = await this.myUplinkRepository.setDevicePointAsync(deviceId, accessToken, parameterId, valueAsString);
          if (result.status == 200 && result.payload && parameterId in result.payload && result.payload[parameterId] == "modified") {
            this.log.debug(`Parameter ${parameterId} modified by API`);
            await this.dataTarget.SetStateAsync(id, value);
          }
        } else if (isRawJson === true && valueAsString) {
          const keyValueDictionary = JSON.parse(valueAsString);
          if (Object.keys(keyValueDictionary).length > 0) {
            const result = await this.myUplinkRepository.setDevicePointsAsync(deviceId, accessToken, keyValueDictionary);
            if (result.status == 200) {
              await this.dataTarget.SetStateAsync(id, value);
              const objectIdByParameterId = this.objectIdIdByParameterIdByDeviceId.get(deviceId);
              if (objectIdByParameterId && result.payload) {
                for (const [parameterId2, value2] of Object.entries(keyValueDictionary)) {
                  const objectId = objectIdByParameterId.get(parameterId2);
                  const valNumber = parseFloat(value2);
                  if (objectId && !Number.isNaN(valNumber) && parameterId2 in result.payload && result.payload[parameterId2] == "modified") {
                    await this.dataTarget.SetStateAsync(objectId, valNumber);
                  }
                }
              }
            } else {
              this.log.error(`SetData: "${valueAsString}"
Result: "${JSON.stringify(result, null, " ")}"`);
              return `Status: ${result.status}`;
            }
          }
        }
      }
    } catch (error) {
      const errorString = `${error}`;
      this.log.error(errorString);
      return errorString;
    }
  }
  async setSystemWithDevicesAsync(system, accessToken) {
    var _a, _b;
    if (system.systemId != void 0 && system.name != void 0) {
      const systemIdExists = this.existingSystemIds.includes(system.systemId);
      const firstRun = !systemIdExists;
      if (!systemIdExists) {
        this.existingSystemIds.push(system.systemId);
      }
      const systemId = this.replaceForbiddenCharacters(system.systemId);
      const newSystemId = this.systemIds.get(systemId);
      const systemPath = newSystemId != null ? newSystemId : systemId;
      const systemName = this.removeSoftHyphen(system.name);
      if (firstRun) {
        await this.dataTarget.CreateSystemAsync(systemPath, systemName);
      }
      await this.dataTarget.CreateStringStateAsync(`${systemPath}.systemId`, "System ID", system.systemId, firstRun);
      await this.dataTarget.CreateStringStateAsync(`${systemPath}.name`, "Name", systemName, firstRun, "info.name");
      if (system.country != void 0) {
        await this.dataTarget.CreateStringStateAsync(`${systemPath}.country`, "Country", system.country, firstRun);
      }
      if (system.securityLevel != void 0) {
        await this.dataTarget.CreateStringStateAsync(`${systemPath}.securityLevel`, "Security Level", system.securityLevel, firstRun);
      }
      if (system.hasAlarm != void 0) {
        await this.dataTarget.CreateBooleanStateAsync(`${systemPath}.hasAlarm`, "Has Alarm", "indicator.alarm", system.hasAlarm, firstRun);
      }
      if (system.devices) {
        for (const device of system.devices) {
          await this.setSystemDeviceAsync(device, systemPath, accessToken);
        }
      }
      if (this.config.AddActiveNotifications) {
        const notifications = await ((_a = this.myUplinkRepository) == null ? void 0 : _a.getActiveNotificationsAsync(system.systemId, accessToken));
        if (this.config.AddRawActiveNotifications) {
          await this.dataTarget.CreateStringStateAsync(
            `${systemPath}.rawActiveNotifications`,
            "Received raw JSON of active notifications",
            JSON.stringify(notifications == null ? void 0 : notifications.notifications, null, ""),
            firstRun
          );
        }
        let notificationsDescriptions = "";
        (_b = notifications == null ? void 0 : notifications.notifications) == null ? void 0 : _b.forEach((notification) => {
          notificationsDescriptions += `${notification.header}: ${notification.description}
`;
        });
        await this.dataTarget.CreateStringStateAsync(`${systemPath}.activeNotifications`, "Active notification descriptions", notificationsDescriptions, firstRun);
      }
    }
  }
  async setSystemDeviceAsync(device, systemPath, accessToken) {
    var _a, _b, _c;
    if (device.id != void 0 && ((_a = device.product) == null ? void 0 : _a.name) != void 0) {
      const existingMap = this.objectIdIdByParameterIdByDeviceId.get(device.id);
      const firstRun = !existingMap;
      const stateIdByParameterId = existingMap != null ? existingMap : /* @__PURE__ */ new Map();
      if (!existingMap) {
        this.objectIdIdByParameterIdByDeviceId.set(device.id, stateIdByParameterId);
      }
      const deviceId = this.replaceForbiddenCharacters(device.id);
      const newDeviceId = this.deviceIds.get(deviceId);
      const deviceSubPath = newDeviceId != null ? newDeviceId : deviceId;
      const devicePath = `${systemPath}.${deviceSubPath}`;
      const deviceName = this.removeSoftHyphen(device.product.name);
      if (firstRun) {
        await this.dataTarget.CreateDeviceAsync(devicePath, deviceName);
      }
      await this.dataTarget.CreateStringStateAsync(`${devicePath}.deviceId`, "Device ID", device.id, firstRun);
      await this.dataTarget.CreateStringStateAsync(`${devicePath}.name`, "Name", deviceName, firstRun, "info.name");
      if (device.connectionState != void 0) {
        await this.dataTarget.CreateStringStateAsync(`${devicePath}.connectionState`, "Connection State", device.connectionState, firstRun, "info.status");
      }
      if (device.currentFwVersion != void 0) {
        await this.dataTarget.CreateStringStateAsync(`${devicePath}.currentFwVersion`, "Current Firmware Version", device.currentFwVersion, firstRun, "info.firmware");
      }
      if (((_b = device.product) == null ? void 0 : _b.serialNumber) != void 0) {
        await this.dataTarget.CreateStringStateAsync(`${devicePath}.serialNumber`, "Serial Number", device.product.serialNumber, firstRun, "info.serial");
      }
      if (this.config.AddData) {
        const devicePoints = await ((_c = this.myUplinkRepository) == null ? void 0 : _c.getDevicePointsAsync(device.id, accessToken));
        if (this.config.AddRawData) {
          await this.dataTarget.CreateStringStateAsync(`${devicePath}.rawData`, "Received raw JSON of parameter data", JSON.stringify(devicePoints, null, ""), firstRun);
        }
        if (devicePoints) {
          for (const data of devicePoints) {
            await this.setParameterDataAsync(data, devicePath, device.id, stateIdByParameterId);
          }
        }
        if (firstRun) {
          await this.dataTarget.CreateWritableStringObjectAsync(`${devicePath}.setData`, "Send raw JSON of parameter data", "json", device.id);
        }
      }
    }
  }
  async setParameterDataAsync(data, devicePath, deviceId, stateIdByParameterId) {
    var _a;
    if (data.parameterId) {
      const existingObjectId = stateIdByParameterId.get(data.parameterId);
      const stateId = existingObjectId != null ? existingObjectId : await this.getObjectIdAndCreateCategoryAsync(data.parameterId, data.category, devicePath);
      if (!existingObjectId) {
        stateIdByParameterId.set(data.parameterId, stateId);
        await this.createParameterObjectAsync(data, deviceId, stateId);
      }
      await this.dataTarget.SetStateAsync(stateId, (_a = data.value) != null ? _a : null);
    }
  }
  async getObjectIdAndCreateCategoryAsync(parameterId, category, devicePath) {
    var _a, _b, _c, _d;
    const parameterSubPath = (_a = this.parameterIds.get(parameterId)) != null ? _a : this.replaceForbiddenCharacters(parameterId);
    const newCategory = this.parameterIdToCategory.get(parameterId);
    let categorySubPath = null;
    if (newCategory) {
      categorySubPath = newCategory;
    } else if (category && this.config.GroupData) {
      const categoryId = this.replaceForbiddenCharacters(category);
      categorySubPath = (_c = (_b = this.categories.get(category)) != null ? _b : this.categories.get(categoryId)) != null ? _c : categoryId;
    }
    if (categorySubPath) {
      const categoryPath = `${devicePath}.${categorySubPath}`;
      if (!this.existingCategoryPaths.includes(categoryPath)) {
        this.existingCategoryPaths.push(categoryPath);
        await this.dataTarget.CreateCategoryAsync(categoryPath, (_d = newCategory != null ? newCategory : category) != null ? _d : categorySubPath);
      }
      return `${devicePath}.${categorySubPath}.${parameterSubPath}`;
    } else {
      return `${devicePath}.${parameterSubPath}`;
    }
  }
  async createParameterObjectAsync(data, deviceId, stateId) {
    var _a, _b, _c, _d, _e;
    let role = "value";
    let unit = void 0;
    if (data.parameterUnit) {
      unit = data.parameterUnit;
      switch (data.parameterUnit) {
        case "kWh":
        case "Ws":
          role = "value.energy";
          break;
        case "W":
        case "kW":
          role = "value.power";
          break;
        case "\xB0C":
          role = "value.temperature";
          break;
        case "Hz":
          role = "value.frequency";
          break;
        case "A":
          role = "value.current";
          break;
        case "V":
          role = "value.voltage";
          break;
        case "%RH":
          role = "value.humidity";
          unit = "%";
          break;
        case "bar":
          role = "value.pressure";
          break;
      }
    }
    let states = void 0;
    if (data.enumValues && data.enumValues.length > 0) {
      states = {};
      for (const enumValue of data.enumValues) {
        if (enumValue.text && enumValue.value) {
          states[enumValue.value] = this.removeSoftHyphen(enumValue.text);
        }
      }
    }
    const name = this.removeSoftHyphen((_a = data.parameterName) != null ? _a : "");
    const writable = (_b = data.writable) != null ? _b : false;
    const min = (_c = data.minValue) != null ? _c : void 0;
    const max = (_d = data.maxValue) != null ? _d : void 0;
    const step = (_e = data.stepValue) != null ? _e : void 0;
    this.dataTarget.CreateParameterObjectAsync(stateId, name, deviceId, data.parameterId, role, writable, unit, min, max, step, states);
  }
  removeSoftHyphen(text) {
    return text.replace(new RegExp("\xAD", "g"), "");
  }
  replaceForbiddenCharacters(text) {
    return this.removeSoftHyphen(text).replace(this.STRICT_FORBIDDEN_CHARS, "_");
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  MyUplink
});
//# sourceMappingURL=myUplink.js.map
