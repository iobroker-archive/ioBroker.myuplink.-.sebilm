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

import type { SystemWithDevices } from '../models/SystemWithDevices';

/**
 * Group list.
 */
export class PagedSystemResult {
    /**
     * Id.
     */
    'page'?: number;
    /**
     * Connection state.
     */
    'itemsPerPage'?: number;
    /**
     * Firmware.
     */
    'numItems'?: number;
    /**
     * Groups.
     */
    'systems'?: Array<SystemWithDevices> | null;

    static readonly discriminator: string | undefined = undefined;

    static readonly attributeTypeMap: Array<{ name: string; baseName: string; type: string; format: string }> = [
        {
            name: 'page',
            baseName: 'page',
            type: 'number',
            format: 'int32',
        },
        {
            name: 'itemsPerPage',
            baseName: 'itemsPerPage',
            type: 'number',
            format: 'int32',
        },
        {
            name: 'numItems',
            baseName: 'numItems',
            type: 'number',
            format: 'int32',
        },
        {
            name: 'systems',
            baseName: 'systems',
            type: 'Array<SystemWithDevices>',
            format: '',
        },
    ];

    /**
     * Returns the attribute type map for PagedSystemResult.
     */
    static getAttributeTypeMap(): Array<{ name: string; baseName: string; type: string; format: string }> {
        return PagedSystemResult.attributeTypeMap;
    }

    /**
     * Constructs a new instance of the PagedSystemResult class.
     */
    public constructor() {}
}
