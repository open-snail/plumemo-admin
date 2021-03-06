export type UserInfo = {
  name: string;
  avatar?: string;
  email?: string;
  introduction?: string;
};

export interface UserApi {
  getInfo(): Promise<UserInfo>;
}
