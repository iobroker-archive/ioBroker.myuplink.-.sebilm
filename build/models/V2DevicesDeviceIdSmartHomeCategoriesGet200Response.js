"use strict";
/**
 * myUplink Public API
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * OpenAPI spec version: v2
 *
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.V2DevicesDeviceIdSmartHomeCategoriesGet200Response = void 0;
class V2DevicesDeviceIdSmartHomeCategoriesGet200Response {
    static getAttributeTypeMap() {
        return V2DevicesDeviceIdSmartHomeCategoriesGet200Response.attributeTypeMap;
    }
    constructor() { }
}
exports.V2DevicesDeviceIdSmartHomeCategoriesGet200Response = V2DevicesDeviceIdSmartHomeCategoriesGet200Response;
V2DevicesDeviceIdSmartHomeCategoriesGet200Response.discriminator = undefined;
V2DevicesDeviceIdSmartHomeCategoriesGet200Response.attributeTypeMap = [
    {
        name: 'shEnergyMetered',
        baseName: 'sh-energyMetered',
        type: 'boolean',
        format: '',
    },
    {
        name: 'shHwBoost',
        baseName: 'sh-hwBoost',
        type: 'boolean',
        format: '',
    },
    {
        name: 'shHwTemp',
        baseName: 'sh-hwTemp',
        type: 'boolean',
        format: '',
    },
    {
        name: 'shIndoorCO2',
        baseName: 'sh-indoorCO2',
        type: 'boolean',
        format: '',
    },
    {
        name: 'shIndoorHumidity',
        baseName: 'sh-indoorHumidity',
        type: 'boolean',
        format: '',
    },
    {
        name: 'shIndoorSpHeat',
        baseName: 'sh-indoorSpHeat',
        type: 'boolean',
        format: '',
    },
    {
        name: 'shIndoorSpCool',
        baseName: 'sh-indoorSpCool',
        type: 'boolean',
        format: '',
    },
    {
        name: 'shIndoorSpOffsHeat',
        baseName: 'sh-indoorSpOffsHeat',
        type: 'boolean',
        format: '',
    },
    {
        name: 'shIndoorSpOffsCool',
        baseName: 'sh-indoorSpOffsCool',
        type: 'boolean',
        format: '',
    },
    {
        name: 'shIndoorTemp',
        baseName: 'sh-indoorTemp',
        type: 'boolean',
        format: '',
    },
    {
        name: 'shOutdoorTemp',
        baseName: 'sh-outdoorTemp',
        type: 'boolean',
        format: '',
    },
    {
        name: 'shPoolTemp',
        baseName: 'sh-poolTemp',
        type: 'boolean',
        format: '',
    },
    {
        name: 'shReturnTemp',
        baseName: 'sh-returnTemp',
        type: 'boolean',
        format: '',
    },
    {
        name: 'shSmartMode',
        baseName: 'sh-smartMode',
        type: 'boolean',
        format: '',
    },
    {
        name: 'shSolarEnergyProducedDay',
        baseName: 'sh-solarEnergyProducedDay',
        type: 'boolean',
        format: '',
    },
    {
        name: 'shSolarEnergyProducedWeek',
        baseName: 'sh-solarEnergyProducedWeek',
        type: 'boolean',
        format: '',
    },
    {
        name: 'shSolarEnergyProducedMonth',
        baseName: 'sh-solarEnergyProducedMonth',
        type: 'boolean',
        format: '',
    },
    {
        name: 'shSolarEnergyProducedYear',
        baseName: 'sh-solarEnergyProducedYear',
        type: 'boolean',
        format: '',
    },
    {
        name: 'shSolarEnergyProducedTotal',
        baseName: 'sh-solarEnergyProducedTotal',
        type: 'boolean',
        format: '',
    },
    {
        name: 'shSupplyTemp',
        baseName: 'sh-supplyTemp',
        type: 'boolean',
        format: '',
    },
    {
        name: 'shVentBoost',
        baseName: 'sh-ventBoost',
        type: 'boolean',
        format: '',
    },
    {
        name: 'shVentMode',
        baseName: 'sh-ventMode',
        type: 'boolean',
        format: '',
    },
    {
        name: 'shZones',
        baseName: 'sh-zones',
        type: 'boolean',
        format: '',
    },
    {
        name: 'shZoneMode',
        baseName: 'sh-zoneMode',
        type: 'boolean',
        format: '',
    },
    {
        name: 'shElectricPowerUsedCurrently',
        baseName: 'sh-electricPowerUsedCurrently',
        type: 'boolean',
        format: '',
    },
    {
        name: 'shHwMode',
        baseName: 'sh-hwMode',
        type: 'boolean',
        format: '',
    },
    {
        name: 'shIndoorCO2Sp',
        baseName: 'sh-indoorCO2Sp',
        type: 'boolean',
        format: '',
    },
    {
        name: 'shIndoorHumiditySp',
        baseName: 'sh-indoorHumiditySp',
        type: 'boolean',
        format: '',
    },
    {
        name: 'shPoolSp',
        baseName: 'sh-poolSp',
        type: 'boolean',
        format: '',
    },
    {
        name: 'shSolarPowerAvailableCurrently',
        baseName: 'sh-solarPowerAvailableCurrently',
        type: 'boolean',
        format: '',
    },
    {
        name: 'shElectricalPriceMode',
        baseName: 'sh-electricalPriceMode',
        type: 'boolean',
        format: '',
    },
    {
        name: 'shElectricalPriceModeDuration',
        baseName: 'sh-electricalPriceModeDuration',
        type: 'boolean',
        format: '',
    },
    {
        name: 'shIndoorHumidityMode',
        baseName: 'sh-indoorHumidityMode',
        type: 'boolean',
        format: '',
    },
    {
        name: 'shIndoorDeHumiditySp',
        baseName: 'sh-indoorDeHumiditySp',
        type: 'boolean',
        format: '',
    },
    {
        name: 'shFanMode',
        baseName: 'sh-fanMode',
        type: 'boolean',
        format: '',
    },
    {
        name: 'shFanStatus',
        baseName: 'sh-fanStatus',
        type: 'boolean',
        format: '',
    },
    {
        name: 'shEnergyStateOfCharge',
        baseName: 'sh-energyStateOfCharge',
        type: 'boolean',
        format: '',
    },
    {
        name: 'shEnergyMeteredDay',
        baseName: 'sh-energyMeteredDay',
        type: 'boolean',
        format: '',
    },
    {
        name: 'shEnergyMeteredMonth',
        baseName: 'sh-energyMeteredMonth',
        type: 'boolean',
        format: '',
    },
    {
        name: 'shEnergyMeteredYear',
        baseName: 'sh-energyMeteredYear',
        type: 'boolean',
        format: '',
    },
    {
        name: 'shElectricalPriceNextLow',
        baseName: 'sh-electricalPriceNextLow',
        type: 'boolean',
        format: '',
    },
    {
        name: 'shElectricalPriceNextHigh',
        baseName: 'sh-electricalPriceNextHigh',
        type: 'boolean',
        format: '',
    },
    {
        name: 'shHeatMode',
        baseName: 'sh-heatMode',
        type: 'boolean',
        format: '',
    },
    {
        name: 'shHeatBoost',
        baseName: 'sh-heatBoost',
        type: 'boolean',
        format: '',
    },
];
//# sourceMappingURL=V2DevicesDeviceIdSmartHomeCategoriesGet200Response.js.map