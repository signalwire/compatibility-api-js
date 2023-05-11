import { Twilio, TwimlInterface, JwtInterface } from './index'
import * as webhookTools from './lib/webhooks/webhooks'
import TwilioClient = require('./lib/rest/Twilio')
import RequestClient = require('./lib/base/RequestClient')
import {
  CallListInstance,
  CallInstance,
  CallListInstanceCreateOptions,
} from './lib/rest/api/v2010/account/call'
import VoiceResponseTwilio = require('./lib/twiml/VoiceResponse')
import { AIAttributes, AIPromptAttributes, AIPostPromptAttributes } from './src/types'

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

declare class VoiceResponse extends VoiceResponseTwilio {
  connect(attributes?: VoiceResponseTwilio.ConnectAttributes): VoiceResponse.Connect
}

declare namespace VoiceResponse {
  class Connect extends VoiceResponseTwilio.Connect {
    /**
     * <AI> TwiML Noun
     *
     * @param attributes - TwiML attributes
     */
    ai(attributes?: AIAttributes): VoiceResponse.AI
  }

  class AI {
    /**
     * Add engine attribute
     *
     * @param engine - string
     */
    setEngine(engine: string): void
    /**
     * Add voice attribute
     *
     * @param voice - string
     */
    setVoice(voice: string): void
    /**
     * Add postPromptURL attribute
     *
     * @param postPromptURL - string
     */
    setPostPromptURL(postPromptURL: string): void
    /**
     * Add postPromptAuthUser attribute
     *
     * @param postPromptAuthUser - string
     */
    setPostPromptAuthUser(postPromptAuthUser: string): void
    /**
     * Add postPromptAuthPassword attribute
     *
     * @param postPromptAuthPassword - string
     */
    setPostPromptAuthPassword(postPromptAuthPassword: string): void
    /**
     * Add hints attribute
     *
     * @param hints - string
     */
    setHints(hints: string): void
    /**
     * <Prompt> TwiML Noun
     *
     * @param text - Text in prompt
     */
    prompt(text?: string): VoiceResponse.AIPrompt
    /**
     * <Prompt> TwiML Noun
     *
     * @param attributes - TwiML attributes
     * @param text - Text in prompt
     */
    prompt(attributes?: AIPromptAttributes, text?: string): VoiceResponse.AIPrompt
    /**
     * <PostPrompt> TwiML Noun
     *
     * @param text - Text in post prompt
     */
    postPrompt(text?: string): VoiceResponse.AIPrompt
    /**
     * <PostPrompt> TwiML Noun
     *
     * @param attributes - TwiML attributes
     * @param text - Text in post prompt
     */
    postPrompt(attributes?: AIPostPromptAttributes, text?: string): VoiceResponse.AIPostPrompt
  }

  class AIPrompt {
    /**
     * Add temperature attribute
     *
     * @param temperature - number
     */
    setTemperature(temperature: number): void
    /**
     * Add topP attribute
     *
     * @param topP - number
     */
    setTopP(topP: number): void
    /**
     * Add temperature attribute
     *
     * @param temperature - number
     */
    setTemperature(temperature: number): void
    /**
     * Add confidence attribute
     *
     * @param confidence - number
     */
    setConfidence(confidence: number): void
    /**
     * Add bargeConfidence attribute
     *
     * @param bargeConfidence - number
     */
    setBargeConfidence(bargeConfidence: number): void
    /**
     * Add presencePenalty attribute
     *
     * @param presencePenalty - number
     */
    setPresencePenalty(presencePenalty: number): void
    /**
     * Add frequencyPenalty attribute
     *
     * @param frequencyPenalty - number
     */
    setFrequencyPenalty(frequencyPenalty: number): void
  }

  class AIPostPrompt extends AIPrompt {}
}

interface TwimlConstructor<T> {
  new (): T
}

declare namespace RestClient {
  export interface RestClientLaMLInterface extends TwimlInterface {
    FaxResponse: TwimlConstructor<FaxResponse>
    VoiceResponse: TwimlConstructor<VoiceResponse>
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
