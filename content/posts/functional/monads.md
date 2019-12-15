---
title: "monads"
date: 2019-11-11
tags: ["declarative", "Pure functions","Inmutable","currying", "functors"]
categories: ["Functional"]
draft: true
---

# Monads

So let's remember first what's a functor:

**1) It is a wrapper object to contain our data**<br>
**2) had a map function to iterate over its own data**<br>
**3) preserves identity**<br>
**4) can be composable**<br><br>

But functors by themselves aren’t compelling, because they’re not expected to 
know how to handle cases with **null data**. Ramda’s R.compose, for instance, 
will break if a null function reference is passed into it. This isn’t a flaw 
in the design; it’s intentional. 

Functors map functions of one type to another. 

More-specialized behavior can be found in functional data types called monads. 

Among other things, monads can streamline error handling in your code,allowing 
you to write fluent function compositions. 
 
What’s their relationship to functors? **Monads are the containers
 that functors “reach into.”**