export type PaginationDTO<T> = {
  data: T[];
  nextToken?: string;
};
