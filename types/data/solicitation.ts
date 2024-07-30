export interface IGetSolicitation {
  createdAt: Date;
  email: string;
  token: string;
  expiresAt: Date;
  isValidate: boolean;
}

export interface IPostSolicitation {
  email: string;
  token: string;
  expiresAt: Date;
}

export interface IPutSolicitation {
  createdAt: Date;
  email: string;
  token: string;
  expiresAt: Date;
  isValidate: boolean;
}