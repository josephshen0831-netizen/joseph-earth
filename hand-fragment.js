
var fsTrace = `

uniform float time;
uniform sampler2D t_audio;

uniform sampler2D t_matcap;
uniform sampler2D t_normal;
uniform sampler2D t_text;
uniform sampler2D t_colormap;

uniform float _HueSize;
uniform float _HueStart;


uniform mat4 modelViewMatrix;
uniform mat3 normalMatrix;


varying vec3 vPos;
varying vec3 vCam;
varying vec3 vNorm;

varying vec3 vMNorm;
varying vec3 vMPos;

varying vec2 vUv;
varying float vNoiseVal;

vec3 bulbPos[5];



vec3 uvNormalMap( sampler2D normalMap , vec3 pos , vec2 uv , vec3 norm , float texScale , float normalScale ){
 
  vec3 q0 = dFdx( pos.xyz );
  vec3 q1 = dFdy( pos.xyz );
  vec2 st0 = dFdx( uv.st );
  vec2 st1 = dFdy( uv.st );

  vec3 S = normalize(  q0 * st1.t - q1 * st0.t );
  vec3 T = normalize( -q0 * st1.s + q1 * st0.s );
  vec3 N = normalize( norm );

  //vec2 offset = vec2(  timer * .000000442 , timer * .0000005345 );

  vec3 mapN = texture2D( normalMap, uv*texScale ).xyz * 2.0 - 1.0;
  mapN.xy = normalScale * mapN.xy;
 
  mat3 tsn = mat3( S, T, N );
  vec3 fNorm =  normalize( tsn * mapN ); 

  return fNorm;

}


vec3 uvNormalMap( sampler2D normalMap , vec3 pos , vec2 uv , vec3 norm , float texScale , float normalScale , vec2 offset ){
 
  vec3 q0 = dFdx( pos.xyz );
  vec3 q1 = dFdy( pos.xyz );
  vec2 st0 = dFdx( uv.st );
  vec2 st1 = dFdy( uv.st );

  vec3 S = normalize(  q0 * st1.t - q1 * st0.t );
  vec3 T = normalize( -q0 * st1.s + q1 * st0.s );
  vec3 N = normalize( norm );

  vec3 mapN = texture2D( normalMap, uv*texScale + offset ).xyz * 2.0 - 1.0;
  mapN.xy = normalScale * mapN.xy;
 
  mat3 tsn = mat3( S, T, N );
  vec3 fNorm =  normalize( tsn * mapN ); 

  return fNorm;

}




// Taken from : http://www.clicktorelease.com/blog/creating-spherical-environment-mapping-shader

vec2 semLookup( vec3 pos , vec3 norm , mat4 mvMat , mat3 nMat ){
  
  vec4 p = vec4( pos, 1. );

  vec3 e = normalize( vec3( mvMat * p ) );
  vec3 n = normalize( nMat * norm );

  vec3 r = reflect( e, n );
  float m = 2. * sqrt( 
      pow( r.x, 2. ) + 
      pow( r.y, 2. ) + 
      pow( r.z + 1., 2. ) 
  );

  return ( r.xy / m + .5 );

}

vec2 semLookup( vec3 e , vec3 n ){
  
  vec3 r = reflect( e, n );
  float m = 2. * sqrt( 
      pow( r.x, 2. ) + 
      pow( r.y, 2. ) + 
      pow( r.z + 1., 2. ) 
  );

  return ( r.xy / m + .5 );

}

vec3 hsv(float h, float s, float v){
  return mix( vec3( 1.0 ), clamp( ( abs( fract(
    h + vec3( 3.0, 2.0, 1.0 ) / 3.0 ) * 6.0 - 3.0 ) - 1.0 ), 0.0, 1.0 ), s ) * v;
}



uniform float _FFTSize;
uniform float _FFTStart;
uniform float _Saturation;
uniform float _Lightness;
uniform float _NoiseOffset;
uniform float _NormalDepth;
uniform float _DiscardAmount;
void main(){

  vec3 fNorm = uvNormalMap( t_normal , vPos , vUv , vNorm , .5   , .5 * _NormalDepth);

  vec3 ro = vPos;
  vec3 rd = normalize( vPos - vCam );

  vec3 p = vec3( 0. );
  vec3 col =  vec3( 0. );

  float m = max(0.,dot( -rd , fNorm ));
  vec4 audio = texture2D(t_audio,vec2(vNoiseVal * _FFTSize + _FFTStart,0.));
  
  vec3 mat = texture2D( t_matcap , semLookup( rd , fNorm , modelViewMatrix , normalMatrix ) ).xyz;


  if( sin(vNoiseVal * 20. ) < _DiscardAmount ){
    //discard;
  }
  col.xyz = hsv( _HueStart + _HueSize * vNoiseVal * _NoiseOffset * 10., _Saturation,_Lightness) * mat;// * audio.xyz;//mat;

  col.xyz = texture2D(t_colormap , vec2( _HueStart + _HueSize * vNoiseVal * _NoiseOffset * 10.  * .1,0.)).xyz * _Lightness;;
  col *= col;
  //col += fNorm * .5 + .5;

  col *= mat;
  col *= mat;

  if( length(audio.xyz) == 0. ){
    audio.xyz = vec3(.5);
  }



  col *= audio.xyz *audio.xyz * audio.xyz * 5.;

  gl_FragColor = vec4( col , 1. );

}

`

export default fsTrace








