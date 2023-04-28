import * as util from './lib/jwt/taskrouter/util';
import * as FaxResponse from './lib/twiml/FaxResponse';
import * as MessagingResponse from './lib/twiml/MessagingResponse';
import * as VoiceResponse from './lib/twiml/VoiceResponse';
import * as webhookTools from './lib/webhooks/webhooks';
import {
  CallListInstance,
  CallInstance,
  CallListInstanceCreateOptions,
} from './lib/rest/api/v2010/account/call'

import TwilioClient = require('./lib/rest/Twilio');
import AccessToken = require('./lib/jwt/AccessToken');
import ClientCapability = require('./lib/jwt/ClientCapability');
import TaskRouterCapability = require('./lib/jwt/taskrouter/TaskRouterCapability');
import RequestClient = require('./lib/base/RequestClient');

interface TwimlConstructor<T> {
  new (): T;
}

export interface CompatibilityAPIRestClientOptions
  extends TwilioClient.TwilioClientOptions {
  signalwireSpaceUrl?: string
}


// declare function twilio(
//   accountSid?: string,
//   authToken?: string,
//   opts?: TwilioClient.TwilioClientOptions
// ): TwilioClient;

// declare namespace twilio {
//   export import Twilio = TwilioClient;
//   export interface TwimlInterface {
//     VoiceResponse: TwimlConstructor<VoiceResponse>;
//     FaxResponse: TwimlConstructor<FaxResponse>;
//     MessagingResponse: TwimlConstructor<MessagingResponse>;
//   }
//   export interface JwtInterface {
//     AccessToken: typeof AccessToken;
//     ClientCapability: typeof ClientCapability;
//     taskrouter: {
//       TaskRouterCapability: typeof TaskRouterCapability;
//       util: typeof util;
//     };
//   }
//   export const jwt: JwtInterface;
//   export const twiml: TwimlInterface;
//   export const RequestClient: RequestClient;
//   export const validateRequest: typeof webhookTools.validateRequest;
//   export const validateRequestWithBody: typeof webhookTools.validateRequestWithBody;
//   export const validateExpressRequest: typeof webhookTools.validateExpressRequest;
//   export const webhook: typeof webhookTools.webhook;
// }

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

declare class CompatibilityApi extends TwilioClient {
  calls: CompatibilityApiCallListInstance
}

// declare class FaxResponse {
//   constructor()
//   receive(attributes?: FaxResponse.ReceiveAttributes): void
//   toString(): string
//   reject(): void
// }

// declare namespace FaxResponse {
//   type ReceiveMediaType = 'application/pdf' | 'image/tiff'
//   type ReceivePageSize = 'letter' | 'legal' | 'a4'
//   export interface ReceiveAttributes {
//     action?: string
//     mediaType?: ReceiveMediaType
//     method?: string
//     pageSize?: ReceivePageSize
//     storeMedia?: boolean
//   }
// }

interface TwimlConstructor<T> {
  new (): T
}

declare namespace RestClient {
  export interface RestClientLaMLInterface extends TwimlInterface {
    FaxResponse: TwimlConstructor<FaxResponse>
  }

  export import Twilio = TwilioClient
  export interface TwimlInterface {
    VoiceResponse: TwimlConstructor<VoiceResponse>;
    FaxResponse: TwimlConstructor<FaxResponse>;
    MessagingResponse: TwimlConstructor<MessagingResponse>;
  }
  export interface JwtInterface {
    AccessToken: typeof AccessToken;
    ClientCapability: typeof ClientCapability;
    taskrouter: {
      TaskRouterCapability: typeof TaskRouterCapability;
      util: typeof util;
    };
  }
  export const jwt: JwtInterface
  export const RequestClient: RequestClient
  export const validateRequest: typeof webhookTools.validateRequest
  export const validateRequestWithBody: typeof webhookTools.validateRequestWithBody
  export const validateExpressRequest: typeof webhookTools.validateExpressRequest
  export const webhook: typeof webhookTools.webhook
  export const LaML: RestClientLaMLInterface
}

export { RestClient }

// export = RestClient;
