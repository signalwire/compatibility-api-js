/**
 * Options to pass to AI
 *
 * @property engine - The Text-To-Speech engine to use. Default: "gcloud"
 * @property voice - Text-To-Speech voice to use. Default: "en-US-Neural2-J"
 * @property postPromptURL - SignalWire will make a POST request to this URL when the conversation terminates
 * @property postPromptAuthUser - HTTP user to use for the request to postPromptURL
 * @property postPromptAuthPassword - HTTP password to use for the request to postPromptURL
 * @property hints - A list of words and phrases that a caller is likely to say during a call
 */
export interface AIAttributes {
  engine?: string
  voice?: string
  postPromptURL?: string
  postPromptAuthUser?: string
  postPromptAuthPassword?: string
  hints?: string
}

/**
 * Options to pass to AI's prompt
 *
 * @property temperature - What statistical sampling temperature to use, between 0 and 2
 * @property topP - An alternative to sampling with temperature, called nucleus sampling
 * @property confidence - Confidence threshold, between 0 and 1, decreasing this value will reduce the pause after the user speaks
 * @property bargeConfidence - Confidence threshold, between 0 and 1, this only applies when the user is speaking over the AI agent
 * @property presencePenalty - Number between -2.0 and 2.0. Positive values penalize new tokens based on whether they appear in the text so far
 * @property frequencyPenalty - Number between -2.0 and 2.0. Positive values penalize new tokens based on their existing frequency in the text so far
 */
export interface AIPromptAttributes {
  temperature?: number
  topP?: number
  confidence?: number
  bargeConfidence?: number
  presencePenalty?: number
  frequencyPenalty?: number
}

export interface AIPostPromptAttributes extends AIPromptAttributes {}
