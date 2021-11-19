import { coreService, CoreService } from "../services/Core.service";

export class CoreFacade {
  private static instance: CoreFacade;
  private _coreService: CoreService;

  constructor() {
    this._coreService = coreService;
  }

  static getInstance() {
    if (!CoreFacade.instance) {
      CoreFacade.instance = new CoreFacade();
    }
    return CoreFacade.instance;
  }

  public getBrowserData() {
    return this._coreService.getBrowserData();
  }

  public getLanguageId = () => {
    return this._coreService.getLanguageId();
  };
}

export const coreFacade = CoreFacade.getInstance();
