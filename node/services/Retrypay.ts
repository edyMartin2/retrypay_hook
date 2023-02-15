import axios, { AxiosRequestConfig } from "axios";

/**
 * La clase de Retrypay service se comunica con la api 
 * de retrypay para notificar los estados de la orden
 */
class RetrypayService {
    account: string;

    /**
     * 
     * @param account nombre de la tienda 
     */
    constructor(account: string) {
        this.account = account
    }

    /**
     * 
     * @param id id de la orden sin el guion medio
     * @param body se consigue con la consulta a vtex
     * @returns response data | []
     */

    async cancel(id: number, body: any) {
        var config: AxiosRequestConfig = {
            method: 'post',
            url: `https://api.retrypay.dev/api/v2/webhook/${this.account}/${id}/vtex`,
            data: body
        };

        return await axios(config)
            .then(function (response) {
                return response.data
            })
            .catch(function (error) {
                return error
            });

    }
}


export default RetrypayService;