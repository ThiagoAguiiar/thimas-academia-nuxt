export interface IGetUser {
  name: string;
  email: string;
  password: string;
  phoneNumber: string;
  cpf: string;
  photo: string | null;
  userId: string;
  active: boolean;
  lasLogin: Date | null;
  birthDate: Date | null;
  profileId: string;
}

export interface IPutUser {
  cpf: string;
  email: string;
  name: string;
  phoneNumber: string;
  password: string;
  newPassword: string;
  photo: string | null;
  profileId: string;
  userId: string;
}
