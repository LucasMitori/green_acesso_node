export interface ILoteRequest {
  nome: string;
  gender: "male" | "female" | "other";
  ativo: boolean;
  email: string;
  password: string;
  isAdmin?: boolean;
}

export interface ILoteUpdate {
  nome: string;
  gender: "male" | "female" | "other";
  ativo: boolean;
  email: string;
  password: string;
  isAdmin?: boolean;
}

export interface ILoteResponse {
  nome: string;
  gender: "male" | "female" | "other";
  ativo: boolean;
  email: string;
  isAdmin?: boolean;
}

export interface ILoteLogin {
  email: string;
  password: string;
}

export interface ILoteLoginResponse {
  token: string;
  user: ILoteResponse;
}

export interface User extends ILoteResponse {
  password: string;
}
