import bcrypt from "bcrypt";

export const hashPassword = (passsword: string): string => {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(passsword, salt);

  return hash;
};

export const comparePassword = (hashPassword: string, password: string): boolean => {
  return bcrypt.compareSync(password, hashPassword);
};
