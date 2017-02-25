'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Promise = require('bluebird');
var Async = require('async');
var async = Promise.promisifyAll(Async);
var EventEmitter = require('events').EventEmitter;

module.exports = function (_EventEmitter) {
    _inherits(Bootstrapper, _EventEmitter);

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

    _createClass(Bootstrapper, [{
        key: '_execute',
        value: function _execute() {
            var _this2 = this;

            var self = this;
            return new Promise(function (resolve, reject) {
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
}(EventEmitter);

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxJQUFNLFVBQVUsUUFBUSxVQUFSLENBQWhCO0FBQ0EsSUFBTSxRQUFRLFFBQVEsT0FBUixDQUFkO0FBQ0EsSUFBTSxRQUFRLFFBQVEsWUFBUixDQUFxQixLQUFyQixDQUFkO0FBQ0EsSUFBTSxlQUFlLFFBQVEsUUFBUixFQUFrQixZQUF2Qzs7QUFFQSxPQUFPLE9BQVA7QUFBQTs7QUFFSSwwQkFBWSxZQUFaLEVBQTBCO0FBQUE7O0FBQUE7O0FBRXRCLGNBQUssVUFBTCxHQUFrQixhQUFhLEtBQS9CO0FBQ0EsY0FBSyxHQUFMLEdBQVcsWUFBWDtBQUNBLGNBQUssS0FBTCxHQUFhLE1BQUssVUFBTCxDQUFnQixNQUE3QjtBQUNBLGNBQUssUUFBTCxHQUFnQixNQUFLLFFBQUwsQ0FBYyxJQUFkLE9BQWhCO0FBQ0EsY0FBSyxPQUFMLEdBQWUsTUFBSyxRQUFMLEVBQWY7QUFOc0I7QUFPekI7O0FBVEw7QUFBQTtBQUFBLG1DQVdjO0FBQUE7O0FBQ04sZ0JBQU0sT0FBTyxJQUFiO0FBQ0EsbUJBQU8sSUFBSSxPQUFKLENBQVksVUFBQyxPQUFELEVBQVUsTUFBVixFQUFxQjtBQUNwQyxxQkFBSyxJQUFMLENBQVUsT0FBVjtBQUNBLG9CQUFJLElBQUksQ0FBUjtBQUNBLHVCQUFPLE1BQU0sZUFBTixDQUFzQixPQUFLLFVBQTNCLEVBQXVDLFVBQUMsT0FBRCxFQUFVLFFBQVYsRUFBdUI7QUFDakUsd0JBQUksUUFBUSxPQUFaLEVBQW9CO0FBQ2hCLGdDQUFRLFFBQVIsQ0FBaUIsUUFBUSxPQUFSLElBQW1CLFNBQXBDLEVBQStDLElBQS9DLENBQW9ELFlBQU07QUFDdEQ7QUFDQSxpQ0FBSyxJQUFMLENBQVUsVUFBVixFQUFzQixFQUFDLFVBQVUsQ0FBWCxFQUFjLE9BQU8sS0FBSyxLQUExQixFQUF0QjtBQUNBO0FBQ0gseUJBSkQsRUFJRyxLQUpILENBSVMsYUFBSztBQUNWO0FBQ0EsaUNBQUssSUFBTCxDQUFVLFVBQVYsRUFBc0IsRUFBQyxVQUFVLENBQVgsRUFBYyxPQUFPLEtBQUssS0FBMUIsRUFBdEI7QUFDQSxnQ0FBSSxLQUFLLEdBQUwsQ0FBUyxXQUFULElBQXdCLFFBQVEsV0FBcEMsRUFBZ0Q7QUFDNUM7QUFDSCw2QkFGRCxNQUVPO0FBQ0gseUNBQVMsQ0FBVDtBQUNIO0FBQ0oseUJBWkQ7QUFhSCxxQkFkRCxNQWNPO0FBQ0gsNEJBQUk7QUFDQSxvQ0FBUSxRQUFSLENBQWlCLFFBQVEsT0FBUixJQUFtQixTQUFwQztBQUNBO0FBQ0EsaUNBQUssSUFBTCxDQUFVLFVBQVYsRUFBc0IsRUFBQyxVQUFVLENBQVgsRUFBYyxPQUFPLEtBQUssS0FBMUIsRUFBdEI7QUFDQTtBQUNILHlCQUxELENBS0UsT0FBTyxDQUFQLEVBQVU7QUFDUjtBQUNBLGlDQUFLLElBQUwsQ0FBVSxVQUFWLEVBQXNCLEVBQUMsVUFBVSxDQUFYLEVBQWMsT0FBTyxLQUFLLEtBQTFCLEVBQXRCO0FBQ0EsZ0NBQUksS0FBSyxHQUFMLENBQVMsV0FBVCxJQUF3QixRQUFRLFdBQXBDLEVBQWdEO0FBQzVDO0FBQ0gsNkJBRkQsTUFFTztBQUNILHlDQUFTLENBQVQ7QUFDSDtBQUNKO0FBQ0o7QUFDSixpQkEvQk0sRUErQkosSUEvQkksQ0ErQkMsWUFBTTtBQUNWLHlCQUFLLElBQUwsQ0FBVSxVQUFWO0FBQ0E7QUFDSCxpQkFsQ00sRUFrQ0osS0FsQ0ksQ0FrQ0UsYUFBSztBQUNWLHlCQUFLLElBQUwsQ0FBVSxPQUFWLEVBQW1CLENBQW5CO0FBQ0EsMkJBQU8sQ0FBUDtBQUNILGlCQXJDTSxDQUFQO0FBc0NILGFBekNNLENBQVA7QUEwQ0g7QUF2REw7O0FBQUE7QUFBQSxFQUE0QyxZQUE1QyIsImZpbGUiOiJidW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBQcm9taXNlID0gcmVxdWlyZSgnYmx1ZWJpcmQnKTtcbmNvbnN0IEFzeW5jID0gcmVxdWlyZSgnYXN5bmMnKTtcbmNvbnN0IGFzeW5jID0gUHJvbWlzZS5wcm9taXNpZnlBbGwoQXN5bmMpO1xuY29uc3QgRXZlbnRFbWl0dGVyID0gcmVxdWlyZSgnZXZlbnRzJykuRXZlbnRFbWl0dGVyO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGNsYXNzIEJvb3RzdHJhcHBlciBleHRlbmRzIEV2ZW50RW1pdHRlciB7XG5cbiAgICBjb25zdHJ1Y3Rvcihib290c3RyYXBDRkcpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5ib290X2NoYWluID0gYm9vdHN0cmFwQ0ZHLmNoYWluO1xuICAgICAgICB0aGlzLmNmZyA9IGJvb3RzdHJhcENGRztcbiAgICAgICAgdGhpcy5jb3VudCA9IHRoaXMuYm9vdF9jaGFpbi5sZW5ndGg7XG4gICAgICAgIHRoaXMuX2V4ZWN1dGUgPSB0aGlzLl9leGVjdXRlLmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMucHJvbWlzZSA9IHRoaXMuX2V4ZWN1dGUoKTtcbiAgICB9XG5cbiAgICBfZXhlY3V0ZSgpe1xuICAgICAgICBjb25zdCBzZWxmID0gdGhpcztcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIHNlbGYuZW1pdCgnc3RhcnQnKTtcbiAgICAgICAgICAgIGxldCBjID0gMDtcbiAgICAgICAgICAgIHJldHVybiBhc3luYy5lYWNoU2VyaWVzQXN5bmModGhpcy5ib290X2NoYWluLCAoRnVuY0NGRywgQ2FsbGJhY2spID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoRnVuY0NGRy5wcm9taXNlKXtcbiAgICAgICAgICAgICAgICAgICAgRnVuY0NGRy5mdW5jdGlvbihGdW5jQ0ZHLnBheWxvYWQgfHwgdW5kZWZpbmVkKS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGMrKztcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuZW1pdCgncHJvZ3Jlc3MnLCB7ZmluaXNoZWQ6IGMsIGNvdW50OiBzZWxmLmNvdW50fSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBDYWxsYmFjaygpO1xuICAgICAgICAgICAgICAgICAgICB9KS5jYXRjaChlID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGMrKztcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuZW1pdCgncHJvZ3Jlc3MnLCB7ZmluaXNoZWQ6IGMsIGNvdW50OiBzZWxmLmNvdW50fSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoc2VsZi5jZmcuaWdub3JlRXJyb3IgfHwgRnVuY0NGRy5pZ25vcmVFcnJvcil7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgQ2FsbGJhY2soKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgQ2FsbGJhY2soZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBGdW5jQ0ZHLmZ1bmN0aW9uKEZ1bmNDRkcucGF5bG9hZCB8fCB1bmRlZmluZWQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYysrO1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5lbWl0KCdwcm9ncmVzcycsIHtmaW5pc2hlZDogYywgY291bnQ6IHNlbGYuY291bnR9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIENhbGxiYWNrKCk7XG4gICAgICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGMrKztcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuZW1pdCgncHJvZ3Jlc3MnLCB7ZmluaXNoZWQ6IGMsIGNvdW50OiBzZWxmLmNvdW50fSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoc2VsZi5jZmcuaWdub3JlRXJyb3IgfHwgRnVuY0NGRy5pZ25vcmVFcnJvcil7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgQ2FsbGJhY2soKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgQ2FsbGJhY2soZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICBzZWxmLmVtaXQoJ2ZpbmlzaGVkJyk7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICAgICAgfSkuY2F0Y2goZSA9PiB7XG4gICAgICAgICAgICAgICAgc2VsZi5lbWl0KCdlcnJvcicsIGUpO1xuICAgICAgICAgICAgICAgIHJlamVjdChlKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbn07XG4iXX0=