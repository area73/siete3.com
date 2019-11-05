---
title: "transducers"
date: 2019-01-01
tags: ["declarative", "Pure functions","Inmutable","currying", "functors", "transducers"]
categories: ["Functional"]
draft: true
---

# Transducers

The primary goal of transducers is to run a pipeline of transformations of an input stream of 
values **without creating intermediate values**. The functions describing computations are 
decoupled, so this makes program design cleaner and easier to develop and maintain.

A transducer is a function that accepts a transformer and returns a transformer and can be composed directly

Transducers can:
* Be Composable
* They only enumerates over the elements **onces** (very efficient for working with data streams)
* can be use for lazy or eager evaluation
* You can combine transducer to generate another transducer (High order reducers ¿?)


There are two strategies:

* Pull: lazy evaluation
* Push: eager evaluation

**Pull** waits until a consumer asks for the next value  (for example an Iterable)

**Push** enumerates over the source values and pushes them through the tubes ASAP (Array.reduce())

Transducers compose top to bottom (left to right)


**Example:**

Given an array of autobots we want to:
1) ﬁlter out values that don’t contain the letter ‘r',
2) uppercase
3) reverse each value

**First approach without a tranducer**
```javascript
const R = require('ramda') // Ramda functional library

let autobots = ['Optimus Prime','Bumblebee','Ironhide','Sunstreaker','Ratchet']

// Filter for autobots that contain 'r', uppercase, then reverse
let transform = R.compose(
  R.filter(x => /r/i.test(x)),
  R.map(R.toUpper),
  R.map(R.reverse)
)

transform(autobots)
// => [ 'EMIRP SUMITPO', 'EDIHNORI', 'REKAERTSNUS', 'TEHCTAR' ]
````

**Same approach with tranducer**
````javascript
const R = require('ramda') // Ramda functional library

let autobots = ['Optimus Prime','Bumblebee','Ironhide','Sunstreaker','Ratchet']

// Filter for autobots that contain 'r', uppercase, then reverse
let transform = R.compose(
  R.filter(x => /r/i.test(x)),
  R.map(R.toUpper),
  R.map(R.reverse)
)

transform(autobots)
// => [ 'EMIRP SUMITPO', 'EDIHNORI', 'REKAERTSNUS', 'TEHCTAR' ]
````
We get the same exact result (in this situation), but something very different and very powerful 
is happening under the hood. **In the first example, the entire list was transformed at each step
**. This means that we had to iterate over the list three times. However, **in the second example** 
where we used the transducer, **we only had to iterate over the list once!**


<br><br>
Bibliogrphy:<br>
* [effectfulJS](https://github.com/awto/effectfuljs/tree/master/packages/transducers)
* [Understanding Transducers in JavaScript](https://medium.com/@roman01la/understanding-transducers-in-javascript-3500d3bd9624)
* [MAGICAL, MYSTICAL JAVASCRIPT TRANSDUCERS](https://jrsinclair.com/articles/2019/magical-mystical-js-transducers/)
* [Transducers: Efficient Data Processing Pipelines in JavaScript](https://medium.com/javascript-scene/transducers-efficient-data-processing-pipelines-in-javascript-7985330fe73d). 

