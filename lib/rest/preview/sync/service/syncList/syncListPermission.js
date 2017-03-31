'use strict';

var _ = require('lodash');
var Q = require('q');
var Page = require('../../../../../base/Page');
var values = require('../../../../../base/values');

var SyncListPermissionPage;
var SyncListPermissionList;
var SyncListPermissionInstance;
var SyncListPermissionContext;

/* jshint ignore:start */
/**
 * @constructor Twilio.Preview.Sync.ServiceContext.SyncListContext.SyncListPermissionPage
 * @augments Page
 * @description Initialize the SyncListPermissionPage
 *
 * @param {Twilio.Preview.Sync} version - Version of the resource
 * @param {object} response - Response from the API
 * @param {object} solution - Path solution
 *
 * @returns SyncListPermissionPage
 */
/* jshint ignore:end */
function SyncListPermissionPage(version, response, solution) {
  // Path Solution
  this._solution = solution;

  Page.prototype.constructor.call(this, version, response, this._solution);
}

_.extend(SyncListPermissionPage.prototype, Page.prototype);
SyncListPermissionPage.prototype.constructor = SyncListPermissionPage;

/* jshint ignore:start */
/**
 * Build an instance of SyncListPermissionInstance
 *
 * @function getInstance
 * @memberof Twilio.Preview.Sync.ServiceContext.SyncListContext.SyncListPermissionPage
 * @instance
 *
 * @param {object} payload - Payload response from the API
 *
 * @returns SyncListPermissionInstance
 */
/* jshint ignore:end */
SyncListPermissionPage.prototype.getInstance = function getInstance(payload) {
  return new SyncListPermissionInstance(
    this._version,
    payload,
    this._solution.serviceSid,
    this._solution.listSid
  );
};


/* jshint ignore:start */
/**
 * @constructor Twilio.Preview.Sync.ServiceContext.SyncListContext.SyncListPermissionList
 * @description Initialize the SyncListPermissionList
 *
 * @param {Twilio.Preview.Sync} version - Version of the resource
 * @param {string} serviceSid - Sync Service Instance SID.
 * @param {string} listSid - Sync List SID.
 */
/* jshint ignore:end */
function SyncListPermissionList(version, serviceSid, listSid) {
  /* jshint ignore:start */
  /**
   * @function syncListPermissions
   * @memberof Twilio.Preview.Sync.ServiceContext.SyncListContext
   * @instance
   *
   * @param {string} sid - sid of instance
   *
   * @returns {Twilio.Preview.Sync.ServiceContext.SyncListContext.SyncListPermissionContext}
   */
  /* jshint ignore:end */
  function SyncListPermissionListInstance(sid) {
    return SyncListPermissionListInstance.get(sid);
  }

  SyncListPermissionListInstance._version = version;
  // Path Solution
  SyncListPermissionListInstance._solution = {
    serviceSid: serviceSid,
    listSid: listSid
  };
  SyncListPermissionListInstance._uri = _.template(
    '/Services/<%= serviceSid %>/Lists/<%= listSid %>/Permissions' // jshint ignore:line
  )(SyncListPermissionListInstance._solution);
  /* jshint ignore:start */
  /**
   * Streams SyncListPermissionInstance records from the API.
   *
   * This operation lazily loads records as efficiently as possible until the limit
   * is reached.
   *
   * The results are passed into the callback function, so this operation is memory efficient.
   *
   * If a function is passed as the first argument, it will be used as the callback function.
   *
   * @function each
   * @memberof Twilio.Preview.Sync.ServiceContext.SyncListContext.SyncListPermissionList
   * @instance
   *
   * @param {object|function} opts - ...
   * @param {number} [opts.limit] -
   *         Upper limit for the number of records to return.
   *         each() guarantees never to return more than limit.
   *         Default is no limit
   * @param {number} [opts.pageSize=50] -
   *         Number of records to fetch per request,
   *         when not set will use the default value of 50 records.
   *         If no pageSize is defined but a limit is defined,
   *         each() will attempt to read the limit with the most efficient
   *         page size, i.e. min(limit, 1000)
   * @param {Function} [opts.callback] -
   *         Function to process each record. If this and a positional
   * callback are passed, this one will be used
   * @param {Function} [opts.done] -
   *          Function to be called upon completion of streaming
   * @param {Function} [callback] - Function to process each record
   */
  /* jshint ignore:end */
  SyncListPermissionListInstance.each = function each(opts, callback) {
    opts = opts || {};
    if (_.isFunction(opts)) {
      opts = { callback: opts };
    } else if (_.isFunction(callback) && !_.isFunction(opts.callback)) {
      opts.callback = callback;
    }

    if (_.isUndefined(opts.callback)) {
      throw new Error('Callback function must be provided');
    }

    var done = false;
    var currentPage = 1;
    var limits = this._version.readLimits({
      limit: opts.limit,
      pageSize: opts.pageSize
    });

    function onComplete(error) {
      done = true;
      if (_.isFunction(opts.done)) {
        opts.done(error);
      }
    }

    function fetchNextPage(fn) {
      var promise = fn();
      if (_.isUndefined(promise)) {
        onComplete();
        return;
      }

      promise.then(function(page) {
        _.each(page.instances, function(instance) {
          if (done) {
            return false;
          }

          opts.callback(instance, onComplete);
        });

        if ((limits.pageLimit && limits.pageLimit <= currentPage)) {
          onComplete();
        } else if (!done) {
          currentPage++;
          fetchNextPage(_.bind(page.nextPage, page));
        }
      });

      promise.catch(onComplete);
    }

    fetchNextPage(_.bind(this.page, this, opts));
  };

  /* jshint ignore:start */
  /**
   * @description Lists SyncListPermissionInstance records from the API as a list.
   *
   * If a function is passed as the first argument, it will be used as the callback function.
   *
   * @function list
   * @memberof Twilio.Preview.Sync.ServiceContext.SyncListContext.SyncListPermissionList
   * @instance
   *
   * @param {object|function} opts - ...
   * @param {number} [opts.limit] -
   *         Upper limit for the number of records to return.
   *         list() guarantees never to return more than limit.
   *         Default is no limit
   * @param {number} [opts.pageSize] -
   *         Number of records to fetch per request,
   *         when not set will use the default value of 50 records.
   *         If no page_size is defined but a limit is defined,
   *         list() will attempt to read the limit with the most
   *         efficient page size, i.e. min(limit, 1000)
   * @param {function} [callback] - Callback to handle list of records
   *
   * @returns {Promise} Resolves to a list of records
   */
  /* jshint ignore:end */
  SyncListPermissionListInstance.list = function list(opts, callback) {
    if (_.isFunction(opts)) {
      callback = opts;
      opts = {};
    }
    opts = opts || {};
    var deferred = Q.defer();
    var allResources = [];
    opts.callback = function(resource, done) {
      allResources.push(resource);

      if (!_.isUndefined(opts.limit) && allResources.length === opts.limit) {
        done();
      }
    };

    opts.done = function(error) {
      if (_.isUndefined(error)) {
        deferred.resolve(allResources);
      } else {
        deferred.reject(error);
      }
    };

    if (_.isFunction(callback)) {
      deferred.promise.nodeify(callback);
    }

    this.each(opts);
    return deferred.promise;
  };

  /* jshint ignore:start */
  /**
   * Retrieve a single page of SyncListPermissionInstance records from the API.
   * Request is executed immediately
   *
   * If a function is passed as the first argument, it will be used as the callback function.
   *
   * @function page
   * @memberof Twilio.Preview.Sync.ServiceContext.SyncListContext.SyncListPermissionList
   * @instance
   *
   * @param {object|function} opts - ...
   * @param {string} [opts.pageToken] - PageToken provided by the API
   * @param {number} [opts.pageNumber] -
   *          Page Number, this value is simply for client state
   * @param {number} [opts.pageSize] - Number of records to return, defaults to 50
   * @param {function} [callback] - Callback to handle list of records
   *
   * @returns {Promise} Resolves to a list of records
   */
  /* jshint ignore:end */
  SyncListPermissionListInstance.page = function page(opts, callback) {
    opts = opts || {};

    var deferred = Q.defer();
    var data = values.of({
      'PageToken': opts.pageToken,
      'Page': opts.pageNumber,
      'PageSize': opts.pageSize
    });

    var promise = this._version.page({
      uri: this._uri,
      method: 'GET',
      params: data
    });

    promise = promise.then(function(payload) {
      deferred.resolve(new SyncListPermissionPage(
        this._version,
        payload,
        this._solution
      ));
    }.bind(this));

    promise.catch(function(error) {
      deferred.reject(error);
    });

    if (_.isFunction(callback)) {
      deferred.promise.nodeify(callback);
    }

    return deferred.promise;
  };

  /* jshint ignore:start */
  /**
   * Constructs a sync_list_permission
   *
   * @function get
   * @memberof Twilio.Preview.Sync.ServiceContext.SyncListContext.SyncListPermissionList
   * @instance
   *
   * @param {string} identity -
   *          Identity of the user to whom the Sync List Permission applies.
   *
   * @returns {Twilio.Preview.Sync.ServiceContext.SyncListContext.SyncListPermissionContext}
   */
  /* jshint ignore:end */
  SyncListPermissionListInstance.get = function get(identity) {
    return new SyncListPermissionContext(
      this._version,
      this._solution.serviceSid,
      this._solution.listSid,
      identity
    );
  };

  return SyncListPermissionListInstance;
}


/* jshint ignore:start */
/**
 * @constructor Twilio.Preview.Sync.ServiceContext.SyncListContext.SyncListPermissionInstance
 * @description Initialize the SyncListPermissionContext
 *
 * @property {string} accountSid - Twilio Account SID.
 * @property {string} serviceSid - Sync Service Instance SID.
 * @property {string} listSid - Sync List SID.
 * @property {string} identity -
 *          Identity of the user to whom the Sync List Permission applies.
 * @property {string} read - Read access.
 * @property {string} write - Write access.
 * @property {string} manage - Manage access.
 * @property {string} url - URL of this Sync List Permission.
 *
 * @param {Twilio.Preview.Sync} version - Version of the resource
 * @param {object} payload - The instance payload
 * @param {sid} serviceSid - The service_sid
 * @param {sid_like} listSid - Sync List SID or unique name.
 * @param {string} identity -
 *          Identity of the user to whom the Sync List Permission applies.
 */
/* jshint ignore:end */
function SyncListPermissionInstance(version, payload, serviceSid, listSid,
                                     identity) {
  this._version = version;

  // Marshaled Properties
  this.accountSid = payload.account_sid; // jshint ignore:line
  this.serviceSid = payload.service_sid; // jshint ignore:line
  this.listSid = payload.list_sid; // jshint ignore:line
  this.identity = payload.identity; // jshint ignore:line
  this.read = payload.read; // jshint ignore:line
  this.write = payload.write; // jshint ignore:line
  this.manage = payload.manage; // jshint ignore:line
  this.url = payload.url; // jshint ignore:line

  // Context
  this._context = undefined;
  this._solution = {
    serviceSid: serviceSid,
    listSid: listSid,
    identity: identity || this.identity,
  };
}

Object.defineProperty(SyncListPermissionInstance.prototype,
  '_proxy', {
  get: function() {
    if (!this._context) {
      this._context = new SyncListPermissionContext(
        this._version,
        this._solution.serviceSid,
        this._solution.listSid,
        this._solution.identity
      );
    }

    return this._context;
  },
});

/* jshint ignore:start */
/**
 * fetch a SyncListPermissionInstance
 *
 * @function fetch
 * @memberof Twilio.Preview.Sync.ServiceContext.SyncListContext.SyncListPermissionInstance
 * @instance
 *
 * @param {function} [callback] - Callback to handle processed record
 *
 * @returns {Promise} Resolves to processed SyncListPermissionInstance
 */
/* jshint ignore:end */
SyncListPermissionInstance.prototype.fetch = function fetch(callback) {
  return this._proxy.fetch(callback);
};

/* jshint ignore:start */
/**
 * remove a SyncListPermissionInstance
 *
 * @function remove
 * @memberof Twilio.Preview.Sync.ServiceContext.SyncListContext.SyncListPermissionInstance
 * @instance
 *
 * @param {function} [callback] - Callback to handle processed record
 *
 * @returns {Promise} Resolves to processed SyncListPermissionInstance
 */
/* jshint ignore:end */
SyncListPermissionInstance.prototype.remove = function remove(callback) {
  return this._proxy.remove(callback);
};

/* jshint ignore:start */
/**
 * update a SyncListPermissionInstance
 *
 * @function update
 * @memberof Twilio.Preview.Sync.ServiceContext.SyncListContext.SyncListPermissionInstance
 * @instance
 *
 * @param {object} opts - ...
 * @param {string} opts.read - Read access.
 * @param {string} opts.write - Write access.
 * @param {string} opts.manage - Manage access.
 * @param {function} [callback] - Callback to handle processed record
 *
 * @returns {Promise} Resolves to processed SyncListPermissionInstance
 */
/* jshint ignore:end */
SyncListPermissionInstance.prototype.update = function update(opts, callback) {
  return this._proxy.update(opts, callback);
};


/* jshint ignore:start */
/**
 * @constructor Twilio.Preview.Sync.ServiceContext.SyncListContext.SyncListPermissionContext
 * @description Initialize the SyncListPermissionContext
 *
 * @param {Twilio.Preview.Sync} version - Version of the resource
 * @param {sid} serviceSid - The service_sid
 * @param {sid_like} listSid - Sync List SID or unique name.
 * @param {string} identity -
 *          Identity of the user to whom the Sync List Permission applies.
 */
/* jshint ignore:end */
function SyncListPermissionContext(version, serviceSid, listSid, identity) {
  this._version = version;

  // Path Solution
  this._solution = {
    serviceSid: serviceSid,
    listSid: listSid,
    identity: identity,
  };
  this._uri = _.template(
    '/Services/<%= serviceSid %>/Lists/<%= listSid %>/Permissions/<%= identity %>' // jshint ignore:line
  )(this._solution);
}

/* jshint ignore:start */
/**
 * fetch a SyncListPermissionInstance
 *
 * @function fetch
 * @memberof Twilio.Preview.Sync.ServiceContext.SyncListContext.SyncListPermissionContext
 * @instance
 *
 * @param {function} [callback] - Callback to handle processed record
 *
 * @returns {Promise} Resolves to processed SyncListPermissionInstance
 */
/* jshint ignore:end */
SyncListPermissionContext.prototype.fetch = function fetch(callback) {
  var deferred = Q.defer();
  var promise = this._version.fetch({
    uri: this._uri,
    method: 'GET'
  });

  promise = promise.then(function(payload) {
    deferred.resolve(new SyncListPermissionInstance(
      this._version,
      payload,
      this._solution.serviceSid,
      this._solution.listSid,
      this._solution.identity
    ));
  }.bind(this));

  promise.catch(function(error) {
    deferred.reject(error);
  });

  if (_.isFunction(callback)) {
    deferred.promise.nodeify(callback);
  }

  return deferred.promise;
};

/* jshint ignore:start */
/**
 * remove a SyncListPermissionInstance
 *
 * @function remove
 * @memberof Twilio.Preview.Sync.ServiceContext.SyncListContext.SyncListPermissionContext
 * @instance
 *
 * @param {function} [callback] - Callback to handle processed record
 *
 * @returns {Promise} Resolves to processed SyncListPermissionInstance
 */
/* jshint ignore:end */
SyncListPermissionContext.prototype.remove = function remove(callback) {
  var deferred = Q.defer();
  var promise = this._version.remove({
    uri: this._uri,
    method: 'DELETE'
  });

  promise = promise.then(function(payload) {
    deferred.resolve(payload);
  }.bind(this));

  promise.catch(function(error) {
    deferred.reject(error);
  });

  if (_.isFunction(callback)) {
    deferred.promise.nodeify(callback);
  }

  return deferred.promise;
};

/* jshint ignore:start */
/**
 * update a SyncListPermissionInstance
 *
 * @function update
 * @memberof Twilio.Preview.Sync.ServiceContext.SyncListContext.SyncListPermissionContext
 * @instance
 *
 * @param {object} opts - ...
 * @param {string} opts.read - Read access.
 * @param {string} opts.write - Write access.
 * @param {string} opts.manage - Manage access.
 * @param {function} [callback] - Callback to handle processed record
 *
 * @returns {Promise} Resolves to processed SyncListPermissionInstance
 */
/* jshint ignore:end */
SyncListPermissionContext.prototype.update = function update(opts, callback) {
  if (_.isUndefined(opts)) {
    throw new Error('Required parameter "opts" missing.');
  }
  if (_.isUndefined(opts.read)) {
    throw new Error('Required parameter "opts.read" missing.');
  }
  if (_.isUndefined(opts.write)) {
    throw new Error('Required parameter "opts.write" missing.');
  }
  if (_.isUndefined(opts.manage)) {
    throw new Error('Required parameter "opts.manage" missing.');
  }

  var deferred = Q.defer();
  var data = values.of({
    'Read': opts.read,
    'Write': opts.write,
    'Manage': opts.manage
  });

  var promise = this._version.update({
    uri: this._uri,
    method: 'POST',
    data: data
  });

  promise = promise.then(function(payload) {
    deferred.resolve(new SyncListPermissionInstance(
      this._version,
      payload,
      this._solution.serviceSid,
      this._solution.listSid,
      this._solution.identity
    ));
  }.bind(this));

  promise.catch(function(error) {
    deferred.reject(error);
  });

  if (_.isFunction(callback)) {
    deferred.promise.nodeify(callback);
  }

  return deferred.promise;
};

module.exports = {
  SyncListPermissionPage: SyncListPermissionPage,
  SyncListPermissionList: SyncListPermissionList,
  SyncListPermissionInstance: SyncListPermissionInstance,
  SyncListPermissionContext: SyncListPermissionContext
};