export type IUserProfile = "administrador" | "aluno" | "professor";

export interface IGetProfile {
  createdAt: Date;
  description: IUserProfile;
  profileId: string;
}
