precision mediump float;

varying vec2 fragTexCoord;
varying vec3 fragNormals;
varying vec3 worldPos;
varying vec3 Tangent;
varying mat4 MWorld;
varying mat3 toTangentSpace;

uniform vec3 lightPosition;
uniform vec3 camPosition;
uniform vec3 camFront;

uniform sampler2D MyTexture;
uniform sampler2D normalMap;

void main()
{
    vec2 Resolution = vec2(1024,720);

    vec4 DiffuseColor = texture2D(MyTexture, fragTexCoord );

    vec3 NormalMap = normalize(toTangentSpace * (2.0 * texture2D(normalMap, fragTexCoord ).rgb - 1.0));

    vec3 norm = normalize(255.0/128.0 * NormalMap - 1.0);
    norm = NormalMap;


    vec3 lightColor = vec3(0.6,0.6,0.6);

    float ambientStrength = 0.1;
    vec3 ambient = ambientStrength * lightColor;

    // Diffuse
    vec3 lightDir =  normalize(lightPosition - worldPos);
    float diff = max(dot(norm, lightDir), 0.0);
    vec3 diffuse = diff * lightColor;

    // Specular
    float specularStrength = 3.5;
    vec3 viewDir =  normalize(camPosition - worldPos);
    vec3 reflectDir = reflect(-lightDir, norm);
    float spec = pow(max(dot(viewDir, reflectDir), 0.0), 32.0);
    vec3 specular = specularStrength * spec * lightColor;

    vec3 result = (ambient + diffuse + specular) * DiffuseColor.rgb;
    vec4 color = vec4(result, 1.0);

    gl_FragColor = color  + vec4(fragNormals * 0.001,0);


    //gl_FragColor = vec4(lightColor * toTangentSpace,1);
}
