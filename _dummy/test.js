
/*
  JavaScript no almacena el contenido de las propiedades dentro de los objetos, este sólo
   guarda el nombre de las propiedades, con referencias a donde están almacenados los valores.
*/


function Persona(nombre, edad, sexo, pasatiempos) {
  this.nombre = nombre;
  this.edad = edad;
  this.sexo = sexo;
  this.pasatiempos = pasatiempos;
  this.hablar = function() {
    return `hola soy ${this.nombre}, y tengo ${this.edad} años`;
  };
}

const camilo = new Persona('camilo', 22, 'masculino', ['patinar', 'bailar']);

const myFunc = camilo.hablar;

camilo.hablar = null;

console.log(camilo);
console.log(camilo.hablar); // null
console.log(myFunc); // function() {...}
console.log(myFunc()); // hola soy undefined, y tengo undefined años
