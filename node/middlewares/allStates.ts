export async function allStates(
  ctx: StatusChangeContext,
  next: () => Promise<any>
) {
  // const body = ctx.body
  const body = ctx.body
  const {
    clients: { oms },
  } = ctx
  const orderInformation_ = await oms.order(body.orderId).then((res: any) => {return res});
  console.log('informacion de la orden --->', orderInformation_)
  await next()
}
