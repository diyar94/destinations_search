import request, {RequestOptionsWithResponse} from 'umi-request';
export const apiUrl = '/api/places';
export const apiGet = (apiUrl: string, options?: RequestOptionsWithResponse) => request.get(apiUrl, options);

export const apiPost = (apiUrl: string, options?: RequestOptionsWithResponse) => request.post(apiUrl, options);

export const apiPut = (apiUrl: string, options?: RequestOptionsWithResponse) => request.put(apiUrl, options);

export const apiDelete = (apiUrl: string, options?: RequestOptionsWithResponse) => request.delete(apiUrl, options);
