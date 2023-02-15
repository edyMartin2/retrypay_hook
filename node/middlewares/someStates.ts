import RetrypayService from "../services/Retrypay"
import Vtex from "../services/Vtex"

export async function someStates(ctx:StatusChangeContext , next: () => Promiseiany>) {
  const {
    clients: { oms },
  } = ctx
  const body = ctx.body
  const authToken = ctx.vtex.authToken;
  const id = String(body.orderId).split('-')[0]
  const orderInformation_ = await oms.order(body.orderId).then((res: any) => {return res});
  console.log('imformacion de la orden esta aqui ----', orderInformation_)
  //Declaracion de los servicios 
  const retrypayService = new RetrypayService(ctx.vtex.account)
  const vtexService = new Vtex(authToken, ctx.vtex.account);
  //Hacemos una peticion para traer info de la orden
  const orderInformation = await vtexService.getOrder(parseInt(body.orderId)).then(res => { return res })
  //Haremos una peticion a esta url https://api.retrypay.dev/api/v2/webhook/${ctx.vtex.account}/${id}/vtex
  const responseServiceCancel = await retrypayService.cancel(parseInt(id), orderInformation_).then(res => { return res }).catch(e => { return e })

  console.log("respuesta de retrypay ::", responseServiceCancel, orderInformation)
  await next()
}
