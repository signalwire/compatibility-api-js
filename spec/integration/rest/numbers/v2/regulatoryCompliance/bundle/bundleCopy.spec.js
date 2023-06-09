'use strict';

/* jshint ignore:start */
/**
 * This code was generated by
 * \ / _    _  _|   _  _
 *  | (_)\/(_)(_|\/| |(/_  v1.0.0
 *       /       /
 */
/* jshint ignore:end */

var Holodeck = require('../../../../../holodeck');  /* jshint ignore:line */
var Request = require(
    '../../../../../../../lib/http/request');  /* jshint ignore:line */
var Response = require(
    '../../../../../../../lib/http/response');  /* jshint ignore:line */
var RestException = require(
    '../../../../../../../lib/base/RestException');  /* jshint ignore:line */
var Twilio = require('../../../../../../../lib');  /* jshint ignore:line */


var client;
var holodeck;

describe('BundleCopy', function() {
  beforeEach(function() {
    holodeck = new Holodeck();
    client = new Twilio('ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX', 'AUTHTOKEN', {
      httpClient: holodeck
    });
  });
  it('should generate valid create request',
    function(done) {
      holodeck.mock(new Response(500, {}));

      var promise = client.numbers.v2.regulatoryCompliance
                                     .bundles('BUXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
                                     .bundleCopies.create();
      promise.then(function() {
        throw new Error('failed');
      }, function(error) {
        expect(error.constructor).toBe(RestException.prototype.constructor);
        done();
      }).done();

      var bundleSid = 'BUXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX';
      var url = `https://numbers.twilio.com/v2/RegulatoryCompliance/Bundles/${bundleSid}/Copies`;

      holodeck.assertHasRequest(new Request({
        method: 'POST',
        url: url
      }));
    }
  );
  it('should generate valid create response',
    function(done) {
      var body = {
          'sid': 'BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
          'account_sid': 'ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
          'regulation_sid': 'RNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
          'friendly_name': 'friendly_name',
          'status': 'draft',
          'valid_until': '2015-07-30T20:00:00Z',
          'email': 'email',
          'status_callback': 'http://www.example.com',
          'date_created': '2015-07-30T20:00:00Z',
          'date_updated': '2015-07-30T20:00:00Z'
      };

      holodeck.mock(new Response(201, body));

      var promise = client.numbers.v2.regulatoryCompliance
                                     .bundles('BUXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
                                     .bundleCopies.create();
      promise.then(function(response) {
        expect(response).toBeDefined();
        done();
      }, function() {
        throw new Error('failed');
      }).done();
    }
  );
  it('should treat the first each arg as a callback',
    function(done) {
      var body = {
          'results': [
              {
                  'sid': 'BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
                  'account_sid': 'ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
                  'regulation_sid': 'RNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
                  'friendly_name': 'friendly_name',
                  'status': 'twilio-approved',
                  'email': 'email',
                  'status_callback': 'http://www.example.com',
                  'valid_until': '2020-07-31T01:00:00Z',
                  'date_created': '2019-07-30T22:29:24Z',
                  'date_updated': '2019-07-31T01:09:00Z'
              }
          ],
          'meta': {
              'page': 0,
              'page_size': 50,
              'first_page_url': 'https://numbers.twilio.com/v2/RegulatoryCompliance/Bundles/BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Copies?PageSize=50&Page=0',
              'previous_page_url': null,
              'url': 'https://numbers.twilio.com/v2/RegulatoryCompliance/Bundles/BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Copies?PageSize=50&Page=0',
              'next_page_url': null,
              'key': 'results'
          }
      };
      holodeck.mock(new Response(200, body));
      client.numbers.v2.regulatoryCompliance
                       .bundles('BUXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
                       .bundleCopies.each(() => done());
    }
  );
  it('should treat the second arg as a callback',
    function(done) {
      var body = {
          'results': [
              {
                  'sid': 'BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
                  'account_sid': 'ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
                  'regulation_sid': 'RNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
                  'friendly_name': 'friendly_name',
                  'status': 'twilio-approved',
                  'email': 'email',
                  'status_callback': 'http://www.example.com',
                  'valid_until': '2020-07-31T01:00:00Z',
                  'date_created': '2019-07-30T22:29:24Z',
                  'date_updated': '2019-07-31T01:09:00Z'
              }
          ],
          'meta': {
              'page': 0,
              'page_size': 50,
              'first_page_url': 'https://numbers.twilio.com/v2/RegulatoryCompliance/Bundles/BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Copies?PageSize=50&Page=0',
              'previous_page_url': null,
              'url': 'https://numbers.twilio.com/v2/RegulatoryCompliance/Bundles/BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Copies?PageSize=50&Page=0',
              'next_page_url': null,
              'key': 'results'
          }
      };
      holodeck.mock(new Response(200, body));
      client.numbers.v2.regulatoryCompliance
                       .bundles('BUXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
                       .bundleCopies.each({pageSize: 20}, () => done());
      holodeck.assertHasRequest(new Request({
          method: 'GET',
          url: 'https://numbers.twilio.com/v2/RegulatoryCompliance/Bundles/${bundleSid}/Copies',
          params: {PageSize: 20},
      }));
    }
  );
  it('should find the callback in the opts object',
    function(done) {
      var body = {
          'results': [
              {
                  'sid': 'BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
                  'account_sid': 'ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
                  'regulation_sid': 'RNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
                  'friendly_name': 'friendly_name',
                  'status': 'twilio-approved',
                  'email': 'email',
                  'status_callback': 'http://www.example.com',
                  'valid_until': '2020-07-31T01:00:00Z',
                  'date_created': '2019-07-30T22:29:24Z',
                  'date_updated': '2019-07-31T01:09:00Z'
              }
          ],
          'meta': {
              'page': 0,
              'page_size': 50,
              'first_page_url': 'https://numbers.twilio.com/v2/RegulatoryCompliance/Bundles/BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Copies?PageSize=50&Page=0',
              'previous_page_url': null,
              'url': 'https://numbers.twilio.com/v2/RegulatoryCompliance/Bundles/BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Copies?PageSize=50&Page=0',
              'next_page_url': null,
              'key': 'results'
          }
      };
      holodeck.mock(new Response(200, body));
      client.numbers.v2.regulatoryCompliance
                       .bundles('BUXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
                       .bundleCopies.each({callback: () => done()}, () => fail('wrong callback!'));
    }
  );
  it('should generate valid list request',
    function(done) {
      holodeck.mock(new Response(500, {}));

      var promise = client.numbers.v2.regulatoryCompliance
                                     .bundles('BUXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
                                     .bundleCopies.list();
      promise.then(function() {
        throw new Error('failed');
      }, function(error) {
        expect(error.constructor).toBe(RestException.prototype.constructor);
        done();
      }).done();

      var bundleSid = 'BUXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX';
      var url = `https://numbers.twilio.com/v2/RegulatoryCompliance/Bundles/${bundleSid}/Copies`;

      holodeck.assertHasRequest(new Request({
        method: 'GET',
        url: url
      }));
    }
  );
  it('should generate valid read_empty response',
    function(done) {
      var body = {
          'results': [],
          'meta': {
              'page': 0,
              'page_size': 50,
              'first_page_url': 'https://numbers.twilio.com/v2/RegulatoryCompliance/Bundles/BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Copies?PageSize=50&Page=0',
              'previous_page_url': null,
              'url': 'https://numbers.twilio.com/v2/RegulatoryCompliance/Bundles/BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Copies?PageSize=50&Page=0',
              'next_page_url': null,
              'key': 'results'
          }
      };

      holodeck.mock(new Response(200, body));

      var promise = client.numbers.v2.regulatoryCompliance
                                     .bundles('BUXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
                                     .bundleCopies.list();
      promise.then(function(response) {
        expect(response).toBeDefined();
        done();
      }, function() {
        throw new Error('failed');
      }).done();
    }
  );
  it('should generate valid read_full response',
    function(done) {
      var body = {
          'results': [
              {
                  'sid': 'BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
                  'account_sid': 'ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
                  'regulation_sid': 'RNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
                  'friendly_name': 'friendly_name',
                  'status': 'twilio-approved',
                  'email': 'email',
                  'status_callback': 'http://www.example.com',
                  'valid_until': '2020-07-31T01:00:00Z',
                  'date_created': '2019-07-30T22:29:24Z',
                  'date_updated': '2019-07-31T01:09:00Z'
              }
          ],
          'meta': {
              'page': 0,
              'page_size': 50,
              'first_page_url': 'https://numbers.twilio.com/v2/RegulatoryCompliance/Bundles/BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Copies?PageSize=50&Page=0',
              'previous_page_url': null,
              'url': 'https://numbers.twilio.com/v2/RegulatoryCompliance/Bundles/BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Copies?PageSize=50&Page=0',
              'next_page_url': null,
              'key': 'results'
          }
      };

      holodeck.mock(new Response(200, body));

      var promise = client.numbers.v2.regulatoryCompliance
                                     .bundles('BUXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
                                     .bundleCopies.list();
      promise.then(function(response) {
        expect(response).toBeDefined();
        done();
      }, function() {
        throw new Error('failed');
      }).done();
    }
  );
});
