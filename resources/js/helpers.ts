import { TAuthUser } from "./types";

export const can = (user: TAuthUser, permission: string) => {
  return user.permissions.includes(permission);
};

export const hasRole = (user: TAuthUser, role: string) => {
  return user.roles.includes(role);
};
