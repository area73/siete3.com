// Classic Mixins

const circleFns = {
  area: function() {
    return Math.PI * this.radius * this.radius;
  },
  grow: function() {
    this.radius++;
  },
  shrink: function() {
    this.radius--;
  }
};

const Circle = function(radius){
  this.radius = radius;
};

Circle.prototype = circleFns;

const myCircle = new Circle(22);

console.log(myCircle.radius);
console.log(myCircle.area());


