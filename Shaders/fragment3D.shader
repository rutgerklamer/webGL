precision mediump float;

varying vec2 fragTexCoord;
varying vec3 fragNormals;
varying vec4 lighting;

uniform sampler2D sampler;

void main()
{
vec4 color = texture2D(sampler, fragTexCoord);
if (color.a < 0.1) { discard; }


  vec3 result = vec3(lighting).rgb * color.rgb;
  color = vec4(result,1);

  gl_FragColor = color + vec4(fragNormals*0.001,0);
}
