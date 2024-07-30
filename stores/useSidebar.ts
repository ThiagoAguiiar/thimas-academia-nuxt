export default defineStore("useSidebar", () => {
  const isOpen = ref(true);

  const getLinks = async () => {
    const { sidebar } = await queryContent("/sidebar").findOne();
    return sidebar as ISidebarLinks[];
  };

  const getCmdPaletteLinks = async () => {
    const sidebar = await getLinks();
    const links: ICmdPalette[] = [];

    sidebar.forEach(({ name, baseURL, key, subLinks }) => {
      links.push({
        key,
        label: name,
        commands: subLinks.map(({ name, icon, url }) => ({
          id: name,
          label: name,
          href: baseURL + url,
          icon: icon,
        })),
      });
    });

    return links;
  };

  return { getLinks, getCmdPaletteLinks, isOpen };
});
