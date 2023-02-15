import axios, { AxiosError, AxiosRequestConfig } from "axios";
/**
 * Comunicacion con la api de vtex 
 * 
 */
class Vtex {
    authToken: string
    env: string
    /**
     * @param authToken token de la tienda
     * @param env numbre de la tienda
     */
    constructor(authToken: string, env: string) {
        this.authToken = authToken;
        this.env = env
    }

    /**
     * @param id order Id 
     * @returns Order Information | []
     */
    async getOrder(id: number) {
        var config: AxiosRequestConfig = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `http://${this.env}.vtexcommercestable.com.br/api/oms/pvt/orders/${id}`,
            headers: {
                'Content-Type': 'application/json',
                'VtexIdClientAutCookie': this.authToken,
                'x-vtex-use-https': true
            },
            data: []
        };

        return await axios(config)
            .then(function (response) {
                return response.data
            })
            .catch(function (e:AxiosError) {
                console.log('Mensaje de error de vtex :::', e.message)
                return []
            });

    }
}

export default Vtex;