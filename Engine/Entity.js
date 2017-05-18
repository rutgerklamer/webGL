
var Entity = function()
{
  Mesh.call(this);

  this.worldMatrix = new Float32Array(16);
  this.position = vec3.create();
  this.scale = vec3.create();
  this.scale = [1,1,1];
  this.Update = function(dt)
  {
    var angle = 0;
    var xRotationMatrix = new Float32Array(16);
    var yRotationMatrix = new Float32Array(16);
    var identityMatrix = new Float32Array(16);

    mat4.identity(identityMatrix);
    mat4.rotate(xRotationMatrix, identityMatrix, angle, [0, 1 * dt, 0]);
    mat4.rotate(yRotationMatrix, identityMatrix, angle / 4, [1, 0, 0]);
    mat4.mul(this.worldMatrix, yRotationMatrix, xRotationMatrix);
    mat4.translate(this.worldMatrix, this.worldMatrix, this.position);
    mat4.scale(this.worldMatrix, this.worldMatrix, this.scale);
  }
}
