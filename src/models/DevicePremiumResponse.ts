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

import { PremiumFeatureResponseModel } from '../models/PremiumFeatureResponseModel';

export class DevicePremiumResponse {
    'subscriptions'?: Array<PremiumFeatureResponseModel> | null;

    static readonly discriminator: string | undefined = undefined;

    static readonly attributeTypeMap: Array<{ name: string; baseName: string; type: string; format: string }> = [
        {
            name: 'subscriptions',
            baseName: 'subscriptions',
            type: 'Array<PremiumFeatureResponseModel>',
            format: '',
        },
    ];

    static getAttributeTypeMap(): Array<{ name: string; baseName: string; type: string; format: string }> {
        return DevicePremiumResponse.attributeTypeMap;
    }

    public constructor() {}
}
