// Sistema completo de figuras geométricas

// Clase base abstracta
class FiguraGeometrica {
  constructor(nombre) {
    this.nombre = nombre;
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

// Clase Círculo
class Circulo extends FiguraGeometrica {
  constructor(radio) {
    super("Círculo");
    this.radio = radio;
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
}

// Clase Rectángulo
class Rectangulo extends FiguraGeometrica {
  constructor(ancho, alto) {
    super("Rectángulo");
    this.ancho = ancho;
    this.altura = alto;
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
}

// Clase Triángulo
class Triangulo extends FiguraGeometrica {
  constructor(base, altura) {
    super("Triángulo");
    this.base = base;
    this.altura = altura;
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

// Demostración completa del sistema
console.log("🚀 SISTEMA DE FIGURAS GEOMÉTRICAS CON POO\n");

// Crear figuras
const circulo = new Circulo(5);
const rectangulo = new Rectangulo(10, 8);
const cuadrado = new Rectangulo(6, 6);
const triangulo = new Triangulo(8, 6);

// Crear colección
const coleccion = new ColeccionFiguras();

// Agregar figuras (demuestra polimorfismo)
coleccion.agregar(circulo);
coleccion.agregar(rectangulo);
coleccion.agregar(cuadrado);
coleccion.agregar(triangulo);

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

// Métodos específicos
console.log(`\n🔍 FUNCIONES ESPECÍFICAS:`);
console.log(`Diámetro del círculo: ${circulo.calcularDiametro()}`);
console.log(`¿El cuadrado es cuadrado?: ${cuadrado.esCuadrado()}`);
console.log(
  `Hipotenusa del triángulo: ${triangulo.calcularHipotenusa().toFixed(2)}`
);

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

console.log("\n✅ Sistema POO completo implementado exitosamente!");
