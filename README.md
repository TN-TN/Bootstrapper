# Bootstrapper
[![Coverage Status](https://coveralls.io/repos/github/TN-TN/Bootstrapper/badge.svg?branch=master)](https://coveralls.io/github/TN-TN/Bootstrapper?branch=master)
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

<a name="BootstrapperConfig"></a>

## BootstrapperConfig : <code>Object</code>
**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| ignoreError | <code>Boolean</code> | Don't reject if a error occurs |
| chain | <code>[BootChainFragment](#BootChainFragment)</code> | [] |

