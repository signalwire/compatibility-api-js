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

describe('Mobile', function() {
  beforeEach(function() {
    holodeck = new Holodeck();
    client = new Twilio('ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX', 'AUTHTOKEN', {
      httpClient: holodeck
    });
  });
  it('should treat the first each arg as a callback',
    function(done) {
      var body = {
          'available_phone_numbers': [
              {
                  'address_requirements': 'none',
                  'beta': false,
                  'capabilities': {
                      'mms': false,
                      'sms': true,
                      'voice': false
                  },
                  'friendly_name': '+4759440374',
                  'iso_country': 'NO',
                  'lata': null,
                  'latitude': null,
                  'locality': null,
                  'longitude': null,
                  'phone_number': '+4759440374',
                  'postal_code': null,
                  'rate_center': null,
                  'region': null
              }
          ],
          'uri': '/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/AvailablePhoneNumbers/US/Mobile.json'
      };
      holodeck.mock(new Response(200, body));
      client.api.v2010.accounts('ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
                      .availablePhoneNumbers('US')
                      .mobile.each(() => done());
    }
  );
  it('should treat the second arg as a callback',
    function(done) {
      var body = {
          'available_phone_numbers': [
              {
                  'address_requirements': 'none',
                  'beta': false,
                  'capabilities': {
                      'mms': false,
                      'sms': true,
                      'voice': false
                  },
                  'friendly_name': '+4759440374',
                  'iso_country': 'NO',
                  'lata': null,
                  'latitude': null,
                  'locality': null,
                  'longitude': null,
                  'phone_number': '+4759440374',
                  'postal_code': null,
                  'rate_center': null,
                  'region': null
              }
          ],
          'uri': '/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/AvailablePhoneNumbers/US/Mobile.json'
      };
      holodeck.mock(new Response(200, body));
      client.api.v2010.accounts('ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
                      .availablePhoneNumbers('US')
                      .mobile.each({pageSize: 20}, () => done());
      holodeck.assertHasRequest(new Request({
          method: 'GET',
          url: 'https://api.twilio.com/2010-04-01/Accounts/${accountSid}/AvailablePhoneNumbers/${countryCode}/Mobile.json',
          params: {PageSize: 20},
      }));
    }
  );
  it('should find the callback in the opts object',
    function(done) {
      var body = {
          'available_phone_numbers': [
              {
                  'address_requirements': 'none',
                  'beta': false,
                  'capabilities': {
                      'mms': false,
                      'sms': true,
                      'voice': false
                  },
                  'friendly_name': '+4759440374',
                  'iso_country': 'NO',
                  'lata': null,
                  'latitude': null,
                  'locality': null,
                  'longitude': null,
                  'phone_number': '+4759440374',
                  'postal_code': null,
                  'rate_center': null,
                  'region': null
              }
          ],
          'uri': '/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/AvailablePhoneNumbers/US/Mobile.json'
      };
      holodeck.mock(new Response(200, body));
      client.api.v2010.accounts('ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
                      .availablePhoneNumbers('US')
                      .mobile.each({callback: () => done()}, () => fail('wrong callback!'));
    }
  );
  it('should generate valid list request',
    function(done) {
      holodeck.mock(new Response(500, {}));

      var promise = client.api.v2010.accounts('ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
                                    .availablePhoneNumbers('US')
                                    .mobile.list();
      promise.then(function() {
        throw new Error('failed');
      }, function(error) {
        expect(error.constructor).toBe(RestException.prototype.constructor);
        done();
      }).done();

      var accountSid = 'ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX';
      var countryCode = 'US';
      var url = `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/AvailablePhoneNumbers/${countryCode}/Mobile.json`;

      holodeck.assertHasRequest(new Request({
        method: 'GET',
        url: url
      }));
    }
  );
  it('should generate valid read_full response',
    function(done) {
      var body = {
          'available_phone_numbers': [
              {
                  'address_requirements': 'none',
                  'beta': false,
                  'capabilities': {
                      'mms': false,
                      'sms': true,
                      'voice': false
                  },
                  'friendly_name': '+4759440374',
                  'iso_country': 'NO',
                  'lata': null,
                  'latitude': null,
                  'locality': null,
                  'longitude': null,
                  'phone_number': '+4759440374',
                  'postal_code': null,
                  'rate_center': null,
                  'region': null
              }
          ],
          'uri': '/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/AvailablePhoneNumbers/US/Mobile.json'
      };

      holodeck.mock(new Response(200, body));

      var promise = client.api.v2010.accounts('ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
                                    .availablePhoneNumbers('US')
                                    .mobile.list();
      promise.then(function(response) {
        expect(response).toBeDefined();
        done();
      }, function() {
        throw new Error('failed');
      }).done();
    }
  );
  it('should generate valid read_empty response',
    function(done) {
      var body = {
          'available_phone_numbers': [],
          'uri': '/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/AvailablePhoneNumbers/US/Mobile.json'
      };

      holodeck.mock(new Response(200, body));

      var promise = client.api.v2010.accounts('ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
                                    .availablePhoneNumbers('US')
                                    .mobile.list();
      promise.then(function(response) {
        expect(response).toBeDefined();
        done();
      }, function() {
        throw new Error('failed');
      }).done();
    }
  );
});
