export enum MsgType {
  ERROR = "error",
  SUCCESS = "success",
  INFO = "info",
  WARNING = "warning",
  DEFAULT = "default",
}

export enum Status {
  NOTFOUND = 404,
  SUCCESS = 200,
  ERROR = 500,
}

export interface IResponse {
  data?: any;
  error?: any;
  status: number;
  msgType: MsgType | keyof typeof MsgType;
  msg: string | null;
}

export interface ICResponse<T> {
  data?: T | null;
  error?: any;
  status: number;
  msgType: MsgType | keyof typeof MsgType;
  msg: string | null;
}

export interface IIAResponse {
  value: string;
  createdAt: string;
}
