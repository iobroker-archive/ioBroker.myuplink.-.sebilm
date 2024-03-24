"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var UpdateGroupRequest_exports = {};
__export(UpdateGroupRequest_exports, {
  UpdateGroupRequest: () => UpdateGroupRequest
});
module.exports = __toCommonJS(UpdateGroupRequest_exports);
const _UpdateGroupRequest = class _UpdateGroupRequest {
  static getAttributeTypeMap() {
    return _UpdateGroupRequest.attributeTypeMap;
  }
  constructor() {
  }
};
_UpdateGroupRequest.discriminator = void 0;
_UpdateGroupRequest.attributeTypeMap = [
  {
    name: "name",
    baseName: "name",
    type: "string",
    format: ""
  }
];
let UpdateGroupRequest = _UpdateGroupRequest;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  UpdateGroupRequest
});
//# sourceMappingURL=UpdateGroupRequest.js.map
