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
 * User profile model.
 */
export class LimitedUserProfile {
    /**
     * Full name.
     */
    'fullName'?: string | null;

    static readonly discriminator: string | undefined = undefined;

    static readonly attributeTypeMap: Array<{ name: string; baseName: string; type: string; format: string }> = [
        {
            name: 'fullName',
            baseName: 'fullName',
            type: 'string',
            format: '',
        },
    ];

    static getAttributeTypeMap() {
        return LimitedUserProfile.attributeTypeMap;
    }

    public constructor() {}
}