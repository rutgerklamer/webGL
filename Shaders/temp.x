precision mediump float;

varying vec2 fragTexCoord;
varying vec3 fragNormals;
varying vec3 worldPos;

uniform vec3 lightPosition;
uniform vec3 camPosition;
uniform vec3 camFront;

uniform sampler2D MyTexture;
uniform sampler2D NormalMap;

void main()
{
vec4 color = texture2D(MyTexture, fragTexCoord);;

vec3 lightColor = vec3(0.6, 0.6, 0.6);

float ambientStrength = 0.21;
vec3 ambient = vec3(ambientStrength) * lightColor;

vec3 norm = normalize(fragNormals);
vec3 lightPos = normalize(lightPosition - vec3(worldPos));

float diff = max(dot(norm, lightPos), 0.0) * 5.0;
vec3 diffuse = diff * lightColor;

float specularStrength = 10.5;

vec3 viewDir = normalize(camPosition - (camFront * 5.0) - vec3(worldPos));
vec3 reflectDir = reflect(-lightPos, norm);

float spec = pow(max(dot(viewDir,reflectDir), 0.0), 32.0);
vec3 specular = specularStrength * spec * lightColor;

vec4 lighting = vec4(vec3(ambient+diffuse+specular),1);


  vec3 result = vec3(lighting).rgb * color.rgb;
  color = vec4(result,1);

  gl_FragColor = color + vec4(fragNormals*0.001,0);
}
