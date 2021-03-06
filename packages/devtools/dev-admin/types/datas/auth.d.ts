export type LoginQuery = {
  userName: string;
  password: string;
};

export type LoginResponse = {
  token: string;
};

export enum Role {
  Admin,
  User,
}

export type LoginUserInfo = {
  name: string;
  avatar?: string;
  email?: string;
  roles: Role[];
};

export interface AuthApi {
  login(query: LoginQuery): Promise<LoginResponse>;
  logout(): Promise<true>;
  getLoginUserInfo(): Promise<LoginUserInfo>;
}
