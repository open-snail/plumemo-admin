import { type } from 'os';
import { PagerQuery, PagerResponse } from '.';

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

export type UsersPagerQuery = PagerQuery<{
  keywords?: string;
}>;

export type Users = {
  // 主键
  id: number;
  // 用户名
  username: string;
  // 用户昵称
  niceName: string;
  // 邮箱
  email: string;
  // 用户网址
  url: string;
  // 创建时间
  createdAt: Number;
  // 更新时间
  updatedDt: Number;
  // 0禁用 1正常
  userStatus: Number;
  // 来前台显示出来的用户名字
  displayName: string;
};

export type UsersPagerResponse = PagerResponse<Users>;

export interface AuthApi {
  login(query: LoginQuery): Promise<LoginResponse>;
  logout(): Promise<true>;
  getLoginUserInfo(): Promise<LoginUserInfo>;
  getList(): Promise<Users[]>;
  getPageList(query: UsersPagerQuery): Promise<UsersPagerResponse>;
  updatePassword(data: any): Promise<void>;
}
