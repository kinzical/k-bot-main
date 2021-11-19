import axios from "axios";

export class HttpApiService {
  API_URL = process.env.REACT_APP_API_URL;
  FILE_UPLOAD_API_URL = process.env.REACT_APP_FILE_UPLOAD_URL;

  public handleError(error: any) {
    const { message } = error;
    return message;
  }

  public getHeaders() {
    return {
      withCredentials: false,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };
  }

  public getFormHeaders() {
    return {
      withCredentials: false,
      headers: {
        // "Accept": "application/json",
        "Content-Type": "multipart/form-data",
      },
    };
  }

  public get(path: string, header = this.getHeaders()) {
    return new Promise((resolve, reject) => {
      axios
        .get(`${this.API_URL}${path}`, header)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(this.handleError(error));
        });
    });
  }

  public postFormData(path: string, data: any) {
    return new Promise((resolve, reject) => {
      axios
        .post(`${this.FILE_UPLOAD_API_URL}${path}`, data, this.getFormHeaders())
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(this.handleError(error));
        });
    });
  }

  public post(path: string, data: any) {
    return new Promise((resolve, reject) => {
      axios
        .post(`${this.API_URL}${path}`, data, this.getHeaders())
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(this.handleError(error));
        });
    });
  }

  public remove(path: string, headers = this.getHeaders()) {
    return new Promise((resolve, reject) => {
      axios
        .delete(`${this.API_URL}${path}`, headers)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(this.handleError(error));
        });
    });
  }
}

export const httpApiService = new HttpApiService();
