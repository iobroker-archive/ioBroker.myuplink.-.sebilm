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

/**
 * Represents the response containing firmware information for a device.
 */
export class DeviceFirmwareInfoResponse {
    'deviceId'?: string | null;
    'firmwareId'?: string | null;
    'currentFwVersion'?: string | null;
    'pendingFwVersion'?: string | null;
    'desiredFwVersion'?: string | null;

    static readonly discriminator: string | undefined = undefined;

    static readonly attributeTypeMap: Array<{ name: string; baseName: string; type: string; format: string }> = [
        {
            name: 'deviceId',
            baseName: 'deviceId',
            type: 'string',
            format: '',
        },
        {
            name: 'firmwareId',
            baseName: 'firmwareId',
            type: 'string',
            format: '',
        },
        {
            name: 'currentFwVersion',
            baseName: 'currentFwVersion',
            type: 'string',
            format: '',
        },
        {
            name: 'pendingFwVersion',
            baseName: 'pendingFwVersion',
            type: 'string',
            format: '',
        },
        {
            name: 'desiredFwVersion',
            baseName: 'desiredFwVersion',
            type: 'string',
            format: '',
        },
    ];

    /**
     * Returns the attribute type map for DeviceFirmwareInfoResponse.
     */
    static getAttributeTypeMap(): Array<{ name: string; baseName: string; type: string; format: string }> {
        return DeviceFirmwareInfoResponse.attributeTypeMap;
    }

    /**
     * Constructs a new instance of the DeviceFirmwareInfoResponse class.
     */
    public constructor() {}
}
