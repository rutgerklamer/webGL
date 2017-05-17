function Shader(vertexPath, fragmentPath) {
    this.program;

    this.LoadShaderFile = function(url) {
        var request = new XMLHttpRequest();
        request.open("GET", url, false);
        request.send(null);
        var shader = request.responseText;
        return shader;
    }

    this.CreateShader = function(vertexPath, fragmentPath) {
        var vertexShader = gl.createShader(gl.VERTEX_SHADER);
        var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
        gl.shaderSource(vertexShader, this.LoadShaderFile(vertexPath));
        gl.shaderSource(fragmentShader, this.LoadShaderFile(fragmentPath));

        gl.compileShader(vertexShader);
        if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
            console.error('ERROR compiling vertex shader!', gl.getShaderInfoLog(vertexShader));
            return;
        }

        gl.compileShader(fragmentShader);
        if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
            console.error('ERROR compiling fragment shader!', gl.getShaderInfoLog(fragmentShader));
            return;
        }

        this.program = gl.createProgram();
        gl.attachShader(this.program, vertexShader);
        gl.attachShader(this.program, fragmentShader);
        gl.linkProgram(this.program);
        if (!gl.getProgramParameter(this.program, gl.LINK_STATUS)) {
            console.error('ERROR linking program!', gl.getProgramInfoLog(this.program));
            return;
        }
        gl.validateProgram(this.program);
        if (!gl.getProgramParameter(this.program, gl.VALIDATE_STATUS)) {
            console.error('ERROR validating program!', gl.getProgramInfoLog(this.program));
            return;
        }
    }
    this.CreateShader(vertexPath, fragmentPath);

    this.Use = function() {
        gl.useProgram(this.program);
    }
}
