precision mediump float;

varying vec2 fragTexCoord;
varying vec3 fragNormals;

uniform sampler2D sampler;
uniform vec3 lightPos;

void main()
{
vec4 color = texture2D(sampler, fragTexCoord);
if (color.a < 0.1) { discard; }
  vec3 lightColor = vec3(1.6, 0.6, 0.6);

  float ambientStrength = 1.1;
  vec3 ambient = vec3(ambientStrength) * lightColor;

  vec3 norm = normalize(fragNormals);
  vec3 lightDir = normalize(lightPos - vec3(gl_FragCoord));

  float diff = max(dot(norm, lightDir), 0.0) * 15.0;
  vec3 diffuse = diff * lightColor;

  vec3 result = vec3(ambient + diffuse) * color.rgb;
  color = vec4(result,1);

  gl_FragColor = color + vec4(fragNormals*0.001,0);
}
