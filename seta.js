import * as THREE from '../libs/three.module.js'

class Seta extends THREE.Object3D {
    constructor(gui, titleGui) {
        super();

        // Se crea la parte de la interfaz que corresponde a la GeometriaBasica
        // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
        this.createGUI(gui, titleGui);

        var seta = this.createSeta();
        this.add(seta);
    }

    createSeta() {

         this.setPuntos();
        
        // Crea una geometría por revolución de una seta
        var setaGeometry = new THREE.LatheGeometry(this.puntos, 12, 0, 2 * Math.PI);
        var material = new THREE.MeshNormalMaterial();
        material.flatShading = true;
        material.needsUpdate = true;
        const seta = new THREE.Mesh(setaGeometry, material);

        seta.position.set(0, 0, 0);

        return seta;
    }

    setPuntos() {
       
        this.puntos = [];

        // Puntos para la base del champiñón
        this.puntos.push(new THREE.Vector3(0.0, -1.84, 0.0));
        this.puntos.push(new THREE.Vector3(0.56, -1.84, 0.0));
        this.puntos.push(new THREE.Vector3(1.09, -1.74, 0.0));
        this.puntos.push(new THREE.Vector3(1.42, -1.48, 0.0));
        this.puntos.push(new THREE.Vector3(1.57, -1.04, 0.0));
        this.puntos.push(new THREE.Vector3(1.62, -0.63, 0.0));
        
        // Puntos para el sombrero del champiñón
        this.puntos.push(new THREE.Vector3(2.00, -0.45, 0.0));
        this.puntos.push(new THREE.Vector3(2.33, -0.16, 0.0));
        this.puntos.push(new THREE.Vector3(2.48, 0.38, 0.0));
        this.puntos.push(new THREE.Vector3(2.48, 0.86, 0.0));
        this.puntos.push(new THREE.Vector3(2.18, 1.76, 0.0));
        this.puntos.push(new THREE.Vector3(1.88, 2.13, 0.0));
        this.puntos.push(new THREE.Vector3(1.35, 2.43, 0.0));
        this.puntos.push(new THREE.Vector3(0.72, 2.61, 0.0));
        this.puntos.push(new THREE.Vector3(0.00, 2.65, 0.0));

    }


    createGUI(gui, titleGui) {
        // // Controles para el movimiento 
        this.guiControls = {
            rotar:true
        }

        // // Se crea una sección para los controles del Seta
         var folder = gui.addFolder(titleGui);
        // // Estas lineas son las que añaden los componentes de la interfaz
        // // Las tres cifras indican un valor mínimo, un máximo y el incremento
         folder.add(this.guiControls, 'rotar', true).name('Rotación : ').listen();


    }


    update() {
        if (this.guiControls.rotar) {
            this.rotation.y += 0.01;
        }
    }
}

export { Seta }