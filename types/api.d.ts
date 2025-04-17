export interface IAPIOption {
  method: "GET" | "POST" | "PATCH" | "PUT" | "DELETE";
  data?: any;
  headers?: any;
  withCredentials?: boolean;
}

export interface IResponse<T> {
  data: T;
}