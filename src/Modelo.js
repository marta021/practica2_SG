import * as THREE from 'three'
import { CSG } from '../libs/CSG-v2.js'

class Personaje extends THREE.Object3D {
  constructor( ) {
    super();

   
   //Creando la nube
    var esfNube = new THREE.SphereGeometry(1, 32, 32); 
    var esfNube2 = new THREE.SphereGeometry(1, 32, 32); 
    esfNube2.translate(1.2, 0, 0); //Traslacion

    var esfNube3 = new THREE.SphereGeometry(1, 32, 32); 
    esfNube3.translate(-1.2, 0, 0); //Traslacion

    var esfNube4 = new THREE.SphereGeometry(1, 32, 32); 
    esfNube4.translate(0.6, 0, 1.2); //Traslacion

    var esfNube5 = new THREE.SphereGeometry(1, 32, 32); 
    esfNube5.translate(-0.6, 0, 1.2); //Traslacion

    var esfNube6 = new THREE.SphereGeometry(1, 32, 32); 
    esfNube6.translate(0.6, 0, -1.2); //Traslacion

    var esfNube7 = new THREE.SphereGeometry(1, 32, 32); 
    esfNube7.translate(-0.6, 0, -1.2); //Traslacion




    var materialNube = new THREE.MeshStandardMaterial({
        color: 0xffffff,
      
  
      });
 
   var esfMesh = new THREE.Mesh(esfNube, materialNube);
   var esfMesh2 = new THREE.Mesh(esfNube2, materialNube);
   var esfMesh3 = new THREE.Mesh(esfNube3, materialNube);
   var esfMesh4 = new THREE.Mesh(esfNube4, materialNube);
   var esfMesh5 = new THREE.Mesh(esfNube5, materialNube);
   var esfMesh6 = new THREE.Mesh(esfNube6, materialNube);
   var esfMesh7 = new THREE.Mesh(esfNube7, materialNube);
   


//    this.add(esfMesh);
//   this.add(esfMesh2);
//   this.add(esfMesh3);
//   this.add(esfMesh4);
//   this.add(esfMesh5);
//   this.add(esfMesh6);
//   this.add(esfMesh7);

var nubeCSG = new CSG();
nubeCSG =nubeCSG.union([esfMesh,esfMesh2,esfMesh3,esfMesh4,esfMesh5,esfMesh6,esfMesh7]);

var nubecilla = new THREE.Mesh(nubeCSG.toGeometry(),materialNube);
  this.add(nubecilla);



  this.cuerpoGeometry = new THREE.SphereGeometry(1, 32, 16); 
  this.cuerpoGeometry.scale(1, 1.5, 1); 
  this.cuerpoGeometry.translate(0, 1.5, 0); //Traslacion

  const cuerpoMaterial = new THREE.MeshStandardMaterial({ color: 0xffff00 }); 
  this.cuerpo = new THREE.Mesh(this.cuerpoGeometry, cuerpoMaterial);
  this.add(this.cuerpo);
    
  this.cabezaGeometry = new THREE.SphereGeometry(0.7, 32, 16); 

  this.cabezaGeometry.translate(0,3, 0); //Traslacion

 
  this.cabeza = new THREE.Mesh(this.cabezaGeometry, cuerpoMaterial);
  this.add(this.cabeza);
  const ojoGeometry = new THREE.SphereGeometry(0.1, 32, 32);
  const ojoMaterial = new THREE.MeshStandardMaterial({ color: 0x000000 });
  const ojoIzquierdo = new THREE.Mesh(ojoGeometry, ojoMaterial);
  ojoIzquierdo.position.set(-0.3, 3.2, 0.5); 
  this.cabeza.add(ojoIzquierdo); 

 
  const ojoDerecho = new THREE.Mesh(ojoGeometry, ojoMaterial);
  ojoDerecho.position.set(0.3, 3.2, 0.5);
  this.cabeza.add(ojoDerecho); 

  // BOCA
  const bocaGeometry = new THREE.SphereGeometry(0.1, 32, 32);
  const bocaMaterial = new THREE.MeshStandardMaterial({ color: 0x000000 });
  const boca = new THREE.Mesh(bocaGeometry, bocaMaterial);
  boca.position.set(0, 3, 0.7); 
  this.cabeza.add(boca);


  this.pivoteBrazo1 = new THREE.Object3D();
  

    this.pivoteBrazo1.position.set(1, 2, 0); // Posición relativa al cuerpo
    this.cuerpo.add(this.pivoteBrazo1); // Agrega el pivote al cuerpo

    // Creando el brazo 1 y agregándolo al pivote
    this.brazoGeometry = new THREE.CylinderGeometry(0.2, 0.2, 2, 32);
    const brazoMaterial = new THREE.MeshStandardMaterial({ color: 0xffff00 });
    this.brazo1 = new THREE.Mesh(this.brazoGeometry, brazoMaterial);
     this.brazo1.rotation.z = Math.PI / 2; // Rotación inicial
    this.brazo1.position.set(0, 0, 0);
    this.pivoteBrazo1.add(this.brazo1);
    
    this.brazo2 = new THREE.Mesh(this.brazoGeometry, brazoMaterial);
    this.brazo2.rotation.z=-Math.PI/4;
    this.brazo2.position.set(-1.5, 1.2, 0); 

   this.cuerpo.add(this.brazo2);

   this.manoGeometry = new THREE.SphereGeometry(0.2, 32, 16); 
   this.mano1 = new THREE.Mesh(this.manoGeometry, cuerpoMaterial);
   this.mano1.position.set(0, -1, 0);
   this.brazo1.add(this.mano1);
  
   this.paloGeometry = new THREE.CylinderGeometry(0.05, 0.05, 1, 32); 
  const paloMaterial = new THREE.MeshStandardMaterial({ color: 0x8B4513 }); 
  this.palo = new THREE.Mesh(this.paloGeometry, paloMaterial);
  this.palo.position.set(0, -0.5, 0); 
  // this.palo.rotation.z=Math.PI/2;
  this.mano1.add(this.palo);
  this.banderaGeometry =  new THREE.PlaneGeometry(0.5, 0.3);
  const banderaMaterial = new THREE.MeshStandardMaterial({ color: 0x00FF00 }); 
  this.bandera = new THREE.Mesh(this.banderaGeometry, banderaMaterial);
  this.bandera.position.set(0.25, -0.5, 0); 
  this.palo.add(this.bandera); 


  }

 

  update() {
    const angle = Math.sin(Date.now() * 0.001) * Math.PI / 8; 
    const angle2 = Math.sin(Date.now() * 0.001) * Math.PI / 2; 

    // Aplica la rotación al brazo
    this.pivoteBrazo1.rotation.z = -angle;
    this.mano1.rotation.z=angle2;
    // this.palo.rotation.y +=0.1;
  }
}

export { Personaje }
