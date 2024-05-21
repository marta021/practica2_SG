import * as THREE from 'three'
import { CSG } from '../libs/CSG-v2.js'

class Fantasma extends THREE.Object3D {
  constructor() {
    super();

    this.rotationalSpeed =  0.01;
  

    // El material se usa desde varios métodos. Por eso se alamacena en un atributo
    // Material para la figura
    this.material = new THREE.MeshNormalMaterial({ flatShading: true, side: THREE.DoubleSide, transparent: false, opacity: 0.5 });
    // Poner transparente a true para ver el interior de la figura y ver si se va a hacer correctamente la resta

    // Material para la figura a restar
    this.materialSubtract = new THREE.MeshPhysicalMaterial({ color: 0x008000, flatShading: true, side: THREE.DoubleSide });



    var esferagrandegeo = new THREE.SphereGeometry(1,25,20);
    esferagrandegeo.scale(1.5,2,0.5);
   //esferagrandegeo.translate(0, 1.5, 0); //Traslacion
   //cilGeometryBot.rotateX(Math.PI / 2);//Rotacion
   var esfMesh = new THREE.Mesh(esferagrandegeo, this.material);
   //this.add(esfMesh);

   var esferapata1 = new THREE.SphereGeometry(1,25,20);
   esferapata1.scale(0.75,1.75,0.4);
  esferapata1.translate(0.8,-0.5, 0); //Traslacion
  //cilGeometryBot.rotateX(Math.PI / 2);//Rotacion
  var esfMesh2 = new THREE.Mesh(esferapata1, this.material);
  //this.add(esfMesh2);


  var esferapata2 = new THREE.SphereGeometry(1,25,20);
  esferapata2.scale(0.75,1.75,0.4);
 esferapata2.translate(-0.8,-0.5, 0); //Traslacion
 //cilGeometryBot.rotateX(Math.PI / 2);//Rotacion
 var esfMesh3 = new THREE.Mesh(esferapata2, this.material);
 //this.add(esfMesh3);



 var esferapata3 = new THREE.SphereGeometry(1,25,20);
 esferapata3.scale(0.75,1.75,0.4);
esferapata3.translate(0,-0.5, 0); //Traslacion
//cilGeometryBot.rotateX(Math.PI / 2);//Rotacion
var esfMesh4 = new THREE.Mesh(esferapata3, this.material);
//this.add(esfMesh4);

var ojo1 = new THREE.SphereGeometry(0.2,25,20);
//  esferapata3.scale(0.75,1.75,0.4);
 ojo1.translate(-0.5,0.5, 0.4); //Traslacion
var ojomesh1 = new THREE.Mesh(ojo1, this.material);
this.add(ojomesh1);


var ojo2 = new THREE.SphereGeometry(0.2,25,20);
//  esferapata3.scale(0.75,1.75,0.4);
 ojo2.translate(0.5,0.5, 0.4); //Traslacion
var ojomesh2 = new THREE.Mesh(ojo2, this.material);
this.add(ojomesh2);
   
var boca = new THREE.CircleGeometry(0.2,20);
 boca.scale(0.5,0.75,0);
 boca.translate(0.0,0.0, 0.5); //Traslacion
var bocamesh = new THREE.Mesh(boca, this.material);
this.add(bocamesh);


var fantasmaCSG = new CSG();
fantasmaCSG =fantasmaCSG.union([esfMesh,esfMesh2,esfMesh3,esfMesh4]);

var fantasmita = new THREE.Mesh(fantasmaCSG.toGeometry(),this.material);
  this.add(fantasmita);
  this.scale.set(0.2, 0.2, 0.2);

  // this.circularRadius = 3;
  // this.angularSpeed = 0.02;
  // this.angle=0;
  }



  update() {
    this.rotation.y += this.rotationalSpeed;

  }
}

export { Fantasma }
