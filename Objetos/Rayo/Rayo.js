import * as THREE from '../../libs/three.module.js'

class Rayo extends THREE.Object3D { 
    constructor(tubo) {        
        super();

        //this.path = tubo.getPath();
        // this.createGUI(gui, titleGui);

        var rayoShape = this.crearShape();

        var options = {depth: 1, bevelThickness: 0.1, bevelSize: 0.3};

        var rayoGeometry = new THREE.ExtrudeGeometry(rayoShape, options);

        var loader = new THREE.TextureLoader();
    var textura = loader.load("../../img/lunares-blancos.jpg");
    var materialRayo = new THREE.MeshStandardMaterial({map:textura});
        
        this.rayo = new THREE.Mesh(rayoGeometry, materialRayo);

        this.add(this.rayo);
        this.scale.set(0.1, 0.1, 0.1);

        const tRayo = Math.random();

        // Obtiene la posición y la tangente en el punto correspondiente a 'tSeta' en el tubo
        // const posRayo = this.path.getPointAt(tRayo);
        // const tangenteRayo = this.path.getTangentAt(tRayo).normalize();

        // // Calcula la posición y la orientación de la seta en el tubo
        // this.position.copy(posRayo);
        // this.lookAt(posRayo.clone().add(tangenteRayo));

        // this.position.y+= 1.5* tubo.getRadio();

        this.name = 'rayo';

        this.createLights();

    }

    // createGUI(gui, titleGui) {
        
    // }

    createLights() {
        this.luz = new THREE.PointLight(0xF29007, 5, 5);// Segundo parámetro es intensidad
        this.luz.position.set(0,2,0);
        this.add(this.luz);
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