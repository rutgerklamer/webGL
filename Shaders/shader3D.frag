precision mediump float;

varying vec2 fragTexCoord;
varying vec3 fragNormals;
varying vec3 worldPos;
varying vec3 Tangent;
varying mat4 MWorld;
varying mat3 toTangentSpace;
varying vec4 FragPosLightSpace;

uniform vec3 lightPosition;
uniform vec3 camPosition;
uniform vec3 camFront;
uniform float hasLighting;
uniform sampler2D MyTexture;
uniform sampler2D normalMap;
uniform sampler2D depthMap;


float ShadowCalculation(vec4 fragPosLightSpace, vec3 norms)
{
    vec3 projCoords = fragPosLightSpace.xyz / fragPosLightSpace.w;
    projCoords = projCoords * 0.5 + 0.5 + vec3(vec2(norms / 1500.0),0.0);
    float closestDepth = texture2D(depthMap, vec2(projCoords.xy )).r;
    float currentDepth = projCoords.z ;
    float bias = 0.005;
    float shadow = currentDepth - bias > closestDepth  ? 0.5 : 0.0;
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

      float specularStrength = 3.5;
      vec3 viewDir =  normalize(camPosition - worldPos);
      vec3 reflectDir = reflect(-lightDir, norm);
      float spec = pow(max(dot(viewDir, reflectDir), 0.0), 64.0);
      vec3 specular = specularStrength * spec * lightColor;

      float shadow = ShadowCalculation(FragPosLightSpace, norm);

      vec3 lighting = (ambient + (1.0 - shadow) * (diffuse + specular)) * DiffuseColor.rgb;

      vec3 result = (ambient + diffuse + specular) * DiffuseColor.rgb;

      color = vec4(lighting,1.0);
    } else {
      color = vec4(DiffuseColor)  ;
    }

    gl_FragColor = color  + vec4(fragNormals * 0.001,0);
}
