precision mediump float;

varying vec2 fragTexCoord;
varying vec3 fragNormals;
varying vec3 worldPos;

uniform vec3 lightPosition;
uniform vec3 camPosition;
uniform vec3 camFront;

uniform sampler2D MyTexture;
uniform sampler2D normalMap;

void main()
{
    vec2 Resolution = vec2(1024,720);
    vec4 DiffuseColor = texture2D(MyTexture, fragTexCoord );

    vec3 NormalMap = texture2D(normalMap, fragTexCoord).rgb;

    vec3 LightDir = vec3(lightPosition - worldPos);

    float D = length(-LightDir);

    vec3 N = (normalize(NormalMap * 2.0 - 1.0)) * 5.0 ;
    vec3 L = normalize(LightDir);

    vec4 LightColor = vec4(0.6,0.2,0.2,0.2);

    vec3 Diffuse = (LightColor.rgb * LightColor.a) * max(dot(N, L), 0.0) * 5.0;

    vec3 Ambient = vec3(0.01) * LightColor.rgb;

    float specularStrength = 8.5;

    vec3 viewDir = normalize(camPosition - worldPos );
    vec3 reflectDir = reflect(normalize(-LightDir), normalize(NormalMap));

    float spec = pow(max(dot(viewDir,reflectDir), 0.0), 64.0);
    vec3 specular = specularStrength * spec * (LightColor.rgb);

    vec3 Intensity = Ambient + Diffuse + specular  ;
    vec3 FinalColor = Intensity ;
    gl_FragColor = vec4(FinalColor * DiffuseColor.rgb, DiffuseColor.a);
}
