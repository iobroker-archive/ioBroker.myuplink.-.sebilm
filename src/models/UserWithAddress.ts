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

import { Address } from '../models/Address';

export class UserWithAddress {
    'userId'?: string;
    'email'?: string | null;
    'fullName'?: string | null;
    'address'?: Address;

    static readonly discriminator: string | undefined = undefined;

    static readonly attributeTypeMap: Array<{ name: string; baseName: string; type: string; format: string }> = [
        {
            name: 'userId',
            baseName: 'userId',
            type: 'string',
            format: 'uuid',
        },
        {
            name: 'email',
            baseName: 'email',
            type: 'string',
            format: '',
        },
        {
            name: 'fullName',
            baseName: 'fullName',
            type: 'string',
            format: '',
        },
        {
            name: 'address',
            baseName: 'address',
            type: 'Address',
            format: '',
        },
    ];

    static getAttributeTypeMap(): Array<{ name: string; baseName: string; type: string; format: string }> {
        return UserWithAddress.attributeTypeMap;
    }

    public constructor() {}
}
