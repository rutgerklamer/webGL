precision mediump float;

varying vec2 fragTexCoord;
varying vec3 fragNormals;
varying vec3 worldPos;
varying vec3 Tangent;
varying mat4 MWorld;
varying mat3 toTangentSpace;
varying vec4 FragPosLightSpace;
varying vec3 lighting;

uniform vec3 lightPosition;
uniform vec3 camPosition;
uniform vec3 camFront;
uniform float hasLighting;
uniform sampler2D MyTexture;
uniform sampler2D normalMap;
uniform sampler2D depthMap;


float ShadowCalculation(vec4 fragPosLightSpace, vec3 norms, vec3 lightDir)
{
  // perform perspective divide
  vec3 projCoords = fragPosLightSpace.xyz / fragPosLightSpace.w;
  // Transform to [0,1] range
  projCoords = projCoords * 0.5 + 0.5;
  // Get closest depth value from light's perspective (using [0,1] range fragPosLight as coords)
  float closestDepth = texture2D(depthMap, projCoords.xy).r;
  // Get depth of current fragment from light's perspective
  float currentDepth = projCoords.z;
  // Calculate bias (based on depth map resolution and slope)
  vec3 normal = normalize(norms);
  float bias = 0.005;
  // Check whether current frag pos is in shadow
  // float shadow = currentDepth - bias > closestDepth  ? 1.0 : 0.0;
  // PCF
  float shadow = 0.0;
  vec2 texelSize = vec2(1024.0 * 8.0, 720.0 * 8.0);
  for(int x = -1; x <= 1; ++x)
  {
      for(int y = -1; y <= 1; ++y)
      {
          float pcfDepth = texture2D(depthMap, projCoords.xy + vec2(x, y) * texelSize).r;
          shadow += currentDepth - bias > pcfDepth  ? 0.8 : 0.0;
      }
  }
  shadow /= 9.0;

  // Keep the shadow at 0.0 when outside the far_plane region of the light's frustum.
  if(projCoords.z > 1.0)
      shadow = 0.0;

  return shadow;
}

void main()
{
    vec2 Resolution = vec2(1024,720);

    vec4 DiffuseColor = texture2D(MyTexture, fragTexCoord );

    vec3 NormalMap = normalize(toTangentSpace * (2.0 * texture2D(normalMap, vec2(fragTexCoord.x  -1.0  , fragTexCoord.y - 1.0)).rgb - 1.0));

    vec3 norm = normalize(255.0/128.0 * fragNormals - 1.0);
    vec4 color = vec4(1,1,1,1);
    norm = NormalMap;
    vec3 lightColor = vec3(0.6,0.6,0.6);

    if (hasLighting > 0.5) {
      float ambientStrength = 0.1;
      vec3 ambient = ambientStrength * lightColor;
      vec3 lightDir =  normalize(lightPosition - worldPos);
      float diff = max(dot(norm, lightDir), 0.0);
      vec3 diffuse = diff * lightColor;

      float specularStrength = 0.8;
      vec3 viewDir =  normalize(camPosition - worldPos);
      vec3 reflectDir = reflect(-lightDir, norm);
      float spec = pow(max(dot(viewDir, reflectDir), 0.0), 64.0);
      vec3 specular = specularStrength * spec * lightColor;

      float shadow = ShadowCalculation(FragPosLightSpace, fragNormals, lightDir);

      vec3 lighting = (ambient + (1.0 - shadow) * (diffuse + specular)) * DiffuseColor.rgb;

      vec3 result = (ambient + diffuse + specular) * DiffuseColor.rgb;

      color = vec4(lighting,1.0);
    } else {
      color = vec4(DiffuseColor)  ;
    }

    gl_FragColor = color  + vec4(fragNormals * 0.001,0);
}
