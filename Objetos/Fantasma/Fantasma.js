import * as THREE from 'three'
import { CSG } from '../../libs/CSG-v2.js'

class Fantasma extends THREE.Object3D {
  constructor() {
    super();

    this.rotationalSpeed =  0.01;
  
    this.materialCuerpo = new THREE.MeshStandardMaterial({ color: 0xffffff, flatShading: true, side: THREE.DoubleSide, transparent: false, opacity: 0.5 });
    
   
    this.materialOjosBoca = new THREE.MeshStandardMaterial({ color: 0x000000 });
    


    var esferagrandegeo = new THREE.SphereGeometry(1,25,20);
    esferagrandegeo.scale(1.5,2,0.5);
   //esferagrandegeo.translate(0, 1.5, 0); //Traslacion
   //cilGeometryBot.rotateX(Math.PI / 2);//Rotacion
   var esfMesh = new THREE.Mesh(esferagrandegeo, this.materialCuerpo);
   //this.add(esfMesh);

   var esferapata1 = new THREE.SphereGeometry(1,25,20);
   esferapata1.scale(0.75,1.75,0.4);
  esferapata1.translate(0.8,-0.5, 0); //Traslacion
  //cilGeometryBot.rotateX(Math.PI / 2);//Rotacion
  var esfMesh2 = new THREE.Mesh(esferapata1, this.materialCuerpo);
  //this.add(esfMesh2);


  var esferapata2 = new THREE.SphereGeometry(1,25,20);
  esferapata2.scale(0.75,1.75,0.4);
 esferapata2.translate(-0.8,-0.5, 0); //Traslacion
 //cilGeometryBot.rotateX(Math.PI / 2);//Rotacion
 var esfMesh3 = new THREE.Mesh(esferapata2, this.materialCuerpo);
 //this.add(esfMesh3);



 var esferapata3 = new THREE.SphereGeometry(1,25,20);
 esferapata3.scale(0.75,1.75,0.4);
esferapata3.translate(0,-0.5, 0); //Traslacion
//cilGeometryBot.rotateX(Math.PI / 2);//Rotacion
var esfMesh4 = new THREE.Mesh(esferapata3, this.materialCuerpo);
//this.add(esfMesh4);

var ojo1 = new THREE.SphereGeometry(0.2,25,20);
//  esferapata3.scale(0.75,1.75,0.4);
 ojo1.translate(-0.5,0.5, 0.4); //Traslacion
var ojomesh1 = new THREE.Mesh(ojo1, this.materialOjosBoca);
this.add(ojomesh1);


var ojo2 = new THREE.SphereGeometry(0.2,25,20);
//  esferapata3.scale(0.75,1.75,0.4);
 ojo2.translate(0.5,0.5, 0.4); //Traslacion
var ojomesh2 = new THREE.Mesh(ojo2, this.materialOjosBoca);
this.add(ojomesh2);
   
var boca = new THREE.CircleGeometry(0.2,20);
 boca.scale(0.5,0.75,0);
 boca.translate(0.0,0.0, 0.5); //Traslacion
var bocamesh = new THREE.Mesh(boca, this.materialOjosBoca);
this.add(bocamesh);


// var fantasmaCSG = new CSG();
// fantasmaCSG =fantasmaCSG.union([esfMesh,esfMesh2,esfMesh3,esfMesh4]);

var fantasmita = new THREE.Group();
fantasmita.add(esfMesh);
fantasmita.add(esfMesh2);
fantasmita.add(esfMesh3);
fantasmita.add(esfMesh4);
  fantasmita.add(ojomesh1);
  fantasmita.add(ojomesh2);
  fantasmita.add(bocamesh);
  
  this.add(fantasmita);
  this.scale.set(0.2, 0.2, 0.2);

  // this.circularRadius = 3;
  // this.angularSpeed = 0.02;
  // this.angle=0;

  this.name = 'fantasma';
  }



  update() {
    this.rotation.y += this.rotationalSpeed;

  }
}

export { Fantasma }
