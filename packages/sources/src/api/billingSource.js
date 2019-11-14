import { axiosInstance } from './index';
import { COST_MANAGEMENT_API_BASE } from './constants';

export const postBillingSource = (data, timeout = 10000, interval = 1000) => new Promise((resolve, reject) => {
    const start = Date.now();

    const postBillingSourceInner = () => axiosInstance
    .post(`${COST_MANAGEMENT_API_BASE}/sources/billing_source/`, data)
    .then(({ data }) => resolve(data))
    .catch((error) => (Date.now() - start) >= timeout ?
        reject(`Billing source timeouted ${JSON.stringify(error)}`) :
        setTimeout(() => postBillingSourceInner(data), interval)
    );

    return postBillingSourceInner(data);
});