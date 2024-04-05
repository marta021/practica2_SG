import * as THREE from '../libs/three.module.js'
import { CSG } from '../libs/CSG-v2.js'

class Pincho extends THREE.Object3D {
    constructor(gui, titleGui) {
        super();

        this.createGUI(gui, titleGui);

        var material = new THREE.MeshNormalMaterial;


        var geometryCone1 = new THREE.CylinderGeometry( 0.01, 1.25, 3.5, 32 );
        var geometryCone2 = new THREE.CylinderGeometry( 0.01, 1.25, 3.5, 32 );
        var geometryCone3 = new THREE.CylinderGeometry( 0.01, 1.25, 3.5, 32 );
        var geometryCone4 = new THREE.CylinderGeometry( 0.01, 1.25, 3.5, 32 );
       

        var geometrySphere = new THREE.SphereGeometry( 1.5, 32, 16 );
         

        //Se posicionan y orientan 
        geometryCone1.translate(0, 1.75, 0);

        geometryCone2.rotateX(Math.PI);
        geometryCone2.translate(0, -1.75, 0);

        geometryCone3.rotateZ(-Math.PI/2);
        geometryCone3.translate(1.75, 0, 0);
        
        geometryCone4.rotateZ(Math.PI/2);
        geometryCone4.translate(-1.75, 0, 0);
        
        
        //Se construyen los Meshes
        var esferaMesh = new THREE.Mesh(geometrySphere, material);
        var cone1Mesh = new THREE.Mesh(geometryCone1, material );
        var cone2Mesh = new THREE.Mesh(geometryCone2, material );
        var cone3Mesh = new THREE.Mesh(geometryCone3, material );
        var cone4Mesh = new THREE.Mesh(geometryCone4, material );

       
        //Se crea el objeto CSG y se opera con él
        var csg = new CSG();
        csg.union([esferaMesh,cone1Mesh, cone2Mesh, cone3Mesh, cone4Mesh]); // CORCHETES OBLIGATORIOS, AUQNUE SOLO HAYA UN PARAMETRO     
        var resultado = csg.toMesh();

        this.add(resultado);

    }

    createGUI(gui, titleGui) {
        // Controles para el movimiento de la parte móvil
        this.guiControls = {
            rotar: true
        }

        // Se crea una sección para los controles del Cilindro
        var folder = gui.addFolder(titleGui);
        // Estas lineas son las que añaden los componentes de la interfaz
        folder.add(this.guiControls, 'rotar', 0.5, 5.0, 0.1).name('Rotacion: ').listen();
    }

    update() {
        if (this.guiControls.rotar) {
            this.rotation.z += 0.01;
            this.rotation.y += 0.01;
        }
    }
}

export { Pincho }