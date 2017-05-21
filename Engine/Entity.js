
var Entity = function()
{
  Mesh.call(this);

  this.worldMatrix = new Float32Array(16);
  this.Update = function(dt)
  {
    var angle = 0;
    var xRotationMatrix = new Float32Array(16);
    var yRotationMatrix = new Float32Array(16);
    var rotationMatrix = new Float32Array(16);
    mat4.identity(rotationMatrix);
    mat4.rotate(xRotationMatrix, rotationMatrix, angle, [0, 1 * dt, 0]);
    mat4.rotate(yRotationMatrix, rotationMatrix, angle / 4, [1, 0, 0]);
    if (this.hasRigidBody) {
      this.position = [this.rigidBody.position.x,this.rigidBody.position.z,this.rigidBody.position.y];
      var quats = quat.create();
      quats = [-this.rigidBody.quaternion.x, -this.rigidBody.quaternion.z, -this.rigidBody.quaternion.y, this.rigidBody.quaternion.w];
      mat4.fromRotationTranslation(this.worldMatrix, quats, this.position);
    } else {
      mat4.mul(this.worldMatrix, yRotationMatrix, xRotationMatrix);
      mat4.translate(this.worldMatrix, this.worldMatrix, this.position);
    }

    mat4.scale(this.worldMatrix, this.worldMatrix, this.scale);

  }
}
