import * as THREE from 'three'
import { CSG } from '../libs/CSG-v2.js'
class Tubo extends THREE.Object3D {
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
    
    
    
    var puntos = [
      new THREE.Vector3(4, 0, 3),    
  
    new THREE.Vector3(10, 6,-4),   
        
    new THREE.Vector3(9, 9,-12), 
    new THREE.Vector3(0, 12,-15), 
    new THREE.Vector3(-9, 6,-12),    
    new THREE.Vector3(-10, 0,-4),   
    new THREE.Vector3(-5, -5,-2), 
  
    new THREE.Vector3(2, -7,0), 
    new THREE.Vector3(6, -8,5), 
    new THREE.Vector3(10, -6,10), 
    new THREE.Vector3(20, -4,7), 
    new THREE.Vector3(19, 2,0), 
    new THREE.Vector3(15, 16,-8), 
    new THREE.Vector3(4, 18,-8), 
    new THREE.Vector3(-3, 10,-5), 
    new THREE.Vector3(-7, 0,-12), 
    new THREE.Vector3(-15, -5,-14),
    new THREE.Vector3(-18, -8,-8), 
    new THREE.Vector3(-10, -15,0), 
    new THREE.Vector3(0, -8,7), 


    ];


    this.path = new THREE.CatmullRomCurve3(puntos, true);

    var resolucion= 200;
    this.radio= 1;
    var segmentos = 20;

    var geomTubo = new THREE.TubeGeometry(this.path, resolucion, this.radio,segmentos,true);

    var tubo = new THREE.Mesh(geomTubo,this.material);
    this.add(tubo);
    
    //this.scale.set(0.5, 0.5, 0.5);

  }
  getPath() {
    return this.path;
  }

  getRadio(){
    return this.radio;
  }
  createGUI(gui, titleGui) {
    var folder = gui.addFolder(titleGui);
  }
  update() {
    // No hay nada que actualizar figura estática
  }
}
export { Tubo }
