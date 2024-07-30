import { createInstance } from "./config";

const supabase = createInstance();

export const getPlans = async () => {
  const plan = await supabase.from("plans").select("*");
  return plan.data;
};

export const getPlansById = async (id: string) => {
  const plan = await supabase.from("plans").select("*").eq("planId", id);
  return plan.data;
};
