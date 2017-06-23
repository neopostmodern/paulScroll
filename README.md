# PaulScroll.js

A flexible fullpage scroll-and-snap solution.

## Demo
[Here](https://neopostmodern.github.io/paulScroll/). 

## Testimonials
```text
I use this.
— Paul
```

## Usage
Drop this in your HTML, preferable at the end of the `body`.
```js
  <script src="paulScroll.js"></script>
  <script>
    window.addEventListener('load', function () {
      console.log('Get ready for some Paul!');
      PaulScroll('section');
    });
  </script>
```
You *can* change the animation duration by passing a second parameter, but 500 is a really nice number.