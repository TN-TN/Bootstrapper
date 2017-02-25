# Bootstrapper
[![Build Status](https://travis-ci.org/TN-TN/Bootstrapper.svg?branch=master)](https://travis-ci.org/TN-TN/Bootstrapper)
A bootstrapper library


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
| chain | <code>[BootChainFragment](#BootChainFragment)</code> | [] |

