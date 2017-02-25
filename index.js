import Promise from 'bluebird';
import Async from 'async';
import {EventEmitter} from 'events';

const async = Promise.promisifyAll(Async);

module.exports = class Bootstrapper extends EventEmitter {

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
    constructor(bootstrapCFG) {
        super();
        this.boot_chain = bootstrapCFG.chain;
        this.cfg = bootstrapCFG;
        this.count = this.boot_chain.length;
        this._execute = this._execute.bind(this);
        this.promise = this._execute();
    }

    /**
     * @return {Promise}
     * @private
     */
    _execute(){
        const self = this;
        return new Promise((resolve, reject) => {
            self.emit('start');
            let c = 0;
            return async.eachSeriesAsync(this.boot_chain, (FuncCFG, Callback) => {
                if (FuncCFG.promise){
                    FuncCFG.function(FuncCFG.payload || undefined).then(() => {
                        c++;
                        self.emit('progress', {finished: c, count: self.count});
                        Callback();
                    }).catch(e => {
                        c++;
                        self.emit('progress', {finished: c, count: self.count});
                        if (self.cfg.ignoreError || FuncCFG.ignoreError){
                            Callback();
                        } else {
                            Callback(e);
                        }
                    });
                } else {
                    try {
                        FuncCFG.function(FuncCFG.payload || undefined);
                        c++;
                        self.emit('progress', {finished: c, count: self.count});
                        Callback();
                    } catch (e) {
                        c++;
                        self.emit('progress', {finished: c, count: self.count});
                        if (self.cfg.ignoreError || FuncCFG.ignoreError){
                            Callback();
                        } else {
                            Callback(e);
                        }
                    }
                }
            }).then(() => {
                self.emit('finished');
                resolve();
            }).catch(e => {
                self.emit('error', e);
                reject(e);
            });
        });
    }

};
