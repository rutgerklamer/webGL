precision mediump float;

attribute vec3 vertPosition;
attribute vec2 vertTexCoord;
attribute vec3 normalCoord;

varying vec2 fragTexCoord;
varying vec3 fragNormals;
uniform mat4 mWorld;
uniform mat4 mView;
uniform mat4 mProj;

void main()
{
  fragNormals = normalCoord;
  fragTexCoord = vertTexCoord;
  gl_Position = mProj * mView * mWorld * vec4(vertPosition, 1.0);
}
