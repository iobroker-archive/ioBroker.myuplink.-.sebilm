# ioBroker.myuplink

[![NPM version](https://img.shields.io/npm/v/iobroker.myuplink.svg)](https://www.npmjs.com/package/iobroker.myuplink)
![Current version in stable repository](https://iobroker.live/badges/myuplink-stable.svg)
[![Downloads](https://img.shields.io/npm/dm/iobroker.myuplink.svg)](https://www.npmjs.com/package/iobroker.myuplink)
![Number of Installations](https://iobroker.live/badges/myuplink-installed.svg)
[![Build Status](https://github.com/sebilm/ioBroker.myuplink/workflows/Test%20and%20Release/badge.svg)](https://github.com/sebilm/ioBroker.myuplink/actions/workflows/test-and-release.yml)

[![NPM](https://nodei.co/npm/iobroker.myuplink.png?downloads=true)](https://nodei.co/npm/iobroker.myuplink/)

## myuplink.com adapter for ioBroker

This ioBroker adapter receives data from myUplink.com.

## Using this adapter

German version below - Eine deutsche Version dieser Anleitung gibt's weiter unten.

1. You need a myUplink compatible heat pump from NIBE, AIT, Cetetherm, ClimateMaster, Contura, CTA, CTC, Enertech Global or Høiax - buy one if you don't have ;-)
2. You need an account at myUplink: https://myuplink.com
3. Go to myUplink Api: https://dev.myuplink.com and log in
4. Click "Applications" and then "Create New Application"
5. Fill in: Name and Description can be everything e.g. ioBroker
6. The Callback URL is important for Authorization Code Grant Flow. You can use https://sebilm.github.io/ioBroker.myuplink/myuplink.html
7. Accept the myUplink API Services Agreement and click "Create"
8. Then you get an Identifier and a Secret - we need them
9. Install this adapter in ioBroker
10. At adapter setting page fill in the Identifier and the Secret.
11. Choose your language and all other settings.
12. Click Save and Close

Each device has an object in the object tree called `setData`. You can enter a JSON object of the form

```json
{
    "12345": "42",
    "23456": "1"
}
```

in this object. This makes it possible to send and change several data points to the API at the same time.
It can also be used to change data points that are not sent by the API.

## How the adapter works

The adapter retrieves the list of systems and devices from the myUplink API every x minutes (depending on the setting). It then
retrieves the available parameters for each device and saves them in the object tree. If myUplink sends new parameters in the process,
these are automatically added to the object tree.

The adapter generally does not delete any objects so that data is not lost if myUplink does not send a parameter.

The adapter also has no influence on which parameters are sent by myUplink.

## Verwendung dieses Adapters

1. Es wird eine myUplink-kompatible Wärmepumpe von NIBE, AIT, Cetetherm, ClimateMaster, Contura, CTA, CTC, Enertech Global or Høiax benötigt.
2. Es wird ein Account bei myUplink benötigt: https://myuplink.com
3. Auf der myUplink-API-Webseite einloggen: https://dev.myuplink.com
4. "Applications" und dann "Create New Application" anklicken
5. Name und Description können beliebig ausgefüllt werden, z.B. "ioBroker"
6. Die Callback URL ist für den Authorization Code Grant Flow wichtig. Es kann https://sebilm.github.io/ioBroker.myuplink/myuplink.html eingetragen werden.
7. Die myUplink API Services Agreements müssen akzeptiert und es muss auf "Create" geklickt werden.
8. Es wird ein Identifier und ein Secret angezeigt - diese werden benötigt.
9. Nun diesen Adapter in ioBroker installieren.
10. Auf der Einstellungsseite des Adapters den Identifier und das Secret eingeben.
11. Die Sprache und alle anderen Einstellungen auswählen und einstellen.
12. Speichern und Schliessen klicken.

Jedes Gerät verfügt über ein Objekt im Objektbaum namens "setData". Dort kann ein JSON-Objekt der Form

```json
{
    "12345": "42",
    "23456": "1"
}
```

in das Objekt eingetragen werden. Dies ermöglicht es, mehrere Datenpunkte gleichzeitig an die API zu senden und zu ändern.
Es kann auch verwendet werden, um Datenpunkte zu ändern, die nicht von der API gesendet werden.

## Arbeitsweise des Adapters

Der Adapter holt von der myuplink-API aller x Minuten (je nach Einstellung) die Liste der Systeme und Geräte. Anschließend
holt er für jedes Gerät die vorhandenen Parameter und speichert sie im Objektbaum. Wenn myUplink dabei neue Parameter sendet,
dann werden diese automatisch dem Objektbaum hinzugefügt.

Der Adapter löscht generell keine Objekt, damit es nicht zu Datenverlust kommt, falls myUplink mal einen Parameter nicht mit sendet.

Der Adapter hat auch keinen Einfluss darauf, welche Parameter von myUplink gesendet werden.

## Changelog

### **WORK IN PROGRESS**

-   Do not send empty objects (setData)
-   The initial refresh interval was set to 5 minutes
-   The code has been restructured internally
-   At least Node.js 18 is required!
-   Dependencies have been updated

### 0.7.1 (2024-02-10)

-   Crash after 'unhandled promise rejection' fixed #15

### 0.7.0 (2024-02-04)

-   Forbidden characters are removed from the category
-   An error when setting data has been fixed
-   Performance has been improved

### 0.6.1 (2024-02-03)

-   Performance has been improved
-   Dependencies have been updated

### 0.6.0 (2024-01-28)

-   The setData object has been added

### 0.5.0 (2024-01-14)

-   Parameter IDs and categories have been added for a few heat pumps

### 0.4.1 (2024-01-13)

-   In object IDs, all characters that are not officially supported are now replaced by an underscore
-   The roles of the data objects have been improved
-   The logging of token data (in log level silly) has been removed
-   Dependencies have been updated

### 0.4.0 (2023-12-31)

-   New options for renaming IDs have been added #5
-   Options are deactivated if checkboxes are not checked

### 0.3.0 (2023-12-29)

-   Support for setting parameter values has been added (must be paid for at myuplink.com) #4
-   Authorization Code Grant Flow settings have been moved to new Extended tab
-   Password control will be used for Secret and Auth Code

### 0.2.1 (2023-12-28)

-   All responsive sizes have been added to jsonConfig
-   More error logging have been added

### 0.2.0 (2023-12-28)

-   Settings page have been changed from materialize to jsonConfig
-   Dependencies have been updated

### 0.1.0 (2023-12-25)

-   Initial release

## License

MIT License

Copyright (c) 2024 Sebastian Häßelbarth <seb@sebmail.de>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
