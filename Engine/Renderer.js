function Render(mesh, shader) {
    mesh.Update(dt);
  //  mesh.Draw();
    var xRotationMatrix = new Float32Array(16);
    var yRotationMatrix = new Float32Array(16);
    var identityMatrix = new Float32Array(16);

    mat4.identity(identityMatrix);

    var matWorldUniformLocation = gl.getUniformLocation(shader.program, 'mWorld');
    var matViewUniformLocation = gl.getUniformLocation(shader.program, 'mView');
    var matProjUniformLocation = gl.getUniformLocation(shader.program, 'mProj');
    var lightPositionUniformLocation = gl.getUniformLocation(shader.program, 'lightPosition');
    var camPositionUniformLocation = gl.getUniformLocation(shader.program, 'camPosition');
    var camFrontUniformLocation = gl.getUniformLocation(shader.program, 'camFront');
    var textureUniformLocation = gl.getUniformLocation(shader.program, 'MyTexture');
    var normalMapUniformLocation = gl.getUniformLocation(shader.program, 'normalMap');
    var depthMapUniformLocation = gl.getUniformLocation(shader.program, 'depthMap');
    var hasLightingUniformLocation = gl.getUniformLocation(shader.program, 'hasLighting');
    var lightProjUniformLocation = gl.getUniformLocation(shader.program, 'lightProj');
    var lightViewUniformLocation = gl.getUniformLocation(shader.program, 'lightView');

    var worldMatrix = new Float32Array(16);
    var viewMatrix = new Float32Array(16);
    var projMatrix = new Float32Array(16);
    var lightProjection = new Float32Array(16);
    var lightView = new Float32Array(16);

    mat4.identity(worldMatrix);

    var near_plane = 1.0;
    var far_plane = 700.5;
    mat4.ortho(lightProjection, -100.0, 100.0, -50.0, 100.0, near_plane, far_plane);
    var camerafront = vec3.create();
    camerafront[0] = - camera.GetFront()[0];
    camerafront[1] = - camera.GetFront()[1];
    camerafront[2] = - camera.GetFront()[2];
    mat4.lookAt(lightView, light.position, camerafront, [0, 1, 0]);
    mat4.perspective(projMatrix, glMatrix.toRadian(45), canvas.width / canvas.height, 0.1, 1000.0);
    viewMatrix = camera.GetViewMatrix();

    gl.uniformMatrix4fv(lightViewUniformLocation, gl.FALSE, lightView);
    gl.uniformMatrix4fv(lightProjUniformLocation, gl.FALSE, lightProjection);
    gl.uniformMatrix4fv(matViewUniformLocation, gl.FALSE, viewMatrix);
    gl.uniformMatrix4fv(matProjUniformLocation, gl.FALSE, projMatrix);
    gl.uniform3f(lightPositionUniformLocation, light.position[0], light.position[1], light.position[2]);
    gl.uniform3f(camPositionUniformLocation, camera.GetPosition()[0], camera.GetPosition()[1], camera.GetPosition()[2]);
    gl.uniform3f(camFrontUniformLocation, camera.GetFront()[0], camera.GetFront()[1],camera.GetFront()[2]);
    gl.uniformMatrix4fv(matWorldUniformLocation, gl.FALSE, mesh.worldMatrix);
    gl.uniform1f(hasLightingUniformLocation, mesh.hasLighting);

    gl.uniform1i(textureUniformLocation, 0);
    gl.uniform1i(normalMapUniformLocation, 1);
    gl.uniform1i(depthMapUniformLocation, 2);
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, mesh.boxTexture);
    gl.activeTexture(gl.TEXTURE1);
    gl.bindTexture(gl.TEXTURE_2D, mesh.normalMap);
    gl.activeTexture(gl.TEXTURE2);
    gl.bindTexture(gl.TEXTURE_2D, mesh.depthMap);


    gl.drawElements(gl.TRIANGLES, mesh.indices.length, gl.UNSIGNED_SHORT, 0);
}
function Render2D(mesh, shader)
  {
    var xRotationMatrix = new Float32Array(16);
    var yRotationMatrix = new Float32Array(16);
    var identityMatrix = new Float32Array(16);

    mat4.identity(identityMatrix);

    var matWorldUniformLocation = gl.getUniformLocation(shader.program, 'mWorld');
    var matViewUniformLocation = gl.getUniformLocation(shader.program, 'mView');
    var matProjUniformLocation = gl.getUniformLocation(shader.program, 'mProj');
    var lightPositionUniformLocation = gl.getUniformLocation(shader.program, 'lightPosition');
    var camPositionUniformLocation = gl.getUniformLocation(shader.program, 'camPosition');

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

  //  gl.uniformMatrix4fv(matWorldUniformLocation, gl.FALSE, mesh.worldMatrix);

    mesh.Update();
    gl.bindTexture(gl.TEXTURE_2D, mesh.boxTexture);
    gl.activeTexture(gl.TEXTURE0);
    gl.drawElements(gl.TRIANGLES, mesh.indices.length, gl.UNSIGNED_SHORT, 0);
  }

  function RenderShadows(mesh, shader) {
      mesh.Update(dt);
    //  mesh.Draw();


      var matWorldUniformLocation = gl.getUniformLocation(shader.program, 'mWorld');
      var matViewUniformLocation = gl.getUniformLocation(shader.program, 'mView');
      var matProjUniformLocation = gl.getUniformLocation(shader.program, 'mProj');

      var worldMatrix = new Float32Array(16);
      var lightProjection = new Float32Array(16);
      var lightView = new Float32Array(16);

      var near_plane = 1.0;
      var far_plane = 700.5;
      mat4.ortho(lightProjection, -100.0, 100.0, -50.0, 100.0, near_plane, far_plane);
      light.position = [10, 100, 195];
      var frontPos = vec3.create();
      var camerafront = vec3.create();
      camerafront[0] = - camera.GetFront()[0];
      camerafront[1] = - camera.GetFront()[1];
      camerafront[2] = - camera.GetFront()[2];
      mat4.lookAt(lightView, light.position, camerafront, [0, 1, 0]);
      viewMatrix = camera.GetViewMatrix();


      gl.uniformMatrix4fv(matViewUniformLocation, gl.FALSE, lightView);
      gl.uniformMatrix4fv(matProjUniformLocation, gl.FALSE, lightProjection);
      gl.uniformMatrix4fv(matWorldUniformLocation, gl.FALSE, mesh.worldMatrix);

      gl.drawElements(gl.TRIANGLES, mesh.indices.length, gl.UNSIGNED_SHORT, 0);
  }
