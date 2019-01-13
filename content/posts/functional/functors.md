---
title: "programming functors"
date: 2019-01-01
tags: ["declarative", "Pure functions","Inmutable","currying"]
categories: ["Functional"]
draft: false
---

# Functors

<blockquote>
Functor is simply an interface with a contract. 
<br>We could have just as easily named it Mappable, but now, where's the fun in that?.
<br><i>Professor Frisby's</i>
</blockquote>

A functor is nothing more than a data structure that you can map functions with the purpose of
lifting values intro a wrapper, modifying them, and then putting them back into a wrapper.

It is a design pattern that defines semantics for how **fmap** should work

` fmap :: (A -> B) -> Wrapper(A) -> Wrapper(B)`

Lets see an example:

```javascript
// NOTE: we can't use arrow function if we are referencing this inside the function (no "new" for arrow functions)
var Container = function(x) {
  this.__value = x;
}

Container.of = function(x) { return new Container(x); };

Container.of(3); // => Contaier(3) === { "__value": 3 }
Container.of(Container.of("pepinillos")) ; // => Container(Container("pepinillos")) === { "__value": { "__value": "pepinillos" } }

```
* `Container` is an object with one property. 

* Lots of containers just hold one thing, though they aren't limited to one. 
We've arbitrarily named its property `__value`.

* The `__value` cannot be one specific type or our `container` would hardly live up to the name. 

* Once data goes into the `Container` it stays there. We could get it out by using `.__value` , but that would defeat the purpose.



<br><br>
Bibliogrphy:<br>

* Functional Programming in JavaScript . Ed: MANNING SHELTER ISLAND. Author: Luis Atencio.<br>
* [Mostly Adequate Guide to functional programming](https://drboolean.gitbooks
.io/mostly-adequate-guide-old/content/). 
Professor Frisby's<br>
