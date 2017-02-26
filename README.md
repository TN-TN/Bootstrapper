# Bootstrapper
[![Travis](https://img.shields.io/travis/TN-TN/Bootstrapper.svg?style=flat-square)](https://travis-ci.org/TN-TN/Bootstrapper)
[![npm](https://img.shields.io/npm/v/function-bootstrapper.svg?style=flat-square)](https://www.npmjs.com/package/function-bootstrapper)  
A bootstrapper library

Example ES6:
```javascript
import Bootstrapper from 'function-bootstrapper';
import Promise from 'bluebird';

const bootstrap = new Bootstrapper({
    ignoreError: true,
    chain: [
        {
            promise: true,
            payload: {
                "importantData": "Hello"  
            },
            function: function(payload) {
                return new Promise((resolve, reject) => {
                    doSomething(payload, (error) => {
                        if (error){
                            reject(error);
                        } else {
                            resolve();
                        }
                    });
                });
            }
        },
        {
            payload: '{"json":true}',
            function: function(payload){
                return JSON.parse(payload);
            }
        }
    ]
});

bootstrap.on('progress',console.log);
bootstrap.promise.then(() => {
    console.log("Finished bootstrap");
}).catch(console.error);
```

Example normal:  
```javascript
const Bootstrapper = require('function-bootstrapper');
const Promise = require('bluebird');

const bootstrap = new Bootstrapper({
    ignoreError: true,
    chain: [
        {
            promise: true,
            payload: {
                "importantData": "Hello"  
            },
            function: function(payload) {
                return new Promise(function (resolve, reject) {
                    doSomething(payload, (error) => {
                        if (error){
                            reject(error);
                        } else {
                            resolve();
                        }
                    });
                });
            }
        },
        {
            payload: '{"json":true}',
            function: function(payload){
                return JSON.parse(payload);
            }
        }
    ]
});

bootstrap.on('progress',console.log);
bootstrap.promise.then(function () {
    console.log("Finished bootstrap");
}).catch(console.error);
```


## Typedefs

<dl>
<dt><a href="#BootChainFragment">BootChainFragment</a> : <code>Object</code></dt>
<dd></dd>
<dt><a href="#BootstrapperConfig">BootstrapperConfig</a> : <code>Object</code></dt>
<dd></dd>
</dl>

<a name="BootChainFragment"></a>

## BootChainFragment : <code>Object</code>
**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| promise | <code>Boolean</code> | If false, it needs to be sync |
| function | <code>function</code> |  |
| payload | <code>\*</code> | The payload is the first arguement for the function |
| ignoreError | <code>Boolean</code> | Don't reject if a error occurs, but only for this fragment |
| pipeTo | <code>function</code> | This function will be executed after the main function finished. The first argument is the result of the function. |

<a name="BootstrapperConfig"></a>

## BootstrapperConfig : <code>Object</code>
**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| ignoreError | <code>Boolean</code> | Don't reject if a error occurs |
| parallel | <code>Boolean</code> | Run Bootchain parallel, how much operation parallel is defined with limit. You only need to define one property, parallel or limit. If not limit is set and parallel is true, cpu core count will be used. |
| limit | <code>int</code> | How much operation parallel. You only need to define one property, parallel or limit. If not limit is set and parallel is true, cpu core count will be used. |
| chain | <code>[BootChainFragment](#BootChainFragment)</code> | [] |

