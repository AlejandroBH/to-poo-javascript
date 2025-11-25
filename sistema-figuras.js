// Sistema completo de figuras geométricas

// Clase base abstracta
class FiguraGeometrica {
  constructor(nombre) {
    this.nombre = Validacion.isString(nombre);
    this.#id = Math.random().toString(36).substr(2, 9);
  }

  // Propiedad privada
  #id;

  // Método abstracto (debe ser implementado por subclases)
  calcularArea() {
    throw new Error(
      "Método calcularArea debe ser implementado por la subclase"
    );
  }

  calcularPerimetro() {
    throw new Error(
      "Método calcularPerimetro debe ser implementado por la subclase"
    );
  }

  // Método común
  describir() {
    return `${this.nombre} - Área: ${this.calcularArea().toFixed(
      2
    )}, Perímetro: ${this.calcularPerimetro().toFixed(2)}`;
  }

  // Getter para ID
  get id() {
    return this.#id;
  }

  // Método estático
  static crearDesdeJSON(jsonString) {
    const data = JSON.parse(jsonString);
    switch (data.tipo) {
      case "circulo":
        return new Circulo(data.radio);
      case "rectangulo":
        return new Rectangulo(data.ancho, data.alto);
      case "triangulo":
        return new Triangulo(data.base, data.altura);
      default:
        throw new Error("Tipo de figura no reconocido");
    }
  }
}

// Factory pattern para crear diferentes tipos de figuras
function FabricaFiguras(tipo, ...datosBase) {
  switch (tipo) {
    case "circulo":
      const [radio] = datosBase;
      return new Circulo(radio);
    case "rectangulo":
      const [ancho, alto, largo = 0] = datosBase;
      return new Rectangulo(ancho, alto, largo);
    case "triangulo":
      const [base, altura] = datosBase;
      return new Triangulo(base, altura);
    case "pentagono":
      const [ladoPen] = datosBase;
      return new Pentagono(ladoPen);
    case "hexagono":
      const [ladoHex] = datosBase;
      return new Hexagono(ladoHex);
  }
}

// Clase Círculo
class Circulo extends FiguraGeometrica {
  constructor(radio) {
    super("Círculo");
    this.radio = Validacion.isNumber(radio);
  }

  calcularArea() {
    return Math.PI * this.radio * this.radio;
  }

  calcularPerimetro() {
    return 2 * Math.PI * this.radio;
  }

  // Método específico
  calcularDiametro() {
    return this.radio * 2;
  }

  // Método específico
  // Calcular volumen de círculo 3D
  calcularVolumen() {
    return (4 / 3) * Math.PI * Math.pow(this.radio, 3);
  }
}

// Clase Rectángulo
class Rectangulo extends FiguraGeometrica {
  constructor(ancho, alto, largo = 0) {
    super("Rectángulo");
    this.ancho = Validacion.isNumber(ancho);
    this.altura = Validacion.isNumber(alto);
    this.largo = Validacion.isNumber(largo);
  }

  calcularArea() {
    return this.ancho * this.altura;
  }

  calcularPerimetro() {
    return 2 * (this.ancho + this.altura);
  }

  // Método específico
  esCuadrado() {
    return this.ancho === this.altura;
  }

  // Método específico
  // Calcular volumen de rectángulo 3D
  calcularVolumen() {
    return this.largo * this.ancho * this.altura;
  }

  // Método específico
  dibujarFiguraASCII() {
    let resultado = "";

    for (let y = 0; y < this.altura; y++) {
      let fila = "";
      for (let x = 0; x < this.ancho; x++) {
        if (
          y === 0 ||
          y === this.altura - 1 ||
          x === 0 ||
          x === this.ancho - 1
        ) {
          fila += "# ";
        } else {
          fila += "# ";
        }
      }
      resultado += fila + "\n";
    }

    return resultado;
  }
}

// Clase Triángulo
class Triangulo extends FiguraGeometrica {
  constructor(base, altura) {
    super("Triángulo");
    this.base = Validacion.isNumber(base);
    this.altura = Validacion.isNumber(altura);
  }

  calcularArea() {
    return (this.base * this.altura) / 2;
  }

  calcularPerimetro() {
    // Para simplificar, asumimos triángulo equilátero
    return 3 * this.base;
  }

  // Método específico
  calcularHipotenusa() {
    // Para triángulo rectángulo isósceles
    return Math.sqrt(this.base * this.base + this.altura * this.altura);
  }
}

// Clase Pentágono
class Pentagono extends FiguraGeometrica {
  constructor(lado) {
    super("Pentágono");
    this.lado = Validacion.isNumber(lado);
  }

  calcularArea() {
    return (this.calcularPerimetro() * this.calcularApotema()) / 2;
  }

  calcularPerimetro() {
    return 5 * this.lado;
  }

  // Método específico
  calcularApotema() {
    return this.lado / (2 * Math.tan(Math.PI / 5));
  }

  // Método específico
  anguloInterior() {
    return (180 * (5 - 2)) / 5;
  }

  // Método específico
  anguloExterior() {
    return 360 / 5;
  }
}

// Clase Hexágono
class Hexagono extends FiguraGeometrica {
  constructor(lado) {
    if (Hexagono.instancia) {
      return Hexagono.instancia;
    }
    super("Hexágono");
    this.lado = Validacion.isNumber(lado);
    Hexagono.instancia = this;
  }

  calcularArea() {
    return (this.calcularPerimetro() * this.calcularApotema()) / 2;
  }

  calcularPerimetro() {
    return 6 * this.lado;
  }

  // Método específico
  calcularApotema() {
    return (this.lado * Math.sqrt(3)) / 2;
  }

  // Método específico
  anguloInterior() {
    return (180 * (6 - 2)) / 6;
  }

  // Método específico
  anguloExterior() {
    return 360 / 6;
  }
}

// Clase para gestionar colección de figuras
class ColeccionFiguras {
  constructor() {
    this.figuras = [];
  }

  agregar(figura) {
    if (figura instanceof FiguraGeometrica) {
      this.figuras.push(figura);
      return true;
    }
    return false;
  }

  // Método que demuestra polimorfismo
  listarFiguras() {
    console.log("=== COLECCIÓN DE FIGURAS ===");
    this.figuras.forEach((figura, index) => {
      console.log(`${index + 1}. ${figura.describir()}`);
    });
  }

  // Métodos que usan polimorfismo
  calcularAreaTotal() {
    return this.figuras.reduce(
      (total, figura) => total + figura.calcularArea(),
      0
    );
  }

  calcularPerimetroTotal() {
    return this.figuras.reduce(
      (total, figura) => total + figura.calcularPerimetro(),
      0
    );
  }

  // Método que filtra por tipo (usando polimorfismo)
  filtrarPorTipo(tipo) {
    return this.figuras.filter((figura) => figura.nombre === tipo);
  }

  // Método estático
  static compararAreas(figura1, figura2) {
    const area1 = figura1.calcularArea();
    const area2 = figura2.calcularArea();

    if (area1 > area2) {
      return `${figura1.nombre} es más grande que ${figura2.nombre}`;
    } else if (area1 < area2) {
      return `${figura2.nombre} es más grande que ${figura1.nombre}`;
    } else {
      return `Ambas figuras tienen la misma área`;
    }
  }
}

class Validacion {
  static isString(value) {
    if (typeof value !== "string")
      throw new TypeError(`${value}, no es un string`);

    return value;
  }

  static isNumber(value) {
    if (typeof value !== "number")
      throw new TypeError(`${value}, no es un number`);

    return value;
  }
}

// Demostración completa del sistema
console.log("🚀 SISTEMA DE FIGURAS GEOMÉTRICAS CON POO\n");

// Crear figuras
const circulo = new Circulo(5);
const rectangulo = new Rectangulo(10, 8);
const cuadrado = new Rectangulo(6, 6);
const triangulo = new Triangulo(8, 6);
const pentagono = new Pentagono(10);
const pentagono2 = new Pentagono(10);
const hexagono = new Hexagono(10);
const esfera = new Circulo(3);
const cubo = new Rectangulo(15, 15, 15);

console.log(pentagono.id);
console.log(pentagono2.id);

// Crear colección
const coleccion = new ColeccionFiguras();

// Agregar figuras (demuestra polimorfismo)
coleccion.agregar(circulo);
coleccion.agregar(rectangulo);
coleccion.agregar(cuadrado);
coleccion.agregar(triangulo);
coleccion.agregar(pentagono);
coleccion.agregar(hexagono);
coleccion.agregar(esfera);
coleccion.agregar(cubo);

// Listar todas las figuras
coleccion.listarFiguras();

// Calcular totales
console.log(`\n📊 Área total: ${coleccion.calcularAreaTotal().toFixed(2)}`);
console.log(
  `📏 Perímetro total: ${coleccion.calcularPerimetroTotal().toFixed(2)}`
);

// Filtrar por tipo
const rectangulos = coleccion.filtrarPorTipo("Rectángulo");
console.log(`\n📋 Rectángulos encontrados: ${rectangulos.length}`);

// Comparar áreas
console.log(`\n⚖️  ${ColeccionFiguras.compararAreas(circulo, rectangulo)}`);
console.log(`\n⚖️  ${ColeccionFiguras.compararAreas(pentagono, hexagono)}`);

// Métodos específicos
console.log(`\n🔍 FUNCIONES ESPECÍFICAS:`);
console.log(`Diámetro del círculo: ${circulo.calcularDiametro()}`);
console.log(`¿El cuadrado es cuadrado?: ${cuadrado.esCuadrado()}`);
console.log(
  `Hipotenusa del triángulo: ${triangulo.calcularHipotenusa().toFixed(2)}`
);
console.log(`Angulo interior de pentagono: ${pentagono.anguloInterior()}`);
console.log(`Angulo exterior de hexagono: ${hexagono.anguloExterior()}`);
console.log(`Volumen de la esfera: ${esfera.calcularVolumen()}`);
console.log(`Volumen del cubo: ${cubo.calcularVolumen()}`);

// Serialización (usando método estático)
const circuloJSON = JSON.stringify({
  tipo: "circulo",
  radio: 3,
});

const circuloDesdeJSON = FiguraGeometrica.crearDesdeJSON(circuloJSON);
console.log(`\n📦 Figura creada desde JSON: ${circuloDesdeJSON.describir()}`);

// Demostrar encapsulamiento
console.log(`\n🔒 ENCAPSULAMIENTO:`);
console.log(`ID del círculo: ${circulo.id}`);
// console.log(circulo.#id); // ❌ Error: Propiedad privada

console.log(`\n✏️  Dibujar figuras con caracteres ASCII:`);
console.log(cuadrado.dibujarFiguraASCII());
console.log(rectangulo.dibujarFiguraASCII());

console.log(`📋 Crear figuras con Factory Pattern:\n`);
const circuloByFactory = FabricaFiguras("circulo", 10);
const cuadradoByFactory = FabricaFiguras("rectangulo", 15, 15);
const trianguloByFactory = FabricaFiguras("triangulo", 5, 5);

const coleccionFactory = new ColeccionFiguras();
coleccionFactory.agregar(circuloByFactory);
coleccionFactory.agregar(cuadradoByFactory);
coleccionFactory.agregar(trianguloByFactory);

coleccionFactory.listarFiguras();

console.log(`\n📋 Pentagono con instancia unica (singleton):`);
const hexagono2 = new Hexagono(7);
const hexagono3 = new Hexagono(8);
const circulo2 = new Circulo(5);
const circulo3 = new Circulo(6);

console.log(
  "instancias de hexagono2 y hexagono3 son las mismas?",
  hexagono2.id === hexagono3.id ? "si" : "no"
);

console.log(
  "instancias de circulo2 y circulo3 son las mismas?",
  circulo2.id === circulo3.id ? "si" : "no"
);

console.log("\n✅ Sistema POO completo implementado exitosamente!");
