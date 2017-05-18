precision mediump float;

attribute vec3 vertPosition;
attribute vec2 vertTexCoord;
attribute vec3 normalCoord;

varying vec2 fragTexCoord;
varying vec3 fragNormals;
varying vec4 lighting;

uniform mat4 mWorld;
uniform mat4 mView;
uniform mat4 mProj;
uniform vec3 lightPosition;
uniform vec3 camPosition;

void main()
{
  fragNormals = normalCoord;
  fragTexCoord = vertTexCoord;
  vec4 worldPosition =  mWorld * vec4(vertPosition, 1.0);
  gl_Position = mProj * mView * worldPosition;

  vec3 lightColor = vec3(0.6, 0.6, 0.6);

  float ambientStrength = 1.1;
  vec3 ambient = vec3(ambientStrength) * lightColor;

  vec3 norm = normalize(fragNormals);
  vec3 lightPos = normalize(lightPosition - vec3(worldPosition));

  float diff = max(dot(norm, lightPos), 0.0) * 5.0;
  vec3 diffuse = diff * lightColor;

  float specularStrength = 4.5;

  vec3 viewDir = normalize(camPosition - vec3(worldPosition));
  vec3 reflectDir = reflect(-lightPos, norm);

  float spec = pow(max(dot(viewDir,reflectDir), 0.0), 8.0);
  vec3 specular = specularStrength * spec * lightColor;


  lighting = vec4(vec3(ambient+diffuse+specular),1);
}
