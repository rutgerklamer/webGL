precision mediump float;

varying vec2 fragTexCoord;
uniform sampler2D sampler;

void main()
{
vec4 color = texture2D(sampler, fragTexCoord);
if (color.a < 0.1) { discard; }
  gl_FragColor = color;
}
