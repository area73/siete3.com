---
title: "Hindley-Milner Notation"
date: 2019-04-11
tags: ["notation", "hindley-Milner","currying"]
categories: ["Functional"]
draft: false
---

# The Hindley-Milner notation
---

A way to create a notation to express  what types of parameter a function takes, and what it returns.


### The basic

A function that takes a primary value ("old type" like string, number, boolean, array, function...) and returns another primary value:


`instruction :: String -> String`
```javascript
const instruction = function(verb) {
    return verb + ' me';
}
```
the function instruction takes a string and return a string

You could also do something like:

`length :: String → Number`

```javascript
    const length = function(s){
        return s.length;  
    } 
```

In the case of an array of numbers:

`length :: [Number] → Number`
```javascript
    const length = function(arr){
        retrun arr.length  
    } 
```

### Working with functions
In the case of a function, we wrap our function in parenthesis and inside the parenthesis we have our input type and our output type:

`addOneToAll :: ((Number → Number),[Number]) → [Number]`
```javascript
    const addOne = function(x) {
        return x + 1;    
    }    
    const addOneToAll = (addOne , arr) => arr.map(addOne);    
```
In this case we have a function call addOneToAll that expects as first parameter a function (in our case addOne) and this function will accept a number and returns a nunmber.
And as a second parameter an array of numers and will return another array of numbers.


### Currying functions

Now what about a function that returns a function that returns another function ....

Following above we will have something like this:
`replace :: String -> (String -> (String -> String))`
```javascript
var replace = curry(function(find, replacement, str) {
    var regex = new RegExp(find, 'g');
    return str.replace(regex, replacement);
});
```
In this case we also curryfy the function in order to take parameters one by one 

And in functional programming we can  assuming that everything is curried, so we tend to drop the brackets and something like this:
                                                
` replace :: String -> String -> String -> String`

### Working with functions that takes multiple parameters as input (Hindley-Milner’s Arbitrary Variables)

We show the example with the length function were we could have:
`length :: [Number] → Number`
or
`length :: string → Number`

In this case we could write both with an arbitrary variable like:
`length :: [a] → Number`

Another common example is the identity:
`identity :: a -> a`

And a more complex example:
`map :: (a -> b) -> [a] -> [b]`
```javascript
    const  map = curry(function(callback, array) {
        return array.map(callback);
    });
```
The map function  takes a function that takes a variable of type `a` and returns a variable of type `b`.
 Then takes an **array of values**, all type `a`, and returns an **array of values**, all type `b`.

<br><br>
# Working with Ramda
---

### Parametrized Types

 We can easily imagine a type representing a collection of similar items, 
 let's call it a Box. But no instance is an arbitrary Box; each one can only hold one sort of item. 

`makeBox :: Number -> Number -> Number -> [a] -> Box a`
```javascript
  const makeBox = curry((height, width, depth, items) => /* ... */);
```

### Type Aliases
 If we had a parameterized type User String, where the String was meant to represent a name, and we wanted to be more specific about the type of String that is represented when generating a URL, we could create a type alias like this:

`toUrl :: User Name u => Url -> u -> Url`
 
 `Name = String`
 
 ` Url = String`
 
```javascript
const toUrl = curry((base, user) => base +
user.name.toLowerCase().replace(/\W/g, '-'));
toUrl('http://example.com/users/', {name: 'Fred Flintstone', age: 24});
//=> 'http://example.com/users/fred-flintstone'
```

### Type constrains [Ord]

Sometimes we want to restrict the generic types we can use in a signature in some way or another

We might want a maximum function that can operate on Numbers, on Strings, on Dates, but not on arbitrary Objects.

We want to describe ordered types, ones for which **a < b will always return a meaningful result**

`maximum :: Ord a => [a] -> a`

```javascript
    const maximum = vals => reduce((curr, next) => next > curr ? next : curr, head(vals), tail(vals));
    maximum([3, 1, 4, 1]); //=> 4
    maximum(['foo', 'bar', 'baz', 'qux', 'quux']); //=> 'qux'
    maximum( [new Date('1867-07-01'),  new Date('1810-09-16'), new Date('1776-07-04')]); //=> new Date("1867-07-01")
```
`Ord a ⇒ [a] → a` says that maximum takes a collection of elements of some type, but that type must adhere to Ord.

In JS, there's no way to guarantee that the user will not pass us [1, 2, 'a', false, undefined, null]. 
So our entire type annotation is **descriptive and aspirational** rather than compiler-enforced, as it would be in, say, Haskell.

### Multiple Signatures

Sometimes rather than trying to find the most generic version of a signature, it's more straightforward to list several related signatures separately. 
We could do that like bellow:

`getIndex :: a -> [a] -> Number`
`         :: String -> String -> Number`
```javascript
    const getIndex = curry((needle, haystack) => haystack.indexOf(needle));
    getIndex('ba', 'foobar'); //=> 3
    getIndex(42,  [7, 14, 21, 28, 35, 42, 49]); //=> 5
```

### Variadic Functions (specific to Ramda)

In Haskell, all functions have a fixed arity. But Javsacript has to deal with variadic functions.
`flip :: (a -> b -> ... -> z) -> (b -> a -> ... -> z)`
```javascript
    const flip = fn => function(b, a) {
      return fn.apply(this, [a, b].concat([].slice.call(arguments, 2))); 
    }; 
    flip((x, y, z) => x + y + z)('a', 'b', 'c'); //=> 'bac'
```

### Simple Objects
When an object is used as a dictionary of like-typed values (as opposed to its other role as a Record), then the types of the keys and the values can become relevant.
So we could represent them like this:
`keys :: {k: v} -> [k]`
`values :: {k: v} ->  [v]`
````javascript
    keys({a: 86, b: 75, c: 309}); //=> ['a', 'b', 'c']
    values({a: 86, b: 75, c: 309}); //=> [86, 75, 309]
````


### Complex example


`Lens s a -> (a -> a) -> s -> s`
`Lens s a = Functor f => (a -> f a) -> s -> f s`

We start with the type alias, Lens s a = Functor f ⇒ (a → f a) → s → f s. 
This tells us that the type Lens **is parameterized by two generic variables, s, and a**. 
We know that there is a constraint on the type of the f variable used in a Lens: **it must be a Functor**. 
With that in mind, we see that a Lens is a curried function of two parameters, the first being a function from 
a value of the generic type a to one of the parameterized type f a, and the second being a value of generic type s. 

**The result** is a value of the parameterized type f s. 


<br><br>
Bibliogrphy:<br>
[gentle introduction to functional javascript style](https://jrsinclair.com/articles/2016/gentle-introduction-to-functional-javascript-style/#hindley-milnertypesignatures)<br>
[function type signatures in Javascript](https://hackernoon.com/function-type-signatures-in-javascript-5c698c1e9801)<br>
[Type signatures in Ramda](https://github.com/ramda/ramda/wiki/Type-Signatures)<br>
