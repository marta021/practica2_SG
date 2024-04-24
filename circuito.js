/*Caso particular: barrido de un círculo por una trayectoria libre
Clase para crear el tubo para las prácticas. Parámetros:
▶ path: El CatmullRomCurve3 del recorrido, lo haremos cerrado
▶ tubularSegments: El número de segmentos a lo largo del tubo.
Debe ser alto dependiendo de lo sinuoso que sea el camino, en
general, varios cientos.
▶ radius: El radio del círculo del tubo
▶ radialSegments: El número de segmentos del círculo.
Con pocas decenas es suficiente.
▶ closed: Se pondrá a true para las prácticas.
El tubo debe estar cerrado (acabar donde empieza)*/

/*var pts = [new THREE. Vector3 (10 ,0 ,0) , . . . , new THREE. Vector3 (10 ,0 ,10) ] ;
/ / NO se r e p i t e e l primer punto
var path = new THREE. CatmullRomCurve3 ( pts , true ) ; / / true para c e r r a r l a curva
var resolucion = 200;
var radio = 2;
var segmentosCirculo = 20;
var geometriaTubo = new THREE. TubeGeometry ( path , resolucion , radio , segmentosCirculo , true ) ;
/ / true para c e r r a r l o*/