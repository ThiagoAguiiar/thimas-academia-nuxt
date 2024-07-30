export interface ISidebarLinks {
  key: string;
  name: string;
  icon?: string;
  baseURL: string;
  subLinks: ISidebarSubLinks[];
}

export interface ISidebarSubLinks {
  name: string;
  icon: string;
  url: string;
  counter: number;
}

export interface ICmdPalette {
  label: string;
  key: string;
  commands: ICommands[];
}

export interface ICommands {
  id: number | string;
  label: string;
  href: string;
}
