import { CommonApi } from './instance'
import { PAYMENT_API } from '@app/config/common'

class PaymentApi extends CommonApi {
  constructor() {
    super()
    this.apiName = PAYMENT_API
  }
}

export { PaymentApi }
