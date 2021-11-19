import * as rdd from "react-device-detect";
export class CoreService {
  private static instance: CoreService;
  private _browserData: any;
  private _langugageId = 1;
  publicIp = require("public-ip");

  static getInstance() {
    if (!CoreService.instance) {
      CoreService.instance = new CoreService();
      CoreService.instance.getBroswerDetailForOnce();
      // ... any one time initialization goes here ...
    }
    return CoreService.instance;
  }

  getBroswerDetailForOnce = async () => {
    let browserData = rdd.deviceDetect();
    browserData.ip_address = await this.publicIp.v4();
    this._browserData = browserData;
  };

  public getBrowserData = () => {
    return this._browserData;
  };

  public getLanguageId = () => {
    return this._langugageId;
  };
}

export const coreService = CoreService.getInstance();
