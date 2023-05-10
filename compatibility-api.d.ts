import { Twilio, TwimlInterface, JwtInterface } from './index'
import * as webhookTools from './lib/webhooks/webhooks'
import TwilioClient = require('./lib/rest/Twilio')
import RequestClient = require('./lib/base/RequestClient')
import {
  CallListInstance,
  CallInstance,
  CallListInstanceCreateOptions,
} from './lib/rest/api/v2010/account/call'

export interface CompatibilityAPIRestClientOptions
  extends Twilio.TwilioClientOptions {
  signalwireSpaceUrl?: string
}

declare function RestClient(
  username: string,
  token: string,
  opts?: CompatibilityAPIRestClientOptions
): CompatibilityApi

interface CompatibilityApiCallListInstanceCreateOptions
  extends CallListInstanceCreateOptions {
  machineWordsThreshold?: number
  maxPricePerMinute?: number
}

interface CompatibilityApiCallListInstance extends CallListInstance {
  create(
    opts: CompatibilityApiCallListInstanceCreateOptions,
    callback?: (error: Error | null, item: CallInstance) => any
  ): Promise<CallInstance>
}

declare class CompatibilityApi extends Twilio {
  calls: CompatibilityApiCallListInstance
}

declare class FaxResponse {
  constructor()
  receive(attributes?: FaxResponse.ReceiveAttributes): void
  toString(): string
  reject(): void
}

declare namespace FaxResponse {
  type ReceiveMediaType = 'application/pdf' | 'image/tiff'
  type ReceivePageSize = 'letter' | 'legal' | 'a4'
  export interface ReceiveAttributes {
    action?: string
    mediaType?: ReceiveMediaType
    method?: string
    pageSize?: ReceivePageSize
    storeMedia?: boolean
  }
}

interface TwimlConstructor<T> {
  new (): T
}

declare namespace RestClient {
  export interface RestClientLaMLInterface extends TwimlInterface {
    FaxResponse: TwimlConstructor<FaxResponse>
  }

  export import Twilio = TwilioClient
  export const jwt: JwtInterface
  export const RequestClient: RequestClient
  export const validateRequest: typeof webhookTools.validateRequest
  export const validateRequestWithBody: typeof webhookTools.validateRequestWithBody
  export const validateExpressRequest: typeof webhookTools.validateExpressRequest
  export const webhook: typeof webhookTools.webhook
  export const LaML: RestClientLaMLInterface
}

export { RestClient }
