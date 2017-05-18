function Camera() {
    this.position = vec3.create();
    this.front = vec3.create();
    this.up = vec3.create();
    this.right = vec3.create();
    this.worldUp = vec3.create();
    this.worldUp[1] = 1;

    this.yaw = 252;;
    this.pitch = -40;;

    this.Update = function() {
        var frontTemp = vec3.create();
        frontTemp[0] = Math.cos(this.yaw * (Math.PI / 180)) * Math.cos((this.pitch * (Math.PI / 180)));
        frontTemp[1] = Math.sin(this.pitch * (Math.PI / 180));
        frontTemp[2] = Math.sin(this.yaw * (Math.PI / 180)) * Math.cos(this.pitch * (Math.PI / 180));
        vec3.normalize(this.front, frontTemp);
        vec3.cross(this.right, this.front, this.worldUp);
        vec3.cross(this.up, this.right, this.front);
    }
    this.GetPosition = function() {
        return this.position;
    }
    this.SetPosition = function(position) {
      this.position = position;
    }
    this.GetFront = function() {
      return this.front;
    }
    this.GetViewMatrix = function() {
        var viewMatrix = new Float32Array(16);
        var frontPos = vec3.create();
        vec3.add(frontPos, this.position, this.front);
        return mat4.lookAt(viewMatrix, this.position, frontPos, [0, 1, 0]);
    }
    this.ProcessMouseMovement = function(event) {
        var xOffset = event.movementX;
        var yOffset = event.movementY;
        xOffset *= 0.05;
        yOffset *= 0.05;
        this.yaw += xOffset;
        this.pitch -= yOffset;

        if (this.pitch >= 89.0) {
            this.pitch = 89.0;
        } else if (this.pitch <= -89.0) {
            this.pitch = -89.0;
        }
    }
    this.ProcessKeys = function() {
        if (keys["KeyW"]) {
            var front = vec3.divide(this.right, this.front, [10,10,10])
            vec3.add(this.position, this.position, front);
        }
        if (keys["KeyS"]) {
            var front = vec3.divide(this.right, this.front, [10,10,10])
            vec3.subtract(this.position, this.position, front);
        }
        if (keys["KeyA"]) {
            var right = vec3.divide(this.right, this.right, [10,10,10])
            vec3.subtract(this.position, this.position, right);
        }
        if (keys["KeyD"]) {
            var right = vec3.divide(this.right, this.right, [10,10,10])
            vec3.add(this.position, this.position, right);
        }
    }
}
