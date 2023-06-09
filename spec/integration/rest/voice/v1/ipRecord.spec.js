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

describe('IpRecord', function() {
  beforeEach(function() {
    holodeck = new Holodeck();
    client = new Twilio('ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX', 'AUTHTOKEN', {
      httpClient: holodeck
    });
  });
  it('should generate valid create request',
    function(done) {
      holodeck.mock(new Response(500, {}));

      var opts = {'ipAddress': 'ip_address'};
      var promise = client.voice.v1.ipRecords.create(opts);
      promise.then(function() {
        throw new Error('failed');
      }, function(error) {
        expect(error.constructor).toBe(RestException.prototype.constructor);
        done();
      }).done();

      var url = 'https://voice.twilio.com/v1/IpRecords';

      var values = {'IpAddress': 'ip_address', };
      holodeck.assertHasRequest(new Request({
          method: 'POST',
          url: url,
          data: values
      }));
    }
  );
  it('should generate valid create response',
    function(done) {
      var body = {
          'account_sid': 'ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
          'sid': 'ILaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
          'friendly_name': 'friendly_name',
          'ip_address': '10.2.3.4',
          'cidr_prefix_length': 30,
          'date_created': '2020-03-18T23:31:36Z',
          'date_updated': '2020-03-18T23:31:36Z',
          'url': 'https://voice.twilio.com/v1/IpRecords/ILaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
      };

      holodeck.mock(new Response(201, body));

      var opts = {'ipAddress': 'ip_address'};
      var promise = client.voice.v1.ipRecords.create(opts);
      promise.then(function(response) {
        expect(response).toBeDefined();
        done();
      }, function() {
        throw new Error('failed');
      }).done();
    }
  );
  it('should generate valid fetch request',
    function(done) {
      holodeck.mock(new Response(500, {}));

      var promise = client.voice.v1.ipRecords('ILXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX').fetch();
      promise.then(function() {
        throw new Error('failed');
      }, function(error) {
        expect(error.constructor).toBe(RestException.prototype.constructor);
        done();
      }).done();

      var sid = 'ILXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX';
      var url = `https://voice.twilio.com/v1/IpRecords/${sid}`;

      holodeck.assertHasRequest(new Request({
        method: 'GET',
        url: url
      }));
    }
  );
  it('should generate valid fetch response',
    function(done) {
      var body = {
          'account_sid': 'ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
          'sid': 'ILaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
          'friendly_name': 'friendly_name',
          'ip_address': '10.2.3.4',
          'cidr_prefix_length': 30,
          'date_created': '2020-03-18T23:31:36Z',
          'date_updated': '2020-03-18T23:31:37Z',
          'url': 'https://voice.twilio.com/v1/IpRecords/ILaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
      };

      holodeck.mock(new Response(200, body));

      var promise = client.voice.v1.ipRecords('ILXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX').fetch();
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
          'meta': {
              'page': 0,
              'page_size': 50,
              'first_page_url': 'https://voice.twilio.com/v1/IpRecords?PageSize=50&Page=0',
              'previous_page_url': null,
              'url': 'https://voice.twilio.com/v1/IpRecords?PageSize=50&Page=0',
              'next_page_url': null,
              'key': 'ip_records'
          },
          'ip_records': [
              {
                  'account_sid': 'ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
                  'sid': 'ILaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
                  'friendly_name': 'friendly_name',
                  'ip_address': '10.2.3.4',
                  'cidr_prefix_length': 30,
                  'date_created': '2020-03-18T23:31:36Z',
                  'date_updated': '2020-03-18T23:31:37Z',
                  'url': 'https://voice.twilio.com/v1/IpRecords/ILaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
              }
          ]
      };
      holodeck.mock(new Response(200, body));
      client.voice.v1.ipRecords.each(() => done());
    }
  );
  it('should treat the second arg as a callback',
    function(done) {
      var body = {
          'meta': {
              'page': 0,
              'page_size': 50,
              'first_page_url': 'https://voice.twilio.com/v1/IpRecords?PageSize=50&Page=0',
              'previous_page_url': null,
              'url': 'https://voice.twilio.com/v1/IpRecords?PageSize=50&Page=0',
              'next_page_url': null,
              'key': 'ip_records'
          },
          'ip_records': [
              {
                  'account_sid': 'ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
                  'sid': 'ILaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
                  'friendly_name': 'friendly_name',
                  'ip_address': '10.2.3.4',
                  'cidr_prefix_length': 30,
                  'date_created': '2020-03-18T23:31:36Z',
                  'date_updated': '2020-03-18T23:31:37Z',
                  'url': 'https://voice.twilio.com/v1/IpRecords/ILaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
              }
          ]
      };
      holodeck.mock(new Response(200, body));
      client.voice.v1.ipRecords.each({pageSize: 20}, () => done());
      holodeck.assertHasRequest(new Request({
          method: 'GET',
          url: 'https://voice.twilio.com/v1/IpRecords',
          params: {PageSize: 20},
      }));
    }
  );
  it('should find the callback in the opts object',
    function(done) {
      var body = {
          'meta': {
              'page': 0,
              'page_size': 50,
              'first_page_url': 'https://voice.twilio.com/v1/IpRecords?PageSize=50&Page=0',
              'previous_page_url': null,
              'url': 'https://voice.twilio.com/v1/IpRecords?PageSize=50&Page=0',
              'next_page_url': null,
              'key': 'ip_records'
          },
          'ip_records': [
              {
                  'account_sid': 'ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
                  'sid': 'ILaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
                  'friendly_name': 'friendly_name',
                  'ip_address': '10.2.3.4',
                  'cidr_prefix_length': 30,
                  'date_created': '2020-03-18T23:31:36Z',
                  'date_updated': '2020-03-18T23:31:37Z',
                  'url': 'https://voice.twilio.com/v1/IpRecords/ILaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
              }
          ]
      };
      holodeck.mock(new Response(200, body));
      client.voice.v1.ipRecords.each({callback: () => done()}, () => fail('wrong callback!'));
    }
  );
  it('should generate valid list request',
    function(done) {
      holodeck.mock(new Response(500, {}));

      var promise = client.voice.v1.ipRecords.list();
      promise.then(function() {
        throw new Error('failed');
      }, function(error) {
        expect(error.constructor).toBe(RestException.prototype.constructor);
        done();
      }).done();

      var url = 'https://voice.twilio.com/v1/IpRecords';

      holodeck.assertHasRequest(new Request({
        method: 'GET',
        url: url
      }));
    }
  );
  it('should generate valid read_full response',
    function(done) {
      var body = {
          'meta': {
              'page': 0,
              'page_size': 50,
              'first_page_url': 'https://voice.twilio.com/v1/IpRecords?PageSize=50&Page=0',
              'previous_page_url': null,
              'url': 'https://voice.twilio.com/v1/IpRecords?PageSize=50&Page=0',
              'next_page_url': null,
              'key': 'ip_records'
          },
          'ip_records': [
              {
                  'account_sid': 'ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
                  'sid': 'ILaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
                  'friendly_name': 'friendly_name',
                  'ip_address': '10.2.3.4',
                  'cidr_prefix_length': 30,
                  'date_created': '2020-03-18T23:31:36Z',
                  'date_updated': '2020-03-18T23:31:37Z',
                  'url': 'https://voice.twilio.com/v1/IpRecords/ILaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
              }
          ]
      };

      holodeck.mock(new Response(200, body));

      var promise = client.voice.v1.ipRecords.list();
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
          'meta': {
              'page': 0,
              'page_size': 50,
              'first_page_url': 'https://voice.twilio.com/v1/IpRecords?PageSize=50&Page=0',
              'previous_page_url': null,
              'url': 'https://voice.twilio.com/v1/IpRecords?PageSize=50&Page=0',
              'next_page_url': null,
              'key': 'ip_records'
          },
          'ip_records': []
      };

      holodeck.mock(new Response(200, body));

      var promise = client.voice.v1.ipRecords.list();
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

      var promise = client.voice.v1.ipRecords('ILXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX').update();
      promise.then(function() {
        throw new Error('failed');
      }, function(error) {
        expect(error.constructor).toBe(RestException.prototype.constructor);
        done();
      }).done();

      var sid = 'ILXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX';
      var url = `https://voice.twilio.com/v1/IpRecords/${sid}`;

      holodeck.assertHasRequest(new Request({
        method: 'POST',
        url: url
      }));
    }
  );
  it('should generate valid update response',
    function(done) {
      var body = {
          'account_sid': 'ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
          'sid': 'ILaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
          'friendly_name': 'update_name',
          'ip_address': '10.2.3.4',
          'cidr_prefix_length': 30,
          'date_created': '2020-03-18T23:31:36Z',
          'date_updated': '2020-03-18T23:31:37Z',
          'url': 'https://voice.twilio.com/v1/IpRecords/ILaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
      };

      holodeck.mock(new Response(200, body));

      var promise = client.voice.v1.ipRecords('ILXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX').update();
      promise.then(function(response) {
        expect(response).toBeDefined();
        done();
      }, function() {
        throw new Error('failed');
      }).done();
    }
  );
  it('should generate valid remove request',
    function(done) {
      holodeck.mock(new Response(500, {}));

      var promise = client.voice.v1.ipRecords('ILXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX').remove();
      promise.then(function() {
        throw new Error('failed');
      }, function(error) {
        expect(error.constructor).toBe(RestException.prototype.constructor);
        done();
      }).done();

      var sid = 'ILXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX';
      var url = `https://voice.twilio.com/v1/IpRecords/${sid}`;

      holodeck.assertHasRequest(new Request({
        method: 'DELETE',
        url: url
      }));
    }
  );
  it('should generate valid delete response',
    function(done) {
      var body = null;

      holodeck.mock(new Response(204, body));

      var promise = client.voice.v1.ipRecords('ILXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX').remove();
      promise.then(function(response) {
        expect(response).toBe(true);
        done();
      }, function() {
        throw new Error('failed');
      }).done();
    }
  );
});
