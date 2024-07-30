export default defineStore("useStateCity", () => {
  const city = ref("");
  const state = ref("");

  const getState = async () => {
    const response = await $fetch<IStateData[]>(
      "https://servicodados.ibge.gov.br/api/v1/localidades/estados",
    );

    const aux: IOptions[] = response.map(({ nome, id }) => ({
      label: nome,
      value: id.toString(),
    }));

    return aux;
  };

  const getCity = async () => {
    const response = await $fetch<ICityData[]>(
      `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${state.value}/municipios`,
    );

    const aux: IOptions[] = response.map(({ nome, id }) => ({
      label: nome,
      value: id.toString(),
    }));

    return aux;
  };

  const getStateIdByName = async (name: string) => {
    const response = await $fetch<IStateData[]>(
      "https://servicodados.ibge.gov.br/api/v1/localidades/estados",
    );

    const state = response.find((state) => state.sigla === name);
    
    return state!.id.toString();
  };

  const getCityIdByName = async (name: string) => {
    const response = await $fetch<ICityData[]>(
      `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${state.value}/municipios`,
    );

    const city = response.find((city) => city.nome === name);

    return city!.id.toString();
  };

  const getAddress = async (cep: string) => {
    const response = await $fetch<IViacCEPAddress>(
      `https://viacep.com.br/ws/${cep.replace("-", "")}/json/`,
    );

    return {
      address: response.logradouro,
      city: response.localidade,
      state: response.uf,
      CEP: response.cep,
    };
  };

  return { getState, getCity, getStateIdByName, getCityIdByName, getAddress, state, city };
});
