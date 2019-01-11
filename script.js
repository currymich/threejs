let container, renderer, scene, camera, geometry, material, mesh, controls;

window.onload = function() {
  container = document.getElementById("container");

  init();
  animate();
};

const init = () => {
  const width = container.clientWidth;
  const height = container.clientHeight;
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(width, height);
  renderer.setClearColor(0xdddddd, 1);
  container.appendChild(renderer.domElement);

  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(
    50, // Field of view
    width / height, // Aspect ratio
    0.1, // Near plane - 14.5
    10000 // Far plane - 18.5
  );
  camera.position.set(10, 10, 10);
  camera.lookAt(scene.position);

  /******************************************
                    Geometries
  ******************************************/

  // geometry = new THREE.BoxGeometry(5, 5, 5);
  // geometry = new THREE.SphereGeometry( 3, 32, 32 );
  geometry = new THREE.TorusGeometry(3, 1, 25, 50);

  /******************************************
                    Materials
  ******************************************/

  // A material that maps the normal vectors to RGB colors. no lighting effect
  // material = new THREE.MeshNormalMaterial();

  // A material for drawing geometries in a simple shaded (flat or wireframe) way. no lighting effect
  // material = new THREE.MeshBasicMaterial({ color: 0x999999, wireframe: true });

  // A material for non-shiny surfaces, uses lights, no specular highlights, good performance.
  // material = new THREE.MeshLambertMaterial();

  // A material for shiny surfaces with specular highlights, good performance.
  // material = new THREE.MeshPhongMaterial();

  // more accurate and realistic looking result, more computationally expensive.
  material = new THREE.MeshStandardMaterial({
    emissive: 0x222222,
    // emissive: 0x3481F8,
    metalness: 0.75,
    roughness: 0.25
  });

  mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  /******************************************
                    Lights
  ******************************************/

  // This light globally illuminates all objects in the scene equally. Does not cast shadows
  const ambientLight = new THREE.AmbientLight(0x444444); // soft white light
  scene.add(ambientLight);

  // A light source positioned directly above, cannot cast shadows
  // var hemisphereLight = new THREE.HemisphereLight(0xfdb813, 0x080820, 1);
  // scene.add(hemisphereLight);

  // A light that gets emitted from a single point in all directions (~Lightbulb). Can cast shadows
  const pointLight = new THREE.PointLight(0xFDB813);
  pointLight.position.set(10, 7.5, 5);
  scene.add(pointLight);

  // A light emitted in a specific direction. will behave as though infinitely far away (~sun). can cast shadows
  // const lightOne = new THREE.DirectionalLight(0x05c8ff, 0.5);
  // lightOne.position.set(10, 1, 2);
  // lightOne.castShadow = true;
  // scene.add(lightOne);
  const lightTwo = new THREE.DirectionalLight(0xff8100, 0.5);
  lightTwo.position.set(2, 10, 1);
  lightTwo.castShadow = true;
  scene.add(lightTwo);
  // const lightThree = new THREE.DirectionalLight(0x3dff00, 0.5);
  // lightThree.position.set(2, 1, 10);
  // scene.add(lightOne, lightTwo, lightThree);

  /******************************************
                    Shadows
  ******************************************/

  // Turn shadows on in the renderer
  renderer.shadowMap.enabled = true; // default false
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  // Allow our object to cast shadows
  mesh.castShadow = true; // default false

  // Create a plane to cast shadows on
  const planeGeometry = new THREE.PlaneBufferGeometry(20, 20, 32, 32);
  const planeMaterial = new THREE.MeshStandardMaterial({ color: 0xaaaaaa });
  const plane = new THREE.Mesh(planeGeometry, planeMaterial);
  scene.add(plane);

  // rotate the plane and position below our object, allow to receive shadows
  plane.rotation.x = Math.PI / -2;
  plane.position.set(0, -5, 0);
  plane.receiveShadow = true; // default false

  // add a light above our object (default position is above)
  var light = new THREE.DirectionalLight(0xffffff, 0.5, 100);
  light.castShadow = true; // default false
  scene.add(light);

  pointLight.castShadow = true; // default false

  /******************************************
                    Controls
  ******************************************/

  controls = new THREE.OrbitControls(camera);

  renderer.render(scene, camera);
};

const animate = () => {
  requestAnimationFrame(animate);

  mesh.rotation.x += 0.01;
  mesh.rotation.y += 0.02;

  renderer.render(scene, camera);
};
