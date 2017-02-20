# Live streaming sports feed with NodeJS (Express), Socket.IO & MongoDB #

## How fast can be NodeJS and MongoDB? ##

That's answer I was looking for when decided to implement this solution with NodeJS and some open source technologies.

[Original concept is from another project I've done on top of .Net Framework - Web Api 2, SignalR and EF 6](https://github.com/ilkerkarimanov/UP.VitalBet)

### Summary ###
Solution shows how to implement high performance live streaming of sports events feed:

1. VitalBet endpoint exposes enormous cluster of data for different sports -> events -> matches -> bets -> odds (80k average).
2. By consuming VitalBet feed all data is transformed in proper data models & persisted in document-oriented db - MongoDB.
3. Express framework is used to fire up NodeJS server and lightweight http services.
4. Socket.IO is used as equivalent of SignarR for establishing duplex channel for client-server communication.
5. MongoDb is used as persistance engine.

### Architecture ###

In a nutshell solution follows Hexagonal Architecture to arrange the application into logical layers, with well-defined responsibilities.

### Prerequisites ###
 - In order to run this sample should install MongoDB () instance and apply necessary changes:

Code snippet:
```Javascript
export class MongoConnection implements IMongoConnection{
    public Host: any = 'localhost';
    public Port: number = 27017;
    public DbName: string = 'vitalbet-Db';
}
```
### Run commands ###
1. npm install
2. gulp scripts
3. npm start
4. Open http://localhost:3000

### Solution ###
Solution | Author(s)
---------|----------
vitalbet | Ilker Karimanov

### Version history ###
Version  | Date | Comments
---------| -----| --------
1.0  | February 2017 | Initial release

### Disclaimer ###
**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**


----------

### Future improvements

- Go from static settings to file-based(probably json).
- Researching for some IoC in NodeJS world.

*PS: Any suggestions will be greatly appreciated*





