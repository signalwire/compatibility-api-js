import {IncomingHttpHeaders} from "http2";

interface Request {
  protocol: string;
  header(name: string): string | undefined;
  headers: IncomingHttpHeaders;
  originalUrl: string;
  rawBody?: any;
  body: any;
}

export interface RequestValidatorOptions {
  /**
   * The full URL (with query string) you used to configure the webhook with Twilio - overrides host/protocol options
   */
  url?: string;
  /**
   * Manually specify the host name used by Twilio in a number's webhook config
   */
  host?: string;
  /**
   * Manually specify the protocol used by Twilio in a number's webhook config
   */
  protocol?: string;
}

export interface WebhookOptions {
  /**
   * Whether or not the middleware should validate the request
   * came from Twilio.  Default true. If the request does not originate from
   * Twilio, we will return a text body and a 403.  If there is no configured
   * auth token and validate=true, this is an error condition, so we will return
   * a 500.
   */
  validate?: boolean;
  /**
   * Add helpers to the response object to improve support for XML (TwiML) rendering.  Default true.
   */
  includeHelpers?: boolean;
  /**
   * The full URL (with query string) you used to configure the webhook with Twilio - overrides host/protocol options
   */
  url?: string;
  /**
   * Manually specify the host name used by Twilio in a number's webhook config
   */
  host?: string;
  /**
   * Manually specify the protocol used by Twilio in a number's webhook config
   */
  protocol?: string;
}

/**
 * Utility function to validate an incoming request is indeed from Twilio
 *
 * @param signingKey - The signing key, as seen in the SignalWire portal
 * @param signalWireHeader - The value of the X-Twilio-Signature or X-SignalWire-Signature header from the request
 * @param url - The full URL (with query string) you configured to handle this request
 * @param params - the parameters sent with this request
 */
export function validateRequest(
  signingKey: string,
  signalWireHeader: string,
  url: string,
  params: Record<string, any>
): boolean;


/**
 * Utility function to get the expected signature for a given request
 *
 * @param signingKey - The signing key, as seen in the SignalWire portal
 * @param url - The full URL (with query string) you configured to handle this request
 * @param params - the parameters sent with this request
 */
export function getExpectedTwilioSignature(
  signingKey: string,
  url: string,
  params: Record<string, any>
): string;

/**
 * Utility function to get the expected body hash for a given request's body
 *
 * @param {string} body - The plain-text body of the request
 */
export function getExpectedBodyHash(body: string): string;

/**
 * Utility function to validate an incoming request is indeed from Twilio. This also validates
 * the request body against the bodySHA256 post parameter.
 *
 * @param signingKey - The signing key, as seen in the SignalWire portal
 * @param signalWireHeader - The value of the X-Twilio-Signature or X-SignalWire-Signature header from the request
 * @param requestUrl - The full URL (with query string) you configured to handle this request
 * @param body - The body of the request
 */
export function validateRequestWithBody(
  signingKey: string,
  signalWireHeader: string,
  requestUrl: string,
  body: string
): boolean;

/**
 * Utility function to validate an incoming request is indeed from Twilio (for use with express).
 * adapted from https://github.com/crabasa/twiliosig
 *
 * @param request - An expressjs request object (http://expressjs.com/api.html#req.params)
 * @param signingKey - The signing key, as seen in the SignalWire portal
 * @param opts - options for request validation
 */
export function validateExpressRequest(
  request: Request,
  signingKey: string,
  opts?: RequestValidatorOptions
): boolean;

/**
 * Express middleware to accompany a Twilio webhook. Provides Twilio
 * request validation, and makes the response a little more friendly for our
 * TwiML generator.  Request validation requires the express.urlencoded middleware
 * to have been applied (e.g. app.use(express.urlencoded()); in your app config).
 *
 * Options:
 * - validate: {Boolean} whether or not the middleware should validate the request
 *     came from Twilio.  Default true. If the request does not originate from
 *     Twilio, we will return a text body and a 403.  If there is no configured
 *     auth token and validate=true, this is an error condition, so we will return
 *     a 500.
 * - includeHelpers: {Boolean} add helpers to the response object to improve support
 *     for XML (TwiML) rendering.  Default true.
 * - host: manually specify the host name used by Twilio in a number's webhook config
 * - protocol: manually specify the protocol used by Twilio in a number's webhook config
 *
 * Returns a middleware function.
 *
 * Examples:
 * var webhookMiddleware = twilio.webhook();
 * var webhookMiddleware = twilio.webhook('asdha9dhjasd'); //init with auth token
 * var webhookMiddleware = twilio.webhook({
 *     validate:false // don't attempt request validation
 * });
 * var webhookMiddleware = twilio.webhook({
 *     host: 'hook.twilio.com',
 *     protocol: 'https'
 * });
 */
export function webhook(): any;
export function webhook(opts: WebhookOptions): any;
export function webhook(authToken: string, opts: WebhookOptions): any;
export function webhook(opts: WebhookOptions, authToken: string): any;
