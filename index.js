const Promise = require('bluebird');
const Async = require('async');
const async = Promise.promisifyAll(Async);
const EventEmitter = require('events').EventEmitter;

module.exports = class Bootstrapper extends EventEmitter {

    constructor(bootstrapCFG) {
        super();
        this.boot_chain = bootstrapCFG.chain;
        this.cfg = bootstrapCFG;
        this.count = this.boot_chain.length;
        this._execute = this._execute.bind(this);
        this.promise = this._execute();
    }

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
