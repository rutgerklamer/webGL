function Mesh() {
    var boxVertices;
    var boxIndices;
    this.boxTexture;
  /*  this.LoadObject = function(string)
    {
      console.log("hello");
      var string;
      string = shader3D.LoadShaderFile("Objects/player.obj");
      string = string.split("\n");
      var vertex = vec3.create();
      var uv = vec2.create();
      var normal = vec3.create();
      this.vertex_buffer;
      this.amount;
      this.VAO;

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
          console.log(normalIndices);
        }
      }
      var vertices = new Array();
      var indices = new Array();
      for (k = 0; k < vertexIndices.length; k++) {
        var vertexIndex = vertexIndices[k];
        vertices[k * 8] = vertexArray[vertexIndex-1][0];
        vertices[k * 8 + 1] = vertexArray[vertexIndex-1][1];
        vertices[k * 8 + 2] = vertexArray[vertexIndex-1][2];
        var uvIndex = uvIndices[k];
        vertices[k * 8 + 3] = uvArray[uvIndex-1][0];
        vertices[k * 8 + 4] = uvArray[uvIndex-1][1];
        var normalIndex = normalIndices[k];
        vertices[k * 8 + 5] = normalArray[normalIndex-1][0];
        vertices[k * 8 + 6] = normalArray[normalIndex-1][1];
        vertices[k * 8 + 7] = normalArray[normalIndex-1][2];
        indices.push(k);
      }
      this.boxIndices = vertexIndices;
      boxVertices = vertices;

      var VBO = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, VBO);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(boxVertices), gl.STATIC_DRAW);

      var IBO = gl.createBuffer();
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, IBO);
      gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint32Array(vertexIndices), gl.STATIC_DRAW);

      var positionAttribLocation = gl.getAttribLocation(shader3D.program, 'vertPosition');
      var texCoordAttribLocation = gl.getAttribLocation(shader3D.program, 'vertTexCoord');
      var normalAttribLocation = gl.getAttribLocation(shader3D.program, 'normalCoord');
      gl.vertexAttribPointer(positionAttribLocation, 3, gl.FLOAT, gl.FALSE, 8 * Float32Array.BYTES_PER_ELEMENT, 0);
      gl.vertexAttribPointer( texCoordAttribLocation, 2, gl.FLOAT, gl.FALSE, 8 * Float32Array.BYTES_PER_ELEMENT, 3 * Float32Array.BYTES_PER_ELEMENT);
      gl.vertexAttribPointer( normalAttribLocation, 3, gl.FLOAT, gl.FALSE, 8 * Float32Array.BYTES_PER_ELEMENT, 5 * Float32Array.BYTES_PER_ELEMENT);
      gl.enableVertexAttribArray(positionAttribLocation);
      gl.enableVertexAttribArray(texCoordAttribLocation);
      gl.enableVertexAttribArray(normalAttribLocation);
    } */
    this.CreateMesh = function() {
        boxVertices = [
            -1.0, 1.0, -1.0, 0.0, 0.0, 0.0, 0.0, 0.0,
            -1.0, 1.0, 1.0, 0.0, 1.0, 0.0, 0.0, 0.0,
            1.0, 1.0, 1.0, 1.0, 1.0, 0.0, 0.0, 0.0,
            1.0, 1.0, -1.0, 1.0, 0.0, 0.0, 0.0, 0.0,

            -1.0, 1.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0,
            -1.0, -1.0, 1.0, 1.0, 0.0, 0.0, 0.0, 0.0,
            -1.0, -1.0, -1.0, 1.0, 1.0, 0.0, 0.0, 0.0,
            -1.0, 1.0, -1.0, 0.0, 1.0, 0.0, 0.0, 0.0,

            1.0, 1.0, 1.0, 1.0, 1.0, 0.0, 0.0, 0.0,
            1.0, -1.0, 1.0, 0.0, 1.0, 0.0, 0.0, 0.0,
            1.0, -1.0, -1.0, 0.0, 0.0, 0.0, 0.0, 0.0,
            1.0, 1.0, -1.0, 1.0, 0.0, 0.0, 0.0, 0.0,

            1.0, 1.0, 1.0, 1.0, 1.0, 0.0, 0.0, 0.0,
            1.0, -1.0, 1.0, 1.0, 0.0, 0.0, 0.0, 0.0,
            -1.0, -1.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0,
            -1.0, 1.0, 1.0, 0.0, 1.0, 0.0, 0.0, 0.0,

            1.0, 1.0, -1.0, 0.0, 0.0, 0.0, 0.0, 0.0,
            1.0, -1.0, -1.0, 0.0, 1.0, 0.0, 0.0, 0.0,
            -1.0, -1.0, -1.0, 1.0, 1.0, 0.0, 0.0, 0.0,
            -1.0, 1.0, -1.0, 1.0, 0.0, 0.0, 0.0, 0.0,

            -1.0, -1.0, -1.0, 1.0, 1.0, 0.0, 0.0, 0.0,
            -1.0, -1.0, 1.0, 1.0, 0.0, 0.0, 0.0, 0.0,
            1.0, -1.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0,
            1.0, -1.0, -1.0, 0.0, 1.0, 0.0, 0.0, 0.0
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

        this.boxIndices = boxIndices;

        var VBO = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, VBO);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(boxVertices), gl.STATIC_DRAW);

        var IBO = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, IBO);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(this.boxIndices), gl.STATIC_DRAW);

        var positionAttribLocation = gl.getAttribLocation(shader3D.program, 'vertPosition');
        var texCoordAttribLocation = gl.getAttribLocation(shader3D.program, 'vertTexCoord');
        var normalAttribLocation = gl.getAttribLocation(shader3D.program, 'normalCoord');
        gl.vertexAttribPointer(positionAttribLocation, 3, gl.FLOAT, gl.FALSE, 8 * Float32Array.BYTES_PER_ELEMENT, 0);
        gl.vertexAttribPointer( texCoordAttribLocation, 2, gl.FLOAT, gl.FALSE, 8 * Float32Array.BYTES_PER_ELEMENT, 3 * Float32Array.BYTES_PER_ELEMENT);
        gl.vertexAttribPointer( normalAttribLocation, 3, gl.FLOAT, gl.FALSE, 8 * Float32Array.BYTES_PER_ELEMENT, 5 * Float32Array.BYTES_PER_ELEMENT);
        gl.enableVertexAttribArray(positionAttribLocation);
        gl.enableVertexAttribArray(texCoordAttribLocation);
        gl.enableVertexAttribArray(normalAttribLocation);

    }
    this.Update = function() {
      gl.bindBuffer(gl.ARRAY_BUFFER, this.vertex_buffer);
    }
}
