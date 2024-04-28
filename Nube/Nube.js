import * as THREE from 'three'
import { CSG } from '../libs/CSG-v2.js'

class Nube extends THREE.Object3D {
  constructor(gui, titleGui) {
    super();

    // Se crea la parte de la interfaz que corresponde a la grapadora
    // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
    this.createGUI(gui, titleGui);

    // El material se usa desde varios métodos. Por eso se alamacena en un atributo
    // Material para la figura
    this.material = new THREE.MeshNormalMaterial({ flatShading: true, side: THREE.DoubleSide, transparent: false, opacity: 0.5 });
    // Poner transparente a true para ver el interior de la figura y ver si se va a hacer correctamente la resta

    // Material para la figura a restar
    this.materialSubtract = new THREE.MeshPhysicalMaterial({ color: 0x008000, flatShading: true, side: THREE.DoubleSide });


    // BASE

    // var figBaseShape = new THREE.Shape();
    // figBaseShape.moveTo(-3,0); //Punto inicio
    
    // figBaseShape.lineTo(0,-6);
    // figBaseShape.lineTo(3,0);
    // figBaseShape.lineTo(0,6);
    // figBaseShape.lineTo(-3,0);



    var nubeShape = new THREE.Shape();
    nubeShape.moveTo(-10, 3); // Punto de inicio

    
    nubeShape.quadraticCurveTo(-12, 1, -10, -1);
    nubeShape.quadraticCurveTo(-8, -3, -6, -1);
    nubeShape.quadraticCurveTo(-4, -3, -2, -1);
    nubeShape.quadraticCurveTo(0, -3, 2, -1);
    nubeShape.quadraticCurveTo(4, 1, 2, 3);
    nubeShape.quadraticCurveTo(0, 5, -2, 3);
    nubeShape.quadraticCurveTo(-4, 5, -6, 3);
    nubeShape.quadraticCurveTo(-8, 5, -10, 3);





    

    // nubeShape.quadraticCurveTo(2, 1, -2, 3);
    // nubeShape.quadraticCurveTo(-4, 5, -6, 3);
    // nubeShape.quadraticCurveTo(-8, 6, -12, 2);

    






    


    // figBaseShape.quadraticCurveTo(0, 0, 0, 0);
    // Dibujar Shape

    
    // En caso de que haya más agujeros añadirlos de lo misma forma

    const extrudeSettings = {
      steps: 5, // Número de divisiones a lo largo de la extrusión    RALENTIZA MUCHO
      depth: 1, // Profundidad de la extrusión  (Anchura de la figura)
      bevelEnabled: true, // Desactivar el bisel para obtener una extrusión plana    RALENTIZA MUCHO UNA VEZ HECHA LA FIGURA DESACTIVAR Y CONTINUAR CON EL RESTO
      bevelThickness: 0.50, // Grosor del bisel (anchura del bisel)
      bevelSize: 0.25, // Tamaño del bisel (altura del bisel)
      bevelSegments: 10 // Número de segmentos del bisel (suavidad del bisel)
    };

    // Crear la geometría
    var figBaseGeometry = new THREE.ExtrudeGeometry(nubeShape, extrudeSettings);
    //En caso de ser necesario trasladar, rotar o escalar la figura

  var nube= new THREE.Mesh(figBaseGeometry, this.material);
  this.add(nube);
  }

  createGUI(gui, titleGui) {
    var folder = gui.addFolder(titleGui);
  }

  update() {
    // No hay nada que actualizar figura estática
  }
}

export { Nube }
