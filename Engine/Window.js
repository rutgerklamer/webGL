var gl;
var canvas;

var previous;
var elapsedTime = 0;
var frameCount = 0;
var lastTime = 0;
var dt;


var up = false;

var firstBox;
var firstBox2;

var meshes = new Array();
var shader3D;
var shader3DDepth;
var shader2D;
var camera;

var light;
var floor;
var shadowMesh;

var rttFramebuffer;
var rttTexture;
var renderbuffer;

var HUDmesh;
var world;
var fixedTimeStep;
var maxSubSteps;
var sphereBody;

function main() {
    camera = new Camera();
    camera.SetPosition([5.75,11.2,11.2]);

    document.onkeydown = handleKeyDown;
    document.onkeyup = handleKeyUp;

    lastTime = new Date().getTime();

    initGL();
    initShaders();
    initFrameBuffer();
    initCannon();
    initMeshes();

    shader3D.Use();

    document.getElementsByTagName("canvas")[0].addEventListener("click", function() {
        this.requestPointerLock();
    }, false);

    document.getElementsByTagName("canvas")[0].addEventListener("mousemove", function(e) {
        camera.ProcessMouseMovement(e);
    }, false);

    requestAnimationFrame(loop);
}

function errorCallback(error) {
    console.log(error);
}

function loop(timestamp) {
    now = Date.now() * 0.001;
    dt = now - previous;
    previous = now;

    var currentTime = new Date().getTime();

    frameCount++;
    elapsedTime += (currentTime - lastTime);
    var ms = ((currentTime - lastTime) / 1000);


    lastTime = currentTime;

    if (elapsedTime >= 1000) {
        fps = frameCount;
        frameCount = 0;
        elapsedTime -= 10000;

        console.log("Your current fps is : " + fps / 10);
    }

    gl.clearColor(0.82, 1.0, 0.4, 1.0);
    gl.clear(gl.DEPTH_BUFFER_BIT | gl.COLOR_BUFFER_BIT);
    camera.ProcessKeys();
    shader3D.Use();

    var matViewUniformLocation = gl.getUniformLocation(shader3D.program, 'mView');
    var viewMatrix = new Float32Array(16);
    viewMatrix = camera.GetViewMatrix();
    gl.uniformMatrix4fv(matViewUniformLocation, gl.FALSE, viewMatrix);

    gl.bindFramebuffer(gl.FRAMEBUFFER, rttFramebuffer);

    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.DEPTH_BUFFER_BIT | gl.COLOR_BUFFER_BIT);
    var matViewUniformLocation = gl.getUniformLocation(shader3D.program, 'mView');
    var viewMatrix = new Float32Array(16);
    viewMatrix = camera.GetViewMatrix();
    gl.uniformMatrix4fv(matViewUniformLocation, gl.FALSE, viewMatrix);
    shader3DDepth.Use();
    gl.viewport(0,0,rttFramebuffer.width, rttFramebuffer.height);
    light.Draw();
    gl.cullFace(gl.FRONT);
    RenderShadows(shadowMesh,shader3DDepth);
    var tempPosition = vec3.create();
    tempPosition = shadowMesh.position;
    shadowMesh.position = camera.GetPosition();
    RenderShadows(shadowMesh,shader3DDepth);
    shadowMesh.position = tempPosition;
    RenderShadows(floor,shader3DDepth);
    for (i = 0; i < meshes.length; i++) {
          meshes[i].hasLighting = 0;
          RenderShadows(meshes[i], shader3DDepth);
          meshes[i].hasLighting = 1;
    }

    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    gl.cullFace(gl.BACK);
    gl.viewport(0,0,1024, 720);

    shader3D.Use();
    for (i = 0; i < meshes.length; i++) {
          Render(meshes[i], shader3D);
    }
    Render(light,shader3D);
    Render(floor,shader3D);
    //console.log(OimoMesh.getPosition().y)

  //  shadowMesh.position = [sphereBody.position.x,sphereBody.position.z,sphereBody.position.y];
   /*console.log(shadowMesh.position);
   console.log(camera.position);*/

    Render(shadowMesh,shader3D);
    shader2D.Use();
    Render2D(HUDmesh,shader2D);
    var camPos = vec3.create();
    camera.Update();
    camera.GetFront();
    camera.ProcessKeys();

    requestAnimationFrame(loop);
};

function initGL()
{
  canvas = document.getElementById('game-surface');
  gl = canvas.getContext('webgl2');

  if (!gl) {
      console.log('WebGL is now supported! :(, I will try it one more time on experimental mode.');
      gl = canvas.getContext('experimental-webgl');
  }
  if (!gl) {
      alert('WebGl is not supported, Try a different browser.');
  }

  gl.clearColor(0.3, 0.3, 0.1, 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  gl.enable(gl.DEPTH_TEST);
  gl.enable(gl.CULL_FACE);
}

function initShaders()
{
      shader2D = new Shader("Shaders/shader.vert", "Shaders/shader.frag");
      shader3D = new Shader("Shaders/shader3D.vert", "Shaders/shader3D.frag");
      shader3DDepth = new Shader("Shaders/shader3DDepth.vert", "Shaders/shader3DDepth.frag");
}

function initMeshes()
{
  for (var x = 0; x < 2; x++) {
    for (var y = 0; y < 2; y++) {
      for (var z = 0; z < 2; z++) {
      meshes.push(new Entity());
      meshes[meshes.length-1].CreateMesh();
      meshes[meshes.length-1].position[0] = -40 + x * 15 + Rand();
      meshes[meshes.length-1].position[1] = y * 15;
      meshes[meshes.length-1].position[2] = z * 15 + Rand();
      meshes[meshes.length-1].scale = [5,5,5];
      meshes[meshes.length-1].boxTexture = CreateTexture("crate-image");
      meshes[meshes.length-1].normalMap = CreateTexture("normal");
      meshes[meshes.length-1].depthMap = rttTexture;
      meshes[meshes.length-1].hasLighting = 1;
      meshes[meshes.length-1].AddRigidBody();
      }
    }
  }

  light = new Entity();
  light.CreateMesh();
  light.position[0] = 40;
  light.position[1] = 40;
  light.position[2] = 45;
  light.boxTexture = CreateTexture("normal");
  light.normalMap = CreateTexture("normal");
  light.depthMap = rttTexture;

  shadowMesh = new Entity();
  shadowMesh.CreateMesh();
  shadowMesh.position = [25.5,40,30];
  shadowMesh.scale = [1,1,1];
  shadowMesh.boxTexture = rttTexture;
  shadowMesh.normalMap = CreateTexture("normal");
  shadowMesh.depthMap = rttTexture;
  shadowMesh.hasLighting = 0;
  shadowMesh.AddRigidBody();

  floor = new Entity();
  floor.CreateMesh();
  floor.position = [9,-11,10];
  floor.scale = [100,10,100];
  floor.boxTexture = CreateTexture("crate-image");
  floor.hasLighting = 1;
  floor.normalMap = CreateTexture("normal");
  floor.depthMap = rttTexture;


  HUDmesh = new HUDMesh();
  HUDmesh.CreateMesh();
  HUDMesh.cubeTexture = rttTexture;
}

function initFrameBuffer()
{
  rttFramebuffer = gl.createFramebuffer();
  gl.bindFramebuffer(gl.FRAMEBUFFER, rttFramebuffer);
  rttFramebuffer.width = 1024 * 8;
  rttFramebuffer.height = 720 * 8;

  rttTexture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, rttTexture);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, rttFramebuffer.width  , rttFramebuffer.height  , 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);

  depthBuffer = gl.createRenderbuffer();
  gl.bindRenderbuffer(gl.RENDERBUFFER, depthBuffer);
  gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, rttFramebuffer.width , rttFramebuffer.height );

  gl.bindFramebuffer(gl.FRAMEBUFFER, rttFramebuffer);
  gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, rttTexture, 0);
  gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, depthBuffer);

  rttFramebuffer.texture = rttTexture;
  gl.bindFramebuffer(gl.FRAMEBUFFER, null);
  gl.bindTexture(gl.TEXTURE_2D, null);
  gl.bindRenderbuffer(gl.RENDERBUFFER, null);
}

function initCannon()
{
   world = new CANNON.World();
  world.gravity.set(0, 0, -9.82); // m/s²

  // Create a sphere
  var radius = 1; // m


  // Create a plane
  var groundBody = new CANNON.Body({
      mass: 0 // mass == 0 makes the body static
  });
  var groundShape = new CANNON.Plane();
  groundBody.addShape(groundShape);
  world.addBody(groundBody);

  fixedTimeStep = 1.0 / 60.0; // seconds
  maxSubSteps = 3;

  // Start the simulation loop
  var lastTime;
  (function simloop(time){
    requestAnimationFrame(simloop);
    if(lastTime !== undefined) {
       var dt = (time - lastTime) / 1000;
       world.step(fixedTimeStep, dt, maxSubSteps);
    }
    //console.log("Sphere z position: " + shadowMesh.rigidBody.position.z);
    lastTime = time;
  })();
}
