
export class WSApiService {

    private constructor() {
        // do something construct...
    }
    private static instance: WSApiService;
    private _socket: any;
    private _socketURL: any;

    static getInstance() {
        if (!WSApiService.instance) {
          WSApiService.instance = new WSApiService();
        }
        return WSApiService.instance;
    }

    public setSocket = (socket: any) => {
        this._socket = socket
    }

    getSocket = (): SocketIOClient.Socket => {
        return this._socket;
    }

    public setSocketURL = (socketURL: string) => {
        this._socketURL = socketURL
    }


}

export const wsApiService = WSApiService.getInstance()