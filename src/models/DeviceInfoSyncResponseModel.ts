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

export class DeviceInfoSyncResponseModel {
    'syncId'?: number;
    'status'?: string | null;

    static readonly discriminator: string | undefined = undefined;

    static readonly attributeTypeMap: Array<{ name: string; baseName: string; type: string; format: string }> = [
        {
            name: 'syncId',
            baseName: 'syncId',
            type: 'number',
            format: 'int32',
        },
        {
            name: 'status',
            baseName: 'status',
            type: 'string',
            format: '',
        },
    ];

    static getAttributeTypeMap(): Array<{ name: string; baseName: string; type: string; format: string }> {
        return DeviceInfoSyncResponseModel.attributeTypeMap;
    }

    public constructor() {}
}
