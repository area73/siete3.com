---
title: "IIFE - Iimmediatelly Invoked Function Expression"
date: 2018-01-14
tags: ["design patterns", "IIFE"]
categories: ["design patterns"]
draft: false
---
# IIFE - Iimmediatelly Invoked Function Expression

```javascript

    var foo = "foo1";

    (function() {
        var foo = "foo2";
        console.log(foo);  // foo2
    })();


    console.log(foo); // foo1

    // we can also write the above statement like:
    (function() {
        // code
    }());

```

We use IIFE in order to not pollute the global scope.

Bibliography: <br/ >
Ben Alman: [Immediately-Invoked Function Expression (IIFE)](http://benalman.com/news/2010/11/immediately-invoked-function-expression/)
