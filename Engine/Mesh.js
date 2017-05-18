function Mesh() {
    var boxVertices;
    var boxIndices;
    this.boxTexture;
    this.normalMap;
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
