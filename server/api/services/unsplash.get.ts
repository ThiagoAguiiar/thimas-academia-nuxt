export default defineEventHandler(async (event): Promise<any> => {
  const { query, page, orientation, pageCount } = getQuery(event);

  const runtime = useRuntimeConfig();
  let url: string = "/photos";

  if (query && query.toString().length > 0) url = "/search/photos";

  const response = await $fetch<any>(url, {
    method: "GET",
    baseURL: runtime.public.unsplashURL,
    params: {
      client_id: runtime.public.unsplashAccessKey,
      per_page: pageCount,
      query: query,
      page: page,
      orientation: orientation,
    },
  });

  return response;
});
