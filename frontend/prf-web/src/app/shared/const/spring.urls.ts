import { environment } from "src/environments/environment";

export const SPRING_ROUTE = {
    TRANSACTION: {
        GET_ALL: environment.springUrl + '/transactions/getall',
        ADD: environment.springUrl + '/transactions/add',
        COMPLETE: environment.springUrl + '/transactions/complete?id='
    },
    PRODUCT: {
        ADD: environment.springUrl + '/products/add',
        GET_ALL: environment.springUrl + '/products/getall',
        GET_BY_ID: environment.springUrl + '/products/byid?id=',
        DELETE: environment.springUrl + '/products/deletebyid?id=',
        UPDATE: environment.springUrl + '/products/update',
    },
}