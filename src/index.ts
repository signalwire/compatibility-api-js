const twilio = require('../lib')
import { getHost, Reject } from './helpers'
import { Twilio, TwimlInterface, JwtInterface } from '../index'
import { CompatibilityAPIRestClientOptions, RestClient as RC } from '../compatibility-api'

twilio.twiml.FaxResponse.prototype.reject = function (attributes: any) {
  return new Reject(this.response.ele('Reject', attributes))
}

/** @remarks See index.d.ts for types */
const RestClient = function (
  username: string,
  token: string,
  opts?: CompatibilityAPIRestClientOptions
): RC.Twilio {
  const host = getHost(opts)
  // "AC" prefix because twilio-node requires it
  const client = twilio('AC' + username, token, opts)
  // @ts-expect-error - Remove "AC" prefix
  client.username = username
  // @ts-expect-error
  client.accountSid = username
  // @ts-expect-error
  client.password = token

  // @ts-expect-error - Replace base url
  client.api.baseUrl = `https://${host}`

  // @ts-expect-error
  client.fax.baseUrl = `https://${host}`
  // @ts-expect-error
  client.fax.v1._version = `2010-04-01/Accounts/${client.accountSid}`

  return client
}

// Define old properties
const properties = Object.getOwnPropertyNames(twilio)
for (let i = 0; i < properties.length; i++) {
  const newProp = properties[i] === 'twiml' ? 'LaML' : properties[i]
  Object.defineProperty(RestClient, newProp, {
    value: twilio[properties[i]],
  })
}

export { RestClient }

export {
  CompatibilityAPIRestClientOptions,
  Twilio,
  TwimlInterface,
  JwtInterface,
}
