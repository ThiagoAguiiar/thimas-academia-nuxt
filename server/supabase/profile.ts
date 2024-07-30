import { IGetProfile } from "~/types/data/profile";
import { createInstance } from "./config";

const supabase = createInstance();

export const getAllProfiles = async () => {
  const { data, error } = await supabase.from("profiles").select("*");

  if (error) throw new Error(error.message);

  return data as IGetProfile[];
};
