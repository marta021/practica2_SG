import * as THREE from '../libs/three.module.js'
import { MTLLoader } from '../libs/MTLLoader.js'
import { OBJLoader } from '../libs/OBJLoader.js'

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

}

export { Modelo}