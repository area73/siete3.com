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

Let's see an example:

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

---

So now let's recap again about the idea of a functor. What is a functor and what a functor should have.

A functor will be mainly a container, and why do we want to do that?, well  containerizing (or wrapping) values is a fundamental design pattern in functional programming 
because it **guards direct access to the values** so they can be manipulated safely and immutably in your programs. 
```javascript
class Wrapper {

    constructor(value) { this._value = value; }

    toString() { return 'Wrapper (' + this._value + ')'; }

}

// wrap :: A -> Wrapper(A)
const wrap = (val) => new Wrapper(val);
wrap("Hello Muzzy").toString();  // -> Wrapper (Hellow Muzzy)

```


Now that we have a container for our values we need something to operate those values , because accessing a wrapped value can only be done by **mapping an operation to its container**.

So a functor must be a wrapped object and a function to **map** over the values, in functional world they use to call this function **map** or **fmap**

```javascript
class Wrapper {

    constructor(value) { this._value = value; }
    toString() { return 'Wrapper (' + this._value + ')'; }

    // map :: (A -> B) -> A -> B 
    map(fn) { 
        return fn(this._value); 
    }; 
}
// wrap :: A -> Wrapper(A)
const wrap = (val) => new Wrapper(val);
wrap("Hello Muzzy").toString();  // -> Wrapper (Hellow Muzzy)
wrap("Hello Muzzy").map(item => item.toUpperCase())   // --> HELLOW MUZZY

```

In the above example we are mapping over the value but the problem is that we are returning the value transformed already , witch is ok but we cannot chain any thing else withing this container
and we loose the ability to box our data because we exit our "safe container".

So maybe a good idea will be to return the mapped result into a new wrapper instead of returning only the result. So we change our function map into an **fmap**

```javascript
class Wrapper {

    constructor(value) { this._value = value; }
    toString() { return 'Wrapper (' + this._value + ')'; }

    // fmap :: (A -> B) -> Wrapper[A] -> Wrapper[B] 
    fmap(fn) { 
        return new Wrapper(fn(this._value)); 
    }; 
}
// wrap :: A -> Wrapper(A)
const wrap = (val) => new Wrapper(val);
wrap("Hello Muzzy").toString();  // -> Wrapper (Hellow Muzzy)
wrap("Hello Muzzy").fmap(item => item.toUpperCase())  // --> Wrapper { _value: 'HELLO MUZZY' }
```

So now we are returning a new Wrapper object with the value transformed after applying the mapped function (toUpperCase).

fmap knows how to apply functions to values wrapped in a context. It first opens the container, 
then applies the given function to its value, and finally closes the value back into a new container of the **same type**. 

This allows us to chain more actions within our wrapped value.

So imagine that we want to upper case and then split words into an array, we could easily do:

```javascript
class Wrapper {

    constructor(value) { this._value = value; }
    toString() { return 'Wrapper (' + this._value + ')'; }

    // fmap :: (A -> B) -> Wrapper[A] -> Wrapper[B] 
    fmap(fn) { 
        return new Wrapper(fn(this._value)); 
    }; 
}
// wrap :: A -> Wrapper(A)
const wrap = (val) => new Wrapper(val);

wrap("Hello Muzzy")
    .fmap(item => item.toUpperCase())
    .fmap(item => item.split(" ")) // -->  Wrapper { _value: [ 'HELLO', 'MUZZY' ] } 
``` 

Then after having an fmap function that returns the same type object we can also state that a functor will follow these two rules:

1) **Preserves identity**
```javascript
    object.fmap(x => x) ≍ object
``` 

2) **Composable**
```javascript
    object.fmap(compose(f, g)) ≍ object.fmap(g).fmap(f)
``` 
<br>

An finally we can say then that an object will be a functor if it fulfills these rules:
**1) It is a wrapper object to contain our data**<br>
**2) had a map function to iterate over its own data**<br>
**3) preserves identity**<br>
**4) can be composable**<br><br>

<hr>



<br><br>
Bibliogrphy:<br>

* Functional Programming in JavaScript . Ed: MANNING SHELTER ISLAND. Author: Luis Atencio.<br>
* [Mostly Adequate Guide to functional programming](https://drboolean.gitbooks
.io/mostly-adequate-guide-old/content/). 
Professor Frisby's<br>
