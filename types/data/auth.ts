export interface IStorageToken {
  token: string;
  createdAt: string;
}

export interface IAuthDecodeToken {
  exp: number;
  iat: number;
  msg: string;
  msgType: string;
  status: number;
  user: {
    email: string;
    name: string;
    userId: string;
    profileId: string;
    photo: string;
    profileData: {
      description: string;
    };
  };
}
