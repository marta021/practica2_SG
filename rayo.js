import * as THREE from '../libs/three.module.js'

class Rayo extends THREE.Object3D { 
    constructor(gui, titleGui) {        
        super();

        this.createGUI(gui, titleGui);

        var rayoShape = this.crearShape();

        var options = {depth: 1, bevelThickness: 0.1, bevelSize: 0.3};

        var rayoGeometry = new THREE.ExtrudeGeometry(rayoShape, options);

        var rayoMaterial = new THREE.MeshPhongMaterial( { color: 0xfff700 } );
        
        this.rayo = new THREE.Mesh(rayoGeometry, rayoMaterial);

        this.add(this.rayo);

    }

    createGUI(gui, titleGui) {
        
    }

    update() {
        //this.rotation.x += 0.01;
     //   this.rotation.z += 0.01;
    }

    crearShape() {

        const rayoPuntos = [
            new THREE.Vector2(0, 6),
            new THREE.Vector2(-2.85, 3.19),
            new THREE.Vector2(-1.58, 2.65),
            new THREE.Vector2(-2.85, 0),
            new THREE.Vector2(0.7, 3),
            new THREE.Vector2(-0.5, 3.6),
        ]
        var rayoShape = new THREE.Shape(rayoPuntos);

        return rayoShape;
    }
}

export { Rayo }