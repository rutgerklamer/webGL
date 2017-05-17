function Render(mesh, shader) {
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
