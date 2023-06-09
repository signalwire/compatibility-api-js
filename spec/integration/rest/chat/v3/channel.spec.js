'use strict';

/* jshint ignore:start */
/**
 * This code was generated by
 * \ / _    _  _|   _  _
 *  | (_)\/(_)(_|\/| |(/_  v1.0.0
 *       /       /
 */
/* jshint ignore:end */

var Holodeck = require('../../../holodeck');  /* jshint ignore:line */
var Request = require(
    '../../../../../lib/http/request');  /* jshint ignore:line */
var Response = require(
    '../../../../../lib/http/response');  /* jshint ignore:line */
var RestException = require(
    '../../../../../lib/base/RestException');  /* jshint ignore:line */
var Twilio = require('../../../../../lib');  /* jshint ignore:line */


var client;
var holodeck;

describe('Channel', function() {
  beforeEach(function() {
    holodeck = new Holodeck();
    client = new Twilio('ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX', 'AUTHTOKEN', {
      httpClient: holodeck
    });
  });
  it('should generate valid update request',
    function(done) {
      holodeck.mock(new Response(500, {}));

      var opts = {'xTwilioWebhookEnabled': 'true'};
      var promise = client.chat.v3.channels('ISXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX', 'CHXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX').update(opts);
      promise.then(function() {
        throw new Error('failed');
      }, function(error) {
        expect(error.constructor).toBe(RestException.prototype.constructor);
        done();
      }).done();

      var serviceSid = 'ISXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX';
      var sid = 'CHXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX';
      var url = `https://chat.twilio.com/v3/Services/${serviceSid}/Channels/${sid}`;

      var headers = {'X-Twilio-Webhook-Enabled': 'true'};
      holodeck.assertHasRequest(new Request({
        method: 'POST',
        url: url,
        headers: headers
      }));
    }
  );
  it('should generate valid update response',
    function(done) {
      var body = {
          'sid': 'CHaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
          'account_sid': 'ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
          'service_sid': 'ISaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
          'messaging_service_sid': 'MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
          'friendly_name': 'friendly_name',
          'unique_name': 'unique_name',
          'attributes': '{ \'foo\': \'bar\' }',
          'type': 'public',
          'date_created': '2015-12-16T22:18:37Z',
          'date_updated': '2015-12-16T22:18:38Z',
          'created_by': 'username',
          'members_count': 0,
          'messages_count': 0,
          'url': 'https://chat.twilio.com/v3/Services/ISaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Channels/CHaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
      };

      holodeck.mock(new Response(200, body));

      var promise = client.chat.v3.channels('ISXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX', 'CHXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX').update();
      promise.then(function(response) {
        expect(response).toBeDefined();
        done();
      }, function() {
        throw new Error('failed');
      }).done();
    }
  );
});
