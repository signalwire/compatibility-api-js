'use strict';

/* jshint ignore:start */
/**
 * This code was generated by
 * \ / _    _  _|   _  _
 *  | (_)\/(_)(_|\/| |(/_  v1.0.0
 *       /       /
 */
/* jshint ignore:end */

var Holodeck = require('../../../../holodeck');  /* jshint ignore:line */
var Request = require(
    '../../../../../../lib/http/request');  /* jshint ignore:line */
var Response = require(
    '../../../../../../lib/http/response');  /* jshint ignore:line */
var RestException = require(
    '../../../../../../lib/base/RestException');  /* jshint ignore:line */
var Twilio = require('../../../../../../lib');  /* jshint ignore:line */
var serialize = require(
    '../../../../../../lib/base/serialize');  /* jshint ignore:line */


var client;
var holodeck;

describe('FlowTestUser', function() {
  beforeEach(function() {
    holodeck = new Holodeck();
    client = new Twilio('ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX', 'AUTHTOKEN', {
      httpClient: holodeck
    });
  });
  it('should generate valid fetch request',
    function(done) {
      holodeck.mock(new Response(500, {}));

      var promise = client.studio.v2.flows('FWXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
                                    .testUsers().fetch();
      promise.then(function() {
        throw new Error('failed');
      }, function(error) {
        expect(error.constructor).toBe(RestException.prototype.constructor);
        done();
      }).done();

      var sid = 'FWXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX';
      var url = `https://studio.twilio.com/v2/Flows/${sid}/TestUsers`;

      holodeck.assertHasRequest(new Request({
        method: 'GET',
        url: url
      }));
    }
  );
  it('should generate valid fetch response',
    function(done) {
      var body = {
          'sid': 'FWaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
          'test_users': [
              'user1',
              'user2'
          ],
          'url': 'https://studio.twilio.com/v2/Flows/FWaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/TestUsers'
      };

      holodeck.mock(new Response(200, body));

      var promise = client.studio.v2.flows('FWXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
                                    .testUsers().fetch();
      promise.then(function(response) {
        expect(response).toBeDefined();
        done();
      }, function() {
        throw new Error('failed');
      }).done();
    }
  );
  it('should generate valid update request',
    function(done) {
      holodeck.mock(new Response(500, {}));

      var opts = {'testUsers': ['test_users']};
      var promise = client.studio.v2.flows('FWXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
                                    .testUsers().update(opts);
      promise.then(function() {
        throw new Error('failed');
      }, function(error) {
        expect(error.constructor).toBe(RestException.prototype.constructor);
        done();
      }).done();

      var sid = 'FWXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX';
      var url = `https://studio.twilio.com/v2/Flows/${sid}/TestUsers`;

      var values = {'TestUsers': serialize.map(['test_users'], function(e) { return e; }), };
      holodeck.assertHasRequest(new Request({
          method: 'POST',
          url: url,
          data: values
      }));
    }
  );
  it('should generate valid update response',
    function(done) {
      var body = {
          'sid': 'FWaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
          'test_users': [
              'user1',
              'user2'
          ],
          'url': 'https://studio.twilio.com/v2/Flows/FWaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/TestUsers'
      };

      holodeck.mock(new Response(200, body));

      var opts = {'testUsers': ['test_users']};
      var promise = client.studio.v2.flows('FWXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
                                    .testUsers().update(opts);
      promise.then(function(response) {
        expect(response).toBeDefined();
        done();
      }, function() {
        throw new Error('failed');
      }).done();
    }
  );
});
