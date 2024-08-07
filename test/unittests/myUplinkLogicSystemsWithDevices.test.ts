import { expect } from 'chai';
import sinon from 'sinon';
import { MyUplinkLogic } from '../../src/myUplinkLogic';
import { AdapterConfigMock } from './mocks/AdapterConfigMock';
import { DataTargetMock } from './mocks/DataTargetMock';
import { LoggerMock } from './mocks/LoggerMock';

describe('MyUplinkLogic: two systems with devices', () => {
    const dataTargetMock = new DataTargetMock();
    const adapterConfigMock = new AdapterConfigMock();
    const loggerMock = new LoggerMock();
    const myUplinkLogic = new MyUplinkLogic(dataTargetMock, adapterConfigMock, 'storedir', loggerMock);

    const authRepositoryMock = sinon.mock(myUplinkLogic.authRepository);
    authRepositoryMock.expects('getAccessTokenAsync').resolves('testtoken');
    const myUplinkRepositoryMock = sinon.mock(myUplinkLogic.myUplinkRepository);
    myUplinkRepositoryMock.expects('getSystemsAndDevicesAsync').resolves({
        systems: [
            {
                systemId: 'mySystemTestID',
                name: 'mySystemTestName',
                country: 'MyCountry',
                securityLevel: 'viewer',
                hasAlarm: true,
                devices: [
                    { wrong: 'data will be ignored' },
                    { id: 'ignoreWithoutName' },
                    { id: 'Device1ID', product: { name: 'Product 1 Name' } },
                    { product: { name: 'Ignore without ID' } },
                ],
            },
            {
                systemId: 'myOtherSystemID',
                name: 'myOtherTestName',
                country: 'Germany',
                securityLevel: 'manager',
                hasAlarm: false,
                devices: [
                    { id: 'DeviceId2', product: { name: 'Product B', serialNumber: '123ABC' }, connectionState: 'Connected', currentFwVersion: '1.2.3' },
                    {},
                    { id: 'Device3', product: { name: 'Product 3', serialNumber: 'ABCDEF' }, connectionState: 'Disconnected', currentFwVersion: '3.2.1' },
                ],
            },
        ],
    });
    myUplinkRepositoryMock.expects('getActiveNotificationsAsync').withArgs('mySystemTestID', 'testtoken').resolves({});
    myUplinkRepositoryMock.expects('getActiveNotificationsAsync').withArgs('myOtherSystemID', 'testtoken').resolves({});
    myUplinkRepositoryMock.expects('getDevicePointsAsync').withArgs('Device1ID', 'testtoken').resolves(undefined);
    myUplinkRepositoryMock.expects('getDevicePointsAsync').withArgs('DeviceId2', 'testtoken').resolves([]);
    myUplinkRepositoryMock.expects('getDevicePointsAsync').withArgs('Device3', 'testtoken').resolves([]);

    let error: string | undefined;
    before(async () => {
        error = await myUplinkLogic.GetDataAsync();
    });

    it('should return no error', () => {
        expect(error).to.undefined;
    });

    it('should log no errors', () => {
        expect(loggerMock.ErrorLogs).to.empty;
    });

    it('should log no warings', () => {
        expect(loggerMock.WarnLogs).to.empty;
    });

    it('should create systems', () => {
        expect(dataTargetMock.CreateSystemAsyncCalls).to.deep.include({ path: 'mySystemTestID', name: 'mySystemTestName' });
        expect(dataTargetMock.CreateSystemAsyncCalls).to.deep.include({ path: 'myOtherSystemID', name: 'myOtherTestName' });
        expect(dataTargetMock.CreateSystemAsyncCalls).to.have.lengthOf(2);
    });

    it('should create devices', () => {
        expect(dataTargetMock.CreateDeviceAsyncCalls).to.deep.include({ path: 'mySystemTestID.Device1ID', name: 'Product 1 Name' });
        expect(dataTargetMock.CreateDeviceAsyncCalls).to.deep.include({ path: 'myOtherSystemID.DeviceId2', name: 'Product B' });
        expect(dataTargetMock.CreateDeviceAsyncCalls).to.deep.include({ path: 'myOtherSystemID.Device3', name: 'Product 3' });
        expect(dataTargetMock.CreateDeviceAsyncCalls).to.have.lengthOf(3);
    });

    it('should create states', () => {
        // System 1:
        expect(dataTargetMock.CreateStringStateAsyncCalls).to.deep.include({
            path: 'mySystemTestID.systemId',
            name: 'System ID',
            value: 'mySystemTestID',
            createObject: true,
            role: undefined,
        });
        expect(dataTargetMock.CreateStringStateAsyncCalls).to.deep.include({
            path: 'mySystemTestID.name',
            name: 'Name',
            value: 'mySystemTestName',
            createObject: true,
            role: 'info.name',
        });
        expect(dataTargetMock.CreateStringStateAsyncCalls).to.deep.include({
            path: 'mySystemTestID.country',
            name: 'Country',
            value: 'MyCountry',
            createObject: true,
            role: undefined,
        });
        expect(dataTargetMock.CreateStringStateAsyncCalls).to.deep.include({
            path: 'mySystemTestID.securityLevel',
            name: 'Security Level',
            value: 'viewer',
            createObject: true,
            role: undefined,
        });
        expect(dataTargetMock.CreateStringStateAsyncCalls).to.deep.include({
            path: 'mySystemTestID.rawActiveNotifications',
            name: 'Received raw JSON of active notifications',
            value: undefined,
            createObject: true,
            role: undefined,
        });
        expect(dataTargetMock.CreateStringStateAsyncCalls).to.deep.include({
            path: 'mySystemTestID.activeNotifications',
            name: 'Active notification descriptions',
            value: '',
            createObject: true,
            role: undefined,
        });
        expect(dataTargetMock.CreateBooleanStateAsyncCalls).to.deep.include({
            path: 'mySystemTestID.hasAlarm',
            name: 'Has Alarm',
            value: true,
            createObject: true,
            role: 'indicator.alarm',
        });
        // Device 1-1:
        expect(dataTargetMock.CreateStringStateAsyncCalls).to.deep.include({
            path: 'mySystemTestID.Device1ID.deviceId',
            name: 'Device ID',
            value: 'Device1ID',
            createObject: true,
            role: undefined,
        });
        expect(dataTargetMock.CreateStringStateAsyncCalls).to.deep.include({
            path: 'mySystemTestID.Device1ID.name',
            name: 'Name',
            value: 'Product 1 Name',
            createObject: true,
            role: 'info.name',
        });
        expect(dataTargetMock.CreateStringStateAsyncCalls).to.deep.include({
            path: 'mySystemTestID.Device1ID.rawData',
            name: 'Received raw JSON of parameter data',
            value: undefined,
            createObject: true,
            role: undefined,
        });
        // System 2:
        expect(dataTargetMock.CreateStringStateAsyncCalls).to.deep.include({
            path: 'myOtherSystemID.systemId',
            name: 'System ID',
            value: 'myOtherSystemID',
            createObject: true,
            role: undefined,
        });
        expect(dataTargetMock.CreateStringStateAsyncCalls).to.deep.include({
            path: 'myOtherSystemID.name',
            name: 'Name',
            value: 'myOtherTestName',
            createObject: true,
            role: 'info.name',
        });
        expect(dataTargetMock.CreateStringStateAsyncCalls).to.deep.include({
            path: 'myOtherSystemID.country',
            name: 'Country',
            value: 'Germany',
            createObject: true,
            role: undefined,
        });
        expect(dataTargetMock.CreateStringStateAsyncCalls).to.deep.include({
            path: 'myOtherSystemID.securityLevel',
            name: 'Security Level',
            value: 'manager',
            createObject: true,
            role: undefined,
        });
        expect(dataTargetMock.CreateStringStateAsyncCalls).to.deep.include({
            path: 'myOtherSystemID.rawActiveNotifications',
            name: 'Received raw JSON of active notifications',
            value: undefined,
            createObject: true,
            role: undefined,
        });
        expect(dataTargetMock.CreateStringStateAsyncCalls).to.deep.include({
            path: 'myOtherSystemID.activeNotifications',
            name: 'Active notification descriptions',
            value: '',
            createObject: true,
            role: undefined,
        });
        expect(dataTargetMock.CreateBooleanStateAsyncCalls).to.deep.include({
            path: 'myOtherSystemID.hasAlarm',
            name: 'Has Alarm',
            value: false,
            createObject: true,
            role: 'indicator.alarm',
        });
        // Device 2-1:
        expect(dataTargetMock.CreateStringStateAsyncCalls).to.deep.include({
            path: 'myOtherSystemID.DeviceId2.deviceId',
            name: 'Device ID',
            value: 'DeviceId2',
            createObject: true,
            role: undefined,
        });
        expect(dataTargetMock.CreateStringStateAsyncCalls).to.deep.include({
            path: 'myOtherSystemID.DeviceId2.name',
            name: 'Name',
            value: 'Product B',
            createObject: true,
            role: 'info.name',
        });
        expect(dataTargetMock.CreateStringStateAsyncCalls).to.deep.include({
            path: 'myOtherSystemID.DeviceId2.rawData',
            name: 'Received raw JSON of parameter data',
            value: '[]',
            createObject: true,
            role: undefined,
        });
        expect(dataTargetMock.CreateStringStateAsyncCalls).to.deep.include({
            path: 'myOtherSystemID.DeviceId2.serialNumber',
            name: 'Serial Number',
            value: '123ABC',
            createObject: true,
            role: 'info.serial',
        });
        expect(dataTargetMock.CreateStringStateAsyncCalls).to.deep.include({
            path: 'myOtherSystemID.DeviceId2.connectionState',
            name: 'Connection State',
            value: 'Connected',
            createObject: true,
            role: 'info.status',
        });
        expect(dataTargetMock.CreateStringStateAsyncCalls).to.deep.include({
            path: 'myOtherSystemID.DeviceId2.currentFwVersion',
            name: 'Current Firmware Version',
            value: '1.2.3',
            createObject: true,
            role: 'info.firmware',
        });
        // Device 2-2:
        expect(dataTargetMock.CreateStringStateAsyncCalls).to.deep.include({
            path: 'myOtherSystemID.Device3.deviceId',
            name: 'Device ID',
            value: 'Device3',
            createObject: true,
            role: undefined,
        });
        expect(dataTargetMock.CreateStringStateAsyncCalls).to.deep.include({
            path: 'myOtherSystemID.Device3.name',
            name: 'Name',
            value: 'Product 3',
            createObject: true,
            role: 'info.name',
        });
        expect(dataTargetMock.CreateStringStateAsyncCalls).to.deep.include({
            path: 'myOtherSystemID.Device3.rawData',
            name: 'Received raw JSON of parameter data',
            value: '[]',
            createObject: true,
            role: undefined,
        });
        expect(dataTargetMock.CreateStringStateAsyncCalls).to.deep.include({
            path: 'myOtherSystemID.Device3.serialNumber',
            name: 'Serial Number',
            value: 'ABCDEF',
            createObject: true,
            role: 'info.serial',
        });
        expect(dataTargetMock.CreateStringStateAsyncCalls).to.deep.include({
            path: 'myOtherSystemID.Device3.connectionState',
            name: 'Connection State',
            value: 'Disconnected',
            createObject: true,
            role: 'info.status',
        });
        expect(dataTargetMock.CreateStringStateAsyncCalls).to.deep.include({
            path: 'myOtherSystemID.Device3.currentFwVersion',
            name: 'Current Firmware Version',
            value: '3.2.1',
            createObject: true,
            role: 'info.firmware',
        });

        expect(dataTargetMock.CreateStringStateAsyncCalls).to.have.lengthOf(27);
        expect(dataTargetMock.CreateBooleanStateAsyncCalls).to.have.lengthOf(2);
    });

    it('should create writeable string objects', () => {
        expect(dataTargetMock.CreateWritableStringObjectAsyncCalls).to.deep.include({
            path: 'mySystemTestID.Device1ID.setData',
            name: 'Send raw JSON of parameter data',
            role: 'json',
            deviceId: 'Device1ID',
        });
        expect(dataTargetMock.CreateWritableStringObjectAsyncCalls).to.deep.include({
            path: 'myOtherSystemID.DeviceId2.setData',
            name: 'Send raw JSON of parameter data',
            role: 'json',
            deviceId: 'DeviceId2',
        });
        expect(dataTargetMock.CreateWritableStringObjectAsyncCalls).to.deep.include({
            path: 'myOtherSystemID.Device3.setData',
            name: 'Send raw JSON of parameter data',
            role: 'json',
            deviceId: 'Device3',
        });
        expect(dataTargetMock.CreateWritableStringObjectAsyncCalls).to.have.lengthOf(3);
    });

    it('should not do more', () => {
        expect(dataTargetMock.CreateCategoryAsyncCalls).to.empty;
        expect(dataTargetMock.CreateParameterObjectAsyncCalls).to.empty;
        expect(dataTargetMock.SetStateAsyncCalls).to.empty;
    });
});
