export type TFilter = {
  [key: string]: any;
};


export type TPaginationResults<T> = {
    list: T[];
    pagination: {
        total_record: number;
        page: number;
        pages: number;
    }
}