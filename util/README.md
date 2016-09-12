# @northbrook/util

> Utilities for Northbrook (or any node.js application)

# Get it

```sh
npm install @northbrook/util
```

# Documentation

## <a style="font-size: 80%; background-color: #5A2199 !important; padding: 6px; border-radius: 10px; color: #fff;" id="__">__ :: Object <p style="background-color: #BBB; font-size: 80%; float: right; padding: 6px; border-radius: 10px; max-width: 180px"> Function</p></a>
 

 A placeholder to be used inside of `partial()` 

 #### Example 

 ```js 

 import { __, partial }from '@northbrook/util' 

 const f = partial(sumOf3, [_, 2, _]) 

 f(1, 3) // 6 

 ``` 

---

## <a style="font-size: 80%; background-color: #5A2199 !important; padding: 6px; border-radius: 10px; color: #fff;" id="addPackage">* addPackage :: string ➞ object ➞ Stream&lt;object&gt; <p style="background-color: #BBB; font-size: 80%; float: right; padding: 6px; border-radius: 10px; max-width: 180px"> Northbrook</p></a>
 

 Adds a package to a northbrook.json. 

 #### Example 

 ```js 

 import { addPackage } from '@northbrook/util' 

 addPackage('packageName', {}).map(newConfigContents => {...}) 

 ``` 

---

## <a style="font-size: 80%; background-color: #5A2199 !important; padding: 6px; border-radius: 10px; color: #fff;" id="addPlugin ::">* addPlugin :: string ➞ object ➞ Stream&lt;object&gt; <p style="background-color: #BBB; font-size: 80%; float: right; padding: 6px; border-radius: 10px; max-width: 180px"> Northbrook</p></a>
 

 Adds a plugin to a northbrook.json. 

 #### Example 

 ```js 

 import { addPlugin } from '@northbrook/util' 

 addPlugin('pluginName', {}).map(newConfigContents => {...}) 

 ``` 

---

## <a style="font-size: 80%; background-color: #5A2199 !important; padding: 6px; border-radius: 10px; color: #fff;" id="all">* all :: (a ➞ boolean) ➞ [a] ➞ boolean <p style="background-color: #BBB; font-size: 80%; float: right; padding: 6px; border-radius: 10px; max-width: 180px"> Array</p></a>
 

 Checks the values of an array returning true if all items match a predicate 

 #### Example 

 ```js 

 import { all } from '@northbrook/util' 

 all(isEven, [2, 4, 6, 8])  // true 

 all(isEven, [2, 4, 6, 9]) // false 

 ``` 

---

## <a style="font-size: 80%; background-color: #5A2199 !important; padding: 6px; border-radius: 10px; color: #fff;" id="always">always :: a ➞ () ➞ a <p style="background-color: #BBB; font-size: 80%; float: right; padding: 6px; border-radius: 10px; max-width: 180px"> Function</p></a>
 

 Returns a function that will always return a given value 

 #### Example 

 ```js 

 import { always } from '@northbrook/util' 

 const always3 = always(3) 

 always3(999) // 3 

 ``` 

---

## <a style="font-size: 80%; background-color: #5A2199 !important; padding: 6px; border-radius: 10px; color: #fff;" id="and">and :: [...(a ➞ boolean)] ➞ a ➞ boolean <p style="background-color: #BBB; font-size: 80%; float: right; padding: 6px; border-radius: 10px; max-width: 180px"> Function</p></a>
 

 Checks values against many predicates returning true if *all* predicates return a truthy value 

 #### Example 

 ```js 

 import { and } from '@northbrook/util' 

 isOdd = x => x % 2 !== 0 

 isDivsibleBy5 = x => x % 5 === 0 

 const isOddBy5 = add(isOdd, isDivsible) 

 isOddBy5(10) // true 

 isOddBy5(13) // false 

 ``` 

---

## <a style="font-size: 80%; background-color: #5A2199 !important; padding: 6px; border-radius: 10px; color: #fff;" id="append">* append :: a ➞ [a] ➞ [a] <p style="background-color: #BBB; font-size: 80%; float: right; padding: 6px; border-radius: 10px; max-width: 180px"> Array</p></a>
 

 Creates an array appended by a value 

 #### Example: 

 ```js 

 import { append } from '@northbrook/util' 

 append(3, [1, 2]) // [1, 2, 3] 

 ``` 

---

## <a style="font-size: 80%; background-color: #5A2199 !important; padding: 6px; border-radius: 10px; color: #fff;" id="apply">* apply :: ([...⭑] ➞ ⭑) ➞ [⭑] ➞ ⭑ <p style="background-color: #BBB; font-size: 80%; float: right; padding: 6px; border-radius: 10px; max-width: 180px"> Function</p></a>
 

 Applys an array of arguments to a function 

 #### Example 

 ```js 

 import { apply } from '@northbrook/util' 

 apply(add, [1, 2])  // 3 

 ``` 

---

## <a style="font-size: 80%; background-color: #5A2199 !important; padding: 6px; border-radius: 10px; color: #fff;" id="beautify">beautify :: object ➞ string <p style="background-color: #BBB; font-size: 80%; float: right; padding: 6px; border-radius: 10px; max-width: 180px"> Object</p></a>
 

 Taks a JavaScript Object and returns a beautified string representation. 

 #### Example 

 ```js 

 import { beautify } from '@northbrook/util' 

 beautify({ a: 1}) // '{ "a": "1"}' 

 ``` 

---

## <a style="font-size: 80%; background-color: #5A2199 !important; padding: 6px; border-radius: 10px; color: #fff;" id="bind">* bind :: ⭑ ➞ ([...⭑] ➞ ⭑) ➞ ⭑ <p style="background-color: #BBB; font-size: 80%; float: right; padding: 6px; border-radius: 10px; max-width: 180px"> Function</p></a>
 

## <a id="NaN" style="font-size: 80%; background-color: #5A2199 !important; padding: 6px; border-radius: 10px; color: #fff;">* bind :: ⭑ ➞ ([...⭑] ➞ ⭑) ➞ [⭑] ➞ ⭑ </a>
 

 Binds a function to `this` value. Optionally binding arguments to the function for partial application 

 #### Example 

 ```js 

 import { bind } from '@northbrook/util' 

 const z = {} 

 const f = (x, y) ⇒ { 

   if(this === z) { // true 

     return x + y 

   } 

 } 

 const x = bind(z, f, [1]) 

 x(2) // 3 

 ``` 

---

## <a style="font-size: 80%; background-color: #5A2199 !important; padding: 6px; border-radius: 10px; color: #fff;" id="clear">clear :: () ➞ void <p style="background-color: #BBB; font-size: 80%; float: right; padding: 6px; border-radius: 10px; max-width: 180px"> Console</p></a>
 

 Clears the console 

 #### Example 

 ```js 

 import { clear } from '@northbrook/util' 

 clear() 

 ``` 

---

## <a style="font-size: 80%; background-color: #5A2199 !important; padding: 6px; border-radius: 10px; color: #fff;" id="colors">colors :: Object <p style="background-color: #BBB; font-size: 80%; float: right; padding: 6px; border-radius: 10px; max-width: 180px"> Console</p></a>
 

 An object containing many funtions to create colors inside of the console. 

 Visit [chalk's github for more info](https://github.com/chalk/chalk) on what is present. 

---

## <a style="font-size: 80%; background-color: #5A2199 !important; padding: 6px; border-radius: 10px; color: #fff;" id="compose">compose :: [...(⭑ ➞ ⭑)] ➞ (⭑ ➞ ⭑) <p style="background-color: #BBB; font-size: 80%; float: right; padding: 6px; border-radius: 10px; max-width: 180px"> Function</p></a>
 

 Composes many functions togther to form a pipeline 

 #### Example 

 ```js 

 import { compose } from '@northbrook/util' 

 compose(f, g)  // x => f(g(x)) 

 ``` 

---

## <a style="font-size: 80%; background-color: #5A2199 !important; padding: 6px; border-radius: 10px; color: #fff;" id="concat">* concat :: [a] ➞ [b] ➞ [a | b] <p style="background-color: #BBB; font-size: 80%; float: right; padding: 6px; border-radius: 10px; max-width: 180px"> Array</p></a>
 

 Concatenates together 2 arrays 

 #### Example 

 ```js 

 import { concat } from '@northbrook/util' 

 concat([1, 2], [3, 4])  // [1, 2, 3, 4] 

 ``` 

---

## <a style="font-size: 80%; background-color: #5A2199 !important; padding: 6px; border-radius: 10px; color: #fff;" id="cond">cond :: [ [ (...a ➞ boolean), b ] ] ➞ (...a ➞ b) <p style="background-color: #BBB; font-size: 80%; float: right; padding: 6px; border-radius: 10px; max-width: 180px"> Function</p></a>
 

 Given a sequence of conditions it returns a match 

 #### Example 

 ```js 

 import { cond, always } from '@northbrook/util' 

 const num = cond([ 

  [(x) => x === 0, 'Value is zero'], 

  [(x) => x === 1, 'Value is one'], 

  [always(true), 'Value is nothing interesting'] 

 ]) 

 num(0) // 'Value is zero' 

 num(1) // 'Value is one' 

 num(99) // 'Value is nothing interesting' 

 ``` 

---

## <a style="font-size: 80%; background-color: #5A2199 !important; padding: 6px; border-radius: 10px; color: #fff;" id="cons">* cons :: a ➞ [a] ➞ [a] <p style="background-color: #BBB; font-size: 80%; float: right; padding: 6px; border-radius: 10px; max-width: 180px"> Array</p></a>
 

 Creates an array prepended by a value 

 #### Example 

 ```js 

 import { cons } from '@northbrook/util' 

 cons(1, [2, 3]) // [1, 2, 3] 

 ``` 

---

## <a style="font-size: 80%; background-color: #5A2199 !important; padding: 6px; border-radius: 10px; color: #fff;" id="contains">* contains :: a ➞ [a] ➞ boolean <p style="background-color: #BBB; font-size: 80%; float: right; padding: 6px; border-radius: 10px; max-width: 180px"> Array</p></a>
 

 Returns true if an array contains a value `x` 

 #### Example 

 ```js 

 import { contains } from '@northbrook/util' 

 contains(3, [1, 2, 3])  // true 

 contains(4, [1, 2, 3]) // false 

 ``` 

---

## <a style="font-size: 80%; background-color: #5A2199 !important; padding: 6px; border-radius: 10px; color: #fff;" id="copy">copy :: [a] ➞ [a] <p style="background-color: #BBB; font-size: 80%; float: right; padding: 6px; border-radius: 10px; max-width: 180px"> Array</p></a>
 

 Creates an identical copy of an array without mutating the original 

 #### Example 

 ```js 

 import { copy } from '@northbrook/util' 

 copy([2, 3]) // [2, 3] 

 ``` 

---

## <a style="font-size: 80%; background-color: #5A2199 !important; padding: 6px; border-radius: 10px; color: #fff;" id="curry">curry :: (a ➞ b ➞ c) ➞ a ➞ b ➞ c <p style="background-color: #BBB; font-size: 80%; float: right; padding: 6px; border-radius: 10px; max-width: 180px"> Function</p></a>
 

## <a id="NaN" style="font-size: 80%; background-color: #5A2199 !important; padding: 6px; border-radius: 10px; color: #fff;">curry :: (a ➞ b ➞ c) ➞ int ➞ a ➞ b ➞ c </a>
 

 Curries your functions - optionally taking a arity parameter 

 #### Example 

 ```js 

 import { curry } from '@northbrook/util' 

 const add = (x, y) => x + y 

 const addc = curry(add) 

 const add1 = addc(1) 

 add1(2) // 3 

 ``` 

---

## <a style="font-size: 80%; background-color: #5A2199 !important; padding: 6px; border-radius: 10px; color: #fff;" id="drop">* drop :: number ➞ [a] ➞ [a] <p style="background-color: #BBB; font-size: 80%; float: right; padding: 6px; border-radius: 10px; max-width: 180px"> Array</p></a>
 

 Drops the first `n` number of values from an array 

 #### Example 

 ```js 

 import { drop } from '@northbrook/util' 

 drop(2, [1, 1, 2, 3]) // [2, 3] 

 ``` 

---

## <a style="font-size: 80%; background-color: #5A2199 !important; padding: 6px; border-radius: 10px; color: #fff;" id="each">* each :: (a, number ➞ ⭑) ➞ [a] ➞ [a] <p style="background-color: #BBB; font-size: 80%; float: right; padding: 6px; border-radius: 10px; max-width: 180px"> Array</p></a>
 

 Calls a function with each item in an array and returns the array it started with. 

 #### Example 

 ```js 

 import { each } from '@northbrook/util' 

 each((x, i) => console.log(x, i), [1, 2, 3]) 

 //  logs (1, 0), (2, 1), (3, 2) 

 ``` 

---

## <a style="font-size: 80%; background-color: #5A2199 !important; padding: 6px; border-radius: 10px; color: #fff;" id="exec">exec :: string ➞ Stream&lt;string&gt; <p style="background-color: #BBB; font-size: 80%; float: right; padding: 6px; border-radius: 10px; max-width: 180px"> Shell</p></a>
 

## <a id="NaN" style="font-size: 80%; background-color: #5A2199 !important; padding: 6px; border-radius: 10px; color: #fff;">exec :: string ➞ Object ➞ Stream&lt;string&gt; </a>
 

 Executes a command returning a stream of the result. 

 #### Example 

 ```js 

 import { exec } from '@northbrook/util' 

 exec('echo hello').map(result ⇒ {...}) 

 ``` 

---

## <a style="font-size: 80%; background-color: #5A2199 !important; padding: 6px; border-radius: 10px; color: #fff;" id="exec.many">exec.many :: [string] ➞ Stream&lt;string&gt; <p style="background-color: #BBB; font-size: 80%; float: right; padding: 6px; border-radius: 10px; max-width: 180px"> Shell</p></a>
 

 Executes many commands in succession to each other returning a Stream of the last commands output. 

 #### Example 

 ```js 

 import { exec } from '@northbrook/util' 

 exec.many(cmd1, cmd2).map(cmd2Result ⇒ {...}) 

 ``` 

---

## <a style="font-size: 80%; background-color: #5A2199 !important; padding: 6px; border-radius: 10px; color: #fff;" id="exists">exists :: string ➞ Stream&lt;Stats&gt; <p style="background-color: #BBB; font-size: 80%; float: right; padding: 6px; border-radius: 10px; max-width: 180px"> Node FS</p></a>
 

 Creates a Stream containing the output of fs.stat(pathname) 

 #### Example 

 ```js 

 // The path exists 

 exists('/home/user/file.js').observe((pathname) ⇒ { 

   console.log(pathname, ' exists!') 

 }) 

 // the path does not exists 

 exists('/home/user/someNonExistentFile.js').observe(f) 

   .catch(err ⇒ { console.error(err) }) 

 // recovering from an error 

 exists('/home/user/someNonExistentFile.js') 

   .recoverWith(err ⇒ { 

     // replace the error with a new stream 

     return just({ err }) 

   }) 

 ``` 

---

## <a style="font-size: 80%; background-color: #5A2199 !important; padding: 6px; border-radius: 10px; color: #fff;" id="figures">figures :: Object <p style="background-color: #BBB; font-size: 80%; float: right; padding: 6px; border-radius: 10px; max-width: 180px"> Console</p></a>
 

 An object containing unicode charaters for common symbols. 

 Visit [figures github page](https://github.com/sindresorhus/figures#figures) to see what figures are present 

---

## <a style="font-size: 80%; background-color: #5A2199 !important; padding: 6px; border-radius: 10px; color: #fff;" id="filter">* filter :: (a ➞ boolean) ➞ [a] ➞ [a] <p style="background-color: #BBB; font-size: 80%; float: right; padding: 6px; border-radius: 10px; max-width: 180px"> Array</p></a>
 

 Filters the array based on a given predicate 

 #### Example 

 ```js 

 import { filter } from '@northbrook/util' 

 filter(isEven, [1, 2, 3, 4])  // [2, 4] 

 ``` 

---

## <a style="font-size: 80%; background-color: #5A2199 !important; padding: 6px; border-radius: 10px; color: #fff;" id="filterDefaultPlugins">* filterDefaultPlugins :: [string] ➞ object ➞ object <p style="background-color: #BBB; font-size: 80%; float: right; padding: 6px; border-radius: 10px; max-width: 180px"> Northbrook</p></a>
 

 Given an array of defaults and a configuration object it 

 will filter any default object that should be ignored returning 

 a new configuration object without those defaults. 

 #### Example 

 ```js 

 import { filterDefaultPlugins } from '@northbrook/util' 

 filterDefaultPlugins(defaults, config)  // newConfig 

 ``` 

---

## <a style="font-size: 80%; background-color: #5A2199 !important; padding: 6px; border-radius: 10px; color: #fff;" id="filterScopes">filterScopes :: string ➞ string <p style="background-color: #BBB; font-size: 80%; float: right; padding: 6px; border-radius: 10px; max-width: 180px"> Node Packages</p></a>
 

 Removes a scope name from package name 

 #### Example 

 ```js 

 import { filterScopes } from '@northbrook/util' 

 filterScopes('@northbrook/util')  // 'util' 

 ``` 

---

## <a style="font-size: 80%; background-color: #5A2199 !important; padding: 6px; border-radius: 10px; color: #fff;" id="findConfig">findConfig :: string ➞ Stream&lt;Object&gt; <p style="background-color: #BBB; font-size: 80%; float: right; padding: 6px; border-radius: 10px; max-width: 180px"> Node FS</p></a>
 

## <a id="NaN" style="font-size: 80%; background-color: #5A2199 !important; padding: 6px; border-radius: 10px; color: #fff;">findConfig :: string ➞ Object ➞ Stream&lt;Object&gt; </a>
 

 Finds a configuration file 

 #### Example 

 ```js 

 import { findConfig } from '@northbrook/util' 

 findConfig('package.json').map(({ path, directory, config }) ⇒ { ... }) 

 ``` 

---

## <a style="font-size: 80%; background-color: #5A2199 !important; padding: 6px; border-radius: 10px; color: #fff;" id="findIndex">* findIndex :: a ➞ [a] ➞ number <p style="background-color: #BBB; font-size: 80%; float: right; padding: 6px; border-radius: 10px; max-width: 180px"> Array</p></a>
 

 Finds the index of `x` inside of array 

 #### Example 

 ```js 

 import { findIndex } from '@northbrook/util' 

 findIndex(1, [1, 2, 3]) // 0 

 ``` 

---

## <a style="font-size: 80%; background-color: #5A2199 !important; padding: 6px; border-radius: 10px; color: #fff;" id="flatten">flatten :: [[a] | a] ➞ [a] <p style="background-color: #BBB; font-size: 80%; float: right; padding: 6px; border-radius: 10px; max-width: 180px"> Array</p></a>
 

 Creates a 1 dimensional array from a multi-dimensional array 

 #### Example 

 ```js 

 import { flatten } from '@northbrook/util' 

 flatten([[1], [[2]], 3])  // [1, 2, 3] 

 ``` 

---

## <a style="font-size: 80%; background-color: #5A2199 !important; padding: 6px; border-radius: 10px; color: #fff;" id="flip">flip :: (a ➞ b ➞ c) ➞ (b ➞ a ➞ c) <p style="background-color: #BBB; font-size: 80%; float: right; padding: 6px; border-radius: 10px; max-width: 180px"> Function</p></a>
 

## <a id="NaN" style="font-size: 80%; background-color: #5A2199 !important; padding: 6px; border-radius: 10px; color: #fff;">flip :: (a ➞ b ➞ c ➞ d) ➞ (c ➞ b ➞ a ➞ d) </a>
 

 Flips your argument order 

---

## <a style="font-size: 80%; background-color: #5A2199 !important; padding: 6px; border-radius: 10px; color: #fff;" id="getAllInDirectory">* getAllInDirectory :: string ➞ [string] <p style="background-color: #BBB; font-size: 80%; float: right; padding: 6px; border-radius: 10px; max-width: 180px"> Node FS</p></a>
 

## <a id="NaN" style="font-size: 80%; background-color: #5A2199 !important; padding: 6px; border-radius: 10px; color: #fff;">* getAllInDirectory :: string ➞ boolean ➞ [string] </a>
 

 Gets all of the files in a given directory recursively checking inside of the subdirectories. 

 #### Example 

 ```js 

 import { getAllInDirectory } from '@northbrook/util' 

 getAllInDirectory('/home/user', false)  // ['file1', 'file2'] 

 ``` 

---

## <a style="font-size: 80%; background-color: #5A2199 !important; padding: 6px; border-radius: 10px; color: #fff;" id="getPkg">getPkg :: string ➞ Object <p style="background-color: #BBB; font-size: 80%; float: right; padding: 6px; border-radius: 10px; max-width: 180px"> Node Packages</p></a>
 

 Requires a package.json from a given directory. 

 #### Example 

 ```js 

 import { getPkg } from '@northbrook/util' 

 getPkg('/path/to/directory containing package.json')  // { name: 'package', ...} 

 ``` 

---

## <a style="font-size: 80%; background-color: #5A2199 !important; padding: 6px; border-radius: 10px; color: #fff;" id="hasPkg">hasPkg :: string ➞ Stream&lt;string&gt; <p style="background-color: #BBB; font-size: 80%; float: right; padding: 6px; border-radius: 10px; max-width: 180px"> Node Packages</p></a>
 

 Returns a stream of the location to the package.json if it exists, or an errored stream if not. 

 #### Example 

 ```js 

 import { hasPkg } from '@northbrook/util' 

 hasPkg('/home/user/somePackage').map(pathToPackage ⇒ {...}) 

 ``` 

---

## <a style="font-size: 80%; background-color: #5A2199 !important; padding: 6px; border-radius: 10px; color: #fff;" id="id">id :: a ➞ a <p style="background-color: #BBB; font-size: 80%; float: right; padding: 6px; border-radius: 10px; max-width: 180px"> Function</p></a>
 

 Returns the value it is given 

 #### Example 

 ```js 

 import { id } from '@northbrook/util' 

 id(1)  // 1 

 ``` 

---

## <a style="font-size: 80%; background-color: #5A2199 !important; padding: 6px; border-radius: 10px; color: #fff;" id="ifElse">* ifElse :: (a ➞ boolean) ➞ (a ➞ b) ➞ (a ➞ b) ➞ a ➞ b <p style="background-color: #BBB; font-size: 80%; float: right; padding: 6px; border-radius: 10px; max-width: 180px"> Function</p></a>
 

 Declaratively define if else statements 

 #### Example 

 ```js 

 import { ifElse, id, map } from '@northbrook/util' 

 const sub1 = x => x - 1 

 const makeEvens = ifElse(isEven, id, sub1) 

 map(makeEvens, [1, 2, 3, 4]) // [0, 2, 2, 4] 

 ``` 

---

## <a style="font-size: 80%; background-color: #5A2199 !important; padding: 6px; border-radius: 10px; color: #fff;" id="is">* is :: string ➞ ⭑ ➞ boolean  <p style="background-color: #BBB; font-size: 80%; float: right; padding: 6px; border-radius: 10px; max-width: 180px"> Function</p></a>
 

## <a id="NaN" style="font-size: 80%; background-color: #5A2199 !important; padding: 6px; border-radius: 10px; color: #fff;">* is :: (⭑ ➞ ⭑) ➞ ⭑ ➞ boolean </a>
 

## <a id="NaN" style="font-size: 80%; background-color: #5A2199 !important; padding: 6px; border-radius: 10px; color: #fff;">* is :: ⭑ ➞ ⭑ ➞ boolean </a>
 

 Checks the equality of a value to different types. 

 When given a string as the first argument it will do a `typeof` check then equality if that fails. 

 If given a function it will first do an `instanceof` check then it will call the function. 

 Lastly it will attempt to do an equality check. 

 #### Example 

 ```js 

 import { is } from '@northbrook/util' 

 is('string', 'hello')  // true 

 is(Class, new Class()) // true 

 is(3, 3) // true 

 is(x => x === 2, 2) // true 

 ``` 

---

## <a style="font-size: 80%; background-color: #5A2199 !important; padding: 6px; border-radius: 10px; color: #fff;" id="isArrayLike">isArrayLike :: ⭑ ➞ boolean <p style="background-color: #BBB; font-size: 80%; float: right; padding: 6px; border-radius: 10px; max-width: 180px"> any</p></a>
 

 Returns true if an only if given value is array-like 

 #### Example 

 ```js 

 import { isArrayLike } from '@northbrook/util' 

 isArrayLike(document.querySelectorAll('div')) // true 

 ``` 

---

## <a style="font-size: 80%; background-color: #5A2199 !important; padding: 6px; border-radius: 10px; color: #fff;" id="isDirectory">isDirectory :: string ➞ Stream&lt;string&gt; <p style="background-color: #BBB; font-size: 80%; float: right; padding: 6px; border-radius: 10px; max-width: 180px"> Node FS</p></a>
 

 Tests if an absolute path is a directory, returning the given pathname if it exists, erroring if it does not. 

 #### Example 

 ```js 

 import { isDirectory } from '@northbrook/util' 

 isDirectory('/home/usr/dir').observe(pathname ⇒ { 

   console.log(pathname + ' is a directory') 

 }) 

 isDirectory('/somewhere/nonexistent').observe(neverCalled) 

  .catch(err => { ... }) // do something with the error 

 ``` 

---

## <a style="font-size: 80%; background-color: #5A2199 !important; padding: 6px; border-radius: 10px; color: #fff;" id="isFile">isFile :: string ➞ Stream&lt;string&gt; <p style="background-color: #BBB; font-size: 80%; float: right; padding: 6px; border-radius: 10px; max-width: 180px"> Node FS</p></a>
 

 Returns a stream of the pathname, or an errored stream if it is not a file. 

 #### Example 

 ```js 

 import { isFile } from '@northbrook/util' 

 isFile('/path/to/package.json').map(pathname ⇒ { ... }) // do something knowing it is a file 

 isFile('/path/to/nowhere').recoverWith(err ⇒ { ... }) // do something with errror 

 ``` 

---

## <a style="font-size: 80%; background-color: #5A2199 !important; padding: 6px; border-radius: 10px; color: #fff;" id="isLink">isLink :: string ➞ Stream&lt;string&gt; <p style="background-color: #BBB; font-size: 80%; float: right; padding: 6px; border-radius: 10px; max-width: 180px"> Node FS</p></a>
 

 Returns a stream of the pathname provided if the path is to a symbolic link. 

 #### Example 

 ```js 

 import { isLink } from '@northbrook/util' 

 isLink('path/to/link').map(pathname ⇒ { ... }) // do something knowing it is a link 

 ``` 

---

## <a style="font-size: 80%; background-color: #5A2199 !important; padding: 6px; border-radius: 10px; color: #fff;" id="isPlugin">isPlugin :: ⭑ ➞ boolean <p style="background-color: #BBB; font-size: 80%; float: right; padding: 6px; border-radius: 10px; max-width: 180px"> Northbrook</p></a>
 

 Given an object it tells you whether or not it is a northbrook plugin object. 

 #### Example 

 ```js 

 import { isPlugin } from '@northbrook/util' 

 isPlugin({ plugin: (program, config, dir) => {...} })  // true 

 ``` 

---

## <a style="font-size: 80%; background-color: #5A2199 !important; padding: 6px; border-radius: 10px; color: #fff;" id="keys">keys :: object ➞ [string] <p style="background-color: #BBB; font-size: 80%; float: right; padding: 6px; border-radius: 10px; max-width: 180px"> Object</p></a>
 

 Returns an array of keys from a given object 

 #### Example 

 ```js 

 import { keys } from '@northbrook/util' 

 keys({ x: 1, y: 2 })  // ['x', 'y'] 

 ``` 

---

## <a style="font-size: 80%; background-color: #5A2199 !important; padding: 6px; border-radius: 10px; color: #fff;" id="length">length :: [a] ➞ number <p style="background-color: #BBB; font-size: 80%; float: right; padding: 6px; border-radius: 10px; max-width: 180px"> Array / String</p></a>
 

 Returns the length of an array 

 #### Example 

 ```js 

 import { length } from '@northbrook/util' 

 length([1, 2, 3])  // 3 

 ``` 

---

## <a style="font-size: 80%; background-color: #5A2199 !important; padding: 6px; border-radius: 10px; color: #fff;" id="list">list :: [Object] ➞ TaskList <p style="background-color: #BBB; font-size: 80%; float: right; padding: 6px; border-radius: 10px; max-width: 180px"> Shell</p></a>
 

## <a id="NaN" style="font-size: 80%; background-color: #5A2199 !important; padding: 6px; border-radius: 10px; color: #fff;">list :: [Object] ➞ object -&gt; TaskList </a>
 

 Creates a task list used for showing progress of tasks for the user. 

 #### Example 

 ```js 

 import { list, exec } from '@northbrook/util' 

 const tasks = list([{ 

   title: 'Foo', 

   task: () => exec('echo "foo"') 

 }]) 

 tasks.run() 

 ``` 

---

## <a style="font-size: 80%; background-color: #5A2199 !important; padding: 6px; border-radius: 10px; color: #fff;" id="listItem">* listItem :: string ➞ (() ➞ Stream&lt;⭑&gt; | Promise<⭑>) ➞ object <p style="background-color: #BBB; font-size: 80%; float: right; padding: 6px; border-radius: 10px; max-width: 180px"> Shell</p></a>
 

## <a id="NaN" style="font-size: 80%; background-color: #5A2199 !important; padding: 6px; border-radius: 10px; color: #fff;">* listItem :: string ➞ (() ➞ Stream&lt;⭑&gt; | Promise<⭑>) ➞ (() ➞ boolean) ➞ object </a>
 

 Creates a listItem to be used inside of a list. 

 #### Example 

 ```js 

 import { listItem } from '@northbrook/util' 

 listItem('Foo', () => exec('echo "foo"')) // { title: 'Foo', task: () => exec('echo "foo"'), skip: () => false } 

 ``` 

---

## <a style="font-size: 80%; background-color: #5A2199 !important; padding: 6px; border-radius: 10px; color: #fff;" id="log">log :: [...string] ➞ void <p style="background-color: #BBB; font-size: 80%; float: right; padding: 6px; border-radius: 10px; max-width: 180px"> Console</p></a>
 

 Prints to stdout with UTF-8 encoding and adds 4 space indentation to all newlines 

 #### Example 

 ```js 

 log('Hello', 'world') 

 // console will output 'Hello world' 

 ``` 

---

## <a style="font-size: 80%; background-color: #5A2199 !important; padding: 6px; border-radius: 10px; color: #fff;" id="map">* map :: (a ➞ b) ➞ [a] ➞ [b] <p style="background-color: #BBB; font-size: 80%; float: right; padding: 6px; border-radius: 10px; max-width: 180px"> Array</p></a>
 

 Creates a new array based on a previous 

 #### Example 

 ```js 

 import { map } from '@northbrook/util' 

 map((x) ⇒ x + 1, [1, 2, 3]) // [2, 3, 4] 

 ``` 

---

## <a style="font-size: 80%; background-color: #5A2199 !important; padding: 6px; border-radius: 10px; color: #fff;" id="merge">* merge :: object ➞ object ➞ object <p style="background-color: #BBB; font-size: 80%; float: right; padding: 6px; border-radius: 10px; max-width: 180px"> Object</p></a>
 

 Performs a deep merge of 2 objects 

 #### Example 

 ```js 

 import { merge } from '@northbrook/util' 

 merge({ x: 1 }, { y: 2 })  // { x: 1, y: 2 } 

 ``` 

---

## <a style="font-size: 80%; background-color: #5A2199 !important; padding: 6px; border-radius: 10px; color: #fff;" id="mergeMany">mergeMany :: [...object] ➞ object <p style="background-color: #BBB; font-size: 80%; float: right; padding: 6px; border-radius: 10px; max-width: 180px"> Object</p></a>
 

 Performs a deep merge of `n` number of objects 

 #### Example 

 ```js 

 import { merge } from '@northbrook/util' 

 merge({ x: 1 }, { y: 2 })  // { x: 1, y: 2 } 

 ``` 

---

## <a style="font-size: 80%; background-color: #5A2199 !important; padding: 6px; border-radius: 10px; color: #fff;" id="modOutput">modOutput :: string ➞ string <p style="background-color: #BBB; font-size: 80%; float: right; padding: 6px; border-radius: 10px; max-width: 180px"> String / Console</p></a>
 

 Adds an indent of 4 spaces to all new lines 

 #### Example 

 ```js 

 const x = modOutput('\nhi') 

 // x = '\n    hi' 

 ``` 

---

## <a style="font-size: 80%; background-color: #5A2199 !important; padding: 6px; border-radius: 10px; color: #fff;" id="modifyConfig">* modifyConfig :: string ➞ object ➞ (object ➞ object) ➞ Stream&lt;string&gt; <p style="background-color: #BBB; font-size: 80%; float: right; padding: 6px; border-radius: 10px; max-width: 180px"> Northbrook</p></a>
 

 Finds and modifies a configuration file. 

 #### Example 

 ```js 

 import { modifyConfig } from '@northbrook/util' 

 modifyConfig('northbrook.json', {}, (config => { 

   ... 

   return newConfig 

 })).map(newConfigContent => { ... }) 

 ``` 

---

## <a style="font-size: 80%; background-color: #5A2199 !important; padding: 6px; border-radius: 10px; color: #fff;" id="negate">negate :: (a ➞ b) ➞ (a ➞ !b) <p style="background-color: #BBB; font-size: 80%; float: right; padding: 6px; border-radius: 10px; max-width: 180px"> Function</p></a>
 

 Returns the oppostive value of a give function 

 #### Example 

 ```js 

 import { negate, alwayas } from '@northbrook/util' 

 negate(always(true))(9) // false 

 ``` 

---

## <a style="font-size: 80%; background-color: #5A2199 !important; padding: 6px; border-radius: 10px; color: #fff;" id="onlyPackage">* onlyPackage :: string ➞ [string] ➞ [string] <p style="background-color: #BBB; font-size: 80%; float: right; padding: 6px; border-radius: 10px; max-width: 180px"> Northbrook</p></a>
 

 Filters out a package for when only 1 package should be matched. 

 Very useful with command that have an `--only <packageName>` option. 

 #### Example 

 ```js 

 import { onlyPackage } from '@northbrook/util' 

 onlyPackage('packageToMatchName', config.packages) 

 ``` 

---

## <a style="font-size: 80%; background-color: #5A2199 !important; padding: 6px; border-radius: 10px; color: #fff;" id="or">or :: ([...(⭑ ➞ boolean)]) ➞ ⭑ ➞ boolean <p style="background-color: #BBB; font-size: 80%; float: right; padding: 6px; border-radius: 10px; max-width: 180px"> Function</p></a>
 

 Takes `n` number of predicates and returns true if any of the predicate return true. 

 #### Example 

 ```js 

 import { or } from '@northbrook/util' 

 or(isOdd, isEven)(2)  // true 

 or(isOdd, isEven)(3) // true 

 or(isOdd, isEven)(NaN) // false 

 ``` 

---

## <a style="font-size: 80%; background-color: #5A2199 !important; padding: 6px; border-radius: 10px; color: #fff;" id="partial">partial :: (a, b ➞ c) ➞ [a] ➞ (b ➞ c) <p style="background-color: #BBB; font-size: 80%; float: right; padding: 6px; border-radius: 10px; max-width: 180px"> Function</p></a>
 

## <a id="NaN" style="font-size: 80%; background-color: #5A2199 !important; padding: 6px; border-radius: 10px; color: #fff;">partial :: (a, b ➞ c) ➞ [ __, b] ➞ (a ➞ c) </a>
 

## <a id="NaN" style="font-size: 80%; background-color: #5A2199 !important; padding: 6px; border-radius: 10px; color: #fff;">partial :: ([...⭑] ➞ ⭑) ➞ [⭑] ➞ ([...⭑] ➞ ⭑) </a>
 

 Partially applies a function, currying it in the process. 

 #### Example 

 ```js 

 import { partial } from '@northbrook/util' 

 const f = partial(add, [1]) 

 f(2) // 3 

 ``` 

---

## <a style="font-size: 80%; background-color: #5A2199 !important; padding: 6px; border-radius: 10px; color: #fff;" id="pipe">pipe :: [...(⭑ ➞ ⭑)] ➞ (⭑ ➞ ⭑) <p style="background-color: #BBB; font-size: 80%; float: right; padding: 6px; border-radius: 10px; max-width: 180px"> Function</p></a>
 

 Pipes many functions together into a single pipeline 

 #### Example 

 ```js 

 import { pipe } from '@northbrook/util' 

 pipe(f, g)  // x => g(f(x)) 

 ``` 

---

## <a style="font-size: 80%; background-color: #5A2199 !important; padding: 6px; border-radius: 10px; color: #fff;" id="pluck">* pluck :: string ➞ object ➞ ⭑ <p style="background-color: #BBB; font-size: 80%; float: right; padding: 6px; border-radius: 10px; max-width: 180px"> Object</p></a>
 

## <a id="NaN" style="font-size: 80%; background-color: #5A2199 !important; padding: 6px; border-radius: 10px; color: #fff;">* pluck :: [string] ➞ object ➞ ⭑ </a>
 

 Find a property in an object 

 #### Example 

 ```js 

 import { pluck } from '@nortbrook/util' 

 pluck('foo', { foo: 'bar' }) // 'bar' 

 pluck(['foo', 'bar'], { foo: { bar: 1 } }) // 1 

 ``` 

---

## <a style="font-size: 80%; background-color: #5A2199 !important; padding: 6px; border-radius: 10px; color: #fff;" id="propEq">* propEq :: string ➞ a ➞ object ➞ boolean <p style="background-color: #BBB; font-size: 80%; float: right; padding: 6px; border-radius: 10px; max-width: 180px"> Object</p></a>
 

## <a id="NaN" style="font-size: 80%; background-color: #5A2199 !important; padding: 6px; border-radius: 10px; color: #fff;">* propEq :: [string] ➞ a ➞ object ➞ boolean </a>
 

 Checks equality of a object property and x 

 #### Example 

 ```js 

 import { propEq } from '@northbrook/util' 

 propEq('foo', 'bar', { foo: 'bar' }) // true 

 ``` 

---

## <a style="font-size: 80%; background-color: #5A2199 !important; padding: 6px; border-radius: 10px; color: #fff;" id="propOr">* propOr :: string ➞ ⭑ ➞ ⭑ <p style="background-color: #BBB; font-size: 80%; float: right; padding: 6px; border-radius: 10px; max-width: 180px"> Object</p></a>
 

## <a id="NaN" style="font-size: 80%; background-color: #5A2199 !important; padding: 6px; border-radius: 10px; color: #fff;">* propOr :: [string] ➞ ⭑ ➞ ⭑ </a>
 

 Finds a property on an object or returns a defined value. 

 #### Example 

 ```js 

 import { propOr } from '@northbrook/util' 

 propOr('foo', 3, { foo: 'bar'})  // 'bar' 

 propOr('foo', 3, {}) // 3 

 ``` 

---

## <a style="font-size: 80%; background-color: #5A2199 !important; padding: 6px; border-radius: 10px; color: #fff;" id="readFile">readFile :: string ➞ Stream&lt;string&gt; <p style="background-color: #BBB; font-size: 80%; float: right; padding: 6px; border-radius: 10px; max-width: 180px"> Node FS</p></a>
 

 Reads a file if it exists and returns the contents inside of a Stream 

 #### Example 

 ```js 

 import { readFile } from '@northbrook/util' 

 readFile('package.json').map(contents => { ... }) 

 ``` 

---

## <a style="font-size: 80%; background-color: #5A2199 !important; padding: 6px; border-radius: 10px; color: #fff;" id="reduce">* reduce :: (b ➞ a ➞ b) ➞ b ➞ [a] <p style="background-color: #BBB; font-size: 80%; float: right; padding: 6px; border-radius: 10px; max-width: 180px"> Array</p></a>
 

 Creates a value by iterating over the values of an array 

 #### Example 

 ```js 

 import { reduce } from '@northbrook/util' 

 const sum = (x, y) ⇒ x + y 

 const sumReduce = reduce(sum, 0) 

 sumReduce([1, 2, 3, 4]) // 10 

 ``` 

---

## <a style="font-size: 80%; background-color: #5A2199 !important; padding: 6px; border-radius: 10px; color: #fff;" id="remove">* remove :: number ➞ [a] ➞ [a] <p style="background-color: #BBB; font-size: 80%; float: right; padding: 6px; border-radius: 10px; max-width: 180px"> Array</p></a>
 

 Remove an element at a given index 

 #### Example 

 ```js 

 import { remove } from '@northbrook/util' 

 remove(1, [1, 2, 3]) // [1, 3] 

 ``` 

---

## <a style="font-size: 80%; background-color: #5A2199 !important; padding: 6px; border-radius: 10px; color: #fff;" id="removeAll">* removeAll :: (a ➞ boolean) ➞ [a] ➞ [a] <p style="background-color: #BBB; font-size: 80%; float: right; padding: 6px; border-radius: 10px; max-width: 180px"> Array</p></a>
 

 Removes all elements matching a predicate 

 #### Example 

 ```js 

 import { removeAll } from '@northbrook/util' 

 removeAll(x ⇒ x % 2 === 0, [1, 2, 3, 4]) // [1, 3] 

 ``` 

---

## <a style="font-size: 80%; background-color: #5A2199 !important; padding: 6px; border-radius: 10px; color: #fff;" id="replace">* replace :: a ➞ number ➞ [a] <p style="background-color: #BBB; font-size: 80%; float: right; padding: 6px; border-radius: 10px; max-width: 180px"> Array / String</p></a>
 

 Replace an element at a given index 

 #### Example 

 ```js 

 import { replace } from '@northbrook/util' 

 replace(100, 3, [1, 2, 3]) // [1, 2, 100] 

 reaplce('*', '', '*hello*') // hello 

 ``` 

---

## <a style="font-size: 80%; background-color: #5A2199 !important; padding: 6px; border-radius: 10px; color: #fff;" id="resolveExtends">* resolveExtends :: string ➞ object ➞ Stream&lt;object&gt; <p style="background-color: #BBB; font-size: 80%; float: right; padding: 6px; border-radius: 10px; max-width: 180px"> Northbrook</p></a>
 

 Taking the directory in which to look from, and an existing northbrook.json object, it will find any packages from the `extends` field, if it exists. 

 If it exists, it then return a Stream of the merged configurations, with the user defined configuration overriding an overlapping declarations. 

 #### Example 

 ```js 

 import { resolveExtends } from '@northbrook/util' 

 resolveExtends('/path/to/dir', northbrookConfig).map(({ packages }) => {...}) 

 ``` 

---

## <a style="font-size: 80%; background-color: #5A2199 !important; padding: 6px; border-radius: 10px; color: #fff;" id="resolvePackage">resolvePackage :: string ➞ Stream&lt;Object&gt; <p style="background-color: #BBB; font-size: 80%; float: right; padding: 6px; border-radius: 10px; max-width: 180px"> Northbrook</p></a>
 

## <a id="NaN" style="font-size: 80%; background-color: #5A2199 !important; padding: 6px; border-radius: 10px; color: #fff;">resolvePackage :: string ➞ (object ➞ boolean) ➞ Stream&lt;Object&gt; </a>
 

 Trys to require a package that is related to northbrook. First trying to require the package prefixed by `@nortbrook`, secondly by requiring the package prefixed by `northbrook-` and, lastly by requiring the package name directory. This will return a stream of the required package if it is found. 

 #### Example 

 ```js 

 import { resolvePackage } from '@northbrook/util' 

 resolvePackage('util')  // Stream<@northbrook/util> 

 ``` 

---

## <a style="font-size: 80%; background-color: #5A2199 !important; padding: 6px; border-radius: 10px; color: #fff;" id="resolvePackages ::">* resolvePackages :: string ➞ object ➞ Stream&lt;Object&gt; <p style="background-color: #BBB; font-size: 80%; float: right; padding: 6px; border-radius: 10px; max-width: 180px"> Northbrook</p></a>
 

 Taking a directory to work from and a northbrook config object returns a new config file with `packages: ["."]` if no packages are present in the config, or finds all packages that are in the config object if there is a `/**` wildcard folder present. Retuns a stream of the new config object. 

 #### Example 

 ```js 

 import { resolvePackages } from '@northbrook/util' 

 resolvePackages('/path/to/dir', northbrookConfig).map(config => {...}) 

 ``` 

---

## <a style="font-size: 80%; background-color: #5A2199 !important; padding: 6px; border-radius: 10px; color: #fff;" id="resolvePlugins ::">* resolvePlugins :: string ➞ object ➞ Stream&lt;Object&gt; <p style="background-color: #BBB; font-size: 80%; float: right; padding: 6px; border-radius: 10px; max-width: 180px"> Northbrook</p></a>
 

 Taking a directory to work from and a northbrook config object returning a new config file with all the plugins it could find. 

 #### Example 

 ```js 

 import { resolvePlugins } from '@northbrook/util' 

 resolvePlugins('/path/to/dir', northbrookConfig).map(config => {...}) 

 ``` 

---

## <a style="font-size: 80%; background-color: #5A2199 !important; padding: 6px; border-radius: 10px; color: #fff;" id="reverse">reverse :: [a] ➞ [a] <p style="background-color: #BBB; font-size: 80%; float: right; padding: 6px; border-radius: 10px; max-width: 180px"> Array</p></a>
 

 Returns an array in the opposite order of which it was given 

 #### Example 

 ```js 

 import { reverse } from '@northbrook/util' 

 reverse([1, 2, 3])  // [3, 2, 1] 

 ``` 

---

## <a style="font-size: 80%; background-color: #5A2199 !important; padding: 6px; border-radius: 10px; color: #fff;" id="separator">separator :: () ➞ string <p style="background-color: #BBB; font-size: 80%; float: right; padding: 6px; border-radius: 10px; max-width: 180px"> String / Console</p></a>
 

## <a id="NaN" style="font-size: 80%; background-color: #5A2199 !important; padding: 6px; border-radius: 10px; color: #fff;">separator :: string ➞ string </a>
 

 Returns 80 character wide string used to log a separation between outputs 

 #### Example: 

 ```js 

 log(separator('hello')) 

 // '##----------------------------------hello------------------------------------##' 

 ``` 

---

## <a style="font-size: 80%; background-color: #5A2199 !important; padding: 6px; border-radius: 10px; color: #fff;" id="set">* set :: string ➞ ⭑ ➞ object ➞ object <p style="background-color: #BBB; font-size: 80%; float: right; padding: 6px; border-radius: 10px; max-width: 180px"> Object</p></a>
 

## <a id="NaN" style="font-size: 80%; background-color: #5A2199 !important; padding: 6px; border-radius: 10px; color: #fff;">* set :: [string] ➞ ⭑ ➞ object ➞ object </a>
 

 Sets a property on an object 

 #### Example 

 ```js 

 import { set } from '@northbrook/util' 

 set('foo', 'bar', {})  // { foo: 'bar' } 

 ``` 

---

## <a style="font-size: 80%; background-color: #5A2199 !important; padding: 6px; border-radius: 10px; color: #fff;" id="some - Array">* some :: (a ➞ boolean) ➞ [a] ➞ boolean <p style="background-color: #BBB; font-size: 80%; float: right; padding: 6px; border-radius: 10px; max-width: 180px"> Array</p></a>
 

 Checks the values of an array and returns true if at least 1 item matches the given predicate 

 #### Example 

 ```js 

 import { some } from '@northbrook/util' 

 some(isEven, [1, 3, 5, 6])  // true 

 ``` 

---

## <a style="font-size: 80%; background-color: #5A2199 !important; padding: 6px; border-radius: 10px; color: #fff;" id="split">* split :: string ➞ string ➞ [string] <p style="background-color: #BBB; font-size: 80%; float: right; padding: 6px; border-radius: 10px; max-width: 180px"> String</p></a>
 

 Splits a string at a given point 

 #### Example 

 ```js 

 import { split } from '@northbrook/util' 

 split('x', 'helxlo')  // ['hel', 'lo'] 

 ``` 

---

 splitVersion ➞ string ➞ [number] - Node Packages 

 Splits a semvar number in an array of 3 parts 

 #### Example 

 ```js 

 import { splitVersion } from '@northbrook/util' 

 splitVersion('1.2.3') // [1, 2, 3] 

 ``` 

---

## <a style="font-size: 80%; background-color: #5A2199 !important; padding: 6px; border-radius: 10px; color: #fff;" id="symlink">* symlink :: string ➞ string ➞ Stream&lt;Object&gt; <p style="background-color: #BBB; font-size: 80%; float: right; padding: 6px; border-radius: 10px; max-width: 180px"> Node FS</p></a>
 

 Creates a symlink from a given source to a given destination 

 #### Example 

 ```js 

 import { symlink } from '@northbrook/util' 

 symlink(source, destination).map(({ src, dest }) ⇒ { ... }) 

 ``` 

---

## <a style="font-size: 80%; background-color: #5A2199 !important; padding: 6px; border-radius: 10px; color: #fff;" id="tail">tail :: [a] ➞ [a] <p style="background-color: #BBB; font-size: 80%; float: right; padding: 6px; border-radius: 10px; max-width: 180px"> Array</p></a>
 

 Retuns an array without it's first item 

 #### Example 

 ```js 

 import { tail } from '@northbrook/util' 

 tail([1, 2, 3])  // [2, 3] 

 ``` 

---

## <a style="font-size: 80%; background-color: #5A2199 !important; padding: 6px; border-radius: 10px; color: #fff;" id="trim">trim :: string ➞ string <p style="background-color: #BBB; font-size: 80%; float: right; padding: 6px; border-radius: 10px; max-width: 180px"> string</p></a>
 

 Trims any trailing whitespaces of a string 

 #### Example 

 ```js 

 import { trim } from '@northbrook/util' 

 trim('  hello  ') // 'hello' 

 ``` 

---

## <a style="font-size: 80%; background-color: #5A2199 !important; padding: 6px; border-radius: 10px; color: #fff;" id="tryRequire">tryRequire :: string ➞ Stream&lt;Object&gt; <p style="background-color: #BBB; font-size: 80%; float: right; padding: 6px; border-radius: 10px; max-width: 180px"> Node Packages</p></a>
 

## <a id="NaN" style="font-size: 80%; background-color: #5A2199 !important; padding: 6px; border-radius: 10px; color: #fff;">tryRequire :: string ➞ (object ➞ boolean) ➞ Stream&lt;Object&gt; </a>
 

 Trys to require a package returning a stream of the required package. Optionally taking a predicate function to check if a property matches what you need to require. 

 #### Example 

 ```js 

 import { tryRequire } from '@northbrook/util' 

 tryRequire('northbrook').map(pkg ⇒ {...}) 

 ``` 

---

## <a style="font-size: 80%; background-color: #5A2199 !important; padding: 6px; border-radius: 10px; color: #fff;" id="uniq">uniq :: [a] ➞ [a] <p style="background-color: #BBB; font-size: 80%; float: right; padding: 6px; border-radius: 10px; max-width: 180px"> Array</p></a>
 

 Removes repeated values from an array using a basic `===` equality check. 

 #### Example 

 ```js 

 import { uniq } from '@northbrook/util' 

 uniq([1, 1, 2, 2, 3, 4])  // [1, 2, 3, 4] 

 ``` 

---

## <a style="font-size: 80%; background-color: #5A2199 !important; padding: 6px; border-radius: 10px; color: #fff;" id="uniqWith">* uniqWith :: (a ➞ ⭑) ➞ [a] ➞ [a] <p style="background-color: #BBB; font-size: 80%; float: right; padding: 6px; border-radius: 10px; max-width: 180px"> Array</p></a>
 

 Removes a repeated value using a user-defined equality check 

 #### Example 

 ```js 

 import { uniqWith } from '@northbrook/util' 

 uniqWith(JSON.stringify, [{a : 1}, {a : 1}])  // [{a : 1}] 

 ``` 

---

## <a style="font-size: 80%; background-color: #5A2199 !important; padding: 6px; border-radius: 10px; color: #fff;" id="values">values :: object ➞ [string] <p style="background-color: #BBB; font-size: 80%; float: right; padding: 6px; border-radius: 10px; max-width: 180px"> Object</p></a>
 

 Returns an array of values from a given object 

 #### Example 

 ```js 

 import { values } from '@northbrook/util' 

 values({ x: 1, y: 2 })  // [1, 2] 

 ``` 

---

## <a style="font-size: 80%; background-color: #5A2199 !important; padding: 6px; border-radius: 10px; color: #fff;" id="writeFile">* writeFile :: string ➞ string ➞ Stream&lt;string&gt; <p style="background-color: #BBB; font-size: 80%; float: right; padding: 6px; border-radius: 10px; max-width: 180px"> Node FS</p></a>
 

 Write contents to a file returning a stream of the written contents if successful. 

 #### Example 

 ```js 

 import { writeFile } from '@northbrook/util' 

 writeFile('path/to/file', data).map(contents ⇒ { ... }) // file has been written 

 ``` 

---

### Notes about function signatures

- All functions with `⭑` preceding their name are curried by default. It will
always be curried by its function length, unless it has an optional argument.
In which case a function has an optional argument, it will be curried to `n - 1`
meaning that if you need to use the optional argument it *must* be passed in as
as second argument to the last function call.

- All functions that have optional arugments are displayed with 2 function
signatures.

- All overloaded functions will display multiple function signatures as needed.

- `[...*]` is a representation of a spread operator that takes any type.
