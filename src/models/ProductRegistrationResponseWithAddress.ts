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

import { ProductRegistrationAddress } from '../models/ProductRegistrationAddress';

export class ProductRegistrationResponseWithAddress {
    'address'?: ProductRegistrationAddress;
    /**
     * Serial number, and also id, for the product registration.
     */
    'serialNumber'?: string | null;
    /**
     * The operating hours for the product registration.
     */
    'operatingHours'?: number | null;
    /**
     * Determines what date the product was installed.
     */
    'installationDate'?: Date;
    /**
     * Determines what date the product was registered.
     */
    'registrationDate'?: Date;
    /**
     * Determines what date the warranty expires.
     */
    'warrantyEndDate'?: Date;
    /**
     * The name of the customer.
     */
    'customerName'?: string | null;
    /**
     * The id of the user connected to this product registration.
     */
    'userId'?: string | null;
    /**
     * The id of the user´s address details.
     */
    'userAddressId'?: string | null;
    /**
     * The id of the Service Partner, if known.
     */
    'servicePartnerId'?: number | null;
    /**
     * The user´s email address.
     */
    'userEmail'?: string | null;
    /**
     * The id of the system´s address details.
     */
    'systemAddressId'?: string;
    /**
     * The name of the installer of the product.
     */
    'installerName'?: string | null;
    /**
     * The site where the product is installed.
     */
    'site'?: string | null;
    /**
     * The name of the current model.
     */
    'modelName'?: string | null;
    /**
     * Phone number to the installation.
     */
    'phone'?: string | null;
    /**
     * Product name.
     */
    'productName'?: string | null;

    static readonly discriminator: string | undefined = undefined;

    static readonly attributeTypeMap: Array<{ name: string; baseName: string; type: string; format: string }> = [
        {
            name: 'address',
            baseName: 'address',
            type: 'ProductRegistrationAddress',
            format: '',
        },
        {
            name: 'serialNumber',
            baseName: 'serialNumber',
            type: 'string',
            format: '',
        },
        {
            name: 'operatingHours',
            baseName: 'operatingHours',
            type: 'number',
            format: 'int32',
        },
        {
            name: 'installationDate',
            baseName: 'installationDate',
            type: 'Date',
            format: 'date-time',
        },
        {
            name: 'registrationDate',
            baseName: 'registrationDate',
            type: 'Date',
            format: 'date-time',
        },
        {
            name: 'warrantyEndDate',
            baseName: 'warrantyEndDate',
            type: 'Date',
            format: 'date-time',
        },
        {
            name: 'customerName',
            baseName: 'customerName',
            type: 'string',
            format: '',
        },
        {
            name: 'userId',
            baseName: 'userId',
            type: 'string',
            format: 'uuid',
        },
        {
            name: 'userAddressId',
            baseName: 'userAddressId',
            type: 'string',
            format: 'uuid',
        },
        {
            name: 'servicePartnerId',
            baseName: 'servicePartnerId',
            type: 'number',
            format: 'int32',
        },
        {
            name: 'userEmail',
            baseName: 'userEmail',
            type: 'string',
            format: '',
        },
        {
            name: 'systemAddressId',
            baseName: 'systemAddressId',
            type: 'string',
            format: 'uuid',
        },
        {
            name: 'installerName',
            baseName: 'installerName',
            type: 'string',
            format: '',
        },
        {
            name: 'site',
            baseName: 'site',
            type: 'string',
            format: '',
        },
        {
            name: 'modelName',
            baseName: 'modelName',
            type: 'string',
            format: '',
        },
        {
            name: 'phone',
            baseName: 'phone',
            type: 'string',
            format: '',
        },
        {
            name: 'productName',
            baseName: 'productName',
            type: 'string',
            format: '',
        },
    ];

    static getAttributeTypeMap(): Array<{ name: string; baseName: string; type: string; format: string }> {
        return ProductRegistrationResponseWithAddress.attributeTypeMap;
    }

    public constructor() {}
}
