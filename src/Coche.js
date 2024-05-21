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
       



        this.camara = new THREE. PerspectiveCamera (70, window.innerWidth / window.innerHeight, 0.1, 1000) ;
        
        this.camara.position. set (0,5 ,-7) ;
        var puntoDeMiraRelativo = new THREE. Vector3 (0.1 , -0.05 ,1) ;
        this.target= new THREE. Vector3 ( ) ;
        this.camara . getWorldPosition ( this.target) ;
    
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

    }

// --- ANIMACION DEL COCHE (movimiento) ---//

    animacion(){

        //---Definicion del spline / camino a seguir---//
        //Mismos puntos que el tubo
      

        this.spline = this.path;

        //---Definicion de la animacion---//

        this.segmentos = 100;
        this.binormales = this.spline.computeFrenetFrames(this.segmentos, true ).binormals;

        var origen = {t: 0};
        var destino = {t: 1};
        this.velocidad = 30000; // 5000 ms = 5 segundos. ESTO ES LA VELOCIDAD CUANDO ES INFINITO
        var aumentar = false;

        this.animacion = new TWEEN.Tween(origen).to(destino, this.velocidad)
            .onUpdate(() => {
                // Se actualiza la posición de la cámara siguiendo la curva
                var posicion = this.spline.getPointAt(origen.t);
                this.position.copy(posicion);
                // Se actualiza la orientación de la cámara mirando al "lookAt" de la curva
                var tangente = this.spline.getTangentAt(origen.t);
                posicion.add(tangente);
                this.up = this.binormales[Math.floor(origen.t * this.segmentos)];
                this.lookAt(posicion);
            })
            .onRepeat(() => { // Se aumenta la velocidad del coche un 10% en cada repetición / vuelta
                let velocidad_factor = 0.9;
                this.setVelocidad(velocidad_factor);
            })
            .repeat(Infinity)
            .start();

            return this.animacion;
    }

    setVelocidad(velocidad) {
        this.velocidad = this.getVelocidad() * velocidad;
        this.animacion.duration(this.getVelocidad());
    }
    

    getVelocidad(){
        return this.velocidad;
    }


    getCarPosicion() {
        return this.position.clone();
    }

    getAnimacion(){
        return this.animacion;
    }
}

export { Modelo}
