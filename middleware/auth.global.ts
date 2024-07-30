export default defineNuxtRouteMiddleware(async (to) => {
  const auth = useAuth();

  const allowedRoutes = ["/"];

  if (
    !(await auth.isAuthenticated()) &&
    to.path !== "/auth/login" &&
    !allowedRoutes.includes(to.path)
  ) {
    return await navigateTo("/auth/login");
  }

  if ((await auth.isAuthenticated()) && to.path === "/auth/login") {
    return await navigateTo("/admin");
  }

  if (to.path === "/confirm" && (!to.query.email || !to.query.token)) {
    return await navigateTo("/");
  }
});
