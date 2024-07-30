export default defineStore("useUser", () => {
  const auth = useAuth();

  const getUserLogged = async () => {
    try {
      const { data } = await auth.getDecodedToken();

      if (data) {
        const email = data.user.email;
        const response = await $fetch<ICResponse<IGetUser>>(
          `/api/user/${email}`,
        );
        return response.data;
      }
    } catch (err) {
      return null;
    }
  };

  const putUser = async (user: IPutUser) => {
    try {
      const response = await $fetch<ICResponse<any>>("/api/user/put", {
        method: "PUT",
        body: { ...user },
      });

      return response;
    } catch (err) {
      return null;
    }
  };

  const getAdmins = async () => {
    try {
      const response = await $fetch<ICResponse<IGetUser[]>>("/api/user/admin");
      return response;
    } catch (err) {
      return null;
    }
  };

  const deleteUser = async (userId: string) => {
    try {
      const response = await $fetch<ICResponse<null>>("/api/user/delete", {
        method: "DELETE",
        body: { userId },
      });

      return response;
    } catch (err) {
      return null;
    }
  };

  const inviteUser = async (email: string) => {
    try {
      const response = await $fetch<ICResponse<null>>(
        "/api/user/solicitation",
        {
          params: { email: email },
        },
      );

      console.log(response);

      return response;
    } catch (err) {
      return null;
    }
  };

  const verifySolicitation = async (email: string, token: string) => {
    try {
      const response = await $fetch<ICResponse<any>>("/api/solicitation/verify", {
        params: { email, token },
      });

      return response;
    } catch (err) {
      return null;
    }
  };

  return {
    getUserLogged,
    putUser,
    getAdmins,
    deleteUser,
    inviteUser,
    verifySolicitation,
  };
});
