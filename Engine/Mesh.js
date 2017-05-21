function Mesh() {
    var boxVertices;
    this.rigidBody;
    this.hasRigidBody;
    this.boxIndices;
    this.boxTexture;
    this.normalMap;
    this.depthMap;
    this.hasLighting = 1;

    this.VBO;
    this.IBO;

    this.indices;
    this.vertices;
    this.AddRigidBody = function()
    {
      var radius = 1;
      this.rigidBody = new CANNON.Body({
          mass: 15, // kg
          position: new CANNON.Vec3(this.position[0], this.position[2], this.position[1]), // m
          shape: new CANNON.Box(new CANNON.Vec3(5.0,5.0,5.0))
       });
     world.addBody(this.rigidBody);
     this.hasRigidBody = true;
    }
    this.CreateMesh = function() {


        boxVertices = [
            -1.0, 1.0, -1.0, 0.0, 0.0, 0.0,  1.0,  0.0,
            -1.0, 1.0, 1.0, 0.0, 1.0, 0.0,  1.0,  0.0,
            1.0, 1.0, 1.0, 1.0, 1.0, 0.0, 1.0, 0.0,
            1.0, 1.0, -1.0, 1.0, 0.0, 0.0, 1.0, 0.0,

            -1.0, 1.0, 1.0, 0.0, 0.0, -1.0, 0.0, 0.0,
            -1.0, -1.0, 1.0, 1.0, 0.0, -1.0, 0.0, 0.0,
            -1.0, -1.0, -1.0, 1.0, 1.0, -1.0, 0.0, 0.0,
            -1.0, 1.0, -1.0, 0.0, 1.0, -1.0, 0.0, 0.0,

            1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 0.0, 0.0,
            1.0, -1.0, 1.0, 0.0, 1.0, 1.0, 0.0, 0.0,
            1.0, -1.0, -1.0, 0.0, 0.0, 1.0, 0.0, 0.0,
            1.0, 1.0, -1.0, 1.0, 0.0, 1.0, 0.0, 0.0,

            1.0, 1.0, 1.0, 1.0, 1.0, 0.0, 0.0, 1.0,
            1.0, -1.0, 1.0, 1.0, 0.0, 0.0, 0.0, 1.0,
            -1.0, -1.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0,
            -1.0, 1.0, 1.0, 0.0, 1.0, 0.0, 0.0, 1.0,

            1.0, 1.0, -1.0, 0.0, 0.0, 0.0, 0.0, -1.0,
            1.0, -1.0, -1.0, 0.0, 1.0, 0.0, 0.0, -1.0,
            -1.0, -1.0, -1.0, 1.0, 1.0, 0.0, 0.0, -1.0,
            -1.0, 1.0, -1.0, 1.0, 0.0, 0.0, 0.0, -1.0,

            -1.0, -1.0, -1.0, 1.0, 1.0, 0.0, -1.0, 0.0,
            -1.0, -1.0, 1.0, 1.0, 0.0, 0.0, -1.0, 0.0,
            1.0, -1.0, 1.0, 0.0, 0.0, 0.0, -1.0, 0.0,
            1.0, -1.0, -1.0, 0.0, 1.0, 0.0, -1.0, 0.0
        ];

        boxIndices = [
            0, 1, 2,
            0, 2, 3,

            5, 4, 6,
            6, 4, 7,

            8, 9, 10,
            8, 10, 11,

            13, 12, 14,
            15, 14, 12,

            16, 17, 18,
            16, 18, 19,

            21, 20, 22,
            22, 20, 23
        ];
        var vertices = new Array();
        var tangentArray = new Array();

        for (i = 0; i < boxVertices.length ;i+=8)
        {
          // Shortcuts for vertices
          var v0 = [boxVertices[i], boxVertices[i+1], boxVertices[i+2]];
          var v1 = [boxVertices[i + 8], boxVertices[i+8+1], boxVertices[i+8+2]];
          var v2 = [boxVertices[i+16], boxVertices[i+16+1], boxVertices[i+16+2]];

          // Shortcuts for UVs
          var uv0 = [boxVertices[i + 3], boxVertices[i+4]];
          var uv1 = [boxVertices[i+8+ 3], boxVertices[i+8+4]];
          var uv2 = [boxVertices[i+16+ 3], boxVertices[i+16+4]];

          var normal0 = [boxVertices[i + 5], boxVertices[i+6], boxVertices[i+7]];
          var normal1 = [boxVertices[i + 8 + 5], boxVertices[i + 8+6], boxVertices[i + 8+7]];
          var normal2 = [boxVertices[i + 16 + 5], boxVertices[i + 16+6], boxVertices[i + 16+7]];

          // Edges of the triangle : postion delta
          var deltaPos1 = vec3.create();
          var deltaPos2 = vec3.create();

          vec3.subtract(deltaPos1, v1, v0);
          vec3.subtract(deltaPos2, v2, v0);

          // UV delta
          var deltaUV1 = vec2.create();
          var deltaUV2 = vec2.create();
          vec2.subtract(deltaUV1, uv1, uv0);
          vec2.subtract(deltaUV2, uv2, uv0);


          var r = 1.0 / ((deltaUV1[0] * deltaUV2[1]) - (deltaUV1[1] * deltaUV2[0]));
          deltaPos1 = [deltaPos1[0] * deltaUV2[1], deltaPos1[1] * deltaUV2[1], deltaPos1[2] * deltaUV2[1]];
          deltaPos2 = [deltaPos2[0] * deltaUV1[1], deltaPos2[1] * deltaUV1[1], deltaPos2[2] * deltaUV1[1]];
          var tangent = vec3.create();
          vec3.subtract(tangent, deltaPos1, deltaPos2);


          tangentArray.push(tangent);
          vertices.push(v0[0]);
          vertices.push(v0[1]);
          vertices.push(v0[2]);
          vertices.push(uv0[0]);
          vertices.push(uv0[1]);
          vertices.push(normal0[0]);
          vertices.push(normal0[1]);
          vertices.push(normal0[2]);
          vertices.push(tangent[0]);
          vertices.push(tangent[1]);
          vertices.push(tangent[2]);
        }
        var j = 0;
        for (i = 0; i < vertices.length/4; i+=11)
        {
          vertices[i * 4 + 11 + 7] = vertices[i * 4 + 7];
          vertices[i * 4 + 11 + 8] = vertices[i * 4+ 8];
          vertices[i * 4 + 11 + 9] = vertices[i * 4+ 9];
          vertices[i * 4 + 22 + 7] = vertices[i * 4 + 7];
          vertices[i * 4 + 22 + 8] = vertices[i * 4+ 8];
          vertices[i * 4 + 22 + 9] = vertices[i * 4+ 9];
          vertices[i * 4 + 33 + 7] = vertices[i * 4 + 7];
          vertices[i * 4 + 33 + 8] = vertices[i * 4+ 8];
          vertices[i * 4 + 33 + 9] = vertices[i * 4+ 9];
        }
        //for (i = 0; i < boxVertices.length; i ++)



        this.indices = boxIndices;
        this.vertices = vertices;
        this.VBO = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.VBO);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.vertices), gl.STATIC_DRAW);

        this.IBO = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.IBO);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(this.indices), gl.STATIC_DRAW);

        var positionAttribLocation = gl.getAttribLocation(shader3D.program, 'vertPosition');
        var texCoordAttribLocation = gl.getAttribLocation(shader3D.program, 'vertTexCoord');
        var normalAttribLocation = gl.getAttribLocation(shader3D.program, 'normalCoord');
        var tangentAttribLocation = gl.getAttribLocation(shader3D.program, 'tangent');

        gl.vertexAttribPointer(positionAttribLocation, 3, gl.FLOAT, gl.FALSE, 11 * Float32Array.BYTES_PER_ELEMENT, 0);
        gl.vertexAttribPointer( texCoordAttribLocation, 2, gl.FLOAT, gl.FALSE, 11 * Float32Array.BYTES_PER_ELEMENT, 3 * Float32Array.BYTES_PER_ELEMENT);
        gl.vertexAttribPointer( normalAttribLocation, 3, gl.FLOAT, gl.FALSE, 11 * Float32Array.BYTES_PER_ELEMENT, 5 * Float32Array.BYTES_PER_ELEMENT);
        gl.vertexAttribPointer( tangentAttribLocation, 3, gl.FLOAT, gl.FALSE, 11 * Float32Array.BYTES_PER_ELEMENT, 8 * Float32Array.BYTES_PER_ELEMENT);
        gl.enableVertexAttribArray(positionAttribLocation);
        gl.enableVertexAttribArray(texCoordAttribLocation);
        gl.enableVertexAttribArray(normalAttribLocation);
        gl.enableVertexAttribArray(tangentAttribLocation);
    }
    this.Draw = function() {
      gl.bindBuffer(gl.ARRAY_BUFFER, this.VBO);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.vertices), gl.STATIC_DRAW);

      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.IBO);
      gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(this.indices), gl.STATIC_DRAW);

      var positionAttribLocation = gl.getAttribLocation(shader3D.program, 'vertPosition');
      var texCoordAttribLocation = gl.getAttribLocation(shader3D.program, 'vertTexCoord');
      var normalAttribLocation = gl.getAttribLocation(shader3D.program, 'normalCoord');
      var tangentAttribLocation = gl.getAttribLocation(shader3D.program, 'tangent');

      gl.vertexAttribPointer(positionAttribLocation, 3, gl.FLOAT, gl.FALSE, 11 * Float32Array.BYTES_PER_ELEMENT, 0);
      gl.vertexAttribPointer( texCoordAttribLocation, 2, gl.FLOAT, gl.FALSE, 11 * Float32Array.BYTES_PER_ELEMENT, 3 * Float32Array.BYTES_PER_ELEMENT);
      gl.vertexAttribPointer( normalAttribLocation, 3, gl.FLOAT, gl.FALSE, 11 * Float32Array.BYTES_PER_ELEMENT, 5 * Float32Array.BYTES_PER_ELEMENT);
      gl.vertexAttribPointer( tangentAttribLocation, 3, gl.FLOAT, gl.FALSE, 11 * Float32Array.BYTES_PER_ELEMENT, 8 * Float32Array.BYTES_PER_ELEMENT);
      gl.enableVertexAttribArray(positionAttribLocation);
      gl.enableVertexAttribArray(texCoordAttribLocation);
      gl.enableVertexAttribArray(normalAttribLocation);
      gl.enableVertexAttribArray(tangentAttribLocation);

    }
    this.LoadObject = function()
    {
      console.log("hello");
      var string;
      string = shader3D.LoadShaderFile("Objects/untitled3.obj");
      string = string.split("\n");
      var vertex = vec3.create();
      var uv = vec2.create();
      var normal = vec3.create();
      var vertex_buffer;
      var amount;
      var VAO;

      var vertexArray = new Array();
      var uvArray = new Array();
      var normalArray = new Array();

      var vertexIndices = new Array();
      var uvIndices = new Array();
      var normalIndices = new Array();
      for (i = 0; i < string.length; i++)
      {
        if (string[i].startsWith("v ")) {
          var vertexString = string[i].split(" ");
          vertex[0] = vertexString[1];
          vertex[1] = vertexString[2];
          vertex[2] = vertexString[3];
          vertexArray.push(vertex);
        }
        if (string[i].startsWith("vt ")) {
          var uvString = string[i].split(" ");
          uv[0] = uvString[1];
          uv[1] = uvString[2];
          uv[2] = uvString[3];
          uvArray.push(uv);
        }
        if (string[i].startsWith("vn ")) {
          var normalString = string[i].split(" ");
          normal[0] = normalString[1];
          normal[1] = normalString[2];
          normal[2] = normalString[3];
          normalArray.push(normal);
         }
        if (string[i].startsWith("f ")) {
          var indicesStringTemp = string[i].split(" ");
          var indicesString = new Array();;
          for (j = 1; j < indicesStringTemp.length; j++)
          {
            indicesString.push(indicesStringTemp[j].split("/"));
          }
          vertexIndices.push(indicesString[0][0]);
          vertexIndices.push(indicesString[1][0]);
          vertexIndices.push(indicesString[2][0]);
          uvIndices.push(indicesString[0][1]);
          uvIndices.push(indicesString[1][1]);
          uvIndices.push(indicesString[2][1]);
          normalIndices.push(indicesString[0][2]);
          normalIndices.push(indicesString[1][2]);
          normalIndices.push(indicesString[2][2]);
        }
      }
      var vertices = new Array();
      var indices = new Array();
      for (k = 0; k < vertexIndices.length; k++) {
        var vertexIndex = vertexIndices[k];
        vertices[k * 11] = vertexArray[vertexIndex-1][0];
        vertices[k * 11 + 1] = vertexArray[vertexIndex-1][1];
        vertices[k * 11 + 2] = vertexArray[vertexIndex-1][2];
        var uvIndex = uvIndices[k];
        vertices[k * 11 + 3] = uvArray[uvIndex-1][0];
        vertices[k * 11 + 4] = uvArray[uvIndex-1][1];
        var normalIndex = normalIndices[k];
        vertices[k * 11 + 5] = normalArray[normalIndex-1][0];
        vertices[k * 11 + 6] = normalArray[normalIndex-1][1];
        vertices[k * 11 + 7] = normalArray[normalIndex-1][2];

        vertices[k * 11 + 8] = 1;
        vertices[k * 11 + 9] = 1;
        vertices[k * 11 + 10] = 1;
        indices.push(k);
      }
      this.indices = indices;
      this.vertices = vertices;
      this.VBO = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, this.VBO);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.vertices), gl.STATIC_DRAW);

      this.IBO = gl.createBuffer();
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.IBO);
      gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(this.indices), gl.STATIC_DRAW);

      var positionAttribLocation = gl.getAttribLocation(shader3D.program, 'vertPosition');
      var texCoordAttribLocation = gl.getAttribLocation(shader3D.program, 'vertTexCoord');
      var normalAttribLocation = gl.getAttribLocation(shader3D.program, 'normalCoord');
      var tangentAttribLocation = gl.getAttribLocation(shader3D.program, 'tangent');
      gl.vertexAttribPointer(positionAttribLocation, 3, gl.FLOAT, gl.FALSE, 11 * Float32Array.BYTES_PER_ELEMENT, 0);
      gl.vertexAttribPointer( texCoordAttribLocation, 2, gl.FLOAT, gl.FALSE, 11 * Float32Array.BYTES_PER_ELEMENT, 3 * Float32Array.BYTES_PER_ELEMENT);
      gl.vertexAttribPointer( normalAttribLocation, 3, gl.FLOAT, gl.FALSE, 11 * Float32Array.BYTES_PER_ELEMENT, 5 * Float32Array.BYTES_PER_ELEMENT);
      gl.vertexAttribPointer( tangentAttribLocation, 3, gl.FLOAT, gl.FALSE, 11 * Float32Array.BYTES_PER_ELEMENT, 8 * Float32Array.BYTES_PER_ELEMENT);
      gl.enableVertexAttribArray(positionAttribLocation);
      gl.enableVertexAttribArray(texCoordAttribLocation);
      gl.enableVertexAttribArray(normalAttribLocation);
      gl.enableVertexAttribArray(tangentAttribLocation);
    }
}
