export interface DataItem
{
    id: number,
    name: string,
    description:string,
    country: string,
    climate: string,
    currency: string,
    latitude: number,
    longitude: number,
    [key: string]: any
}
