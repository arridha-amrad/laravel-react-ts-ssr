import { Config } from "ziggy-js";

export type TUser = {
  id: number;
  name: string;
  email: string;
};

export type TAuthUser = TUser & {
  createdAt: Date;
  emailVerifiedAt: Date;
  roles: string[];
  permissions: string[];
};

export type TComment = {
  id: number;
  comment: string;
  createdAt: Date;
  user: TUser;
};

export type TFeature = {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  user: TUser;
  upvoteCount: number;
  userHasUpVoted: boolean;
  userHasDownVoted: boolean;
  totalVoters: number;
  comments: TComment[];
};

export type TPaginatedLink = {
  active: boolean;
  label: string;
  url: string | null;
};

export type TPaginated<T> = {
  data: T[];
  links: {
    first: string;
    last: string;
    next: string | null;
    prev: string | null;
  };
  meta: {
    current_page: number;
    from: number;
    last_page: number;
    path: string;
    per_page: number;
    to: number;
    total: number;
    links: TPaginatedLink[];
  };
};

export type PageProps<
  T extends Record<string, unknown> = Record<string, unknown>
> = T & {
  auth: {
    user: TAuthUser;
  };
  flashSuccess: {
    message?: string;
  };
  ziggy: Config & { location: string };
};
