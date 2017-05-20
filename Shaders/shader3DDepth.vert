precision mediump float;

attribute vec3 vertPosition;
attribute vec2 vertTexCoord;
attribute vec3 normalCoord;
attribute vec3 tangent;

varying vec2 coords;
varying vec4 FragPosLightSpace;

uniform mat4 mWorld;
uniform mat4 mView;
uniform mat4 mProj;

void main()
{
  vec4 worldPosition =  mWorld * vec4(vertPosition, 1.0);
  gl_Position = mProj * mView * worldPosition;
  FragPosLightSpace = mView * mProj * vec4(vertPosition, 1.0);
  coords = vertTexCoord;

}
