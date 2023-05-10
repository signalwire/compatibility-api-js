const twilio = require('../lib')
import TwiML from '../lib/twiml/TwiML'
import { Connect } from '../lib/twiml/VoiceResponse'

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

  this.setVoice = (voice) => {
    this.ai.att('voice', voice)
  }

  this.setPostPromptURL = (postPromptURL) => {
    this.ai.att('postPromptURL', postPromptURL)
  }

  this.setPostPromptAuthUser = (postPromptAuthUser) => {
    this.ai.att('postPromptAuthUser', postPromptAuthUser)
  }

  this.setPostPromptAuthPassword = (postPromptAuthPassword) => {
    this.ai.att('postPromptAuthPassword', postPromptAuthPassword)
  }

  this.setHints = (hints) => {
    this.ai.att('hints', hints)
  }

  this.prompt = (text: string) => {
    const promptElement = this.ai.ele('Prompt', text)
    const promptInstance = new Prompt(promptElement)
    return promptInstance
  }

  this.postPrompt = (text: string) => {
    const postPromptElement = this.ai.ele('PostPrompt', text)
    const postPromptInstance = new PostPrompt(postPromptElement)
    return postPromptInstance
  }
}
AI.prototype = Object.create(TwiML.prototype);
AI.prototype.constructor = AI;

function Prompt(promptElement: Element) {
  this.prompt = promptElement
  this._propertyName = 'prompt'

  this.setTemperature = (temperature) => {
    return this.prompt.att('temperature', temperature)
  }

  this.setTopP = (topP) => {
    return this.topP.att('topP', topP)
  }

  this.setConfidence = (confidence) => {
    return this.confidence.att('confidence', confidence)
  }

  this.setBargeConfidence = (bargeConfidence) => {
    return this.bargeConfidence.att('bargeConfidence', bargeConfidence)
  }

  this.setPresencePenalty = (presencePenalty) => {
    return this.presencePenalty.att('presencePenalty', presencePenalty)
  }

  this.setFrequencyPenalty = (frequencyPenalty) => {
    return this.frequencyPenalty.att('frequencyPenalty', frequencyPenalty)
  }
}
Prompt.prototype = Object.create(TwiML.prototype);
Prompt.prototype.constructor = Prompt;

function PostPrompt(postPromptElement: Element) {
  Prompt.call(this, postPromptElement);
  this._propertyName = 'postPrompt';
}
PostPrompt.prototype = Object.create(TwiML.prototype);
PostPrompt.prototype.constructor = PostPrompt;

export interface ExtendedConnect extends Connect {
  ai(attributes?: any): void;
}

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
