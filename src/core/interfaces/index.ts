export type IUser = {
  roles?: string[];
  username?: string;
};
export type IUserState = {
  user?: IUser;
};
export type ITableData = {
  name: string;
  email: string;
  phone: string;
};
