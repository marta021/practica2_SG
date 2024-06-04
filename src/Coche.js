import * as THREE from '../libs/three.module.js'
import { MTLLoader } from '../libs/MTLLoader.js'
import { OBJLoader } from '../libs/OBJLoader.js'
import * as TWEEN from '../libs/tween.esm.js'

class Modelo extends THREE.Object3D {
    constructor(gui, titleGui, tubo) {
        super();

        //cambio
        this.coche = new THREE.Object3D();
        this.coche_nivelIntermedio = new THREE.Object3D();

        this.path= tubo.getPath();

        this.createGUI(gui, titleGui);
        var materialLoader = new MTLLoader();
        var objectLoader = new OBJLoader();
        materialLoader.load('../modelos/911.mtl',
        (materials) => {
            objectLoader.setMaterials(materials);
            objectLoader.load('../modelos/Porsche_911_GT2.obj',
                (object) => {
                    object.rotateY(Math.PI); // Orientación del coche
                    object.position.y += 0.605885; // Posición inicial del coche teniendo en cuenta la altura mínima de su vértice
                    object.name = "coche_basico";
                    this.coche_nivelIntermedio.add(object);
                }, null, null);
        });
        // this.position.x = 0;


        this.coche_nivelIntermedio.position.y=2*tubo.getRadio();
        this.coche.add(this.coche_nivelIntermedio);
       
        // Movimiento
        this.t = 0;
        this.velocidad = 0.025;
        this.reloj = new THREE.Clock();

        this.spline = this.path;
        this.segmentos = 100;
        this.binormales = this.spline.computeFrenetFrames(this.segmentos, true ).binormals;

       // ------ //

       // Cámara
        this.camara = new THREE. PerspectiveCamera (70, window.innerWidth / window.innerHeight, 0.1, 1000) ;
        this.camara.position. set (0,5 ,-7) ;
        var puntoDeMiraRelativo = new THREE. Vector3 (0.1 , -0.05 ,1) ;
        this.target= new THREE. Vector3 ( ) ;
        this.camara.getWorldPosition(this.target) ;
    
       this.target.add ( puntoDeMiraRelativo ) ;
       
        this.camara.lookAt (this.target ) ;
        this.coche.add(this.camara);

        this.add(this.coche);
    }

    rotarCoche(rotacion) {
        this.coche.rotation.z += rotacion;
    }

    createGUI(gui, titleGui) {

    }
    
    update() {
// --- ANIMACION DEL COCHE (movimiento) ---//
        var tiempo = this.reloj.getDelta();
        this.t += tiempo * this.velocidad;
        if (this.t > 1) {
            console.log("Vuelta completada. Aumentando velocidad un 10%");
            this.t = 0;
            this.setVelocidad(1.1);
        }

        if (this.colisionPincho){
            this.setVelocidad(0.9);
            this.colisionPincho=false;
            console.log("Colisión con pincho: VELOCIDAD REDUCIDA");
        } else if (this.colisionSeta){
            this.setVelocidad(1.2);
            this.colisionSeta=false;
            console.log("Colisión con seta: VELOCIDAD AUMENTADA");
        } else if (this.colisionRayo){
            this.setVelocidad(0.9);
            this.colisionRayo=false;
            console.log("Colisión con rayo: VELOCIDAD REDUCIDA  ");
        } else if (this.pickEstrella){
            this.setVelocidad(1.15);
            this.pickEstrella=false;
            console.log("Pick con estrella: VELOCIDAD aumentada  ");
        }


        var posicion = this.spline.getPointAt(this.t);
        this.position.copy(posicion);
        var tangente = this.spline.getTangentAt(this.t);
        posicion.add(tangente);
        this.up = this.binormales[Math.floor(this.t * this.segmentos)];
        this.lookAt(posicion);
    }

    setVelocidad(factor_velocidad) {
        console.log("Velocidad actual: " + this.getVelocidad());
        this.velocidad = this.getVelocidad() * factor_velocidad;
        console.log("Velocidad nueva: " + this.getVelocidad());
    }
    
    getVelocidad(){
        return this.velocidad;
    }

    getOrigen(){
        return this.origen;   
    }


    getCarPosicion() {
        return this.position.clone();
    }

}

export { Modelo}