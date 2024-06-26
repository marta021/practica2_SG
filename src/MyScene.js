
// Clases de la biblioteca

import * as THREE from '../../libs/three.module.js'
import * as TWEEN from '../libs/tween.esm.js'
import { GUI } from '../../libs/dat.gui.module.js'
import { TrackballControls } from '../../libs/TrackballControls.js'


// Clases de mi proyecto

import { Tubo } from './Tubo.js'
import { Modelo } from './Coche.js'
import { Nube } from './Nube.js'
import { Fantasma } from './Fantasma.js'
import { Estrella } from './Estrella.js'
import { Pincho } from './Pincho.js'
import { Seta } from './Seta.js'
import { Rayo } from './Rayo.js'
import { Personaje } from './Modelo.js'




//this.posUltObjVolador = new THREE.Vector3();



/// La clase fachada del modelo
/**
 * Usaremos una clase derivada de la clase Scene de Three.js para llevar el control de la escena y de todo lo que ocurre en ella.
 */
class MyScene extends THREE.Scene {
  // Recibe el  div  que se ha creado en el  html  que va a ser el lienzo en el que mostrar
  // la visualización de la escena
  constructor (myCanvas) { 
    super();
    


    // this.posUltObjVolador = new THREE.Vector3();
    // Lo primero, crear el visualizador, pasándole el lienzo sobre el que realizar los renderizados.
    this.renderer = this.createRenderer(myCanvas);
    
    // Se crea la interfaz gráfica de usuario
    this.gui = this.createGUI ();
    
    // Construimos los distinos elementos que tendremos en la escena
    
    //--LUCES --//
    // Todo elemento que se desee sea tenido en cuenta en el renderizado de la escena debe pertenecer a esta. Bien como hijo de la escena (this en esta clase) o como hijo de un elemento que ya esté en la escena.
    // Tras crear cada elemento se añadirá a la escena con   this.add(variable)
    this.createLights ();
    this.reloj = new THREE.Clock(); // Para calcular el tiempo de las luces
    this.reloj.stop();

  
    // Tendremos una cámara con un control de movimiento con el ratón
    this.createCamera ();

   

    // Y unos ejes. Imprescindibles para orientarnos sobre dónde están las cosas
    this.axis = new THREE.AxesHelper (5);
   this.add (this.axis);
    // Por último creamos el modelo.
    // El modelo puede incluir su parte de la interfaz gráfica de usuario. Le pasamos la referencia a 
    // la gui y el texto bajo el que se agruparán los controles de la interfaz que añada el modelo.
    this.tubo = new Tubo(this.gui, "Controles tubo");
    this.tubo.name = "Tubo";
    this.add(this.tubo);
    this.coche = new Modelo(this.gui, "Controles coche",this.tubo);
    this.coche.scale.set(0.5, 0.5, 0.5);
    this.add(this.coche);

    //---- VARIABLES DEL MOVIMIENTO ----//
    this.movimiento = [false, false]; //0: izquierda[a], 1: derecha[d]

	 // --- OBJETOS VOLADORES --- //
    this.distanciaRecorrida=0;
    this.voladores = new THREE.Object3D();

    
    // --- COLISIONES ---- //
    this.raycaster = new THREE.Raycaster();
    this.obstaculos = new THREE.Object3D();

    // Crear objetos inicialmente
    this.crearObjetosSuelo();
    // console.log(this.obstaculos);
    this.colocarObjetosVoladores();


    this.add(this.obstaculos);
    this.add(this.voladores);
 this.personaje = new Personaje();
 this.add(this.personaje);


    // --- PICKING --- //
    this.mouse = new THREE.Vector2();
    this.raycasterPicking = new THREE.Raycaster();
    this.puntuacion=0;
    this.ponerPuntuacion();
  }

  crearObjetosSuelo(){
    const numObjetos = 30; // Número de objetos a colocar alrededor del tubo
    const distanciaMinima = 5; // Distancia mínima entre los objetos

    const posiciones = []; // Array para almacenar las posiciones de los objetos ya colocados

    for (let i = 0; i < numObjetos; i++) {
        let posicionValida = false;
        let puntoEnCurva;

        while (!posicionValida) {
            const t = Math.random();
            puntoEnCurva = this.tubo.path.getPointAt(t);


            posicionValida = true;
            for (const pos of posiciones) {
                const distancia = puntoEnCurva.distanceTo(pos);
                if (distancia < distanciaMinima) {
                    posicionValida = false;
                    break;
                }
            }
        }


        const x = puntoEnCurva.x;
        const y = puntoEnCurva.y;
        const z = puntoEnCurva.z ;


        const objeto = this.objetoAleatorio();
        objeto.position.set(x, y, z);
        objeto.position.y += (Math.round(Math.random()) * 2 - 1) * 1.5;
        objeto.rotateZ= (Math.PI/2);
        this.obstaculos.add(objeto);

        posiciones.push(puntoEnCurva);
    }
  }

  objetoAleatorio() {

    const tipo = Math.floor(Math.random() * 3);
    switch (tipo) {
        case 0:
            return new Pincho(this.tubo);
        case 1:
            return new Seta(this.tubo);
        case 2:
            return new Rayo(this.tubo);

    }
}
objetoVoladorAleatorio(){
    const tipo = Math.floor(Math.random()*3);

    switch (tipo){
      case 0 :
        return new Nube();
      case 1:
        return new Fantasma();
      case 2:
        return new Estrella();
    }
  }
  colocarObjetosVoladores(){
    const numObjetos = 20; // Número de objetos a colocar alrededor del tubo
    const distanciaMinima = 5; // Distancia mínima entre los objetos

    const posiciones = []; // Array para almacenar las posiciones de los objetos ya colocados

    for (let i = 0; i < numObjetos; i++) {
        let posicionValida = false;
        let puntoEnCurva;
        let t;
        let tangente;

        while (!posicionValida) {
            t = Math.random();
            puntoEnCurva = this.tubo.path.getPointAt(t);
            tangente= this.tubo.getPath().getTangentAt(t).normalize();

            posicionValida = true;
            for (const pos of posiciones) {
                const distancia = puntoEnCurva.distanceTo(pos);
                if (distancia < distanciaMinima) {
                    posicionValida = false;
                    break;
                }
            }
        }


        const x = puntoEnCurva.x;
        const y = puntoEnCurva.y;
        const z = puntoEnCurva.z ;


        const objeto = this.objetoVoladorAleatorio();
        objeto.position.set(x, y, z);
        objeto.position.y += 4;

        this.voladores.add(objeto);
       //objeto.rotateOnAxis(tangente,( Math.random() * Math.PI * 2) );
       //objeto.rotateZ= (Math.PI/2);

       



        posiciones.push(puntoEnCurva);
    }
  }
  createCamera () {
    // Para crear una cámara le indicamos
    //   El ángulo del campo de visión vértical en grados sexagesimales
    //   La razón de aspecto ancho/alto
    //   Los planos de recorte cercano y lejano
    this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    // También se indica dónde se coloca
    this.camera.position.set (6, 3, 6);
    // Y hacia dónde mira
    var look = new THREE.Vector3 (0,0,0);
    this.camera.lookAt(look);
    this.add (this.camera);
    
    // Para el control de cámara usamos una clase que ya tiene implementado los movimientos de órbita
    this.cameraControl = new TrackballControls (this.camera, this.renderer.domElement);
    
    // Se configuran las velocidades de los movimientos
    this.cameraControl.rotateSpeed = 5;
    this.cameraControl.zoomSpeed = -2;
    this.cameraControl.panSpeed = 0.5;
    // Debe orbitar con respecto al punto de mira de la cámara
    this.cameraControl.target = look;
  }

  


  createGUI () {
    // Se crea la interfaz gráfica de usuario
    var gui = new GUI();
    
    // La escena le va a añadir sus propios controles. 
    // Se definen mediante una   new function()
    // En este caso la intensidad de la luz y si se muestran o no los ejes
    this.guiControls = {
      // En el contexto de una función   this   alude a la función
      lightIntensity : 0.75,
      axisOnOff : true
    }
    // Se crea una sección para los controles de esta clase
    var folder = gui.addFolder ('Luz y Ejes');
    
    // Se le añade un control para la intensidad de la luz
    folder.add (this.guiControls, 'lightIntensity', 0, 1, 0.1)
      .name('Intensidad de la Luz : ')
      .onChange ( (value) => this.setLightIntensity (value) );
    
    // Y otro para mostrar u ocultar los ejes
    folder.add (this.guiControls, 'axisOnOff')
      .name ('Mostrar ejes : ')
      .onChange ( (value) => this.setAxisVisible (value) );
    
    return gui;
  }
  
  createLights () {
    // Se crea una luz ambiental, evita que se vean complentamente negras las zonas donde no incide de manera directa una fuente de luz
    // La luz ambiental solo tiene un color y una intensidad
    // Se declara como   var   y va a ser una variable local a este método
    //    se hace así puesto que no va a ser accedida desde otros métodos
    var ambientLight = new THREE.AmbientLight(/*'#828282'*/'#646464', 0.4);
    // La añadimos a la escena
    //this.add (ambientLight);
    
    // Se crea una luz focal que va a ser la luz principal de la escena
    // La luz focal, además tiene una posición, y un punto de mira
    // Si no se le da punto de mira, apuntará al (0,0,0) en coordenadas del mundo
    // En este caso se declara como   this.atributo   para que sea un atributo accesible desde otros métodos.
    this.spotLight = new THREE.SpotLight( 0xffffff, this.guiControls.lightIntensity );
    this.spotLight.position.set( 60, 60, 40 );
    this.add (this.spotLight);
  }
  
  setLightIntensity (valor) {
    this.spotLight.intensity = valor;
  }
  
  setAxisVisible (valor) {
    this.axis.visible = valor;
  }
  
  createRenderer (myCanvas) {
    // Se recibe el lienzo sobre el que se van a hacer los renderizados. Un div definido en el html.
    
    // Se instancia un Renderer   WebGL
    var renderer = new THREE.WebGLRenderer();
    

    // Se establece un color de fondo en las imágenes que genera el render
    renderer.setClearColor(new THREE.Color(0xEEEEEE), 1.0);
    
    // Se establece el tamaño, se aprovecha la totalidad de la ventana del navegador
    renderer.setSize(window.innerWidth, window.innerHeight);
    
    // La visualización se muestra en el lienzo recibido
    $(myCanvas).append(renderer.domElement);
    
    return renderer;  
  }
  
  getCamera () {
    // En principio se devuelve la única cámara que tenemos
    // Si hubiera varias cámaras, este método decidiría qué cámara devuelve cada vez que es consultado
    return this.camaraActual ? this.camera : this.coche.camara;
  }
  
  setCameraAspect (ratio) {
    // Cada vez que el usuario modifica el tamaño de la ventana desde el gestor de ventanas de
    // su sistema operativo hay que actualizar el ratio de aspecto de la cámara
    this.camera.aspect = ratio;
    // Y si se cambia ese dato hay que actualizar la matriz de proyección de la cámara
    this.camera.updateProjectionMatrix();
  }
    
  onWindowResize () {
    // Este método es llamado cada vez que el usuario modifica el tamapo de la ventana de la aplicación
    // Hay que actualizar el ratio de aspecto de la cámara
    this.setCameraAspect (window.innerWidth / window.innerHeight);
    
    // Y también el tamaño del renderizador
    this.renderer.setSize (window.innerWidth, window.innerHeight);
  }

  ponerPuntuacion(){
    this.elementoPuntuacion = document.createElement('div');
    this.elementoPuntuacion.id='score';
    this.elementoPuntuacion.innerHTML='Puntuación: <span id="score-value">0</span>';
    document.body.appendChild(this.elementoPuntuacion);
  }
  update () {

    // ACTUALIZACION DEL MOVIMIENTO del coche
    TWEEN.update();


    // Le decimos al renderizador "visualiza la escena que te indico usando la cámara que te estoy pasando"
    this.renderer.render (this, this.getCamera());

    // Se actualiza la posición de la cámara según su controlador
    this.cameraControl.update();
    
    // Este método debe ser llamado cada vez que queramos visualizar la escena de nuevo.
    // Literalmente le decimos al navegador: "La próxima vez que haya que refrescar la pantalla, llama al método que te indico".
    // Si no existiera esta línea,  update()  se ejecutaría solo la primera vez.
    requestAnimationFrame(() => this.update());
    this.personaje.update();

    //   MOVIMIENTO DEL COCHE
     this.coche.update();
    //  this.colocarObjetosVoladores();
     
    if (this.colisionDesventaja) {
      this.reloj.start();
      this.setLightIntensity(0.0);
      console.log("ATENCION: consecuencia de colision con rayo ACTIVADA (se va la luz)");
      this.colisionDesventaja = false;
      this.consecuenciaDesventaja = true;
    }

    if (this.consecuenciaDesventaja && this.reloj.getElapsedTime() > 5) {
      this.setLightIntensity(0.8);
      console.log("ATENCION: consecuencia de colision con rayo DESACTIVADA (vuelve la luz)");
      this.reloj.stop();
      this.consecuenciaDesventaja = false;
    }
  


     
      this.voladores.children.forEach(objetoVolador => {
        objetoVolador.update();
    
  });


      //COMPROBACION DE COLISIONES
      var posicion_coche = this.getObjectByName("coche_basico").getWorldPosition(new THREE.Vector3());
      var direccion_coche = this.coche.getWorldDirection(new THREE.Vector3());
      this.testColision(posicion_coche,direccion_coche);

  }

    // --- COLSIONES  --- //
    testColision(posicion, direccion) {
      direccion = direccion.normalize();
      this.raycaster.set(posicion, direccion);
      this.colisiones = this.raycaster.intersectObjects(this.obstaculos.children, true); //true para que se haga la intersección con los hijos de los hijos
                                                                               // Vector de intersectados
      
    // console.log(this.colisiones[0].distance);
    if (this.colisiones.length > 0 && this.colisiones[0].distance < 0.3 ) {
      switch (this.colisiones[0].object.parent.name) {
        case 'pincho':
          //this.coche.setVelocidad(1.5);
          this.colisiones[0].object.parent.remove(this.colisiones[0].object);
          this.coche.colisionPincho = true;
          break;

        case 'seta':
          //this.coche.setVelocidad(0.8);
          this.colisiones[0].object.parent.remove(this.colisiones[0].object);
          //this.colisiones[0].object.parent.setLightVisible(false);
          this.coche.colisionSeta = true;
          break;

        case 'rayo':
          //this.coche.setVelocidad(0.92);
          this.colisiones[0].object.parent.remove(this.colisiones[0].object);
          this.coche.colisionRayo = true;
          this.colisionDesventaja = true;
          this.puntuacion-=5;
          break;
      }
    }
    // return false;
    document.getElementById('score-value').innerText = this.puntuacion;

  }


  // --- MOVIMIENTO CON LAS TECLAS --- //
  onKeyDown(event) {
    switch ( String.fromCharCode (event.which || event.key) ) {
      case 'A':
        this.coche.rotarCoche(-0.2); // Velocidad de rotación. Mayor número --> mayor velocidad
        break;
      case 'D':
        this.coche.rotarCoche(0.2);
        break;
      case ' ':
          this.camaraActual=!this.camaraActual;
          if (this.camaraActual) {
            this.camaraActual = true;

        } else {
            this.camaraActual = false;

        }
          break;
    }
  }

  // --- PICKING --- //
  onMouseDown ( event ) {
   // Obtener la posición del clic del mouse en coordenadas normalizadas
    this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    // Actualizar el raycaster con la posición del clic del mouse y la cámara actual
    this.raycaster.setFromCamera(this.mouse, this.getCamera());

    // Realizar la intersección del rayo con los objetos que deseas seleccionar
    const intersects = this.raycaster.intersectObjects(this.voladores.children, true);

    // Verificar si se han encontrado intersecciones
    if (intersects.length > 0) {
        // Seleccionar el primer objeto intersectado (el más cercano al clic del mouse)
        const selectedObject = intersects[0].object;

        if (selectedObject.parent.name=='estrella') {
          // Disminuir la velocidad del coche
          this.puntuacion+=10;
          this.coche.pickEstrella = true;
          selectedObject.parent.remove(selectedObject);
          //selectedObject.parent.setLightVisible(false);
          console.log("Pick Estrella");
          // Aumentar la puntuación del jugador
          this.puntuacion += 10;
      } else if (selectedObject.parent.name=='nube') {
          // No hay efecto especial en la velocidad del coche
          // Aumentar la puntuación del jugador
          this.puntuacion += 5;
          selectedObject.parent.remove(selectedObject);
          console.log("Pick nube");
      } else if (selectedObject.parent.name=='fantasma') {
          console.log("Pick fantasma");
          selectedObject.parent.remove(selectedObject);
          this.puntuacion+=15;

      }

    }
}
}

/// La función   main
$(function () {

  // Se instancia la escena pasándole el  div  que se ha creado en el html para visualizar
  var scene = new MyScene("#WebGL-output");
  var esferaRadio=90;
  var esferaSegmentos=50;

  var esferaGeometry =  new THREE.SphereGeometry(esferaRadio, esferaSegmentos, esferaSegmentos);
  
  var loader = new THREE.TextureLoader();
  var texture = loader.load("../img/cielo.png");
  var fondoboxMaterial = new THREE.MeshBasicMaterial({ map: texture, side: THREE.BackSide });

  var fondobox = new THREE.Mesh(esferaGeometry, fondoboxMaterial);
  scene.add(fondobox);
  // Se añaden los listener de la aplicación. En este caso, el que va a comprobar cuándo se modifica el tamaño de la ventana de la aplicación.
  window.addEventListener ("resize", () => scene.onWindowResize());

  // //Listener para las teclas
   window.addEventListener ("keydown", (event) => scene.onKeyDown(event));
   window.addEventListener("mousedown", (event) => scene.onMouseDown(event));

  // Que no se nos olvide, la primera visualización.
  scene.update();
});
