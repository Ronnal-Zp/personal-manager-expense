export interface PageQuery {
    page: number
    limit: number
    sortBy?: string
    direction?: 'ASC' | 'DESC'
}