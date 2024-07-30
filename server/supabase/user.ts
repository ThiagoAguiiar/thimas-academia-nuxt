import { IPutUser } from "~/types/data/user";
import { createInstance } from "./config";

import useFile from "../utils/useFile";

const supabase = createInstance();

enum Profiles {
  professor = "",
  aluno = "e5c54268-e288-4d66-b8ca-c50a4ce047ef",
  administrator = "d1f09fe2-5743-4a1d-b6af-d6898fce0195",
}

const QUERY = `name, email, password, profileId, userId, phoneNumber, cpf, photo, active, lastLogin, birthDate, active, profiles:profileId (description)`;

export const getUserByEmail = async (email: string) => {
  const { data, error } = await supabase
    .from("users")
    .select(QUERY)
    .eq("email", email)
    .single();

  if (error) throw new Error(error.message);

  return { ...data };
};

export const getAllUsers = async () => {
  const { data, error } = await supabase.from("users").select(QUERY);

  if (error) throw new Error(error.message);

  return data;
};

export const getUserByProfile = async (profile: keyof typeof Profiles) => {
  const { data, error } = await supabase
    .from("users")
    .select(QUERY)
    .eq("profileId", Profiles[profile]);

  if (error) throw new Error(error.message);

  return data;
};

export const updateUser = async (user: IPutUser) => {
  const updateData: any = {
    name: user.name,
    email: user.email,
    phoneNumber: user.phoneNumber,
    cpf: user.cpf,
    photo: user.photo,
    profileId: user.profileId,
  };

  if (user.newPassword.length > 0) updateData.password = user.newPassword;

  if (user.photo && user.photo.includes("data:image")) {
    const file = useFile();

    const { buffer, mimeType, createURL } = file.convertBase64StringToFile(
      user.photo,
    );
    const fileName =
      user.name.replaceAll(" ", "-").toLowerCase() + ":" + user.profileId;

    await supabase.storage.from("user-photo").upload(fileName, buffer, {
      contentType: mimeType,
      upsert: true,
      cacheControl: "0",
    });

    updateData.photo = createURL(fileName);
  }

  const { data, error } = await supabase
    .from("users")
    .update(updateData)
    .eq("userId", user.userId);

  if (error) throw new Error(error.message);

  return data;
};

export const deleteUser = async (id: string) => {
  const { data, error } = await supabase
    .from("users")
    .delete()
    .eq("userId", id);

  if (error) throw new Error(error.message);

  return data;
};
