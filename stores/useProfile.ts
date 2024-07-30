export default defineStore("useProfile", () => {
  const getProfiles = async () => {
    const response = await $fetch<ICResponse<IGetProfile[]>>("/api/profile/get");
    return response;
  };

  return { getProfiles };
});
