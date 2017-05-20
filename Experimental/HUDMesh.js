function HUDMesh() {
    var boxVertices;
    var boxIndices;

    var position = vec3.create();

    this.position = position;
    this.cubeTexture;
    this.VBO;
    this.IBO;

    this.indices;
    this.vertices;
    this.CreateMesh = function() {
        boxVertices = [-1.0 + 0.3, 1.0, 0.0, 1, 1,
                      -1.0 + 0.3, 0.7, 0.0, 1, 0,
                      -1.0, 0.7, 0.0, 0, 0,
                      -1.0, 1.0, 0.0, 0, 1,
        ];

        boxIndices = [1, 0, 2,
                      3, 2, 0
        ];

        this.indices = boxIndices;
        this.vertices = boxVertices;

        this.VBO = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.VBO);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.vertices), gl.STATIC_DRAW);

        this.IBO = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.IBO);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(this.indices), gl.STATIC_DRAW);

        var positionAttribLocation = gl.getAttribLocation(shader2D.program, 'vertPosition');
        var texCoordAttribLocation = gl.getAttribLocation(shader2D.program, 'vertTexCoord');
        gl.vertexAttribPointer(positionAttribLocation, 3, gl.FLOAT, gl.FALSE, 5 * Float32Array.BYTES_PER_ELEMENT, 0);

        gl.vertexAttribPointer( texCoordAttribLocation, 2, gl.FLOAT, gl.FALSE, 5 * Float32Array.BYTES_PER_ELEMENT, 3 * Float32Array.BYTES_PER_ELEMENT);

        gl.enableVertexAttribArray(positionAttribLocation);
        gl.enableVertexAttribArray(texCoordAttribLocation);

    }

    this.Update = function() {
      this.VBO = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, this.VBO);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.vertices), gl.STATIC_DRAW);

      this.IBO = gl.createBuffer();
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.IBO);
      gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(this.indices), gl.STATIC_DRAW);

      var positionAttribLocation = gl.getAttribLocation(shader2D.program, 'vertPosition');
      var texCoordAttribLocation = gl.getAttribLocation(shader2D.program, 'vertTexCoord');
      gl.vertexAttribPointer(positionAttribLocation, 3, gl.FLOAT, gl.FALSE, 5 * Float32Array.BYTES_PER_ELEMENT, 0);

      gl.vertexAttribPointer( texCoordAttribLocation, 2, gl.FLOAT, gl.FALSE, 5 * Float32Array.BYTES_PER_ELEMENT, 3 * Float32Array.BYTES_PER_ELEMENT);

      gl.enableVertexAttribArray(positionAttribLocation);
      gl.enableVertexAttribArray(texCoordAttribLocation);
    }
}
