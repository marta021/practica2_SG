import * as THREE from '../libs/three.module.js'
import { MTLLoader } from '../libs/MTLLoader.js'
import { OBJLoader } from '../libs/OBJLoader.js'
import * as TWEEN from '../libs/tween.esm.js'

class Modelo extends THREE.Object3D {
    constructor(gui, titleGui) {
        super();

        this.createGUI(gui, titleGui);
        var materialLoader = new MTLLoader();
        var objectLoader = new OBJLoader();
        materialLoader.load('../modelos/911.mtl',
            (materials) => {
                objectLoader.setMaterials(materials);
                objectLoader.load('../modelos/Porsche_911_GT2.obj',
                    (object) => {
                        this.add(object);
                    }, null, null);
            });

        this.position.x = 0;
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
            this.rotation.y += 0.01;
        }
    }

// --- ANIMACION DEL COCHE (movimiento) ---//

    animacion(){

        //---Definicion del spline / camino a seguir---//
        //Mismos puntos que el tubo
        var puntos = [
            new THREE.Vector3(20, 0, 0),    
            
            new THREE.Vector3(15, 10, -8),     
            new THREE.Vector3(10, 12, -12),    
            new THREE.Vector3(-14, 5, 0),     
        
            new THREE.Vector3(-20, -5, 10),    
            new THREE.Vector3(20, 0, 20), 
        ];
        
        
        var spline = new THREE.CatmullRomCurve3(puntos, true);

        //---Definicion de la animacion---//
        
        this.segmentos = 100;
        this.binormales = spline.computeFrenetFrames(this.segmentos, true ).binormals;

        var origen = {t: 0};
        var destino = {t: 1};
        var tiempoDeRecorrido = 5000; // 5000 ms = 5 segundos. ESTO ES LA VELOCIDAD CUANDO ES INFINITO
        var altura = 1.5;

        var animacion = new TWEEN.Tween(origen).to(destino, tiempoDeRecorrido)
            .onUpdate(() => {
                // Se actualiza la posición de la cámara siguiendo la curva
                var posicion = spline.getPointAt(origen.t);
                posicion.y += altura; // Para que el coche circule por encima del tubo
                this.position.copy(posicion);
                // Se actualiza la orientación de la cámara mirando al "lookAt" de la curva
                var tangente = spline.getTangentAt(origen.t);
                posicion.add(tangente);
                this.up = this.binormales[Math.floor(origen.t * this.segmentos)];
                this.lookAt(posicion);
            })
            .repeat(Infinity)
            .start();

            return animacion;
    }

}

export { Modelo}