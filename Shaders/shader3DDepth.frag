precision mediump float;
uniform sampler2D MyTexture;
varying vec2 coords;
varying vec4 FragPosLightSpace;

void main()
{
    vec3 projCoords = FragPosLightSpace.xyz / FragPosLightSpace.w;
    projCoords = projCoords * 0.5 + 0.5;

    float z = gl_FragCoord.z / gl_FragCoord.w;
    gl_FragColor =  vec4(vec3(gl_FragCoord.z ), 1);
}
