const twilio = require('../lib')
import TwiML from '../lib/twiml/TwiML'
import { AIPostPromptAttributes, AIPromptAttributes } from './types'

function Reject(reject: any) {
  this.reject = reject
  this._propertyName = 'reject'
}
Reject.prototype = Object.create(twilio.twiml.FaxResponse.prototype)
Reject.prototype.constructor = 'Reject'

function AI(aiElement: Element) {
  this.ai = aiElement
  this._propertyName = 'ai'

  this.setEngine = (engine: string) => {
    this.ai.att('engine', engine)
  }

  this.setVoice = (voice: string) => {
    this.ai.att('voice', voice)
  }

  this.setPostPromptURL = (postPromptURL: string) => {
    this.ai.att('postPromptURL', postPromptURL)
  }

  this.setPostPromptAuthUser = (postPromptAuthUser: string) => {
    this.ai.att('postPromptAuthUser', postPromptAuthUser)
  }

  this.setPostPromptAuthPassword = (postPromptAuthPassword: string) => {
    this.ai.att('postPromptAuthPassword', postPromptAuthPassword)
  }

  this.setHints = (hints: string) => {
    this.ai.att('hints', hints)
  }

  this.prompt = (text?: string) => {
    const promptElement = this.ai.ele('Prompt', text)
    const promptInstance = new Prompt(promptElement)
    return promptInstance
  }

  this.prompt = (attributes?: AIPromptAttributes, text?: string) => {
    const promptElement = this.ai.ele('Prompt', attributes, text)
    const promptInstance = new Prompt(promptElement)
    return promptInstance
  }

  this.postPrompt = (text: string) => {
    const postPromptElement = this.ai.ele('PostPrompt', text)
    const postPromptInstance = new PostPrompt(postPromptElement)
    return postPromptInstance
  }

  this.postPrompt = (attributes: AIPostPromptAttributes, text?: string) => {
    const postPromptElement = this.ai.ele('PostPrompt', attributes, text)
    const postPromptInstance = new PostPrompt(postPromptElement)
    return postPromptInstance
  }
}
AI.prototype = Object.create(TwiML.prototype)
AI.prototype.constructor = AI

function Prompt(promptElement: Element) {
  this.prompt = promptElement
  this._propertyName = 'prompt'

  this.setTemperature = (temperature: number) => {
    return this.prompt.att('temperature', temperature)
  }

  this.setTopP = (topP: number) => {
    return this.topP.att('topP', topP)
  }

  this.setConfidence = (confidence: number) => {
    return this.confidence.att('confidence', confidence)
  }

  this.setBargeConfidence = (bargeConfidence: number) => {
    return this.bargeConfidence.att('bargeConfidence', bargeConfidence)
  }

  this.setPresencePenalty = (presencePenalty: number) => {
    return this.presencePenalty.att('presencePenalty', presencePenalty)
  }

  this.setFrequencyPenalty = (frequencyPenalty: number) => {
    return this.frequencyPenalty.att('frequencyPenalty', frequencyPenalty)
  }
}
Prompt.prototype = Object.create(TwiML.prototype)
Prompt.prototype.constructor = Prompt

function PostPrompt(postPromptElement: Element) {
  Prompt.call(this, postPromptElement)
  this._propertyName = 'postPrompt'
}
PostPrompt.prototype = Object.create(TwiML.prototype)
PostPrompt.prototype.constructor = PostPrompt

const getHost = (opts: { signalwireSpaceUrl?: string } = {}): string => {
  const { signalwireSpaceUrl } = opts
  if (signalwireSpaceUrl) {
    return signalwireSpaceUrl
  }
  const { SIGNALWIRE_SPACE_URL, SIGNALWIRE_API_HOSTNAME } = process.env
  if (SIGNALWIRE_SPACE_URL) {
    return SIGNALWIRE_SPACE_URL
  }
  if (SIGNALWIRE_API_HOSTNAME) {
    return SIGNALWIRE_API_HOSTNAME
  }
  throw new Error(
    'SignalWire Space URL is not configured.\nEnter your SignalWire Space domain via the SIGNALWIRE_SPACE_URL or SIGNALWIRE_API_HOSTNAME environment variables, or specifying the property "signalwireSpaceUrl" in the init options.',
  )
}

export { getHost, Reject, AI }
