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
var camera;

var mesh;

var light;
function main() {
    camera = new Camera();

    document.onkeydown = handleKeyDown;
    document.onkeyup = handleKeyUp;

    lastTime = new Date().getTime();

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


    shader3D = new Shader("Shaders/vertex3D.shader", "Shaders/fragment3D.shader");

    for (var i = 0; i < 10; i++) {
        meshes[i] = new Entity();

        meshes[i].CreateMesh();
        meshes[i].position[0] = Rand() * 5;
        meshes[i].position[1] = Rand() * 5;
        meshes[i].position[2] = Rand() * 5;
        meshes[i].boxTexture = CreateTexture();
    }
    light = new Entity();
    light.CreateMesh();
    light.position[0] = 10;
    light.position[1] = 10;
    light.position[2] = 10;
    light.boxTexture = CreateTexture();

    CreateTexture();
    CreateSkybox();
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
    lastTime = currentTime;

    if (elapsedTime >= 10000) {
        fps = frameCount;
        frameCount = 0;
        elapsedTime -= 10000;

        console.log("Your current fps is : " + fps / 10);
    }


    gl.clearColor(0.45, 0.87, 0.42, 1.0);
    gl.clear(gl.DEPTH_BUFFER_BIT | gl.COLOR_BUFFER_BIT);
    camera.ProcessKeys();
    shader3D.Use();

    var matViewUniformLocation = gl.getUniformLocation(shader3D.program, 'mView');
    var viewMatrix = new Float32Array(16);
    viewMatrix = camera.GetViewMatrix();
    gl.uniformMatrix4fv(matViewUniformLocation, gl.FALSE, viewMatrix);

    for (i = 0; i < meshes.length; i++) {
        if (i == 0) {
          Render(meshes[i], shader3D);
        } else {
          Render(meshes[i], shader3D);
        }
    }
    Render(light,shader3D);
    var camPos = vec3.create();
    camera.Update();
    camera.GetFront();
    camPos[0] = meshes[0].position[0] - (camera.GetFront()[0] * 15);
    camPos[1] = meshes[1].position[1] - (camera.GetFront()[1] * 15);
    camPos[2] = meshes[2].position[2] - (camera.GetFront()[2] * 15);
    camera.ProcessKeys();
  //  camera.SetPosition(camPos);
    requestAnimationFrame(loop);
};
