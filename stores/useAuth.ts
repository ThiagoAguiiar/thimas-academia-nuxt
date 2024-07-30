export default defineStore("useAuth", () => {
  const toast = useToast();

  const getToken = (): string | null => {
    const token = useCookie("_k-thimas").value;
    return token ? token : null;
  };

  const login = async (email: string, password: string) => {
    try {
      const response = await $fetch<ICResponse<string>>("/api/auth/login", {
        method: "POST",
        body: { email, password },
      });

      if (response.status === 200) {
        toast.remove("logout");
        await navigateTo("/admin");
      }

      return {
        error: response.status !== 200 ? response.msg : null,
        data: response.data,
      };
    } catch (err) {
      return {
        error: err,
        data: null,
      };
    }
  };

  const isAuthenticated = async () => {
    try {
      const res = await $fetch<ICResponse<boolean>>("/api/auth/logged", {
        method: "POST",
        body: { token: getToken() },
      });

      return res.data;
    } catch (err) {
      return false;
    }
  };

  const logout = async (): Promise<void> => {
    const response = await $fetch<ICResponse<null>>("/api/auth/logout");
    await navigateTo("/auth/login");

    toast.add({
      title: "Até mais",
      description: response.msg || "Desconectado com sucesso!",
      id: "logout",
    });
  };

  const getDecodedToken = async () => {
    const response = await $fetch<ICResponse<IAuthDecodeToken>>(
      "/api/jwt/decode",
      {
        method: "POST",
        body: { token: getToken() },
      },
    );

    return response;
  };

  return { login, isAuthenticated, logout, getToken, getDecodedToken };
});
