import { environment } from "src/environments/environment";

export const ROUTE = {
    AUTH: {
        LOGIN: environment.backendUrl + '/auth/login',
        REGISTRATE: environment.backendUrl + '/auth/registrate'
    },
    ORDER: {
        ORDER: environment.backendUrl + '/order',
        GET_ALL: environment.backendUrl + '/order',
        UPDATE_STATUS: environment.backendUrl + '/order/status',
        GET_ALL_BY_CURRENT_USER: environment.backendUrl + '/order/customer?id='
    },
    PRODUCT: {
        ADD: environment.backendUrl + '/product',
        GET_ALL: environment.backendUrl + '/product',
        GET_BY_ID: environment.backendUrl + '/product/id?id=',
        SEARCH: environment.backendUrl + '/product/search?search=',
        DELETE: environment.backendUrl + '/product',
        EDIT: environment.backendUrl + '/product'
    },
    USER: {
        GET_BY_ID: environment.backendUrl + '/user/user?id=',
        GET_ALL: environment.backendUrl + '/user',
        ADD: environment.backendUrl + '/user',
        EDIT: environment.backendUrl + '/user'
    }
}