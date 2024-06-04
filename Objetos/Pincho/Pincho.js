import * as THREE from '../../libs/three.module.js'
import { CSG } from '../../libs/CSG-v2.js'

class Pincho extends THREE.Object3D {
    constructor(tubo) {
        super();
        //this.path=tubo.getPath();
        // this.createGUI(gui, titleGui);
        var loader = new THREE.TextureLoader();
    var textura = loader.load("../../img/textura-piedra.jpg");
    var materialPincho = new THREE.MeshStandardMaterial({
         bumpMap: textura,
        bumpScale:0.1
    });


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
        var esferaMesh = new THREE.Mesh(geometrySphere, materialPincho);
        var cone1Mesh = new THREE.Mesh(geometryCone1, materialPincho );
        var cone2Mesh = new THREE.Mesh(geometryCone2, materialPincho );
        var cone3Mesh = new THREE.Mesh(geometryCone3, materialPincho );
        var cone4Mesh = new THREE.Mesh(geometryCone4, materialPincho );

       
        //Se crea el objeto CSG y se opera con él
        var csg = new CSG();
        csg.union([esferaMesh,cone1Mesh, cone2Mesh, cone3Mesh, cone4Mesh]); // CORCHETES OBLIGATORIOS, AUQNUE SOLO HAYA UN PARAMETRO     
        var resultado = csg.toMesh();
        

        this.add(resultado);
        this.scale.set(0.1, 0.1, 0.1);

        const tPincho = Math.random();

        // Obtiene la posición y la tangente en el punto correspondiente a 'tSeta' en el tubo
        // const posPincho = this.path.getPointAt(tPincho);
        // const tangente = this.path.getTangentAt(tPincho).normalize();

        // // Calcula la posición y la orientación de la seta en el tubo
        // this.position.copy(posPincho);
        // this.lookAt(posPincho.clone().add(tangente));

        // this.position.y+=2* tubo.getRadio();

        this.name = 'pincho';
        this.createLights();
    }

    // createGUI(gui, titleGui) {
    //     // Controles para el movimiento de la parte móvil
    //     this.guiControls = {
    //         rotar: true
    //     }

    //     // Se crea una sección para los controles del Cilindro
    //     var folder = gui.addFolder(titleGui);
    //     // Estas lineas son las que añaden los componentes de la interfaz
    //     folder.add(this.guiControls, 'rotar', 0.5, 5.0, 0.1).name('Rotacion: ').listen();
    // }


    createLights() {
        this.luz = new THREE.PointLight(0x00A8FF, 5, 5);// Segundo parámetro es intensidad
        this.luz.position.set(0,1,0);
        this.add(this.luz);
    }
    update() {
    //     if (this.guiControls.rotar) {
    //         this.rotation.z += 0.01;
    //         this.rotation.y += 0.01;
    //     }
    }
}

export { Pincho }