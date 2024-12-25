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
 * Represents the Device Method Invocation Results.
 */
export class CloudToDeviceMethodResult {
    /**
     * Gets or sets the status of device method invocation.
     */
    'status'?: number;
    'payload'?: any | null;

    static readonly discriminator: string | undefined = undefined;

    static readonly attributeTypeMap: Array<{ name: string; baseName: string; type: string; format: string }> = [
        {
            name: 'status',
            baseName: 'status',
            type: 'number',
            format: 'int32',
        },
        {
            name: 'payload',
            baseName: 'payload',
            type: 'any',
            format: '',
        },
    ];

    static getAttributeTypeMap(): Array<{ name: string; baseName: string; type: string; format: string }> {
        return CloudToDeviceMethodResult.attributeTypeMap;
    }

    public constructor() {}
}
