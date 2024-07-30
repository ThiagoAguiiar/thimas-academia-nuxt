export type IPlanAuthorized = "pendente" | "autorizado" | "revogado";

export interface IGetPlan {
  planId: string;
  tag: string;
  name: string;
  createdAt: string;
  monthPrice: string;
  semiAnnualPrice: string;
  authorized: IPlanAuthorized;
}
