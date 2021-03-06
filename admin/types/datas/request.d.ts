export type PagerQuery<T extends Record<string, any>> = {
  page?: number;
  size?: number;
} & T;

export type PagerInfo = {
  page: number;
  size: number;
  total: number;
};

export type PagerResponse<T extends Record<string, any>> = {
  rows: T[];
  pager: PagerInfo;
};

export type ListResponse<T extends Record<string, any>> = {
  rows: T[];
};
