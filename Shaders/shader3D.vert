precision mediump float;

attribute vec3 vertPosition;
attribute vec2 vertTexCoord;
attribute vec3 normalCoord;

varying vec2 fragTexCoord;
varying vec3 fragNormals;
varying vec3 worldPos;

uniform mat4 mWorld;
uniform mat4 mView;
uniform mat4 mProj;

void main()
{
  fragNormals = normalCoord;
  fragTexCoord = vertTexCoord;
  vec4 worldPosition =  mWorld * vec4(vertPosition, 1.0);
  worldPos = worldPosition.xyz;
  gl_Position = mProj * mView * worldPosition;
}
