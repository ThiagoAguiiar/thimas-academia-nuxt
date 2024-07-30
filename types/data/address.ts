export interface IGetAddress {
  addressId: string;
  userId: string;

  address: string;
  state: string;
  city: string;
  CEP: string;
  number: string;
}

export interface IPostAddress {
  state: string;
  city: string;
  CEP: string;
  number: string;
  address: string;
}

export interface IViacCEPAddress {
  cep: string;
  logradouro: string;
  complemento: string;
  unidade: string;
  bairro: string;
  localidade: string;
  uf: string;
  ibge: string;
  gia: string;
  ddd: string;
  siafi: string;
}
