precision mediump float;

attribute vec3 vertPosition;
attribute vec2 vertTexCoord;
attribute vec3 normalCoord;
attribute vec3 tangent;

varying vec2 fragTexCoord;
varying vec3 fragNormals;
varying vec3 lighting;
varying vec3 worldPos;
varying vec3 Tangent;
varying mat4 MWorld;
varying mat3 toTangentSpace;
varying vec4 FragPosLightSpace;

uniform mat4 mWorld;
uniform mat4 mView;
uniform mat4 mProj;
uniform mat4 lightView;
uniform mat4 lightProj;

void main()
{
  fragNormals = normalCoord;
  fragTexCoord = vertTexCoord ;
  vec4 worldPosition =  mWorld * vec4(vertPosition, 1.0);
  worldPos = worldPosition.xyz;
  Tangent = worldPos* tangent;

  MWorld = mWorld;
  vec3 n = normalize((mWorld* vec4(normalCoord,0)).xyz);
  vec3 t = normalize((mWorld* vec4(tangent,0)).xyz);

  t = normalize(t-dot(t,n) * n);
  vec3 b = cross(t,n);
  toTangentSpace = mat3(t,b,n);
  FragPosLightSpace = lightProj * lightView * worldPosition;
  gl_Position = mProj * mView * worldPosition;
}
