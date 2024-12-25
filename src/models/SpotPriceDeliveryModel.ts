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

export class SpotPriceDeliveryModel {
    /**
     * Dictionary with prices. Key is the start date and time in UTC and the value is the price  in (Currency*100)/MWh
     */
    'prices': { [key: string]: number | null };

    static readonly discriminator: string | undefined = undefined;

    static readonly attributeTypeMap: Array<{ name: string; baseName: string; type: string; format: string }> = [
        {
            name: 'prices',
            baseName: 'prices',
            type: '{ [key: string]: number | null; }',
            format: 'int32',
        },
    ];

    static getAttributeTypeMap(): Array<{ name: string; baseName: string; type: string; format: string }> {
        return SpotPriceDeliveryModel.attributeTypeMap;
    }

    public constructor() {}
}
