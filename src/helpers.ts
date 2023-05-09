const twilio = require('../lib')
import TwiML from '../lib/twiml/TwiML'

function Reject(reject: any) {
  this.reject = reject
  this._propertyName = 'reject'
}
Reject.prototype = Object.create(twilio.twiml.FaxResponse.prototype)
Reject.prototype.constructor = 'Reject'

function Prompt(prompt) {
  this.prompt = prompt;
  this._propertyName = 'prompt';

  this.setTemperature = (temperature) => {
    return this.temperature = temperature
  }

  this.setTopP = (topP) => {
    return this.topP = topP
  }

  this.setConfidence = (confidence) => {
    return this.confidence = confidence
  }

  this.setBargeConfidence = (bargeConfidence) => {
    return this.bargeConfidence = bargeConfidence
  }

  this.setPresencePenalty = (presencePenalty) => {
    return this.presencePenalty = presencePenalty
  }

  this.setFrequencyPenalty = (frequencyPenalty) => {
    return this.frequencyPenalty = frequencyPenalty
  }
}
Prompt.prototype = Object.create(TwiML.prototype);
Prompt.prototype.constructor = Prompt;

// Creates a new PostPrompt instance that inherits from Prompt
function PostPrompt(prompt) {
  Prompt.call(this, prompt);
  this._propertyName = 'postPrompt';
}
PostPrompt.prototype = Object.create(Prompt.prototype);
PostPrompt.prototype.constructor = PostPrompt;

function AI(ai: any, response) {
  this.ai = ai;
  this._propertyName = 'ai';
  this.response = response;
  
  this.setEngine = (engine) => {
    return this.engine = engine
  }

  this.setVoice = (voice) => {
    return this.voice = voice
  }

  this.setPostPromptURL = (postPromptURL) => {
    return this.postPromptURL = postPromptURL
  }

  this.setPostPromptAuthUser = (postPromptAuthUser) => {
    return this.postPromptAuthUser = postPromptAuthUser
  }

  this.setPostPromptAuthPassword = (postPromptAuthPassword) => {
    return this.postPromptAuthPassword = postPromptAuthPassword
  }

  this.setHints = (hints) => {
    return this.hints = hints
  }

  this.prompt = (value) => {
    return new Prompt(this.response.ele('prompt', value));
  }

  this.postPrompt = (value) => {
    return new PostPrompt(this.response.ele('postPrompt', value));
  }
}
AI.prototype = Object.create(TwiML.prototype);
AI.prototype.constructor = AI;

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
    'SignalWire Space URL is not configured.\nEnter your SignalWire Space domain via the SIGNALWIRE_SPACE_URL or SIGNALWIRE_API_HOSTNAME environment variables, or specifying the property "signalwireSpaceUrl" in the init options.'
  )
}

export { getHost, Reject, AI }
