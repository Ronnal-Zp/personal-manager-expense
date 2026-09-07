export interface ResponseListI<T> {
    data: T[];
    meta: MetaI;
}

export interface MetaI {
    limit:      number;
    page:       number;
    totalItems: number;
    totalPages: number;
}