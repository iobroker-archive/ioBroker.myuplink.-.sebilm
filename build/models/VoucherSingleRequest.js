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
var VoucherSingleRequest_exports = {};
__export(VoucherSingleRequest_exports, {
  VoucherSingleRequest: () => VoucherSingleRequest
});
module.exports = __toCommonJS(VoucherSingleRequest_exports);
const _VoucherSingleRequest = class _VoucherSingleRequest {
  /**
   * Returns the attribute type map.
   */
  static getAttributeTypeMap() {
    return _VoucherSingleRequest.attributeTypeMap;
  }
  /**
   * Constructs a new instance of the VoucherSingleRequest class.
   */
  constructor() {
  }
};
_VoucherSingleRequest.discriminator = void 0;
_VoucherSingleRequest.attributeTypeMap = [
  {
    name: "numDays",
    baseName: "numDays",
    type: "number",
    format: "int32"
  },
  {
    name: "voucherType",
    baseName: "voucherType",
    type: "VoucherType",
    format: ""
  },
  {
    name: "serialNumber",
    baseName: "serialNumber",
    type: "string",
    format: ""
  }
];
let VoucherSingleRequest = _VoucherSingleRequest;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  VoucherSingleRequest
});
//# sourceMappingURL=VoucherSingleRequest.js.map
