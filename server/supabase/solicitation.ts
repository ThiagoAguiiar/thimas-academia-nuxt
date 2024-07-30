import { IGetSolicitation, IPostSolicitation, IPutSolicitation } from "~/types/data/solicitation";
import { createInstance } from "./config";

const supabase = createInstance();

export const createSolicitation = async (solicitation: IPostSolicitation) => {
  const { data, error } = await supabase
    .from("solicitations")
    .insert(solicitation);

  if (error) throw new Error(error.message);

  return data;
};

export const getSolicitation = async (email: string, token: string) => {
  const { data, error } = await supabase
    .from("solicitations")
    .select("*")
    .eq("email", email)
    .eq("token", token)
    .order("createdAt", { ascending: false })
    .limit(1);

  if (error) throw new Error(error.message);

  return data[0] as IGetSolicitation;
};

export const updateSolicitation = async(obj: IPutSolicitation) => {
  const { data, error } = await supabase
    .from("solicitations")
    .update(obj)
    .eq("email", obj.email)
    .eq("token", obj.token);

  if (error) throw new Error(error.message);

  return data;
}