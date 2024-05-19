import * as THREE from 'three'
import { CSG } from '../libs/CSG-v2.js'

class Estrella extends THREE.Object3D {
  constructor( ) {
    super();

    // Se crea la parte de la interfaz que corresponde a la grapadora
    // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
  

    // El material se usa desde varios métodos. Por eso se alamacena en un atributo
    // Material para la figura
    this.material = new THREE.MeshNormalMaterial({ flatShading: true, side: THREE.DoubleSide, transparent: false, opacity: 0.5 });
    // Poner transparente a true para ver el interior de la figura y ver si se va a hacer correctamente la resta

    // Material para la figura a restar
    this.materialSubtract = new THREE.MeshPhysicalMaterial({ color: 0x008000, flatShading: true, side: THREE.DoubleSide });



    var cilGeo1 = new THREE.CylinderGeometry(0.01, 1, 4, 40); 
   cilGeo1.translate(0, 2, 0); //Traslacion
   //cilGeometryBot.rotateX(Math.PI / 2);//Rotacion
   var cilMeshBot1 = new THREE.Mesh(cilGeo1, this.material);
   //this.add(cilMeshBot1);

   var cilGeo2 = new THREE.CylinderGeometry(0.01, 1, 4, 40); 
   cilGeo2.translate(0, 2, 0); //Traslacion
   cilGeo2.rotateX(Math.PI / 2.5);
   var cilMeshBot2 = new THREE.Mesh(cilGeo2, this.material);
   //this.add(cilMeshBot2);

   var cilGeo3 = new THREE.CylinderGeometry(0.01, 1, 4, 40); 
   cilGeo3.translate(0, 2, 0); //Traslacion

   cilGeo3.rotateX(-Math.PI / 2.5);
   var cilMeshBot3 = new THREE.Mesh(cilGeo3, this.material);
   //this.add(cilMeshBot3);


   var cilGeo4 = new THREE.CylinderGeometry(0.01, 1, 4, 40); 
   cilGeo4.translate(0, 2, 0); //Traslacion

   cilGeo4.rotateX(Math.PI/1.25);
   var cilMeshBot4 = new THREE.Mesh(cilGeo4, this.material);
   //this.add(cilMeshBot4);



   var cilGeo5 = new THREE.CylinderGeometry(0.01, 1, 4, 40); 
   cilGeo5.translate(0, 2, 0); //Traslacion

   cilGeo5.rotateX(-Math.PI/1.25);
   var cilMeshBot5 = new THREE.Mesh(cilGeo5, this.material);
   //this.add(cilMeshBot5);





  



   var estrellaCSG = new CSG();
  estrellaCSG =estrellaCSG.union([cilMeshBot1,cilMeshBot2,cilMeshBot3,cilMeshBot4,cilMeshBot5]);
 
  var estrellita = new THREE.Mesh(estrellaCSG.toGeometry(),this.material);
    this.add(estrellita);
    this.scale.set(0.2, 0.2, 0.2);

    
  this.circularRadius = 3;
  this.angularSpeed = 0.02;
  this.angle=0;


  }

 

  update() {
    this.position.x = this.circularRadius * Math.cos(this.angle);
    this.position.z = this.circularRadius * Math.sin(this.angle);
    this.angle += this.angularSpeed;
  }
}

export { Estrella }
