function HUDMesh() {
    var boxVertices;
    var boxIndices;

    var position = vec3.create();

    this.position = position;

    this.CreateMesh = function() {
        boxVertices = [1.0, 1.0, 0.0, 1, 1,
                      1.0, -1.0, 0.0, 1, 0,
                      -1.0, -1.0, 0.0, 0, 0,
                      -1.0, 1.0, 0.0, 0, 1,
        ];

        boxIndices = [1, 0, 2,
                      3, 2, 0
        ];

        this.boxIndices = boxIndices;

        var VBO = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, VBO);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(boxVertices), gl.STATIC_DRAW);

        var IBO = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, IBO);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(this.boxIndices), gl.STATIC_DRAW);

        var positionAttribLocation = gl.getAttribLocation(shader2D.program, 'vertPosition');
        var texCoordAttribLocation = gl.getAttribLocation(shader2D.program, 'vertTexCoord');
        gl.vertexAttribPointer(positionAttribLocation, 3, gl.FLOAT, gl.FALSE, 5 * Float32Array.BYTES_PER_ELEMENT, 0);

        gl.vertexAttribPointer( texCoordAttribLocation, 2, gl.FLOAT, gl.FALSE, 5 * Float32Array.BYTES_PER_ELEMENT, 3 * Float32Array.BYTES_PER_ELEMENT);

        gl.enableVertexAttribArray(positionAttribLocation);
        gl.enableVertexAttribArray(texCoordAttribLocation);
    }

    this.Update = function() {

    }
}
