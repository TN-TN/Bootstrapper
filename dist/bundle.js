'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _async = require('async');

var _async2 = _interopRequireDefault(_async);

var _events = require('events');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var async = _bluebird2.default.promisifyAll(_async2.default);

module.exports = function (_EventEmitter) {
    _inherits(Bootstrapper, _EventEmitter);

    /**
     * @typedef {Object} BootChainFragment
     * @property {Boolean} promise If false, it needs to be sync
     * @property {Function} function
     * @property {*} payload The payload is the first arguement for the function
     * @property {Boolean} ignoreError Don't reject if a error occurs, but only for this fragment
     */

    /**
     * @typedef {Object} BootstrapperConfig
     * @property {Boolean} ignoreError Don't reject if a error occurs
     * @property {BootChainFragment} chain []
     */

    /**
     *
     * @param {BootstrapperConfig} bootstrapCFG
     * @property {Promise} promise
     */
    function Bootstrapper(bootstrapCFG) {
        _classCallCheck(this, Bootstrapper);

        var _this = _possibleConstructorReturn(this, (Bootstrapper.__proto__ || Object.getPrototypeOf(Bootstrapper)).call(this));

        _this.boot_chain = bootstrapCFG.chain;
        _this.cfg = bootstrapCFG;
        _this.count = _this.boot_chain.length;
        _this._execute = _this._execute.bind(_this);
        _this.promise = _this._execute();
        return _this;
    }

    /**
     * @return {Promise}
     * @private
     */


    _createClass(Bootstrapper, [{
        key: '_execute',
        value: function _execute() {
            var _this2 = this;

            var self = this;
            return new _bluebird2.default(function (resolve, reject) {
                self.emit('start');
                var c = 0;
                return async.eachSeriesAsync(_this2.boot_chain, function (FuncCFG, Callback) {
                    if (FuncCFG.promise) {
                        FuncCFG.function(FuncCFG.payload || undefined).then(function () {
                            c++;
                            self.emit('progress', { finished: c, count: self.count });
                            Callback();
                        }).catch(function (e) {
                            c++;
                            self.emit('progress', { finished: c, count: self.count });
                            if (self.cfg.ignoreError || FuncCFG.ignoreError) {
                                Callback();
                            } else {
                                Callback(e);
                            }
                        });
                    } else {
                        try {
                            FuncCFG.function(FuncCFG.payload || undefined);
                            c++;
                            self.emit('progress', { finished: c, count: self.count });
                            Callback();
                        } catch (e) {
                            c++;
                            self.emit('progress', { finished: c, count: self.count });
                            if (self.cfg.ignoreError || FuncCFG.ignoreError) {
                                Callback();
                            } else {
                                Callback(e);
                            }
                        }
                    }
                }).then(function () {
                    self.emit('finished');
                    resolve();
                }).catch(function (e) {
                    self.emit('error', e);
                    reject(e);
                });
            });
        }
    }]);

    return Bootstrapper;
}(_events.EventEmitter);

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7QUFFQSxJQUFNLFFBQVEsbUJBQVEsWUFBUixpQkFBZDs7QUFFQSxPQUFPLE9BQVA7QUFBQTs7QUFFSTs7Ozs7Ozs7QUFRQTs7Ozs7O0FBTUE7Ozs7O0FBS0EsMEJBQVksWUFBWixFQUEwQjtBQUFBOztBQUFBOztBQUV0QixjQUFLLFVBQUwsR0FBa0IsYUFBYSxLQUEvQjtBQUNBLGNBQUssR0FBTCxHQUFXLFlBQVg7QUFDQSxjQUFLLEtBQUwsR0FBYSxNQUFLLFVBQUwsQ0FBZ0IsTUFBN0I7QUFDQSxjQUFLLFFBQUwsR0FBZ0IsTUFBSyxRQUFMLENBQWMsSUFBZCxPQUFoQjtBQUNBLGNBQUssT0FBTCxHQUFlLE1BQUssUUFBTCxFQUFmO0FBTnNCO0FBT3pCOztBQUVEOzs7Ozs7QUE5Qko7QUFBQTtBQUFBLG1DQWtDYztBQUFBOztBQUNOLGdCQUFNLE9BQU8sSUFBYjtBQUNBLG1CQUFPLHVCQUFZLFVBQUMsT0FBRCxFQUFVLE1BQVYsRUFBcUI7QUFDcEMscUJBQUssSUFBTCxDQUFVLE9BQVY7QUFDQSxvQkFBSSxJQUFJLENBQVI7QUFDQSx1QkFBTyxNQUFNLGVBQU4sQ0FBc0IsT0FBSyxVQUEzQixFQUF1QyxVQUFDLE9BQUQsRUFBVSxRQUFWLEVBQXVCO0FBQ2pFLHdCQUFJLFFBQVEsT0FBWixFQUFvQjtBQUNoQixnQ0FBUSxRQUFSLENBQWlCLFFBQVEsT0FBUixJQUFtQixTQUFwQyxFQUErQyxJQUEvQyxDQUFvRCxZQUFNO0FBQ3REO0FBQ0EsaUNBQUssSUFBTCxDQUFVLFVBQVYsRUFBc0IsRUFBQyxVQUFVLENBQVgsRUFBYyxPQUFPLEtBQUssS0FBMUIsRUFBdEI7QUFDQTtBQUNILHlCQUpELEVBSUcsS0FKSCxDQUlTLGFBQUs7QUFDVjtBQUNBLGlDQUFLLElBQUwsQ0FBVSxVQUFWLEVBQXNCLEVBQUMsVUFBVSxDQUFYLEVBQWMsT0FBTyxLQUFLLEtBQTFCLEVBQXRCO0FBQ0EsZ0NBQUksS0FBSyxHQUFMLENBQVMsV0FBVCxJQUF3QixRQUFRLFdBQXBDLEVBQWdEO0FBQzVDO0FBQ0gsNkJBRkQsTUFFTztBQUNILHlDQUFTLENBQVQ7QUFDSDtBQUNKLHlCQVpEO0FBYUgscUJBZEQsTUFjTztBQUNILDRCQUFJO0FBQ0Esb0NBQVEsUUFBUixDQUFpQixRQUFRLE9BQVIsSUFBbUIsU0FBcEM7QUFDQTtBQUNBLGlDQUFLLElBQUwsQ0FBVSxVQUFWLEVBQXNCLEVBQUMsVUFBVSxDQUFYLEVBQWMsT0FBTyxLQUFLLEtBQTFCLEVBQXRCO0FBQ0E7QUFDSCx5QkFMRCxDQUtFLE9BQU8sQ0FBUCxFQUFVO0FBQ1I7QUFDQSxpQ0FBSyxJQUFMLENBQVUsVUFBVixFQUFzQixFQUFDLFVBQVUsQ0FBWCxFQUFjLE9BQU8sS0FBSyxLQUExQixFQUF0QjtBQUNBLGdDQUFJLEtBQUssR0FBTCxDQUFTLFdBQVQsSUFBd0IsUUFBUSxXQUFwQyxFQUFnRDtBQUM1QztBQUNILDZCQUZELE1BRU87QUFDSCx5Q0FBUyxDQUFUO0FBQ0g7QUFDSjtBQUNKO0FBQ0osaUJBL0JNLEVBK0JKLElBL0JJLENBK0JDLFlBQU07QUFDVix5QkFBSyxJQUFMLENBQVUsVUFBVjtBQUNBO0FBQ0gsaUJBbENNLEVBa0NKLEtBbENJLENBa0NFLGFBQUs7QUFDVix5QkFBSyxJQUFMLENBQVUsT0FBVixFQUFtQixDQUFuQjtBQUNBLDJCQUFPLENBQVA7QUFDSCxpQkFyQ00sQ0FBUDtBQXNDSCxhQXpDTSxDQUFQO0FBMENIO0FBOUVMOztBQUFBO0FBQUEiLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFByb21pc2UgZnJvbSAnYmx1ZWJpcmQnO1xuaW1wb3J0IEFzeW5jIGZyb20gJ2FzeW5jJztcbmltcG9ydCB7RXZlbnRFbWl0dGVyfSBmcm9tICdldmVudHMnO1xuXG5jb25zdCBhc3luYyA9IFByb21pc2UucHJvbWlzaWZ5QWxsKEFzeW5jKTtcblxubW9kdWxlLmV4cG9ydHMgPSBjbGFzcyBCb290c3RyYXBwZXIgZXh0ZW5kcyBFdmVudEVtaXR0ZXIge1xuXG4gICAgLyoqXG4gICAgICogQHR5cGVkZWYge09iamVjdH0gQm9vdENoYWluRnJhZ21lbnRcbiAgICAgKiBAcHJvcGVydHkge0Jvb2xlYW59IHByb21pc2UgSWYgZmFsc2UsIGl0IG5lZWRzIHRvIGJlIHN5bmNcbiAgICAgKiBAcHJvcGVydHkge0Z1bmN0aW9ufSBmdW5jdGlvblxuICAgICAqIEBwcm9wZXJ0eSB7Kn0gcGF5bG9hZCBUaGUgcGF5bG9hZCBpcyB0aGUgZmlyc3QgYXJndWVtZW50IGZvciB0aGUgZnVuY3Rpb25cbiAgICAgKiBAcHJvcGVydHkge0Jvb2xlYW59IGlnbm9yZUVycm9yIERvbid0IHJlamVjdCBpZiBhIGVycm9yIG9jY3VycywgYnV0IG9ubHkgZm9yIHRoaXMgZnJhZ21lbnRcbiAgICAgKi9cblxuICAgIC8qKlxuICAgICAqIEB0eXBlZGVmIHtPYmplY3R9IEJvb3RzdHJhcHBlckNvbmZpZ1xuICAgICAqIEBwcm9wZXJ0eSB7Qm9vbGVhbn0gaWdub3JlRXJyb3IgRG9uJ3QgcmVqZWN0IGlmIGEgZXJyb3Igb2NjdXJzXG4gICAgICogQHByb3BlcnR5IHtCb290Q2hhaW5GcmFnbWVudH0gY2hhaW4gW11cbiAgICAgKi9cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtCb290c3RyYXBwZXJDb25maWd9IGJvb3RzdHJhcENGR1xuICAgICAqIEBwcm9wZXJ0eSB7UHJvbWlzZX0gcHJvbWlzZVxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKGJvb3RzdHJhcENGRykge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLmJvb3RfY2hhaW4gPSBib290c3RyYXBDRkcuY2hhaW47XG4gICAgICAgIHRoaXMuY2ZnID0gYm9vdHN0cmFwQ0ZHO1xuICAgICAgICB0aGlzLmNvdW50ID0gdGhpcy5ib290X2NoYWluLmxlbmd0aDtcbiAgICAgICAgdGhpcy5fZXhlY3V0ZSA9IHRoaXMuX2V4ZWN1dGUuYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5wcm9taXNlID0gdGhpcy5fZXhlY3V0ZSgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEByZXR1cm4ge1Byb21pc2V9XG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBfZXhlY3V0ZSgpe1xuICAgICAgICBjb25zdCBzZWxmID0gdGhpcztcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIHNlbGYuZW1pdCgnc3RhcnQnKTtcbiAgICAgICAgICAgIGxldCBjID0gMDtcbiAgICAgICAgICAgIHJldHVybiBhc3luYy5lYWNoU2VyaWVzQXN5bmModGhpcy5ib290X2NoYWluLCAoRnVuY0NGRywgQ2FsbGJhY2spID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoRnVuY0NGRy5wcm9taXNlKXtcbiAgICAgICAgICAgICAgICAgICAgRnVuY0NGRy5mdW5jdGlvbihGdW5jQ0ZHLnBheWxvYWQgfHwgdW5kZWZpbmVkKS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGMrKztcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuZW1pdCgncHJvZ3Jlc3MnLCB7ZmluaXNoZWQ6IGMsIGNvdW50OiBzZWxmLmNvdW50fSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBDYWxsYmFjaygpO1xuICAgICAgICAgICAgICAgICAgICB9KS5jYXRjaChlID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGMrKztcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuZW1pdCgncHJvZ3Jlc3MnLCB7ZmluaXNoZWQ6IGMsIGNvdW50OiBzZWxmLmNvdW50fSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoc2VsZi5jZmcuaWdub3JlRXJyb3IgfHwgRnVuY0NGRy5pZ25vcmVFcnJvcil7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgQ2FsbGJhY2soKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgQ2FsbGJhY2soZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBGdW5jQ0ZHLmZ1bmN0aW9uKEZ1bmNDRkcucGF5bG9hZCB8fCB1bmRlZmluZWQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYysrO1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5lbWl0KCdwcm9ncmVzcycsIHtmaW5pc2hlZDogYywgY291bnQ6IHNlbGYuY291bnR9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIENhbGxiYWNrKCk7XG4gICAgICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGMrKztcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuZW1pdCgncHJvZ3Jlc3MnLCB7ZmluaXNoZWQ6IGMsIGNvdW50OiBzZWxmLmNvdW50fSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoc2VsZi5jZmcuaWdub3JlRXJyb3IgfHwgRnVuY0NGRy5pZ25vcmVFcnJvcil7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgQ2FsbGJhY2soKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgQ2FsbGJhY2soZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICBzZWxmLmVtaXQoJ2ZpbmlzaGVkJyk7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICAgICAgfSkuY2F0Y2goZSA9PiB7XG4gICAgICAgICAgICAgICAgc2VsZi5lbWl0KCdlcnJvcicsIGUpO1xuICAgICAgICAgICAgICAgIHJlamVjdChlKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbn07XG4iXX0=