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
     * @property {Function} pipeTo This function will be executed after the main function finished. The first argument is the result of the function.
     */

    /**
     * @typedef {Object} BootstrapperConfig
     * @property {Boolean} ignoreError Don't reject if a error occurs
     * @property {Boolean} parallel Run Bootchain parallel, how much operation parallel is defined with limit. You only need to define one property, parallel or limit. If not limit is set and parallel is true, cpu core count will be used.
     * @property {int} limit How much operation parallel. You only need to define one property, parallel or limit. If not limit is set and parallel is true, cpu core count will be used.
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
        if (this.cfg.parallel || this.cfg.limit){
            this.limit = this.cfg.limit || require('os').cpus().length;
        } else {
            this.limit = 1;
        }
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
            return async.eachLimitAsync(self.boot_chain, self.limit,(FuncCFG, Callback) => {
                if (FuncCFG.promise){
                    FuncCFG.function(FuncCFG.payload || undefined).then((response) => {
                        if (FuncCFG.pipeTo && typeof FuncCFG.pipeTo == "function"){
                            FuncCFG.pipeTo(response);
                        }
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
                        const response = FuncCFG.function(FuncCFG.payload || undefined);
                        if (FuncCFG.pipeTo && typeof FuncCFG.pipeTo == "function"){
                            FuncCFG.pipeTo(response);
                        }
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
