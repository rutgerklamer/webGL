function Render(mesh, shader) {
    var xRotationMatrix = new Float32Array(16);
    var yRotationMatrix = new Float32Array(16);
    var identityMatrix = new Float32Array(16);

    mat4.identity(identityMatrix);

    var matWorldUniformLocation = gl.getUniformLocation(shader3D.program, 'mWorld');
    var matViewUniformLocation = gl.getUniformLocation(shader3D.program, 'mView');
    var matProjUniformLocation = gl.getUniformLocation(shader3D.program, 'mProj');
    var lightPositionUniformLocation = gl.getUniformLocation(shader3D.program, 'lightPosition');
    var camPositionUniformLocation = gl.getUniformLocation(shader3D.program, 'camPosition');
    var camFrontUniformLocation = gl.getUniformLocation(shader3D.program, 'camFront');
    var textureUniformLocation = gl.getUniformLocation(shader3D.program, 'MyTexture');
    var normalMapUniformLocation = gl.getUniformLocation(shader3D.program, 'normalMap');

    var worldMatrix = new Float32Array(16);
    var viewMatrix = new Float32Array(16);
    var projMatrix = new Float32Array(16);
    mat4.identity(worldMatrix);

    mat4.perspective(projMatrix, glMatrix.toRadian(45), canvas.width / canvas.height, 0.1, 1000.0);

    viewMatrix = camera.GetViewMatrix();

    gl.uniformMatrix4fv(matViewUniformLocation, gl.FALSE, viewMatrix);
    gl.uniformMatrix4fv(matProjUniformLocation, gl.FALSE, projMatrix);
    gl.uniform3f(lightPositionUniformLocation, light.position[0], light.position[1], light.position[2]);
    gl.uniform3f(camPositionUniformLocation, camera.GetPosition()[0], camera.GetPosition()[1], camera.GetPosition()[2]);
    gl.uniform3f(camFrontUniformLocation, camera.GetFront()[0], camera.GetFront()[1],camera.GetFront()[2]);
    gl.uniformMatrix4fv(matWorldUniformLocation, gl.FALSE, mesh.worldMatrix);

    mesh.Update(dt);
    gl.uniform1i(textureUniformLocation, 0);  // texture unit 0
    gl.uniform1i(normalMapUniformLocation, 1);  // texture unit 1
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, mesh.boxTexture);
    gl.activeTexture(gl.TEXTURE1);
    gl.bindTexture(gl.TEXTURE_2D, mesh.normalMap);

    gl.drawElements(gl.TRIANGLES, mesh.boxIndices.length, gl.UNSIGNED_SHORT, 0);
}

function RenderObject(mesh, shader) {
    var xRotationMatrix = new Float32Array(16);
    var yRotationMatrix = new Float32Array(16);
    var identityMatrix = new Float32Array(16);

    mat4.identity(identityMatrix);

    var matWorldUniformLocation = gl.getUniformLocation(shader3D.program, 'mWorld');
    var matViewUniformLocation = gl.getUniformLocation(shader3D.program, 'mView');
    var matProjUniformLocation = gl.getUniformLocation(shader3D.program, 'mProj');

    var worldMatrix = new Float32Array(16);
    var viewMatrix = new Float32Array(16);
    var projMatrix = new Float32Array(16);
    mat4.identity(worldMatrix);

    mat4.perspective(projMatrix, glMatrix.toRadian(45), canvas.width / canvas.height, 0.1, 1000.0);

    viewMatrix = camera.GetViewMatrix();

    gl.uniformMatrix4fv(matViewUniformLocation, gl.FALSE, viewMatrix);
    gl.uniformMatrix4fv(matProjUniformLocation, gl.FALSE, projMatrix);


    gl.uniformMatrix4fv(matWorldUniformLocation, gl.FALSE, mesh.worldMatrix);

    mesh.Update(dt);

    gl.bindTexture(gl.TEXTURE_2D, mesh.boxTexture);
    gl.activeTexture(gl.TEXTURE0);

    gl.drawElements(gl.TRIANGLES, mesh.boxIndices.length, gl.UNSIGNED_SHORT, 0);
  }

  function Render2D(mesh, shader)
  {
    var xRotationMatrix = new Float32Array(16);
    var yRotationMatrix = new Float32Array(16);
    var identityMatrix = new Float32Array(16);

    mat4.identity(identityMatrix);

    var matWorldUniformLocation = gl.getUniformLocation(shader3D.program, 'mWorld');
    var matViewUniformLocation = gl.getUniformLocation(shader3D.program, 'mView');
    var matProjUniformLocation = gl.getUniformLocation(shader3D.program, 'mProj');
    var lightPositionUniformLocation = gl.getUniformLocation(shader3D.program, 'lightPosition');
    var camPositionUniformLocation = gl.getUniformLocation(shader3D.program, 'camPosition');

    var worldMatrix = new Float32Array(16);
    var viewMatrix = new Float32Array(16);
    var projMatrix = new Float32Array(16);
    mat4.identity(worldMatrix);

    mat4.perspective(projMatrix, glMatrix.toRadian(45), canvas.width / canvas.height, 0.1, 1000.0);

    viewMatrix = camera.GetViewMatrix();

    gl.uniformMatrix4fv(matViewUniformLocation, gl.FALSE, viewMatrix);
    gl.uniformMatrix4fv(matProjUniformLocation, gl.FALSE, projMatrix);
    gl.uniform3f(lightPositionUniformLocation, light.position[0], light.position[1], light.position[2]);
    gl.uniform3f(camPositionUniformLocation, camera.GetPosition()[0] + camera.GetFront()[0], camera.GetPosition()[1]+ camera.GetFront()[1], camera.GetPosition()[2]+ camera.GetFront()[2]);

    console.log(camera.GetFront());

    gl.uniformMatrix4fv(matWorldUniformLocation, gl.FALSE, mesh.worldMatrix);

    mesh.Update(dt);

    gl.bindTexture(gl.TEXTURE_2D, mesh.boxTexture);
    gl.activeTexture(gl.TEXTURE0);
    gl.drawElements(gl.TRIANGLES, mesh.boxIndices.length, gl.UNSIGNED_SHORT, 0);
  }
