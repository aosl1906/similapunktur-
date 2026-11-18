var Mu=Object.defineProperty;var bu=(s,e,t)=>e in s?Mu(s,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):s[e]=t;var he=(s,e,t)=>bu(s,typeof e!="symbol"?e+"":e,t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))n(i);new MutationObserver(i=>{for(const r of i)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function t(i){const r={};return i.integrity&&(r.integrity=i.integrity),i.referrerPolicy&&(r.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?r.credentials="include":i.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(i){if(i.ep)return;i.ep=!0;const r=t(i);fetch(i.href,r)}})();/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const bl="186",os={ROTATE:0,DOLLY:1,PAN:2},ss={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},Su=0,fc=1,Eu=2,kr=1,Tu=2,Os=3,ni=0,Yt=1,Xt=2,Qn=0,zs=1,pc=2,mc=3,gc=4,wu=5,is=100,Au=101,Ru=102,Cu=103,Pu=104,Lu=200,Iu=201,Du=202,Nu=203,ih=204,sh=205,Uu=206,Ou=207,Fu=208,Bu=209,ku=210,zu=211,Hu=212,Gu=213,Vu=214,Mo=0,bo=1,So=2,$s=3,Eo=4,To=5,wo=6,Ao=7,rh=0,Wu=1,Xu=2,Dn=0,ah=1,oh=2,lh=3,Sl=4,ch=5,dh=6,hh=7,_c="attached",$u="detached",uh=300,Ui=301,ps=302,ba=303,Sa=304,da=306,ms=1e3,Pn=1001,Zr=1002,At=1003,fh=1004,Fs=1005,Rt=1006,zr=1007,Zn=1008,Qt=1009,ph=1010,mh=1011,qs=1012,El=1013,Fn=1014,an=1015,Bn=1016,Tl=1017,wl=1018,Ks=1020,gh=35902,_h=35899,vh=1021,xh=1022,on=1023,ii=1026,Di=1027,Al=1028,Rl=1029,Oi=1030,Cl=1031,Pl=1033,Hr=33776,Gr=33777,Vr=33778,Wr=33779,Ro=35840,Co=35841,Po=35842,Lo=35843,Io=36196,Do=37492,No=37496,Uo=37488,Oo=37489,Jr=37490,Fo=37491,Bo=37808,ko=37809,zo=37810,Ho=37811,Go=37812,Vo=37813,Wo=37814,Xo=37815,$o=37816,qo=37817,Ko=37818,Yo=37819,Zo=37820,Jo=37821,jo=36492,Qo=36494,el=36495,tl=36283,nl=36284,jr=36285,il=36286,Ys=2300,Zs=2301,Ea=2302,vc=2303,xc=2400,yc=2401,Mc=2402,qu=2500,Ku=0,yh=1,sl=2,Yu=3200,rl=0,Zu=1,vi="",Nt="srgb",en="srgb-linear",Qr="linear",nt="srgb",Ta=7680,Ju=519,ju=512,Qu=513,ef=514,Ll=515,tf=516,nf=517,Il=518,sf=519,Mh=35044,bc="300 es",Ln=2e3,Js=2001;function rf(s){for(let e=s.length-1;e>=0;--e)if(s[e]>=65535)return!0;return!1}function af(s){return ArrayBuffer.isView(s)&&!(s instanceof DataView)}function js(s){return document.createElementNS("http://www.w3.org/1999/xhtml",s)}function of(){const s=js("canvas");return s.style.display="block",s}const Sc={};function ea(...s){const e="THREE."+s.shift();console.log(e,...s)}function bh(s){const e=s[0];if(typeof e=="string"&&e.startsWith("TSL:")){const t=s[1];t&&t.isStackTrace?s[0]+=" "+t.getLocation():s[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return s}function Ae(...s){s=bh(s);const e="THREE."+s.shift();{const t=s[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...s)}}function Ne(...s){s=bh(s);const e="THREE."+s.shift();{const t=s[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...s)}}function ls(...s){const e=s.join(" ");e in Sc||(Sc[e]=!0,Ae(...s))}function lf(s,e,t){return new Promise(function(n,i){function r(){switch(s.clientWaitSync(e,s.SYNC_FLUSH_COMMANDS_BIT,0)){case s.WAIT_FAILED:i();break;case s.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:n()}}setTimeout(r,t)})}const cf={[Mo]:bo,[So]:wo,[Eo]:Ao,[$s]:To,[bo]:Mo,[wo]:So,[Ao]:Eo,[To]:$s};class Ti{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){const n=this._listeners;return n===void 0?!1:n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){const n=this._listeners;if(n===void 0)return;const i=n[e];if(i!==void 0){const r=i.indexOf(t);r!==-1&&i.splice(r,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const n=t[e.type];if(n!==void 0){e.target=this;const i=n.slice(0);for(let r=0,a=i.length;r<a;r++)i[r].call(this,e);e.target=null}}}const kt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let Ec=1234567;const Hs=Math.PI/180,gs=180/Math.PI;function _n(){const s=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(kt[s&255]+kt[s>>8&255]+kt[s>>16&255]+kt[s>>24&255]+"-"+kt[e&255]+kt[e>>8&255]+"-"+kt[e>>16&15|64]+kt[e>>24&255]+"-"+kt[t&63|128]+kt[t>>8&255]+"-"+kt[t>>16&255]+kt[t>>24&255]+kt[n&255]+kt[n>>8&255]+kt[n>>16&255]+kt[n>>24&255]).toLowerCase()}function ze(s,e,t){return Math.max(e,Math.min(t,s))}function Dl(s,e){return(s%e+e)%e}function df(s,e,t,n,i){return n+(s-e)*(i-n)/(t-e)}function hf(s,e,t){return s!==e?(t-s)/(e-s):0}function Gs(s,e,t){return(1-t)*s+t*e}function uf(s,e,t,n){return Gs(s,e,1-Math.exp(-t*n))}function ff(s,e=1){return e-Math.abs(Dl(s,e*2)-e)}function pf(s,e,t){return s<=e?0:s>=t?1:(s=(s-e)/(t-e),s*s*(3-2*s))}function mf(s,e,t){return s<=e?0:s>=t?1:(s=(s-e)/(t-e),s*s*s*(s*(s*6-15)+10))}function gf(s,e){return s+Math.floor(Math.random()*(e-s+1))}function _f(s,e){return s+Math.random()*(e-s)}function vf(s){return s*(.5-Math.random())}function xf(s){s!==void 0&&(Ec=s);let e=Ec+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function yf(s){return s*Hs}function Mf(s){return s*gs}function bf(s){return s>0&&Number.isInteger(s)&&2**Math.round(Math.log2(s))===s}function Sf(s){return Math.pow(2,Math.ceil(Math.log(s)/Math.LN2))}function Ef(s){return Math.pow(2,Math.floor(Math.log(s)/Math.LN2))}function Tf(s,e,t,n,i){const r=Math.cos,a=Math.sin,o=r(t/2),l=a(t/2),c=r((e+n)/2),d=a((e+n)/2),h=r((e-n)/2),u=a((e-n)/2),f=r((n-e)/2),g=a((n-e)/2);switch(i){case"XYX":s.set(o*d,l*h,l*u,o*c);break;case"YZY":s.set(l*u,o*d,l*h,o*c);break;case"ZXZ":s.set(l*h,l*u,o*d,o*c);break;case"XZX":s.set(o*d,l*g,l*f,o*c);break;case"YXY":s.set(l*f,o*d,l*g,o*c);break;case"ZYZ":s.set(l*g,l*f,o*d,o*c);break;default:Ae("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+i)}}function pn(s,e){switch(e.constructor){case Float32Array:return s;case Uint32Array:return s/4294967295;case Uint16Array:return s/65535;case Uint8Array:case Uint8ClampedArray:return s/255;case Int32Array:return Math.max(s/2147483647,-1);case Int16Array:return Math.max(s/32767,-1);case Int8Array:return Math.max(s/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function it(s,e){switch(e.constructor){case Float32Array:return s;case Uint32Array:return Math.round(s*4294967295);case Uint16Array:return Math.round(s*65535);case Uint8Array:case Uint8ClampedArray:return Math.round(s*255);case Int32Array:return Math.round(s*2147483647);case Int16Array:return Math.round(s*32767);case Int8Array:return Math.round(s*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}const Sh={DEG2RAD:Hs,RAD2DEG:gs,generateUUID:_n,clamp:ze,euclideanModulo:Dl,mapLinear:df,inverseLerp:hf,lerp:Gs,damp:uf,pingpong:ff,smoothstep:pf,smootherstep:mf,randInt:gf,randFloat:_f,randFloatSpread:vf,seededRandom:xf,degToRad:yf,radToDeg:Mf,isPowerOfTwo:bf,ceilPowerOfTwo:Sf,floorPowerOfTwo:Ef,setQuaternionFromProperEuler:Tf,normalize:it,denormalize:pn},jl=class jl{constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("THREE.Vector2: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,i=e.elements;return this.x=i[0]*t+i[3]*n+i[6],this.y=i[1]*t+i[4]*n+i[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=ze(this.x,e.x,t.x),this.y=ze(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=ze(this.x,e,t),this.y=ze(this.y,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(ze(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(ze(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),i=Math.sin(t),r=this.x-e.x,a=this.y-e.y;return this.x=r*n-a*i+e.x,this.y=r*i+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};jl.prototype.isVector2=!0;let _e=jl;class xn{constructor(e=0,t=0,n=0,i=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=i}static slerpFlat(e,t,n,i,r,a,o){let l=n[i+0],c=n[i+1],d=n[i+2],h=n[i+3],u=r[a+0],f=r[a+1],g=r[a+2],y=r[a+3];if(h!==y||l!==u||c!==f||d!==g){let p=l*u+c*f+d*g+h*y;p<0&&(u=-u,f=-f,g=-g,y=-y,p=-p);let m=1-o;if(p<.9995){const S=Math.acos(p),T=Math.sin(S);m=Math.sin(m*S)/T,o=Math.sin(o*S)/T,l=l*m+u*o,c=c*m+f*o,d=d*m+g*o,h=h*m+y*o}else{l=l*m+u*o,c=c*m+f*o,d=d*m+g*o,h=h*m+y*o;const S=1/Math.sqrt(l*l+c*c+d*d+h*h);l*=S,c*=S,d*=S,h*=S}}e[t]=l,e[t+1]=c,e[t+2]=d,e[t+3]=h}static multiplyQuaternionsFlat(e,t,n,i,r,a){const o=n[i],l=n[i+1],c=n[i+2],d=n[i+3],h=r[a],u=r[a+1],f=r[a+2],g=r[a+3];return e[t]=o*g+d*h+l*f-c*u,e[t+1]=l*g+d*u+c*h-o*f,e[t+2]=c*g+d*f+o*u-l*h,e[t+3]=d*g-o*h-l*u-c*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,i){return this._x=e,this._y=t,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,i=e._y,r=e._z,a=e._order,o=Math.cos,l=Math.sin,c=o(n/2),d=o(i/2),h=o(r/2),u=l(n/2),f=l(i/2),g=l(r/2);switch(a){case"XYZ":this._x=u*d*h+c*f*g,this._y=c*f*h-u*d*g,this._z=c*d*g+u*f*h,this._w=c*d*h-u*f*g;break;case"YXZ":this._x=u*d*h+c*f*g,this._y=c*f*h-u*d*g,this._z=c*d*g-u*f*h,this._w=c*d*h+u*f*g;break;case"ZXY":this._x=u*d*h-c*f*g,this._y=c*f*h+u*d*g,this._z=c*d*g+u*f*h,this._w=c*d*h-u*f*g;break;case"ZYX":this._x=u*d*h-c*f*g,this._y=c*f*h+u*d*g,this._z=c*d*g-u*f*h,this._w=c*d*h+u*f*g;break;case"YZX":this._x=u*d*h+c*f*g,this._y=c*f*h+u*d*g,this._z=c*d*g-u*f*h,this._w=c*d*h-u*f*g;break;case"XZY":this._x=u*d*h-c*f*g,this._y=c*f*h-u*d*g,this._z=c*d*g+u*f*h,this._w=c*d*h+u*f*g;break;default:Ae("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,i=Math.sin(n);return this._x=e.x*i,this._y=e.y*i,this._z=e.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],i=t[4],r=t[8],a=t[1],o=t[5],l=t[9],c=t[2],d=t[6],h=t[10],u=n+o+h;if(u>0){const f=.5/Math.sqrt(u+1);this._w=.25/f,this._x=(d-l)*f,this._y=(r-c)*f,this._z=(a-i)*f}else if(n>o&&n>h){const f=2*Math.sqrt(1+n-o-h);this._w=(d-l)/f,this._x=.25*f,this._y=(i+a)/f,this._z=(r+c)/f}else if(o>h){const f=2*Math.sqrt(1+o-n-h);this._w=(r-c)/f,this._x=(i+a)/f,this._y=.25*f,this._z=(l+d)/f}else{const f=2*Math.sqrt(1+h-n-o);this._w=(a-i)/f,this._x=(r+c)/f,this._y=(l+d)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(ze(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const i=Math.min(1,t/n);return this.slerp(e,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,i=e._y,r=e._z,a=e._w,o=t._x,l=t._y,c=t._z,d=t._w;return this._x=n*d+a*o+i*c-r*l,this._y=i*d+a*l+r*o-n*c,this._z=r*d+a*c+n*l-i*o,this._w=a*d-n*o-i*l-r*c,this._onChangeCallback(),this}slerp(e,t){let n=e._x,i=e._y,r=e._z,a=e._w,o=this.dot(e);o<0&&(n=-n,i=-i,r=-r,a=-a,o=-o);let l=1-t;if(o<.9995){const c=Math.acos(o),d=Math.sin(c);l=Math.sin(l*c)/d,t=Math.sin(t*c)/d,this._x=this._x*l+n*t,this._y=this._y*l+i*t,this._z=this._z*l+r*t,this._w=this._w*l+a*t,this._onChangeCallback()}else this._x=this._x*l+n*t,this._y=this._y*l+i*t,this._z=this._z*l+r*t,this._w=this._w*l+a*t,this.normalize();return this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),i=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(i*Math.sin(e),i*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}const Ql=class Ql{constructor(e=0,t=0,n=0){this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("THREE.Vector3: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Tc.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Tc.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,i=this.z,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6]*i,this.y=r[1]*t+r[4]*n+r[7]*i,this.z=r[2]*t+r[5]*n+r[8]*i,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,i=this.z,r=e.elements,a=1/(r[3]*t+r[7]*n+r[11]*i+r[15]);return this.x=(r[0]*t+r[4]*n+r[8]*i+r[12])*a,this.y=(r[1]*t+r[5]*n+r[9]*i+r[13])*a,this.z=(r[2]*t+r[6]*n+r[10]*i+r[14])*a,this}applyQuaternion(e){const t=this.x,n=this.y,i=this.z,r=e.x,a=e.y,o=e.z,l=e.w,c=2*(a*i-o*n),d=2*(o*t-r*i),h=2*(r*n-a*t);return this.x=t+l*c+a*h-o*d,this.y=n+l*d+o*c-r*h,this.z=i+l*h+r*d-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,i=this.z,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*i,this.y=r[1]*t+r[5]*n+r[9]*i,this.z=r[2]*t+r[6]*n+r[10]*i,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=ze(this.x,e.x,t.x),this.y=ze(this.y,e.y,t.y),this.z=ze(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=ze(this.x,e,t),this.y=ze(this.y,e,t),this.z=ze(this.z,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(ze(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,i=e.y,r=e.z,a=t.x,o=t.y,l=t.z;return this.x=i*l-r*o,this.y=r*a-n*l,this.z=n*o-i*a,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return wa.copy(this).projectOnVector(e),this.sub(wa)}reflect(e){return this.sub(wa.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(ze(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,i=this.z-e.z;return t*t+n*n+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const i=Math.sin(t)*e;return this.x=i*Math.sin(n),this.y=Math.cos(t)*e,this.z=i*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),i=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=i,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};Ql.prototype.isVector3=!0;let P=Ql;const wa=new P,Tc=new xn,ec=class ec{constructor(e,t,n,i,r,a,o,l,c){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,i,r,a,o,l,c)}set(e,t,n,i,r,a,o,l,c){const d=this.elements;return d[0]=e,d[1]=i,d[2]=o,d[3]=t,d[4]=r,d[5]=l,d[6]=n,d[7]=a,d[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,i=t.elements,r=this.elements,a=n[0],o=n[3],l=n[6],c=n[1],d=n[4],h=n[7],u=n[2],f=n[5],g=n[8],y=i[0],p=i[3],m=i[6],S=i[1],T=i[4],_=i[7],b=i[2],E=i[5],w=i[8];return r[0]=a*y+o*S+l*b,r[3]=a*p+o*T+l*E,r[6]=a*m+o*_+l*w,r[1]=c*y+d*S+h*b,r[4]=c*p+d*T+h*E,r[7]=c*m+d*_+h*w,r[2]=u*y+f*S+g*b,r[5]=u*p+f*T+g*E,r[8]=u*m+f*_+g*w,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],i=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],d=e[8];return t*a*d-t*o*c-n*r*d+n*o*l+i*r*c-i*a*l}invert(){const e=this.elements,t=e[0],n=e[1],i=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],d=e[8],h=d*a-o*c,u=o*l-d*r,f=c*r-a*l,g=t*h+n*u+i*f;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const y=1/g;return e[0]=h*y,e[1]=(i*c-d*n)*y,e[2]=(o*n-i*a)*y,e[3]=u*y,e[4]=(d*t-i*l)*y,e[5]=(i*r-o*t)*y,e[6]=f*y,e[7]=(n*l-c*t)*y,e[8]=(a*t-n*r)*y,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,i,r,a,o){const l=Math.cos(r),c=Math.sin(r);return this.set(n*l,n*c,-n*(l*a+c*o)+a+e,-i*c,i*l,-i*(-c*a+l*o)+o+t,0,0,1),this}scale(e,t){return ls("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(Aa.makeScale(e,t)),this}rotate(e){return ls("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(Aa.makeRotation(-e)),this}translate(e,t){return ls("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(Aa.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let i=0;i<9;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}};ec.prototype.isMatrix3=!0;let Oe=ec;const Aa=new Oe,wc=new Oe().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Ac=new Oe().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function wf(){const s={enabled:!0,workingColorSpace:en,spaces:{},convert:function(i,r,a){return this.enabled===!1||r===a||!r||!a||(this.spaces[r].transfer===nt&&(i.r=ei(i.r),i.g=ei(i.g),i.b=ei(i.b)),this.spaces[r].primaries!==this.spaces[a].primaries&&(i.applyMatrix3(this.spaces[r].toXYZ),i.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===nt&&(i.r=cs(i.r),i.g=cs(i.g),i.b=cs(i.b))),i},workingToColorSpace:function(i,r){return this.convert(i,this.workingColorSpace,r)},colorSpaceToWorking:function(i,r){return this.convert(i,r,this.workingColorSpace)},getPrimaries:function(i){return this.spaces[i].primaries},getTransfer:function(i){return i===vi?Qr:this.spaces[i].transfer},getToneMappingMode:function(i){return this.spaces[i].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(i,r=this.workingColorSpace){return i.fromArray(this.spaces[r].luminanceCoefficients)},define:function(i){Object.assign(this.spaces,i)},_getMatrix:function(i,r,a){return i.copy(this.spaces[r].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(i){return this.spaces[i].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(i=this.workingColorSpace){return this.spaces[i].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(i,r){return ls("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),s.workingToColorSpace(i,r)},toWorkingColorSpace:function(i,r){return ls("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),s.colorSpaceToWorking(i,r)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return s.define({[en]:{primaries:e,whitePoint:n,transfer:Qr,toXYZ:wc,fromXYZ:Ac,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:Nt},outputColorSpaceConfig:{drawingBufferColorSpace:Nt}},[Nt]:{primaries:e,whitePoint:n,transfer:nt,toXYZ:wc,fromXYZ:Ac,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:Nt}}}),s}const qe=wf();function ei(s){return s<.04045?s*.0773993808:Math.pow(s*.9478672986+.0521327014,2.4)}function cs(s){return s<.0031308?s*12.92:1.055*Math.pow(s,.41666)-.055}let zi;class Af{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{zi===void 0&&(zi=js("canvas")),zi.width=e.width,zi.height=e.height;const i=zi.getContext("2d");e instanceof ImageData?i.putImageData(e,0,0):i.drawImage(e,0,0,e.width,e.height),n=zi}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=js("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const i=n.getImageData(0,0,e.width,e.height),r=i.data;for(let a=0;a<r.length;a++)r[a]=ei(r[a]/255)*255;return n.putImageData(i,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(ei(t[n]/255)*255):t[n]=ei(t[n]);return{data:t,width:e.width,height:e.height}}else return Ae("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let Rf=0;class Nl{constructor(e=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:Rf++}),this.uuid=_n(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let r;if(Array.isArray(i)){r=[];for(let a=0,o=i.length;a<o;a++)i[a].isDataTexture?r.push(Ra(i[a].image)):r.push(Ra(i[a]))}else r=Ra(i);n.url=r}return t||(e.images[this.uuid]=n),n}}function Ra(s){return typeof HTMLImageElement<"u"&&s instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&s instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&s instanceof ImageBitmap?Af.getDataURL(s):s.data?{data:Array.from(s.data),width:s.width,height:s.height,type:s.data.constructor.name}:(Ae("Texture: Unable to serialize Texture."),{})}let Cf=0;const Ca=new P;class Ut extends Ti{constructor(e=Ut.DEFAULT_IMAGE,t=Ut.DEFAULT_MAPPING,n=Pn,i=Pn,r=Rt,a=Zn,o=on,l=Qt,c=Ut.DEFAULT_ANISOTROPY,d=vi){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Cf++}),this.uuid=_n(),this.name="",this.source=new Nl(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=r,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new _e(0,0),this.repeat=new _e(1,1),this.center=new _e(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Oe,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=d,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(Ca).x}get height(){return this.source.getSize(Ca).y}get depth(){return this.source.getSize(Ca).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const t in e){const n=e[t];if(n===void 0){Ae(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}const i=this[t];if(i===void 0){Ae(`Texture.setValues(): property '${t}' does not exist.`);continue}i&&n&&i.isVector2&&n.isVector2||i&&n&&i.isVector3&&n.isVector3||i&&n&&i.isMatrix3&&n.isMatrix3?i.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==uh)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case ms:e.x=e.x-Math.floor(e.x);break;case Pn:e.x=e.x<0?0:1;break;case Zr:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case ms:e.y=e.y-Math.floor(e.y);break;case Pn:e.y=e.y<0?0:1;break;case Zr:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}Ut.DEFAULT_IMAGE=null;Ut.DEFAULT_MAPPING=uh;Ut.DEFAULT_ANISOTROPY=1;const tc=class tc{constructor(e=0,t=0,n=0,i=1){this.x=e,this.y=t,this.z=n,this.w=i}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,i){return this.x=e,this.y=t,this.z=n,this.w=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("THREE.Vector4: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,i=this.z,r=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*i+a[12]*r,this.y=a[1]*t+a[5]*n+a[9]*i+a[13]*r,this.z=a[2]*t+a[6]*n+a[10]*i+a[14]*r,this.w=a[3]*t+a[7]*n+a[11]*i+a[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,i,r;const l=e.elements,c=l[0],d=l[4],h=l[8],u=l[1],f=l[5],g=l[9],y=l[2],p=l[6],m=l[10];if(Math.abs(d-u)<.01&&Math.abs(h-y)<.01&&Math.abs(g-p)<.01){if(Math.abs(d+u)<.1&&Math.abs(h+y)<.1&&Math.abs(g+p)<.1&&Math.abs(c+f+m-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const T=(c+1)/2,_=(f+1)/2,b=(m+1)/2,E=(d+u)/4,w=(h+y)/4,v=(g+p)/4;return T>_&&T>b?T<.01?(n=0,i=.707106781,r=.707106781):(n=Math.sqrt(T),i=E/n,r=w/n):_>b?_<.01?(n=.707106781,i=0,r=.707106781):(i=Math.sqrt(_),n=E/i,r=v/i):b<.01?(n=.707106781,i=.707106781,r=0):(r=Math.sqrt(b),n=w/r,i=v/r),this.set(n,i,r,t),this}let S=Math.sqrt((p-g)*(p-g)+(h-y)*(h-y)+(u-d)*(u-d));return Math.abs(S)<.001&&(S=1),this.x=(p-g)/S,this.y=(h-y)/S,this.z=(u-d)/S,this.w=Math.acos((c+f+m-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=ze(this.x,e.x,t.x),this.y=ze(this.y,e.y,t.y),this.z=ze(this.z,e.z,t.z),this.w=ze(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=ze(this.x,e,t),this.y=ze(this.y,e,t),this.z=ze(this.z,e,t),this.w=ze(this.w,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(ze(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};tc.prototype.isVector4=!0;let lt=tc;class Pf extends Ti{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Rt,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new lt(0,0,e,t),this.scissorTest=!1,this.viewport=new lt(0,0,e,t),this.textures=[];const i={width:e,height:t,depth:n.depth},r=new Ut(i),a=n.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveColorBuffer=n.resolveColorBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.storeMultisampledColorBuffer=n.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=n.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=n.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(e={}){const t={minFilter:Rt,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),e!==null&&e.renderTarget===null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let i=0,r=this.textures.length;i<r;i++)this.textures[i].image.width=e,this.textures[i].image.height=t,this.textures[i].image.depth=n,this.textures[i].isData3DTexture!==!0&&(this.textures[i].isArrayTexture=this.textures[i].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const i=Object.assign({},e.textures[t].image);this.textures[t].source=new Nl(i)}if(this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveColorBuffer=e.resolveColorBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,this.storeMultisampledColorBuffer=e.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=e.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=e.storeMultisampledStencilBuffer,e.depthTexture!==null)if(e.depthTexture.renderTarget===e){const t=e.depthTexture.clone();t.renderTarget=null,this.depthTexture=t}else this.depthTexture=e.depthTexture;return this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}}class vn extends Pf{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class Eh extends Ut{constructor(e=null,t=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=At,this.minFilter=At,this.wrapR=Pn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class Lf extends Ut{constructor(e=null,t=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=At,this.minFilter=At,this.wrapR=Pn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}}const ca=class ca{constructor(e,t,n,i,r,a,o,l,c,d,h,u,f,g,y,p){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,i,r,a,o,l,c,d,h,u,f,g,y,p)}set(e,t,n,i,r,a,o,l,c,d,h,u,f,g,y,p){const m=this.elements;return m[0]=e,m[4]=t,m[8]=n,m[12]=i,m[1]=r,m[5]=a,m[9]=o,m[13]=l,m[2]=c,m[6]=d,m[10]=h,m[14]=u,m[3]=f,m[7]=g,m[11]=y,m[15]=p,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new ca().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),n.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();const t=this.elements,n=e.elements,i=1/Hi.setFromMatrixColumn(e,0).length(),r=1/Hi.setFromMatrixColumn(e,1).length(),a=1/Hi.setFromMatrixColumn(e,2).length();return t[0]=n[0]*i,t[1]=n[1]*i,t[2]=n[2]*i,t[3]=0,t[4]=n[4]*r,t[5]=n[5]*r,t[6]=n[6]*r,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,i=e.y,r=e.z,a=Math.cos(n),o=Math.sin(n),l=Math.cos(i),c=Math.sin(i),d=Math.cos(r),h=Math.sin(r);if(e.order==="XYZ"){const u=a*d,f=a*h,g=o*d,y=o*h;t[0]=l*d,t[4]=-l*h,t[8]=c,t[1]=f+g*c,t[5]=u-y*c,t[9]=-o*l,t[2]=y-u*c,t[6]=g+f*c,t[10]=a*l}else if(e.order==="YXZ"){const u=l*d,f=l*h,g=c*d,y=c*h;t[0]=u+y*o,t[4]=g*o-f,t[8]=a*c,t[1]=a*h,t[5]=a*d,t[9]=-o,t[2]=f*o-g,t[6]=y+u*o,t[10]=a*l}else if(e.order==="ZXY"){const u=l*d,f=l*h,g=c*d,y=c*h;t[0]=u-y*o,t[4]=-a*h,t[8]=g+f*o,t[1]=f+g*o,t[5]=a*d,t[9]=y-u*o,t[2]=-a*c,t[6]=o,t[10]=a*l}else if(e.order==="ZYX"){const u=a*d,f=a*h,g=o*d,y=o*h;t[0]=l*d,t[4]=g*c-f,t[8]=u*c+y,t[1]=l*h,t[5]=y*c+u,t[9]=f*c-g,t[2]=-c,t[6]=o*l,t[10]=a*l}else if(e.order==="YZX"){const u=a*l,f=a*c,g=o*l,y=o*c;t[0]=l*d,t[4]=y-u*h,t[8]=g*h+f,t[1]=h,t[5]=a*d,t[9]=-o*d,t[2]=-c*d,t[6]=f*h+g,t[10]=u-y*h}else if(e.order==="XZY"){const u=a*l,f=a*c,g=o*l,y=o*c;t[0]=l*d,t[4]=-h,t[8]=c*d,t[1]=u*h+y,t[5]=a*d,t[9]=f*h-g,t[2]=g*h-f,t[6]=o*d,t[10]=y*h+u}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(If,e,Df)}lookAt(e,t,n){const i=this.elements;return Jt.subVectors(e,t),Jt.lengthSq()===0&&(Jt.z=1),Jt.normalize(),di.crossVectors(n,Jt),di.lengthSq()===0&&(Math.abs(n.z)===1?Jt.x+=1e-4:Jt.z+=1e-4,Jt.normalize(),di.crossVectors(n,Jt)),di.normalize(),dr.crossVectors(Jt,di),i[0]=di.x,i[4]=dr.x,i[8]=Jt.x,i[1]=di.y,i[5]=dr.y,i[9]=Jt.y,i[2]=di.z,i[6]=dr.z,i[10]=Jt.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,i=t.elements,r=this.elements,a=n[0],o=n[4],l=n[8],c=n[12],d=n[1],h=n[5],u=n[9],f=n[13],g=n[2],y=n[6],p=n[10],m=n[14],S=n[3],T=n[7],_=n[11],b=n[15],E=i[0],w=i[4],v=i[8],A=i[12],C=i[1],L=i[5],B=i[9],V=i[13],O=i[2],G=i[6],J=i[10],X=i[14],ne=i[3],q=i[7],Q=i[11],ee=i[15];return r[0]=a*E+o*C+l*O+c*ne,r[4]=a*w+o*L+l*G+c*q,r[8]=a*v+o*B+l*J+c*Q,r[12]=a*A+o*V+l*X+c*ee,r[1]=d*E+h*C+u*O+f*ne,r[5]=d*w+h*L+u*G+f*q,r[9]=d*v+h*B+u*J+f*Q,r[13]=d*A+h*V+u*X+f*ee,r[2]=g*E+y*C+p*O+m*ne,r[6]=g*w+y*L+p*G+m*q,r[10]=g*v+y*B+p*J+m*Q,r[14]=g*A+y*V+p*X+m*ee,r[3]=S*E+T*C+_*O+b*ne,r[7]=S*w+T*L+_*G+b*q,r[11]=S*v+T*B+_*J+b*Q,r[15]=S*A+T*V+_*X+b*ee,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],i=e[8],r=e[12],a=e[1],o=e[5],l=e[9],c=e[13],d=e[2],h=e[6],u=e[10],f=e[14],g=e[3],y=e[7],p=e[11],m=e[15],S=l*f-c*u,T=o*f-c*h,_=o*u-l*h,b=a*f-c*d,E=a*u-l*d,w=a*h-o*d;return t*(y*S-p*T+m*_)-n*(g*S-p*b+m*E)+i*(g*T-y*b+m*w)-r*(g*_-y*E+p*w)}determinantAffine(){const e=this.elements,t=e[0],n=e[4],i=e[8],r=e[1],a=e[5],o=e[9],l=e[2],c=e[6],d=e[10];return t*(a*d-o*c)-n*(r*d-o*l)+i*(r*c-a*l)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const i=this.elements;return e.isVector3?(i[12]=e.x,i[13]=e.y,i[14]=e.z):(i[12]=e,i[13]=t,i[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],i=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],d=e[8],h=e[9],u=e[10],f=e[11],g=e[12],y=e[13],p=e[14],m=e[15],S=t*o-n*a,T=t*l-i*a,_=t*c-r*a,b=n*l-i*o,E=n*c-r*o,w=i*c-r*l,v=d*y-h*g,A=d*p-u*g,C=d*m-f*g,L=h*p-u*y,B=h*m-f*y,V=u*m-f*p,O=S*V-T*B+_*L+b*C-E*A+w*v;if(O===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const G=1/O;return e[0]=(o*V-l*B+c*L)*G,e[1]=(i*B-n*V-r*L)*G,e[2]=(y*w-p*E+m*b)*G,e[3]=(u*E-h*w-f*b)*G,e[4]=(l*C-a*V-c*A)*G,e[5]=(t*V-i*C+r*A)*G,e[6]=(p*_-g*w-m*T)*G,e[7]=(d*w-u*_+f*T)*G,e[8]=(a*B-o*C+c*v)*G,e[9]=(n*C-t*B-r*v)*G,e[10]=(g*E-y*_+m*S)*G,e[11]=(h*_-d*E-f*S)*G,e[12]=(o*A-a*L-l*v)*G,e[13]=(t*L-n*A+i*v)*G,e[14]=(y*T-g*b-p*S)*G,e[15]=(d*b-h*T+u*S)*G,this}scale(e){const t=this.elements,n=e.x,i=e.y,r=e.z;return t[0]*=n,t[4]*=i,t[8]*=r,t[1]*=n,t[5]*=i,t[9]*=r,t[2]*=n,t[6]*=i,t[10]*=r,t[3]*=n,t[7]*=i,t[11]*=r,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],i=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,i))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),i=Math.sin(t),r=1-n,a=e.x,o=e.y,l=e.z,c=r*a,d=r*o;return this.set(c*a+n,c*o-i*l,c*l+i*o,0,c*o+i*l,d*o+n,d*l-i*a,0,c*l-i*o,d*l+i*a,r*l*l+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,i,r,a){return this.set(1,n,r,0,e,1,a,0,t,i,1,0,0,0,0,1),this}compose(e,t,n){const i=this.elements,r=t._x,a=t._y,o=t._z,l=t._w,c=r+r,d=a+a,h=o+o,u=r*c,f=r*d,g=r*h,y=a*d,p=a*h,m=o*h,S=l*c,T=l*d,_=l*h,b=n.x,E=n.y,w=n.z;return i[0]=(1-(y+m))*b,i[1]=(f+_)*b,i[2]=(g-T)*b,i[3]=0,i[4]=(f-_)*E,i[5]=(1-(u+m))*E,i[6]=(p+S)*E,i[7]=0,i[8]=(g+T)*w,i[9]=(p-S)*w,i[10]=(1-(u+y))*w,i[11]=0,i[12]=e.x,i[13]=e.y,i[14]=e.z,i[15]=1,this}decompose(e,t,n){const i=this.elements;e.x=i[12],e.y=i[13],e.z=i[14];const r=this.determinantAffine();if(r===0)return n.set(1,1,1),t.identity(),this;let a=Hi.set(i[0],i[1],i[2]).length();const o=Hi.set(i[4],i[5],i[6]).length(),l=Hi.set(i[8],i[9],i[10]).length();r<0&&(a=-a),cn.copy(this);const c=1/a,d=1/o,h=1/l;return cn.elements[0]*=c,cn.elements[1]*=c,cn.elements[2]*=c,cn.elements[4]*=d,cn.elements[5]*=d,cn.elements[6]*=d,cn.elements[8]*=h,cn.elements[9]*=h,cn.elements[10]*=h,t.setFromRotationMatrix(cn),n.x=a,n.y=o,n.z=l,this}makePerspective(e,t,n,i,r,a,o=Ln,l=!1){const c=this.elements,d=2*r/(t-e),h=2*r/(n-i),u=(t+e)/(t-e),f=(n+i)/(n-i);let g,y;if(l)g=r/(a-r),y=a*r/(a-r);else if(o===Ln)g=-(a+r)/(a-r),y=-2*a*r/(a-r);else if(o===Js)g=-a/(a-r),y=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=d,c[4]=0,c[8]=u,c[12]=0,c[1]=0,c[5]=h,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=g,c[14]=y,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,i,r,a,o=Ln,l=!1){const c=this.elements,d=2/(t-e),h=2/(n-i),u=-(t+e)/(t-e),f=-(n+i)/(n-i);let g,y;if(l)g=1/(a-r),y=a/(a-r);else if(o===Ln)g=-2/(a-r),y=-(a+r)/(a-r);else if(o===Js)g=-1/(a-r),y=-r/(a-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=d,c[4]=0,c[8]=0,c[12]=u,c[1]=0,c[5]=h,c[9]=0,c[13]=f,c[2]=0,c[6]=0,c[10]=g,c[14]=y,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let i=0;i<16;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}};ca.prototype.isMatrix4=!0;let Be=ca;const Hi=new P,cn=new Be,If=new P(0,0,0),Df=new P(1,1,1),di=new P,dr=new P,Jt=new P,Rc=new Be,Cc=new xn;class Ei{constructor(e=0,t=0,n=0,i=Ei.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=i}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,i=this._order){return this._x=e,this._y=t,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const i=e.elements,r=i[0],a=i[4],o=i[8],l=i[1],c=i[5],d=i[9],h=i[2],u=i[6],f=i[10];switch(t){case"XYZ":this._y=Math.asin(ze(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-d,f),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(u,c),this._z=0);break;case"YXZ":this._x=Math.asin(-ze(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-h,r),this._z=0);break;case"ZXY":this._x=Math.asin(ze(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(-h,f),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-ze(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(u,f),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(ze(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-d,c),this._y=Math.atan2(-h,r)):(this._x=0,this._y=Math.atan2(o,f));break;case"XZY":this._z=Math.asin(-ze(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(u,c),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-d,f),this._y=0);break;default:Ae("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return Rc.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Rc,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Cc.setFromEuler(this),this.setFromQuaternion(Cc,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Ei.DEFAULT_ORDER="XYZ";class Ul{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let Nf=0;const Pc=new P,Gi=new xn,Gn=new Be,hr=new P,Ts=new P,Uf=new P,Of=new xn,Lc=new P(1,0,0),Ic=new P(0,1,0),Dc=new P(0,0,1),Nc={type:"added"},Ff={type:"removed"},Vi={type:"childadded",child:null},Pa={type:"childremoved",child:null};class mt extends Ti{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Nf++}),this.uuid=_n(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=mt.DEFAULT_UP.clone();const e=new P,t=new Ei,n=new xn,i=new P(1,1,1);function r(){n.setFromEuler(t,!1)}function a(){t.setFromQuaternion(n,void 0,!1)}t._onChange(r),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new Be},normalMatrix:{value:new Oe}}),this.matrix=new Be,this.matrixWorld=new Be,this.matrixAutoUpdate=mt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=mt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Ul,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Gi.setFromAxisAngle(e,t),this.quaternion.multiply(Gi),this}rotateOnWorldAxis(e,t){return Gi.setFromAxisAngle(e,t),this.quaternion.premultiply(Gi),this}rotateX(e){return this.rotateOnAxis(Lc,e)}rotateY(e){return this.rotateOnAxis(Ic,e)}rotateZ(e){return this.rotateOnAxis(Dc,e)}translateOnAxis(e,t){return Pc.copy(e).applyQuaternion(this.quaternion),this.position.add(Pc.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Lc,e)}translateY(e){return this.translateOnAxis(Ic,e)}translateZ(e){return this.translateOnAxis(Dc,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Gn.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?hr.copy(e):hr.set(e,t,n);const i=this.parent;this.updateWorldMatrix(!0,!1),Ts.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Gn.lookAt(Ts,hr,this.up):Gn.lookAt(hr,Ts,this.up),this.quaternion.setFromRotationMatrix(Gn),i&&(Gn.extractRotation(i.matrixWorld),Gi.setFromRotationMatrix(Gn),this.quaternion.premultiply(Gi.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(Ne("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Nc),Vi.child=e,this.dispatchEvent(Vi),Vi.child=null):Ne("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Ff),Pa.child=e,this.dispatchEvent(Pa),Pa.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Gn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Gn.multiply(e.parent.matrixWorld)),e.applyMatrix4(Gn),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Nc),Vi.child=e,this.dispatchEvent(Vi),Vi.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,i=this.children.length;n<i;n++){const a=this.children[n].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const i=this.children;for(let r=0,a=i.length;r<a;r++)i[r].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ts,e,Uf),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ts,Of,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}intersectsFrustum(){}traverse(e){e(this);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const e=this.pivot;if(e!==null){const t=e.x,n=e.y,i=e.z,r=this.matrix.elements;r[12]+=t-r[0]*t-r[4]*n-r[8]*i,r[13]+=n-r[1]*t-r[5]*n-r[9]*i,r[14]+=i-r[2]*t-r[6]*n-r[10]*i}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t,n=!1){const i=this.parent;if(e===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),t===!0){const r=this.children;for(let a=0,o=r.length;a<o;a++)r[a].updateWorldMatrix(!1,!0,n)}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const i={};i.uuid=this.uuid,i.type=this.type,i.name=this.name,i.castShadow=this.castShadow,i.receiveShadow=this.receiveShadow,i.visible=this.visible,i.frustumCulled=this.frustumCulled,i.renderOrder=this.renderOrder,i.static=this.static,i.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.pivot!==null&&(i.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(i.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(i.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),i.instanceInfo=this._instanceInfo.map(o=>({...o})),i.availableInstanceIds=this._availableInstanceIds.slice(),i.availableGeometryIds=this._availableGeometryIds.slice(),i.nextIndexStart=this._nextIndexStart,i.nextVertexStart=this._nextVertexStart,i.geometryCount=this._geometryCount,i.maxInstanceCount=this._maxInstanceCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.matricesTexture=this._matricesTexture.toJSON(e),i.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(i.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(i.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(i.boundingBox=this.boundingBox.toJSON()));function r(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=r(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let c=0,d=l.length;c<d;c++){const h=l[c];r(e.shapes,h)}else r(e.shapes,l)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(r(e.materials,this.material[l]));i.material=o}else i.material=r(e.materials,this.material);if(this.children.length>0){i.children=[];for(let o=0;o<this.children.length;o++)i.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){i.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];i.animations.push(r(e.animations,l))}}if(t){const o=a(e.geometries),l=a(e.materials),c=a(e.textures),d=a(e.images),h=a(e.shapes),u=a(e.skeletons),f=a(e.animations),g=a(e.nodes);o.length>0&&(n.geometries=o),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),d.length>0&&(n.images=d),h.length>0&&(n.shapes=h),u.length>0&&(n.skeletons=u),f.length>0&&(n.animations=f),g.length>0&&(n.nodes=g)}return n.object=i,n;function a(o){const l=[];for(const c in o){const d=o[c];delete d.metadata,l.push(d)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const i=e.children[n];this.add(i.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}}mt.DEFAULT_UP=new P(0,1,0);mt.DEFAULT_MATRIX_AUTO_UPDATE=!0;mt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class Jn extends mt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Bf={type:"move"};class La{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Jn,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Jn,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new P,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new P),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Jn,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new P,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new P,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let i=null,r=null,a=null;const o=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){a=!0;for(const y of e.hand.values()){const p=t.getJointPose(y,n),m=this._getHandJoint(c,y);p!==null&&(m.matrix.fromArray(p.transform.matrix),m.matrix.decompose(m.position,m.rotation,m.scale),m.matrixWorldNeedsUpdate=!0,m.jointRadius=p.radius),m.visible=p!==null}const d=c.joints["index-finger-tip"],h=c.joints["thumb-tip"],u=d.position.distanceTo(h.position),f=.02,g=.005;c.inputState.pinching&&u>f+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&u<=f-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1,l.eventsEnabled&&l.dispatchEvent({type:"gripUpdated",data:e,target:this})));o!==null&&(i=t.getPose(e.targetRaySpace,n),i===null&&r!==null&&(i=r),i!==null&&(o.matrix.fromArray(i.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,i.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(i.linearVelocity)):o.hasLinearVelocity=!1,i.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(i.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(Bf)))}return o!==null&&(o.visible=i!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new Jn;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}const Th={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},hi={h:0,s:0,l:0},ur={h:0,s:0,l:0};function Ia(s,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?s+(e-s)*6*t:t<1/2?e:t<2/3?s+(e-s)*6*(2/3-t):s}class Ie{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const i=e;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Nt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,qe.colorSpaceToWorking(this,t),this}setRGB(e,t,n,i=qe.workingColorSpace){return this.r=e,this.g=t,this.b=n,qe.colorSpaceToWorking(this,i),this}setHSL(e,t,n,i=qe.workingColorSpace){if(e=Dl(e,1),t=ze(t,0,1),n=ze(n,0,1),t===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+t):n+t-n*t,a=2*n-r;this.r=Ia(a,r,e+1/3),this.g=Ia(a,r,e),this.b=Ia(a,r,e-1/3)}return qe.colorSpaceToWorking(this,i),this}setStyle(e,t=Nt){function n(r){r!==void 0&&parseFloat(r)<1&&Ae("Color: Alpha component of "+e+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(e)){let r;const a=i[1],o=i[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:Ae("Color: Unknown color model "+e)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(e)){const r=i[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(r,16),t);Ae("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Nt){const n=Th[e.toLowerCase()];return n!==void 0?this.setHex(n,t):Ae("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=ei(e.r),this.g=ei(e.g),this.b=ei(e.b),this}copyLinearToSRGB(e){return this.r=cs(e.r),this.g=cs(e.g),this.b=cs(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Nt){return qe.workingToColorSpace(zt.copy(this),e),Math.round(ze(zt.r*255,0,255))*65536+Math.round(ze(zt.g*255,0,255))*256+Math.round(ze(zt.b*255,0,255))}getHexString(e=Nt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=qe.workingColorSpace){qe.workingToColorSpace(zt.copy(this),t);const n=zt.r,i=zt.g,r=zt.b,a=Math.max(n,i,r),o=Math.min(n,i,r);let l,c;const d=(o+a)/2;if(o===a)l=0,c=0;else{const h=a-o;switch(c=d<=.5?h/(a+o):h/(2-a-o),a){case n:l=(i-r)/h+(i<r?6:0);break;case i:l=(r-n)/h+2;break;case r:l=(n-i)/h+4;break}l/=6}return e.h=l,e.s=c,e.l=d,e}getRGB(e,t=qe.workingColorSpace){return qe.workingToColorSpace(zt.copy(this),t),e.r=zt.r,e.g=zt.g,e.b=zt.b,e}getStyle(e=Nt){qe.workingToColorSpace(zt.copy(this),e);const t=zt.r,n=zt.g,i=zt.b;return e!==Nt?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(i*255)})`}offsetHSL(e,t,n){return this.getHSL(hi),this.setHSL(hi.h+e,hi.s+t,hi.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(hi),e.getHSL(ur);const n=Gs(hi.h,ur.h,t),i=Gs(hi.s,ur.s,t),r=Gs(hi.l,ur.l,t);return this.setHSL(n,i,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,i=this.b,r=e.elements;return this.r=r[0]*t+r[3]*n+r[6]*i,this.g=r[1]*t+r[4]*n+r[7]*i,this.b=r[2]*t+r[5]*n+r[8]*i,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const zt=new Ie;Ie.NAMES=Th;class kf extends mt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Ei,this.environmentIntensity=1,this.environmentRotation=new Ei,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),t.object.backgroundBlurriness=this.backgroundBlurriness,t.object.backgroundIntensity=this.backgroundIntensity,t.object.backgroundRotation=this.backgroundRotation.toArray(),t.object.environmentIntensity=this.environmentIntensity,t.object.environmentRotation=this.environmentRotation.toArray(),t}}const dn=new P,Vn=new P,Da=new P,Wn=new P,Wi=new P,Xi=new P,Uc=new P,Na=new P,Ua=new P,Oa=new P,Fa=new lt,Ba=new lt,ka=new lt;class mn{constructor(e=new P,t=new P,n=new P){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,i){i.subVectors(n,t),dn.subVectors(e,t),i.cross(dn);const r=i.lengthSq();return r>0?i.multiplyScalar(1/Math.sqrt(r)):i.set(0,0,0)}static getBarycoord(e,t,n,i,r){dn.subVectors(i,t),Vn.subVectors(n,t),Da.subVectors(e,t);const a=dn.dot(dn),o=dn.dot(Vn),l=dn.dot(Da),c=Vn.dot(Vn),d=Vn.dot(Da),h=a*c-o*o;if(h===0)return r.set(0,0,0),null;const u=1/h,f=(c*l-o*d)*u,g=(a*d-o*l)*u;return r.set(1-f-g,g,f)}static containsPoint(e,t,n,i){return this.getBarycoord(e,t,n,i,Wn)===null?!1:Wn.x>=0&&Wn.y>=0&&Wn.x+Wn.y<=1}static getInterpolation(e,t,n,i,r,a,o,l){return this.getBarycoord(e,t,n,i,Wn)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,Wn.x),l.addScaledVector(a,Wn.y),l.addScaledVector(o,Wn.z),l)}static getInterpolatedAttribute(e,t,n,i,r,a){return Fa.setScalar(0),Ba.setScalar(0),ka.setScalar(0),Fa.fromBufferAttribute(e,t),Ba.fromBufferAttribute(e,n),ka.fromBufferAttribute(e,i),a.setScalar(0),a.addScaledVector(Fa,r.x),a.addScaledVector(Ba,r.y),a.addScaledVector(ka,r.z),a}static isFrontFacing(e,t,n,i){return dn.subVectors(n,t),Vn.subVectors(e,t),dn.cross(Vn).dot(i)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,i){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[i]),this}setFromAttributeAndIndices(e,t,n,i){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,i),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return dn.subVectors(this.c,this.b),Vn.subVectors(this.a,this.b),dn.cross(Vn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return mn.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return mn.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,i,r){return mn.getInterpolation(e,this.a,this.b,this.c,t,n,i,r)}containsPoint(e){return mn.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return mn.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,i=this.b,r=this.c;let a,o;Wi.subVectors(i,n),Xi.subVectors(r,n),Na.subVectors(e,n);const l=Wi.dot(Na),c=Xi.dot(Na);if(l<=0&&c<=0)return t.copy(n);Ua.subVectors(e,i);const d=Wi.dot(Ua),h=Xi.dot(Ua);if(d>=0&&h<=d)return t.copy(i);const u=l*h-d*c;if(u<=0&&l>=0&&d<=0)return a=l/(l-d),t.copy(n).addScaledVector(Wi,a);Oa.subVectors(e,r);const f=Wi.dot(Oa),g=Xi.dot(Oa);if(g>=0&&f<=g)return t.copy(r);const y=f*c-l*g;if(y<=0&&c>=0&&g<=0)return o=c/(c-g),t.copy(n).addScaledVector(Xi,o);const p=d*g-f*h;if(p<=0&&h-d>=0&&f-g>=0)return Uc.subVectors(r,i),o=(h-d)/(h-d+(f-g)),t.copy(i).addScaledVector(Uc,o);const m=1/(p+y+u);return a=y*m,o=u*m,t.copy(n).addScaledVector(Wi,a).addScaledVector(Xi,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}class ri{constructor(e=new P(1/0,1/0,1/0),t=new P(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(hn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(hn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=hn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const r=n.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,hn):hn.fromBufferAttribute(r,a),hn.applyMatrix4(e.matrixWorld),this.expandByPoint(hn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),fr.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),fr.copy(n.boundingBox)),fr.applyMatrix4(e.matrixWorld),this.union(fr)}const i=e.children;for(let r=0,a=i.length;r<a;r++)this.expandByObject(i[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,hn),hn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(ws),pr.subVectors(this.max,ws),$i.subVectors(e.a,ws),qi.subVectors(e.b,ws),Ki.subVectors(e.c,ws),ui.subVectors(qi,$i),fi.subVectors(Ki,qi),Ai.subVectors($i,Ki);let t=[0,-ui.z,ui.y,0,-fi.z,fi.y,0,-Ai.z,Ai.y,ui.z,0,-ui.x,fi.z,0,-fi.x,Ai.z,0,-Ai.x,-ui.y,ui.x,0,-fi.y,fi.x,0,-Ai.y,Ai.x,0];return!za(t,$i,qi,Ki,pr)||(t=[1,0,0,0,1,0,0,0,1],!za(t,$i,qi,Ki,pr))?!1:(mr.crossVectors(ui,fi),t=[mr.x,mr.y,mr.z],za(t,$i,qi,Ki,pr))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,hn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(hn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Xn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Xn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Xn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Xn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Xn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Xn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Xn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Xn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Xn),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const Xn=[new P,new P,new P,new P,new P,new P,new P,new P],hn=new P,fr=new ri,$i=new P,qi=new P,Ki=new P,ui=new P,fi=new P,Ai=new P,ws=new P,pr=new P,mr=new P,Ri=new P;function za(s,e,t,n,i){for(let r=0,a=s.length-3;r<=a;r+=3){Ri.fromArray(s,r);const o=i.x*Math.abs(Ri.x)+i.y*Math.abs(Ri.y)+i.z*Math.abs(Ri.z),l=e.dot(Ri),c=t.dot(Ri),d=n.dot(Ri);if(Math.max(-Math.max(l,c,d),Math.min(l,c,d))>o)return!1}return!0}const Et=new P,gr=new _e;let zf=0;class Zt extends Ti{constructor(e,t,n=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:zf++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=Mh,this.updateRanges=[],this.gpuType=an,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let i=0,r=this.itemSize;i<r;i++)this.array[e+i]=t.array[n+i];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)gr.fromBufferAttribute(this,t),gr.applyMatrix3(e),this.setXY(t,gr.x,gr.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)Et.fromBufferAttribute(this,t),Et.applyMatrix3(e),this.setXYZ(t,Et.x,Et.y,Et.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)Et.fromBufferAttribute(this,t),Et.applyMatrix4(e),this.setXYZ(t,Et.x,Et.y,Et.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Et.fromBufferAttribute(this,t),Et.applyNormalMatrix(e),this.setXYZ(t,Et.x,Et.y,Et.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Et.fromBufferAttribute(this,t),Et.transformDirection(e),this.setXYZ(t,Et.x,Et.y,Et.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=pn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=it(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=pn(t,this.array)),t}setX(e,t){return this.normalized&&(t=it(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=pn(t,this.array)),t}setY(e,t){return this.normalized&&(t=it(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=pn(t,this.array)),t}setZ(e,t){return this.normalized&&(t=it(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=pn(t,this.array)),t}setW(e,t){return this.normalized&&(t=it(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=it(t,this.array),n=it(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,i){return e*=this.itemSize,this.normalized&&(t=it(t,this.array),n=it(n,this.array),i=it(i,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this}setXYZW(e,t,n,i,r){return e*=this.itemSize,this.normalized&&(t=it(t,this.array),n=it(n,this.array),i=it(i,this.array),r=it(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return e.name=this.name,e.usage=this.usage,e.gpuType=this.gpuType,e}dispose(){this.dispatchEvent({type:"dispose"})}}class wh extends Zt{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class Ah extends Zt{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class _t extends Zt{constructor(e,t,n){super(new Float32Array(e),t,n)}}const Hf=new ri,As=new P,Ha=new P;class Hn{constructor(e=new P,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):Hf.setFromPoints(e).getCenter(n);let i=0;for(let r=0,a=e.length;r<a;r++)i=Math.max(i,n.distanceToSquared(e[r]));return this.radius=Math.sqrt(i),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;As.subVectors(e,this.center);const t=As.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),i=(n-this.radius)*.5;this.center.addScaledVector(As,i/n),this.radius+=i}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Ha.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(As.copy(e.center).add(Ha)),this.expandByPoint(As.copy(e.center).sub(Ha))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}let Gf=0;const nn=new Be,Ga=new mt,Yi=new P,jt=new ri,Rs=new ri,Dt=new P;class Ct extends Ti{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Gf++}),this.uuid=_n(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(rf(e)?Ah:wh)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new Oe().getNormalMatrix(e);n.applyNormalMatrix(r),n.needsUpdate=!0}const i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(e),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return nn.makeRotationFromQuaternion(e),this.applyMatrix4(nn),this}rotateX(e){return nn.makeRotationX(e),this.applyMatrix4(nn),this}rotateY(e){return nn.makeRotationY(e),this.applyMatrix4(nn),this}rotateZ(e){return nn.makeRotationZ(e),this.applyMatrix4(nn),this}translate(e,t,n){return nn.makeTranslation(e,t,n),this.applyMatrix4(nn),this}scale(e,t,n){return nn.makeScale(e,t,n),this.applyMatrix4(nn),this}lookAt(e){return Ga.lookAt(e),Ga.updateMatrix(),this.applyMatrix4(Ga.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Yi).negate(),this.translate(Yi.x,Yi.y,Yi.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const n=[];for(let i=0,r=e.length;i<r;i++){const a=e[i];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new _t(n,3))}else{const n=Math.min(e.length,t.count);for(let i=0;i<n;i++){const r=e[i];t.setXYZ(i,r.x,r.y,r.z||0)}e.length>t.count&&Ae("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new ri);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Ne("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new P(-1/0,-1/0,-1/0),new P(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,i=t.length;n<i;n++){const r=t[n];jt.setFromBufferAttribute(r),this.morphTargetsRelative?(Dt.addVectors(this.boundingBox.min,jt.min),this.boundingBox.expandByPoint(Dt),Dt.addVectors(this.boundingBox.max,jt.max),this.boundingBox.expandByPoint(Dt)):(this.boundingBox.expandByPoint(jt.min),this.boundingBox.expandByPoint(jt.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Ne('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Hn);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Ne("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new P,1/0);return}if(e){const n=this.boundingSphere.center;if(jt.setFromBufferAttribute(e),t)for(let r=0,a=t.length;r<a;r++){const o=t[r];Rs.setFromBufferAttribute(o),this.morphTargetsRelative?(Dt.addVectors(jt.min,Rs.min),jt.expandByPoint(Dt),Dt.addVectors(jt.max,Rs.max),jt.expandByPoint(Dt)):(jt.expandByPoint(Rs.min),jt.expandByPoint(Rs.max))}jt.getCenter(n);let i=0;for(let r=0,a=e.count;r<a;r++)Dt.fromBufferAttribute(e,r),i=Math.max(i,n.distanceToSquared(Dt));if(t)for(let r=0,a=t.length;r<a;r++){const o=t[r],l=this.morphTargetsRelative;for(let c=0,d=o.count;c<d;c++)Dt.fromBufferAttribute(o,c),l&&(Yi.fromBufferAttribute(e,c),Dt.add(Yi)),i=Math.max(i,n.distanceToSquared(Dt))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&Ne('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){Ne("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=t.position,i=t.normal,r=t.uv;let a=this.getAttribute("tangent");(a===void 0||a.count!==n.count)&&(a=new Zt(new Float32Array(4*n.count),4),this.setAttribute("tangent",a));const o=[],l=[];for(let v=0;v<n.count;v++)o[v]=new P,l[v]=new P;const c=new P,d=new P,h=new P,u=new _e,f=new _e,g=new _e,y=new P,p=new P;function m(v,A,C){c.fromBufferAttribute(n,v),d.fromBufferAttribute(n,A),h.fromBufferAttribute(n,C),u.fromBufferAttribute(r,v),f.fromBufferAttribute(r,A),g.fromBufferAttribute(r,C),d.sub(c),h.sub(c),f.sub(u),g.sub(u);const L=1/(f.x*g.y-g.x*f.y);isFinite(L)&&(y.copy(d).multiplyScalar(g.y).addScaledVector(h,-f.y).multiplyScalar(L),p.copy(h).multiplyScalar(f.x).addScaledVector(d,-g.x).multiplyScalar(L),o[v].add(y),o[A].add(y),o[C].add(y),l[v].add(p),l[A].add(p),l[C].add(p))}let S=this.groups;S.length===0&&(S=[{start:0,count:e.count}]);for(let v=0,A=S.length;v<A;++v){const C=S[v],L=C.start,B=C.count;for(let V=L,O=L+B;V<O;V+=3)m(e.getX(V+0),e.getX(V+1),e.getX(V+2))}const T=new P,_=new P,b=new P,E=new P;function w(v){b.fromBufferAttribute(i,v),E.copy(b);const A=o[v];T.copy(A),T.sub(b.multiplyScalar(b.dot(A))).normalize(),_.crossVectors(E,A);const L=_.dot(l[v])<0?-1:1;a.setXYZW(v,T.x,T.y,T.z,L)}for(let v=0,A=S.length;v<A;++v){const C=S[v],L=C.start,B=C.count;for(let V=L,O=L+B;V<O;V+=3)w(e.getX(V+0)),w(e.getX(V+1)),w(e.getX(V+2))}this._transformed=!0}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0||n.count!==t.count)n=new Zt(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let u=0,f=n.count;u<f;u++)n.setXYZ(u,0,0,0);const i=new P,r=new P,a=new P,o=new P,l=new P,c=new P,d=new P,h=new P;if(e)for(let u=0,f=e.count;u<f;u+=3){const g=e.getX(u+0),y=e.getX(u+1),p=e.getX(u+2);i.fromBufferAttribute(t,g),r.fromBufferAttribute(t,y),a.fromBufferAttribute(t,p),d.subVectors(a,r),h.subVectors(i,r),d.cross(h),o.fromBufferAttribute(n,g),l.fromBufferAttribute(n,y),c.fromBufferAttribute(n,p),o.add(d),l.add(d),c.add(d),n.setXYZ(g,o.x,o.y,o.z),n.setXYZ(y,l.x,l.y,l.z),n.setXYZ(p,c.x,c.y,c.z)}else for(let u=0,f=t.count;u<f;u+=3)i.fromBufferAttribute(t,u+0),r.fromBufferAttribute(t,u+1),a.fromBufferAttribute(t,u+2),d.subVectors(a,r),h.subVectors(i,r),d.cross(h),n.setXYZ(u+0,d.x,d.y,d.z),n.setXYZ(u+1,d.x,d.y,d.z),n.setXYZ(u+2,d.x,d.y,d.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Dt.fromBufferAttribute(e,t),Dt.normalize(),e.setXYZ(t,Dt.x,Dt.y,Dt.z)}toNonIndexed(){function e(o,l){const c=o.array,d=o.itemSize,h=o.normalized,u=new c.constructor(l.length*d);let f=0,g=0;for(let y=0,p=l.length;y<p;y++){o.isInterleavedBufferAttribute?f=l[y]*o.data.stride+o.offset:f=l[y]*d;for(let m=0;m<d;m++)u[g++]=c[f++]}return new Zt(u,d,h)}if(this.index===null)return Ae("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new Ct,n=this.index.array,i=this.attributes;for(const o in i){const l=i[o],c=e(l,n);t.setAttribute(o,c)}const r=this.morphAttributes;for(const o in r){const l=[],c=r[o];for(let d=0,h=c.length;d<h;d++){const u=c[d],f=e(u,n);l.push(f)}t.morphAttributes[o]=l}t.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,l=a.length;o<l;o++){const c=a[o];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,e.name=this.name,Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const l in n){const c=n[l];e.data.attributes[l]=c.toJSON(e.data)}const i={};let r=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],d=[];for(let h=0,u=c.length;h<u;h++){const f=c[h];d.push(f.toJSON(e.data))}d.length>0&&(i[l]=d,r=!0)}r&&(e.data.morphAttributes=i,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone());const i=e.attributes;for(const c in i){const d=i[c];this.setAttribute(c,d.clone(t))}const r=e.morphAttributes;for(const c in r){const d=[],h=r[c];for(let u=0,f=h.length;u<f;u++)d.push(h[u].clone(t));this.morphAttributes[c]=d}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let c=0,d=a.length;c<d;c++){const h=a[c];this.addGroup(h.start,h.count,h.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Vf{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=Mh,this.updateRanges=[],this.version=0,this.uuid=_n()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let i=0,r=this.stride;i<r;i++)this.array[e+i]=t.array[n+i];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=_n()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=_n()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer)));const t={uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride};return t.usage=this.usage,t}}const Gt=new P;class Ol{constructor(e,t,n,i=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=i}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)Gt.fromBufferAttribute(this,t),Gt.applyMatrix4(e),this.setXYZ(t,Gt.x,Gt.y,Gt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Gt.fromBufferAttribute(this,t),Gt.applyNormalMatrix(e),this.setXYZ(t,Gt.x,Gt.y,Gt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Gt.fromBufferAttribute(this,t),Gt.transformDirection(e),this.setXYZ(t,Gt.x,Gt.y,Gt.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=pn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=it(n,this.array)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=it(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=it(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=it(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=it(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=pn(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=pn(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=pn(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=pn(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=it(t,this.array),n=it(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=it(t,this.array),n=it(n,this.array),i=it(i,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this}setXYZW(e,t,n,i,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=it(t,this.array),n=it(n,this.array),i=it(i,this.array),r=it(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this.data.array[e+3]=r,this}clone(e){if(e===void 0){ea("InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[i+r])}return new Zt(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new Ol(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){ea("InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[i+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}const Va=new P,Wf=new P,Xf=new Oe;class Yn{constructor(e=new P(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,i){return this.normal.set(e,t,n),this.constant=i,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const i=Va.subVectors(n,t).cross(Wf.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(i,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,n=!0){const i=e.delta(Va),r=this.normal.dot(i);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const a=-(e.start.dot(this.normal)+this.constant)/r;return n===!0&&(a<0||a>1)?null:t.copy(e.start).addScaledVector(i,a)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||Xf.getNormalMatrix(e),i=this.coplanarPoint(Va).applyMatrix4(e),r=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(e){return this.normal.fromArray(e.normal),this.constant=e.constant,this}}let $f=0;class Nn extends Ti{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:$f++}),this.uuid=_n(),this.name="",this.type="Material",this.blending=zs,this.side=ni,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=ih,this.blendDst=sh,this.blendEquation=is,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Ie(0,0,0),this.blendAlpha=0,this.depthFunc=$s,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Ju,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Ta,this.stencilZFail=Ta,this.stencilZPass=Ta,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){Ae(`Material: parameter '${t}' has value of undefined.`);continue}const i=this[t];if(i===void 0){Ae(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}i&&i.isColor?i.set(n):i&&i.isVector2&&n&&n.isVector2||i&&i.isEuler&&n&&n.isEuler||i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,n.blending=this.blending,n.side=this.side,n.shadowSide=this.shadowSide,n.vertexColors=this.vertexColors,n.opacity=this.opacity,n.transparent=this.transparent,n.blendSrc=this.blendSrc,n.blendDst=this.blendDst,n.blendEquation=this.blendEquation,n.blendSrcAlpha=this.blendSrcAlpha,n.blendDstAlpha=this.blendDstAlpha,n.blendEquationAlpha=this.blendEquationAlpha,n.blendColor=this.blendColor.getHex(),n.blendAlpha=this.blendAlpha,n.depthFunc=this.depthFunc,n.depthTest=this.depthTest,n.depthWrite=this.depthWrite,n.colorWrite=this.colorWrite,n.clipIntersection=this.clipIntersection,n.clipShadows=this.clipShadows,n.stencilWriteMask=this.stencilWriteMask,n.stencilFunc=this.stencilFunc,n.stencilRef=this.stencilRef,n.stencilFuncMask=this.stencilFuncMask,n.stencilFail=this.stencilFail,n.stencilZFail=this.stencilZFail,n.stencilZPass=this.stencilZPass,n.stencilWrite=this.stencilWrite,n.polygonOffset=this.polygonOffset,n.polygonOffsetFactor=this.polygonOffsetFactor,n.polygonOffsetUnits=this.polygonOffsetUnits,n.dithering=this.dithering,n.alphaTest=this.alphaTest,n.alphaHash=this.alphaHash,n.alphaToCoverage=this.alphaToCoverage,n.premultipliedAlpha=this.premultipliedAlpha,n.forceSinglePass=this.forceSinglePass,n.allowOverride=this.allowOverride,n.visible=this.visible,n.toneMapped=this.toneMapped,n.name=this.name,this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(n.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(n.clippingPlanes=this.clippingPlanes.map(r=>r.toJSON())),this.rotation!==void 0&&(n.rotation=this.rotation),this.depthPacking!==void 0&&(n.depthPacking=this.depthPacking),this.linewidth!==void 0&&(n.linewidth=this.linewidth),this.linecap!==void 0&&(n.linecap=this.linecap),this.linejoin!==void 0&&(n.linejoin=this.linejoin),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.wireframe!==void 0&&(n.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(n.flatShading=this.flatShading),this.fog!==void 0&&(n.fog=this.fog),Object.keys(this.userData).length>0&&(n.userData=this.userData);function i(r){const a=[];for(const o in r){const l=r[o];delete l.metadata,a.push(l)}return a}if(t){const r=i(e.textures),a=i(e.images);r.length>0&&(n.textures=r),a.length>0&&(n.images=a)}return n}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new Ie().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.retroreflectivity!==void 0&&(this.retroreflectivity=e.retroreflectivity),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.clippingPlanes!==void 0&&(this.clippingPlanes=e.clippingPlanes.map(n=>new Yn().fromJSON(n))),e.clipIntersection!==void 0&&(this.clipIntersection=e.clipIntersection),e.clipShadows!==void 0&&(this.clipShadows=e.clipShadows),e.depthPacking!==void 0&&(this.depthPacking=e.depthPacking),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.linecap!==void 0&&(this.linecap=e.linecap),e.linejoin!==void 0&&(this.linejoin=e.linejoin),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?this.vertexColors=e.vertexColors>0:this.vertexColors=e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let n=e.normalScale;Array.isArray(n)===!1&&(n=[n,n]),this.normalScale=new _e().fromArray(n)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new _e().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const i=t.length;n=new Array(i);for(let r=0;r!==i;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}const $n=new P,Wa=new P,_r=new P,vr=new P;class xs{constructor(e=new P,t=new P(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,$n)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=$n.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):($n.copy(this.origin).addScaledVector(this.direction,t),$n.distanceToSquared(e))}distanceSqToSegment(e,t,n,i){Wa.copy(e).add(t).multiplyScalar(.5),_r.copy(t).sub(e).normalize(),vr.copy(this.origin).sub(Wa);const r=e.distanceTo(t)*.5,a=-this.direction.dot(_r),o=vr.dot(this.direction),l=-vr.dot(_r),c=vr.lengthSq(),d=Math.abs(1-a*a);let h,u,f,g;if(d>0)if(h=a*l-o,u=a*o-l,g=r*d,h>=0)if(u>=-g)if(u<=g){const y=1/d;h*=y,u*=y,f=h*(h+a*u+2*o)+u*(a*h+u+2*l)+c}else u=r,h=Math.max(0,-(a*u+o)),f=-h*h+u*(u+2*l)+c;else u=-r,h=Math.max(0,-(a*u+o)),f=-h*h+u*(u+2*l)+c;else u<=-g?(h=Math.max(0,-(-a*r+o)),u=h>0?-r:Math.min(Math.max(-r,-l),r),f=-h*h+u*(u+2*l)+c):u<=g?(h=0,u=Math.min(Math.max(-r,-l),r),f=u*(u+2*l)+c):(h=Math.max(0,-(a*r+o)),u=h>0?r:Math.min(Math.max(-r,-l),r),f=-h*h+u*(u+2*l)+c);else u=a>0?-r:r,h=Math.max(0,-(a*u+o)),f=-h*h+u*(u+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,h),i&&i.copy(Wa).addScaledVector(_r,u),f}intersectSphere(e,t){if(e.radius<0)return null;$n.subVectors(e.center,this.origin);const n=$n.dot(this.direction),i=$n.dot($n)-n*n,r=e.radius*e.radius;if(i>r)return null;const a=Math.sqrt(r-i),o=n-a,l=n+a;return l<0?null:o<0?this.at(l,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,i,r,a,o,l;const c=1/this.direction.x,d=1/this.direction.y,h=1/this.direction.z,u=this.origin;return c>=0?(n=(e.min.x-u.x)*c,i=(e.max.x-u.x)*c):(n=(e.max.x-u.x)*c,i=(e.min.x-u.x)*c),d>=0?(r=(e.min.y-u.y)*d,a=(e.max.y-u.y)*d):(r=(e.max.y-u.y)*d,a=(e.min.y-u.y)*d),n>a||r>i||((r>n||isNaN(n))&&(n=r),(a<i||isNaN(i))&&(i=a),h>=0?(o=(e.min.z-u.z)*h,l=(e.max.z-u.z)*h):(o=(e.max.z-u.z)*h,l=(e.min.z-u.z)*h),n>l||o>i)||((o>n||n!==n)&&(n=o),(l<i||i!==i)&&(i=l),i<0)?null:this.at(n>=0?n:i,t)}intersectsBox(e){return this.intersectBox(e,$n)!==null}intersectTriangle(e,t,n,i,r){const a=this.origin,o=this.direction,l=o.x,c=o.y,d=o.z,h=e.x-a.x,u=e.y-a.y,f=e.z-a.z,g=t.x-a.x,y=t.y-a.y,p=t.z-a.z,m=n.x-a.x,S=n.y-a.y,T=n.z-a.z,_=Math.abs(l),b=Math.abs(c),E=Math.abs(d);let w,v,A,C,L,B,V,O,G,J,X,ne;if(_>=b&&_>=E?(A=l,B=h,G=g,ne=m,l>=0?(w=c,v=d,C=u,L=f,V=y,O=p,J=S,X=T):(w=d,v=c,C=f,L=u,V=p,O=y,J=T,X=S)):b>=E?(A=c,B=u,G=y,ne=S,c>=0?(w=d,v=l,C=f,L=h,V=p,O=g,J=T,X=m):(w=l,v=d,C=h,L=f,V=g,O=p,J=m,X=T)):(A=d,B=f,G=p,ne=T,d>=0?(w=l,v=c,C=h,L=u,V=g,O=y,J=m,X=S):(w=c,v=l,C=u,L=h,V=y,O=g,J=S,X=m)),A===0)return null;const q=w/A,Q=v/A,ee=1/A,Pe=C-q*B,Ee=L-Q*B,et=V-q*G,We=O-Q*G,Ze=J-q*ne,I=X-Q*ne,k=Ze*We-I*et,ie=Pe*I-Ee*Ze,ve=et*Ee-We*Pe;if(i){if(k<0||ie<0||ve<0)return null}else if((k<0||ie<0||ve<0)&&(k>0||ie>0||ve>0))return null;const fe=k+ie+ve;if(fe===0)return null;const Ue=ee*(k*B+ie*G+ve*ne);return(fe>0?Ue<0:Ue>0)?null:this.at(Ue/fe,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class In extends Nn{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Ie(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Ei,this.combine=rh,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const Oc=new Be,Ci=new xs,xr=new Hn,Fc=new P,yr=new P,Mr=new P,br=new P,Xa=new P,Sr=new P,Bc=new P,Er=new P;class yt extends mt{constructor(e=new Ct,t=new In){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=i.length;r<a;r++){const o=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(e,t){const n=this.geometry,i=n.attributes.position,r=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(i,e);const o=this.morphTargetInfluences;if(r&&o){Sr.set(0,0,0);for(let l=0,c=r.length;l<c;l++){const d=o[l],h=r[l];d!==0&&(Xa.fromBufferAttribute(h,e),a?Sr.addScaledVector(Xa,d):Sr.addScaledVector(Xa.sub(t),d))}t.add(Sr)}return t}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){const n=this.geometry,i=this.material,r=this.matrixWorld;i!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),xr.copy(n.boundingSphere),xr.applyMatrix4(r),Ci.copy(e.ray).recast(e.near),!(xr.containsPoint(Ci.origin)===!1&&(Ci.intersectSphere(xr,Fc)===null||Ci.origin.distanceToSquared(Fc)>(e.far-e.near)**2))&&(Oc.copy(r).invert(),Ci.copy(e.ray).applyMatrix4(Oc),!(n.boundingBox!==null&&Ci.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,Ci)))}_computeIntersections(e,t,n){let i;const r=this.geometry,a=this.material,o=r.index,l=r.attributes.position,c=r.attributes.uv,d=r.attributes.uv1,h=r.attributes.normal,u=r.groups,f=r.drawRange;if(o!==null)if(Array.isArray(a))for(let g=0,y=u.length;g<y;g++){const p=u[g],m=a[p.materialIndex],S=Math.max(p.start,f.start),T=Math.min(o.count,Math.min(p.start+p.count,f.start+f.count));for(let _=S,b=T;_<b;_+=3){const E=o.getX(_),w=o.getX(_+1),v=o.getX(_+2);i=Tr(this,m,e,n,c,d,h,E,w,v),i&&(i.faceIndex=Math.floor(_/3),i.face.materialIndex=p.materialIndex,t.push(i))}}else{const g=Math.max(0,f.start),y=Math.min(o.count,f.start+f.count);for(let p=g,m=y;p<m;p+=3){const S=o.getX(p),T=o.getX(p+1),_=o.getX(p+2);i=Tr(this,a,e,n,c,d,h,S,T,_),i&&(i.faceIndex=Math.floor(p/3),t.push(i))}}else if(l!==void 0)if(Array.isArray(a))for(let g=0,y=u.length;g<y;g++){const p=u[g],m=a[p.materialIndex],S=Math.max(p.start,f.start),T=Math.min(l.count,Math.min(p.start+p.count,f.start+f.count));for(let _=S,b=T;_<b;_+=3){const E=_,w=_+1,v=_+2;i=Tr(this,m,e,n,c,d,h,E,w,v),i&&(i.faceIndex=Math.floor(_/3),i.face.materialIndex=p.materialIndex,t.push(i))}}else{const g=Math.max(0,f.start),y=Math.min(l.count,f.start+f.count);for(let p=g,m=y;p<m;p+=3){const S=p,T=p+1,_=p+2;i=Tr(this,a,e,n,c,d,h,S,T,_),i&&(i.faceIndex=Math.floor(p/3),t.push(i))}}}}function qf(s,e,t,n,i,r,a,o){let l;if(e.side===Yt?l=n.intersectTriangle(a,r,i,!0,o):l=n.intersectTriangle(i,r,a,e.side===ni,o),l===null)return null;Er.copy(o),Er.applyMatrix4(s.matrixWorld);const c=t.ray.origin.distanceTo(Er);return c<t.near||c>t.far?null:{distance:c,point:Er.clone(),object:s}}function Tr(s,e,t,n,i,r,a,o,l,c){s.getVertexPosition(o,yr),s.getVertexPosition(l,Mr),s.getVertexPosition(c,br);const d=qf(s,e,t,n,yr,Mr,br,Bc);if(d){const h=new P;mn.getBarycoord(Bc,yr,Mr,br,h),i&&(d.uv=mn.getInterpolatedAttribute(i,o,l,c,h,new _e)),r&&(d.uv1=mn.getInterpolatedAttribute(r,o,l,c,h,new _e)),a&&(d.normal=mn.getInterpolatedAttribute(a,o,l,c,h,new P),d.normal.dot(n.direction)>0&&d.normal.multiplyScalar(-1));const u={a:o,b:l,c,normal:new P,materialIndex:0};mn.getNormal(yr,Mr,br,u.normal),d.face=u,d.barycoord=h}return d}const Cs=new lt,kc=new lt,zc=new lt,Kf=new lt,Hc=new Be,wr=new P,$a=new Hn,Gc=new Be,qa=new xs;class Yf extends yt{constructor(e,t){super(e,t),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=_c,this.bindMatrix=new Be,this.bindMatrixInverse=new Be,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){const e=this.geometry;this.boundingBox===null&&(this.boundingBox=new ri),this.boundingBox.makeEmpty();const t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,wr),this.boundingBox.expandByPoint(wr)}computeBoundingSphere(){const e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new Hn),this.boundingSphere.makeEmpty();const t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,wr),this.boundingSphere.expandByPoint(wr)}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}raycast(e,t){const n=this.material,i=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),$a.copy(this.boundingSphere),$a.applyMatrix4(i),e.ray.intersectsSphere($a)!==!1&&(Gc.copy(i).invert(),qa.copy(e.ray).applyMatrix4(Gc),!(this.boundingBox!==null&&qa.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(e,t,qa)))}getVertexPosition(e,t){return super.getVertexPosition(e,t),this.applyBoneTransform(e,t),t}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){const e=new lt,t=this.geometry.attributes.skinWeight;for(let n=0,i=t.count;n<i;n++){e.fromBufferAttribute(t,n);const r=1/e.manhattanLength();r!==1/0?e.multiplyScalar(r):e.set(1,0,0,0),t.setXYZW(n,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode===_c?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===$u?this.bindMatrixInverse.copy(this.bindMatrix).invert():Ae("SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(e,t){const n=this.skeleton,i=this.geometry;kc.fromBufferAttribute(i.attributes.skinIndex,e),zc.fromBufferAttribute(i.attributes.skinWeight,e),t.isVector4?(Cs.copy(t),t.set(0,0,0,0)):(Cs.set(...t,1),t.set(0,0,0)),Cs.applyMatrix4(this.bindMatrix);for(let r=0;r<4;r++){const a=zc.getComponent(r);if(a!==0){const o=kc.getComponent(r);Hc.multiplyMatrices(n.bones[o].matrixWorld,n.boneInverses[o]),t.addScaledVector(Kf.copy(Cs).applyMatrix4(Hc),a)}}return t.isVector4&&(t.w=Cs.w),t.applyMatrix4(this.bindMatrixInverse)}}class Rh extends mt{constructor(){super(),this.isBone=!0,this.type="Bone"}}class Fl extends Ut{constructor(e=null,t=1,n=1,i,r,a,o,l,c=At,d=At,h,u){super(null,a,o,l,c,d,i,r,h,u),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const Vc=new Be,Zf=new Be;class Bl{constructor(e=[],t=[]){this.uuid=_n(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){const e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(e.length*16),t.length===0)this.calculateInverses();else if(e.length!==t.length){Ae("Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,i=this.bones.length;n<i;n++)this.boneInverses.push(new Be)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){const n=new Be;this.bones[e]&&n.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){const n=this.bones[e];n&&n.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){const n=this.bones[e];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){const e=this.bones,t=this.boneInverses,n=this.boneMatrices,i=this.boneTexture;for(let r=0,a=e.length;r<a;r++){const o=e[r]?e[r].matrixWorld:Zf;Vc.multiplyMatrices(o,t[r]),Vc.toArray(n,r*16)}i!==null&&(i.needsUpdate=!0)}clone(){return new Bl(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(this.bones.length*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);const t=new Float32Array(e*e*4);t.set(this.boneMatrices);const n=new Fl(t,e,e,on,an);return n.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=n,this}getBoneByName(e){for(let t=0,n=this.bones.length;t<n;t++){const i=this.bones[t];if(i.name===e)return i}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let n=0,i=e.bones.length;n<i;n++){const r=e.bones[n];let a=t[r];a===void 0&&(Ae("Skeleton: No bone found with UUID:",r),a=new Rh),this.bones.push(a),this.boneInverses.push(new Be().fromArray(e.boneInverses[n]))}return this.init(),this}toJSON(){const e={metadata:{version:4.7,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};e.uuid=this.uuid;const t=this.bones,n=this.boneInverses;for(let i=0,r=t.length;i<r;i++){const a=t[i];e.bones.push(a.uuid);const o=n[i];e.boneInverses.push(o.toArray())}return e}}class ta extends Zt{constructor(e,t,n,i=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=i}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const Zi=new Be,Wc=new Be,Ar=[],Xc=new ri,Jf=new Be,Ps=new yt,Ls=new Hn;class jf extends yt{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new ta(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let i=0;i<n;i++)this.setMatrixAt(i,Jf)}computeBoundingBox(){const e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new ri),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Zi),Xc.copy(e.boundingBox).applyMatrix4(Zi),this.boundingBox.union(Xc)}computeBoundingSphere(){const e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new Hn),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Zi),Ls.copy(e.boundingSphere).applyMatrix4(Zi),this.boundingSphere.union(Ls)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){return this.instanceColor===null?t.setRGB(1,1,1):t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){return t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){const n=t.morphTargetInfluences,i=this.morphTexture.source.data.data,r=n.length+1,a=e*r+1;for(let o=0;o<n.length;o++)n[o]=i[a+o]}raycast(e,t){const n=this.matrixWorld,i=this.count;if(Ps.geometry=this.geometry,Ps.material=this.material,Ps.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Ls.copy(this.boundingSphere),Ls.applyMatrix4(n),e.ray.intersectsSphere(Ls)!==!1))for(let r=0;r<i;r++){this.getMatrixAt(r,Zi),Wc.multiplyMatrices(n,Zi),Ps.matrixWorld=Wc,Ps.raycast(e,Ar);for(let a=0,o=Ar.length;a<o;a++){const l=Ar[a];l.instanceId=r,l.object=this,t.push(l)}Ar.length=0}}setColorAt(e,t){return this.instanceColor===null&&(this.instanceColor=new ta(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3),this}setMatrixAt(e,t){return t.toArray(this.instanceMatrix.array,e*16),this}setMorphAt(e,t){const n=t.morphTargetInfluences,i=n.length+1;this.morphTexture===null&&(this.morphTexture=new Fl(new Float32Array(i*this.count),i,this.count,Al,an));const r=this.morphTexture.source.data.data;let a=0;for(let c=0;c<n.length;c++)a+=n[c];const o=this.geometry.morphTargetsRelative?1:1-a,l=i*e;return r[l]=o,r.set(n,l+1),this}updateMorphTargets(){}dispose(){super.dispose(),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}}const Pi=new Hn,Qf=new _e(.5,.5),Rr=new P;class kl{constructor(e=new Yn,t=new Yn,n=new Yn,i=new Yn,r=new Yn,a=new Yn){this.planes=[e,t,n,i,r,a]}set(e,t,n,i,r,a){const o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(i),o[4].copy(r),o[5].copy(a),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=Ln,n=!1){const i=this.planes,r=e.elements,a=r[0],o=r[1],l=r[2],c=r[3],d=r[4],h=r[5],u=r[6],f=r[7],g=r[8],y=r[9],p=r[10],m=r[11],S=r[12],T=r[13],_=r[14],b=r[15];if(i[0].setComponents(c-a,f-d,m-g,b-S).normalize(),i[1].setComponents(c+a,f+d,m+g,b+S).normalize(),i[2].setComponents(c+o,f+h,m+y,b+T).normalize(),i[3].setComponents(c-o,f-h,m-y,b-T).normalize(),n)i[4].setComponents(l,u,p,_).normalize(),i[5].setComponents(c-l,f-u,m-p,b-_).normalize();else if(i[4].setComponents(c-l,f-u,m-p,b-_).normalize(),t===Ln)i[5].setComponents(c+l,f+u,m+p,b+_).normalize();else if(t===Js)i[5].setComponents(l,u,p,_).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Pi.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Pi.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Pi)}intersectsSprite(e){Pi.center.set(0,0,0);const t=Qf.distanceTo(e.center);return Pi.radius=.7071067811865476+t,Pi.applyMatrix4(e.matrixWorld),this.intersectsSphere(Pi)}intersectsSphere(e){const t=this.planes,n=e.center,i=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(n)<i)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const i=t[n];if(Rr.x=i.normal.x>0?e.max.x:e.min.x,Rr.y=i.normal.y>0?e.max.y:e.min.y,Rr.z=i.normal.z>0?e.max.z:e.min.z,i.distanceToPoint(Rr)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class zl extends Nn{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Ie(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const na=new P,ia=new P,$c=new Be,Is=new xs,Cr=new Hn,Ka=new P,qc=new P;class Qs extends mt{constructor(e=new Ct,t=new zl){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[0];for(let i=1,r=t.count;i<r;i++)na.fromBufferAttribute(t,i-1),ia.fromBufferAttribute(t,i),n[i]=n[i-1],n[i]+=na.distanceTo(ia);e.setAttribute("lineDistance",new _t(n,1))}else Ae("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){const n=this.geometry,i=this.matrixWorld,r=e.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Cr.copy(n.boundingSphere),Cr.applyMatrix4(i),Cr.radius+=r,e.ray.intersectsSphere(Cr)===!1)return;$c.copy(i).invert(),Is.copy(e.ray).applyMatrix4($c);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=this.isLineSegments?2:1,d=n.index,u=n.attributes.position;if(d!==null){const f=Math.max(0,a.start),g=Math.min(d.count,a.start+a.count);for(let y=f,p=g-1;y<p;y+=c){const m=d.getX(y),S=d.getX(y+1),T=Pr(this,e,Is,l,m,S,y);T&&t.push(T)}if(this.isLineLoop){const y=d.getX(g-1),p=d.getX(f),m=Pr(this,e,Is,l,y,p,g-1);m&&t.push(m)}}else{const f=Math.max(0,a.start),g=Math.min(u.count,a.start+a.count);for(let y=f,p=g-1;y<p;y+=c){const m=Pr(this,e,Is,l,y,y+1,y);m&&t.push(m)}if(this.isLineLoop){const y=Pr(this,e,Is,l,g-1,f,g-1);y&&t.push(y)}}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=i.length;r<a;r++){const o=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}function Pr(s,e,t,n,i,r,a){const o=s.geometry.attributes.position;if(na.fromBufferAttribute(o,i),ia.fromBufferAttribute(o,r),t.distanceSqToSegment(na,ia,Ka,qc)>n)return;Ka.applyMatrix4(s.matrixWorld);const c=e.ray.origin.distanceTo(Ka);if(!(c<e.near||c>e.far))return{distance:c,point:qc.clone().applyMatrix4(s.matrixWorld),index:a,face:null,faceIndex:null,barycoord:null,object:s}}const Kc=new P,Yc=new P;class ep extends Qs{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[];for(let i=0,r=t.count;i<r;i+=2)Kc.fromBufferAttribute(t,i),Yc.fromBufferAttribute(t,i+1),n[i]=i===0?0:n[i-1],n[i+1]=n[i]+Kc.distanceTo(Yc);e.setAttribute("lineDistance",new _t(n,1))}else Ae("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class tp extends Qs{constructor(e,t){super(e,t),this.isLineLoop=!0,this.type="LineLoop"}}class Ch extends Nn{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Ie(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const Zc=new Be,al=new xs,Lr=new Hn,Ir=new P;class np extends mt{constructor(e=new Ct,t=new Ch){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){const n=this.geometry,i=this.matrixWorld,r=e.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Lr.copy(n.boundingSphere),Lr.applyMatrix4(i),Lr.radius+=r,e.ray.intersectsSphere(Lr)===!1)return;Zc.copy(i).invert(),al.copy(e.ray).applyMatrix4(Zc);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=n.index,h=n.attributes.position;if(c!==null){const u=Math.max(0,a.start),f=Math.min(c.count,a.start+a.count);for(let g=u,y=f;g<y;g++){const p=c.getX(g);Ir.fromBufferAttribute(h,p),Jc(Ir,p,l,i,e,t,this)}}else{const u=Math.max(0,a.start),f=Math.min(h.count,a.start+a.count);for(let g=u,y=f;g<y;g++)Ir.fromBufferAttribute(h,g),Jc(Ir,g,l,i,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=i.length;r<a;r++){const o=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}function Jc(s,e,t,n,i,r,a){const o=al.distanceSqToPoint(s);if(o<t){const l=new P;al.closestPointToPoint(s,l),l.applyMatrix4(n);const c=i.ray.origin.distanceTo(l);if(c<i.near||c>i.far)return;r.push({distance:c,distanceToRay:Math.sqrt(o),point:l,index:e,face:null,faceIndex:null,barycoord:null,object:a})}}class Ph extends Ut{constructor(e=[],t=Ui,n,i,r,a,o,l,c,d){super(e,t,n,i,r,a,o,l,c,d),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class er extends Ut{constructor(e,t,n=Fn,i,r,a,o=At,l=At,c,d=ii,h=1){if(d!==ii&&d!==Di)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const u={width:e,height:t,depth:h};super(u,i,r,a,o,l,d,n,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Nl(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return t.compareFunction=this.compareFunction,t}}class ip extends er{constructor(e,t=Fn,n=Ui,i,r,a=At,o=At,l,c=ii){const d={width:e,height:e,depth:1},h=[d,d,d,d,d,d];super(e,e,t,n,i,r,a,o,l,c),this.image=h,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}}class Lh extends Ut{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class ar extends Ct{constructor(e=1,t=1,n=1,i=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:i,heightSegments:r,depthSegments:a};const o=this;i=Math.floor(i),r=Math.floor(r),a=Math.floor(a);const l=[],c=[],d=[],h=[];let u=0,f=0;g("z","y","x",-1,-1,n,t,e,a,r,0),g("z","y","x",1,-1,n,t,-e,a,r,1),g("x","z","y",1,1,e,n,t,i,a,2),g("x","z","y",1,-1,e,n,-t,i,a,3),g("x","y","z",1,-1,e,t,n,i,r,4),g("x","y","z",-1,-1,e,t,-n,i,r,5),this.setIndex(l),this.setAttribute("position",new _t(c,3)),this.setAttribute("normal",new _t(d,3)),this.setAttribute("uv",new _t(h,2));function g(y,p,m,S,T,_,b,E,w,v,A){const C=_/w,L=b/v,B=_/2,V=b/2,O=E/2,G=w+1,J=v+1;let X=0,ne=0;const q=new P;for(let Q=0;Q<J;Q++){const ee=Q*L-V;for(let Pe=0;Pe<G;Pe++){const Ee=Pe*C-B;q[y]=Ee*S,q[p]=ee*T,q[m]=O,c.push(q.x,q.y,q.z),q[y]=0,q[p]=0,q[m]=E>0?1:-1,d.push(q.x,q.y,q.z),h.push(Pe/w),h.push(1-Q/v),X+=1}}for(let Q=0;Q<v;Q++)for(let ee=0;ee<w;ee++){const Pe=u+ee+G*Q,Ee=u+ee+G*(Q+1),et=u+(ee+1)+G*(Q+1),We=u+(ee+1)+G*Q;l.push(Pe,Ee,We),l.push(Ee,et,We),ne+=6}o.addGroup(f,ne,A),f+=ne,u+=X}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ar(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}class Hl extends Ct{constructor(e=1,t=32,n=0,i=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:n,thetaLength:i},t=Math.max(3,t);const r=[],a=[],o=[],l=[],c=new P,d=new _e;a.push(0,0,0),o.push(0,0,1),l.push(.5,.5);for(let h=0,u=3;h<=t;h++,u+=3){const f=n+h/t*i;c.x=e*Math.cos(f),c.y=e*Math.sin(f),a.push(c.x,c.y,c.z),o.push(0,0,1),d.x=(a[u]/e+1)/2,d.y=(a[u+1]/e+1)/2,l.push(d.x,d.y)}for(let h=1;h<=t;h++)r.push(h,h+1,0);this.setIndex(r),this.setAttribute("position",new _t(a,3)),this.setAttribute("normal",new _t(o,3)),this.setAttribute("uv",new _t(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Hl(e.radius,e.segments,e.thetaStart,e.thetaLength)}}class ai{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){Ae("Curve: .getPoint() not implemented.")}getPointAt(e,t){const n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){const t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){const t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){const e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const t=[];let n,i=this.getPoint(0),r=0;t.push(0);for(let a=1;a<=e;a++)n=this.getPoint(a/e),r+=n.distanceTo(i),t.push(r),i=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t=null){const n=this.getLengths();let i=0;const r=n.length;let a;t?a=t:a=e*n[r-1];let o=0,l=r-1,c;for(;o<=l;)if(i=Math.floor(o+(l-o)/2),c=n[i]-a,c<0)o=i+1;else if(c>0)l=i-1;else{l=i;break}if(i=l,n[i]===a)return i/(r-1);const d=n[i],u=n[i+1]-d,f=(a-d)/u;return(i+f)/(r-1)}getTangent(e,t){let i=e-1e-4,r=e+1e-4;i<0&&(i=0),r>1&&(r=1);const a=this.getPoint(i),o=this.getPoint(r),l=t||(a.isVector2?new _e:new P);return l.copy(o).sub(a).normalize(),l}getTangentAt(e,t){const n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t=!1){const n=new P,i=[],r=[],a=[],o=new P,l=new Be;for(let f=0;f<=e;f++){const g=f/e;i[f]=this.getTangentAt(g,new P)}r[0]=new P,a[0]=new P;let c=Number.MAX_VALUE;const d=Math.abs(i[0].x),h=Math.abs(i[0].y),u=Math.abs(i[0].z);d<=c&&(c=d,n.set(1,0,0)),h<=c&&(c=h,n.set(0,1,0)),u<=c&&n.set(0,0,1),o.crossVectors(i[0],n).normalize(),r[0].crossVectors(i[0],o),a[0].crossVectors(i[0],r[0]);for(let f=1;f<=e;f++){if(r[f]=r[f-1].clone(),a[f]=a[f-1].clone(),o.crossVectors(i[f-1],i[f]),o.length()>Number.EPSILON){o.normalize();const g=Math.acos(ze(i[f-1].dot(i[f]),-1,1));r[f].applyMatrix4(l.makeRotationAxis(o,g))}a[f].crossVectors(i[f],r[f])}if(t===!0){let f=Math.acos(ze(r[0].dot(r[e]),-1,1));f/=e,i[0].dot(o.crossVectors(r[0],r[e]))>0&&(f=-f);for(let g=1;g<=e;g++)r[g].applyMatrix4(l.makeRotationAxis(i[g],f*g)),a[g].crossVectors(i[g],r[g])}return{tangents:i,normals:r,binormals:a}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){const e={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}}class Ih extends ai{constructor(e=0,t=0,n=1,i=1,r=0,a=Math.PI*2,o=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=i,this.aStartAngle=r,this.aEndAngle=a,this.aClockwise=o,this.aRotation=l}getPoint(e,t=new _e){const n=t,i=Math.PI*2;let r=this.aEndAngle-this.aStartAngle;const a=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=i;for(;r>i;)r-=i;r<Number.EPSILON&&(a?r=0:r=i),this.aClockwise===!0&&!a&&(r===i?r=-i:r=r-i);const o=this.aStartAngle+e*r;let l=this.aX+this.xRadius*Math.cos(o),c=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){const d=Math.cos(this.aRotation),h=Math.sin(this.aRotation),u=l-this.aX,f=c-this.aY;l=u*d-f*h+this.aX,c=u*h+f*d+this.aY}return n.set(l,c)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){const e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}}class sp extends Ih{constructor(e,t,n,i,r,a){super(e,t,n,n,i,r,a),this.isArcCurve=!0,this.type="ArcCurve"}}function Gl(){let s=0,e=0,t=0,n=0;function i(r,a,o,l){s=r,e=o,t=-3*r+3*a-2*o-l,n=2*r-2*a+o+l}return{initCatmullRom:function(r,a,o,l,c){i(a,o,c*(o-r),c*(l-a))},initNonuniformCatmullRom:function(r,a,o,l,c,d,h){let u=(a-r)/c-(o-r)/(c+d)+(o-a)/d,f=(o-a)/d-(l-a)/(d+h)+(l-o)/h;u*=d,f*=d,i(a,o,u,f)},calc:function(r){const a=r*r,o=a*r;return s+e*r+t*a+n*o}}}const jc=new P,Qc=new P,Ya=new Gl,Za=new Gl,Ja=new Gl;class ol extends ai{constructor(e=[],t=!1,n="centripetal",i=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=n,this.tension=i}getPoint(e,t=new P){const n=t,i=this.points,r=i.length,a=(r-(this.closed?0:1))*e;let o=Math.floor(a),l=a-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/r)+1)*r:l===0&&o===r-1&&(o=r-2,l=1);let c,d;this.closed||o>0?c=i[(o-1)%r]:(Qc.subVectors(i[0],i[1]).add(i[0]),c=Qc);const h=i[o%r],u=i[(o+1)%r];if(this.closed||o+2<r?d=i[(o+2)%r]:(jc.subVectors(i[r-1],i[r-2]).add(i[r-1]),d=jc),this.curveType==="centripetal"||this.curveType==="chordal"){const f=this.curveType==="chordal"?.5:.25;let g=Math.pow(c.distanceToSquared(h),f),y=Math.pow(h.distanceToSquared(u),f),p=Math.pow(u.distanceToSquared(d),f);y<1e-4&&(y=1),g<1e-4&&(g=y),p<1e-4&&(p=y),Ya.initNonuniformCatmullRom(c.x,h.x,u.x,d.x,g,y,p),Za.initNonuniformCatmullRom(c.y,h.y,u.y,d.y,g,y,p),Ja.initNonuniformCatmullRom(c.z,h.z,u.z,d.z,g,y,p)}else this.curveType==="catmullrom"&&(Ya.initCatmullRom(c.x,h.x,u.x,d.x,this.tension),Za.initCatmullRom(c.y,h.y,u.y,d.y,this.tension),Ja.initCatmullRom(c.z,h.z,u.z,d.z,this.tension));return n.set(Ya.calc(l),Za.calc(l),Ja.calc(l)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const i=e.points[t];this.points.push(i.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){const i=this.points[t];e.points.push(i.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const i=e.points[t];this.points.push(new P().fromArray(i))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}}function ed(s,e,t,n,i){const r=(n-e)*.5,a=(i-t)*.5,o=s*s,l=s*o;return(2*t-2*n+r+a)*l+(-3*t+3*n-2*r-a)*o+r*s+t}function rp(s,e){const t=1-s;return t*t*e}function ap(s,e){return 2*(1-s)*s*e}function op(s,e){return s*s*e}function Vs(s,e,t,n){return rp(s,e)+ap(s,t)+op(s,n)}function lp(s,e){const t=1-s;return t*t*t*e}function cp(s,e){const t=1-s;return 3*t*t*s*e}function dp(s,e){return 3*(1-s)*s*s*e}function hp(s,e){return s*s*s*e}function Ws(s,e,t,n,i){return lp(s,e)+cp(s,t)+dp(s,n)+hp(s,i)}class up extends ai{constructor(e=new _e,t=new _e,n=new _e,i=new _e){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=n,this.v3=i}getPoint(e,t=new _e){const n=t,i=this.v0,r=this.v1,a=this.v2,o=this.v3;return n.set(Ws(e,i.x,r.x,a.x,o.x),Ws(e,i.y,r.y,a.y,o.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class fp extends ai{constructor(e=new P,t=new P,n=new P,i=new P){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=n,this.v3=i}getPoint(e,t=new P){const n=t,i=this.v0,r=this.v1,a=this.v2,o=this.v3;return n.set(Ws(e,i.x,r.x,a.x,o.x),Ws(e,i.y,r.y,a.y,o.y),Ws(e,i.z,r.z,a.z,o.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class pp extends ai{constructor(e=new _e,t=new _e){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new _e){const n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new _e){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class mp extends ai{constructor(e=new P,t=new P){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new P){const n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new P){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class gp extends ai{constructor(e=new _e,t=new _e,n=new _e){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new _e){const n=t,i=this.v0,r=this.v1,a=this.v2;return n.set(Vs(e,i.x,r.x,a.x),Vs(e,i.y,r.y,a.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Dh extends ai{constructor(e=new P,t=new P,n=new P){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new P){const n=t,i=this.v0,r=this.v1,a=this.v2;return n.set(Vs(e,i.x,r.x,a.x),Vs(e,i.y,r.y,a.y),Vs(e,i.z,r.z,a.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class _p extends ai{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new _e){const n=t,i=this.points,r=(i.length-1)*e,a=Math.floor(r),o=r-a,l=i[a===0?a:a-1],c=i[a],d=i[a>i.length-2?i.length-1:a+1],h=i[a>i.length-3?i.length-1:a+2];return n.set(ed(o,l.x,c.x,d.x,h.x),ed(o,l.y,c.y,d.y,h.y)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const i=e.points[t];this.points.push(i.clone())}return this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){const i=this.points[t];e.points.push(i.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const i=e.points[t];this.points.push(new _e().fromArray(i))}return this}}var vp=Object.freeze({__proto__:null,ArcCurve:sp,CatmullRomCurve3:ol,CubicBezierCurve:up,CubicBezierCurve3:fp,EllipseCurve:Ih,LineCurve:pp,LineCurve3:mp,QuadraticBezierCurve:gp,QuadraticBezierCurve3:Dh,SplineCurve:_p});class ha extends Ct{constructor(e=1,t=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:i};const r=e/2,a=t/2,o=Math.floor(n),l=Math.floor(i),c=o+1,d=l+1,h=e/o,u=t/l,f=[],g=[],y=[],p=[];for(let m=0;m<d;m++){const S=m*u-a;for(let T=0;T<c;T++){const _=T*h-r;g.push(_,-S,0),y.push(0,0,1),p.push(T/o),p.push(1-m/l)}}for(let m=0;m<l;m++)for(let S=0;S<o;S++){const T=S+c*m,_=S+c*(m+1),b=S+1+c*(m+1),E=S+1+c*m;f.push(T,_,E),f.push(_,b,E)}this.setIndex(f),this.setAttribute("position",new _t(g,3)),this.setAttribute("normal",new _t(y,3)),this.setAttribute("uv",new _t(p,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ha(e.width,e.height,e.widthSegments,e.heightSegments)}}class sa extends Ct{constructor(e=.5,t=1,n=32,i=1,r=0,a=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:n,phiSegments:i,thetaStart:r,thetaLength:a},n=Math.max(3,n),i=Math.max(1,i);const o=[],l=[],c=[],d=[];let h=e;const u=(t-e)/i,f=new P,g=new _e;for(let y=0;y<=i;y++){for(let p=0;p<=n;p++){const m=r+p/n*a;f.x=h*Math.cos(m),f.y=h*Math.sin(m),l.push(f.x,f.y,f.z),c.push(0,0,1),g.x=(f.x/t+1)/2,g.y=(f.y/t+1)/2,d.push(g.x,g.y)}h+=u}for(let y=0;y<i;y++){const p=y*(n+1);for(let m=0;m<n;m++){const S=m+p,T=S,_=S+n+1,b=S+n+2,E=S+1;o.push(T,_,E),o.push(_,b,E)}}this.setIndex(o),this.setAttribute("position",new _t(l,3)),this.setAttribute("normal",new _t(c,3)),this.setAttribute("uv",new _t(d,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new sa(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}}class Vl extends Ct{constructor(e=1,t=32,n=16,i=0,r=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:i,phiLength:r,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));const l=Math.min(a+o,Math.PI);let c=0;const d=[],h=new P,u=new P,f=[],g=[],y=[],p=[];for(let m=0;m<=n;m++){const S=[],T=m/n,_=a+T*o,b=e*Math.cos(_),E=Math.sqrt(e*e-b*b);let w=0;m===0&&a===0?w=.5/t:m===n&&l===Math.PI&&(w=-.5/t);for(let v=0;v<=t;v++){const A=v/t,C=i+A*r;h.x=-E*Math.cos(C),h.y=b,h.z=E*Math.sin(C),g.push(h.x,h.y,h.z),u.copy(h).normalize(),y.push(u.x,u.y,u.z),p.push(A+w,1-T),S.push(c++)}d.push(S)}for(let m=0;m<n;m++)for(let S=0;S<t;S++){const T=d[m][S+1],_=d[m][S],b=d[m+1][S],E=d[m+1][S+1];(m!==0||a>0)&&f.push(T,_,E),(m!==n-1||l<Math.PI)&&f.push(_,b,E)}this.setIndex(f),this.setAttribute("position",new _t(g,3)),this.setAttribute("normal",new _t(y,3)),this.setAttribute("uv",new _t(p,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Vl(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class ra extends Ct{constructor(e=new Dh(new P(-1,-1,0),new P(-1,1,0),new P(1,1,0)),t=64,n=1,i=8,r=!1){super(),this.type="TubeGeometry",this.parameters={path:e,tubularSegments:t,radius:n,radialSegments:i,closed:r};const a=e.computeFrenetFrames(t,r);this.tangents=a.tangents,this.normals=a.normals,this.binormals=a.binormals;const o=new P,l=new P,c=new _e;let d=new P;const h=[],u=[],f=[],g=[];y(),this.setIndex(g),this.setAttribute("position",new _t(h,3)),this.setAttribute("normal",new _t(u,3)),this.setAttribute("uv",new _t(f,2));function y(){for(let T=0;T<t;T++)p(T);p(r===!1?t:0),S(),m()}function p(T){d=e.getPointAt(T/t,d);const _=a.normals[T],b=a.binormals[T];for(let E=0;E<=i;E++){const w=E/i*Math.PI*2,v=Math.sin(w),A=-Math.cos(w);l.x=A*_.x+v*b.x,l.y=A*_.y+v*b.y,l.z=A*_.z+v*b.z,l.normalize(),u.push(l.x,l.y,l.z),o.x=d.x+n*l.x,o.y=d.y+n*l.y,o.z=d.z+n*l.z,h.push(o.x,o.y,o.z)}}function m(){for(let T=1;T<=t;T++)for(let _=1;_<=i;_++){const b=(i+1)*(T-1)+(_-1),E=(i+1)*T+(_-1),w=(i+1)*T+_,v=(i+1)*(T-1)+_;g.push(b,E,v),g.push(E,w,v)}}function S(){for(let T=0;T<=t;T++)for(let _=0;_<=i;_++)c.x=T/t,c.y=_/i,f.push(c.x,c.y)}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){const e=super.toJSON();return e.path=this.parameters.path.toJSON(),e}static fromJSON(e){return new ra(new vp[e.path.type]().fromJSON(e.path),e.tubularSegments,e.radius,e.radialSegments,e.closed)}}function _s(s){const e={};for(const t in s){e[t]={};for(const n in s[t]){const i=s[t][n];if(td(i))i.isRenderTargetTexture?(Ae("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=i.clone();else if(Array.isArray(i))if(td(i[0])){const r=[];for(let a=0,o=i.length;a<o;a++)r[a]=i[a].clone();e[t][n]=r}else e[t][n]=i.slice();else e[t][n]=i}}return e}function Vt(s){const e={};for(let t=0;t<s.length;t++){const n=_s(s[t]);for(const i in n)e[i]=n[i]}return e}function td(s){return s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)}function xp(s){const e=[];for(let t=0;t<s.length;t++)e.push(s[t].clone());return e}function Nh(s){const e=s.getRenderTarget();return e===null?s.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:qe.workingColorSpace}const yp={clone:_s,merge:Vt};var Mp=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,bp=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class kn extends Nn{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Mp,this.fragmentShader=bp,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=_s(e.uniforms),this.uniformsGroups=xp(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const i in this.uniforms){const a=this.uniforms[i].value;a&&a.isTexture?t.uniforms[i]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[i]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[i]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[i]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[i]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[i]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[i]={type:"m4",value:a.toArray()}:t.uniforms[i]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(const n in e.uniforms){const i=e.uniforms[n];switch(this.uniforms[n]={},i.type){case"t":this.uniforms[n].value=t[i.value]||null;break;case"c":this.uniforms[n].value=new Ie().setHex(i.value);break;case"v2":this.uniforms[n].value=new _e().fromArray(i.value);break;case"v3":this.uniforms[n].value=new P().fromArray(i.value);break;case"v4":this.uniforms[n].value=new lt().fromArray(i.value);break;case"m3":this.uniforms[n].value=new Oe().fromArray(i.value);break;case"m4":this.uniforms[n].value=new Be().fromArray(i.value);break;default:this.uniforms[n].value=i.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(const n in e.extensions)this.extensions[n]=e.extensions[n];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}}class Sp extends kn{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class ds extends Nn{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Ie(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ie(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=rl,this.normalScale=new _e(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Ei,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class Kt extends ds{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new _e(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return ze(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new Ie(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new Ie(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new Ie(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._retroreflectivity=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get retroreflectivity(){return this._retroreflectivity}set retroreflectivity(e){this._retroreflectivity>0!=e>0&&this.version++,this._retroreflectivity=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.retroreflectivity=e.retroreflectivity,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}}class Ep extends Nn{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Yu,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class Tp extends Nn{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}function gi(s,e){return!s||s.constructor===e?s:typeof e.BYTES_PER_ELEMENT=="number"?new e(s):Array.prototype.slice.call(s)}function Xr(s){return s!==void 0&&s.inTangents!==void 0&&s.outTangents!==void 0}function wp(s){function e(i,r){return s[i]-s[r]}const t=s.length,n=new Array(t);for(let i=0;i!==t;++i)n[i]=i;return n.sort(e),n}function nd(s,e,t){const n=s.length,i=new s.constructor(n);for(let r=0,a=0;a!==n;++r){const o=t[r]*e;for(let l=0;l!==e;++l)i[a++]=s[o+l]}return i}function Ap(s,e,t,n){let i=1,r=s[0];for(;r!==void 0&&r[n]===void 0;)r=s[i++];if(r===void 0)return;let a=r[n];if(a!==void 0)if(Array.isArray(a))do a=r[n],a!==void 0&&(e.push(r.time),t.push(...a)),r=s[i++];while(r!==void 0);else if(a.toArray!==void 0)do a=r[n],a!==void 0&&(e.push(r.time),a.toArray(t,t.length)),r=s[i++];while(r!==void 0);else do a=r[n],a!==void 0&&(e.push(r.time),t.push(a)),r=s[i++];while(r!==void 0)}class ys{constructor(e,t,n,i){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=i!==void 0?i:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){const t=this.parameterPositions;let n=this._cachedIndex,i=t[n],r=t[n-1];n:{e:{let a;t:{i:if(!(e<i)){for(let o=n+2;;){if(i===void 0){if(e<r)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===o)break;if(r=i,i=t[++n],e<i)break e}a=t.length;break t}if(!(e>=r)){const o=t[1];e<o&&(n=2,r=o);for(let l=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===l)break;if(i=r,r=t[--n-1],e>=r)break e}a=n,n=0;break t}break n}for(;n<a;){const o=n+a>>>1;e<t[o]?a=o:n=o+1}if(i=t[n],r=t[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,i)}return this.interpolate_(n,r,e,i)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){const t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,r=e*i;for(let a=0;a!==i;++a)t[a]=n[r+a];return t}interpolate_(){throw new Error("THREE.Interpolant: Call to abstract method.")}intervalChanged_(){}}class Rp extends ys{constructor(e,t,n,i){super(e,t,n,i),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:xc,endingEnd:xc}}intervalChanged_(e,t,n){const i=this.parameterPositions;let r=e-2,a=e+1,o=i[r],l=i[a];if(o===void 0)switch(this.getSettings_().endingStart){case yc:r=e,o=2*t-n;break;case Mc:r=i.length-2,o=t+i[r]-i[r+1];break;default:r=e,o=n}if(l===void 0)switch(this.getSettings_().endingEnd){case yc:a=e,l=2*n-t;break;case Mc:a=1,l=n+i[1]-i[0];break;default:a=e-1,l=t}const c=(n-t)*.5,d=this.valueSize;this._weightPrev=c/(t-o),this._weightNext=c/(l-n),this._offsetPrev=r*d,this._offsetNext=a*d}interpolate_(e,t,n,i){const r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,d=this._offsetPrev,h=this._offsetNext,u=this._weightPrev,f=this._weightNext,g=(n-t)/(i-t),y=g*g,p=y*g,m=-u*p+2*u*y-u*g,S=(1+u)*p+(-1.5-2*u)*y+(-.5+u)*g+1,T=(-1-f)*p+(1.5+f)*y+.5*g,_=f*p-f*y;for(let b=0;b!==o;++b)r[b]=m*a[d+b]+S*a[c+b]+T*a[l+b]+_*a[h+b];return r}}class Cp extends ys{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){const r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,d=(n-t)/(i-t),h=1-d;for(let u=0;u!==o;++u)r[u]=a[c+u]*h+a[l+u]*d;return r}}class Pp extends ys{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e){return this.copySampleValue_(e-1)}}class Lp extends ys{interpolate_(e,t,n,i){const r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,d=this.inTangents,h=this.outTangents;if(!d||!h){const g=(n-t)/(i-t),y=1-g;for(let p=0;p!==o;++p)r[p]=a[c+p]*y+a[l+p]*g;return r}const u=o*2,f=e-1;for(let g=0;g!==o;++g){const y=a[c+g],p=a[l+g],m=f*u+g*2,S=h[m],T=h[m+1],_=e*u+g*2,b=d[_],E=d[_+1],w=Dp(n,t,S,b,i);r[g]=Uh(w,y,T,E,p)}return r}}function Uh(s,e,t,n,i){const r=1-s;return r*r*r*e+3*r*r*s*t+3*r*s*s*n+s*s*s*i}function Ip(s,e,t,n,i){const r=1-s;return 3*r*r*(t-e)+6*r*s*(n-t)+3*s*s*(i-n)}function Dp(s,e,t,n,i){let r=(s-e)/(i-e);for(let a=0;a<8;a++){const o=Uh(r,e,t,n,i)-s;if(Math.abs(o)<1e-10)break;const l=Ip(r,e,t,n,i);if(Math.abs(l)<1e-10)break;r=Math.max(0,Math.min(1,r-o/l))}return r}class yn{constructor(e,t,n,i){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=gi(t,this.TimeBufferType),this.values=gi(n,this.ValueBufferType),this.setInterpolation(i||this.DefaultInterpolation)}static toJSON(e){const t=e.constructor;let n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:gi(e.times,Array),values:gi(e.values,Array)};const i=e.getInterpolation();i!==e.DefaultInterpolation&&(n.interpolation=i),Xr(e.settings)&&(n.settings={inTangents:gi(e.settings.inTangents,Array),outTangents:gi(e.settings.outTangents,Array)})}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new Pp(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new Cp(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new Rp(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodBezier(e){const t=new Lp(this.times,this.values,this.getValueSize(),e);return this.settings&&(t.inTangents=this.settings.inTangents,t.outTangents=this.settings.outTangents),t}setInterpolation(e){let t;switch(e){case Ys:t=this.InterpolantFactoryMethodDiscrete;break;case Zs:t=this.InterpolantFactoryMethodLinear;break;case Ea:t=this.InterpolantFactoryMethodSmooth;break;case vc:t=this.InterpolantFactoryMethodBezier;break}if(t===void 0){const n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return Ae("KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Ys;case this.InterpolantFactoryMethodLinear:return Zs;case this.InterpolantFactoryMethodSmooth:return Ea;case this.InterpolantFactoryMethodBezier:return vc}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){const t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]+=e}return this}scale(e){if(e!==1){const t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]*=e;Xr(this.settings)&&(id(this.settings.inTangents,e),id(this.settings.outTangents,e))}return this}trim(e,t){const n=this.times,i=n.length;let r=0,a=i-1;for(;r!==i&&n[r]<e;)++r;for(;a!==-1&&n[a]>t;)--a;if(++a,r!==0||a!==i){r>=a&&(a=Math.max(a,1),r=a-1);const o=this.getValueSize();this.times=n.slice(r,a),this.values=this.values.slice(r*o,a*o)}return this}validate(){let e=!0;const t=this.getValueSize();t-Math.floor(t)!==0&&(Ne("KeyframeTrack: Invalid value size in track.",this),e=!1);const n=this.times,i=this.values,r=n.length;r===0&&(Ne("KeyframeTrack: Track is empty.",this),e=!1);let a=null;for(let o=0;o!==r;o++){const l=n[o];if(typeof l=="number"&&isNaN(l)){Ne("KeyframeTrack: Time is not a valid number.",this,o,l),e=!1;break}if(a!==null&&a>l){Ne("KeyframeTrack: Out of order keys.",this,o,l,a),e=!1;break}a=l}if(i!==void 0&&af(i))for(let o=0,l=i.length;o!==l;++o){const c=i[o];if(isNaN(c)){Ne("KeyframeTrack: Value is not a valid number.",this,o,c),e=!1;break}}return e}optimize(){const e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),i=this.getInterpolation()===Ea,r=e.length-1;let a=1;for(let o=1;o<r;++o){let l=!1;const c=e[o],d=e[o+1];if(c!==d&&(o!==1||c!==e[0]))if(i)l=!0;else{const h=o*n,u=h-n,f=h+n;for(let g=0;g!==n;++g){const y=t[h+g];if(y!==t[u+g]||y!==t[f+g]){l=!0;break}}}if(l){if(o!==a){e[a]=e[o];const h=o*n,u=a*n;for(let f=0;f!==n;++f)t[u+f]=t[h+f]}++a}}if(r>0){e[a]=e[r];for(let o=r*n,l=a*n,c=0;c!==n;++c)t[l+c]=t[o+c];++a}return a!==e.length?(this.times=e.slice(0,a),this.values=t.slice(0,a*n)):(this.times=e,this.values=t),this}clone(){const e=this.times.slice(),t=this.values.slice(),n=this.constructor,i=new n(this.name,e,t);return i.createInterpolant=this.createInterpolant,Xr(this.settings)&&(i.settings={inTangents:this.settings.inTangents.slice(),outTangents:this.settings.outTangents.slice()}),i}}function id(s,e){for(let t=0,n=s.length;t!==n;t+=2)s[t]*=e}yn.prototype.ValueTypeName="";yn.prototype.TimeBufferType=Float32Array;yn.prototype.ValueBufferType=Float32Array;yn.prototype.DefaultInterpolation=Zs;class Ms extends yn{constructor(e,t,n){super(e,t,n)}}Ms.prototype.ValueTypeName="bool";Ms.prototype.ValueBufferType=Array;Ms.prototype.DefaultInterpolation=Ys;Ms.prototype.InterpolantFactoryMethodLinear=void 0;Ms.prototype.InterpolantFactoryMethodSmooth=void 0;class Oh extends yn{constructor(e,t,n,i){super(e,t,n,i)}}Oh.prototype.ValueTypeName="color";class tr extends yn{constructor(e,t,n,i){super(e,t,n,i)}}tr.prototype.ValueTypeName="number";class Np extends ys{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){const r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=(n-t)/(i-t);let c=e*o;for(let d=c+o;c!==d;c+=4)xn.slerpFlat(r,0,a,c-o,a,c,l);return r}}class nr extends yn{constructor(e,t,n,i){super(e,t,n,i)}InterpolantFactoryMethodLinear(e){return new Np(this.times,this.values,this.getValueSize(),e)}}nr.prototype.ValueTypeName="quaternion";nr.prototype.InterpolantFactoryMethodSmooth=void 0;class bs extends yn{constructor(e,t,n){super(e,t,n)}}bs.prototype.ValueTypeName="string";bs.prototype.ValueBufferType=Array;bs.prototype.DefaultInterpolation=Ys;bs.prototype.InterpolantFactoryMethodLinear=void 0;bs.prototype.InterpolantFactoryMethodSmooth=void 0;class aa extends yn{constructor(e,t,n,i){super(e,t,n,i)}}aa.prototype.ValueTypeName="vector";class Up{constructor(e="",t=-1,n=[],i=qu){this.name=e,this.tracks=n,this.duration=t,this.blendMode=i,this.uuid=_n(),this.userData={},this.duration<0&&this.resetDuration()}static parse(e){const t=[],n=e.tracks,i=1/(e.fps||1);for(let a=0,o=n.length;a!==o;++a)t.push(Fp(n[a]).scale(i));const r=new this(e.name,e.duration,t,e.blendMode);return r.uuid=e.uuid,r.userData=JSON.parse(e.userData||"{}"),r}static toJSON(e){const t=[],n=e.tracks,i={name:e.name,duration:e.duration,tracks:t,uuid:e.uuid,blendMode:e.blendMode,userData:JSON.stringify(e.userData)};for(let r=0,a=n.length;r!==a;++r)t.push(yn.toJSON(n[r]));return i}static CreateFromMorphTargetSequence(e,t,n,i){const r=t.length,a=[];for(let o=0;o<r;o++){let l=[],c=[];l.push((o+r-1)%r,o,(o+1)%r),c.push(0,1,0);const d=wp(l);l=nd(l,1,d),c=nd(c,1,d),!i&&l[0]===0&&(l.push(r),c.push(c[0])),a.push(new tr(".morphTargetInfluences["+t[o].name+"]",l,c).scale(1/n))}return new this(e,-1,a)}static findByName(e,t){let n=e;if(!Array.isArray(e)){const i=e;n=i.geometry&&i.geometry.animations||i.animations}for(let i=0;i<n.length;i++)if(n[i].name===t)return n[i];return null}static CreateClipsFromMorphTargetSequences(e,t,n){const i={},r=/^([\w-]*?)([\d]+)$/;for(let o=0,l=e.length;o<l;o++){const c=e[o],d=c.name.match(r);if(d&&d.length>1){const h=d[1];let u=i[h];u||(i[h]=u=[]),u.push(c)}}const a=[];for(const o in i)a.push(this.CreateFromMorphTargetSequence(o,i[o],t,n));return a}resetDuration(){const e=this.tracks;let t=0;for(let n=0,i=e.length;n!==i;++n){const r=this.tracks[n];t=Math.max(t,r.times[r.times.length-1])}return this.duration=t,this}trim(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].trim(0,this.duration);return this}validate(){let e=!0;for(let t=0;t<this.tracks.length;t++)e=e&&this.tracks[t].validate();return e}optimize(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].optimize();return this}clone(){const e=[];for(let n=0;n<this.tracks.length;n++)e.push(this.tracks[n].clone());const t=new this.constructor(this.name,this.duration,e,this.blendMode);return t.userData=JSON.parse(JSON.stringify(this.userData)),t}toJSON(){return this.constructor.toJSON(this)}}function Op(s){switch(s.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return tr;case"vector":case"vector2":case"vector3":case"vector4":return aa;case"color":return Oh;case"quaternion":return nr;case"bool":case"boolean":return Ms;case"string":return bs}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+s)}function Fp(s){if(s.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");const e=Op(s.type);if(s.times===void 0){const n=[],i=[];Ap(s.keys,n,i,"value"),s.times=n,s.values=i}let t;return e.parse!==void 0?t=e.parse(s):t=new e(s.name,s.times,s.values,s.interpolation),Xr(s.settings)&&(t.settings={inTangents:gi(s.settings.inTangents,Float32Array),outTangents:gi(s.settings.outTangents,Float32Array)}),t}const jn={enabled:!1,files:{},add:function(s,e){this.enabled!==!1&&(sd(s)||(this.files[s]=e))},get:function(s){if(this.enabled!==!1&&!sd(s))return this.files[s]},remove:function(s){delete this.files[s]},clear:function(){this.files={}}};function sd(s){try{const e=s.slice(s.indexOf(":")+1);return new URL(e).protocol==="blob:"}catch{return!1}}class Bp{constructor(e,t,n){const i=this;let r=!1,a=0,o=0,l;const c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this._abortController=null,this.itemStart=function(d){o++,r===!1&&i.onStart!==void 0&&i.onStart(d,a,o),r=!0},this.itemEnd=function(d){a++,i.onProgress!==void 0&&i.onProgress(d,a,o),a===o&&(r=!1,i.onLoad!==void 0&&i.onLoad())},this.itemError=function(d){i.onError!==void 0&&i.onError(d)},this.resolveURL=function(d){return d=d.normalize("NFC"),l?l(d):d},this.setURLModifier=function(d){return l=d,this},this.addHandler=function(d,h){return c.push(d,h),this},this.removeHandler=function(d){const h=c.indexOf(d);return h!==-1&&c.splice(h,2),this},this.getHandler=function(d){for(let h=0,u=c.length;h<u;h+=2){const f=c[h],g=c[h+1];if(f.global&&(f.lastIndex=0),f.test(d))return g}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}}const kp=new Bp;class Ss{constructor(e){this.manager=e!==void 0?e:kp,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(e,t){const n=this;return new Promise(function(i,r){n.load(e,i,t,r)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}}Ss.DEFAULT_MATERIAL_NAME="__DEFAULT";const qn={};class zp extends Error{constructor(e,t){super(e),this.response=t}}class Fh extends Ss{constructor(e){super(e),this.mimeType="",this.responseType="",this._abortController=new AbortController}load(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const r=jn.get(`file:${e}`);if(r!==void 0){this.manager.itemStart(e),setTimeout(()=>{t&&t(r),this.manager.itemEnd(e)},0);return}if(qn[e]!==void 0){qn[e].push({onLoad:t,onProgress:n,onError:i});return}qn[e]=[],qn[e].push({onLoad:t,onProgress:n,onError:i});const a=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin",signal:typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal}),o=this.mimeType,l=this.responseType;fetch(a).then(c=>{if(c.status===200||c.status===0){if(c.status===0&&Ae("FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||c.body===void 0||c.body.getReader===void 0)return c;const d=qn[e],h=c.body.getReader(),u=c.headers.get("X-File-Size")||c.headers.get("Content-Length"),f=u?parseInt(u):0,g=f!==0;let y=0;const p=new ReadableStream({start(m){S();function S(){h.read().then(({done:T,value:_})=>{if(T)m.close();else{y+=_.byteLength;const b=new ProgressEvent("progress",{lengthComputable:g,loaded:y,total:f});for(let E=0,w=d.length;E<w;E++){const v=d[E];v.onProgress&&v.onProgress(b)}m.enqueue(_),S()}},T=>{m.error(T)})}}});return new Response(p)}else throw new zp(`fetch for "${c.url}" responded with ${c.status}: ${c.statusText}`,c)}).then(c=>{switch(l){case"arraybuffer":return c.arrayBuffer();case"blob":return c.blob();case"document":return c.text().then(d=>new DOMParser().parseFromString(d,o));case"json":return c.json();default:if(o==="")return c.text();{const h=/charset="?([^;"\s]*)"?/i.exec(o),u=h&&h[1]?h[1].toLowerCase():void 0,f=new TextDecoder(u);return c.arrayBuffer().then(g=>f.decode(g))}}}).then(c=>{jn.add(`file:${e}`,c);const d=qn[e];delete qn[e];for(let h=0,u=d.length;h<u;h++){const f=d[h];f.onLoad&&f.onLoad(c)}}).catch(c=>{const d=qn[e];if(d===void 0)throw this.manager.itemError(e),c;delete qn[e];for(let h=0,u=d.length;h<u;h++){const f=d[h];f.onError&&f.onError(c)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}}const Ji=new WeakMap;class Hp extends Ss{constructor(e){super(e)}load(e,t,n,i){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const r=this,a=jn.get(`image:${e}`);if(a!==void 0){if(a.complete===!0)r.manager.itemStart(e),setTimeout(function(){t&&t(a),r.manager.itemEnd(e)},0);else{let h=Ji.get(a);h===void 0&&(h=[],Ji.set(a,h)),h.push({onLoad:t,onError:i})}return a}const o=js("img");function l(){d(),t&&t(this);const h=Ji.get(this)||[];for(let u=0;u<h.length;u++){const f=h[u];f.onLoad&&f.onLoad(this)}Ji.delete(this),r.manager.itemEnd(e)}function c(h){d(),i&&i(h),jn.remove(`image:${e}`);const u=Ji.get(this)||[];for(let f=0;f<u.length;f++){const g=u[f];g.onError&&g.onError(h)}Ji.delete(this),r.manager.itemError(e),r.manager.itemEnd(e)}function d(){o.removeEventListener("load",l,!1),o.removeEventListener("error",c,!1)}return o.addEventListener("load",l,!1),o.addEventListener("error",c,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(o.crossOrigin=this.crossOrigin),jn.add(`image:${e}`,o),r.manager.itemStart(e),o.src=e,o}}class Gp extends Ss{constructor(e){super(e)}load(e,t,n,i){const r=new Ut,a=new Hp(this.manager);return a.setCrossOrigin(this.crossOrigin),a.setPath(this.path),a.load(e,function(o){r.image=o,r.needsUpdate=!0,t!==void 0&&t(r)},n,i),r}}class ua extends mt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Ie(e),this.intensity=t}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}}class Vp extends ua{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(mt.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Ie(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}toJSON(e){const t=super.toJSON(e);return t.object.groundColor=this.groundColor.getHex(),t}}const ja=new Be,rd=new P,ad=new P;class Wl{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new _e(512,512),this.mapType=Qt,this.map=null,this.mapPass=null,this.matrix=new Be,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new kl,this._frameExtents=new _e(1,1),this._viewportCount=1,this._viewports=[new lt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera;rd.setFromMatrixPosition(e.matrixWorld),t.position.copy(rd),ad.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(ad),t.updateMatrixWorld(),this._updateMatrix(t,this.matrix,this._frustum)}_updateMatrix(e,t,n,i){ja.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),n.setFromProjectionMatrix(ja,e.coordinateSystem,e.reversedDepth);const r=this._frameExtents,a=i?i.z/r.x:1,o=i?i.w/r.y:1,l=i?i.x/r.x:0,c=i?i.y/r.y:0;e.coordinateSystem===Js||e.reversedDepth?t.set(.5*a,0,0,.5*a+l,0,.5*o,0,.5*o+c,0,0,1,0,0,0,0,1):t.set(.5*a,0,0,.5*a+l,0,.5*o,0,.5*o+c,0,0,.5,.5,0,0,0,1),t.multiply(ja)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return e.intensity=this.intensity,e.bias=this.bias,e.normalBias=this.normalBias,e.radius=this.radius,e.blurSamples=this.blurSamples,e.mapSize=this.mapSize.toArray(),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}const Dr=new P,Nr=new xn,Sn=new P;class Bh extends mt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Be,this.projectionMatrix=new Be,this.projectionMatrixInverse=new Be,this.coordinateSystem=Ln,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(Dr,Nr,Sn),Sn.x===1&&Sn.y===1&&Sn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Dr,Nr,Sn.set(1,1,1)).invert()}updateWorldMatrix(e,t,n=!1){super.updateWorldMatrix(e,t,n),this.matrixWorld.decompose(Dr,Nr,Sn),Sn.x===1&&Sn.y===1&&Sn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Dr,Nr,Sn.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const pi=new P,od=new _e,ld=new _e;class Wt extends Bh{constructor(e=50,t=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=gs*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(Hs*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return gs*2*Math.atan(Math.tan(Hs*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){pi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(pi.x,pi.y).multiplyScalar(-e/pi.z),pi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(pi.x,pi.y).multiplyScalar(-e/pi.z)}getViewSize(e,t){return this.getViewBounds(e,od,ld),t.subVectors(ld,od)}setViewOffset(e,t,n,i,r,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(Hs*.5*this.fov)/this.zoom,n=2*t,i=this.aspect*n,r=-.5*i;const a=this.view;if(this.view!==null&&this.view.enabled){const l=a.fullWidth,c=a.fullHeight;r+=a.offsetX*i/l,t-=a.offsetY*n/c,i*=a.width/l,n*=a.height/c}const o=this.filmOffset;o!==0&&(r+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+i,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}class Wp extends Wl{constructor(){super(new Wt(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1,this.aspect=1}updateMatrices(e){const t=this.camera,n=gs*2*e.angle*this.focus,i=this.mapSize.width/this.mapSize.height*this.aspect,r=e.distance||t.far;(n!==t.fov||i!==t.aspect||r!==t.far)&&(t.fov=n,t.aspect=i,t.far=r,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this.aspect=e.aspect,this}toJSON(){const e=super.toJSON();return e.focus=this.focus,e.aspect=this.aspect,e}}class Xp extends ua{constructor(e,t,n=0,i=Math.PI/3,r=0,a=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(mt.DEFAULT_UP),this.updateMatrix(),this.target=new mt,this.distance=n,this.angle=i,this.penumbra=r,this.decay=a,this.map=null,this.shadow=new Wp}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.map=e.map,this.shadow=e.shadow.clone(),this}toJSON(e){const t=super.toJSON(e);return t.object.distance=this.distance,t.object.angle=this.angle,t.object.decay=this.decay,t.object.penumbra=this.penumbra,t.object.target=this.target.uuid,this.map&&this.map.isTexture&&(t.object.map=this.map.toJSON(e).uuid),t.object.shadow=this.shadow.toJSON(),t}}class $p extends Wl{constructor(){super(new Wt(90,1,.5,500)),this.isPointLightShadow=!0}}class qp extends ua{constructor(e,t,n=0,i=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=i,this.shadow=new $p}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}toJSON(e){const t=super.toJSON(e);return t.object.distance=this.distance,t.object.decay=this.decay,t.object.shadow=this.shadow.toJSON(),t}}class fa extends Bh{constructor(e=-1,t=1,n=1,i=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=i,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,i,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2;let r=n-e,a=n+e,o=i+t,l=i-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,d=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,a=r+c*this.view.width,o-=d*this.view.offsetY,l=o-d*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class Kp extends Wl{constructor(){super(new fa(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class $r extends ua{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(mt.DEFAULT_UP),this.updateMatrix(),this.target=new mt,this.shadow=new Kp}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){const t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}}class Xs{static extractUrlBase(e){const t=e.lastIndexOf("/");return t===-1?"./":e.slice(0,t+1)}static resolveURL(e,t){return typeof e!="string"||e===""?"":(/^https?:\/\//i.test(t)&&/^\//.test(e)&&(t=t.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(e)||/^data:.*,.*$/i.test(e)||/^blob:.*$/i.test(e)?e:t+e)}}const Qa=new WeakMap;class Yp extends Ss{constructor(e){super(e),this.isImageBitmapLoader=!0,typeof createImageBitmap>"u"&&Ae("ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch>"u"&&Ae("ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"},this._abortController=new AbortController}setOptions(e){return this.options=e,this}load(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const r=this,a=jn.get(`image-bitmap:${e}`);if(a!==void 0){if(r.manager.itemStart(e),a.then){a.then(c=>{Qa.has(a)===!0?(i&&i(Qa.get(a)),r.manager.itemError(e),r.manager.itemEnd(e)):(t&&t(c),r.manager.itemEnd(e))});return}setTimeout(function(){t&&t(a),r.manager.itemEnd(e)},0);return}const o={};o.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",o.headers=this.requestHeader,o.signal=typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal;const l=fetch(e,o).then(function(c){return c.blob()}).then(function(c){return createImageBitmap(c,Object.assign({},r.options,{colorSpaceConversion:"none"}))}).then(function(c){return jn.add(`image-bitmap:${e}`,c),t&&t(c),r.manager.itemEnd(e),c}).catch(function(c){i&&i(c),Qa.set(l,c),jn.remove(`image-bitmap:${e}`),r.manager.itemError(e),r.manager.itemEnd(e)});jn.add(`image-bitmap:${e}`,l),r.manager.itemStart(e)}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}}const ji=-90,Qi=1;class Zp extends mt{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const i=new Wt(ji,Qi,e,t);i.layers=this.layers,this.add(i);const r=new Wt(ji,Qi,e,t);r.layers=this.layers,this.add(r);const a=new Wt(ji,Qi,e,t);a.layers=this.layers,this.add(a);const o=new Wt(ji,Qi,e,t);o.layers=this.layers,this.add(o);const l=new Wt(ji,Qi,e,t);l.layers=this.layers,this.add(l);const c=new Wt(ji,Qi,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,i,r,a,o,l]=t;for(const c of t)this.remove(c);if(e===Ln)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===Js)n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:i}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[r,a,o,l,c,d]=this.children,h=e.getRenderTarget(),u=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;const y=n.texture.generateMipmaps;n.texture.generateMipmaps=!1;let p=!1;e.isWebGLRenderer===!0?p=e.state.buffers.depth.getReversed():p=e.reversedDepthBuffer,e.setRenderTarget(n,0,i),p&&e.autoClear===!1&&e.clearDepth(),e.render(t,r),e.setRenderTarget(n,1,i),p&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(n,2,i),p&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(n,3,i),p&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),e.setRenderTarget(n,4,i),p&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),n.texture.generateMipmaps=y,e.setRenderTarget(n,5,i),p&&e.autoClear===!1&&e.clearDepth(),e.render(t,d),e.setRenderTarget(h,u,f),e.xr.enabled=g,n.texture.needsPMREMUpdate=!0}}class Jp extends Wt{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}const Xl="\\[\\]\\.:\\/",jp=new RegExp("["+Xl+"]","g"),$l="[^"+Xl+"]",Qp="[^"+Xl.replace("\\.","")+"]",em=/((?:WC+[\/:])*)/.source.replace("WC",$l),tm=/(WCOD+)?/.source.replace("WCOD",Qp),nm=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",$l),im=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",$l),sm=new RegExp("^"+em+tm+nm+im+"$"),rm=["material","materials","bones","map"];class am{constructor(e,t,n){const i=n||st.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,i)}getValue(e,t){this.bind();const n=this._targetGroup.nCachedObjects_,i=this._bindings[n];i!==void 0&&i.getValue(e,t)}setValue(e,t){const n=this._bindings;for(let i=this._targetGroup.nCachedObjects_,r=n.length;i!==r;++i)n[i].setValue(e,t)}bind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}}class st{constructor(e,t,n){this.path=t,this.parsedPath=n||st.parseTrackName(t),this.node=st.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new st.Composite(e,t,n):new st(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(jp,"")}static parseTrackName(e){const t=sm.exec(e);if(t===null)throw new Error("THREE.PropertyBinding: Cannot parse trackName: "+e);const n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},i=n.nodeName&&n.nodeName.lastIndexOf(".");if(i!==void 0&&i!==-1){const r=n.nodeName.substring(i+1);rm.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,i),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("THREE.PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){const n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){const n=function(r){for(let a=0;a<r.length;a++){const o=r[a];if(o.name===t||o.uuid===t)return o;const l=n(o.children);if(l)return l}return null},i=n(e.children);if(i)return i}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){const n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)e[t++]=n[i]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){const n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=e[t++]}_setValue_array_setNeedsUpdate(e,t){const n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){const n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node;const t=this.parsedPath,n=t.objectName,i=t.propertyName;let r=t.propertyIndex;if(e||(e=st.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){Ae("PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let c=t.objectIndex;switch(n){case"materials":if(!e.material){Ne("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){Ne("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){Ne("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let d=0;d<e.length;d++)if(e[d].name===c){c=d;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){Ne("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){Ne("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){Ne("PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(c!==void 0){if(e[c]===void 0){Ne("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[c]}}const a=e[i];if(a===void 0){const c=t.nodeName;Ne("PropertyBinding: Trying to update property for track: "+c+"."+i+" but it wasn't found.",e);return}let o=this.Versioning.None;this.targetObject=e,e.isMaterial===!0?o=this.Versioning.NeedsUpdate:e.isObject3D===!0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(r!==void 0){if(i==="morphTargetInfluences"){if(!e.geometry){Ne("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){Ne("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[r]!==void 0&&(r=e.morphTargetDictionary[r])}l=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=r}else a.fromArray!==void 0&&a.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(l=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=i;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}}st.Composite=am;st.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};st.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};st.prototype.GetterByBindingType=[st.prototype._getValue_direct,st.prototype._getValue_array,st.prototype._getValue_arrayElement,st.prototype._getValue_toArray];st.prototype.SetterByBindingTypeAndVersioning=[[st.prototype._setValue_direct,st.prototype._setValue_direct_setNeedsUpdate,st.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[st.prototype._setValue_array,st.prototype._setValue_array_setNeedsUpdate,st.prototype._setValue_array_setMatrixWorldNeedsUpdate],[st.prototype._setValue_arrayElement,st.prototype._setValue_arrayElement_setNeedsUpdate,st.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[st.prototype._setValue_fromArray,st.prototype._setValue_fromArray_setNeedsUpdate,st.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];const cd=new Be;class om{constructor(e,t,n=0,i=1/0){this.ray=new xs(e,t),this.near=n,this.far=i,this.camera=null,this.layers=new Ul,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,t.projectionMatrix.elements[14]).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):Ne("Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return cd.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(cd),this}intersectObject(e,t=!0,n=[]){return ll(e,this,n,t),n.sort(dd),n}intersectObjects(e,t=!0,n=[]){for(let i=0,r=e.length;i<r;i++)ll(e[i],this,n,t);return n.sort(dd),n}}function dd(s,e){return s.distance-e.distance}function ll(s,e,t,n){let i=!0;if(s.layers.test(e.layers)&&s.raycast(e,t)===!1&&(i=!1),i===!0&&n===!0){const r=s.children;for(let a=0,o=r.length;a<o;a++)ll(r[a],e,t,!0)}}class hd{constructor(e=1,t=0,n=0){this.radius=e,this.phi=t,this.theta=n}set(e,t,n){return this.radius=e,this.phi=t,this.theta=n,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=ze(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,n){return this.radius=Math.sqrt(e*e+t*t+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,n),this.phi=Math.acos(ze(t/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}const nc=class nc{constructor(e,t,n,i){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,n,i)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let n=0;n<4;n++)this.elements[n]=e[n+t];return this}set(e,t,n,i){const r=this.elements;return r[0]=e,r[2]=t,r[1]=n,r[3]=i,this}};nc.prototype.isMatrix2=!0;let ud=nc;class lm extends Ti{constructor(e,t=null){super(),this.object=e,this.domElement=t,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(e){this.domElement!==null&&this.disconnect(),this.domElement=e}disconnect(){}dispose(){}update(){}}function fd(s,e,t,n){const i=cm(n);switch(t){case vh:return s*e;case Al:return s*e/i.components*i.byteLength;case Rl:return s*e/i.components*i.byteLength;case Oi:return s*e*2/i.components*i.byteLength;case Cl:return s*e*2/i.components*i.byteLength;case xh:return s*e*3/i.components*i.byteLength;case on:return s*e*4/i.components*i.byteLength;case Pl:return s*e*4/i.components*i.byteLength;case Hr:case Gr:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*8;case Vr:case Wr:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*16;case Co:case Lo:return Math.max(s,16)*Math.max(e,8)/4;case Ro:case Po:return Math.max(s,8)*Math.max(e,8)/2;case Io:case Do:case Uo:case Oo:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*8;case No:case Jr:case Fo:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*16;case Bo:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*16;case ko:return Math.floor((s+4)/5)*Math.floor((e+3)/4)*16;case zo:return Math.floor((s+4)/5)*Math.floor((e+4)/5)*16;case Ho:return Math.floor((s+5)/6)*Math.floor((e+4)/5)*16;case Go:return Math.floor((s+5)/6)*Math.floor((e+5)/6)*16;case Vo:return Math.floor((s+7)/8)*Math.floor((e+4)/5)*16;case Wo:return Math.floor((s+7)/8)*Math.floor((e+5)/6)*16;case Xo:return Math.floor((s+7)/8)*Math.floor((e+7)/8)*16;case $o:return Math.floor((s+9)/10)*Math.floor((e+4)/5)*16;case qo:return Math.floor((s+9)/10)*Math.floor((e+5)/6)*16;case Ko:return Math.floor((s+9)/10)*Math.floor((e+7)/8)*16;case Yo:return Math.floor((s+9)/10)*Math.floor((e+9)/10)*16;case Zo:return Math.floor((s+11)/12)*Math.floor((e+9)/10)*16;case Jo:return Math.floor((s+11)/12)*Math.floor((e+11)/12)*16;case jo:case Qo:case el:return Math.ceil(s/4)*Math.ceil(e/4)*16;case tl:case nl:return Math.ceil(s/4)*Math.ceil(e/4)*8;case jr:case il:return Math.ceil(s/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function cm(s){switch(s){case Qt:case ph:return{byteLength:1,components:1};case qs:case mh:case Bn:return{byteLength:2,components:1};case Tl:case wl:return{byteLength:2,components:4};case Fn:case El:case an:return{byteLength:4,components:1};case gh:case _h:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${s}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:bl}}));typeof window<"u"&&(window.__THREE__?Ae("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=bl);/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function kh(){let s=null,e=!1,t=null,n=null;function i(r,a){n=s.requestAnimationFrame(i),t(r,a)}return{start:function(){e!==!0&&t!==null&&s!==null&&(n=s.requestAnimationFrame(i),e=!0)},stop:function(){s!==null&&s.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){s=r}}}function dm(s){const e=new WeakMap;function t(o,l){const c=o.array,d=o.usage,h=c.byteLength,u=s.createBuffer();s.bindBuffer(l,u),s.bufferData(l,c,d),o.onUploadCallback();let f;if(c instanceof Float32Array)f=s.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)f=s.HALF_FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?f=s.HALF_FLOAT:f=s.UNSIGNED_SHORT;else if(c instanceof Int16Array)f=s.SHORT;else if(c instanceof Uint32Array)f=s.UNSIGNED_INT;else if(c instanceof Int32Array)f=s.INT;else if(c instanceof Int8Array)f=s.BYTE;else if(c instanceof Uint8Array)f=s.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)f=s.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:u,type:f,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:h}}function n(o,l,c){const d=l.array,h=l.updateRanges;if(s.bindBuffer(c,o),h.length===0)s.bufferSubData(c,0,d);else{h.sort((f,g)=>f.start-g.start);let u=0;for(let f=1;f<h.length;f++){const g=h[u],y=h[f];y.start<=g.start+g.count+1?g.count=Math.max(g.count,y.start+y.count-g.start):(++u,h[u]=y)}h.length=u+1;for(let f=0,g=h.length;f<g;f++){const y=h[f];s.bufferSubData(c,y.start*d.BYTES_PER_ELEMENT,d,y.start,y.count)}l.clearUpdateRanges()}l.onUploadCallback()}function i(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);const l=e.get(o);l&&(s.deleteBuffer(l.buffer),e.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const d=e.get(o);(!d||d.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const c=e.get(o);if(c===void 0)e.set(o,t(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,o,l),c.version=o.version}}return{get:i,remove:r,update:a}}var hm=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,um=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,fm=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,pm=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,mm=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,gm=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,_m=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,vm=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,xm=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,ym=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Mm=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,bm=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Sm=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,Em=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,Tm=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,wm=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,Am=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Rm=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Cm=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Pm=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,Lm=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,Im=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,Dm=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,Nm=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,Um=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,Om=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
#endif`,Fm=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Bm=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,km=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,zm=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Hm="gl_FragColor = linearToOutputTexel( gl_FragColor );",Gm=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Vm=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,Wm=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,Xm=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,$m=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,qm=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,Km=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Ym=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Zm=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Jm=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,jm=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,Qm=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,eg=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,tg=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,ng=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_SUN_LIGHTS > 0
	struct SunLight {
		vec3 direction;
		vec3 color;
	};
	uniform SunLight sunLights[ NUM_SUN_LIGHTS ];
	void getSunLightInfo( const in SunLight sunLight, out IncidentLight light ) {
		light.color = sunLight.color;
		light.direction = sunLight.direction;
		light.visible = true;
	}
#endif
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,ig=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_RETROREFLECTION
		vec3 getIBLRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 retroVec = normalize( mix( viewDir, normal, pow4( roughness ) ) );
				retroVec = transformDirectionByInverseViewMatrix( retroVec, viewMatrix );
				vec4 envMapColor = textureCubeUV( envMap, envMapRotation * retroVec, roughness );
				return envMapColor.rgb * envMapIntensity;
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
		#ifdef USE_RETROREFLECTION
			vec3 getIBLAnisotropyRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
				#ifdef ENVMAP_TYPE_CUBE_UV
					vec3 bentNormal = cross( bitangent, viewDir );
					bentNormal = normalize( cross( bentNormal, bitangent ) );
					bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
					return getIBLRetroRadiance( viewDir, bentNormal, roughness );
				#else
					return vec3( 0.0 );
				#endif
			}
		#endif
	#endif
#endif`,sg=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,rg=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,ag=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,og=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,lg=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_RETROREFLECTION
	material.retroreflectivity = retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,cg=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	vec2 dfg;
	vec3 multiScatteringCompensation;
	#ifdef USE_RETROREFLECTION
		float retroreflectivity;
	#endif
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0Dielectric;
		vec3 iridescenceF0Metallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec2 fab, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec2 fab, const in vec3 specularColor, const in float specularF90, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	vec3 specularBRDF = BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	#ifdef USE_RETROREFLECTION
		vec3 retroViewDir = reflect( - geometryViewDir, geometryNormal );
		vec3 retroSpecularBRDF = BRDF_GGX( directLight.direction, retroViewDir, geometryNormal, material );
		specularBRDF = mix( specularBRDF, retroSpecularBRDF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directSpecular += irradiance * specularBRDF * material.multiScatteringCompensation;
	vec3 halfDir = normalize( directLight.direction + geometryViewDir );
	float dotVH = saturate( dot( geometryViewDir, halfDir ) );
	vec3 F = F_Schlick( material.specularColor, material.specularF90, dotVH );
	#ifdef USE_RETROREFLECTION
		vec3 retroHalfDir = normalize( directLight.direction + retroViewDir );
		float dotRetroVH = saturate( dot( retroViewDir, retroHalfDir ) );
		vec3 retroF = F_Schlick( material.specularColor, material.specularF90, dotRetroVH );
		F = mix( F, retroF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - F );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScattering, multiScattering );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScattering, multiScattering );
	#endif
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - singleScattering - multiScattering );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		sheenSpecularIndirect += irradiance * material.sheenColor * sheenAlbedo * RECIPROCAL_PI;
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( material.dfg, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceF0Metallic, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( material.dfg, material.diffuseColor, material.specularF90, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,dg=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		vec3 iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		vec3 iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( iridescenceFresnelDielectric, iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0Dielectric = Schlick_to_F0( iridescenceFresnelDielectric, 1.0, dotNVi );
		material.iridescenceF0Metallic = Schlick_to_F0( iridescenceFresnelMetallic, 1.0, dotNVi );
	}
#endif
#ifdef STANDARD
	float dotNVms = saturate( dot( geometryNormal, geometryViewDir ) );
	material.dfg = texture2D( dfgLUT, vec2( material.roughness, dotNVms ) ).rg;
	#if ( NUM_SUN_LIGHTS > 0 || NUM_DIR_LIGHTS > 0 || NUM_POINT_LIGHTS > 0 || NUM_SPOT_LIGHTS > 0 )
		float EssMs = material.dfg.x + material.dfg.y;
		material.multiScatteringCompensation = 1.0 + material.specularColorBlended * ( 1.0 / EssMs - 1.0 );
	#endif
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SUN_LIGHTS > 0 ) && defined( RE_Direct )
	SunLight sunLight;
	#if defined( USE_SHADOWMAP ) && NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHTS; i ++ ) {
		sunLight = sunLights[ i ];
		getSunLightInfo( sunLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SUN_LIGHT_SHADOWS )
		sunLightShadow = sunLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getSunShadow( sunShadowMap[ i ], sunLightShadow, UNROLLED_LOOP_INDEX ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#ifdef USE_LIGHT_PROBES_GRID
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		irradiance += getLightProbeGridIrradiance( probeWorldPos, probeWorldNormal );
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,hg=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		vec3 iblRadiance = getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		vec3 iblRadiance = getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_RETROREFLECTION
		#ifdef USE_ANISOTROPY
			vec3 retroIBLRadiance = getIBLAnisotropyRetroRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
		#else
			vec3 retroIBLRadiance = getIBLRetroRadiance( geometryViewDir, geometryNormal, material.roughness );
		#endif
		iblRadiance = mix( iblRadiance, retroIBLRadiance, saturate( material.retroreflectivity ) );
	#endif
	radiance += iblRadiance;
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,ug=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,fg=`#ifdef USE_LIGHT_PROBES_GRID
uniform highp sampler3D probesSH;
uniform vec3 probesMin;
uniform vec3 probesMax;
uniform vec3 probesResolution;
vec3 getLightProbeGridIrradiance( vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 resMinusOne = res - 1.0;
	vec3 probeSpacing = gridRange / resMinusOne;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.0, 1.0 );
	uvw = uvw * resMinusOne / res + 0.5 / res;
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,pg=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,mg=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,gg=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,_g=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,vg=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,xg=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,yg=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,Mg=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,bg=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Sg=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Eg=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Tg=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,wg=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Ag=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,Rg=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Cg=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#ifdef DOUBLE_SIDED
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,Pg=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,Lg=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Ig=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Dg=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,Ng=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,Ug=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Og=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Fg=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Bg=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,kg=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,zg=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,Hg=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Gg=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Vg=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Wg=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Xg=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,$g=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,qg=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		#define SUN_LIGHT_CASCADES 2
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#else
			uniform sampler2D sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#endif
		uniform mat4 sunShadowMatrix[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		uniform vec4 sunShadowCascade[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
		struct SunLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SunLightShadow sunLightShadows[ NUM_SUN_LIGHT_SHADOWS ];
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_SUN_LIGHT_SHADOWS > 0
		float getSunShadow(
			#if defined( SHADOWMAP_TYPE_PCF )
				sampler2DShadow shadowMap,
			#else
				sampler2D shadowMap,
			#endif
			SunLightShadow sunLightShadow,
			int shadowIndex
		) {
			vec4 shadowWorldPosition = vec4( vSunShadowWorldPosition.xyz + vSunShadowWorldNormal * sunLightShadow.shadowNormalBias, 1.0 );
			float viewDepth = vSunShadowWorldPosition.w;
			int cascadeOffset = shadowIndex * SUN_LIGHT_CASCADES;
			float shadow = 1.0;
			for ( int i = SUN_LIGHT_CASCADES - 1; i >= 0; i -- ) {
				vec4 cascade = sunShadowCascade[ cascadeOffset + i ];
				if ( viewDepth >= cascade.x && viewDepth < cascade.y ) {
					float cascadeShadow = getShadow(
						shadowMap,
						sunLightShadow.shadowMapSize,
						sunLightShadow.shadowIntensity,
						sunLightShadow.shadowBias,
						sunLightShadow.shadowRadius,
						sunShadowMatrix[ cascadeOffset + i ] * shadowWorldPosition
					);
					shadow = mix( cascadeShadow, shadow, smoothstep( cascade.z, cascade.y, viewDepth ) );
				}
			}
			return shadow;
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float dp = ( shadowCameraNear * ( shadowCameraFar - viewSpaceZ ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp -= shadowBias;
			#else
				float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp += shadowBias;
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			vec2 sample0 = vogelDiskSample( 0, 5, phi );
			vec2 sample1 = vogelDiskSample( 1, 5, phi );
			vec2 sample2 = vogelDiskSample( 2, 5, phi );
			vec2 sample3 = vogelDiskSample( 3, 5, phi );
			vec2 sample4 = vogelDiskSample( 4, 5, phi );
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * sample0.x + bitangent * sample0.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample1.x + bitangent * sample1.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample2.x + bitangent * sample2.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample3.x + bitangent * sample3.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample4.x + bitangent * sample4.y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,Kg=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,Yg=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_SUN_LIGHT_SHADOWS > 0
		vSunShadowWorldPosition = vec4( worldPosition.xyz, - mvPosition.z );
		vSunShadowWorldNormal = shadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,Zg=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHT_SHADOWS; i ++ ) {
		sunLight = sunLightShadows[ i ];
		shadow *= receiveShadow ? getSunShadow( sunShadowMap[ i ], sunLight, UNROLLED_LOOP_INDEX ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,Jg=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,jg=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,Qg=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,e_=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,t_=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,n_=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,i_=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,s_=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,r_=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,a_=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,o_=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,l_=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,c_=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,d_=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const h_=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,u_=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,f_=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,p_=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,m_=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,g_=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,__=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,v_=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,x_=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,y_=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,M_=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,b_=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,S_=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,E_=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,T_=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,w_=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,A_=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,R_=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,C_=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,P_=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,L_=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,I_=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,D_=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,N_=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,U_=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,O_=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_RETROREFLECTION
	uniform float retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,F_=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,B_=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,k_=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,z_=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,H_=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,G_=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,V_=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,W_=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Ge={alphahash_fragment:hm,alphahash_pars_fragment:um,alphamap_fragment:fm,alphamap_pars_fragment:pm,alphatest_fragment:mm,alphatest_pars_fragment:gm,aomap_fragment:_m,aomap_pars_fragment:vm,batching_pars_vertex:xm,batching_vertex:ym,begin_vertex:Mm,beginnormal_vertex:bm,bsdfs:Sm,iridescence_fragment:Em,bumpmap_pars_fragment:Tm,clipping_planes_fragment:wm,clipping_planes_pars_fragment:Am,clipping_planes_pars_vertex:Rm,clipping_planes_vertex:Cm,color_fragment:Pm,color_pars_fragment:Lm,color_pars_vertex:Im,color_vertex:Dm,common:Nm,cube_uv_reflection_fragment:Um,defaultnormal_vertex:Om,displacementmap_pars_vertex:Fm,displacementmap_vertex:Bm,emissivemap_fragment:km,emissivemap_pars_fragment:zm,colorspace_fragment:Hm,colorspace_pars_fragment:Gm,envmap_fragment:Vm,envmap_common_pars_fragment:Wm,envmap_pars_fragment:Xm,envmap_pars_vertex:$m,envmap_physical_pars_fragment:ig,envmap_vertex:qm,fog_vertex:Km,fog_pars_vertex:Ym,fog_fragment:Zm,fog_pars_fragment:Jm,gradientmap_pars_fragment:jm,lightmap_pars_fragment:Qm,lights_lambert_fragment:eg,lights_lambert_pars_fragment:tg,lights_pars_begin:ng,lights_toon_fragment:sg,lights_toon_pars_fragment:rg,lights_phong_fragment:ag,lights_phong_pars_fragment:og,lights_physical_fragment:lg,lights_physical_pars_fragment:cg,lights_fragment_begin:dg,lights_fragment_maps:hg,lights_fragment_end:ug,lightprobes_pars_fragment:fg,logdepthbuf_fragment:pg,logdepthbuf_pars_fragment:mg,logdepthbuf_pars_vertex:gg,logdepthbuf_vertex:_g,map_fragment:vg,map_pars_fragment:xg,map_particle_fragment:yg,map_particle_pars_fragment:Mg,metalnessmap_fragment:bg,metalnessmap_pars_fragment:Sg,morphinstance_vertex:Eg,morphcolor_vertex:Tg,morphnormal_vertex:wg,morphtarget_pars_vertex:Ag,morphtarget_vertex:Rg,normal_fragment_begin:Cg,normal_fragment_maps:Pg,normal_pars_fragment:Lg,normal_pars_vertex:Ig,normal_vertex:Dg,normalmap_pars_fragment:Ng,clearcoat_normal_fragment_begin:Ug,clearcoat_normal_fragment_maps:Og,clearcoat_pars_fragment:Fg,iridescence_pars_fragment:Bg,opaque_fragment:kg,packing:zg,premultiplied_alpha_fragment:Hg,project_vertex:Gg,dithering_fragment:Vg,dithering_pars_fragment:Wg,roughnessmap_fragment:Xg,roughnessmap_pars_fragment:$g,shadowmap_pars_fragment:qg,shadowmap_pars_vertex:Kg,shadowmap_vertex:Yg,shadowmask_pars_fragment:Zg,skinbase_vertex:Jg,skinning_pars_vertex:jg,skinning_vertex:Qg,skinnormal_vertex:e_,specularmap_fragment:t_,specularmap_pars_fragment:n_,tonemapping_fragment:i_,tonemapping_pars_fragment:s_,transmission_fragment:r_,transmission_pars_fragment:a_,uv_pars_fragment:o_,uv_pars_vertex:l_,uv_vertex:c_,worldpos_vertex:d_,background_vert:h_,background_frag:u_,backgroundCube_vert:f_,backgroundCube_frag:p_,cube_vert:m_,cube_frag:g_,depth_vert:__,depth_frag:v_,distance_vert:x_,distance_frag:y_,equirect_vert:M_,equirect_frag:b_,linedashed_vert:S_,linedashed_frag:E_,meshbasic_vert:T_,meshbasic_frag:w_,meshlambert_vert:A_,meshlambert_frag:R_,meshmatcap_vert:C_,meshmatcap_frag:P_,meshnormal_vert:L_,meshnormal_frag:I_,meshphong_vert:D_,meshphong_frag:N_,meshphysical_vert:U_,meshphysical_frag:O_,meshtoon_vert:F_,meshtoon_frag:B_,points_vert:k_,points_frag:z_,shadow_vert:H_,shadow_frag:G_,sprite_vert:V_,sprite_frag:W_},ue={common:{diffuse:{value:new Ie(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Oe},alphaMap:{value:null},alphaMapTransform:{value:new Oe},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Oe}},envmap:{envMap:{value:null},envMapRotation:{value:new Oe},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Oe}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Oe}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Oe},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Oe},normalScale:{value:new _e(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Oe},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Oe}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Oe}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Oe}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Ie(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new P},probesMax:{value:new P},probesResolution:{value:new P}},points:{diffuse:{value:new Ie(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Oe},alphaTest:{value:0},uvTransform:{value:new Oe}},sprite:{diffuse:{value:new Ie(16777215)},opacity:{value:1},center:{value:new _e(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Oe},alphaMap:{value:null},alphaMapTransform:{value:new Oe},alphaTest:{value:0}}},An={basic:{uniforms:Vt([ue.common,ue.specularmap,ue.envmap,ue.aomap,ue.lightmap,ue.fog]),vertexShader:Ge.meshbasic_vert,fragmentShader:Ge.meshbasic_frag},lambert:{uniforms:Vt([ue.common,ue.specularmap,ue.envmap,ue.aomap,ue.lightmap,ue.emissivemap,ue.bumpmap,ue.normalmap,ue.displacementmap,ue.fog,ue.lights,{emissive:{value:new Ie(0)},envMapIntensity:{value:1}}]),vertexShader:Ge.meshlambert_vert,fragmentShader:Ge.meshlambert_frag},phong:{uniforms:Vt([ue.common,ue.specularmap,ue.envmap,ue.aomap,ue.lightmap,ue.emissivemap,ue.bumpmap,ue.normalmap,ue.displacementmap,ue.fog,ue.lights,{emissive:{value:new Ie(0)},specular:{value:new Ie(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:Ge.meshphong_vert,fragmentShader:Ge.meshphong_frag},standard:{uniforms:Vt([ue.common,ue.envmap,ue.aomap,ue.lightmap,ue.emissivemap,ue.bumpmap,ue.normalmap,ue.displacementmap,ue.roughnessmap,ue.metalnessmap,ue.fog,ue.lights,{emissive:{value:new Ie(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ge.meshphysical_vert,fragmentShader:Ge.meshphysical_frag},toon:{uniforms:Vt([ue.common,ue.aomap,ue.lightmap,ue.emissivemap,ue.bumpmap,ue.normalmap,ue.displacementmap,ue.gradientmap,ue.fog,ue.lights,{emissive:{value:new Ie(0)}}]),vertexShader:Ge.meshtoon_vert,fragmentShader:Ge.meshtoon_frag},matcap:{uniforms:Vt([ue.common,ue.bumpmap,ue.normalmap,ue.displacementmap,ue.fog,{matcap:{value:null}}]),vertexShader:Ge.meshmatcap_vert,fragmentShader:Ge.meshmatcap_frag},points:{uniforms:Vt([ue.points,ue.fog]),vertexShader:Ge.points_vert,fragmentShader:Ge.points_frag},dashed:{uniforms:Vt([ue.common,ue.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ge.linedashed_vert,fragmentShader:Ge.linedashed_frag},depth:{uniforms:Vt([ue.common,ue.displacementmap]),vertexShader:Ge.depth_vert,fragmentShader:Ge.depth_frag},normal:{uniforms:Vt([ue.common,ue.bumpmap,ue.normalmap,ue.displacementmap,{opacity:{value:1}}]),vertexShader:Ge.meshnormal_vert,fragmentShader:Ge.meshnormal_frag},sprite:{uniforms:Vt([ue.sprite,ue.fog]),vertexShader:Ge.sprite_vert,fragmentShader:Ge.sprite_frag},background:{uniforms:{uvTransform:{value:new Oe},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ge.background_vert,fragmentShader:Ge.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Oe}},vertexShader:Ge.backgroundCube_vert,fragmentShader:Ge.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ge.cube_vert,fragmentShader:Ge.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ge.equirect_vert,fragmentShader:Ge.equirect_frag},distance:{uniforms:Vt([ue.common,ue.displacementmap,{referencePosition:{value:new P},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ge.distance_vert,fragmentShader:Ge.distance_frag},shadow:{uniforms:Vt([ue.lights,ue.fog,{color:{value:new Ie(0)},opacity:{value:1}}]),vertexShader:Ge.shadow_vert,fragmentShader:Ge.shadow_frag}};An.physical={uniforms:Vt([An.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Oe},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Oe},clearcoatNormalScale:{value:new _e(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Oe},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Oe},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Oe},sheen:{value:0},sheenColor:{value:new Ie(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Oe},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Oe},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Oe},transmissionSamplerSize:{value:new _e},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Oe},attenuationDistance:{value:0},attenuationColor:{value:new Ie(0)},specularColor:{value:new Ie(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Oe},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Oe},anisotropyVector:{value:new _e},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Oe}}]),vertexShader:Ge.meshphysical_vert,fragmentShader:Ge.meshphysical_frag};const Ur={r:0,b:0,g:0},X_=new Be,zh=new Oe;zh.set(-1,0,0,0,1,0,0,0,1);function $_(s,e,t,n,i,r){const a=new Ie(0);let o=i===!0?0:1,l,c,d=null,h=0,u=null;function f(S){let T=S.isScene===!0?S.background:null;if(T&&T.isTexture){const _=S.backgroundBlurriness>0;T=e.get(T,_)}return T}function g(S){let T=!1;const _=f(S);_===null?p(a,o):_&&_.isColor&&(p(_,1),T=!0);const b=s.xr.getEnvironmentBlendMode();b==="additive"?t.buffers.color.setClear(0,0,0,1,r):b==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,r),(s.autoClear||T)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),s.clear(s.autoClearColor,s.autoClearDepth,s.autoClearStencil))}function y(S,T){const _=f(T);_&&(_.isCubeTexture||_.mapping===da)?(c===void 0&&(c=new yt(new ar(1,1,1),new kn({name:"BackgroundCubeMaterial",uniforms:_s(An.backgroundCube.uniforms),vertexShader:An.backgroundCube.vertexShader,fragmentShader:An.backgroundCube.fragmentShader,side:Yt,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(b,E,w){this.matrixWorld.copyPosition(w.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(c)),c.material.uniforms.envMap.value=_,c.material.uniforms.backgroundBlurriness.value=T.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=T.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(X_.makeRotationFromEuler(T.backgroundRotation)).transpose(),_.isCubeTexture&&_.isRenderTargetTexture===!1&&c.material.uniforms.backgroundRotation.value.premultiply(zh),c.material.toneMapped=qe.getTransfer(_.colorSpace)!==nt,(d!==_||h!==_.version||u!==s.toneMapping)&&(c.material.needsUpdate=!0,d=_,h=_.version,u=s.toneMapping),c.layers.enableAll(),S.unshift(c,c.geometry,c.material,0,0,null)):_&&_.isTexture&&(l===void 0&&(l=new yt(new ha(2,2),new kn({name:"BackgroundMaterial",uniforms:_s(An.background.uniforms),vertexShader:An.background.vertexShader,fragmentShader:An.background.fragmentShader,side:ni,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(l)),l.material.uniforms.t2D.value=_,l.material.uniforms.backgroundIntensity.value=T.backgroundIntensity,l.material.toneMapped=qe.getTransfer(_.colorSpace)!==nt,_.matrixAutoUpdate===!0&&_.updateMatrix(),l.material.uniforms.uvTransform.value.copy(_.matrix),(d!==_||h!==_.version||u!==s.toneMapping)&&(l.material.needsUpdate=!0,d=_,h=_.version,u=s.toneMapping),l.layers.enableAll(),S.unshift(l,l.geometry,l.material,0,0,null))}function p(S,T){S.getRGB(Ur,Nh(s)),t.buffers.color.setClear(Ur.r,Ur.g,Ur.b,T,r)}function m(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return a},setClearColor:function(S,T=1){a.set(S),o=T,p(a,o)},getClearAlpha:function(){return o},setClearAlpha:function(S){o=S,p(a,o)},render:g,addToRenderList:y,dispose:m}}function q_(s,e){const t=s.getParameter(s.MAX_VERTEX_ATTRIBS),n={},i=u(null);let r=i,a=!1;function o(L,B,V,O,G){let J=!1;const X=h(L,O,V,B);r!==X&&(r=X,c(r.object)),J=f(L,O,V,G),J&&g(L,O,V,G),G!==null&&e.update(G,s.ELEMENT_ARRAY_BUFFER),(J||a)&&(a=!1,_(L,B,V,O),G!==null&&s.bindBuffer(s.ELEMENT_ARRAY_BUFFER,e.get(G).buffer))}function l(){return s.createVertexArray()}function c(L){return s.bindVertexArray(L)}function d(L){return s.deleteVertexArray(L)}function h(L,B,V,O){const G=O.wireframe===!0;let J=n[B.id];J===void 0&&(J={},n[B.id]=J);const X=L.isInstancedMesh===!0?L.id:0;let ne=J[X];ne===void 0&&(ne={},J[X]=ne);let q=ne[V.id];q===void 0&&(q={},ne[V.id]=q);let Q=q[G];return Q===void 0&&(Q=u(l()),q[G]=Q),Q}function u(L){const B=[],V=[],O=[];for(let G=0;G<t;G++)B[G]=0,V[G]=0,O[G]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:B,enabledAttributes:V,attributeDivisors:O,object:L,attributes:{},index:null}}function f(L,B,V,O){const G=r.attributes,J=B.attributes;let X=0;const ne=V.getAttributes();for(const q in ne)if(ne[q].location>=0){const ee=G[q];let Pe=J[q];if(Pe===void 0&&(q==="instanceMatrix"&&L.instanceMatrix&&(Pe=L.instanceMatrix),q==="instanceColor"&&L.instanceColor&&(Pe=L.instanceColor)),ee===void 0||ee.attribute!==Pe||Pe&&ee.data!==Pe.data)return!0;X++}return r.attributesNum!==X||r.index!==O}function g(L,B,V,O){const G={},J=B.attributes;let X=0;const ne=V.getAttributes();for(const q in ne)if(ne[q].location>=0){let ee=J[q];ee===void 0&&(q==="instanceMatrix"&&L.instanceMatrix&&(ee=L.instanceMatrix),q==="instanceColor"&&L.instanceColor&&(ee=L.instanceColor));const Pe={};Pe.attribute=ee,ee&&ee.data&&(Pe.data=ee.data),G[q]=Pe,X++}r.attributes=G,r.attributesNum=X,r.index=O}function y(){const L=r.newAttributes;for(let B=0,V=L.length;B<V;B++)L[B]=0}function p(L){m(L,0)}function m(L,B){const V=r.newAttributes,O=r.enabledAttributes,G=r.attributeDivisors;V[L]=1,O[L]===0&&(s.enableVertexAttribArray(L),O[L]=1),G[L]!==B&&(s.vertexAttribDivisor(L,B),G[L]=B)}function S(){const L=r.newAttributes,B=r.enabledAttributes;for(let V=0,O=B.length;V<O;V++)B[V]!==L[V]&&(s.disableVertexAttribArray(V),B[V]=0)}function T(L,B,V,O,G,J,X){X===!0?s.vertexAttribIPointer(L,B,V,G,J):s.vertexAttribPointer(L,B,V,O,G,J)}function _(L,B,V,O){y();const G=O.attributes,J=V.getAttributes(),X=B.defaultAttributeValues;for(const ne in J){const q=J[ne];if(q.location>=0){let Q=G[ne];if(Q===void 0&&(ne==="instanceMatrix"&&L.instanceMatrix&&(Q=L.instanceMatrix),ne==="instanceColor"&&L.instanceColor&&(Q=L.instanceColor)),Q!==void 0){const ee=Q.normalized,Pe=Q.itemSize,Ee=e.get(Q);if(Ee===void 0)continue;const et=Ee.buffer,We=Ee.type,Ze=Ee.bytesPerElement,I=We===s.INT||We===s.UNSIGNED_INT||Q.gpuType===El;if(Q.isInterleavedBufferAttribute){const k=Q.data,ie=k.stride,ve=Q.offset;if(k.isInstancedInterleavedBuffer){for(let fe=0;fe<q.locationSize;fe++)m(q.location+fe,k.meshPerAttribute);L.isInstancedMesh!==!0&&O._maxInstanceCount===void 0&&(O._maxInstanceCount=k.meshPerAttribute*k.count)}else for(let fe=0;fe<q.locationSize;fe++)p(q.location+fe);s.bindBuffer(s.ARRAY_BUFFER,et);for(let fe=0;fe<q.locationSize;fe++)T(q.location+fe,Pe/q.locationSize,We,ee,ie*Ze,(ve+Pe/q.locationSize*fe)*Ze,I)}else{if(Q.isInstancedBufferAttribute){for(let k=0;k<q.locationSize;k++)m(q.location+k,Q.meshPerAttribute);L.isInstancedMesh!==!0&&O._maxInstanceCount===void 0&&(O._maxInstanceCount=Q.meshPerAttribute*Q.count)}else for(let k=0;k<q.locationSize;k++)p(q.location+k);s.bindBuffer(s.ARRAY_BUFFER,et);for(let k=0;k<q.locationSize;k++)T(q.location+k,Pe/q.locationSize,We,ee,Pe*Ze,Pe/q.locationSize*k*Ze,I)}}else if(X!==void 0){const ee=X[ne];if(ee!==void 0)switch(ee.length){case 2:s.vertexAttrib2fv(q.location,ee);break;case 3:s.vertexAttrib3fv(q.location,ee);break;case 4:s.vertexAttrib4fv(q.location,ee);break;default:s.vertexAttrib1fv(q.location,ee)}}}}S()}function b(){A();for(const L in n){const B=n[L];for(const V in B){const O=B[V];for(const G in O){const J=O[G];for(const X in J)d(J[X].object),delete J[X];delete O[G]}}delete n[L]}}function E(L){if(n[L.id]===void 0)return;const B=n[L.id];for(const V in B){const O=B[V];for(const G in O){const J=O[G];for(const X in J)d(J[X].object),delete J[X];delete O[G]}}delete n[L.id]}function w(L){for(const B in n){const V=n[B];for(const O in V){const G=V[O];if(G[L.id]===void 0)continue;const J=G[L.id];for(const X in J)d(J[X].object),delete J[X];delete G[L.id]}}}function v(L){for(const B in n){const V=n[B],O=L.isInstancedMesh===!0?L.id:0,G=V[O];if(G!==void 0){for(const J in G){const X=G[J];for(const ne in X)d(X[ne].object),delete X[ne];delete G[J]}delete V[O],Object.keys(V).length===0&&delete n[B]}}}function A(){C(),a=!0,r!==i&&(r=i,c(r.object))}function C(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:o,reset:A,resetDefaultState:C,dispose:b,releaseStatesOfGeometry:E,releaseStatesOfObject:v,releaseStatesOfProgram:w,initAttributes:y,enableAttribute:p,disableUnusedAttributes:S}}function K_(s,e,t){let n;function i(l){n=l}function r(l,c){s.drawArrays(n,l,c),t.update(c,n,1)}function a(l,c,d){d!==0&&(s.drawArraysInstanced(n,l,c,d),t.update(c,n,d))}function o(l,c,d){if(d===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,c,0,d);let u=0;for(let f=0;f<d;f++)u+=c[f];t.update(u,n,1)}this.setMode=i,this.render=r,this.renderInstances=a,this.renderMultiDraw=o}function Y_(s,e,t,n){let i;function r(){if(i!==void 0)return i;if(e.has("EXT_texture_filter_anisotropic")===!0){const w=e.get("EXT_texture_filter_anisotropic");i=s.getParameter(w.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function a(w){return!(w!==on&&n.convert(w)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(w){const v=w===Bn&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(w!==Qt&&w!==an&&!v&&n.convert(w)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_TYPE))}function l(w){if(w==="highp"){if(s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.HIGH_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.HIGH_FLOAT).precision>0)return"highp";w="mediump"}return w==="mediump"&&s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.MEDIUM_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp";const d=l(c);d!==c&&(Ae("WebGLRenderer:",c,"not supported, using",d,"instead."),c=d);const h=t.logarithmicDepthBuffer===!0,u=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control");t.reversedDepthBuffer===!0&&u===!1&&Ae("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");const f=s.getParameter(s.MAX_TEXTURE_IMAGE_UNITS),g=s.getParameter(s.MAX_VERTEX_TEXTURE_IMAGE_UNITS),y=s.getParameter(s.MAX_TEXTURE_SIZE),p=s.getParameter(s.MAX_CUBE_MAP_TEXTURE_SIZE),m=s.getParameter(s.MAX_VERTEX_ATTRIBS),S=s.getParameter(s.MAX_VERTEX_UNIFORM_VECTORS),T=s.getParameter(s.MAX_VARYING_VECTORS),_=s.getParameter(s.MAX_FRAGMENT_UNIFORM_VECTORS),b=s.getParameter(s.MAX_SAMPLES),E=s.getParameter(s.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:h,reversedDepthBuffer:u,maxTextures:f,maxVertexTextures:g,maxTextureSize:y,maxCubemapSize:p,maxAttributes:m,maxVertexUniforms:S,maxVaryings:T,maxFragmentUniforms:_,maxSamples:b,samples:E}}function Z_(s){const e=this;let t=null,n=0,i=!1,r=!1;const a=new Yn,o=new Oe,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(h,u){const f=h.length!==0||u||n!==0||i;return i=u,n=h.length,f},this.beginShadows=function(){r=!0,d(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(h,u){t=d(h,u,0)},this.setState=function(h,u,f){const g=h.clippingPlanes,y=h.clipIntersection,p=h.clipShadows,m=s.get(h);if(!i||g===null||g.length===0||r&&!p)r?d(null):c();else{const S=r?0:n,T=S*4;let _=m.clippingState||null;l.value=_,_=d(g,u,T,f);for(let b=0;b!==T;++b)_[b]=t[b];m.clippingState=_,this.numIntersection=y?this.numPlanes:0,this.numPlanes+=S}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function d(h,u,f,g){const y=h!==null?h.length:0;let p=null;if(y!==0){if(p=l.value,g!==!0||p===null){const m=f+y*4,S=u.matrixWorldInverse;o.getNormalMatrix(S),(p===null||p.length<m)&&(p=new Float32Array(m));for(let T=0,_=f;T!==y;++T,_+=4)a.copy(h[T]).applyMatrix4(S,o),a.normal.toArray(p,_),p[_+3]=a.constant}l.value=p,l.needsUpdate=!0}return e.numPlanes=y,e.numIntersection=0,p}}const rs=4,J_=6,j_=20,Q_=256,Ds=new fa,pd=new Ie;let eo=null,to=0,no=0,io=!1;const ev=new P,Li=new P;class md{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,n=.1,i=100,r={}){const{size:a=256,position:o=ev}=r;eo=this._renderer.getRenderTarget(),to=this._renderer.getActiveCubeFace(),no=this._renderer.getActiveMipmapLevel(),io=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);const l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,n,i,l,o),t>0&&this._blur(l,0,0,t),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=vd(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=_d(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(eo,to,no),this._renderer.xr.enabled=io,e.scissorTest=!1,es(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Ui||e.mapping===ps?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),eo=this._renderer.getRenderTarget(),to=this._renderer.getActiveCubeFace(),no=this._renderer.getActiveMipmapLevel(),io=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:Rt,minFilter:Rt,generateMipmaps:!1,type:Bn,format:on,colorSpace:en,depthBuffer:!1},i=gd(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=gd(e,t,n);const{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods}=tv(r)),this._blurMaterial=iv(r,e,t),this._ggxMaterial=nv(r,e,t)}return i}_compileMaterial(e){const t=new yt(new Ct,e);this._renderer.compile(t,Ds)}_sceneToCubeUV(e,t,n,i,r){const l=new Wt(90,1,t,n),c=[1,-1,1,1,1,1],d=[1,1,1,-1,-1,-1],h=this._renderer,u=h.autoClear,f=h.toneMapping;h.getClearColor(pd),h.toneMapping=Dn,h.autoClear=!1,h.state.buffers.depth.getReversed()&&(h.setRenderTarget(i),h.clearDepth(),h.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new yt(new ar,new In({name:"PMREM.Background",side:Yt,depthWrite:!1,depthTest:!1})));const y=this._backgroundBox,p=y.material;let m=!1;const S=e.background;S?S.isColor&&(p.color.copy(S),e.background=null,m=!0):(p.color.copy(pd),m=!0);for(let T=0;T<6;T++){const _=T%3;_===0?(l.up.set(0,c[T],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x+d[T],r.y,r.z)):_===1?(l.up.set(0,0,c[T]),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y+d[T],r.z)):(l.up.set(0,c[T],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y,r.z+d[T]));const b=this._cubeSize;es(i,_*b,T>2?b:0,b,b),h.setRenderTarget(i),m&&h.render(y,l),h.render(e,l)}h.toneMapping=f,h.autoClear=u,e.background=S}_textureToCubeUV(e,t){const n=this._renderer,i=e.mapping===Ui||e.mapping===ps;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=vd()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=_d());const r=i?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=r;const o=r.uniforms;o.envMap.value=e;const l=this._cubeSize;es(t,0,0,3*l,2*l),n.setRenderTarget(t),n.render(a,Ds)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;const i=this._lodMeshes.length;for(let r=1;r<i;r++)this._applyGGXFilter(e,r-1,r);t.autoClear=n}_applyGGXFilter(e,t,n){const i=this._renderer,r=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[n];o.material=a;const l=a.uniforms,c=n/(this._lodMeshes.length-1),d=t/(this._lodMeshes.length-1),h=Math.sqrt(c*c-d*d),u=c*1.25,f=h*u,{_lodMax:g}=this,y=this._sizeLods[n],p=3*y*(n>g-rs?n-g+rs:0),m=4*(this._cubeSize-y);l.envMap.value=e.texture,l.roughness.value=f,l.mipInt.value=g-t,es(r,p,m,3*y,2*y),i.setRenderTarget(r),i.render(o,Ds),l.envMap.value=r.texture,l.roughness.value=0,l.mipInt.value=g-n,es(e,p,m,3*y,2*y),i.setRenderTarget(e),i.render(o,Ds)}_blur(e,t,n,i){const r=this._pingPongRenderTarget,a=Math.min(i,Math.PI)/Math.SQRT2;this._blurPass(e,r,t,n,a),this._blurPass(r,e,n,n,a)}_blurPass(e,t,n,i,r){const a=this._renderer,o=this._blurMaterial,l=this._lodMeshes[i];l.material=o;const c=o.uniforms;c.envMap.value=e.texture,c.sigma.value=r,c.mipInt.value=this._lodMax-n;const d=this._sizeLods[i],h=3*d*(i>this._lodMax-rs?i-this._lodMax+rs:0),u=4*(this._cubeSize-d);es(t,h,u,3*d,2*d),a.setRenderTarget(t),a.render(l,Ds)}}function tv(s){const e=[],t=[];let n=s;const i=s-rs+1+J_;for(let r=0;r<i;r++){const a=Math.pow(2,n);e.push(a);const o=1/(a-2),l=-o,c=1+o,d=[l,l,c,l,c,c,l,l,c,c,l,c],h=6,u=6,f=3,g=new Float32Array(f*u*h),y=new Float32Array(f*u*h);for(let m=0;m<h;m++){const S=m%3*2/3-1,T=m>2?0:-1,_=[S,T,0,S+2/3,T,0,S+2/3,T+1,0,S,T,0,S+2/3,T+1,0,S,T+1,0];g.set(_,f*u*m);for(let b=0;b<u;b++){const E=d[b*2]*2-1,w=d[b*2+1]*2-1;m===0?Li.set(1,w,E):m===1?Li.set(-E,1,-w):m===2?Li.set(-E,w,1):m===3?Li.set(-1,w,-E):m===4?Li.set(-E,-1,w):Li.set(E,w,-1),Li.toArray(y,(m*u+b)*f)}}const p=new Ct;p.setAttribute("position",new Zt(g,f)),p.setAttribute("outputDirection",new Zt(y,f)),t.push(new yt(p,null)),n>rs&&n--}return{lodMeshes:t,sizeLods:e}}function gd(s,e,t){const n=new vn(s,e,t);return n.texture.mapping=da,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function es(s,e,t,n,i){s.viewport.set(e,t,n,i),s.scissor.set(e,t,n,i)}function nv(s,e,t){return new kn({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:Q_,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${s}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:pa(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 4.1: Orthonormal basis
				vec3 T1 = vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(V, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + V.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * V;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:Qn,depthTest:!1,depthWrite:!1})}function iv(s,e,t){return new kn({name:"SphericalGaussianBlur",defines:{SAMPLES:j_,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${s}.0`},uniforms:{envMap:{value:null},sigma:{value:0},mipInt:{value:0}},vertexShader:pa(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float sigma;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359
			#define GOLDEN_ANGLE 2.39996322973

			void main() {

				if ( sigma == 0.0 ) {

					gl_FragColor = vec4( bilinearCubeUV( envMap, vOutputDirection, mipInt ), 1.0 );
					return;

				}

				vec3 outputDirection = normalize( vOutputDirection );

				vec3 up = abs( outputDirection.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
				vec3 tangent = normalize( cross( up, outputDirection ) );
				vec3 bitangent = cross( outputDirection, tangent );

				// Truncate the kernel at three standard deviations or at the antipode.
				float thetaMax = min( 3.0 * sigma, PI );
				float truncation = 1.0 - exp( - 0.5 * thetaMax * thetaMax / ( sigma * sigma ) );

				vec3 accumColor = vec3( 0.0 );
				float accumWeight = 0.0;

				for ( int i = 0; i < SAMPLES; i ++ ) {

					// Stratified inverse-CDF sampling of the Gaussian, placed on a golden-angle spiral.
					float stratum = ( float( i ) + 0.5 ) / float( SAMPLES );
					float theta = sigma * sqrt( - 2.0 * log( 1.0 - stratum * truncation ) );
					float phi = float( i ) * GOLDEN_ANGLE;

					vec3 offset = cos( phi ) * tangent + sin( phi ) * bitangent;
					vec3 sampleDirection = cos( theta ) * outputDirection + sin( theta ) * offset;

					// Correct the planar sample density to solid angle.
					float weight = sin( theta ) / theta;

					accumColor += weight * bilinearCubeUV( envMap, sampleDirection, mipInt );
					accumWeight += weight;

				}

				gl_FragColor = vec4( accumColor / accumWeight, 1.0 );

			}
		`,blending:Qn,depthTest:!1,depthWrite:!1})}function _d(){return new kn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:pa(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Qn,depthTest:!1,depthWrite:!1})}function vd(){return new kn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:pa(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Qn,depthTest:!1,depthWrite:!1})}function pa(){return`

		precision mediump float;
		precision mediump int;

		attribute vec3 outputDirection;

		varying vec3 vOutputDirection;

		void main() {

			vOutputDirection = outputDirection;
			gl_Position = vec4( position, 1.0 );

		}
	`}class Hh extends vn{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},i=[n,n,n,n,n,n];this.texture=new Ph(i),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},i=new ar(5,5,5),r=new kn({name:"CubemapFromEquirect",uniforms:_s(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Yt,blending:Qn});r.uniforms.tEquirect.value=t;const a=new yt(i,r),o=t.minFilter;return t.minFilter===Zn&&(t.minFilter=Rt),new Zp(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,n=!0,i=!0){const r=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,n,i);e.setRenderTarget(r)}}function sv(s){let e=new WeakMap,t=new WeakMap,n=null;function i(u,f=!1){return u==null?null:f?a(u):r(u)}function r(u){if(u&&u.isTexture){const f=u.mapping;if(f===ba||f===Sa)if(e.has(u)){const g=e.get(u).texture;return o(g,u.mapping)}else{const g=u.image;if(g&&g.height>0){const y=new Hh(g.height);return y.fromEquirectangularTexture(s,u),e.set(u,y),u.addEventListener("dispose",c),o(y.texture,u.mapping)}else return null}}return u}function a(u){if(u&&u.isTexture){const f=u.mapping,g=f===ba||f===Sa,y=f===Ui||f===ps;if(g||y){let p=t.get(u);const m=p!==void 0?p.texture.pmremVersion:0;if(u.isRenderTargetTexture&&u.pmremVersion!==m)return n===null&&(n=new md(s)),p=g?n.fromEquirectangular(u,p):n.fromCubemap(u,p),p.texture.pmremVersion=u.pmremVersion,t.set(u,p),p.texture;if(p!==void 0)return p.texture;{const S=u.image;return g&&S&&S.height>0||y&&S&&l(S)?(n===null&&(n=new md(s)),p=g?n.fromEquirectangular(u):n.fromCubemap(u),p.texture.pmremVersion=u.pmremVersion,t.set(u,p),u.addEventListener("dispose",d),p.texture):null}}}return u}function o(u,f){return f===ba?u.mapping=Ui:f===Sa&&(u.mapping=ps),u}function l(u){let f=0;const g=6;for(let y=0;y<g;y++)u[y]!==void 0&&f++;return f===g}function c(u){const f=u.target;f.removeEventListener("dispose",c);const g=e.get(f);g!==void 0&&(e.delete(f),g.dispose())}function d(u){const f=u.target;f.removeEventListener("dispose",d);const g=t.get(f);g!==void 0&&(t.delete(f),g.dispose())}function h(){e=new WeakMap,t=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:i,dispose:h}}function rv(s){const e={};function t(n){if(e[n]!==void 0)return e[n];const i=s.getExtension(n);return e[n]=i,i}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){const i=t(n);return i===null&&ls("WebGLRenderer: "+n+" extension not supported."),i}}}function av(s,e,t,n){const i={},r=new WeakMap;function a(h){const u=h.target;u.index!==null&&e.remove(u.index);for(const g in u.attributes)e.remove(u.attributes[g]);u.removeEventListener("dispose",a),delete i[u.id];const f=r.get(u);f&&(e.remove(f),r.delete(u)),n.releaseStatesOfGeometry(u),u.isInstancedBufferGeometry===!0&&delete u._maxInstanceCount,t.memory.geometries--}function o(h,u){return i[u.id]===!0||(u.addEventListener("dispose",a),i[u.id]=!0,t.memory.geometries++),u}function l(h){const u=h.attributes;for(const f in u)e.update(u[f],s.ARRAY_BUFFER)}function c(h){const u=[],f=h.index,g=h.attributes.position;let y=0;if(g===void 0)return;if(f!==null){const S=f.array;y=f.version;for(let T=0,_=S.length;T<_;T+=3){const b=S[T+0],E=S[T+1],w=S[T+2];u.push(b,E,E,w,w,b)}}else{const S=g.array;y=g.version;for(let T=0,_=S.length/3-1;T<_;T+=3){const b=T+0,E=T+1,w=T+2;u.push(b,E,E,w,w,b)}}const p=new(g.count>=65535?Ah:wh)(u,1);p.version=y;const m=r.get(h);m&&e.remove(m),r.set(h,p)}function d(h){const u=r.get(h);if(u){const f=h.index;f!==null&&u.version<f.version&&c(h)}else c(h);return r.get(h)}return{get:o,update:l,getWireframeAttribute:d}}function ov(s,e,t){let n;function i(h){n=h}let r,a;function o(h){r=h.type,a=h.bytesPerElement}function l(h,u){s.drawElements(n,u,r,h*a),t.update(u,n,1)}function c(h,u,f){f!==0&&(s.drawElementsInstanced(n,u,r,h*a,f),t.update(u,n,f))}function d(h,u,f){if(f===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,u,0,r,h,0,f);let y=0;for(let p=0;p<f;p++)y+=u[p];t.update(y,n,1)}this.setMode=i,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=d}function lv(s){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,a,o){switch(t.calls++,a){case s.TRIANGLES:t.triangles+=o*(r/3);break;case s.LINES:t.lines+=o*(r/2);break;case s.LINE_STRIP:t.lines+=o*(r-1);break;case s.LINE_LOOP:t.lines+=o*r;break;case s.POINTS:t.points+=o*r;break;default:Ne("WebGLInfo: Unknown draw mode:",a);break}}function i(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:i,update:n}}function cv(s,e,t){const n=new WeakMap,i=new lt;function r(a,o,l){const c=a.morphTargetInfluences,d=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,h=d!==void 0?d.length:0;let u=n.get(o);if(u===void 0||u.count!==h){let C=function(){v.dispose(),n.delete(o),o.removeEventListener("dispose",C)};var f=C;u!==void 0&&u.texture.dispose();const g=o.morphAttributes.position!==void 0,y=o.morphAttributes.normal!==void 0,p=o.morphAttributes.color!==void 0,m=o.morphAttributes.position||[],S=o.morphAttributes.normal||[],T=o.morphAttributes.color||[];let _=0;g===!0&&(_=1),y===!0&&(_=2),p===!0&&(_=3);let b=o.attributes.position.count*_,E=1;b>e.maxTextureSize&&(E=Math.ceil(b/e.maxTextureSize),b=e.maxTextureSize);const w=new Float32Array(b*E*4*h),v=new Eh(w,b,E,h);v.type=an,v.needsUpdate=!0;const A=_*4;for(let L=0;L<h;L++){const B=m[L],V=S[L],O=T[L],G=b*E*4*L;for(let J=0;J<B.count;J++){const X=J*A;g===!0&&(i.fromBufferAttribute(B,J),w[G+X+0]=i.x,w[G+X+1]=i.y,w[G+X+2]=i.z,w[G+X+3]=0),y===!0&&(i.fromBufferAttribute(V,J),w[G+X+4]=i.x,w[G+X+5]=i.y,w[G+X+6]=i.z,w[G+X+7]=0),p===!0&&(i.fromBufferAttribute(O,J),w[G+X+8]=i.x,w[G+X+9]=i.y,w[G+X+10]=i.z,w[G+X+11]=O.itemSize===4?i.w:1)}}u={count:h,texture:v,size:new _e(b,E)},n.set(o,u),o.addEventListener("dispose",C)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(s,"morphTexture",a.morphTexture,t);else{let g=0;for(let p=0;p<c.length;p++)g+=c[p];const y=o.morphTargetsRelative?1:1-g;l.getUniforms().setValue(s,"morphTargetBaseInfluence",y),l.getUniforms().setValue(s,"morphTargetInfluences",c)}l.getUniforms().setValue(s,"morphTargetsTexture",u.texture,t),l.getUniforms().setValue(s,"morphTargetsTextureSize",u.size)}return{update:r}}function dv(s,e,t,n,i){let r=new WeakMap;function a(c){const d=i.render.frame,h=c.geometry,u=e.get(c,h);if(r.get(u)!==d&&(e.update(u),r.set(u,d)),c.isInstancedMesh&&(c.hasEventListener("dispose",l)===!1&&c.addEventListener("dispose",l),r.get(c)!==d&&(t.update(c.instanceMatrix,s.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,s.ARRAY_BUFFER),r.set(c,d))),c.isSkinnedMesh){const f=c.skeleton;r.get(f)!==d&&(f.update(),r.set(f,d))}return u}function o(){r=new WeakMap}function l(c){const d=c.target;d.removeEventListener("dispose",l),n.releaseStatesOfObject(d),t.remove(d.instanceMatrix),d.instanceColor!==null&&t.remove(d.instanceColor)}return{update:a,dispose:o}}const hv={[ah]:"LINEAR_TONE_MAPPING",[oh]:"REINHARD_TONE_MAPPING",[lh]:"CINEON_TONE_MAPPING",[Sl]:"ACES_FILMIC_TONE_MAPPING",[dh]:"AGX_TONE_MAPPING",[hh]:"NEUTRAL_TONE_MAPPING",[ch]:"CUSTOM_TONE_MAPPING"};function uv(s,e,t,n,i,r){const a=new vn(e,t,{type:s,depthBuffer:i,stencilBuffer:r,samples:n?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1});let o=null,l=null;const c=new Ct;c.setAttribute("position",new _t([-1,3,0,-1,-1,0,3,-1,0],3)),c.setAttribute("uv",new _t([0,2,0,0,2,0],2));const d=new Sp({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),h=new yt(c,d),u=new fa(-1,1,1,-1,0,1);let f=null,g=null,y=!1,p,m=null,S=[],T=!1;this.setSize=function(_,b){a.setSize(_,b),o!==null&&o.setSize(_,b),l!==null&&l.setSize(_,b);for(let E=0;E<S.length;E++){const w=S[E];w.setSize&&w.setSize(_,b)}},this.setEffects=function(_){S=_,T=S.length>0&&S[0].isRenderPass===!0;const b=a.width,E=a.height;S.length>0&&o===null&&(o=new vn(b,E,{type:Bn,depthBuffer:!1,stencilBuffer:!1}),l=new vn(b,E,{type:Bn,depthBuffer:!1,stencilBuffer:!1}));for(let w=0;w<S.length;w++){const v=S[w];v.setSize&&v.setSize(b,E)}},this.begin=function(_,b){if(y||_.toneMapping===Dn&&S.length===0)return!1;if(m=b,b!==null){const E=b.width,w=b.height;(a.width!==E||a.height!==w)&&this.setSize(E,w)}return T===!1&&_.setRenderTarget(a),p=_.toneMapping,_.toneMapping=Dn,!0},this.hasRenderPass=function(){return T},this.end=function(_,b){_.toneMapping=p,y=!0;let E=a,w=o;for(let v=0;v<S.length;v++){const A=S[v];A.enabled!==!1&&(A.render(_,w,E,b),A.needsSwap!==!1&&(E=w,w=w===o?l:o))}if(f!==_.outputColorSpace||g!==_.toneMapping){f=_.outputColorSpace,g=_.toneMapping,d.defines={},qe.getTransfer(f)===nt&&(d.defines.SRGB_TRANSFER="");const v=hv[g];v&&(d.defines[v]=""),d.needsUpdate=!0}d.uniforms.tDiffuse.value=E.texture,_.setRenderTarget(m),_.render(h,u),m=null,y=!1},this.isCompositing=function(){return y},this.dispose=function(){a.dispose(),o!==null&&o.dispose(),l!==null&&l.dispose(),c.dispose(),d.dispose()}}const Gh=new Ut,cl=new er(1,1),Vh=new Eh,Wh=new Lf,Xh=new Ph,xd=[],yd=[],Md=new Float32Array(16),bd=new Float32Array(9),Sd=new Float32Array(4);function Es(s,e,t){const n=s[0];if(n<=0||n>0)return s;const i=e*t;let r=xd[i];if(r===void 0&&(r=new Float32Array(i),xd[i]=r),e!==0){n.toArray(r,0);for(let a=1,o=0;a!==e;++a)o+=t,s[a].toArray(r,o)}return r}function Pt(s,e){if(s.length!==e.length)return!1;for(let t=0,n=s.length;t<n;t++)if(s[t]!==e[t])return!1;return!0}function Lt(s,e){for(let t=0,n=e.length;t<n;t++)s[t]=e[t]}function ma(s,e){let t=yd[e];t===void 0&&(t=new Int32Array(e),yd[e]=t);for(let n=0;n!==e;++n)t[n]=s.allocateTextureUnit();return t}function fv(s,e){const t=this.cache;t[0]!==e&&(s.uniform1f(this.addr,e),t[0]=e)}function pv(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Pt(t,e))return;s.uniform2fv(this.addr,e),Lt(t,e)}}function mv(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(s.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Pt(t,e))return;s.uniform3fv(this.addr,e),Lt(t,e)}}function gv(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Pt(t,e))return;s.uniform4fv(this.addr,e),Lt(t,e)}}function _v(s,e){const t=this.cache,n=e.elements;if(n===void 0){if(Pt(t,e))return;s.uniformMatrix2fv(this.addr,!1,e),Lt(t,e)}else{if(Pt(t,n))return;Sd.set(n),s.uniformMatrix2fv(this.addr,!1,Sd),Lt(t,n)}}function vv(s,e){const t=this.cache,n=e.elements;if(n===void 0){if(Pt(t,e))return;s.uniformMatrix3fv(this.addr,!1,e),Lt(t,e)}else{if(Pt(t,n))return;bd.set(n),s.uniformMatrix3fv(this.addr,!1,bd),Lt(t,n)}}function xv(s,e){const t=this.cache,n=e.elements;if(n===void 0){if(Pt(t,e))return;s.uniformMatrix4fv(this.addr,!1,e),Lt(t,e)}else{if(Pt(t,n))return;Md.set(n),s.uniformMatrix4fv(this.addr,!1,Md),Lt(t,n)}}function yv(s,e){const t=this.cache;t[0]!==e&&(s.uniform1i(this.addr,e),t[0]=e)}function Mv(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Pt(t,e))return;s.uniform2iv(this.addr,e),Lt(t,e)}}function bv(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Pt(t,e))return;s.uniform3iv(this.addr,e),Lt(t,e)}}function Sv(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Pt(t,e))return;s.uniform4iv(this.addr,e),Lt(t,e)}}function Ev(s,e){const t=this.cache;t[0]!==e&&(s.uniform1ui(this.addr,e),t[0]=e)}function Tv(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Pt(t,e))return;s.uniform2uiv(this.addr,e),Lt(t,e)}}function wv(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Pt(t,e))return;s.uniform3uiv(this.addr,e),Lt(t,e)}}function Av(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Pt(t,e))return;s.uniform4uiv(this.addr,e),Lt(t,e)}}function Rv(s,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i);let r;this.type===s.SAMPLER_2D_SHADOW?(cl.compareFunction=t.isReversedDepthBuffer()?Il:Ll,r=cl):r=Gh,t.setTexture2D(e||r,i)}function Cv(s,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),t.setTexture3D(e||Wh,i)}function Pv(s,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),t.setTextureCube(e||Xh,i)}function Lv(s,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),t.setTexture2DArray(e||Vh,i)}function Iv(s){switch(s){case 5126:return fv;case 35664:return pv;case 35665:return mv;case 35666:return gv;case 35674:return _v;case 35675:return vv;case 35676:return xv;case 5124:case 35670:return yv;case 35667:case 35671:return Mv;case 35668:case 35672:return bv;case 35669:case 35673:return Sv;case 5125:return Ev;case 36294:return Tv;case 36295:return wv;case 36296:return Av;case 35678:case 36198:case 36298:case 36306:case 35682:return Rv;case 35679:case 36299:case 36307:return Cv;case 35680:case 36300:case 36308:case 36293:return Pv;case 36289:case 36303:case 36311:case 36292:return Lv}}function Dv(s,e){s.uniform1fv(this.addr,e)}function Nv(s,e){const t=Es(e,this.size,2);s.uniform2fv(this.addr,t)}function Uv(s,e){const t=Es(e,this.size,3);s.uniform3fv(this.addr,t)}function Ov(s,e){const t=Es(e,this.size,4);s.uniform4fv(this.addr,t)}function Fv(s,e){const t=Es(e,this.size,4);s.uniformMatrix2fv(this.addr,!1,t)}function Bv(s,e){const t=Es(e,this.size,9);s.uniformMatrix3fv(this.addr,!1,t)}function kv(s,e){const t=Es(e,this.size,16);s.uniformMatrix4fv(this.addr,!1,t)}function zv(s,e){s.uniform1iv(this.addr,e)}function Hv(s,e){s.uniform2iv(this.addr,e)}function Gv(s,e){s.uniform3iv(this.addr,e)}function Vv(s,e){s.uniform4iv(this.addr,e)}function Wv(s,e){s.uniform1uiv(this.addr,e)}function Xv(s,e){s.uniform2uiv(this.addr,e)}function $v(s,e){s.uniform3uiv(this.addr,e)}function qv(s,e){s.uniform4uiv(this.addr,e)}function Kv(s,e,t){const n=this.cache,i=e.length,r=ma(t,i);Pt(n,r)||(s.uniform1iv(this.addr,r),Lt(n,r));let a;this.type===s.SAMPLER_2D_SHADOW?a=cl:a=Gh;for(let o=0;o!==i;++o)t.setTexture2D(e[o]||a,r[o])}function Yv(s,e,t){const n=this.cache,i=e.length,r=ma(t,i);Pt(n,r)||(s.uniform1iv(this.addr,r),Lt(n,r));for(let a=0;a!==i;++a)t.setTexture3D(e[a]||Wh,r[a])}function Zv(s,e,t){const n=this.cache,i=e.length,r=ma(t,i);Pt(n,r)||(s.uniform1iv(this.addr,r),Lt(n,r));for(let a=0;a!==i;++a)t.setTextureCube(e[a]||Xh,r[a])}function Jv(s,e,t){const n=this.cache,i=e.length,r=ma(t,i);Pt(n,r)||(s.uniform1iv(this.addr,r),Lt(n,r));for(let a=0;a!==i;++a)t.setTexture2DArray(e[a]||Vh,r[a])}function jv(s){switch(s){case 5126:return Dv;case 35664:return Nv;case 35665:return Uv;case 35666:return Ov;case 35674:return Fv;case 35675:return Bv;case 35676:return kv;case 5124:case 35670:return zv;case 35667:case 35671:return Hv;case 35668:case 35672:return Gv;case 35669:case 35673:return Vv;case 5125:return Wv;case 36294:return Xv;case 36295:return $v;case 36296:return qv;case 35678:case 36198:case 36298:case 36306:case 35682:return Kv;case 35679:case 36299:case 36307:return Yv;case 35680:case 36300:case 36308:case 36293:return Zv;case 36289:case 36303:case 36311:case 36292:return Jv}}class Qv{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=Iv(t.type)}}class e0{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=jv(t.type)}}class t0{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const i=this.seq;for(let r=0,a=i.length;r!==a;++r){const o=i[r];o.setValue(e,t[o.id],n)}}}const so=/(\w+)(\])?(\[|\.)?/g;function Ed(s,e){s.seq.push(e),s.map[e.id]=e}function n0(s,e,t){const n=s.name,i=n.length;for(so.lastIndex=0;;){const r=so.exec(n),a=so.lastIndex;let o=r[1];const l=r[2]==="]",c=r[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===i){Ed(t,c===void 0?new Qv(o,s,e):new e0(o,s,e));break}else{let h=t.map[o];h===void 0&&(h=new t0(o),Ed(t,h)),t=h}}}class qr{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let a=0;a<n;++a){const o=e.getActiveUniform(t,a),l=e.getUniformLocation(t,o.name);n0(o,l,this)}const i=[],r=[];for(const a of this.seq)a.type===e.SAMPLER_2D_SHADOW||a.type===e.SAMPLER_CUBE_SHADOW||a.type===e.SAMPLER_2D_ARRAY_SHADOW?i.push(a):r.push(a);i.length>0&&(this.seq=i.concat(r))}setValue(e,t,n,i){const r=this.map[t];r!==void 0&&r.setValue(e,n,i)}setOptional(e,t,n){const i=t[n];i!==void 0&&this.setValue(e,n,i)}static upload(e,t,n,i){for(let r=0,a=t.length;r!==a;++r){const o=t[r],l=n[o.id];l.needsUpdate!==!1&&o.setValue(e,l.value,i)}}static seqWithValue(e,t){const n=[];for(let i=0,r=e.length;i!==r;++i){const a=e[i];a.id in t&&n.push(a)}return n}}function Td(s,e,t){const n=s.createShader(e);return s.shaderSource(n,t),s.compileShader(n),n}const i0=37297;let s0=0;function r0(s,e){const t=s.split(`
`),n=[],i=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let a=i;a<r;a++){const o=a+1;n.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return n.join(`
`)}const wd=new Oe;function a0(s){qe._getMatrix(wd,qe.workingColorSpace,s);const e=`mat3( ${wd.elements.map(t=>t.toFixed(4))} )`;switch(qe.getTransfer(s)){case Qr:return[e,"LinearTransferOETF"];case nt:return[e,"sRGBTransferOETF"];default:return Ae("WebGLProgram: Unsupported color space: ",s),[e,"LinearTransferOETF"]}}function Ad(s,e,t){const n=s.getShaderParameter(e,s.COMPILE_STATUS),r=(s.getShaderInfoLog(e)||"").trim();if(n&&r==="")return"";const a=/ERROR: 0:(\d+)/.exec(r);if(a){const o=parseInt(a[1]);return t.toUpperCase()+`

`+r+`

`+r0(s.getShaderSource(e),o)}else return r}function o0(s,e){const t=a0(e);return[`vec4 ${s}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}const l0={[ah]:"Linear",[oh]:"Reinhard",[lh]:"Cineon",[Sl]:"ACESFilmic",[dh]:"AgX",[hh]:"Neutral",[ch]:"Custom"};function c0(s,e){const t=l0[e];return t===void 0?(Ae("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+s+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+s+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const Or=new P;function d0(){qe.getLuminanceCoefficients(Or);const s=Or.x.toFixed(4),e=Or.y.toFixed(4),t=Or.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${s}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function h0(s){return[s.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",s.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Bs).join(`
`)}function u0(s){const e=[];for(const t in s){const n=s[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function f0(s,e){const t={},n=s.getProgramParameter(e,s.ACTIVE_ATTRIBUTES);for(let i=0;i<n;i++){const r=s.getActiveAttrib(e,i),a=r.name;let o=1;r.type===s.FLOAT_MAT2&&(o=2),r.type===s.FLOAT_MAT3&&(o=3),r.type===s.FLOAT_MAT4&&(o=4),t[a]={type:r.type,location:s.getAttribLocation(e,a),locationSize:o}}return t}function Bs(s){return s!==""}function Rd(s,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return s.replace(/NUM_SUN_LIGHTS/g,e.numSunLights).replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,e.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Cd(s,e){return s.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const p0=/^[ \t]*#include +<([\w\d./]+)>/gm;function dl(s){return s.replace(p0,g0)}const m0=new Map;function g0(s,e){let t=Ge[e];if(t===void 0){const n=m0.get(e);if(n!==void 0)t=Ge[n],Ae('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+e+">")}return dl(t)}const _0=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Pd(s){return s.replace(_0,v0)}function v0(s,e,t,n){let i="";for(let r=parseInt(e);r<parseInt(t);r++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return i}function Ld(s){let e=`precision ${s.precision} float;
	precision ${s.precision} int;
	precision ${s.precision} sampler2D;
	precision ${s.precision} samplerCube;
	precision ${s.precision} sampler3D;
	precision ${s.precision} sampler2DArray;
	precision ${s.precision} sampler2DShadow;
	precision ${s.precision} samplerCubeShadow;
	precision ${s.precision} sampler2DArrayShadow;
	precision ${s.precision} isampler2D;
	precision ${s.precision} isampler3D;
	precision ${s.precision} isamplerCube;
	precision ${s.precision} isampler2DArray;
	precision ${s.precision} usampler2D;
	precision ${s.precision} usampler3D;
	precision ${s.precision} usamplerCube;
	precision ${s.precision} usampler2DArray;
	`;return s.precision==="highp"?e+=`
#define HIGH_PRECISION`:s.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:s.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}const x0={[kr]:"SHADOWMAP_TYPE_PCF",[Os]:"SHADOWMAP_TYPE_VSM"};function y0(s){return x0[s.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const M0={[Ui]:"ENVMAP_TYPE_CUBE",[ps]:"ENVMAP_TYPE_CUBE",[da]:"ENVMAP_TYPE_CUBE_UV"};function b0(s){return s.envMap===!1?"ENVMAP_TYPE_CUBE":M0[s.envMapMode]||"ENVMAP_TYPE_CUBE"}const S0={[ps]:"ENVMAP_MODE_REFRACTION"};function E0(s){return s.envMap===!1?"ENVMAP_MODE_REFLECTION":S0[s.envMapMode]||"ENVMAP_MODE_REFLECTION"}const T0={[rh]:"ENVMAP_BLENDING_MULTIPLY",[Wu]:"ENVMAP_BLENDING_MIX",[Xu]:"ENVMAP_BLENDING_ADD"};function w0(s){return s.envMap===!1?"ENVMAP_BLENDING_NONE":T0[s.combine]||"ENVMAP_BLENDING_NONE"}function A0(s){const e=s.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),7*16)),texelHeight:n,maxMip:t}}function R0(s,e,t,n){const i=s.getContext(),r=t.defines;let a=t.vertexShader,o=t.fragmentShader;const l=y0(t),c=b0(t),d=E0(t),h=w0(t),u=A0(t),f=h0(t),g=u0(r),y=i.createProgram();let p,m,S=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(Bs).join(`
`),p.length>0&&(p+=`
`),m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(Bs).join(`
`),m.length>0&&(m+=`
`)):(p=[Ld(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+d:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexNormals?"#define HAS_NORMAL":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Bs).join(`
`),m=[Ld(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+d:"",t.envMap?"#define "+h:"",u?"#define CUBEUV_TEXEL_WIDTH "+u.texelWidth:"",u?"#define CUBEUV_TEXEL_HEIGHT "+u.texelHeight:"",u?"#define CUBEUV_MAX_MIP "+u.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.retroreflection?"#define USE_RETROREFLECTION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Dn?"#define TONE_MAPPING":"",t.toneMapping!==Dn?Ge.tonemapping_pars_fragment:"",t.toneMapping!==Dn?c0("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Ge.colorspace_pars_fragment,o0("linearToOutputTexel",t.outputColorSpace),d0(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Bs).join(`
`)),a=dl(a),a=Rd(a,t),a=Cd(a,t),o=dl(o),o=Rd(o,t),o=Cd(o,t),a=Pd(a),o=Pd(o),t.isRawShaderMaterial!==!0&&(S=`#version 300 es
`,p=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+p,m=["#define varying in",t.glslVersion===bc?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===bc?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+m);const T=S+p+a,_=S+m+o,b=Td(i,i.VERTEX_SHADER,T),E=Td(i,i.FRAGMENT_SHADER,_);i.attachShader(y,b),i.attachShader(y,E),t.index0AttributeName!==void 0?i.bindAttribLocation(y,0,t.index0AttributeName):t.hasPositionAttribute===!0&&i.bindAttribLocation(y,0,"position"),i.linkProgram(y);function w(L){if(s.debug.checkShaderErrors){const B=i.getProgramInfoLog(y)||"",V=i.getShaderInfoLog(b)||"",O=i.getShaderInfoLog(E)||"",G=B.trim(),J=V.trim(),X=O.trim();let ne=!0,q=!0;if(i.getProgramParameter(y,i.LINK_STATUS)===!1)if(ne=!1,typeof s.debug.onShaderError=="function")s.debug.onShaderError(i,y,b,E);else{const Q=Ad(i,b,"vertex"),ee=Ad(i,E,"fragment");Ne("WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(y,i.VALIDATE_STATUS)+`

Material Name: `+L.name+`
Material Type: `+L.type+`

Program Info Log: `+G+`
`+Q+`
`+ee)}else G!==""?Ae("WebGLProgram: Program Info Log:",G):(J===""||X==="")&&(q=!1);q&&(L.diagnostics={runnable:ne,programLog:G,vertexShader:{log:J,prefix:p},fragmentShader:{log:X,prefix:m}})}i.deleteShader(b),i.deleteShader(E),v=new qr(i,y),A=f0(i,y)}let v;this.getUniforms=function(){return v===void 0&&w(this),v};let A;this.getAttributes=function(){return A===void 0&&w(this),A};let C=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return C===!1&&(C=i.getProgramParameter(y,i0)),C},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(y),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=s0++,this.cacheKey=e,this.usedTimes=1,this.program=y,this.vertexShader=b,this.fragmentShader=E,this}let C0=0;class P0{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,n){const i=this._getShaderCacheForMaterial(e);return i.has(t)===!1&&(i.add(t),t.usedTimes++),i.has(n)===!1&&(i.add(n),n.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new L0(e),t.set(e,n)),n}}class L0{constructor(e){this.id=C0++,this.code=e,this.usedTimes=0}}function I0(s){return s===Oi||s===Jr||s===jr}function D0(s,e,t,n,i,r){const a=new Ul,o=new P0,l=new Set,c=[],d=new Map,h=n.logarithmicDepthBuffer;let u=n.precision;const f={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function g(v){return l.add(v),v===0?"uv":`uv${v}`}function y(v,A,C,L,B,V){const O=L.fog,G=B.geometry,J=v.isMeshStandardMaterial||v.isMeshLambertMaterial||v.isMeshPhongMaterial?L.environment:null,X=v.isMeshStandardMaterial||v.isMeshLambertMaterial&&!v.envMap||v.isMeshPhongMaterial&&!v.envMap,ne=e.get(v.envMap||J,X),q=ne&&ne.mapping===da?ne.image.height:null,Q=f[v.type];v.precision!==null&&(u=n.getMaxPrecision(v.precision),u!==v.precision&&Ae("WebGLProgram.getParameters:",v.precision,"not supported, using",u,"instead."));const ee=G.morphAttributes.position||G.morphAttributes.normal||G.morphAttributes.color,Pe=ee!==void 0?ee.length:0;let Ee=0;G.morphAttributes.position!==void 0&&(Ee=1),G.morphAttributes.normal!==void 0&&(Ee=2),G.morphAttributes.color!==void 0&&(Ee=3);let et,We,Ze,I;if(Q){const ht=An[Q];et=ht.vertexShader,We=ht.fragmentShader}else{et=v.vertexShader,We=v.fragmentShader;const ht=o.getVertexShaderStage(v),je=o.getFragmentShaderStage(v);o.update(v,ht,je),Ze=ht.id,I=je.id}const k=s.getRenderTarget(),ie=s.state.buffers.depth.getReversed(),ve=B.isInstancedMesh===!0,fe=B.isBatchedMesh===!0,Ue=!!v.map,vt=!!v.matcap,Xe=!!ne,Je=!!v.aoMap,dt=!!v.lightMap,Ke=!!v.bumpMap&&v.wireframe===!1,pt=!!v.normalMap,It=!!v.displacementMap,$t=!!v.emissiveMap,gt=!!v.metalnessMap,bt=!!v.roughnessMap,U=v.anisotropy>0,Ft=v.clearcoat>0,tt=v.dispersion>0,R=v.retroreflectivity>0,x=v.iridescence>0,F=v.sheen>0,W=v.transmission>0,K=U&&!!v.anisotropyMap,se=Ft&&!!v.clearcoatMap,re=Ft&&!!v.clearcoatNormalMap,Y=Ft&&!!v.clearcoatRoughnessMap,j=x&&!!v.iridescenceMap,ae=x&&!!v.iridescenceThicknessMap,Re=F&&!!v.sheenColorMap,de=F&&!!v.sheenRoughnessMap,oe=!!v.specularMap,Ce=!!v.specularColorMap,De=!!v.specularIntensityMap,Fe=W&&!!v.transmissionMap,N=W&&!!v.thicknessMap,le=!!v.gradientMap,Z=!!v.alphaMap,ce=v.alphaTest>0,ge=!!v.alphaHash,te=!!v.extensions;let Le=Dn;v.toneMapped&&(k===null||k.isXRRenderTarget===!0)&&(Le=s.toneMapping);const Se={shaderID:Q,shaderType:v.type,shaderName:v.name,vertexShader:et,fragmentShader:We,defines:v.defines,customVertexShaderID:Ze,customFragmentShaderID:I,isRawShaderMaterial:v.isRawShaderMaterial===!0,glslVersion:v.glslVersion,precision:u,batching:fe,batchingColor:fe&&B._colorsTexture!==null,instancing:ve,instancingColor:ve&&B.instanceColor!==null,instancingMorph:ve&&B.morphTexture!==null,outputColorSpace:k===null?s.outputColorSpace:k.isXRRenderTarget===!0?k.texture.colorSpace:qe.workingColorSpace,alphaToCoverage:!!v.alphaToCoverage,map:Ue,matcap:vt,envMap:Xe,envMapMode:Xe&&ne.mapping,envMapCubeUVHeight:q,aoMap:Je,lightMap:dt,bumpMap:Ke,normalMap:pt,displacementMap:It,emissiveMap:$t,normalMapObjectSpace:pt&&v.normalMapType===Zu,normalMapTangentSpace:pt&&v.normalMapType===rl,packedNormalMap:pt&&v.normalMapType===rl&&I0(v.normalMap.format),metalnessMap:gt,roughnessMap:bt,anisotropy:U,anisotropyMap:K,clearcoat:Ft,clearcoatMap:se,clearcoatNormalMap:re,clearcoatRoughnessMap:Y,dispersion:tt,retroreflection:R,iridescence:x,iridescenceMap:j,iridescenceThicknessMap:ae,sheen:F,sheenColorMap:Re,sheenRoughnessMap:de,specularMap:oe,specularColorMap:Ce,specularIntensityMap:De,transmission:W,transmissionMap:Fe,thicknessMap:N,gradientMap:le,opaque:v.transparent===!1&&v.blending===zs&&v.alphaToCoverage===!1,alphaMap:Z,alphaTest:ce,alphaHash:ge,combine:v.combine,mapUv:Ue&&g(v.map.channel),aoMapUv:Je&&g(v.aoMap.channel),lightMapUv:dt&&g(v.lightMap.channel),bumpMapUv:Ke&&g(v.bumpMap.channel),normalMapUv:pt&&g(v.normalMap.channel),displacementMapUv:It&&g(v.displacementMap.channel),emissiveMapUv:$t&&g(v.emissiveMap.channel),metalnessMapUv:gt&&g(v.metalnessMap.channel),roughnessMapUv:bt&&g(v.roughnessMap.channel),anisotropyMapUv:K&&g(v.anisotropyMap.channel),clearcoatMapUv:se&&g(v.clearcoatMap.channel),clearcoatNormalMapUv:re&&g(v.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Y&&g(v.clearcoatRoughnessMap.channel),iridescenceMapUv:j&&g(v.iridescenceMap.channel),iridescenceThicknessMapUv:ae&&g(v.iridescenceThicknessMap.channel),sheenColorMapUv:Re&&g(v.sheenColorMap.channel),sheenRoughnessMapUv:de&&g(v.sheenRoughnessMap.channel),specularMapUv:oe&&g(v.specularMap.channel),specularColorMapUv:Ce&&g(v.specularColorMap.channel),specularIntensityMapUv:De&&g(v.specularIntensityMap.channel),transmissionMapUv:Fe&&g(v.transmissionMap.channel),thicknessMapUv:N&&g(v.thicknessMap.channel),alphaMapUv:Z&&g(v.alphaMap.channel),vertexTangents:!!G.attributes.tangent&&(pt||U),vertexNormals:!!G.attributes.normal,vertexColors:v.vertexColors,vertexAlphas:v.vertexColors===!0&&!!G.attributes.color&&G.attributes.color.itemSize===4,pointsUvs:B.isPoints===!0&&!!G.attributes.uv&&(Ue||Z),fog:!!O,useFog:v.fog===!0,fogExp2:!!O&&O.isFogExp2,flatShading:v.wireframe===!1&&(v.flatShading===!0||G.attributes.normal===void 0&&pt===!1&&(v.isMeshLambertMaterial||v.isMeshPhongMaterial||v.isMeshStandardMaterial||v.isMeshPhysicalMaterial)),sizeAttenuation:v.sizeAttenuation===!0,logarithmicDepthBuffer:h,reversedDepthBuffer:ie,skinning:B.isSkinnedMesh===!0,hasPositionAttribute:G.attributes.position!==void 0,morphTargets:G.morphAttributes.position!==void 0,morphNormals:G.morphAttributes.normal!==void 0,morphColors:G.morphAttributes.color!==void 0,morphTargetsCount:Pe,morphTextureStride:Ee,numSunLights:A.sun.length,numDirLights:A.directional.length,numPointLights:A.point.length,numSpotLights:A.spot.length,numSpotLightMaps:A.spotLightMap.length,numRectAreaLights:A.rectArea.length,numHemiLights:A.hemi.length,numSunLightShadows:A.sunShadowMap.length,numDirLightShadows:A.directionalShadowMap.length,numPointLightShadows:A.pointShadowMap.length,numSpotLightShadows:A.spotShadowMap.length,numSpotLightShadowsWithMaps:A.numSpotLightShadowsWithMaps,numLightProbes:A.numLightProbes,numLightProbeGrids:V.length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:v.dithering,shadowMapEnabled:s.shadowMap.enabled&&C.length>0,shadowMapType:s.shadowMap.type,toneMapping:Le,decodeVideoTexture:Ue&&v.map.isVideoTexture===!0&&qe.getTransfer(v.map.colorSpace)===nt,decodeVideoTextureEmissive:$t&&v.emissiveMap.isVideoTexture===!0&&qe.getTransfer(v.emissiveMap.colorSpace)===nt,premultipliedAlpha:v.premultipliedAlpha,doubleSided:v.side===Xt,flipSided:v.side===Yt,useDepthPacking:v.depthPacking>=0,depthPacking:v.depthPacking||0,index0AttributeName:v.index0AttributeName,extensionClipCullDistance:te&&v.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(te&&v.extensions.multiDraw===!0||fe)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:v.customProgramCacheKey()};return Se.vertexUv1s=l.has(1),Se.vertexUv2s=l.has(2),Se.vertexUv3s=l.has(3),l.clear(),Se}function p(v){const A=[];if(v.shaderID?A.push(v.shaderID):(A.push(v.customVertexShaderID),A.push(v.customFragmentShaderID)),v.defines!==void 0)for(const C in v.defines)A.push(C),A.push(v.defines[C]);return v.isRawShaderMaterial===!1&&(m(A,v),S(A,v),A.push(s.outputColorSpace)),A.push(v.customProgramCacheKey),A.join()}function m(v,A){v.push(A.precision),v.push(A.outputColorSpace),v.push(A.envMapMode),v.push(A.envMapCubeUVHeight),v.push(A.mapUv),v.push(A.alphaMapUv),v.push(A.lightMapUv),v.push(A.aoMapUv),v.push(A.bumpMapUv),v.push(A.normalMapUv),v.push(A.displacementMapUv),v.push(A.emissiveMapUv),v.push(A.metalnessMapUv),v.push(A.roughnessMapUv),v.push(A.anisotropyMapUv),v.push(A.clearcoatMapUv),v.push(A.clearcoatNormalMapUv),v.push(A.clearcoatRoughnessMapUv),v.push(A.iridescenceMapUv),v.push(A.iridescenceThicknessMapUv),v.push(A.sheenColorMapUv),v.push(A.sheenRoughnessMapUv),v.push(A.specularMapUv),v.push(A.specularColorMapUv),v.push(A.specularIntensityMapUv),v.push(A.transmissionMapUv),v.push(A.thicknessMapUv),v.push(A.combine),v.push(A.fogExp2),v.push(A.sizeAttenuation),v.push(A.morphTargetsCount),v.push(A.morphAttributeCount),v.push(A.numSunLights),v.push(A.numDirLights),v.push(A.numPointLights),v.push(A.numSpotLights),v.push(A.numSpotLightMaps),v.push(A.numHemiLights),v.push(A.numRectAreaLights),v.push(A.numSunLightShadows),v.push(A.numDirLightShadows),v.push(A.numPointLightShadows),v.push(A.numSpotLightShadows),v.push(A.numSpotLightShadowsWithMaps),v.push(A.numLightProbes),v.push(A.shadowMapType),v.push(A.toneMapping),v.push(A.numClippingPlanes),v.push(A.numClipIntersection),v.push(A.depthPacking)}function S(v,A){a.disableAll(),A.instancing&&a.enable(0),A.instancingColor&&a.enable(1),A.instancingMorph&&a.enable(2),A.matcap&&a.enable(3),A.envMap&&a.enable(4),A.normalMapObjectSpace&&a.enable(5),A.normalMapTangentSpace&&a.enable(6),A.clearcoat&&a.enable(7),A.iridescence&&a.enable(8),A.alphaTest&&a.enable(9),A.vertexColors&&a.enable(10),A.vertexAlphas&&a.enable(11),A.vertexUv1s&&a.enable(12),A.vertexUv2s&&a.enable(13),A.vertexUv3s&&a.enable(14),A.vertexTangents&&a.enable(15),A.anisotropy&&a.enable(16),A.alphaHash&&a.enable(17),A.batching&&a.enable(18),A.dispersion&&a.enable(19),A.retroreflection&&a.enable(24),A.batchingColor&&a.enable(20),A.gradientMap&&a.enable(21),A.packedNormalMap&&a.enable(22),A.vertexNormals&&a.enable(23),v.push(a.mask),a.disableAll(),A.fog&&a.enable(0),A.useFog&&a.enable(1),A.flatShading&&a.enable(2),A.logarithmicDepthBuffer&&a.enable(3),A.reversedDepthBuffer&&a.enable(4),A.skinning&&a.enable(5),A.morphTargets&&a.enable(6),A.morphNormals&&a.enable(7),A.morphColors&&a.enable(8),A.premultipliedAlpha&&a.enable(9),A.shadowMapEnabled&&a.enable(10),A.doubleSided&&a.enable(11),A.flipSided&&a.enable(12),A.useDepthPacking&&a.enable(13),A.dithering&&a.enable(14),A.transmission&&a.enable(15),A.sheen&&a.enable(16),A.opaque&&a.enable(17),A.pointsUvs&&a.enable(18),A.decodeVideoTexture&&a.enable(19),A.decodeVideoTextureEmissive&&a.enable(20),A.alphaToCoverage&&a.enable(21),A.numLightProbeGrids>0&&a.enable(22),A.hasPositionAttribute&&a.enable(23),v.push(a.mask)}function T(v){const A=f[v.type];let C;if(A){const L=An[A];C=yp.clone(L.uniforms)}else C=v.uniforms;return C}function _(v,A){let C=d.get(A);return C!==void 0?++C.usedTimes:(C=new R0(s,A,v,i),c.push(C),d.set(A,C)),C}function b(v){if(--v.usedTimes===0){const A=c.indexOf(v);c[A]=c[c.length-1],c.pop(),d.delete(v.cacheKey),v.destroy()}}function E(v){o.remove(v)}function w(){o.dispose()}return{getParameters:y,getProgramCacheKey:p,getUniforms:T,acquireProgram:_,releaseProgram:b,releaseShaderCache:E,programs:c,dispose:w}}function N0(){let s=new WeakMap;function e(a){return s.has(a)}function t(a){let o=s.get(a);return o===void 0&&(o={},s.set(a,o)),o}function n(a){s.delete(a)}function i(a,o,l){s.get(a)[o]=l}function r(){s=new WeakMap}return{has:e,get:t,remove:n,update:i,dispose:r}}function U0(s,e){return s.groupOrder!==e.groupOrder?s.groupOrder-e.groupOrder:s.renderOrder!==e.renderOrder?s.renderOrder-e.renderOrder:s.material.id!==e.material.id?s.material.id-e.material.id:s.materialVariant!==e.materialVariant?s.materialVariant-e.materialVariant:s.z!==e.z?s.z-e.z:s.id-e.id}function Id(s,e){return s.groupOrder!==e.groupOrder?s.groupOrder-e.groupOrder:s.renderOrder!==e.renderOrder?s.renderOrder-e.renderOrder:s.z!==e.z?e.z-s.z:s.id-e.id}function Dd(){const s=[];let e=0;const t=[],n=[],i=[];function r(){e=0,t.length=0,n.length=0,i.length=0}function a(u){let f=0;return u.isInstancedMesh&&(f+=2),u.isSkinnedMesh&&(f+=1),f}function o(u,f,g,y,p,m){let S=s[e];return S===void 0?(S={id:u.id,object:u,geometry:f,material:g,materialVariant:a(u),groupOrder:y,renderOrder:u.renderOrder,z:p,group:m},s[e]=S):(S.id=u.id,S.object=u,S.geometry=f,S.material=g,S.materialVariant=a(u),S.groupOrder=y,S.renderOrder=u.renderOrder,S.z=p,S.group=m),e++,S}function l(u,f,g,y,p,m,S){S.reversedDepth===!0&&(p=-p);const T=o(u,f,g,y,p,m);g.transmission>0?n.push(T):g.transparent===!0?i.push(T):t.push(T)}function c(u,f,g,y,p,m){const S=o(u,f,g,y,p,m);g.transmission>0?n.unshift(S):g.transparent===!0?i.unshift(S):t.unshift(S)}function d(u,f){t.length>1&&t.sort(u||U0),n.length>1&&n.sort(f||Id),i.length>1&&i.sort(f||Id)}function h(){for(let u=e,f=s.length;u<f;u++){const g=s[u];if(g.id===null)break;g.id=null,g.object=null,g.geometry=null,g.material=null,g.group=null}}return{opaque:t,transmissive:n,transparent:i,init:r,push:l,unshift:c,finish:h,sort:d}}function O0(){let s=new WeakMap;function e(n,i){const r=s.get(n);let a;return r===void 0?(a=new Dd,s.set(n,[a])):i>=r.length?(a=new Dd,r.push(a)):a=r[i],a}function t(){s=new WeakMap}return{get:e,dispose:t}}function F0(){const s={};return{get:function(e){if(s[e.id]!==void 0)return s[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={direction:new P,color:new Ie};break;case"SpotLight":t={position:new P,direction:new P,color:new Ie,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new P,color:new Ie,distance:0,decay:0};break;case"HemisphereLight":t={direction:new P,skyColor:new Ie,groundColor:new Ie};break;case"RectAreaLight":t={color:new Ie,position:new P,halfWidth:new P,halfHeight:new P};break}return s[e.id]=t,t}}}function B0(){const s={};return{get:function(e){if(s[e.id]!==void 0)return s[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new _e};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new _e};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new _e,shadowCameraNear:1,shadowCameraFar:1e3};break}return s[e.id]=t,t}}}let k0=0;function z0(s,e){return(e.castShadow?2:0)-(s.castShadow?2:0)+(e.map?1:0)-(s.map?1:0)}function H0(s){const e=new F0,t=B0(),n={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new P);const i=new P,r=new Be,a=new Be;function o(c){let d=0,h=0,u=0;for(let B=0;B<9;B++)n.probe[B].set(0,0,0);let f=0,g=0,y=0,p=0,m=0,S=0,T=0,_=0,b=0,E=0,w=0,v=0,A=0,C=0;c.sort(z0);for(let B=0,V=c.length;B<V;B++){const O=c[B],G=O.color,J=O.intensity,X=O.distance;let ne=null;if(O.shadow&&O.shadow.map&&(O.shadow.map.texture.format===Oi?ne=O.shadow.map.texture:ne=O.shadow.map.depthTexture||O.shadow.map.texture),O.isAmbientLight)d+=G.r*J,h+=G.g*J,u+=G.b*J;else if(O.isLightProbe){for(let q=0;q<9;q++)n.probe[q].addScaledVector(O.sh.coefficients[q],J);C++}else if(O.isSunLight){const q=e.get(O);if(q.color.copy(O.color).multiplyScalar(O.intensity),O.castShadow){const Q=O.shadow,ee=t.get(O);ee.shadowIntensity=Q.intensity,ee.shadowBias=Q.bias,ee.shadowNormalBias=Q.normalBias,ee.shadowRadius=Q.radius,ee.shadowMapSize.copy(Q.mapSize).multiply(Q.getFrameExtents()),n.sunShadow[g]=ee,n.sunShadowMap[g]=ne;const Pe=Q.getViewportCount();for(let Ee=0;Ee<Pe;Ee++)n.sunShadowMatrix[y+Ee]=Q.getMatrix(Ee),n.sunShadowCascade[y+Ee]=Q._cascadeData[Ee];y+=Pe,g++}n.sun[f]=q,f++}else if(O.isDirectionalLight){const q=e.get(O);if(q.color.copy(O.color).multiplyScalar(O.intensity),O.castShadow){const Q=O.shadow,ee=t.get(O);ee.shadowIntensity=Q.intensity,ee.shadowBias=Q.bias,ee.shadowNormalBias=Q.normalBias,ee.shadowRadius=Q.radius,ee.shadowMapSize=Q.mapSize,n.directionalShadow[p]=ee,n.directionalShadowMap[p]=ne,n.directionalShadowMatrix[p]=O.shadow.matrix,b++}n.directional[p]=q,p++}else if(O.isSpotLight){const q=e.get(O);q.position.setFromMatrixPosition(O.matrixWorld),q.color.copy(G).multiplyScalar(J),q.distance=X,q.coneCos=Math.cos(O.angle),q.penumbraCos=Math.cos(O.angle*(1-O.penumbra)),q.decay=O.decay,n.spot[S]=q;const Q=O.shadow;if(O.map&&(n.spotLightMap[v]=O.map,v++,Q.updateMatrices(O),O.castShadow&&A++),n.spotLightMatrix[S]=Q.matrix,O.castShadow){const ee=t.get(O);ee.shadowIntensity=Q.intensity,ee.shadowBias=Q.bias,ee.shadowNormalBias=Q.normalBias,ee.shadowRadius=Q.radius,ee.shadowMapSize=Q.mapSize,n.spotShadow[S]=ee,n.spotShadowMap[S]=ne,w++}S++}else if(O.isRectAreaLight){const q=e.get(O);q.color.copy(G).multiplyScalar(J),q.halfWidth.set(O.width*.5,0,0),q.halfHeight.set(0,O.height*.5,0),n.rectArea[T]=q,T++}else if(O.isPointLight){const q=e.get(O);if(q.color.copy(O.color).multiplyScalar(O.intensity),q.distance=O.distance,q.decay=O.decay,O.castShadow){const Q=O.shadow,ee=t.get(O);ee.shadowIntensity=Q.intensity,ee.shadowBias=Q.bias,ee.shadowNormalBias=Q.normalBias,ee.shadowRadius=Q.radius,ee.shadowMapSize=Q.mapSize,ee.shadowCameraNear=Q.camera.near,ee.shadowCameraFar=Q.camera.far,n.pointShadow[m]=ee,n.pointShadowMap[m]=ne,n.pointShadowMatrix[m]=O.shadow.matrix,E++}n.point[m]=q,m++}else if(O.isHemisphereLight){const q=e.get(O);q.skyColor.copy(O.color).multiplyScalar(J),q.groundColor.copy(O.groundColor).multiplyScalar(J),n.hemi[_]=q,_++}}T>0&&(s.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=ue.LTC_FLOAT_1,n.rectAreaLTC2=ue.LTC_FLOAT_2):(n.rectAreaLTC1=ue.LTC_HALF_1,n.rectAreaLTC2=ue.LTC_HALF_2)),n.ambient[0]=d,n.ambient[1]=h,n.ambient[2]=u;const L=n.hash;(L.sunLength!==f||L.directionalLength!==p||L.pointLength!==m||L.spotLength!==S||L.rectAreaLength!==T||L.hemiLength!==_||L.numSunShadows!==g||L.numDirectionalShadows!==b||L.numPointShadows!==E||L.numSpotShadows!==w||L.numSpotMaps!==v||L.numLightProbes!==C)&&(n.sun.length=f,n.directional.length=p,n.spot.length=S,n.rectArea.length=T,n.point.length=m,n.hemi.length=_,n.sunShadow.length=g,n.sunShadowMap.length=g,n.sunShadowMatrix.length=y,n.sunShadowCascade.length=y,n.directionalShadow.length=b,n.directionalShadowMap.length=b,n.directionalShadowMatrix.length=b,n.pointShadow.length=E,n.pointShadowMap.length=E,n.pointShadowMatrix.length=E,n.spotShadow.length=w,n.spotShadowMap.length=w,n.spotLightMatrix.length=w+v-A,n.spotLightMap.length=v,n.numSpotLightShadowsWithMaps=A,n.numLightProbes=C,L.sunLength=f,L.directionalLength=p,L.pointLength=m,L.spotLength=S,L.rectAreaLength=T,L.hemiLength=_,L.numSunShadows=g,L.numDirectionalShadows=b,L.numPointShadows=E,L.numSpotShadows=w,L.numSpotMaps=v,L.numLightProbes=C,n.version=k0++)}function l(c,d){let h=0,u=0,f=0,g=0,y=0,p=0;const m=d.matrixWorldInverse;for(let S=0,T=c.length;S<T;S++){const _=c[S];if(_.isSunLight){const b=n.sun[h];b.direction.setFromMatrixPosition(_.matrixWorld),b.direction.transformDirection(m),h++}else if(_.isDirectionalLight){const b=n.directional[u];b.direction.setFromMatrixPosition(_.matrixWorld),i.setFromMatrixPosition(_.target.matrixWorld),b.direction.sub(i),b.direction.transformDirection(m),u++}else if(_.isSpotLight){const b=n.spot[g];b.position.setFromMatrixPosition(_.matrixWorld),b.position.applyMatrix4(m),b.direction.setFromMatrixPosition(_.matrixWorld),i.setFromMatrixPosition(_.target.matrixWorld),b.direction.sub(i),b.direction.transformDirection(m),g++}else if(_.isRectAreaLight){const b=n.rectArea[y];b.position.setFromMatrixPosition(_.matrixWorld),b.position.applyMatrix4(m),a.identity(),r.copy(_.matrixWorld),r.premultiply(m),a.extractRotation(r),b.halfWidth.set(_.width*.5,0,0),b.halfHeight.set(0,_.height*.5,0),b.halfWidth.applyMatrix4(a),b.halfHeight.applyMatrix4(a),y++}else if(_.isPointLight){const b=n.point[f];b.position.setFromMatrixPosition(_.matrixWorld),b.position.applyMatrix4(m),f++}else if(_.isHemisphereLight){const b=n.hemi[p];b.direction.setFromMatrixPosition(_.matrixWorld),b.direction.transformDirection(m),p++}}}return{setup:o,setupView:l,state:n}}function Nd(s){const e=new H0(s),t=[],n=[],i=[];function r(u){h.camera=u,t.length=0,n.length=0,i.length=0}function a(u){t.push(u)}function o(u){n.push(u)}function l(u){i.push(u)}function c(){e.setup(t)}function d(u){e.setupView(t,u)}const h={lightsArray:t,shadowsArray:n,lightProbeGridArray:i,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:r,state:h,setupLights:c,setupLightsView:d,pushLight:a,pushShadow:o,pushLightProbeGrid:l}}function G0(s){let e=new WeakMap;function t(i,r=0){const a=e.get(i);let o;return a===void 0?(o=new Nd(s),e.set(i,[o])):r>=a.length?(o=new Nd(s),a.push(o)):o=a[r],o}function n(){e=new WeakMap}return{get:t,dispose:n}}const V0=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,W0=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,X0=[new P(1,0,0),new P(-1,0,0),new P(0,1,0),new P(0,-1,0),new P(0,0,1),new P(0,0,-1)],$0=[new P(0,-1,0),new P(0,-1,0),new P(0,0,1),new P(0,0,-1),new P(0,-1,0),new P(0,-1,0)],Ud=new Be,Ns=new P,ro=new P;function q0(s,e,t){let n=new kl;const i=new _e,r=new _e,a=new lt,o=new Ep,l=new Tp,c={},d=t.maxTextureSize,h={[ni]:Yt,[Yt]:ni,[Xt]:Xt},u=new kn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new _e},radius:{value:4}},vertexShader:V0,fragmentShader:W0}),f=u.clone();f.defines.HORIZONTAL_PASS=1;const g=new Ct;g.setAttribute("position",new Zt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const y=new yt(g,u),p=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=kr;let m=this.type;this.render=function(E,w,v){if(p.enabled===!1||p.autoUpdate===!1&&p.needsUpdate===!1||E.length===0)return;this.type===Tu&&(Ae("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=kr);const A=s.getRenderTarget(),C=s.getActiveCubeFace(),L=s.getActiveMipmapLevel(),B=s.state;B.setBlending(Qn),B.buffers.depth.getReversed()===!0?B.buffers.color.setClear(0,0,0,0):B.buffers.color.setClear(1,1,1,1),B.buffers.depth.setTest(!0),B.setScissorTest(!1);const V=m!==this.type;V&&w.traverse(function(O){O.material&&(Array.isArray(O.material)?O.material.forEach(G=>G.needsUpdate=!0):O.material.needsUpdate=!0)});for(let O=0,G=E.length;O<G;O++){const J=E[O],X=J.shadow;if(X===void 0){Ae("WebGLShadowMap:",J,"has no shadow.");continue}if(X.autoUpdate===!1&&X.needsUpdate===!1)continue;i.copy(X.mapSize);const ne=X.getFrameExtents();i.multiply(ne),r.copy(X.mapSize),(i.x>d||i.y>d)&&(i.x>d&&(r.x=Math.floor(d/ne.x),i.x=r.x*ne.x,X.mapSize.x=r.x),i.y>d&&(r.y=Math.floor(d/ne.y),i.y=r.y*ne.y,X.mapSize.y=r.y));const q=s.state.buffers.depth.getReversed();if(X.camera._reversedDepth=q,X.map===null||V===!0){if(X.map!==null&&(X.map.depthTexture!==null&&(X.map.depthTexture.dispose(),X.map.depthTexture=null),X.map.dispose()),this.type===Os){if(J.isPointLight){Ae("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}X.map=new vn(i.x,i.y,{format:Oi,type:Bn,minFilter:Rt,magFilter:Rt,generateMipmaps:!1}),X.map.texture.name=J.name+".shadowMap",X.map.depthTexture=new er(i.x,i.y,an),X.map.depthTexture.name=J.name+".shadowMapDepth",X.map.depthTexture.format=ii,X.map.depthTexture.compareFunction=null,X.map.depthTexture.minFilter=At,X.map.depthTexture.magFilter=At}else J.isPointLight?(X.map=new Hh(i.x),X.map.depthTexture=new ip(i.x,Fn)):(X.map=new vn(i.x,i.y),X.map.depthTexture=new er(i.x,i.y,Fn)),X.map.depthTexture.name=J.name+".shadowMap",X.map.depthTexture.format=ii,this.type===kr?(X.map.depthTexture.compareFunction=q?Il:Ll,X.map.depthTexture.minFilter=Rt,X.map.depthTexture.magFilter=Rt):(X.map.depthTexture.compareFunction=null,X.map.depthTexture.minFilter=At,X.map.depthTexture.magFilter=At);X.camera.updateProjectionMatrix()}X.map.isWebGLCubeRenderTarget!==!0&&(X.map.width!==i.x||X.map.height!==i.y)&&X.map.setSize(i.x,i.y);const Q=X.map.isWebGLCubeRenderTarget?6:X.getViewportCount();J.isPointLight!==!0&&X.updateMatrices(J,v);for(let ee=0;ee<Q;ee++){const Pe=X.getCamera(ee);if(J.isPointLight){const Ee=X.camera,et=X.matrix,We=J.distance||Ee.far;We!==Ee.far&&(Ee.far=We,Ee.updateProjectionMatrix()),Ns.setFromMatrixPosition(J.matrixWorld),Ee.position.copy(Ns),ro.copy(Ee.position),ro.add(X0[ee]),Ee.up.copy($0[ee]),Ee.lookAt(ro),Ee.updateMatrixWorld(),et.makeTranslation(-Ns.x,-Ns.y,-Ns.z),Ud.multiplyMatrices(Ee.projectionMatrix,Ee.matrixWorldInverse),X._frustum.setFromProjectionMatrix(Ud,Ee.coordinateSystem,Ee.reversedDepth)}if(X.map.isWebGLCubeRenderTarget)s.setRenderTarget(X.map,ee),s.clear();else{ee===0&&(s.setRenderTarget(X.map),s.clear());const Ee=X.getViewport(ee);a.set(r.x*Ee.x,r.y*Ee.y,r.x*Ee.z,r.y*Ee.w),B.viewport(a)}n=X.getFrustum(ee),_(w,v,Pe,J,this.type)}X.isPointLightShadow!==!0&&this.type===Os&&S(X,v),X.needsUpdate=!1}m=this.type,p.needsUpdate=!1,s.setRenderTarget(A,C,L)};function S(E,w){const v=e.update(y);u.defines.VSM_SAMPLES!==E.blurSamples&&(u.defines.VSM_SAMPLES=E.blurSamples,f.defines.VSM_SAMPLES=E.blurSamples,u.needsUpdate=!0,f.needsUpdate=!0),E.mapPass===null?E.mapPass=new vn(i.x,i.y,{format:Oi,type:Bn}):(E.mapPass.width!==E.map.width||E.mapPass.height!==E.map.height)&&E.mapPass.setSize(E.map.width,E.map.height),u.uniforms.shadow_pass.value=E.map.depthTexture,u.uniforms.resolution.value.set(E.map.width,E.map.height),u.uniforms.radius.value=E.radius,s.setRenderTarget(E.mapPass),s.clear(),s.renderBufferDirect(w,null,v,u,y,null),f.uniforms.shadow_pass.value=E.mapPass.texture,f.uniforms.resolution.value.set(E.map.width,E.map.height),f.uniforms.radius.value=E.radius,s.setRenderTarget(E.map),s.clear(),s.renderBufferDirect(w,null,v,f,y,null)}function T(E,w,v,A){let C=null;const L=v.isPointLight===!0?E.customDistanceMaterial:E.customDepthMaterial;if(L!==void 0)C=L;else if(C=v.isPointLight===!0?l:o,s.localClippingEnabled&&w.clipShadows===!0&&Array.isArray(w.clippingPlanes)&&w.clippingPlanes.length!==0||w.displacementMap&&w.displacementScale!==0||w.alphaMap&&w.alphaTest>0||w.map&&w.alphaTest>0||w.alphaToCoverage===!0){const B=C.uuid,V=w.uuid;let O=c[B];O===void 0&&(O={},c[B]=O);let G=O[V];G===void 0&&(G=C.clone(),O[V]=G,w.addEventListener("dispose",b)),C=G}if(C.visible=w.visible,C.wireframe=w.wireframe,A===Os?C.side=w.shadowSide!==null?w.shadowSide:w.side:C.side=w.shadowSide!==null?w.shadowSide:h[w.side],C.alphaMap=w.alphaMap,C.alphaTest=w.alphaToCoverage===!0?.5:w.alphaTest,C.map=w.map,C.clipShadows=w.clipShadows,C.clippingPlanes=w.clippingPlanes,C.clipIntersection=w.clipIntersection,C.displacementMap=w.displacementMap,C.displacementScale=w.displacementScale,C.displacementBias=w.displacementBias,C.wireframeLinewidth=w.wireframeLinewidth,C.linewidth=w.linewidth,v.isPointLight===!0&&C.isMeshDistanceMaterial===!0){const B=s.properties.get(C);B.light=v}return C}function _(E,w,v,A,C){if(E.visible===!1)return;if(E.layers.test(w.layers)&&(E.isMesh||E.isLine||E.isPoints)&&(E.castShadow||E.receiveShadow&&C===Os)&&(!E.frustumCulled||E.intersectsFrustum(n))){E.modelViewMatrix.multiplyMatrices(v.matrixWorldInverse,E.matrixWorld);const V=e.update(E),O=E.material;if(Array.isArray(O)){const G=V.groups;for(let J=0,X=G.length;J<X;J++){const ne=G[J],q=O[ne.materialIndex];if(q&&q.visible){const Q=T(E,q,A,C);E.onBeforeShadow(s,E,w,v,V,Q,ne),s.renderBufferDirect(v,null,V,Q,E,ne),E.onAfterShadow(s,E,w,v,V,Q,ne)}}}else if(O.visible){const G=T(E,O,A,C);E.onBeforeShadow(s,E,w,v,V,G,null),s.renderBufferDirect(v,null,V,G,E,null),E.onAfterShadow(s,E,w,v,V,G,null)}}const B=E.children;for(let V=0,O=B.length;V<O;V++)_(B[V],w,v,A,C)}function b(E){E.target.removeEventListener("dispose",b);for(const v in c){const A=c[v],C=E.target.uuid;C in A&&(A[C].dispose(),delete A[C])}}}function K0(s,e){function t(){let N=!1;const le=new lt;let Z=null;const ce=new lt(0,0,0,0);return{setMask:function(ge){Z!==ge&&!N&&(s.colorMask(ge,ge,ge,ge),Z=ge)},setLocked:function(ge){N=ge},setClear:function(ge,te,Le,Se,ht){ht===!0&&(ge*=Se,te*=Se,Le*=Se),le.set(ge,te,Le,Se),ce.equals(le)===!1&&(s.clearColor(ge,te,Le,Se),ce.copy(le))},reset:function(){N=!1,Z=null,ce.set(-1,0,0,0)}}}function n(){let N=!1,le=!1,Z=null,ce=null,ge=null;return{setReversed:function(te){if(le!==te){const Le=e.get("EXT_clip_control");te?Le.clipControlEXT(Le.LOWER_LEFT_EXT,Le.ZERO_TO_ONE_EXT):Le.clipControlEXT(Le.LOWER_LEFT_EXT,Le.NEGATIVE_ONE_TO_ONE_EXT),le=te;const Se=ge;ge=null,this.setClear(Se)}},getReversed:function(){return le},setTest:function(te){te?k(s.DEPTH_TEST):ie(s.DEPTH_TEST)},setMask:function(te){Z!==te&&!N&&(s.depthMask(te),Z=te)},setFunc:function(te){if(le&&(te=cf[te]),ce!==te){switch(te){case Mo:s.depthFunc(s.NEVER);break;case bo:s.depthFunc(s.ALWAYS);break;case So:s.depthFunc(s.LESS);break;case $s:s.depthFunc(s.LEQUAL);break;case Eo:s.depthFunc(s.EQUAL);break;case To:s.depthFunc(s.GEQUAL);break;case wo:s.depthFunc(s.GREATER);break;case Ao:s.depthFunc(s.NOTEQUAL);break;default:s.depthFunc(s.LEQUAL)}ce=te}},setLocked:function(te){N=te},setClear:function(te){ge!==te&&(ge=te,le&&(te=1-te),s.clearDepth(te))},reset:function(){N=!1,Z=null,ce=null,ge=null,le=!1}}}function i(){let N=!1,le=null,Z=null,ce=null,ge=null,te=null,Le=null,Se=null,ht=null;return{setTest:function(je){N||(je?k(s.STENCIL_TEST):ie(s.STENCIL_TEST))},setMask:function(je){le!==je&&!N&&(s.stencilMask(je),le=je)},setFunc:function(je,ln,Mn){(Z!==je||ce!==ln||ge!==Mn)&&(s.stencilFunc(je,ln,Mn),Z=je,ce=ln,ge=Mn)},setOp:function(je,ln,Mn){(te!==je||Le!==ln||Se!==Mn)&&(s.stencilOp(je,ln,Mn),te=je,Le=ln,Se=Mn)},setLocked:function(je){N=je},setClear:function(je){ht!==je&&(s.clearStencil(je),ht=je)},reset:function(){N=!1,le=null,Z=null,ce=null,ge=null,te=null,Le=null,Se=null,ht=null}}}const r=new t,a=new n,o=new i,l=new WeakMap,c=new WeakMap;let d={},h={},u={},f=new WeakMap,g=[],y=null,p=!1,m=null,S=null,T=null,_=null,b=null,E=null,w=null,v=new Ie(0,0,0),A=0,C=!1,L=null,B=null,V=null,O=null,G=null;const J=s.getParameter(s.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let X=!1,ne=0;const q=s.getParameter(s.VERSION);q.indexOf("WebGL")!==-1?(ne=parseFloat(/^WebGL (\d)/.exec(q)[1]),X=ne>=1):q.indexOf("OpenGL ES")!==-1&&(ne=parseFloat(/^OpenGL ES (\d)/.exec(q)[1]),X=ne>=2);let Q=null,ee={};const Pe=s.getParameter(s.SCISSOR_BOX),Ee=s.getParameter(s.VIEWPORT),et=new lt().fromArray(Pe),We=new lt().fromArray(Ee);function Ze(N,le,Z,ce){const ge=new Uint8Array(4),te=s.createTexture();s.bindTexture(N,te),s.texParameteri(N,s.TEXTURE_MIN_FILTER,s.NEAREST),s.texParameteri(N,s.TEXTURE_MAG_FILTER,s.NEAREST);for(let Le=0;Le<Z;Le++)N===s.TEXTURE_3D||N===s.TEXTURE_2D_ARRAY?s.texImage3D(le,0,s.RGBA,1,1,ce,0,s.RGBA,s.UNSIGNED_BYTE,ge):s.texImage2D(le+Le,0,s.RGBA,1,1,0,s.RGBA,s.UNSIGNED_BYTE,ge);return te}const I={};I[s.TEXTURE_2D]=Ze(s.TEXTURE_2D,s.TEXTURE_2D,1),I[s.TEXTURE_CUBE_MAP]=Ze(s.TEXTURE_CUBE_MAP,s.TEXTURE_CUBE_MAP_POSITIVE_X,6),I[s.TEXTURE_2D_ARRAY]=Ze(s.TEXTURE_2D_ARRAY,s.TEXTURE_2D_ARRAY,1,1),I[s.TEXTURE_3D]=Ze(s.TEXTURE_3D,s.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),k(s.DEPTH_TEST),a.setFunc($s),Ke(!1),pt(fc),k(s.CULL_FACE),Je(Qn);function k(N){d[N]!==!0&&(s.enable(N),d[N]=!0)}function ie(N){d[N]!==!1&&(s.disable(N),d[N]=!1)}function ve(N,le){return u[N]!==le?(s.bindFramebuffer(N,le),u[N]=le,N===s.DRAW_FRAMEBUFFER&&(u[s.FRAMEBUFFER]=le),N===s.FRAMEBUFFER&&(u[s.DRAW_FRAMEBUFFER]=le),!0):!1}function fe(N,le){let Z=g,ce=!1;if(N){Z=f.get(le),Z===void 0&&(Z=[],f.set(le,Z));const ge=N.textures;if(Z.length!==ge.length||Z[0]!==s.COLOR_ATTACHMENT0){for(let te=0,Le=ge.length;te<Le;te++)Z[te]=s.COLOR_ATTACHMENT0+te;Z.length=ge.length,ce=!0}}else Z[0]!==s.BACK&&(Z[0]=s.BACK,ce=!0);ce&&s.drawBuffers(Z)}function Ue(N){return y!==N?(s.useProgram(N),y=N,!0):!1}const vt={[is]:s.FUNC_ADD,[Au]:s.FUNC_SUBTRACT,[Ru]:s.FUNC_REVERSE_SUBTRACT};vt[Cu]=s.MIN,vt[Pu]=s.MAX;const Xe={[Lu]:s.ZERO,[Iu]:s.ONE,[Du]:s.SRC_COLOR,[ih]:s.SRC_ALPHA,[ku]:s.SRC_ALPHA_SATURATE,[Fu]:s.DST_COLOR,[Uu]:s.DST_ALPHA,[Nu]:s.ONE_MINUS_SRC_COLOR,[sh]:s.ONE_MINUS_SRC_ALPHA,[Bu]:s.ONE_MINUS_DST_COLOR,[Ou]:s.ONE_MINUS_DST_ALPHA,[zu]:s.CONSTANT_COLOR,[Hu]:s.ONE_MINUS_CONSTANT_COLOR,[Gu]:s.CONSTANT_ALPHA,[Vu]:s.ONE_MINUS_CONSTANT_ALPHA};function Je(N,le,Z,ce,ge,te,Le,Se,ht,je){if(N===Qn){p===!0&&(ie(s.BLEND),p=!1);return}if(p===!1&&(k(s.BLEND),p=!0),N!==wu){if(N!==m||je!==C){if((S!==is||b!==is)&&(s.blendEquation(s.FUNC_ADD),S=is,b=is),je)switch(N){case zs:s.blendFuncSeparate(s.ONE,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case pc:s.blendFunc(s.ONE,s.ONE);break;case mc:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case gc:s.blendFuncSeparate(s.DST_COLOR,s.ONE_MINUS_SRC_ALPHA,s.ZERO,s.ONE);break;default:Ne("WebGLState: Invalid blending: ",N);break}else switch(N){case zs:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case pc:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE,s.ONE,s.ONE);break;case mc:Ne("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case gc:Ne("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Ne("WebGLState: Invalid blending: ",N);break}T=null,_=null,E=null,w=null,v.set(0,0,0),A=0,m=N,C=je}return}ge=ge||le,te=te||Z,Le=Le||ce,(le!==S||ge!==b)&&(s.blendEquationSeparate(vt[le],vt[ge]),S=le,b=ge),(Z!==T||ce!==_||te!==E||Le!==w)&&(s.blendFuncSeparate(Xe[Z],Xe[ce],Xe[te],Xe[Le]),T=Z,_=ce,E=te,w=Le),(Se.equals(v)===!1||ht!==A)&&(s.blendColor(Se.r,Se.g,Se.b,ht),v.copy(Se),A=ht),m=N,C=!1}function dt(N,le){N.side===Xt?ie(s.CULL_FACE):k(s.CULL_FACE);let Z=N.side===Yt;le&&(Z=!Z),Ke(Z),N.blending===zs&&N.transparent===!1?Je(Qn):Je(N.blending,N.blendEquation,N.blendSrc,N.blendDst,N.blendEquationAlpha,N.blendSrcAlpha,N.blendDstAlpha,N.blendColor,N.blendAlpha,N.premultipliedAlpha),a.setFunc(N.depthFunc),a.setTest(N.depthTest),a.setMask(N.depthWrite),r.setMask(N.colorWrite);const ce=N.stencilWrite;o.setTest(ce),ce&&(o.setMask(N.stencilWriteMask),o.setFunc(N.stencilFunc,N.stencilRef,N.stencilFuncMask),o.setOp(N.stencilFail,N.stencilZFail,N.stencilZPass)),$t(N.polygonOffset,N.polygonOffsetFactor,N.polygonOffsetUnits),N.alphaToCoverage===!0?k(s.SAMPLE_ALPHA_TO_COVERAGE):ie(s.SAMPLE_ALPHA_TO_COVERAGE)}function Ke(N){L!==N&&(N?s.frontFace(s.CW):s.frontFace(s.CCW),L=N)}function pt(N){N!==Su?(k(s.CULL_FACE),N!==B&&(N===fc?s.cullFace(s.BACK):N===Eu?s.cullFace(s.FRONT):s.cullFace(s.FRONT_AND_BACK))):ie(s.CULL_FACE),B=N}function It(N){N!==V&&(X&&s.lineWidth(N),V=N)}function $t(N,le,Z){N?(k(s.POLYGON_OFFSET_FILL),(O!==le||G!==Z)&&(O=le,G=Z,a.getReversed()&&(le=-le),s.polygonOffset(le,Z))):ie(s.POLYGON_OFFSET_FILL)}function gt(N){N?k(s.SCISSOR_TEST):ie(s.SCISSOR_TEST)}function bt(N){N===void 0&&(N=s.TEXTURE0+J-1),Q!==N&&(s.activeTexture(N),Q=N)}function U(N,le,Z){Z===void 0&&(Q===null?Z=s.TEXTURE0+J-1:Z=Q);let ce=ee[Z];ce===void 0&&(ce={type:void 0,texture:void 0},ee[Z]=ce),(ce.type!==N||ce.texture!==le)&&(Q!==Z&&(s.activeTexture(Z),Q=Z),s.bindTexture(N,le||I[N]),ce.type=N,ce.texture=le)}function Ft(){const N=ee[Q];N!==void 0&&N.type!==void 0&&(s.bindTexture(N.type,null),N.type=void 0,N.texture=void 0)}function tt(){try{s.compressedTexImage2D(...arguments)}catch(N){Ne("WebGLState:",N)}}function R(){try{s.compressedTexImage3D(...arguments)}catch(N){Ne("WebGLState:",N)}}function x(){try{s.texSubImage2D(...arguments)}catch(N){Ne("WebGLState:",N)}}function F(){try{s.texSubImage3D(...arguments)}catch(N){Ne("WebGLState:",N)}}function W(){try{s.compressedTexSubImage2D(...arguments)}catch(N){Ne("WebGLState:",N)}}function K(){try{s.compressedTexSubImage3D(...arguments)}catch(N){Ne("WebGLState:",N)}}function se(){try{s.texStorage2D(...arguments)}catch(N){Ne("WebGLState:",N)}}function re(){try{s.texStorage3D(...arguments)}catch(N){Ne("WebGLState:",N)}}function Y(){try{s.texImage2D(...arguments)}catch(N){Ne("WebGLState:",N)}}function j(){try{s.texImage3D(...arguments)}catch(N){Ne("WebGLState:",N)}}function ae(N){return h[N]!==void 0?h[N]:s.getParameter(N)}function Re(N,le){h[N]!==le&&(s.pixelStorei(N,le),h[N]=le)}function de(N){et.equals(N)===!1&&(s.scissor(N.x,N.y,N.z,N.w),et.copy(N))}function oe(N){We.equals(N)===!1&&(s.viewport(N.x,N.y,N.z,N.w),We.copy(N))}function Ce(N,le){let Z=c.get(le);Z===void 0&&(Z=new WeakMap,c.set(le,Z));let ce=Z.get(N);ce===void 0&&(ce=s.getUniformBlockIndex(le,N.name),Z.set(N,ce))}function De(N,le){const ce=c.get(le).get(N);l.get(le)!==ce&&(s.uniformBlockBinding(le,ce,N.__bindingPointIndex),l.set(le,ce))}function Fe(){s.disable(s.BLEND),s.disable(s.CULL_FACE),s.disable(s.DEPTH_TEST),s.disable(s.POLYGON_OFFSET_FILL),s.disable(s.SCISSOR_TEST),s.disable(s.STENCIL_TEST),s.disable(s.SAMPLE_ALPHA_TO_COVERAGE),s.blendEquation(s.FUNC_ADD),s.blendFunc(s.ONE,s.ZERO),s.blendFuncSeparate(s.ONE,s.ZERO,s.ONE,s.ZERO),s.blendColor(0,0,0,0),s.colorMask(!0,!0,!0,!0),s.clearColor(0,0,0,0),s.depthMask(!0),s.depthFunc(s.LESS),a.setReversed(!1),s.clearDepth(1),s.stencilMask(4294967295),s.stencilFunc(s.ALWAYS,0,4294967295),s.stencilOp(s.KEEP,s.KEEP,s.KEEP),s.clearStencil(0),s.cullFace(s.BACK),s.frontFace(s.CCW),s.polygonOffset(0,0),s.activeTexture(s.TEXTURE0),s.bindFramebuffer(s.FRAMEBUFFER,null),s.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),s.bindFramebuffer(s.READ_FRAMEBUFFER,null),s.useProgram(null),s.lineWidth(1),s.scissor(0,0,s.canvas.width,s.canvas.height),s.viewport(0,0,s.canvas.width,s.canvas.height),s.pixelStorei(s.PACK_ALIGNMENT,4),s.pixelStorei(s.UNPACK_ALIGNMENT,4),s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,!1),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,s.BROWSER_DEFAULT_WEBGL),s.pixelStorei(s.PACK_ROW_LENGTH,0),s.pixelStorei(s.PACK_SKIP_PIXELS,0),s.pixelStorei(s.PACK_SKIP_ROWS,0),s.pixelStorei(s.UNPACK_ROW_LENGTH,0),s.pixelStorei(s.UNPACK_IMAGE_HEIGHT,0),s.pixelStorei(s.UNPACK_SKIP_PIXELS,0),s.pixelStorei(s.UNPACK_SKIP_ROWS,0),s.pixelStorei(s.UNPACK_SKIP_IMAGES,0),d={},h={},Q=null,ee={},u={},f=new WeakMap,g=[],y=null,p=!1,m=null,S=null,T=null,_=null,b=null,E=null,w=null,v=new Ie(0,0,0),A=0,C=!1,L=null,B=null,V=null,O=null,G=null,et.set(0,0,s.canvas.width,s.canvas.height),We.set(0,0,s.canvas.width,s.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:k,disable:ie,bindFramebuffer:ve,drawBuffers:fe,useProgram:Ue,setBlending:Je,setMaterial:dt,setFlipSided:Ke,setCullFace:pt,setLineWidth:It,setPolygonOffset:$t,setScissorTest:gt,activeTexture:bt,bindTexture:U,unbindTexture:Ft,compressedTexImage2D:tt,compressedTexImage3D:R,texImage2D:Y,texImage3D:j,pixelStorei:Re,getParameter:ae,updateUBOMapping:Ce,uniformBlockBinding:De,texStorage2D:se,texStorage3D:re,texSubImage2D:x,texSubImage3D:F,compressedTexSubImage2D:W,compressedTexSubImage3D:K,scissor:de,viewport:oe,reset:Fe}}function Y0(s,e,t,n,i,r,a){const o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new _e,d=new WeakMap,h=new Set;let u;const f=new WeakMap;let g=!1;try{g=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function y(R,x){return g?new OffscreenCanvas(R,x):js("canvas")}function p(R,x,F){let W=1;const K=tt(R);if((K.width>F||K.height>F)&&(W=F/Math.max(K.width,K.height)),W<1)if(typeof HTMLImageElement<"u"&&R instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&R instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&R instanceof ImageBitmap||typeof VideoFrame<"u"&&R instanceof VideoFrame){const se=Math.floor(W*K.width),re=Math.floor(W*K.height);u===void 0&&(u=y(se,re));const Y=x?y(se,re):u;return Y.width=se,Y.height=re,Y.getContext("2d").drawImage(R,0,0,se,re),Ae("WebGLRenderer: Texture has been resized from ("+K.width+"x"+K.height+") to ("+se+"x"+re+")."),Y}else return"data"in R&&Ae("WebGLRenderer: Image in DataTexture is too big ("+K.width+"x"+K.height+")."),R;return R}function m(R){return R.generateMipmaps}function S(R){s.generateMipmap(R)}function T(R){return R.isWebGLCubeRenderTarget?s.TEXTURE_CUBE_MAP:R.isWebGL3DRenderTarget?s.TEXTURE_3D:R.isWebGLArrayRenderTarget||R.isCompressedArrayTexture?s.TEXTURE_2D_ARRAY:s.TEXTURE_2D}function _(R,x,F,W,K,se=!1){if(R!==null){if(s[R]!==void 0)return s[R];Ae("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+R+"'")}let re;W&&(re=e.get("EXT_texture_norm16"),re||Ae("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let Y=x;if(x===s.RED&&(F===s.FLOAT&&(Y=s.R32F),F===s.HALF_FLOAT&&(Y=s.R16F),F===s.UNSIGNED_BYTE&&(Y=s.R8),F===s.UNSIGNED_SHORT&&re&&(Y=re.R16_EXT),F===s.SHORT&&re&&(Y=re.R16_SNORM_EXT)),x===s.RED_INTEGER&&(F===s.UNSIGNED_BYTE&&(Y=s.R8UI),F===s.UNSIGNED_SHORT&&(Y=s.R16UI),F===s.UNSIGNED_INT&&(Y=s.R32UI),F===s.BYTE&&(Y=s.R8I),F===s.SHORT&&(Y=s.R16I),F===s.INT&&(Y=s.R32I)),x===s.RG&&(F===s.FLOAT&&(Y=s.RG32F),F===s.HALF_FLOAT&&(Y=s.RG16F),F===s.UNSIGNED_BYTE&&(Y=s.RG8),F===s.UNSIGNED_SHORT&&re&&(Y=re.RG16_EXT),F===s.SHORT&&re&&(Y=re.RG16_SNORM_EXT)),x===s.RG_INTEGER&&(F===s.UNSIGNED_BYTE&&(Y=s.RG8UI),F===s.UNSIGNED_SHORT&&(Y=s.RG16UI),F===s.UNSIGNED_INT&&(Y=s.RG32UI),F===s.BYTE&&(Y=s.RG8I),F===s.SHORT&&(Y=s.RG16I),F===s.INT&&(Y=s.RG32I)),x===s.RGB_INTEGER&&(F===s.UNSIGNED_BYTE&&(Y=s.RGB8UI),F===s.UNSIGNED_SHORT&&(Y=s.RGB16UI),F===s.UNSIGNED_INT&&(Y=s.RGB32UI),F===s.BYTE&&(Y=s.RGB8I),F===s.SHORT&&(Y=s.RGB16I),F===s.INT&&(Y=s.RGB32I)),x===s.RGBA_INTEGER&&(F===s.UNSIGNED_BYTE&&(Y=s.RGBA8UI),F===s.UNSIGNED_SHORT&&(Y=s.RGBA16UI),F===s.UNSIGNED_INT&&(Y=s.RGBA32UI),F===s.BYTE&&(Y=s.RGBA8I),F===s.SHORT&&(Y=s.RGBA16I),F===s.INT&&(Y=s.RGBA32I)),x===s.RGB&&(F===s.UNSIGNED_SHORT&&re&&(Y=re.RGB16_EXT),F===s.SHORT&&re&&(Y=re.RGB16_SNORM_EXT),F===s.UNSIGNED_INT_5_9_9_9_REV&&(Y=s.RGB9_E5),F===s.UNSIGNED_INT_10F_11F_11F_REV&&(Y=s.R11F_G11F_B10F)),x===s.RGBA){const j=se?Qr:qe.getTransfer(K);F===s.FLOAT&&(Y=s.RGBA32F),F===s.HALF_FLOAT&&(Y=s.RGBA16F),F===s.UNSIGNED_BYTE&&(Y=j===nt?s.SRGB8_ALPHA8:s.RGBA8),F===s.UNSIGNED_SHORT&&re&&(Y=re.RGBA16_EXT),F===s.SHORT&&re&&(Y=re.RGBA16_SNORM_EXT),F===s.UNSIGNED_SHORT_4_4_4_4&&(Y=s.RGBA4),F===s.UNSIGNED_SHORT_5_5_5_1&&(Y=s.RGB5_A1)}return(Y===s.R16F||Y===s.R32F||Y===s.RG16F||Y===s.RG32F||Y===s.RGBA16F||Y===s.RGBA32F)&&e.get("EXT_color_buffer_float"),Y}function b(R,x){let F;return R?x===null||x===Fn||x===Ks?F=s.DEPTH24_STENCIL8:x===an?F=s.DEPTH32F_STENCIL8:x===qs&&(F=s.DEPTH24_STENCIL8,Ae("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):x===null||x===Fn||x===Ks?F=s.DEPTH_COMPONENT24:x===an?F=s.DEPTH_COMPONENT32F:x===qs&&(F=s.DEPTH_COMPONENT16),F}function E(R,x){return m(R)===!0||R.isFramebufferTexture&&R.minFilter!==At&&R.minFilter!==Rt?Math.log2(Math.max(x.width,x.height))+1:R.mipmaps!==void 0&&R.mipmaps.length>0?R.mipmaps.length:R.isCompressedTexture&&Array.isArray(R.image)?x.mipmaps.length:1}function w(R){const x=R.target;x.removeEventListener("dispose",w),A(x),x.isVideoTexture&&d.delete(x),x.isHTMLTexture&&h.delete(x)}function v(R){const x=R.target;x.removeEventListener("dispose",v),L(x)}function A(R){const x=n.get(R);if(x.__webglInit===void 0)return;const F=R.source,W=f.get(F);if(W){const K=W[x.__cacheKey];K.usedTimes--,K.usedTimes===0&&C(R),Object.keys(W).length===0&&f.delete(F)}n.remove(R)}function C(R){const x=n.get(R);s.deleteTexture(x.__webglTexture);const F=R.source,W=f.get(F);delete W[x.__cacheKey],a.memory.textures--}function L(R){const x=n.get(R);if(R.depthTexture&&(R.depthTexture.dispose(),n.remove(R.depthTexture)),R.isWebGLCubeRenderTarget)for(let W=0;W<6;W++){if(Array.isArray(x.__webglFramebuffer[W]))for(let K=0;K<x.__webglFramebuffer[W].length;K++)s.deleteFramebuffer(x.__webglFramebuffer[W][K]);else s.deleteFramebuffer(x.__webglFramebuffer[W]);x.__webglDepthbuffer&&s.deleteRenderbuffer(x.__webglDepthbuffer[W])}else{if(Array.isArray(x.__webglFramebuffer))for(let W=0;W<x.__webglFramebuffer.length;W++)s.deleteFramebuffer(x.__webglFramebuffer[W]);else s.deleteFramebuffer(x.__webglFramebuffer);if(x.__webglDepthbuffer&&s.deleteRenderbuffer(x.__webglDepthbuffer),x.__webglMultisampledFramebuffer&&s.deleteFramebuffer(x.__webglMultisampledFramebuffer),x.__webglColorRenderbuffer)for(let W=0;W<x.__webglColorRenderbuffer.length;W++)x.__webglColorRenderbuffer[W]&&s.deleteRenderbuffer(x.__webglColorRenderbuffer[W]);x.__webglDepthRenderbuffer&&s.deleteRenderbuffer(x.__webglDepthRenderbuffer)}const F=R.textures;for(let W=0,K=F.length;W<K;W++){const se=n.get(F[W]);se.__webglTexture&&(s.deleteTexture(se.__webglTexture),a.memory.textures--),n.remove(F[W])}n.remove(R)}let B=0;function V(){B=0}function O(){return B}function G(R){B=R}function J(){const R=B;return R>=i.maxTextures&&Ae("WebGLTextures: Trying to use "+(R+1)+" texture units while this GPU supports only "+i.maxTextures),B+=1,R}function X(R){const x=[];return x.push(R.wrapS),x.push(R.wrapT),x.push(R.wrapR||0),x.push(R.magFilter),x.push(R.minFilter),x.push(R.anisotropy),x.push(R.internalFormat),x.push(R.format),x.push(R.type),x.push(R.generateMipmaps),x.push(R.premultiplyAlpha),x.push(R.flipY),x.push(R.unpackAlignment),x.push(R.colorSpace),x.join()}function ne(R,x){const F=n.get(R);if(R.isVideoTexture&&U(R),R.isRenderTargetTexture===!1&&R.isExternalTexture!==!0&&R.version>0&&F.__version!==R.version){const W=R.image;if(W===null)Ae("WebGLRenderer: Texture marked for update but no image data found.");else if(W.complete===!1)Ae("WebGLRenderer: Texture marked for update but image is incomplete");else{ie(F,R,x);return}}else R.isExternalTexture&&(F.__webglTexture=R.sourceTexture?R.sourceTexture:null);t.bindTexture(s.TEXTURE_2D,F.__webglTexture,s.TEXTURE0+x)}function q(R,x){const F=n.get(R);if(R.isRenderTargetTexture===!1&&R.version>0&&F.__version!==R.version){ie(F,R,x);return}else R.isExternalTexture&&(F.__webglTexture=R.sourceTexture?R.sourceTexture:null);t.bindTexture(s.TEXTURE_2D_ARRAY,F.__webglTexture,s.TEXTURE0+x)}function Q(R,x){const F=n.get(R);if(R.isRenderTargetTexture===!1&&R.version>0&&F.__version!==R.version){ie(F,R,x);return}t.bindTexture(s.TEXTURE_3D,F.__webglTexture,s.TEXTURE0+x)}function ee(R,x){const F=n.get(R);if(R.isCubeDepthTexture!==!0&&R.version>0&&F.__version!==R.version){ve(F,R,x);return}t.bindTexture(s.TEXTURE_CUBE_MAP,F.__webglTexture,s.TEXTURE0+x)}const Pe={[ms]:s.REPEAT,[Pn]:s.CLAMP_TO_EDGE,[Zr]:s.MIRRORED_REPEAT},Ee={[At]:s.NEAREST,[fh]:s.NEAREST_MIPMAP_NEAREST,[Fs]:s.NEAREST_MIPMAP_LINEAR,[Rt]:s.LINEAR,[zr]:s.LINEAR_MIPMAP_NEAREST,[Zn]:s.LINEAR_MIPMAP_LINEAR},et={[ju]:s.NEVER,[sf]:s.ALWAYS,[Qu]:s.LESS,[Ll]:s.LEQUAL,[ef]:s.EQUAL,[Il]:s.GEQUAL,[tf]:s.GREATER,[nf]:s.NOTEQUAL};function We(R,x){if(x.type===an&&e.has("OES_texture_float_linear")===!1&&(x.magFilter===Rt||x.magFilter===zr||x.magFilter===Fs||x.magFilter===Zn||x.minFilter===Rt||x.minFilter===zr||x.minFilter===Fs||x.minFilter===Zn)&&Ae("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),s.texParameteri(R,s.TEXTURE_WRAP_S,Pe[x.wrapS]),s.texParameteri(R,s.TEXTURE_WRAP_T,Pe[x.wrapT]),(R===s.TEXTURE_3D||R===s.TEXTURE_2D_ARRAY)&&s.texParameteri(R,s.TEXTURE_WRAP_R,Pe[x.wrapR]),s.texParameteri(R,s.TEXTURE_MAG_FILTER,Ee[x.magFilter]),s.texParameteri(R,s.TEXTURE_MIN_FILTER,Ee[x.minFilter]),x.compareFunction&&(s.texParameteri(R,s.TEXTURE_COMPARE_MODE,s.COMPARE_REF_TO_TEXTURE),s.texParameteri(R,s.TEXTURE_COMPARE_FUNC,et[x.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(x.magFilter===At||x.minFilter!==Fs&&x.minFilter!==Zn||x.type===an&&e.has("OES_texture_float_linear")===!1)return;if(x.anisotropy>1||n.get(x).__currentAnisotropy){const F=e.get("EXT_texture_filter_anisotropic");s.texParameterf(R,F.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(x.anisotropy,i.getMaxAnisotropy())),n.get(x).__currentAnisotropy=x.anisotropy}}}function Ze(R,x){let F=!1;R.__webglInit===void 0&&(R.__webglInit=!0,x.addEventListener("dispose",w));const W=x.source;let K=f.get(W);K===void 0&&(K={},f.set(W,K));const se=X(x);if(se!==R.__cacheKey){K[se]===void 0&&(K[se]={texture:s.createTexture(),usedTimes:0},a.memory.textures++,F=!0),K[se].usedTimes++;const re=K[R.__cacheKey];re!==void 0&&(K[R.__cacheKey].usedTimes--,re.usedTimes===0&&C(x)),R.__cacheKey=se,R.__webglTexture=K[se].texture}return F}function I(R,x,F){return Math.floor(Math.floor(R/F)/x)}function k(R,x,F,W){const se=R.updateRanges;if(se.length===0)t.texSubImage2D(s.TEXTURE_2D,0,0,0,x.width,x.height,F,W,x.data);else{se.sort((Re,de)=>Re.start-de.start);let re=0;for(let Re=1;Re<se.length;Re++){const de=se[re],oe=se[Re],Ce=de.start+de.count,De=I(oe.start,x.width,4),Fe=I(de.start,x.width,4);oe.start<=Ce+1&&De===Fe&&I(oe.start+oe.count-1,x.width,4)===De?de.count=Math.max(de.count,oe.start+oe.count-de.start):(++re,se[re]=oe)}se.length=re+1;const Y=t.getParameter(s.UNPACK_ROW_LENGTH),j=t.getParameter(s.UNPACK_SKIP_PIXELS),ae=t.getParameter(s.UNPACK_SKIP_ROWS);t.pixelStorei(s.UNPACK_ROW_LENGTH,x.width);for(let Re=0,de=se.length;Re<de;Re++){const oe=se[Re],Ce=Math.floor(oe.start/4),De=Math.ceil(oe.count/4),Fe=Ce%x.width,N=Math.floor(Ce/x.width),le=De,Z=1;t.pixelStorei(s.UNPACK_SKIP_PIXELS,Fe),t.pixelStorei(s.UNPACK_SKIP_ROWS,N),t.texSubImage2D(s.TEXTURE_2D,0,Fe,N,le,Z,F,W,x.data)}R.clearUpdateRanges(),t.pixelStorei(s.UNPACK_ROW_LENGTH,Y),t.pixelStorei(s.UNPACK_SKIP_PIXELS,j),t.pixelStorei(s.UNPACK_SKIP_ROWS,ae)}}function ie(R,x,F){let W=s.TEXTURE_2D;(x.isDataArrayTexture||x.isCompressedArrayTexture)&&(W=s.TEXTURE_2D_ARRAY),x.isData3DTexture&&(W=s.TEXTURE_3D);const K=Ze(R,x),se=x.source;t.bindTexture(W,R.__webglTexture,s.TEXTURE0+F);const re=n.get(se);if(se.version!==re.__version||K===!0){if(t.activeTexture(s.TEXTURE0+F),(typeof ImageBitmap<"u"&&x.image instanceof ImageBitmap)===!1){const Z=qe.getPrimaries(qe.workingColorSpace),ce=x.colorSpace===vi?null:qe.getPrimaries(x.colorSpace),ge=x.colorSpace===vi||Z===ce?s.NONE:s.BROWSER_DEFAULT_WEBGL;t.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,x.flipY),t.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,x.premultiplyAlpha),t.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,ge)}t.pixelStorei(s.UNPACK_ALIGNMENT,x.unpackAlignment);let j=p(x.image,!1,i.maxTextureSize);j=Ft(x,j);const ae=r.convert(x.format,x.colorSpace),Re=r.convert(x.type);let de=_(x.internalFormat,ae,Re,x.normalized,x.colorSpace,x.isVideoTexture);We(W,x);let oe;const Ce=x.mipmaps,De=x.isVideoTexture!==!0,Fe=re.__version===void 0||K===!0,N=se.dataReady,le=E(x,j);if(x.isDepthTexture)de=b(x.format===Di,x.type),Fe&&(De?t.texStorage2D(s.TEXTURE_2D,1,de,j.width,j.height):t.texImage2D(s.TEXTURE_2D,0,de,j.width,j.height,0,ae,Re,null));else if(x.isDataTexture)if(Ce.length>0){De&&Fe&&t.texStorage2D(s.TEXTURE_2D,le,de,Ce[0].width,Ce[0].height);for(let Z=0,ce=Ce.length;Z<ce;Z++)oe=Ce[Z],De?N&&t.texSubImage2D(s.TEXTURE_2D,Z,0,0,oe.width,oe.height,ae,Re,oe.data):t.texImage2D(s.TEXTURE_2D,Z,de,oe.width,oe.height,0,ae,Re,oe.data);x.generateMipmaps=!1}else De?(Fe&&t.texStorage2D(s.TEXTURE_2D,le,de,j.width,j.height),N&&k(x,j,ae,Re)):t.texImage2D(s.TEXTURE_2D,0,de,j.width,j.height,0,ae,Re,j.data);else if(x.isCompressedTexture)if(x.isCompressedArrayTexture){De&&Fe&&t.texStorage3D(s.TEXTURE_2D_ARRAY,le,de,Ce[0].width,Ce[0].height,j.depth);for(let Z=0,ce=Ce.length;Z<ce;Z++)if(oe=Ce[Z],x.format!==on)if(ae!==null)if(De){if(N)if(x.layerUpdates.size>0){const ge=fd(oe.width,oe.height,x.format,x.type);for(const te of x.layerUpdates){const Le=oe.data.subarray(te*ge/oe.data.BYTES_PER_ELEMENT,(te+1)*ge/oe.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,Z,0,0,te,oe.width,oe.height,1,ae,Le)}}else t.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,Z,0,0,0,oe.width,oe.height,j.depth,ae,oe.data)}else t.compressedTexImage3D(s.TEXTURE_2D_ARRAY,Z,de,oe.width,oe.height,j.depth,0,oe.data,0,0);else Ae("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else De?N&&t.texSubImage3D(s.TEXTURE_2D_ARRAY,Z,0,0,0,oe.width,oe.height,j.depth,ae,Re,oe.data):t.texImage3D(s.TEXTURE_2D_ARRAY,Z,de,oe.width,oe.height,j.depth,0,ae,Re,oe.data);x.layerUpdates.size>0&&x.clearLayerUpdates()}else{De&&Fe&&t.texStorage2D(s.TEXTURE_2D,le,de,Ce[0].width,Ce[0].height);for(let Z=0,ce=Ce.length;Z<ce;Z++)oe=Ce[Z],x.format!==on?ae!==null?De?N&&t.compressedTexSubImage2D(s.TEXTURE_2D,Z,0,0,oe.width,oe.height,ae,oe.data):t.compressedTexImage2D(s.TEXTURE_2D,Z,de,oe.width,oe.height,0,oe.data):Ae("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):De?N&&t.texSubImage2D(s.TEXTURE_2D,Z,0,0,oe.width,oe.height,ae,Re,oe.data):t.texImage2D(s.TEXTURE_2D,Z,de,oe.width,oe.height,0,ae,Re,oe.data)}else if(x.isDataArrayTexture)if(De){if(Fe&&t.texStorage3D(s.TEXTURE_2D_ARRAY,le,de,j.width,j.height,j.depth),N)if(x.layerUpdates.size>0){const Z=fd(j.width,j.height,x.format,x.type);for(const ce of x.layerUpdates){const ge=j.data.subarray(ce*Z/j.data.BYTES_PER_ELEMENT,(ce+1)*Z/j.data.BYTES_PER_ELEMENT);t.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,ce,j.width,j.height,1,ae,Re,ge)}x.clearLayerUpdates()}else t.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,0,j.width,j.height,j.depth,ae,Re,j.data)}else t.texImage3D(s.TEXTURE_2D_ARRAY,0,de,j.width,j.height,j.depth,0,ae,Re,j.data);else if(x.isData3DTexture)De?(Fe&&t.texStorage3D(s.TEXTURE_3D,le,de,j.width,j.height,j.depth),N&&t.texSubImage3D(s.TEXTURE_3D,0,0,0,0,j.width,j.height,j.depth,ae,Re,j.data)):t.texImage3D(s.TEXTURE_3D,0,de,j.width,j.height,j.depth,0,ae,Re,j.data);else if(x.isFramebufferTexture){if(Fe)if(De)t.texStorage2D(s.TEXTURE_2D,le,de,j.width,j.height);else{let Z=j.width,ce=j.height;for(let ge=0;ge<le;ge++)t.texImage2D(s.TEXTURE_2D,ge,de,Z,ce,0,ae,Re,null),Z>>=1,ce>>=1}}else if(x.isHTMLTexture){if("texElementImage2D"in s){const Z=s.canvas;if(Z.hasAttribute("layoutsubtree")||Z.setAttribute("layoutsubtree","true"),j.parentNode!==Z){Z.appendChild(j),h.add(x),Z.onpaint=ce=>{const ge=ce.changedElements;for(const te of h)ge.includes(te.image)&&(te.needsUpdate=!0)},Z.requestPaint();return}if(s.texElementImage2D.length===3)s.texElementImage2D(s.TEXTURE_2D,s.RGBA8,j);else{const ge=s.RGBA,te=s.RGBA,Le=s.UNSIGNED_BYTE;s.texElementImage2D(s.TEXTURE_2D,0,ge,te,Le,j)}s.texParameteri(s.TEXTURE_2D,s.TEXTURE_MIN_FILTER,s.LINEAR),s.texParameteri(s.TEXTURE_2D,s.TEXTURE_WRAP_S,s.CLAMP_TO_EDGE),s.texParameteri(s.TEXTURE_2D,s.TEXTURE_WRAP_T,s.CLAMP_TO_EDGE)}}else if(Ce.length>0){if(De&&Fe){const Z=tt(Ce[0]);t.texStorage2D(s.TEXTURE_2D,le,de,Z.width,Z.height)}for(let Z=0,ce=Ce.length;Z<ce;Z++)oe=Ce[Z],De?N&&t.texSubImage2D(s.TEXTURE_2D,Z,0,0,ae,Re,oe):t.texImage2D(s.TEXTURE_2D,Z,de,ae,Re,oe);x.generateMipmaps=!1}else if(De){if(Fe){const Z=tt(j);t.texStorage2D(s.TEXTURE_2D,le,de,Z.width,Z.height)}N&&t.texSubImage2D(s.TEXTURE_2D,0,0,0,ae,Re,j)}else t.texImage2D(s.TEXTURE_2D,0,de,ae,Re,j);m(x)&&S(W),re.__version=se.version,x.onUpdate&&x.onUpdate(x)}R.__version=x.version}function ve(R,x,F){if(x.image.length!==6)return;const W=Ze(R,x),K=x.source;t.bindTexture(s.TEXTURE_CUBE_MAP,R.__webglTexture,s.TEXTURE0+F);const se=n.get(K);if(K.version!==se.__version||W===!0){t.activeTexture(s.TEXTURE0+F);const re=qe.getPrimaries(qe.workingColorSpace),Y=x.colorSpace===vi?null:qe.getPrimaries(x.colorSpace),j=x.colorSpace===vi||re===Y?s.NONE:s.BROWSER_DEFAULT_WEBGL;t.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,x.flipY),t.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,x.premultiplyAlpha),t.pixelStorei(s.UNPACK_ALIGNMENT,x.unpackAlignment),t.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,j);const ae=x.isCompressedTexture||x.image[0].isCompressedTexture,Re=x.image[0]&&x.image[0].isDataTexture,de=[];for(let te=0;te<6;te++)!ae&&!Re?de[te]=p(x.image[te],!0,i.maxCubemapSize):de[te]=Re?x.image[te].image:x.image[te],de[te]=Ft(x,de[te]);const oe=de[0],Ce=r.convert(x.format,x.colorSpace),De=r.convert(x.type),Fe=_(x.internalFormat,Ce,De,x.normalized,x.colorSpace),N=x.isVideoTexture!==!0,le=se.__version===void 0||W===!0,Z=K.dataReady;let ce=E(x,oe);We(s.TEXTURE_CUBE_MAP,x);let ge;if(ae){N&&le&&t.texStorage2D(s.TEXTURE_CUBE_MAP,ce,Fe,oe.width,oe.height);for(let te=0;te<6;te++){ge=de[te].mipmaps;for(let Le=0;Le<ge.length;Le++){const Se=ge[Le];x.format!==on?Ce!==null?N?Z&&t.compressedTexSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+te,Le,0,0,Se.width,Se.height,Ce,Se.data):t.compressedTexImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+te,Le,Fe,Se.width,Se.height,0,Se.data):Ae("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):N?Z&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+te,Le,0,0,Se.width,Se.height,Ce,De,Se.data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+te,Le,Fe,Se.width,Se.height,0,Ce,De,Se.data)}}}else{if(ge=x.mipmaps,N&&le){ge.length>0&&ce++;const te=tt(de[0]);t.texStorage2D(s.TEXTURE_CUBE_MAP,ce,Fe,te.width,te.height)}for(let te=0;te<6;te++)if(Re){N?Z&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+te,0,0,0,de[te].width,de[te].height,Ce,De,de[te].data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+te,0,Fe,de[te].width,de[te].height,0,Ce,De,de[te].data);for(let Le=0;Le<ge.length;Le++){const ht=ge[Le].image[te].image;N?Z&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+te,Le+1,0,0,ht.width,ht.height,Ce,De,ht.data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+te,Le+1,Fe,ht.width,ht.height,0,Ce,De,ht.data)}}else{N?Z&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+te,0,0,0,Ce,De,de[te]):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+te,0,Fe,Ce,De,de[te]);for(let Le=0;Le<ge.length;Le++){const Se=ge[Le];N?Z&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+te,Le+1,0,0,Ce,De,Se.image[te]):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+te,Le+1,Fe,Ce,De,Se.image[te])}}}m(x)&&S(s.TEXTURE_CUBE_MAP),se.__version=K.version,x.onUpdate&&x.onUpdate(x)}R.__version=x.version}function fe(R,x,F,W,K,se){const re=r.convert(F.format,F.colorSpace),Y=r.convert(F.type),j=_(F.internalFormat,re,Y,F.normalized,F.colorSpace),ae=n.get(x),Re=n.get(F);if(Re.__renderTarget=x,!ae.__hasExternalTextures){const de=Math.max(1,x.width>>se),oe=Math.max(1,x.height>>se);K===s.TEXTURE_3D||K===s.TEXTURE_2D_ARRAY?t.texImage3D(K,se,j,de,oe,x.depth,0,re,Y,null):t.texImage2D(K,se,j,de,oe,0,re,Y,null)}t.bindFramebuffer(s.FRAMEBUFFER,R),bt(x)?o.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,W,K,Re.__webglTexture,0,gt(x)):(K===s.TEXTURE_2D||K>=s.TEXTURE_CUBE_MAP_POSITIVE_X&&K<=s.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&s.framebufferTexture2D(s.FRAMEBUFFER,W,K,Re.__webglTexture,se),t.bindFramebuffer(s.FRAMEBUFFER,null)}function Ue(R,x,F){if(s.bindRenderbuffer(s.RENDERBUFFER,R),x.depthBuffer){const W=x.depthTexture,K=W&&W.isDepthTexture?W.type:null,se=b(x.stencilBuffer,K),re=x.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;bt(x)?o.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,gt(x),se,x.width,x.height):F?s.renderbufferStorageMultisample(s.RENDERBUFFER,gt(x),se,x.width,x.height):s.renderbufferStorage(s.RENDERBUFFER,se,x.width,x.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,re,s.RENDERBUFFER,R)}else{const W=x.textures;for(let K=0;K<W.length;K++){const se=W[K],re=r.convert(se.format,se.colorSpace),Y=r.convert(se.type),j=_(se.internalFormat,re,Y,se.normalized,se.colorSpace);bt(x)?o.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,gt(x),j,x.width,x.height):F?s.renderbufferStorageMultisample(s.RENDERBUFFER,gt(x),j,x.width,x.height):s.renderbufferStorage(s.RENDERBUFFER,j,x.width,x.height)}}s.bindRenderbuffer(s.RENDERBUFFER,null)}function vt(R,x,F){const W=x.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(s.FRAMEBUFFER,R),!(x.depthTexture&&x.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");const K=n.get(x.depthTexture);if(K.__renderTarget=x,(!K.__webglTexture||x.depthTexture.image.width!==x.width||x.depthTexture.image.height!==x.height)&&(x.depthTexture.image.width=x.width,x.depthTexture.image.height=x.height,x.depthTexture.needsUpdate=!0),W){if(K.__webglInit===void 0&&(K.__webglInit=!0,x.depthTexture.addEventListener("dispose",w)),K.__webglTexture===void 0){K.__webglTexture=s.createTexture(),t.bindTexture(s.TEXTURE_CUBE_MAP,K.__webglTexture),We(s.TEXTURE_CUBE_MAP,x.depthTexture);const ae=r.convert(x.depthTexture.format),Re=r.convert(x.depthTexture.type);let de;x.depthTexture.format===ii?de=s.DEPTH_COMPONENT24:x.depthTexture.format===Di&&(de=s.DEPTH24_STENCIL8);for(let oe=0;oe<6;oe++)s.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+oe,0,de,x.width,x.height,0,ae,Re,null)}}else ne(x.depthTexture,0);const se=K.__webglTexture,re=gt(x),Y=W?s.TEXTURE_CUBE_MAP_POSITIVE_X+F:s.TEXTURE_2D,j=x.depthTexture.format===Di?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;if(x.depthTexture.format===ii)bt(x)?o.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,j,Y,se,0,re):s.framebufferTexture2D(s.FRAMEBUFFER,j,Y,se,0);else if(x.depthTexture.format===Di)bt(x)?o.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,j,Y,se,0,re):s.framebufferTexture2D(s.FRAMEBUFFER,j,Y,se,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function Xe(R){const x=n.get(R),F=R.isWebGLCubeRenderTarget===!0;if(x.__boundDepthTexture!==R.depthTexture){const W=R.depthTexture;if(x.__depthDisposeCallback&&x.__depthDisposeCallback(),W){const K=()=>{delete x.__boundDepthTexture,delete x.__depthDisposeCallback,W.removeEventListener("dispose",K)};W.addEventListener("dispose",K),x.__depthDisposeCallback=K}x.__boundDepthTexture=W}if(R.depthTexture&&!x.__autoAllocateDepthBuffer)if(F)for(let W=0;W<6;W++)vt(x.__webglFramebuffer[W],R,W);else{const W=R.texture.mipmaps;W&&W.length>0?vt(x.__webglFramebuffer[0],R,0):vt(x.__webglFramebuffer,R,0)}else if(F){x.__webglDepthbuffer=[];for(let W=0;W<6;W++)if(t.bindFramebuffer(s.FRAMEBUFFER,x.__webglFramebuffer[W]),x.__webglDepthbuffer[W]===void 0)x.__webglDepthbuffer[W]=s.createRenderbuffer(),Ue(x.__webglDepthbuffer[W],R,!1);else{const K=R.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,se=x.__webglDepthbuffer[W];s.bindRenderbuffer(s.RENDERBUFFER,se),s.framebufferRenderbuffer(s.FRAMEBUFFER,K,s.RENDERBUFFER,se)}}else{const W=R.texture.mipmaps;if(W&&W.length>0?t.bindFramebuffer(s.FRAMEBUFFER,x.__webglFramebuffer[0]):t.bindFramebuffer(s.FRAMEBUFFER,x.__webglFramebuffer),x.__webglDepthbuffer===void 0)x.__webglDepthbuffer=s.createRenderbuffer(),Ue(x.__webglDepthbuffer,R,!1);else{const K=R.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,se=x.__webglDepthbuffer;s.bindRenderbuffer(s.RENDERBUFFER,se),s.framebufferRenderbuffer(s.FRAMEBUFFER,K,s.RENDERBUFFER,se)}}t.bindFramebuffer(s.FRAMEBUFFER,null)}function Je(R,x,F){const W=n.get(R);x!==void 0&&fe(W.__webglFramebuffer,R,R.texture,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,0),F!==void 0&&Xe(R)}function dt(R){const x=R.texture,F=n.get(R),W=n.get(x);R.addEventListener("dispose",v);const K=R.textures,se=R.isWebGLCubeRenderTarget===!0,re=K.length>1;if(re||(W.__webglTexture===void 0&&(W.__webglTexture=s.createTexture()),W.__version=x.version,a.memory.textures++),se){F.__webglFramebuffer=[];for(let Y=0;Y<6;Y++)if(x.mipmaps&&x.mipmaps.length>0){F.__webglFramebuffer[Y]=[];for(let j=0;j<x.mipmaps.length;j++)F.__webglFramebuffer[Y][j]=s.createFramebuffer()}else F.__webglFramebuffer[Y]=s.createFramebuffer()}else{if(x.mipmaps&&x.mipmaps.length>0){F.__webglFramebuffer=[];for(let Y=0;Y<x.mipmaps.length;Y++)F.__webglFramebuffer[Y]=s.createFramebuffer()}else F.__webglFramebuffer=s.createFramebuffer();if(re)for(let Y=0,j=K.length;Y<j;Y++){const ae=n.get(K[Y]);ae.__webglTexture===void 0&&(ae.__webglTexture=s.createTexture(),a.memory.textures++)}if(R.samples>0&&bt(R)===!1){F.__webglMultisampledFramebuffer=s.createFramebuffer(),F.__webglColorRenderbuffer=[],t.bindFramebuffer(s.FRAMEBUFFER,F.__webglMultisampledFramebuffer);for(let Y=0;Y<K.length;Y++){const j=K[Y];F.__webglColorRenderbuffer[Y]=s.createRenderbuffer(),s.bindRenderbuffer(s.RENDERBUFFER,F.__webglColorRenderbuffer[Y]);const ae=r.convert(j.format,j.colorSpace),Re=r.convert(j.type),de=_(j.internalFormat,ae,Re,j.normalized,j.colorSpace,R.isXRRenderTarget===!0),oe=gt(R);s.renderbufferStorageMultisample(s.RENDERBUFFER,oe,de,R.width,R.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+Y,s.RENDERBUFFER,F.__webglColorRenderbuffer[Y])}s.bindRenderbuffer(s.RENDERBUFFER,null),R.depthBuffer&&(F.__webglDepthRenderbuffer=s.createRenderbuffer(),Ue(F.__webglDepthRenderbuffer,R,!0)),t.bindFramebuffer(s.FRAMEBUFFER,null)}}if(se){t.bindTexture(s.TEXTURE_CUBE_MAP,W.__webglTexture),We(s.TEXTURE_CUBE_MAP,x);for(let Y=0;Y<6;Y++)if(x.mipmaps&&x.mipmaps.length>0)for(let j=0;j<x.mipmaps.length;j++)fe(F.__webglFramebuffer[Y][j],R,x,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+Y,j);else fe(F.__webglFramebuffer[Y],R,x,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+Y,0);m(x)&&S(s.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(re){for(let Y=0,j=K.length;Y<j;Y++){const ae=K[Y],Re=n.get(ae);let de=s.TEXTURE_2D;(R.isWebGL3DRenderTarget||R.isWebGLArrayRenderTarget)&&(de=R.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY),t.bindTexture(de,Re.__webglTexture),We(de,ae),fe(F.__webglFramebuffer,R,ae,s.COLOR_ATTACHMENT0+Y,de,0),m(ae)&&S(de)}t.unbindTexture()}else{let Y=s.TEXTURE_2D;if((R.isWebGL3DRenderTarget||R.isWebGLArrayRenderTarget)&&(Y=R.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY),t.bindTexture(Y,W.__webglTexture),We(Y,x),x.mipmaps&&x.mipmaps.length>0)for(let j=0;j<x.mipmaps.length;j++)fe(F.__webglFramebuffer[j],R,x,s.COLOR_ATTACHMENT0,Y,j);else fe(F.__webglFramebuffer,R,x,s.COLOR_ATTACHMENT0,Y,0);m(x)&&S(Y),t.unbindTexture()}R.depthBuffer&&Xe(R)}function Ke(R){const x=R.textures;for(let F=0,W=x.length;F<W;F++){const K=x[F];if(m(K)){const se=T(R),re=n.get(K).__webglTexture;t.bindTexture(se,re),S(se),t.unbindTexture()}}}const pt=[],It=[];function $t(R){if(R.samples>0){if(bt(R)===!1){const x=R.textures,F=R.width,W=R.height;let K=s.COLOR_BUFFER_BIT;const se=R.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,re=n.get(R),Y=x.length>1;if(Y)for(let ae=0;ae<x.length;ae++)t.bindFramebuffer(s.FRAMEBUFFER,re.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+ae,s.RENDERBUFFER,null),t.bindFramebuffer(s.FRAMEBUFFER,re.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+ae,s.TEXTURE_2D,null,0);t.bindFramebuffer(s.READ_FRAMEBUFFER,re.__webglMultisampledFramebuffer);const j=R.texture.mipmaps;j&&j.length>0?t.bindFramebuffer(s.DRAW_FRAMEBUFFER,re.__webglFramebuffer[0]):t.bindFramebuffer(s.DRAW_FRAMEBUFFER,re.__webglFramebuffer);for(let ae=0;ae<x.length;ae++){if(R.resolveDepthBuffer&&(R.depthBuffer&&(K|=s.DEPTH_BUFFER_BIT),R.stencilBuffer&&R.resolveStencilBuffer&&(K|=s.STENCIL_BUFFER_BIT)),Y){s.framebufferRenderbuffer(s.READ_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.RENDERBUFFER,re.__webglColorRenderbuffer[ae]);const Re=n.get(x[ae]).__webglTexture;s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,Re,0)}s.blitFramebuffer(0,0,F,W,0,0,F,W,K,s.NEAREST),l===!0&&(pt.length=0,It.length=0,pt.push(s.COLOR_ATTACHMENT0+ae),R.depthBuffer&&R.storeMultisampledDepthBuffer===!1&&(pt.push(se),It.push(se),s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,It)),s.invalidateFramebuffer(s.READ_FRAMEBUFFER,pt))}if(t.bindFramebuffer(s.READ_FRAMEBUFFER,null),t.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),Y)for(let ae=0;ae<x.length;ae++){t.bindFramebuffer(s.FRAMEBUFFER,re.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+ae,s.RENDERBUFFER,re.__webglColorRenderbuffer[ae]);const Re=n.get(x[ae]).__webglTexture;t.bindFramebuffer(s.FRAMEBUFFER,re.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+ae,s.TEXTURE_2D,Re,0)}t.bindFramebuffer(s.DRAW_FRAMEBUFFER,re.__webglMultisampledFramebuffer)}else if(R.depthBuffer&&R.storeMultisampledDepthBuffer===!1&&l){const x=R.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,[x])}}}function gt(R){return Math.min(i.maxSamples,R.samples)}function bt(R){const x=n.get(R);return R.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&x.__useRenderToTexture!==!1}function U(R){const x=a.render.frame;d.get(R)!==x&&(d.set(R,x),R.update())}function Ft(R,x){const F=R.colorSpace,W=R.format,K=R.type;return R.isCompressedTexture===!0||R.isVideoTexture===!0||F!==en&&F!==vi&&(qe.getTransfer(F)===nt?(W!==on||K!==Qt)&&Ae("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Ne("WebGLTextures: Unsupported texture color space:",F)),x}function tt(R){return typeof HTMLImageElement<"u"&&R instanceof HTMLImageElement?(c.width=R.naturalWidth||R.width,c.height=R.naturalHeight||R.height):typeof VideoFrame<"u"&&R instanceof VideoFrame?(c.width=R.displayWidth,c.height=R.displayHeight):(c.width=R.width,c.height=R.height),c}this.allocateTextureUnit=J,this.resetTextureUnits=V,this.getTextureUnits=O,this.setTextureUnits=G,this.setTexture2D=ne,this.setTexture2DArray=q,this.setTexture3D=Q,this.setTextureCube=ee,this.rebindTextures=Je,this.setupRenderTarget=dt,this.updateRenderTargetMipmap=Ke,this.updateMultisampleRenderTarget=$t,this.setupDepthRenderbuffer=Xe,this.setupFrameBufferTexture=fe,this.useMultisampledRTT=bt,this.isReversedDepthBuffer=function(){return t.buffers.depth.getReversed()}}function Z0(s,e){function t(n,i=vi){let r;const a=qe.getTransfer(i);if(n===Qt)return s.UNSIGNED_BYTE;if(n===Tl)return s.UNSIGNED_SHORT_4_4_4_4;if(n===wl)return s.UNSIGNED_SHORT_5_5_5_1;if(n===gh)return s.UNSIGNED_INT_5_9_9_9_REV;if(n===_h)return s.UNSIGNED_INT_10F_11F_11F_REV;if(n===ph)return s.BYTE;if(n===mh)return s.SHORT;if(n===qs)return s.UNSIGNED_SHORT;if(n===El)return s.INT;if(n===Fn)return s.UNSIGNED_INT;if(n===an)return s.FLOAT;if(n===Bn)return s.HALF_FLOAT;if(n===vh)return s.ALPHA;if(n===xh)return s.RGB;if(n===on)return s.RGBA;if(n===ii)return s.DEPTH_COMPONENT;if(n===Di)return s.DEPTH_STENCIL;if(n===Al)return s.RED;if(n===Rl)return s.RED_INTEGER;if(n===Oi)return s.RG;if(n===Cl)return s.RG_INTEGER;if(n===Pl)return s.RGBA_INTEGER;if(n===Hr||n===Gr||n===Vr||n===Wr)if(a===nt)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===Hr)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Gr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Vr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Wr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===Hr)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Gr)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Vr)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Wr)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Ro||n===Co||n===Po||n===Lo)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===Ro)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Co)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Po)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Lo)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Io||n===Do||n===No||n===Uo||n===Oo||n===Jr||n===Fo)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(n===Io||n===Do)return a===nt?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===No)return a===nt?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(n===Uo)return r.COMPRESSED_R11_EAC;if(n===Oo)return r.COMPRESSED_SIGNED_R11_EAC;if(n===Jr)return r.COMPRESSED_RG11_EAC;if(n===Fo)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(n===Bo||n===ko||n===zo||n===Ho||n===Go||n===Vo||n===Wo||n===Xo||n===$o||n===qo||n===Ko||n===Yo||n===Zo||n===Jo)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(n===Bo)return a===nt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===ko)return a===nt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===zo)return a===nt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Ho)return a===nt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Go)return a===nt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Vo)return a===nt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Wo)return a===nt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Xo)return a===nt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===$o)return a===nt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===qo)return a===nt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Ko)return a===nt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Yo)return a===nt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Zo)return a===nt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Jo)return a===nt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===jo||n===Qo||n===el)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(n===jo)return a===nt?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Qo)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===el)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===tl||n===nl||n===jr||n===il)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(n===tl)return r.COMPRESSED_RED_RGTC1_EXT;if(n===nl)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===jr)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===il)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Ks?s.UNSIGNED_INT_24_8:s[n]!==void 0?s[n]:null}return{convert:t}}const J0=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,j0=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class Q0{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){const n=new Lh(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,n=new kn({vertexShader:J0,fragmentShader:j0,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new yt(new ha(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class ex extends Ti{constructor(e,t){super();const n=this;let i=null,r=1,a=null,o="local-floor",l=1,c=null,d=null,h=null,u=null,f=null,g=null;const y=typeof XRWebGLBinding<"u",p=new Q0,m={},S=t.getContextAttributes();let T=null,_=null;const b=[],E=[],w=new _e;let v=null,A=null;const C=new Wt;C.viewport=new lt;const L=new Wt;L.viewport=new lt;const B=[C,L],V=new Jp;let O=null,G=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(I){let k=b[I];return k===void 0&&(k=new La,b[I]=k),k.getTargetRaySpace()},this.getControllerGrip=function(I){let k=b[I];return k===void 0&&(k=new La,b[I]=k),k.getGripSpace()},this.getHand=function(I){let k=b[I];return k===void 0&&(k=new La,b[I]=k),k.getHandSpace()};function J(I){const k=E.indexOf(I.inputSource);if(k===-1)return;const ie=b[k];ie!==void 0&&(ie.update(I.inputSource,I.frame,c||a),ie.dispatchEvent({type:I.type,data:I.inputSource}))}function X(){i.removeEventListener("select",J),i.removeEventListener("selectstart",J),i.removeEventListener("selectend",J),i.removeEventListener("squeeze",J),i.removeEventListener("squeezestart",J),i.removeEventListener("squeezeend",J),i.removeEventListener("end",X),i.removeEventListener("inputsourceschange",ne);for(let I=0;I<b.length;I++){const k=E[I];k!==null&&(E[I]=null,b[I].disconnect(k))}O=null,G=null,p.reset();for(const I in m)delete m[I];if(e.setRenderTarget(T),f=null,u=null,h=null,i=null,_=null,Ze.stop(),n.isPresenting=!1,e.setPixelRatio(v),e.setSize(w.width,w.height,!1),A!==null){const I=A.camera;I.fov=A.fov,I.zoom=A.zoom,I.updateProjectionMatrix(),A=null}n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(I){r=I,n.isPresenting===!0&&Ae("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(I){o=I,n.isPresenting===!0&&Ae("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(I){c=I},this.getBaseLayer=function(){return u!==null?u:f},this.getBinding=function(){return h===null&&y&&(h=new XRWebGLBinding(i,t)),h},this.getFrame=function(){return g},this.getSession=function(){return i},this.setSession=async function(I){if(i=I,i!==null){if(T=e.getRenderTarget(),i.addEventListener("select",J),i.addEventListener("selectstart",J),i.addEventListener("selectend",J),i.addEventListener("squeeze",J),i.addEventListener("squeezestart",J),i.addEventListener("squeezeend",J),i.addEventListener("end",X),i.addEventListener("inputsourceschange",ne),S.xrCompatible!==!0&&await t.makeXRCompatible(),v=e.getPixelRatio(),e.getSize(w),y&&"createProjectionLayer"in XRWebGLBinding.prototype){let ie=null,ve=null,fe=null;S.depth&&(fe=S.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,ie=S.stencil?Di:ii,ve=S.stencil?Ks:Fn);const Ue={colorFormat:t.RGBA8,depthFormat:fe,scaleFactor:r};h=this.getBinding(),u=h.createProjectionLayer(Ue),i.updateRenderState({layers:[u]}),e.setPixelRatio(1),e.setSize(u.textureWidth,u.textureHeight,!1),_=new vn(u.textureWidth,u.textureHeight,{format:on,type:Qt,depthTexture:new er(u.textureWidth,u.textureHeight,ve,void 0,void 0,void 0,void 0,void 0,void 0,ie),stencilBuffer:S.stencil,colorSpace:e.outputColorSpace,samples:S.antialias?4:0,resolveDepthBuffer:u.ignoreDepthValues===!1,resolveStencilBuffer:u.ignoreDepthValues===!1,storeMultisampledDepthBuffer:u.ignoreDepthValues===!1,storeMultisampledStencilBuffer:u.ignoreDepthValues===!1})}else{const ie={antialias:S.antialias,alpha:!0,depth:S.depth,stencil:S.stencil,framebufferScaleFactor:r};f=new XRWebGLLayer(i,t,ie),i.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),_=new vn(f.framebufferWidth,f.framebufferHeight,{format:on,type:Qt,colorSpace:e.outputColorSpace,stencilBuffer:S.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1,storeMultisampledDepthBuffer:f.ignoreDepthValues===!1,storeMultisampledStencilBuffer:f.ignoreDepthValues===!1})}_.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await i.requestReferenceSpace(o),Ze.setContext(i),Ze.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode},this.getDepthTexture=function(){return p.getDepthTexture()};function ne(I){for(let k=0;k<I.removed.length;k++){const ie=I.removed[k],ve=E.indexOf(ie);ve>=0&&(E[ve]=null,b[ve].disconnect(ie))}for(let k=0;k<I.added.length;k++){const ie=I.added[k];let ve=E.indexOf(ie);if(ve===-1){for(let Ue=0;Ue<b.length;Ue++)if(Ue>=E.length){E.push(ie),ve=Ue;break}else if(E[Ue]===null){E[Ue]=ie,ve=Ue;break}if(ve===-1)break}const fe=b[ve];fe&&fe.connect(ie)}}const q=new P,Q=new P;function ee(I,k,ie){q.setFromMatrixPosition(k.matrixWorld),Q.setFromMatrixPosition(ie.matrixWorld);const ve=q.distanceTo(Q),fe=k.projectionMatrix.elements,Ue=ie.projectionMatrix.elements,vt=fe[14]/(fe[10]-1),Xe=fe[14]/(fe[10]+1),Je=(fe[9]+1)/fe[5],dt=(fe[9]-1)/fe[5],Ke=(fe[8]-1)/fe[0],pt=(Ue[8]+1)/Ue[0],It=vt*Ke,$t=vt*pt,gt=ve/(-Ke+pt),bt=gt*-Ke;if(k.matrixWorld.decompose(I.position,I.quaternion,I.scale),I.translateX(bt),I.translateZ(gt),I.matrixWorld.compose(I.position,I.quaternion,I.scale),I.matrixWorldInverse.copy(I.matrixWorld).invert(),fe[10]===-1)I.projectionMatrix.copy(k.projectionMatrix),I.projectionMatrixInverse.copy(k.projectionMatrixInverse);else{const U=vt+gt,Ft=Xe+gt,tt=It-bt,R=$t+(ve-bt),x=Je*Xe/Ft*U,F=dt*Xe/Ft*U;I.projectionMatrix.makePerspective(tt,R,x,F,U,Ft),I.projectionMatrixInverse.copy(I.projectionMatrix).invert()}}function Pe(I,k){k===null?I.matrixWorld.copy(I.matrix):I.matrixWorld.multiplyMatrices(k.matrixWorld,I.matrix),I.matrixWorldInverse.copy(I.matrixWorld).invert()}this.updateCamera=function(I){if(i===null)return;let k=I.near,ie=I.far;p.texture!==null&&(p.depthNear>0&&(k=p.depthNear),p.depthFar>0&&(ie=p.depthFar)),V.near=L.near=C.near=k,V.far=L.far=C.far=ie,(O!==V.near||G!==V.far)&&(i.updateRenderState({depthNear:V.near,depthFar:V.far}),O=V.near,G=V.far),V.layers.mask=I.layers.mask|6,C.layers.mask=V.layers.mask&-5,L.layers.mask=V.layers.mask&-3;const ve=I.parent,fe=V.cameras;Pe(V,ve);for(let Ue=0;Ue<fe.length;Ue++)Pe(fe[Ue],ve);fe.length===2?ee(V,C,L):V.projectionMatrix.copy(C.projectionMatrix),A===null&&I.isPerspectiveCamera&&(A={camera:I,fov:I.fov,zoom:I.zoom}),Ee(I,V,ve)};function Ee(I,k,ie){ie===null?I.matrix.copy(k.matrixWorld):(I.matrix.copy(ie.matrixWorld),I.matrix.invert(),I.matrix.multiply(k.matrixWorld)),I.matrix.decompose(I.position,I.quaternion,I.scale),I.updateMatrixWorld(!0),I.projectionMatrix.copy(k.projectionMatrix),I.projectionMatrixInverse.copy(k.projectionMatrixInverse),I.isPerspectiveCamera&&(I.fov=gs*2*Math.atan(1/I.projectionMatrix.elements[5]),I.zoom=1)}this.getCamera=function(){return V},this.getFoveation=function(){if(!(u===null&&f===null))return l},this.setFoveation=function(I){l=I,u!==null&&(u.fixedFoveation=I),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=I)},this.hasDepthSensing=function(){return p.texture!==null},this.getDepthSensingMesh=function(){return p.getMesh(V)},this.getCameraTexture=function(I){return m[I]};let et=null;function We(I,k){if(d=k.getViewerPose(c||a),g=k,d!==null){const ie=d.views;f!==null&&(e.setRenderTargetFramebuffer(_,f.framebuffer),e.setRenderTarget(_));let ve=!1;ie.length!==V.cameras.length&&(V.cameras.length=0,ve=!0);for(let Xe=0;Xe<ie.length;Xe++){const Je=ie[Xe];let dt=null;if(f!==null)dt=f.getViewport(Je);else{const pt=h.getViewSubImage(u,Je);dt=pt.viewport,Xe===0&&(e.setRenderTargetTextures(_,pt.colorTexture,pt.depthStencilTexture),e.setRenderTarget(_))}let Ke=B[Xe];Ke===void 0&&(Ke=new Wt,Ke.layers.enable(Xe),Ke.viewport=new lt,B[Xe]=Ke),Ke.matrix.fromArray(Je.transform.matrix),Ke.matrix.decompose(Ke.position,Ke.quaternion,Ke.scale),Ke.projectionMatrix.fromArray(Je.projectionMatrix),Ke.projectionMatrixInverse.copy(Ke.projectionMatrix).invert(),Ke.viewport.set(dt.x,dt.y,dt.width,dt.height),Xe===0&&(V.matrix.copy(Ke.matrix),V.matrix.decompose(V.position,V.quaternion,V.scale)),ve===!0&&V.cameras.push(Ke)}const fe=i.enabledFeatures;if(fe&&fe.includes("depth-sensing")&&i.depthUsage=="gpu-optimized"&&y){h=n.getBinding();const Xe=h.getDepthInformation(ie[0]);Xe&&Xe.isValid&&Xe.texture&&p.init(Xe,i.renderState)}if(fe&&fe.includes("camera-access")&&y){e.state.unbindTexture(),h=n.getBinding();for(let Xe=0;Xe<ie.length;Xe++){const Je=ie[Xe].camera;if(Je){let dt=m[Je];dt||(dt=new Lh,m[Je]=dt);const Ke=h.getCameraImage(Je);dt.sourceTexture=Ke}}}}for(let ie=0;ie<b.length;ie++){const ve=E[ie],fe=b[ie];ve!==null&&fe!==void 0&&fe.update(ve,k,c||a)}et&&et(I,k),k.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:k}),g=null}const Ze=new kh;Ze.setAnimationLoop(We),this.setAnimationLoop=function(I){et=I},this.dispose=function(){}}}const tx=new Be,$h=new Oe;$h.set(-1,0,0,0,1,0,0,0,1);function nx(s,e){function t(p,m){p.matrixAutoUpdate===!0&&p.updateMatrix(),m.value.copy(p.matrix)}function n(p,m){m.color.getRGB(p.fogColor.value,Nh(s)),m.isFog?(p.fogNear.value=m.near,p.fogFar.value=m.far):m.isFogExp2&&(p.fogDensity.value=m.density)}function i(p,m,S,T,_){m.isNodeMaterial?m.uniformsNeedUpdate=!1:m.isMeshBasicMaterial?r(p,m):m.isMeshLambertMaterial?(r(p,m),m.envMap&&(p.envMapIntensity.value=m.envMapIntensity)):m.isMeshToonMaterial?(r(p,m),h(p,m)):m.isMeshPhongMaterial?(r(p,m),d(p,m),m.envMap&&(p.envMapIntensity.value=m.envMapIntensity)):m.isMeshStandardMaterial?(r(p,m),u(p,m),m.isMeshPhysicalMaterial&&f(p,m,_)):m.isMeshMatcapMaterial?(r(p,m),g(p,m)):m.isMeshDepthMaterial?r(p,m):m.isMeshDistanceMaterial?(r(p,m),y(p,m)):m.isMeshNormalMaterial?r(p,m):m.isLineBasicMaterial?(a(p,m),m.isLineDashedMaterial&&o(p,m)):m.isPointsMaterial?l(p,m,S,T):m.isSpriteMaterial?c(p,m):m.isShadowMaterial?(p.color.value.copy(m.color),p.opacity.value=m.opacity):m.isShaderMaterial&&(m.uniformsNeedUpdate=!1)}function r(p,m){p.opacity.value=m.opacity,m.color&&p.diffuse.value.copy(m.color),m.emissive&&p.emissive.value.copy(m.emissive).multiplyScalar(m.emissiveIntensity),m.map&&(p.map.value=m.map,t(m.map,p.mapTransform)),m.alphaMap&&(p.alphaMap.value=m.alphaMap,t(m.alphaMap,p.alphaMapTransform)),m.bumpMap&&(p.bumpMap.value=m.bumpMap,t(m.bumpMap,p.bumpMapTransform),p.bumpScale.value=m.bumpScale,m.side===Yt&&(p.bumpScale.value*=-1)),m.normalMap&&(p.normalMap.value=m.normalMap,t(m.normalMap,p.normalMapTransform),p.normalScale.value.copy(m.normalScale),m.side===Yt&&p.normalScale.value.negate()),m.displacementMap&&(p.displacementMap.value=m.displacementMap,t(m.displacementMap,p.displacementMapTransform),p.displacementScale.value=m.displacementScale,p.displacementBias.value=m.displacementBias),m.emissiveMap&&(p.emissiveMap.value=m.emissiveMap,t(m.emissiveMap,p.emissiveMapTransform)),m.specularMap&&(p.specularMap.value=m.specularMap,t(m.specularMap,p.specularMapTransform)),m.alphaTest>0&&(p.alphaTest.value=m.alphaTest);const S=e.get(m),T=S.envMap,_=S.envMapRotation;T&&(p.envMap.value=T,p.envMapRotation.value.setFromMatrix4(tx.makeRotationFromEuler(_)).transpose(),T.isCubeTexture&&T.isRenderTargetTexture===!1&&p.envMapRotation.value.premultiply($h),p.reflectivity.value=m.reflectivity,p.ior.value=m.ior,p.refractionRatio.value=m.refractionRatio),m.lightMap&&(p.lightMap.value=m.lightMap,p.lightMapIntensity.value=m.lightMapIntensity,t(m.lightMap,p.lightMapTransform)),m.aoMap&&(p.aoMap.value=m.aoMap,p.aoMapIntensity.value=m.aoMapIntensity,t(m.aoMap,p.aoMapTransform))}function a(p,m){p.diffuse.value.copy(m.color),p.opacity.value=m.opacity,m.map&&(p.map.value=m.map,t(m.map,p.mapTransform))}function o(p,m){p.dashSize.value=m.dashSize,p.totalSize.value=m.dashSize+m.gapSize,p.scale.value=m.scale}function l(p,m,S,T){p.diffuse.value.copy(m.color),p.opacity.value=m.opacity,p.size.value=m.size*S,p.scale.value=T*.5,m.map&&(p.map.value=m.map,t(m.map,p.uvTransform)),m.alphaMap&&(p.alphaMap.value=m.alphaMap,t(m.alphaMap,p.alphaMapTransform)),m.alphaTest>0&&(p.alphaTest.value=m.alphaTest)}function c(p,m){p.diffuse.value.copy(m.color),p.opacity.value=m.opacity,p.rotation.value=m.rotation,m.map&&(p.map.value=m.map,t(m.map,p.mapTransform)),m.alphaMap&&(p.alphaMap.value=m.alphaMap,t(m.alphaMap,p.alphaMapTransform)),m.alphaTest>0&&(p.alphaTest.value=m.alphaTest)}function d(p,m){p.specular.value.copy(m.specular),p.shininess.value=Math.max(m.shininess,1e-4)}function h(p,m){m.gradientMap&&(p.gradientMap.value=m.gradientMap)}function u(p,m){p.metalness.value=m.metalness,m.metalnessMap&&(p.metalnessMap.value=m.metalnessMap,t(m.metalnessMap,p.metalnessMapTransform)),p.roughness.value=m.roughness,m.roughnessMap&&(p.roughnessMap.value=m.roughnessMap,t(m.roughnessMap,p.roughnessMapTransform)),m.envMap&&(p.envMapIntensity.value=m.envMapIntensity)}function f(p,m,S){p.ior.value=m.ior,m.sheen>0&&(p.sheenColor.value.copy(m.sheenColor).multiplyScalar(m.sheen),p.sheenRoughness.value=m.sheenRoughness,m.sheenColorMap&&(p.sheenColorMap.value=m.sheenColorMap,t(m.sheenColorMap,p.sheenColorMapTransform)),m.sheenRoughnessMap&&(p.sheenRoughnessMap.value=m.sheenRoughnessMap,t(m.sheenRoughnessMap,p.sheenRoughnessMapTransform))),m.clearcoat>0&&(p.clearcoat.value=m.clearcoat,p.clearcoatRoughness.value=m.clearcoatRoughness,m.clearcoatMap&&(p.clearcoatMap.value=m.clearcoatMap,t(m.clearcoatMap,p.clearcoatMapTransform)),m.clearcoatRoughnessMap&&(p.clearcoatRoughnessMap.value=m.clearcoatRoughnessMap,t(m.clearcoatRoughnessMap,p.clearcoatRoughnessMapTransform)),m.clearcoatNormalMap&&(p.clearcoatNormalMap.value=m.clearcoatNormalMap,t(m.clearcoatNormalMap,p.clearcoatNormalMapTransform),p.clearcoatNormalScale.value.copy(m.clearcoatNormalScale),m.side===Yt&&p.clearcoatNormalScale.value.negate())),m.dispersion>0&&(p.dispersion.value=m.dispersion),m.retroreflectivity>0&&(p.retroreflectivity.value=m.retroreflectivity),m.iridescence>0&&(p.iridescence.value=m.iridescence,p.iridescenceIOR.value=m.iridescenceIOR,p.iridescenceThicknessMinimum.value=m.iridescenceThicknessRange[0],p.iridescenceThicknessMaximum.value=m.iridescenceThicknessRange[1],m.iridescenceMap&&(p.iridescenceMap.value=m.iridescenceMap,t(m.iridescenceMap,p.iridescenceMapTransform)),m.iridescenceThicknessMap&&(p.iridescenceThicknessMap.value=m.iridescenceThicknessMap,t(m.iridescenceThicknessMap,p.iridescenceThicknessMapTransform))),m.transmission>0&&(p.transmission.value=m.transmission,p.transmissionSamplerMap.value=S.texture,p.transmissionSamplerSize.value.set(S.width,S.height),m.transmissionMap&&(p.transmissionMap.value=m.transmissionMap,t(m.transmissionMap,p.transmissionMapTransform)),p.thickness.value=m.thickness,m.thicknessMap&&(p.thicknessMap.value=m.thicknessMap,t(m.thicknessMap,p.thicknessMapTransform)),p.attenuationDistance.value=m.attenuationDistance,p.attenuationColor.value.copy(m.attenuationColor)),m.anisotropy>0&&(p.anisotropyVector.value.set(m.anisotropy*Math.cos(m.anisotropyRotation),m.anisotropy*Math.sin(m.anisotropyRotation)),m.anisotropyMap&&(p.anisotropyMap.value=m.anisotropyMap,t(m.anisotropyMap,p.anisotropyMapTransform))),p.specularIntensity.value=m.specularIntensity,p.specularColor.value.copy(m.specularColor),m.specularColorMap&&(p.specularColorMap.value=m.specularColorMap,t(m.specularColorMap,p.specularColorMapTransform)),m.specularIntensityMap&&(p.specularIntensityMap.value=m.specularIntensityMap,t(m.specularIntensityMap,p.specularIntensityMapTransform))}function g(p,m){m.matcap&&(p.matcap.value=m.matcap)}function y(p,m){const S=e.get(m).light;p.referencePosition.value.setFromMatrixPosition(S.matrixWorld),p.nearDistance.value=S.shadow.camera.near,p.farDistance.value=S.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:i}}function ix(s,e,t,n){let i={},r={},a=[];const o=s.getParameter(s.MAX_UNIFORM_BUFFER_BINDINGS);function l(_,b){const E=b.program;n.uniformBlockBinding(_,E)}function c(_,b){let E=i[_.id];E===void 0&&(p(_),E=d(_),i[_.id]=E,_.addEventListener("dispose",S));const w=b.program;n.updateUBOMapping(_,w);const v=e.render.frame;r[_.id]!==v&&(u(_),r[_.id]=v)}function d(_){const b=h();_.__bindingPointIndex=b;const E=s.createBuffer(),w=_.__size,v=_.usage;return s.bindBuffer(s.UNIFORM_BUFFER,E),s.bufferData(s.UNIFORM_BUFFER,w,v),s.bindBuffer(s.UNIFORM_BUFFER,null),s.bindBufferBase(s.UNIFORM_BUFFER,b,E),E}function h(){for(let _=0;_<o;_++)if(a.indexOf(_)===-1)return a.push(_),_;return Ne("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function u(_){const b=i[_.id],E=_.uniforms,w=_.__cache;s.bindBuffer(s.UNIFORM_BUFFER,b);for(let v=0,A=E.length;v<A;v++){const C=E[v];if(Array.isArray(C))for(let L=0,B=C.length;L<B;L++)f(C[L],v,L,w);else f(C,v,0,w)}s.bindBuffer(s.UNIFORM_BUFFER,null)}function f(_,b,E,w){if(y(_,b,E,w)===!0){const v=_.__offset,A=_.value;if(Array.isArray(A)){let C=0;for(let L=0;L<A.length;L++){const B=A[L],V=m(B);g(B,_.__data,C),typeof B!="number"&&typeof B!="boolean"&&!B.isMatrix3&&!ArrayBuffer.isView(B)&&(C+=V.storage/Float32Array.BYTES_PER_ELEMENT)}}else g(A,_.__data,0);s.bufferSubData(s.UNIFORM_BUFFER,v,_.__data)}}function g(_,b,E){typeof _=="number"||typeof _=="boolean"?b[0]=_:_.isMatrix3?(b[0]=_.elements[0],b[1]=_.elements[1],b[2]=_.elements[2],b[3]=0,b[4]=_.elements[3],b[5]=_.elements[4],b[6]=_.elements[5],b[7]=0,b[8]=_.elements[6],b[9]=_.elements[7],b[10]=_.elements[8],b[11]=0):ArrayBuffer.isView(_)?b.set(new _.constructor(_.buffer,_.byteOffset,b.length)):_.toArray(b,E)}function y(_,b,E,w){const v=_.value,A=b+"_"+E;if(w[A]===void 0)return typeof v=="number"||typeof v=="boolean"?w[A]=v:ArrayBuffer.isView(v)?w[A]=v.slice():w[A]=v.clone(),!0;{const C=w[A];if(typeof v=="number"||typeof v=="boolean"){if(C!==v)return w[A]=v,!0}else{if(ArrayBuffer.isView(v))return!0;if(C.equals(v)===!1)return C.copy(v),!0}}return!1}function p(_){const b=_.uniforms;let E=0;const w=16;for(let A=0,C=b.length;A<C;A++){const L=Array.isArray(b[A])?b[A]:[b[A]];for(let B=0,V=L.length;B<V;B++){const O=L[B],G=Array.isArray(O.value)?O.value:[O.value];for(let J=0,X=G.length;J<X;J++){const ne=G[J],q=m(ne),Q=E%w,ee=Q%q.boundary,Pe=Q+ee;E+=ee,Pe!==0&&w-Pe<q.storage&&(E+=w-Pe),O.__data=new Float32Array(q.storage/Float32Array.BYTES_PER_ELEMENT),O.__offset=E,E+=q.storage}}}const v=E%w;return v>0&&(E+=w-v),_.__size=E,_.__cache={},this}function m(_){const b={boundary:0,storage:0};return typeof _=="number"||typeof _=="boolean"?(b.boundary=4,b.storage=4):_.isVector2?(b.boundary=8,b.storage=8):_.isVector3||_.isColor?(b.boundary=16,b.storage=12):_.isVector4?(b.boundary=16,b.storage=16):_.isMatrix3?(b.boundary=48,b.storage=48):_.isMatrix4?(b.boundary=64,b.storage=64):_.isTexture?Ae("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(_)?(b.boundary=16,b.storage=_.byteLength):Ae("WebGLRenderer: Unsupported uniform value type.",_),b}function S(_){const b=_.target;b.removeEventListener("dispose",S);const E=a.indexOf(b.__bindingPointIndex);a.splice(E,1),s.deleteBuffer(i[b.id]),delete i[b.id],delete r[b.id]}function T(){for(const _ in i)s.deleteBuffer(i[_]);a=[],i={},r={}}return{bind:l,update:c,dispose:T}}const sx=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let En=null;function rx(){return En===null&&(En=new Fl(sx,16,16,Oi,Bn),En.name="DFG_LUT",En.minFilter=Rt,En.magFilter=Rt,En.wrapS=Pn,En.wrapT=Pn,En.generateMipmaps=!1,En.needsUpdate=!0),En}class ax{constructor(e={}){const{canvas:t=of(),context:n=null,depth:i=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:d="default",failIfMajorPerformanceCaveat:h=!1,reversedDepthBuffer:u=!1,outputBufferType:f=Qt}=e;this.isWebGLRenderer=!0;let g;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");g=n.getContextAttributes().alpha}else g=a;const y=f,p=new Set([Pl,Cl,Rl]),m=new Set([Qt,Fn,qs,Ks,Tl,wl]),S=new Uint32Array(4),T=new Int32Array(4),_=new P;let b=null,E=null;const w=[],v=[];let A=null;this.domElement=t,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Dn,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const C=this;let L=!1,B=null,V=null,O=null,G=null;this._outputColorSpace=Nt;let J=0,X=0,ne=null,q=-1,Q=null;const ee=new lt,Pe=new lt;let Ee=null;const et=new Ie(0);let We=0,Ze=t.width,I=t.height,k=1,ie=null,ve=null;const fe=new lt(0,0,Ze,I),Ue=new lt(0,0,Ze,I);let vt=!1;const Xe=new kl;let Je=!1,dt=!1;const Ke=new Be,pt=new P,It=new lt,$t={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let gt=!1;function bt(){return ne===null?k:1}let U=n;function Ft(M,D){return t.getContext(M,D)}let tt,R,x,F,W,K,se,re,Y,j,ae,Re,de,oe,Ce,De,Fe,N,le,Z,ce,ge,te;try{const M={alpha:!0,depth:i,stencil:r,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:d,failIfMajorPerformanceCaveat:h};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${bl}`),t.addEventListener("webglcontextlost",ht,!1),t.addEventListener("webglcontextrestored",je,!1),t.addEventListener("webglcontextcreationerror",ln,!1),U===null){const D="webgl2";if(U=Ft(D,M),U===null)throw Ft(D)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}Le()}catch(M){throw t.removeEventListener("webglcontextlost",ht,!1),t.removeEventListener("webglcontextrestored",je,!1),t.removeEventListener("webglcontextcreationerror",ln,!1),Ne("WebGLRenderer: "+M.message),M}function Le(){tt=new rv(U),tt.init(),ce=new Z0(U,tt),R=new Y_(U,tt,e,ce),x=new K0(U,tt),R.reversedDepthBuffer&&u&&x.buffers.depth.setReversed(!0),V=U.createFramebuffer(),O=U.createFramebuffer(),G=U.createFramebuffer(),F=new lv(U),W=new N0,K=new Y0(U,tt,x,W,R,ce,F),se=new sv(C),re=new dm(U),ge=new q_(U,re),Y=new av(U,re,F,ge),j=new dv(U,Y,re,ge,F),N=new cv(U,R,K),Ce=new Z_(W),ae=new D0(C,se,tt,R,ge,Ce),Re=new nx(C,W),de=new O0,oe=new G0(tt),Fe=new $_(C,se,x,j,g,l),De=new q0(C,j,R),te=new ix(U,F,R,x),le=new K_(U,tt,F),Z=new ov(U,tt,F),F.programs=ae.programs,C.capabilities=R,C.extensions=tt,C.properties=W,C.renderLists=de,C.shadowMap=De,C.state=x,C.info=F}y!==Qt&&(A=new uv(y,t.width,t.height,o,i,r));const Se=new ex(C,U);this.xr=Se,this.getContext=function(){return U},this.getContextAttributes=function(){return U.getContextAttributes()},this.forceContextLoss=function(){const M=tt.get("WEBGL_lose_context");M&&M.loseContext()},this.forceContextRestore=function(){const M=tt.get("WEBGL_lose_context");M&&M.restoreContext()},this.getPixelRatio=function(){return k},this.setPixelRatio=function(M){M!==void 0&&(k=M,this.setSize(Ze,I,!1))},this.getSize=function(M){return M.set(Ze,I)},this.setSize=function(M,D,$=!0){if(Se.isPresenting){Ae("WebGLRenderer: Can't change size while VR device is presenting.");return}Ze=M,I=D,t.width=Math.floor(M*k),t.height=Math.floor(D*k),$===!0&&(t.style.width=M+"px",t.style.height=D+"px"),A!==null&&A.setSize(t.width,t.height),this.setViewport(0,0,M,D)},this.getDrawingBufferSize=function(M){return M.set(Ze*k,I*k).floor()},this.setDrawingBufferSize=function(M,D,$){Ze=M,I=D,k=$,t.width=Math.floor(M*$),t.height=Math.floor(D*$),this.setViewport(0,0,M,D)},this.setEffects=function(M){if(y===Qt){Ne("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(M){for(let D=0;D<M.length;D++)if(M[D].isOutputPass===!0){Ae("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}A.setEffects(M||[])},this.getCurrentViewport=function(M){return M.copy(ee)},this.getViewport=function(M){return M.copy(fe)},this.setViewport=function(M,D,$,z){M.isVector4?fe.set(M.x,M.y,M.z,M.w):fe.set(M,D,$,z),x.viewport(ee.copy(fe).multiplyScalar(k).round())},this.getScissor=function(M){return M.copy(Ue)},this.setScissor=function(M,D,$,z){M.isVector4?Ue.set(M.x,M.y,M.z,M.w):Ue.set(M,D,$,z),x.scissor(Pe.copy(Ue).multiplyScalar(k).round())},this.getScissorTest=function(){return vt},this.setScissorTest=function(M){x.setScissorTest(vt=M)},this.setOpaqueSort=function(M){ie=M},this.setTransparentSort=function(M){ve=M},this.getClearColor=function(M){return M.copy(Fe.getClearColor())},this.setClearColor=function(){Fe.setClearColor(...arguments)},this.getClearAlpha=function(){return Fe.getClearAlpha()},this.setClearAlpha=function(){Fe.setClearAlpha(...arguments)},this.clear=function(M=!0,D=!0,$=!0){let z=0;if(M){let H=!1;if(ne!==null){const me=ne.texture.format;H=p.has(me)}if(H){const me=ne.texture.type,ye=m.has(me),pe=Fe.getClearColor(),Me=Fe.getClearAlpha(),Te=pe.r,He=pe.g,$e=pe.b;ye?(S[0]=Te,S[1]=He,S[2]=$e,S[3]=Me,U.clearBufferuiv(U.COLOR,0,S)):(T[0]=Te,T[1]=He,T[2]=$e,T[3]=Me,U.clearBufferiv(U.COLOR,0,T))}else z|=U.COLOR_BUFFER_BIT}D&&(z|=U.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),$&&(z|=U.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),z!==0&&U.clear(z)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(M){M.setRenderer(this),B=M},this.dispose=function(){t.removeEventListener("webglcontextlost",ht,!1),t.removeEventListener("webglcontextrestored",je,!1),t.removeEventListener("webglcontextcreationerror",ln,!1),Fe.dispose(),de.dispose(),oe.dispose(),W.dispose(),se.dispose(),j.dispose(),ge.dispose(),te.dispose(),ae.dispose(),Se.dispose(),Se.removeEventListener("sessionstart",sc),Se.removeEventListener("sessionend",rc),wi.stop()};function ht(M){M.preventDefault(),ea("WebGLRenderer: Context Lost."),L=!0}function je(){ea("WebGLRenderer: Context Restored."),L=!1;const M=F.autoReset,D=De.enabled,$=De.autoUpdate,z=De.needsUpdate,H=De.type;Le(),F.autoReset=M,De.enabled=D,De.autoUpdate=$,De.needsUpdate=z,De.type=H}function ln(M){Ne("WebGLRenderer: A WebGL context could not be created. Reason: ",M.statusMessage)}function Mn(M){const D=M.target;D.removeEventListener("dispose",Mn),pu(D)}function pu(M){mu(M),W.remove(M)}function mu(M){const D=W.get(M).programs;D!==void 0&&(D.forEach(function($){ae.releaseProgram($)}),M.isShaderMaterial&&ae.releaseShaderCache(M))}this.renderBufferDirect=function(M,D,$,z,H,me){D===null&&(D=$t);const ye=H.isMesh&&H.matrixWorld.determinantAffine()<0,pe=vu(M,D,$,z,H);x.setMaterial(z,ye);let Me=$.index,Te=1;if(z.wireframe===!0){if(Me=Y.getWireframeAttribute($),Me===void 0)return;Te=2}const He=$.drawRange,$e=$.attributes.position;let be=He.start*Te,Qe=(He.start+He.count)*Te;me!==null&&(be=Math.max(be,me.start*Te),Qe=Math.min(Qe,(me.start+me.count)*Te)),Me!==null?(be=Math.max(be,0),Qe=Math.min(Qe,Me.count)):$e!=null&&(be=Math.max(be,0),Qe=Math.min(Qe,$e.count));const St=Qe-be;if(St<0||St===1/0)return;ge.setup(H,z,pe,$,Me);let ft,ct=le;if(Me!==null&&(ft=re.get(Me),ct=Z,ct.setIndex(ft)),H.isMesh)z.wireframe===!0?(x.setLineWidth(z.wireframeLinewidth*bt()),ct.setMode(U.LINES)):ct.setMode(U.TRIANGLES);else if(H.isLine){let Bt=z.linewidth;Bt===void 0&&(Bt=1),x.setLineWidth(Bt*bt()),H.isLineSegments?ct.setMode(U.LINES):H.isLineLoop?ct.setMode(U.LINE_LOOP):ct.setMode(U.LINE_STRIP)}else H.isPoints?ct.setMode(U.POINTS):H.isSprite&&ct.setMode(U.TRIANGLES);if(H.isBatchedMesh)if(tt.get("WEBGL_multi_draw"))ct.renderMultiDraw(H._multiDrawStarts,H._multiDrawCounts,H._multiDrawCount);else{const Bt=H._multiDrawStarts,xe=H._multiDrawCounts,Ht=H._multiDrawCount,Ye=Me?re.get(Me).bytesPerElement:1,tn=W.get(z).currentProgram.getUniforms();for(let bn=0;bn<Ht;bn++)tn.setValue(U,"_gl_DrawID",bn),ct.render(Bt[bn]/Ye,xe[bn])}else if(H.isInstancedMesh)ct.renderInstances(be,St,H.count);else if($.isInstancedBufferGeometry){const Bt=$._maxInstanceCount!==void 0?$._maxInstanceCount:1/0,xe=Math.min($.instanceCount,Bt);ct.renderInstances(be,St,xe)}else ct.render(be,St)};function ic(M,D,$,z){B!==null&&M.isNodeMaterial&&B.setObject(z,M),Je===!0&&Ce.setState(M,$,!1),M.transparent===!0&&M.side===Xt&&M.forceSinglePass===!1?(M.side=Yt,M.needsUpdate=!0,cr(M,D,z),M.side=ni,M.needsUpdate=!0,cr(M,D,z),M.side=Xt):cr(M,D,z)}this.compile=function(M,D,$=null){$===null&&($=M),B!==null&&B.renderStart(M,D,$),E=oe.get($),E.init(D),v.push(E),$.traverseVisible(function(H){H.isLight&&H.layers.test(D.layers)&&(E.pushLight(H),H.castShadow&&E.pushShadow(H))}),M!==$&&M.traverseVisible(function(H){H.isLight&&H.layers.test(D.layers)&&(E.pushLight(H),H.castShadow&&E.pushShadow(H))}),E.setupLights(),B!==null&&B.updateLights(E.state.lightsArray),dt=this.localClippingEnabled,Je=Ce.init(this.clippingPlanes,dt),Je===!0&&Ce.setGlobalState(this.clippingPlanes,D),B!==null&&De.render(E.state.shadowsArray,$,D);const z=new Set;return M.traverse(function(H){if(!(H.isMesh||H.isPoints||H.isLine||H.isSprite))return;const me=H.material;if(me)if(Array.isArray(me))for(let ye=0;ye<me.length;ye++){const pe=me[ye];ic(pe,$,D,H),z.add(pe)}else ic(me,$,D,H),z.add(me)}),E=v.pop(),B!==null&&B.renderEnd(),z},this.compileAsync=function(M,D,$=null){const z=this.compile(M,D,$);return new Promise(H=>{function me(){if(z.forEach(function(ye){const Me=W.get(ye).currentProgram;(Me===void 0||Me.isReady())&&z.delete(ye)}),z.size===0){H(M);return}setTimeout(me,10)}tt.get("KHR_parallel_shader_compile")!==null?me():setTimeout(me,10)})};let ya=null;function gu(M){ya&&ya(M)}function sc(){wi.stop()}function rc(){wi.start()}const wi=new kh;wi.setAnimationLoop(gu),typeof self<"u"&&wi.setContext(self),this.setAnimationLoop=function(M){ya=M,Se.setAnimationLoop(M),M===null?wi.stop():wi.start()},Se.addEventListener("sessionstart",sc),Se.addEventListener("sessionend",rc),this.render=function(M,D){if(D!==void 0&&D.isCamera!==!0){Ne("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(L===!0)return;B!==null&&B.renderStart(M,D);const $=Se.enabled===!0&&Se.isPresenting===!0,z=A!==null&&(ne===null||$)&&A.begin(C,ne);if(M.matrixWorldAutoUpdate===!0&&M.updateMatrixWorld(),D.parent===null&&D.matrixWorldAutoUpdate===!0&&D.updateMatrixWorld(),Se.enabled===!0&&Se.isPresenting===!0&&(A===null||A.isCompositing()===!1)&&(Se.cameraAutoUpdate===!0&&Se.updateCamera(D),D=Se.getCamera()),M.isScene===!0&&M.onBeforeRender(C,M,D,ne),E=oe.get(M,v.length),E.init(D),E.state.textureUnits=K.getTextureUnits(),v.push(E),Ke.multiplyMatrices(D.projectionMatrix,D.matrixWorldInverse),Xe.setFromProjectionMatrix(Ke,Ln,D.reversedDepth),dt=this.localClippingEnabled,Je=Ce.init(this.clippingPlanes,dt),b=de.get(M,w.length),b.init(),w.push(b),Se.enabled===!0&&Se.isPresenting===!0){const ye=C.xr.getDepthSensingMesh();ye!==null&&Ma(ye,D,-1/0,C.sortObjects)}Ma(M,D,0,C.sortObjects),b.finish(),B!==null&&B.updateLights(E.state.lightsArray),C.sortObjects===!0&&b.sort(ie,ve),gt=Se.enabled===!1||Se.isPresenting===!1||Se.hasDepthSensing()===!1,gt&&Fe.addToRenderList(b,M),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),Je===!0&&Ce.beginShadows();const H=E.state.shadowsArray;if(De.render(H,M,D),Je===!0&&Ce.endShadows(),(z&&A.hasRenderPass())===!1){const ye=b.opaque,pe=b.transmissive;if(E.setupLights(),D.isArrayCamera){const Me=D.cameras;if(pe.length>0)for(let Te=0,He=Me.length;Te<He;Te++){const $e=Me[Te];oc(ye,pe,M,$e)}gt&&Fe.render(M);for(let Te=0,He=Me.length;Te<He;Te++){const $e=Me[Te];ac(b,M,$e,$e.viewport)}}else pe.length>0&&oc(ye,pe,M,D),gt&&Fe.render(M),ac(b,M,D)}ne!==null&&X===0&&(K.updateMultisampleRenderTarget(ne),K.updateRenderTargetMipmap(ne)),z&&A.end(C),M.isScene===!0&&M.onAfterRender(C,M,D),ge.resetDefaultState(),q=-1,Q=null,v.pop(),v.length>0?(E=v[v.length-1],K.setTextureUnits(E.state.textureUnits),Je===!0&&Ce.setGlobalState(C.clippingPlanes,E.state.camera)):E=null,w.pop(),w.length>0?b=w[w.length-1]:b=null,B!==null&&B.renderEnd()};function Ma(M,D,$,z){if(M.visible===!1)return;if(M.layers.test(D.layers)){if(M.isGroup)$=M.renderOrder;else if(M.isLOD)M.autoUpdate===!0&&M.update(D);else if(M.isLightProbeGrid)E.pushLightProbeGrid(M);else if(M.isLight)E.pushLight(M),M.castShadow&&E.pushShadow(M);else if(M.isSprite){if(!M.frustumCulled||M.intersectsFrustum(Xe)){z&&It.setFromMatrixPosition(M.matrixWorld).applyMatrix4(Ke);const ye=j.update(M),pe=M.material;pe.visible&&b.push(M,ye,pe,$,It.z,null,D)}}else if((M.isMesh||M.isLine||M.isPoints)&&(!M.frustumCulled||M.intersectsFrustum(Xe))){const ye=j.update(M),pe=M.material;if(z&&(M.boundingSphere!==void 0?(M.boundingSphere===null&&M.computeBoundingSphere(),It.copy(M.boundingSphere.center)):(ye.boundingSphere===null&&ye.computeBoundingSphere(),It.copy(ye.boundingSphere.center)),It.applyMatrix4(M.matrixWorld).applyMatrix4(Ke)),Array.isArray(pe)){const Me=ye.groups;for(let Te=0,He=Me.length;Te<He;Te++){const $e=Me[Te],be=pe[$e.materialIndex];be&&be.visible&&b.push(M,ye,be,$,It.z,$e,D)}}else pe.visible&&b.push(M,ye,pe,$,It.z,null,D)}}const me=M.children;for(let ye=0,pe=me.length;ye<pe;ye++)Ma(me[ye],D,$,z)}function ac(M,D,$,z){const{opaque:H,transmissive:me,transparent:ye}=M;E.setupLightsView($),Je===!0&&Ce.setGlobalState(C.clippingPlanes,$),z&&x.viewport(ee.copy(z)),H.length>0&&lr(H,D,$),me.length>0&&lr(me,D,$),ye.length>0&&lr(ye,D,$),x.buffers.depth.setTest(!0),x.buffers.depth.setMask(!0),x.buffers.color.setMask(!0),x.setPolygonOffset(!1)}function oc(M,D,$,z){if(($.isScene===!0?$.overrideMaterial:null)!==null)return;if(E.state.transmissionRenderTarget[z.id]===void 0){const be=tt.has("EXT_color_buffer_half_float")||tt.has("EXT_color_buffer_float");E.state.transmissionRenderTarget[z.id]=new vn(1,1,{generateMipmaps:!0,type:be?Bn:Qt,minFilter:Zn,samples:Math.max(4,R.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:qe.workingColorSpace})}const me=E.state.transmissionRenderTarget[z.id],ye=z.viewport||ee;me.setSize(ye.z*C.transmissionResolutionScale,ye.w*C.transmissionResolutionScale);const pe=C.getRenderTarget(),Me=C.getActiveCubeFace(),Te=C.getActiveMipmapLevel();C.setRenderTarget(me),C.getClearColor(et),We=C.getClearAlpha(),We<1&&C.setClearColor(16777215,.5),C.clear(),gt&&Fe.render($);const He=C.toneMapping;C.toneMapping=Dn;const $e=z.viewport;if(z.viewport!==void 0&&(z.viewport=void 0),E.setupLightsView(z),Je===!0&&Ce.setGlobalState(C.clippingPlanes,z),lr(M,$,z),K.updateMultisampleRenderTarget(me),K.updateRenderTargetMipmap(me),tt.has("WEBGL_multisampled_render_to_texture")===!1){let be=!1;for(let Qe=0,St=D.length;Qe<St;Qe++){const ft=D[Qe],{object:ct,geometry:Bt,material:xe,group:Ht}=ft;if(xe.side===Xt&&ct.layers.test(z.layers)){const Ye=xe.side;xe.side=Yt,xe.needsUpdate=!0,lc(ct,$,z,Bt,xe,Ht),xe.side=Ye,xe.needsUpdate=!0,be=!0}}be===!0&&(K.updateMultisampleRenderTarget(me),K.updateRenderTargetMipmap(me))}C.setRenderTarget(pe,Me,Te),C.setClearColor(et,We),$e!==void 0&&(z.viewport=$e),C.toneMapping=He}function lr(M,D,$){const z=D.isScene===!0?D.overrideMaterial:null;for(let H=0,me=M.length;H<me;H++){const ye=M[H],{object:pe,geometry:Me,group:Te}=ye;let He=ye.material;He.allowOverride===!0&&z!==null&&(He=z),pe.layers.test($.layers)&&lc(pe,D,$,Me,He,Te)}}function lc(M,D,$,z,H,me){B!==null&&H.isNodeMaterial&&B.setObject(M,H),M.onBeforeRender(C,D,$,z,H,me),M.modelViewMatrix.multiplyMatrices($.matrixWorldInverse,M.matrixWorld),M.normalMatrix.getNormalMatrix(M.modelViewMatrix),H.onBeforeRender(C,D,$,z,M,me),H.transparent===!0&&H.side===Xt&&H.forceSinglePass===!1?(H.side=Yt,H.needsUpdate=!0,C.renderBufferDirect($,D,z,H,M,me),H.side=ni,H.needsUpdate=!0,C.renderBufferDirect($,D,z,H,M,me),H.side=Xt):C.renderBufferDirect($,D,z,H,M,me),M.onAfterRender(C,D,$,z,H,me)}function cr(M,D,$){D.isScene!==!0&&(D=$t);const z=W.get(M),H=E.state.lights,me=E.state.shadowsArray,ye=H.state.version,pe=ae.getParameters(M,H.state,me,D,$,E.state.lightProbeGridArray),Me=ae.getProgramCacheKey(pe);let Te=z.programs;z.environment=M.isMeshStandardMaterial||M.isMeshLambertMaterial||M.isMeshPhongMaterial?D.environment:null,z.fog=D.fog;const He=M.isMeshStandardMaterial||M.isMeshLambertMaterial&&!M.envMap||M.isMeshPhongMaterial&&!M.envMap;z.envMap=se.get(M.envMap||z.environment,He),z.envMapRotation=z.environment!==null&&M.envMap===null?D.environmentRotation:M.envMapRotation,Te===void 0&&(M.addEventListener("dispose",Mn),Te=new Map,z.programs=Te);let $e=Te.get(Me);if($e!==void 0){if(z.currentProgram===$e&&z.lightsStateVersion===ye)return dc(M,pe),$e}else pe.uniforms=ae.getUniforms(M),B!==null&&M.isNodeMaterial&&B.build(M,$,pe),M.onBeforeCompile(pe,C),$e=ae.acquireProgram(pe,Me),Te.set(Me,$e),z.uniforms=pe.uniforms;const be=z.uniforms;return(!M.isShaderMaterial&&!M.isRawShaderMaterial||M.clipping===!0)&&(be.clippingPlanes=Ce.uniform),dc(M,pe),z.needsLights=yu(M),z.lightsStateVersion=ye,z.needsLights&&(be.ambientLightColor.value=H.state.ambient,be.lightProbe.value=H.state.probe,be.sunLights.value=H.state.sun,be.sunLightShadows.value=H.state.sunShadow,be.directionalLights.value=H.state.directional,be.directionalLightShadows.value=H.state.directionalShadow,be.spotLights.value=H.state.spot,be.spotLightShadows.value=H.state.spotShadow,be.rectAreaLights.value=H.state.rectArea,be.ltc_1.value=H.state.rectAreaLTC1,be.ltc_2.value=H.state.rectAreaLTC2,be.pointLights.value=H.state.point,be.pointLightShadows.value=H.state.pointShadow,be.hemisphereLights.value=H.state.hemi,be.sunShadowMatrix.value=H.state.sunShadowMatrix,be.sunShadowCascade.value=H.state.sunShadowCascade,be.directionalShadowMatrix.value=H.state.directionalShadowMatrix,be.spotLightMatrix.value=H.state.spotLightMatrix,be.spotLightMap.value=H.state.spotLightMap,be.pointShadowMatrix.value=H.state.pointShadowMatrix),z.lightProbeGrid=E.state.lightProbeGridArray.length>0,z.currentProgram=$e,z.uniformsList=null,$e}function cc(M){if(M.uniformsList===null){const D=M.currentProgram.getUniforms();M.uniformsList=qr.seqWithValue(D.seq,M.uniforms)}return M.uniformsList}function dc(M,D){const $=W.get(M);$.outputColorSpace=D.outputColorSpace,$.batching=D.batching,$.batchingColor=D.batchingColor,$.instancing=D.instancing,$.instancingColor=D.instancingColor,$.instancingMorph=D.instancingMorph,$.skinning=D.skinning,$.morphTargets=D.morphTargets,$.morphNormals=D.morphNormals,$.morphColors=D.morphColors,$.morphTargetsCount=D.morphTargetsCount,$.numClippingPlanes=D.numClippingPlanes,$.numIntersection=D.numClipIntersection,$.vertexAlphas=D.vertexAlphas,$.vertexTangents=D.vertexTangents,$.toneMapping=D.toneMapping}function _u(M,D){if(M.length===0)return null;if(M.length===1)return M[0].texture!==null?M[0]:null;_.setFromMatrixPosition(D.matrixWorld);for(let $=0,z=M.length;$<z;$++){const H=M[$];if(H.texture!==null&&H.boundingBox.containsPoint(_))return H}return null}function vu(M,D,$,z,H){D.isScene!==!0&&(D=$t),K.resetTextureUnits();const me=D.fog,ye=z.isMeshStandardMaterial||z.isMeshLambertMaterial||z.isMeshPhongMaterial?D.environment:null,pe=ne===null?C.outputColorSpace:ne.isXRRenderTarget===!0?ne.texture.colorSpace:qe.workingColorSpace,Me=z.isMeshStandardMaterial||z.isMeshLambertMaterial&&!z.envMap||z.isMeshPhongMaterial&&!z.envMap,Te=se.get(z.envMap||ye,Me),He=z.vertexColors===!0&&!!$.attributes.color&&$.attributes.color.itemSize===4,$e=!!$.attributes.tangent&&(!!z.normalMap||z.anisotropy>0),be=!!$.morphAttributes.position,Qe=!!$.morphAttributes.normal,St=!!$.morphAttributes.color;let ft=Dn;z.toneMapped&&(ne===null||ne.isXRRenderTarget===!0)&&(ft=C.toneMapping);const ct=$.morphAttributes.position||$.morphAttributes.normal||$.morphAttributes.color,Bt=ct!==void 0?ct.length:0,xe=W.get(z),Ht=E.state.lights;if(Je===!0&&(dt===!0||M!==Q)){const ut=M===Q&&z.id===q;Ce.setState(z,M,ut)}let Ye=!1;z.version===xe.__version?(xe.needsLights&&xe.lightsStateVersion!==Ht.state.version||xe.outputColorSpace!==pe||H.isBatchedMesh&&xe.batching===!1||!H.isBatchedMesh&&xe.batching===!0||H.isBatchedMesh&&xe.batchingColor===!0&&H._colorsTexture===null||H.isBatchedMesh&&xe.batchingColor===!1&&H._colorsTexture!==null||H.isInstancedMesh&&xe.instancing===!1||!H.isInstancedMesh&&xe.instancing===!0||H.isSkinnedMesh&&xe.skinning===!1||!H.isSkinnedMesh&&xe.skinning===!0||H.isInstancedMesh&&xe.instancingColor===!0&&H.instanceColor===null||H.isInstancedMesh&&xe.instancingColor===!1&&H.instanceColor!==null||H.isInstancedMesh&&xe.instancingMorph===!0&&H.morphTexture===null||H.isInstancedMesh&&xe.instancingMorph===!1&&H.morphTexture!==null||xe.envMap!==Te||z.fog===!0&&xe.fog!==me||xe.numClippingPlanes!==void 0&&(xe.numClippingPlanes!==Ce.numPlanes||xe.numIntersection!==Ce.numIntersection)||xe.vertexAlphas!==He||xe.vertexTangents!==$e||xe.morphTargets!==be||xe.morphNormals!==Qe||xe.morphColors!==St||xe.toneMapping!==ft||xe.morphTargetsCount!==Bt||!!xe.lightProbeGrid!=E.state.lightProbeGridArray.length>0)&&(Ye=!0):(Ye=!0,xe.__version=z.version);let tn=xe.currentProgram;Ye===!0&&(tn=cr(z,D,H),B&&z.isNodeMaterial&&B.onUpdateProgram(z,tn,xe));let bn=!1,oi=!1,Bi=!1;const ot=tn.getUniforms(),xt=xe.uniforms;if(x.useProgram(tn.program)&&(bn=!0,oi=!0,Bi=!0),z.id!==q&&(q=z.id,oi=!0),xe.needsLights){const ut=_u(E.state.lightProbeGridArray,H);xe.lightProbeGrid!==ut&&(xe.lightProbeGrid=ut,oi=!0)}if(bn||Q!==M){x.buffers.depth.getReversed()&&M.reversedDepth!==!0&&(M._reversedDepth=!0,M.updateProjectionMatrix()),ot.setValue(U,"projectionMatrix",M.projectionMatrix),ot.setValue(U,"viewMatrix",M.matrixWorldInverse);const ci=ot.map.cameraPosition;ci!==void 0&&ci.setValue(U,pt.setFromMatrixPosition(M.matrixWorld)),R.logarithmicDepthBuffer&&ot.setValue(U,"logDepthBufFC",2/(Math.log(M.far+1)/Math.LN2)),(z.isMeshPhongMaterial||z.isMeshToonMaterial||z.isMeshLambertMaterial||z.isMeshBasicMaterial||z.isMeshStandardMaterial||z.isShaderMaterial)&&ot.setValue(U,"isOrthographic",M.isOrthographicCamera===!0),Q!==M&&(Q=M,oi=!0,Bi=!0)}if(xe.needsLights&&(Ht.state.sunShadowMap.length>0&&ot.setValue(U,"sunShadowMap",Ht.state.sunShadowMap,K),Ht.state.directionalShadowMap.length>0&&ot.setValue(U,"directionalShadowMap",Ht.state.directionalShadowMap,K),Ht.state.spotShadowMap.length>0&&ot.setValue(U,"spotShadowMap",Ht.state.spotShadowMap,K),Ht.state.pointShadowMap.length>0&&ot.setValue(U,"pointShadowMap",Ht.state.pointShadowMap,K)),H.isSkinnedMesh){ot.setOptional(U,H,"bindMatrix"),ot.setOptional(U,H,"bindMatrixInverse");const ut=H.skeleton;ut&&(ut.boneTexture===null&&ut.computeBoneTexture(),ot.setValue(U,"boneTexture",ut.boneTexture,K))}H.isBatchedMesh&&(ot.setOptional(U,H,"batchingTexture"),ot.setValue(U,"batchingTexture",H._matricesTexture,K),ot.setOptional(U,H,"batchingIdTexture"),ot.setValue(U,"batchingIdTexture",H._indirectTexture,K),ot.setOptional(U,H,"batchingColorTexture"),H._colorsTexture!==null&&ot.setValue(U,"batchingColorTexture",H._colorsTexture,K));const li=$.morphAttributes;if((li.position!==void 0||li.normal!==void 0||li.color!==void 0)&&N.update(H,$,tn),(oi||xe.receiveShadow!==H.receiveShadow)&&(xe.receiveShadow=H.receiveShadow,ot.setValue(U,"receiveShadow",H.receiveShadow)),(z.isMeshStandardMaterial||z.isMeshLambertMaterial||z.isMeshPhongMaterial)&&z.envMap===null&&D.environment!==null&&(xt.envMapIntensity.value=D.environmentIntensity),xt.dfgLUT!==void 0&&(xt.dfgLUT.value=rx()),oi){if(ot.setValue(U,"toneMappingExposure",C.toneMappingExposure),xe.needsLights&&xu(xt,Bi),me&&z.fog===!0&&Re.refreshFogUniforms(xt,me),Re.refreshMaterialUniforms(xt,z,k,I,E.state.transmissionRenderTarget[M.id]),xe.needsLights&&xe.lightProbeGrid){const ut=xe.lightProbeGrid;xt.probesSH.value=ut.texture,xt.probesMin.value.copy(ut.boundingBox.min),xt.probesMax.value.copy(ut.boundingBox.max),xt.probesResolution.value.copy(ut.resolution)}qr.upload(U,cc(xe),xt,K)}if(z.isShaderMaterial&&z.uniformsNeedUpdate===!0&&(qr.upload(U,cc(xe),xt,K),z.uniformsNeedUpdate=!1),z.isSpriteMaterial&&ot.setValue(U,"center",H.center),ot.setValue(U,"modelViewMatrix",H.modelViewMatrix),ot.setValue(U,"normalMatrix",H.normalMatrix),ot.setValue(U,"modelMatrix",H.matrixWorld),z.uniformsGroups!==void 0){const ut=z.uniformsGroups;for(let ci=0,ki=ut.length;ci<ki;ci++){const uc=ut[ci];te.update(uc,tn),te.bind(uc,tn)}}return tn}function xu(M,D){M.ambientLightColor.needsUpdate=D,M.lightProbe.needsUpdate=D,M.sunLights.needsUpdate=D,M.sunLightShadows.needsUpdate=D,M.directionalLights.needsUpdate=D,M.directionalLightShadows.needsUpdate=D,M.pointLights.needsUpdate=D,M.pointLightShadows.needsUpdate=D,M.spotLights.needsUpdate=D,M.spotLightShadows.needsUpdate=D,M.rectAreaLights.needsUpdate=D,M.hemisphereLights.needsUpdate=D}function yu(M){return M.isMeshLambertMaterial||M.isMeshToonMaterial||M.isMeshPhongMaterial||M.isMeshStandardMaterial||M.isShadowMaterial||M.isShaderMaterial&&M.lights===!0}this.getActiveCubeFace=function(){return J},this.getActiveMipmapLevel=function(){return X},this.getRenderTarget=function(){return ne},this.setRenderTargetTextures=function(M,D,$){const z=W.get(M);z.__autoAllocateDepthBuffer=M.resolveDepthBuffer===!1,z.__autoAllocateDepthBuffer===!1&&(z.__useRenderToTexture=!1),W.get(M.texture).__webglTexture=D,W.get(M.depthTexture).__webglTexture=z.__autoAllocateDepthBuffer?void 0:$,z.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(M,D){const $=W.get(M);$.__webglFramebuffer=D,$.__useDefaultFramebuffer=D===void 0},this.setRenderTarget=function(M,D=0,$=0){ne=M,J=D,X=$;let z=null,H=!1,me=!1;if(M){const pe=W.get(M);if(pe.__useDefaultFramebuffer!==void 0){x.bindFramebuffer(U.FRAMEBUFFER,pe.__webglFramebuffer),ee.copy(M.viewport),Pe.copy(M.scissor),Ee=M.scissorTest,x.viewport(ee),x.scissor(Pe),x.setScissorTest(Ee),q=-1;return}else if(pe.__webglFramebuffer===void 0)K.setupRenderTarget(M);else if(pe.__hasExternalTextures)K.rebindTextures(M,W.get(M.texture).__webglTexture,W.get(M.depthTexture).__webglTexture);else if(M.depthBuffer){const He=M.depthTexture;if(pe.__boundDepthTexture!==He){if(He!==null&&W.has(He)&&(M.width!==He.image.width||M.height!==He.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");K.setupDepthRenderbuffer(M)}}const Me=M.texture;(Me.isData3DTexture||Me.isDataArrayTexture||Me.isCompressedArrayTexture)&&(me=!0);const Te=W.get(M).__webglFramebuffer;M.isWebGLCubeRenderTarget?(Array.isArray(Te[D])?z=Te[D][$]:z=Te[D],H=!0):M.samples>0&&K.useMultisampledRTT(M)===!1?z=W.get(M).__webglMultisampledFramebuffer:Array.isArray(Te)?z=Te[$]:z=Te,ee.copy(M.viewport),Pe.copy(M.scissor),Ee=M.scissorTest}else ee.copy(fe).multiplyScalar(k).floor(),Pe.copy(Ue).multiplyScalar(k).floor(),Ee=vt;if($!==0&&(z=V),x.bindFramebuffer(U.FRAMEBUFFER,z)&&x.drawBuffers(M,z),x.viewport(ee),x.scissor(Pe),x.setScissorTest(Ee),H){const pe=W.get(M.texture);U.framebufferTexture2D(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_CUBE_MAP_POSITIVE_X+D,pe.__webglTexture,$)}else if(me){const pe=D;for(let Me=0;Me<M.textures.length;Me++){const Te=W.get(M.textures[Me]);U.framebufferTextureLayer(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0+Me,Te.__webglTexture,$,pe)}}else if(M!==null&&$!==0){const pe=W.get(M.texture);U.framebufferTexture2D(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_2D,pe.__webglTexture,$)}q=-1};function hc(M){const D=W.get(M);return(D.__readFormat!==M.format||D.__readType!==M.type)&&(D.__readFormat=M.format,D.__readType=M.type,D.__formatReadable=R.textureFormatReadable(M.format),D.__typeReadable=R.textureTypeReadable(M.type)),D}this.readRenderTargetPixels=function(M,D,$,z,H,me,ye,pe=0){if(!(M&&M.isWebGLRenderTarget)){Ne("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Me=W.get(M).__webglFramebuffer;if(M.isWebGLCubeRenderTarget&&ye!==void 0&&(Me=Me[ye]),Me){x.bindFramebuffer(U.FRAMEBUFFER,Me);try{const Te=M.textures[pe],He=Te.format,$e=Te.type;M.textures.length>1&&U.readBuffer(U.COLOR_ATTACHMENT0+pe);const be=hc(Te);if(be.__formatReadable===!1){Ne("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(be.__typeReadable===!1){Ne("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}D>=0&&D<=M.width-z&&$>=0&&$<=M.height-H&&U.readPixels(D,$,z,H,ce.convert(He),ce.convert($e),me)}finally{const Te=ne!==null?W.get(ne).__webglFramebuffer:null;x.bindFramebuffer(U.FRAMEBUFFER,Te)}}},this.readRenderTargetPixelsAsync=async function(M,D,$,z,H,me,ye,pe=0){if(!(M&&M.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Me=W.get(M).__webglFramebuffer;if(M.isWebGLCubeRenderTarget&&ye!==void 0&&(Me=Me[ye]),Me)if(D>=0&&D<=M.width-z&&$>=0&&$<=M.height-H){x.bindFramebuffer(U.FRAMEBUFFER,Me);const Te=M.textures[pe],He=Te.format,$e=Te.type;M.textures.length>1&&U.readBuffer(U.COLOR_ATTACHMENT0+pe);const be=hc(Te);if(be.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(be.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const Qe=U.createBuffer();U.bindBuffer(U.PIXEL_PACK_BUFFER,Qe),U.bufferData(U.PIXEL_PACK_BUFFER,me.byteLength,U.STREAM_READ),U.readPixels(D,$,z,H,ce.convert(He),ce.convert($e),0),U.bindBuffer(U.PIXEL_PACK_BUFFER,null);const St=ne!==null?W.get(ne).__webglFramebuffer:null;x.bindFramebuffer(U.FRAMEBUFFER,St);const ft=U.fenceSync(U.SYNC_GPU_COMMANDS_COMPLETE,0);return U.flush(),await lf(U,ft,4),U.bindBuffer(U.PIXEL_PACK_BUFFER,Qe),U.getBufferSubData(U.PIXEL_PACK_BUFFER,0,me),U.bindBuffer(U.PIXEL_PACK_BUFFER,null),U.deleteBuffer(Qe),U.deleteSync(ft),me}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(M,D=null,$=0){const z=Math.pow(2,-$),H=Math.floor(M.image.width*z),me=Math.floor(M.image.height*z),ye=D!==null?D.x:0,pe=D!==null?D.y:0;K.setTexture2D(M,0),U.copyTexSubImage2D(U.TEXTURE_2D,$,0,0,ye,pe,H,me),x.unbindTexture()},this.copyTextureToTexture=function(M,D,$=null,z=null,H=0,me=0){let ye,pe,Me,Te,He,$e,be,Qe,St;const ft=M.isCompressedTexture?M.mipmaps[me]:M.image;if($!==null)ye=$.max.x-$.min.x,pe=$.max.y-$.min.y,Me=$.isBox3?$.max.z-$.min.z:1,Te=$.min.x,He=$.min.y,$e=$.isBox3?$.min.z:0;else{const xt=Math.pow(2,-H);ye=Math.floor(ft.width*xt),pe=Math.floor(ft.height*xt),M.isDataArrayTexture?Me=ft.depth:M.isData3DTexture?Me=Math.floor(ft.depth*xt):Me=1,Te=0,He=0,$e=0}z!==null?(be=z.x,Qe=z.y,St=z.z):(be=0,Qe=0,St=0);const ct=ce.convert(D.format),Bt=ce.convert(D.type);let xe;D.isData3DTexture?(K.setTexture3D(D,0),xe=U.TEXTURE_3D):D.isDataArrayTexture||D.isCompressedArrayTexture?(K.setTexture2DArray(D,0),xe=U.TEXTURE_2D_ARRAY):(K.setTexture2D(D,0),xe=U.TEXTURE_2D),x.activeTexture(U.TEXTURE0),x.pixelStorei(U.UNPACK_FLIP_Y_WEBGL,D.flipY),x.pixelStorei(U.UNPACK_PREMULTIPLY_ALPHA_WEBGL,D.premultiplyAlpha),x.pixelStorei(U.UNPACK_ALIGNMENT,D.unpackAlignment);const Ht=x.getParameter(U.UNPACK_ROW_LENGTH),Ye=x.getParameter(U.UNPACK_IMAGE_HEIGHT),tn=x.getParameter(U.UNPACK_SKIP_PIXELS),bn=x.getParameter(U.UNPACK_SKIP_ROWS),oi=x.getParameter(U.UNPACK_SKIP_IMAGES);x.pixelStorei(U.UNPACK_ROW_LENGTH,ft.width),x.pixelStorei(U.UNPACK_IMAGE_HEIGHT,ft.height),x.pixelStorei(U.UNPACK_SKIP_PIXELS,Te),x.pixelStorei(U.UNPACK_SKIP_ROWS,He),x.pixelStorei(U.UNPACK_SKIP_IMAGES,$e);const Bi=M.isDataArrayTexture||M.isData3DTexture,ot=D.isDataArrayTexture||D.isData3DTexture;if(M.isDepthTexture){const xt=W.get(M),li=W.get(D),ut=W.get(xt.__renderTarget),ci=W.get(li.__renderTarget);x.bindFramebuffer(U.READ_FRAMEBUFFER,ut.__webglFramebuffer),x.bindFramebuffer(U.DRAW_FRAMEBUFFER,ci.__webglFramebuffer);for(let ki=0;ki<Me;ki++)Bi&&(U.framebufferTextureLayer(U.READ_FRAMEBUFFER,U.COLOR_ATTACHMENT0,W.get(M).__webglTexture,H,$e+ki),U.framebufferTextureLayer(U.DRAW_FRAMEBUFFER,U.COLOR_ATTACHMENT0,W.get(D).__webglTexture,me,St+ki)),U.blitFramebuffer(Te,He,ye,pe,be,Qe,ye,pe,U.DEPTH_BUFFER_BIT,U.NEAREST);x.bindFramebuffer(U.READ_FRAMEBUFFER,null),x.bindFramebuffer(U.DRAW_FRAMEBUFFER,null)}else if(H!==0||M.isRenderTargetTexture||W.has(M)){const xt=W.get(M),li=W.get(D);x.bindFramebuffer(U.READ_FRAMEBUFFER,O),x.bindFramebuffer(U.DRAW_FRAMEBUFFER,G);for(let ut=0;ut<Me;ut++)Bi?U.framebufferTextureLayer(U.READ_FRAMEBUFFER,U.COLOR_ATTACHMENT0,xt.__webglTexture,H,$e+ut):U.framebufferTexture2D(U.READ_FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_2D,xt.__webglTexture,H),ot?U.framebufferTextureLayer(U.DRAW_FRAMEBUFFER,U.COLOR_ATTACHMENT0,li.__webglTexture,me,St+ut):U.framebufferTexture2D(U.DRAW_FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_2D,li.__webglTexture,me),H!==0?U.blitFramebuffer(Te,He,ye,pe,be,Qe,ye,pe,U.COLOR_BUFFER_BIT,U.NEAREST):ot?U.copyTexSubImage3D(xe,me,be,Qe,St+ut,Te,He,ye,pe):U.copyTexSubImage2D(xe,me,be,Qe,Te,He,ye,pe);x.bindFramebuffer(U.READ_FRAMEBUFFER,null),x.bindFramebuffer(U.DRAW_FRAMEBUFFER,null)}else ot?M.isDataTexture||M.isData3DTexture?U.texSubImage3D(xe,me,be,Qe,St,ye,pe,Me,ct,Bt,ft.data):D.isCompressedArrayTexture?U.compressedTexSubImage3D(xe,me,be,Qe,St,ye,pe,Me,ct,ft.data):U.texSubImage3D(xe,me,be,Qe,St,ye,pe,Me,ct,Bt,ft):M.isDataTexture?U.texSubImage2D(U.TEXTURE_2D,me,be,Qe,ye,pe,ct,Bt,ft.data):M.isCompressedTexture?U.compressedTexSubImage2D(U.TEXTURE_2D,me,be,Qe,ft.width,ft.height,ct,ft.data):U.texSubImage2D(U.TEXTURE_2D,me,be,Qe,ye,pe,ct,Bt,ft);x.pixelStorei(U.UNPACK_ROW_LENGTH,Ht),x.pixelStorei(U.UNPACK_IMAGE_HEIGHT,Ye),x.pixelStorei(U.UNPACK_SKIP_PIXELS,tn),x.pixelStorei(U.UNPACK_SKIP_ROWS,bn),x.pixelStorei(U.UNPACK_SKIP_IMAGES,oi),me===0&&D.generateMipmaps&&U.generateMipmap(xe),x.unbindTexture()},this.initRenderTarget=function(M){W.get(M).__webglFramebuffer===void 0&&K.setupRenderTarget(M)},this.initTexture=function(M){M.isCubeTexture?K.setTextureCube(M,0):M.isData3DTexture?K.setTexture3D(M,0):M.isDataArrayTexture||M.isCompressedArrayTexture?K.setTexture2DArray(M,0):K.setTexture2D(M,0),x.unbindTexture()},this.resetState=function(){J=0,X=0,ne=null,x.reset(),ge.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Ln}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=qe._getDrawingBufferColorSpace(e),t.unpackColorSpace=qe._getUnpackColorSpace()}}const Od={type:"change"},ql={type:"start"},qh={type:"end"},Fr=new xs,Fd=new Yn,ox=Math.cos(70*Sh.DEG2RAD),Tt=new P,qt=2*Math.PI,rt={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},ao=1e-6;class lx extends lm{constructor(e,t=null){super(e,t),this.state=rt.NONE,this.target=new P,this.cursor=new P,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:os.ROTATE,MIDDLE:os.DOLLY,RIGHT:os.PAN},this.touches={ONE:ss.ROTATE,TWO:ss.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._cursorStyle="auto",this._domElementKeyEvents=null,this._lastPosition=new P,this._lastQuaternion=new xn,this._lastTargetPosition=new P,this._quat=new xn().setFromUnitVectors(e.up,new P(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new hd,this._sphericalDelta=new hd,this._scale=1,this._panOffset=new P,this._rotateStart=new _e,this._rotateEnd=new _e,this._rotateDelta=new _e,this._panStart=new _e,this._panEnd=new _e,this._panDelta=new _e,this._dollyStart=new _e,this._dollyEnd=new _e,this._dollyDelta=new _e,this._dollyDirection=new P,this._mouse=new _e,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=dx.bind(this),this._onPointerDown=cx.bind(this),this._onPointerUp=hx.bind(this),this._onContextMenu=vx.bind(this),this._onMouseWheel=px.bind(this),this._onKeyDown=mx.bind(this),this._onTouchStart=gx.bind(this),this._onTouchMove=_x.bind(this),this._onMouseDown=ux.bind(this),this._onMouseMove=fx.bind(this),this._interceptControlDown=xx.bind(this),this._interceptControlUp=yx.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}set cursorStyle(e){this._cursorStyle=e,e==="grab"?this.domElement.style.cursor="grab":this.domElement.style.cursor="auto"}get cursorStyle(){return this._cursorStyle}connect(e){super.connect(e),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.state=rt.NONE,this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents();const e=this.domElement.getRootNode();e.removeEventListener("keydown",this._interceptControlDown,{capture:!0}),e.removeEventListener("keyup",this._interceptControlUp,{capture:!0}),this._controlActive=!1,this._pointers.length=0,this._pointerPositions={},this.domElement.style.touchAction="",this.domElement.style.cursor="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(e){e.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=e}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(Od),this.update(),this.state=rt.NONE}pan(e,t){this._pan(e,t),this.update()}dollyIn(e){this._dollyIn(e),this.update()}dollyOut(e){this._dollyOut(e),this.update()}rotateLeft(e){this._rotateLeft(e),this.update()}rotateUp(e){this._rotateUp(e),this.update()}update(e=null){const t=this.object.position;Tt.copy(t).sub(this.target),Tt.applyQuaternion(this._quat),this._spherical.setFromVector3(Tt),this.autoRotate&&this.state===rt.NONE&&this._rotateLeft(this._getAutoRotationAngle(e)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let n=this.minAzimuthAngle,i=this.maxAzimuthAngle;isFinite(n)&&isFinite(i)&&(n<-Math.PI?n+=qt:n>Math.PI&&(n-=qt),i<-Math.PI?i+=qt:i>Math.PI&&(i-=qt),n<=i?this._spherical.theta=Math.max(n,Math.min(i,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(n+i)/2?Math.max(n,this._spherical.theta):Math.min(i,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let r=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{const a=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),r=a!=this._spherical.radius}if(Tt.setFromSpherical(this._spherical),Tt.applyQuaternion(this._quatInverse),t.copy(this.target).add(Tt),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let a=null;if(this.object.isPerspectiveCamera){const o=Tt.length();a=this._clampDistance(o*this._scale);const l=o-a;this.object.position.addScaledVector(this._dollyDirection,l),this.object.updateMatrixWorld(),r=!!l}else if(this.object.isOrthographicCamera){const o=new P(this._mouse.x,this._mouse.y,0);o.unproject(this.object);const l=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),r=l!==this.object.zoom;const c=new P(this._mouse.x,this._mouse.y,0);c.unproject(this.object),this.object.position.sub(c).add(o),this.object.updateMatrixWorld(),a=Tt.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;a!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(a).add(this.object.position):(Fr.origin.copy(this.object.position),Fr.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(Fr.direction))<ox?this.object.lookAt(this.target):(Fd.setFromNormalAndCoplanarPoint(this.object.up,this.target),Fr.intersectPlane(Fd,this.target))))}else if(this.object.isOrthographicCamera){const a=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),a!==this.object.zoom&&(this.object.updateProjectionMatrix(),r=!0)}return this._scale=1,this._performCursorZoom=!1,r||this._lastPosition.distanceToSquared(this.object.position)>ao||8*(1-this._lastQuaternion.dot(this.object.quaternion))>ao||this._lastTargetPosition.distanceToSquared(this.target)>ao?(this.dispatchEvent(Od),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(e){return e!==null?qt/60*this.autoRotateSpeed*e:qt/60/60*this.autoRotateSpeed}_getZoomScale(e){const t=Math.abs(e*.01);return Math.pow(.95,this.zoomSpeed*t)}_rotateLeft(e){this._sphericalDelta.theta-=e}_rotateUp(e){this._sphericalDelta.phi-=e}_panLeft(e,t){Tt.setFromMatrixColumn(t,0),Tt.multiplyScalar(-e),this._panOffset.add(Tt)}_panUp(e,t){this.screenSpacePanning===!0?Tt.setFromMatrixColumn(t,1):(Tt.setFromMatrixColumn(t,0),Tt.crossVectors(this.object.up,Tt)),Tt.multiplyScalar(e),this._panOffset.add(Tt)}_pan(e,t){const n=this.domElement;if(this.object.isPerspectiveCamera){const i=this.object.position;Tt.copy(i).sub(this.target);let r=Tt.length();r*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*e*r/n.clientHeight,this.object.matrix),this._panUp(2*t*r/n.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(e*(this.object.right-this.object.left)/this.object.zoom/n.clientWidth,this.object.matrix),this._panUp(t*(this.object.top-this.object.bottom)/this.object.zoom/n.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(e,t){if(!this.zoomToCursor)return;this._performCursorZoom=!0;const n=this.domElement.getBoundingClientRect(),i=e-n.left,r=t-n.top,a=n.width,o=n.height;this._mouse.x=i/a*2-1,this._mouse.y=-(r/o)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(e){return Math.max(this.minDistance,Math.min(this.maxDistance,e))}_handleMouseDownRotate(e){this._rotateStart.set(e.clientX,e.clientY)}_handleMouseDownDolly(e){this._updateZoomParameters(e.clientX,e.clientX),this._dollyStart.set(e.clientX,e.clientY)}_handleMouseDownPan(e){this._panStart.set(e.clientX,e.clientY)}_handleMouseMoveRotate(e){this._rotateEnd.set(e.clientX,e.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const t=this.domElement;this._rotateLeft(qt*this._rotateDelta.x/t.clientHeight),this._rotateUp(qt*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(e){this._dollyEnd.set(e.clientX,e.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(e){this._panEnd.set(e.clientX,e.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(e){this._updateZoomParameters(e.clientX,e.clientY),e.deltaY<0?this._dollyIn(this._getZoomScale(e.deltaY)):e.deltaY>0&&this._dollyOut(this._getZoomScale(e.deltaY)),this.update()}_handleKeyDown(e){let t=!1;switch(e.code){case this.keys.UP:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(qt*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),t=!0;break;case this.keys.BOTTOM:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(-qt*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),t=!0;break;case this.keys.LEFT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(qt*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),t=!0;break;case this.keys.RIGHT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(-qt*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),t=!0;break}t&&(e.preventDefault(),this.update())}_handleTouchStartRotate(e){if(this._pointers.length===1)this._rotateStart.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),i=.5*(e.pageY+t.y);this._rotateStart.set(n,i)}}_handleTouchStartPan(e){if(this._pointers.length===1)this._panStart.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),i=.5*(e.pageY+t.y);this._panStart.set(n,i)}}_handleTouchStartDolly(e){const t=this._getSecondPointerPosition(e),n=e.pageX-t.x,i=e.pageY-t.y,r=Math.sqrt(n*n+i*i);this._dollyStart.set(0,r)}_handleTouchStartDollyPan(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enablePan&&this._handleTouchStartPan(e)}_handleTouchStartDollyRotate(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enableRotate&&this._handleTouchStartRotate(e)}_handleTouchMoveRotate(e){if(this._pointers.length==1)this._rotateEnd.set(e.pageX,e.pageY);else{const n=this._getSecondPointerPosition(e),i=.5*(e.pageX+n.x),r=.5*(e.pageY+n.y);this._rotateEnd.set(i,r)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const t=this.domElement;this._rotateLeft(qt*this._rotateDelta.x/t.clientHeight),this._rotateUp(qt*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(e){if(this._pointers.length===1)this._panEnd.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),i=.5*(e.pageY+t.y);this._panEnd.set(n,i)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(e){const t=this._getSecondPointerPosition(e),n=e.pageX-t.x,i=e.pageY-t.y,r=Math.sqrt(n*n+i*i);this._dollyEnd.set(0,r),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);const a=(e.pageX+t.x)*.5,o=(e.pageY+t.y)*.5;this._updateZoomParameters(a,o)}_handleTouchMoveDollyPan(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enablePan&&this._handleTouchMovePan(e)}_handleTouchMoveDollyRotate(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enableRotate&&this._handleTouchMoveRotate(e)}_addPointer(e){this._pointers.push(e.pointerId)}_removePointer(e){delete this._pointerPositions[e.pointerId];for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId){this._pointers.splice(t,1);return}}_isTrackingPointer(e){for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId)return!0;return!1}_trackPointer(e){let t=this._pointerPositions[e.pointerId];t===void 0&&(t=new _e,this._pointerPositions[e.pointerId]=t),t.set(e.pageX,e.pageY)}_getSecondPointerPosition(e){const t=e.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[t]}_customWheelEvent(e){const t=e.deltaMode,n={clientX:e.clientX,clientY:e.clientY,deltaY:e.deltaY};switch(t){case 1:n.deltaY*=16;break;case 2:n.deltaY*=100;break}return e.ctrlKey&&!this._controlActive&&(n.deltaY*=10),n}}function cx(s){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(s.pointerId),this.domElement.ownerDocument.addEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(s)&&(this._addPointer(s),s.pointerType==="touch"?this._onTouchStart(s):this._onMouseDown(s),this._cursorStyle==="grab"&&(this.domElement.style.cursor="grabbing")))}function dx(s){this.enabled!==!1&&(s.pointerType==="touch"?this._onTouchMove(s):this._onMouseMove(s))}function hx(s){switch(this._removePointer(s),this._pointers.length){case 0:this.domElement.releasePointerCapture(s.pointerId),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(qh),this.state=rt.NONE,this._cursorStyle==="grab"&&(this.domElement.style.cursor="grab");break;case 1:const e=this._pointers[0],t=this._pointerPositions[e];this._onTouchStart({pointerId:e,pageX:t.x,pageY:t.y});break}}function ux(s){let e;switch(s.button){case 0:e=this.mouseButtons.LEFT;break;case 1:e=this.mouseButtons.MIDDLE;break;case 2:e=this.mouseButtons.RIGHT;break;default:e=-1}switch(e){case os.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(s),this.state=rt.DOLLY;break;case os.ROTATE:if(s.ctrlKey||s.metaKey||s.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(s),this.state=rt.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(s),this.state=rt.ROTATE}break;case os.PAN:if(s.ctrlKey||s.metaKey||s.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(s),this.state=rt.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(s),this.state=rt.PAN}break;default:this.state=rt.NONE}this.state!==rt.NONE&&this.dispatchEvent(ql)}function fx(s){switch(this.state){case rt.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(s);break;case rt.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(s);break;case rt.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(s);break}}function px(s){this.enabled===!1||this.enableZoom===!1||this.state!==rt.NONE||(s.preventDefault(),this.dispatchEvent(ql),this._handleMouseWheel(this._customWheelEvent(s)),this.dispatchEvent(qh))}function mx(s){this.enabled!==!1&&this._handleKeyDown(s)}function gx(s){switch(this._trackPointer(s),this._pointers.length){case 1:switch(this.touches.ONE){case ss.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(s),this.state=rt.TOUCH_ROTATE;break;case ss.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(s),this.state=rt.TOUCH_PAN;break;default:this.state=rt.NONE}break;case 2:switch(this.touches.TWO){case ss.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(s),this.state=rt.TOUCH_DOLLY_PAN;break;case ss.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(s),this.state=rt.TOUCH_DOLLY_ROTATE;break;default:this.state=rt.NONE}break;default:this.state=rt.NONE}this.state!==rt.NONE&&this.dispatchEvent(ql)}function _x(s){switch(this._trackPointer(s),this.state){case rt.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(s),this.update();break;case rt.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(s),this.update();break;case rt.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(s),this.update();break;case rt.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(s),this.update();break;default:this.state=rt.NONE}}function vx(s){this.enabled!==!1&&s.preventDefault()}function xx(s){s.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function yx(s){s.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function Bd(s,e){if(e===Ku)return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."),s;if(e===sl||e===yh){let t=s.getIndex();if(t===null){const r=[],a=s.getAttribute("position");if(a!==void 0){for(let o=0;o<a.count;o++)r.push(o);s.setIndex(r),t=s.getIndex()}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),s}const n=t.count-2,i=[];if(e===sl)for(let r=1;r<=n;r++)i.push(t.getX(0)),i.push(t.getX(r)),i.push(t.getX(r+1));else for(let r=0;r<n;r++)r%2===0?(i.push(t.getX(r)),i.push(t.getX(r+1)),i.push(t.getX(r+2))):(i.push(t.getX(r+2)),i.push(t.getX(r+1)),i.push(t.getX(r)));return i.length/3!==n&&console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles."),s.setIndex(i),s.clearGroups(),s}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",e),s}function Mx(s){const e=new Map,t=new Map,n=s.clone();return Kh(s,n,function(i,r){e.set(r,i),t.set(i,r)}),n.traverse(function(i){if(!i.isSkinnedMesh)return;const r=i,a=e.get(i),o=a.skeleton.bones;r.skeleton=a.skeleton.clone(),r.bindMatrix.copy(a.bindMatrix),r.skeleton.bones=o.map(function(l){return t.get(l)}),r.bind(r.skeleton,r.bindMatrix)}),n}function Kh(s,e,t){t(s,e);for(let n=0;n<s.children.length;n++)Kh(s.children[n],e.children[n],t)}class bx extends Ss{constructor(e){super(e),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(t){return new Ax(t)}),this.register(function(t){return new Rx(t)}),this.register(function(t){return new Fx(t)}),this.register(function(t){return new Bx(t)}),this.register(function(t){return new kx(t)}),this.register(function(t){return new Px(t)}),this.register(function(t){return new Lx(t)}),this.register(function(t){return new Ix(t)}),this.register(function(t){return new Dx(t)}),this.register(function(t){return new wx(t)}),this.register(function(t){return new Nx(t)}),this.register(function(t){return new Cx(t)}),this.register(function(t){return new Ox(t)}),this.register(function(t){return new Ux(t)}),this.register(function(t){return new Ex(t)}),this.register(function(t){return new kd(t,Ve.EXT_MESHOPT_COMPRESSION)}),this.register(function(t){return new kd(t,Ve.KHR_MESHOPT_COMPRESSION)}),this.register(function(t){return new zx(t)})}load(e,t,n,i){const r=this;let a;if(this.resourcePath!=="")a=this.resourcePath;else if(this.path!==""){const c=Xs.extractUrlBase(e);a=Xs.resolveURL(c,this.path)}else a=Xs.extractUrlBase(e);this.manager.itemStart(e);const o=function(c){i?i(c):console.error(c),r.manager.itemError(e),r.manager.itemEnd(e)},l=new Fh(this.manager);l.setPath(this.path),l.setResponseType("arraybuffer"),l.setRequestHeader(this.requestHeader),l.setWithCredentials(this.withCredentials),l.load(e,function(c){try{r.parse(c,a,function(d){t(d),r.manager.itemEnd(e)},o)}catch(d){o(d)}},n,o)}setDRACOLoader(e){return this.dracoLoader=e,this}setKTX2Loader(e){return this.ktx2Loader=e,this}setMeshoptDecoder(e){return this.meshoptDecoder=e,this}register(e){return this.pluginCallbacks.indexOf(e)===-1&&this.pluginCallbacks.push(e),this}unregister(e){return this.pluginCallbacks.indexOf(e)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e),1),this}parse(e,t,n,i){let r;const a={},o={},l=new TextDecoder;if(typeof e=="string")r=JSON.parse(e);else if(e instanceof ArrayBuffer)if(l.decode(new Uint8Array(e,0,4))===Yh){try{a[Ve.KHR_BINARY_GLTF]=new Hx(e)}catch(h){i&&i(h);return}r=JSON.parse(a[Ve.KHR_BINARY_GLTF].content)}else r=JSON.parse(l.decode(e));else r=e;if(r.asset===void 0||r.asset.version[0]<2){i&&i(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));return}const c=new ey(r,{path:t||this.resourcePath||"",crossOrigin:this.crossOrigin,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});c.fileLoader.setRequestHeader(this.requestHeader);for(let d=0;d<this.pluginCallbacks.length;d++){const h=this.pluginCallbacks[d](c);h.name||console.error("THREE.GLTFLoader: Invalid plugin found: missing name"),o[h.name]=h,a[h.name]=!0}if(r.extensionsUsed)for(let d=0;d<r.extensionsUsed.length;++d){const h=r.extensionsUsed[d],u=r.extensionsRequired||[];switch(h){case Ve.KHR_MATERIALS_UNLIT:a[h]=new Tx;break;case Ve.KHR_DRACO_MESH_COMPRESSION:a[h]=new Gx(r,this.dracoLoader);break;case Ve.KHR_TEXTURE_TRANSFORM:a[h]=new Vx;break;case Ve.KHR_MESH_QUANTIZATION:a[h]=new Wx;break;default:u.indexOf(h)>=0&&o[h]===void 0&&console.warn('THREE.GLTFLoader: Unknown extension "'+h+'".')}}c.setExtensions(a),c.setPlugins(o),c.parse(n,i)}parseAsync(e,t){const n=this;return new Promise(function(i,r){n.parse(e,t,i,r)})}}function Sx(){let s={};return{get:function(e){return s[e]},add:function(e,t){s[e]=t},remove:function(e){delete s[e]},removeAll:function(){s={}}}}function Mt(s,e,t){const n=s.json.materials[e];return n.extensions&&n.extensions[t]?n.extensions[t]:null}const Ve={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_CLEARCOAT:"KHR_materials_clearcoat",KHR_MATERIALS_DISPERSION:"KHR_materials_dispersion",KHR_MATERIALS_IOR:"KHR_materials_ior",KHR_MATERIALS_SHEEN:"KHR_materials_sheen",KHR_MATERIALS_SPECULAR:"KHR_materials_specular",KHR_MATERIALS_TRANSMISSION:"KHR_materials_transmission",KHR_MATERIALS_IRIDESCENCE:"KHR_materials_iridescence",KHR_MATERIALS_ANISOTROPY:"KHR_materials_anisotropy",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_MATERIALS_VOLUME:"KHR_materials_volume",KHR_TEXTURE_BASISU:"KHR_texture_basisu",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",KHR_MESH_QUANTIZATION:"KHR_mesh_quantization",KHR_MATERIALS_EMISSIVE_STRENGTH:"KHR_materials_emissive_strength",EXT_MATERIALS_BUMP:"EXT_materials_bump",EXT_TEXTURE_WEBP:"EXT_texture_webp",EXT_TEXTURE_AVIF:"EXT_texture_avif",EXT_MESHOPT_COMPRESSION:"EXT_meshopt_compression",KHR_MESHOPT_COMPRESSION:"KHR_meshopt_compression",EXT_MESH_GPU_INSTANCING:"EXT_mesh_gpu_instancing"};class Ex{constructor(e){this.parser=e,this.name=Ve.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){const e=this.parser,t=this.parser.json.nodes||[];for(let n=0,i=t.length;n<i;n++){const r=t[n];r.extensions&&r.extensions[this.name]&&r.extensions[this.name].light!==void 0&&e._addNodeRef(this.cache,r.extensions[this.name].light)}}_loadLight(e){const t=this.parser,n="light:"+e;let i=t.cache.get(n);if(i)return i;const r=t.json,l=((r.extensions&&r.extensions[this.name]||{}).lights||[])[e];let c;const d=new Ie(16777215);l.color!==void 0&&d.setRGB(l.color[0],l.color[1],l.color[2],en);const h=l.range!==void 0?l.range:0;switch(l.type){case"directional":c=new $r(d),c.target.position.set(0,0,-1),c.add(c.target);break;case"point":c=new qp(d),c.distance=h;break;case"spot":c=new Xp(d),c.distance=h,l.spot=l.spot||{},l.spot.innerConeAngle=l.spot.innerConeAngle!==void 0?l.spot.innerConeAngle:0,l.spot.outerConeAngle=l.spot.outerConeAngle!==void 0?l.spot.outerConeAngle:Math.PI/4,c.angle=l.spot.outerConeAngle,c.penumbra=1-l.spot.innerConeAngle/l.spot.outerConeAngle,c.target.position.set(0,0,-1),c.add(c.target);break;default:throw new Error("THREE.GLTFLoader: Unexpected light type: "+l.type)}return c.position.set(0,0,0),Tn(c,l),l.intensity!==void 0&&(c.intensity=l.intensity),c.name=t.createUniqueName(l.name||"light_"+e),i=Promise.resolve(c),t.cache.add(n,i),i}getDependency(e,t){if(e==="light")return this._loadLight(t)}createNodeAttachment(e){const t=this,n=this.parser,r=n.json.nodes[e],o=(r.extensions&&r.extensions[this.name]||{}).light;return o===void 0?null:this._loadLight(o).then(function(l){return n._getNodeRef(t.cache,o,l)})}}class Tx{constructor(){this.name=Ve.KHR_MATERIALS_UNLIT}getMaterialType(){return In}extendParams(e,t,n){const i=[];e.color=new Ie(1,1,1),e.opacity=1;const r=t.pbrMetallicRoughness;if(r){if(Array.isArray(r.baseColorFactor)){const a=r.baseColorFactor;e.color.setRGB(a[0],a[1],a[2],en),e.opacity=a[3]}r.baseColorTexture!==void 0&&i.push(n.assignTexture(e,"map",r.baseColorTexture,Nt))}return Promise.all(i)}}class wx{constructor(e){this.parser=e,this.name=Ve.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(e,t){const n=Mt(this.parser,e,this.name);return n===null||n.emissiveStrength!==void 0&&(t.emissiveIntensity=n.emissiveStrength),Promise.resolve()}}class Ax{constructor(e){this.parser=e,this.name=Ve.KHR_MATERIALS_CLEARCOAT}getMaterialType(e){return Mt(this.parser,e,this.name)!==null?Kt:null}extendMaterialParams(e,t){const n=Mt(this.parser,e,this.name);if(n===null)return Promise.resolve();const i=[];if(n.clearcoatFactor!==void 0&&(t.clearcoat=n.clearcoatFactor),n.clearcoatTexture!==void 0&&i.push(this.parser.assignTexture(t,"clearcoatMap",n.clearcoatTexture)),n.clearcoatRoughnessFactor!==void 0&&(t.clearcoatRoughness=n.clearcoatRoughnessFactor),n.clearcoatRoughnessTexture!==void 0&&i.push(this.parser.assignTexture(t,"clearcoatRoughnessMap",n.clearcoatRoughnessTexture)),n.clearcoatNormalTexture!==void 0&&(i.push(this.parser.assignTexture(t,"clearcoatNormalMap",n.clearcoatNormalTexture)),n.clearcoatNormalTexture.scale!==void 0)){const r=n.clearcoatNormalTexture.scale;t.clearcoatNormalScale=new _e(r,r)}return Promise.all(i)}}class Rx{constructor(e){this.parser=e,this.name=Ve.KHR_MATERIALS_DISPERSION}getMaterialType(e){return Mt(this.parser,e,this.name)!==null?Kt:null}extendMaterialParams(e,t){const n=Mt(this.parser,e,this.name);return n===null||(t.dispersion=n.dispersion!==void 0?n.dispersion:0),Promise.resolve()}}class Cx{constructor(e){this.parser=e,this.name=Ve.KHR_MATERIALS_IRIDESCENCE}getMaterialType(e){return Mt(this.parser,e,this.name)!==null?Kt:null}extendMaterialParams(e,t){const n=Mt(this.parser,e,this.name);if(n===null)return Promise.resolve();const i=[];return n.iridescenceFactor!==void 0&&(t.iridescence=n.iridescenceFactor),n.iridescenceTexture!==void 0&&i.push(this.parser.assignTexture(t,"iridescenceMap",n.iridescenceTexture)),n.iridescenceIor!==void 0&&(t.iridescenceIOR=n.iridescenceIor),t.iridescenceThicknessRange===void 0&&(t.iridescenceThicknessRange=[100,400]),n.iridescenceThicknessMinimum!==void 0&&(t.iridescenceThicknessRange[0]=n.iridescenceThicknessMinimum),n.iridescenceThicknessMaximum!==void 0&&(t.iridescenceThicknessRange[1]=n.iridescenceThicknessMaximum),n.iridescenceThicknessTexture!==void 0&&i.push(this.parser.assignTexture(t,"iridescenceThicknessMap",n.iridescenceThicknessTexture)),Promise.all(i)}}class Px{constructor(e){this.parser=e,this.name=Ve.KHR_MATERIALS_SHEEN}getMaterialType(e){return Mt(this.parser,e,this.name)!==null?Kt:null}extendMaterialParams(e,t){const n=Mt(this.parser,e,this.name);if(n===null)return Promise.resolve();const i=[];if(t.sheenColor=new Ie(0,0,0),t.sheenRoughness=0,t.sheen=1,n.sheenColorFactor!==void 0){const r=n.sheenColorFactor;t.sheenColor.setRGB(r[0],r[1],r[2],en)}return n.sheenRoughnessFactor!==void 0&&(t.sheenRoughness=n.sheenRoughnessFactor),n.sheenColorTexture!==void 0&&i.push(this.parser.assignTexture(t,"sheenColorMap",n.sheenColorTexture,Nt)),n.sheenRoughnessTexture!==void 0&&i.push(this.parser.assignTexture(t,"sheenRoughnessMap",n.sheenRoughnessTexture)),Promise.all(i)}}class Lx{constructor(e){this.parser=e,this.name=Ve.KHR_MATERIALS_TRANSMISSION}getMaterialType(e){return Mt(this.parser,e,this.name)!==null?Kt:null}extendMaterialParams(e,t){const n=Mt(this.parser,e,this.name);if(n===null)return Promise.resolve();const i=[];return n.transmissionFactor!==void 0&&(t.transmission=n.transmissionFactor),n.transmissionTexture!==void 0&&i.push(this.parser.assignTexture(t,"transmissionMap",n.transmissionTexture)),Promise.all(i)}}class Ix{constructor(e){this.parser=e,this.name=Ve.KHR_MATERIALS_VOLUME}getMaterialType(e){return Mt(this.parser,e,this.name)!==null?Kt:null}extendMaterialParams(e,t){const n=Mt(this.parser,e,this.name);if(n===null)return Promise.resolve();const i=[];t.thickness=n.thicknessFactor!==void 0?n.thicknessFactor:0,n.thicknessTexture!==void 0&&i.push(this.parser.assignTexture(t,"thicknessMap",n.thicknessTexture)),t.attenuationDistance=n.attenuationDistance||1/0;const r=n.attenuationColor||[1,1,1];return t.attenuationColor=new Ie().setRGB(r[0],r[1],r[2],en),Promise.all(i)}}class Dx{constructor(e){this.parser=e,this.name=Ve.KHR_MATERIALS_IOR}getMaterialType(e){return Mt(this.parser,e,this.name)!==null?Kt:null}extendMaterialParams(e,t){const n=Mt(this.parser,e,this.name);return n===null||(t.ior=n.ior!==void 0?n.ior:1.5,t.ior===0&&(t.ior=1e3)),Promise.resolve()}}class Nx{constructor(e){this.parser=e,this.name=Ve.KHR_MATERIALS_SPECULAR}getMaterialType(e){return Mt(this.parser,e,this.name)!==null?Kt:null}extendMaterialParams(e,t){const n=Mt(this.parser,e,this.name);if(n===null)return Promise.resolve();const i=[];t.specularIntensity=n.specularFactor!==void 0?n.specularFactor:1,n.specularTexture!==void 0&&i.push(this.parser.assignTexture(t,"specularIntensityMap",n.specularTexture));const r=n.specularColorFactor||[1,1,1];return t.specularColor=new Ie().setRGB(r[0],r[1],r[2],en),n.specularColorTexture!==void 0&&i.push(this.parser.assignTexture(t,"specularColorMap",n.specularColorTexture,Nt)),Promise.all(i)}}class Ux{constructor(e){this.parser=e,this.name=Ve.EXT_MATERIALS_BUMP}getMaterialType(e){return Mt(this.parser,e,this.name)!==null?Kt:null}extendMaterialParams(e,t){const n=Mt(this.parser,e,this.name);if(n===null)return Promise.resolve();const i=[];return t.bumpScale=n.bumpFactor!==void 0?n.bumpFactor:1,n.bumpTexture!==void 0&&i.push(this.parser.assignTexture(t,"bumpMap",n.bumpTexture)),Promise.all(i)}}class Ox{constructor(e){this.parser=e,this.name=Ve.KHR_MATERIALS_ANISOTROPY}getMaterialType(e){return Mt(this.parser,e,this.name)!==null?Kt:null}extendMaterialParams(e,t){const n=Mt(this.parser,e,this.name);if(n===null)return Promise.resolve();const i=[];return n.anisotropyStrength!==void 0&&(t.anisotropy=n.anisotropyStrength),n.anisotropyRotation!==void 0&&(t.anisotropyRotation=n.anisotropyRotation),n.anisotropyTexture!==void 0&&i.push(this.parser.assignTexture(t,"anisotropyMap",n.anisotropyTexture)),Promise.all(i)}}class Fx{constructor(e){this.parser=e,this.name=Ve.KHR_TEXTURE_BASISU}loadTexture(e){const t=this.parser,n=t.json,i=n.textures[e];if(!i.extensions||!i.extensions[this.name])return null;const r=i.extensions[this.name],a=t.options.ktx2Loader;if(!a){if(n.extensionsRequired&&n.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");return null}return t.loadTextureImage(e,r.source,a)}}class Bx{constructor(e){this.parser=e,this.name=Ve.EXT_TEXTURE_WEBP}loadTexture(e){const t=this.name,n=this.parser,i=n.json,r=i.textures[e];if(!r.extensions||!r.extensions[t])return null;const a=r.extensions[t],o=i.images[a.source];let l=n.textureLoader;if(o.uri){const c=n.options.manager.getHandler(o.uri);c!==null&&(l=c)}return n.loadTextureImage(e,a.source,l)}}class kx{constructor(e){this.parser=e,this.name=Ve.EXT_TEXTURE_AVIF}loadTexture(e){const t=this.name,n=this.parser,i=n.json,r=i.textures[e];if(!r.extensions||!r.extensions[t])return null;const a=r.extensions[t],o=i.images[a.source];let l=n.textureLoader;if(o.uri){const c=n.options.manager.getHandler(o.uri);c!==null&&(l=c)}return n.loadTextureImage(e,a.source,l)}}class kd{constructor(e,t){this.name=t,this.parser=e}loadBufferView(e){const t=this.parser.json,n=t.bufferViews[e];if(n.extensions&&n.extensions[this.name]){const i=n.extensions[this.name],r=this.parser.getDependency("buffer",i.buffer),a=this.parser.options.meshoptDecoder;if(!a||!a.supported){if(t.extensionsRequired&&t.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");return null}return r.then(function(o){const l=i.byteOffset||0,c=i.byteLength||0,d=i.count,h=i.byteStride,u=new Uint8Array(o,l,c);return a.decodeGltfBufferAsync?a.decodeGltfBufferAsync(d,h,u,i.mode,i.filter).then(function(f){return f.buffer}):a.ready.then(function(){const f=new ArrayBuffer(d*h);return a.decodeGltfBuffer(new Uint8Array(f),d,h,u,i.mode,i.filter),f})})}else return null}}class zx{constructor(e){this.name=Ve.EXT_MESH_GPU_INSTANCING,this.parser=e}createNodeMesh(e){const t=this.parser.json,n=t.nodes[e];if(!n.extensions||!n.extensions[this.name]||n.mesh===void 0)return null;const i=t.meshes[n.mesh];for(const c of i.primitives)if(c.mode!==sn.TRIANGLES&&c.mode!==sn.TRIANGLE_STRIP&&c.mode!==sn.TRIANGLE_FAN&&c.mode!==void 0)return null;const a=n.extensions[this.name].attributes,o=[],l={};for(const c in a)o.push(this.parser.getDependency("accessor",a[c]).then(d=>(l[c]=d,l[c])));return o.length<1?null:(o.push(this.parser.createNodeMesh(e)),Promise.all(o).then(c=>{const d=c.pop(),h=d.isGroup?d.children:[d],u=c[0].count,f=[];for(const g of h){const y=new Be,p=new P,m=new xn,S=new P(1,1,1),T=new jf(g.geometry,g.material,u);for(let b=0;b<u;b++)l.TRANSLATION&&p.fromBufferAttribute(l.TRANSLATION,b),l.ROTATION&&m.fromBufferAttribute(l.ROTATION,b),l.SCALE&&S.fromBufferAttribute(l.SCALE,b),T.setMatrixAt(b,y.compose(p,m,S));let _=null;for(const b in l)if(b==="_COLOR_0"){const E=l[b];T.instanceColor=new ta(E.array,E.itemSize,E.normalized)}else if(b!=="TRANSLATION"&&b!=="ROTATION"&&b!=="SCALE"){if(_===null){const w=T.geometry;_=new Ct,_.name=w.name;for(const v in w.attributes)_.setAttribute(v,w.attributes[v]);for(const v in w.morphAttributes)_.morphAttributes[v]=w.morphAttributes[v];w.index!==null&&_.setIndex(w.index),_.morphTargetsRelative=w.morphTargetsRelative;for(const v of w.groups)_.addGroup(v.start,v.count,v.materialIndex);w.boundingBox!==null&&(_.boundingBox=w.boundingBox.clone()),w.boundingSphere!==null&&(_.boundingSphere=w.boundingSphere.clone()),_.drawRange.start=w.drawRange.start,_.drawRange.count=w.drawRange.count,_.userData=Object.assign({},w.userData),T.geometry=_}const E=l[b];_.setAttribute(b,new ta(E.array,E.itemSize,E.normalized))}mt.prototype.copy.call(T,g),this.parser.assignFinalMaterial(T),f.push(T)}return d.isGroup?(d.clear(),d.add(...f),d):f[0]}))}}const Yh="glTF",Us=12,zd={JSON:1313821514,BIN:5130562};class Hx{constructor(e){this.name=Ve.KHR_BINARY_GLTF,this.content=null,this.body=null;const t=new DataView(e,0,Us),n=new TextDecoder;if(this.header={magic:n.decode(new Uint8Array(e.slice(0,4))),version:t.getUint32(4,!0),length:t.getUint32(8,!0)},this.header.magic!==Yh)throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");if(this.header.version<2)throw new Error("THREE.GLTFLoader: Legacy binary file detected.");const i=this.header.length-Us,r=new DataView(e,Us);let a=0;for(;a<i;){const o=r.getUint32(a,!0);a+=4;const l=r.getUint32(a,!0);if(a+=4,l===zd.JSON){const c=new Uint8Array(e,Us+a,o);this.content=n.decode(c)}else if(l===zd.BIN){const c=Us+a;this.body=e.slice(c,c+o)}a+=o}if(this.content===null)throw new Error("THREE.GLTFLoader: JSON content not found.")}}class Gx{constructor(e,t){if(!t)throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=Ve.KHR_DRACO_MESH_COMPRESSION,this.json=e,this.dracoLoader=t,this.dracoLoader.preload()}decodePrimitive(e,t){const n=this.json,i=this.dracoLoader,r=e.extensions[this.name].bufferView,a=e.extensions[this.name].attributes,o={},l={},c={};for(const d in a){const h=hl[d]||d.toLowerCase();o[h]=a[d]}for(const d in e.attributes){const h=hl[d]||d.toLowerCase();if(a[d]!==void 0){const u=n.accessors[e.attributes[d]],f=hs[u.componentType];c[h]=f.name,l[h]=u.normalized===!0}}return t.getDependency("bufferView",r).then(function(d){return new Promise(function(h,u){i.decodeDracoFile(d,function(f){for(const g in f.attributes){const y=f.attributes[g],p=l[g];p!==void 0&&(y.normalized=p)}h(f)},o,c,en,u)})})}}class Vx{constructor(){this.name=Ve.KHR_TEXTURE_TRANSFORM}extendTexture(e,t){if((t.texCoord===void 0||t.texCoord===e.channel)&&t.offset===void 0&&t.rotation===void 0&&t.scale===void 0)return e;if(e=e.clone(),t.texCoord!==void 0&&(e.channel=t.texCoord),t.offset!==void 0&&e.offset.fromArray(t.offset),t.rotation!==void 0&&(e.rotation=t.rotation),t.scale!==void 0&&e.repeat.fromArray(t.scale),t.rotation!==void 0){const n=Math.cos(e.rotation),i=Math.sin(e.rotation);e.matrix.set(e.repeat.x*n,e.repeat.y*i,e.offset.x,-e.repeat.x*i,e.repeat.y*n,e.offset.y,0,0,1),e.matrixAutoUpdate=!1}return e.needsUpdate=!0,e}}class Wx{constructor(){this.name=Ve.KHR_MESH_QUANTIZATION}}class Zh extends ys{constructor(e,t,n,i){super(e,t,n,i)}copySampleValue_(e){const t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,r=e*i*3+i;for(let a=0;a!==i;a++)t[a]=n[r+a];return t}interpolate_(e,t,n,i){const r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=o*2,c=o*3,d=i-t,h=(n-t)/d,u=h*h,f=u*h,g=e*c,y=g-c,p=-2*f+3*u,m=f-u,S=1-p,T=m-u+h;for(let _=0;_!==o;_++){const b=a[y+_+o],E=a[y+_+l]*d,w=a[g+_+o],v=a[g+_]*d;r[_]=S*b+T*E+p*w+m*v}return r}}const Xx=new xn;class $x extends Zh{interpolate_(e,t,n,i){const r=super.interpolate_(e,t,n,i);return Xx.fromArray(r).normalize().toArray(r),r}}const sn={POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6},hs={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},Hd={9728:At,9729:Rt,9984:fh,9985:zr,9986:Fs,9987:Zn},Gd={33071:Pn,33648:Zr,10497:ms},oo={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},hl={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv1",TEXCOORD_2:"uv2",TEXCOORD_3:"uv3",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},mi={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},qx={CUBICSPLINE:void 0,LINEAR:Zs,STEP:Ys},lo={OPAQUE:"OPAQUE",MASK:"MASK",BLEND:"BLEND"};function Kx(s){return s.DefaultMaterial===void 0&&(s.DefaultMaterial=new ds({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:ni})),s.DefaultMaterial}function Ii(s,e,t){for(const n in t.extensions)s[n]===void 0&&(e.userData.gltfExtensions=e.userData.gltfExtensions||{},e.userData.gltfExtensions[n]=t.extensions[n])}function Tn(s,e){e.extras!==void 0&&(typeof e.extras=="object"?Object.assign(s.userData,e.extras):console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+e.extras))}function Yx(s,e,t){let n=!1,i=!1,r=!1;for(let c=0,d=e.length;c<d;c++){const h=e[c];if(h.POSITION!==void 0&&(n=!0),h.NORMAL!==void 0&&(i=!0),h.COLOR_0!==void 0&&(r=!0),n&&i&&r)break}if(!n&&!i&&!r)return Promise.resolve(s);const a=[],o=[],l=[];for(let c=0,d=e.length;c<d;c++){const h=e[c];if(n){const u=h.POSITION!==void 0?t.getDependency("accessor",h.POSITION):s.attributes.position;a.push(u)}if(i){const u=h.NORMAL!==void 0?t.getDependency("accessor",h.NORMAL):s.attributes.normal;o.push(u)}if(r){const u=h.COLOR_0!==void 0?t.getDependency("accessor",h.COLOR_0):s.attributes.color;l.push(u)}}return Promise.all([Promise.all(a),Promise.all(o),Promise.all(l)]).then(function(c){const d=c[0],h=c[1],u=c[2];return n&&(s.morphAttributes.position=d),i&&(s.morphAttributes.normal=h),r&&(s.morphAttributes.color=u),s.morphTargetsRelative=!0,s})}function Zx(s,e){if(s.updateMorphTargets(),e.weights!==void 0)for(let t=0,n=e.weights.length;t<n;t++)s.morphTargetInfluences[t]=e.weights[t];if(e.extras&&Array.isArray(e.extras.targetNames)){const t=e.extras.targetNames;if(s.morphTargetInfluences.length===t.length){s.morphTargetDictionary={};for(let n=0,i=t.length;n<i;n++)s.morphTargetDictionary[t[n]]=n}else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}function Jx(s){let e;const t=s.extensions&&s.extensions[Ve.KHR_DRACO_MESH_COMPRESSION];if(t?e="draco:"+t.bufferView+":"+t.indices+":"+co(t.attributes):e=s.indices+":"+co(s.attributes)+":"+s.mode,s.targets!==void 0)for(let n=0,i=s.targets.length;n<i;n++)e+=":"+co(s.targets[n]);return e}function co(s){let e="";const t=Object.keys(s).sort();for(let n=0,i=t.length;n<i;n++)e+=t[n]+":"+s[t[n]]+";";return e}function ul(s){switch(s){case Int8Array:return 1/127;case Uint8Array:return 1/255;case Int16Array:return 1/32767;case Uint16Array:return 1/65535;default:throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")}}function jx(s){return s.search(/\.jpe?g($|\?)/i)>0||s.search(/^data\:image\/jpeg/)===0?"image/jpeg":s.search(/\.webp($|\?)/i)>0||s.search(/^data\:image\/webp/)===0?"image/webp":s.search(/\.ktx2($|\?)/i)>0||s.search(/^data\:image\/ktx2/)===0?"image/ktx2":"image/png"}const Qx=new Be;class ey{constructor(e={},t={}){this.json=e,this.extensions={},this.plugins={},this.options=t,this.cache=new Sx,this.associations=new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let n=!1,i=-1,r=!1,a=-1;if(typeof navigator<"u"&&typeof navigator.userAgent<"u"){const o=navigator.userAgent;n=/^((?!chrome|android).)*safari/i.test(o)===!0;const l=o.match(/Version\/(\d+)/);i=n&&l?parseInt(l[1],10):-1,r=o.indexOf("Firefox")>-1,a=r?o.match(/Firefox\/([0-9]+)\./)[1]:-1}typeof createImageBitmap>"u"||n&&i<17||r&&a<98?this.textureLoader=new Gp(this.options.manager):this.textureLoader=new Yp(this.options.manager),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new Fh(this.options.manager),this.fileLoader.setResponseType("arraybuffer"),this.options.crossOrigin==="use-credentials"&&this.fileLoader.setWithCredentials(!0)}setExtensions(e){this.extensions=e}setPlugins(e){this.plugins=e}parse(e,t){const n=this,i=this.json,r=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(a){return a._markDefs&&a._markDefs()}),Promise.all(this._invokeAll(function(a){return a.beforeRoot&&a.beforeRoot()})).then(function(){return Promise.all([n.getDependencies("scene"),n.getDependencies("animation"),n.getDependencies("camera")])}).then(function(a){const o={scene:a[0][i.scene||0],scenes:a[0],animations:a[1],cameras:a[2],asset:i.asset,parser:n,userData:{}};return Ii(r,o,i),Tn(o,i),Promise.all(n._invokeAll(function(l){return l.afterRoot&&l.afterRoot(o)})).then(function(){for(const l of o.scenes)l.updateMatrixWorld();e(o)})}).catch(t)}_markDefs(){const e=this.json.nodes||[],t=this.json.skins||[],n=this.json.meshes||[];for(let i=0,r=t.length;i<r;i++){const a=t[i].joints;for(let o=0,l=a.length;o<l;o++)e[a[o]].isBone=!0}for(let i=0,r=e.length;i<r;i++){const a=e[i];a.mesh!==void 0&&(this._addNodeRef(this.meshCache,a.mesh),a.skin!==void 0&&(n[a.mesh].isSkinnedMesh=!0)),a.camera!==void 0&&this._addNodeRef(this.cameraCache,a.camera)}}_addNodeRef(e,t){t!==void 0&&(e.refs[t]===void 0&&(e.refs[t]=e.uses[t]=0),e.refs[t]++)}_getNodeRef(e,t,n){if(e.refs[t]<=1)return n;const i=n.clone(),r=(a,o)=>{const l=this.associations.get(a);l!=null&&this.associations.set(o,l);for(const[c,d]of a.children.entries())r(d,o.children[c])};return r(n,i),i.name+="_instance_"+e.uses[t]++,i}_invokeOne(e){const t=Object.values(this.plugins);t.push(this);for(let n=0;n<t.length;n++){const i=e(t[n]);if(i)return i}return null}_invokeAll(e){const t=Object.values(this.plugins);t.unshift(this);const n=[];for(let i=0;i<t.length;i++){const r=e(t[i]);r&&n.push(r)}return n}getDependency(e,t){const n=e+":"+t;let i=this.cache.get(n);if(!i){switch(e){case"scene":i=this.loadScene(t);break;case"node":i=this._invokeOne(function(r){return r.loadNode&&r.loadNode(t)});break;case"mesh":i=this._invokeOne(function(r){return r.loadMesh&&r.loadMesh(t)});break;case"accessor":i=this.loadAccessor(t);break;case"bufferView":i=this._invokeOne(function(r){return r.loadBufferView&&r.loadBufferView(t)});break;case"buffer":i=this.loadBuffer(t);break;case"material":i=this._invokeOne(function(r){return r.loadMaterial&&r.loadMaterial(t)});break;case"texture":i=this._invokeOne(function(r){return r.loadTexture&&r.loadTexture(t)});break;case"skin":i=this.loadSkin(t);break;case"animation":i=this._invokeOne(function(r){return r.loadAnimation&&r.loadAnimation(t)});break;case"camera":i=this.loadCamera(t);break;default:if(i=this._invokeOne(function(r){return r!=this&&r.getDependency&&r.getDependency(e,t)}),!i)throw new Error("Unknown type: "+e);break}this.cache.add(n,i)}return i}getDependencies(e){let t=this.cache.get(e);if(!t){const n=this,i=this.json[e+(e==="mesh"?"es":"s")]||[];t=Promise.all(i.map(function(r,a){return n.getDependency(e,a)})),this.cache.add(e,t)}return t}loadBuffer(e){const t=this.json.buffers[e],n=this.fileLoader;if(t.type&&t.type!=="arraybuffer")throw new Error("THREE.GLTFLoader: "+t.type+" buffer type is not supported.");if(t.uri===void 0&&e===0)return Promise.resolve(this.extensions[Ve.KHR_BINARY_GLTF].body);const i=this.options;return new Promise(function(r,a){n.load(Xs.resolveURL(t.uri,i.path),r,void 0,function(){a(new Error('THREE.GLTFLoader: Failed to load buffer "'+t.uri+'".'))})})}loadBufferView(e){const t=this.json.bufferViews[e];return this.getDependency("buffer",t.buffer).then(function(n){const i=t.byteLength||0,r=t.byteOffset||0;return n.slice(r,r+i)})}loadAccessor(e){const t=this,n=this.json,i=this.json.accessors[e];if(i.bufferView===void 0&&i.sparse===void 0){const a=oo[i.type],o=hs[i.componentType],l=i.normalized===!0,c=new o(i.count*a);return Promise.resolve(new Zt(c,a,l))}const r=[];return i.bufferView!==void 0?r.push(this.getDependency("bufferView",i.bufferView)):r.push(null),i.sparse!==void 0&&(r.push(this.getDependency("bufferView",i.sparse.indices.bufferView)),r.push(this.getDependency("bufferView",i.sparse.values.bufferView))),Promise.all(r).then(function(a){const o=a[0],l=oo[i.type],c=hs[i.componentType],d=c.BYTES_PER_ELEMENT,h=d*l,u=i.byteOffset||0,f=i.bufferView!==void 0?n.bufferViews[i.bufferView].byteStride:void 0,g=i.normalized===!0;let y,p;if(f&&f!==h){const m=Math.floor(u/f),S="InterleavedBuffer:"+i.bufferView+":"+i.componentType+":"+m+":"+i.count;let T=t.cache.get(S);T||(y=new c(o,m*f,i.count*f/d),T=new Vf(y,f/d),t.cache.add(S,T)),p=new Ol(T,l,u%f/d,g)}else o===null?y=new c(i.count*l):y=new c(o,u,i.count*l),p=new Zt(y,l,g);if(i.sparse!==void 0){const m=oo.SCALAR,S=hs[i.sparse.indices.componentType],T=i.sparse.indices.byteOffset||0,_=i.sparse.values.byteOffset||0,b=new S(a[1],T,i.sparse.count*m),E=new c(a[2],_,i.sparse.count*l);o!==null&&(p=new Zt(p.array.slice(),p.itemSize,p.normalized)),p.normalized=!1;for(let w=0,v=b.length;w<v;w++){const A=b[w];if(p.setX(A,E[w*l]),l>=2&&p.setY(A,E[w*l+1]),l>=3&&p.setZ(A,E[w*l+2]),l>=4&&p.setW(A,E[w*l+3]),l>=5)throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}p.normalized=g}return p})}loadTexture(e){const t=this.json,n=this.options,r=t.textures[e].source,a=t.images[r];let o=this.textureLoader;if(a.uri){const l=n.manager.getHandler(a.uri);l!==null&&(o=l)}return this.loadTextureImage(e,r,o)}loadTextureImage(e,t,n){const i=this,r=this.json,a=r.textures[e],o=r.images[t],l=(o.uri||o.bufferView)+":"+a.sampler;if(this.textureCache[l])return this.textureCache[l];const c=this.loadImageSource(t,n).then(function(d){d.flipY=!1,d.name=a.name||o.name||"",d.name===""&&typeof o.uri=="string"&&o.uri.startsWith("data:image/")===!1&&(d.name=o.uri);const u=(r.samplers||{})[a.sampler]||{};return d.magFilter=Hd[u.magFilter]||Rt,d.minFilter=Hd[u.minFilter]||Zn,d.wrapS=Gd[u.wrapS]||ms,d.wrapT=Gd[u.wrapT]||ms,d.generateMipmaps=!d.isCompressedTexture&&d.minFilter!==At&&d.minFilter!==Rt,i.associations.set(d,{textures:e}),d}).catch(function(){return null});return this.textureCache[l]=c,c}loadImageSource(e,t){const n=this,i=this.json,r=this.options;if(this.sourceCache[e]!==void 0)return this.sourceCache[e].then(h=>h.clone());const a=i.images[e],o=self.URL||self.webkitURL;let l=a.uri||"",c=!1;if(a.bufferView!==void 0)l=n.getDependency("bufferView",a.bufferView).then(function(h){c=!0;const u=new Blob([h],{type:a.mimeType});return l=o.createObjectURL(u),l});else if(a.uri===void 0)throw new Error("THREE.GLTFLoader: Image "+e+" is missing URI and bufferView");const d=Promise.resolve(l).then(function(h){return new Promise(function(u,f){let g=u;t.isImageBitmapLoader===!0&&(g=function(y){const p=new Ut(y);p.needsUpdate=!0,u(p)}),t.load(Xs.resolveURL(h,r.path),g,void 0,f)})}).then(function(h){return c===!0&&o.revokeObjectURL(l),Tn(h,a),h.userData.mimeType=a.mimeType||jx(a.uri),h}).catch(function(h){throw console.error("THREE.GLTFLoader: Couldn't load texture",l),h});return this.sourceCache[e]=d,d}assignTexture(e,t,n,i){const r=this;return this.getDependency("texture",n.index).then(function(a){if(!a)return null;if(n.texCoord!==void 0&&n.texCoord>0&&(a=a.clone(),a.channel=n.texCoord),r.extensions[Ve.KHR_TEXTURE_TRANSFORM]){const o=n.extensions!==void 0?n.extensions[Ve.KHR_TEXTURE_TRANSFORM]:void 0;if(o){const l=r.associations.get(a);a=r.extensions[Ve.KHR_TEXTURE_TRANSFORM].extendTexture(a,o),r.associations.set(a,l)}}return i!==void 0&&(a.colorSpace=i),e[t]=a,a})}assignFinalMaterial(e){const t=e.geometry;let n=e.material;const i=t.attributes.tangent===void 0,r=t.attributes.color!==void 0,a=t.attributes.normal===void 0;if(e.isPoints){const o="PointsMaterial:"+n.uuid;let l=this.cache.get(o);l||(l=new Ch,Nn.prototype.copy.call(l,n),l.color.copy(n.color),l.map=n.map,l.sizeAttenuation=!1,this.cache.add(o,l)),n=l}else if(e.isLine){const o="LineBasicMaterial:"+n.uuid;let l=this.cache.get(o);l||(l=new zl,Nn.prototype.copy.call(l,n),l.color.copy(n.color),l.map=n.map,this.cache.add(o,l)),n=l}if(i||r||a){let o="ClonedMaterial:"+n.uuid+":";i&&(o+="derivative-tangents:"),r&&(o+="vertex-colors:"),a&&(o+="flat-shading:");let l=this.cache.get(o);l||(l=n.clone(),r&&(l.vertexColors=!0),a&&(l.flatShading=!0),i&&(l.normalScale&&(l.normalScale.y*=-1),l.clearcoatNormalScale&&(l.clearcoatNormalScale.y*=-1)),this.cache.add(o,l),this.associations.set(l,this.associations.get(n))),n=l}e.material=n}getMaterialType(){return ds}loadMaterial(e){const t=this,n=this.json,i=this.extensions,r=n.materials[e];let a;const o={},l=r.extensions||{},c=[];if(l[Ve.KHR_MATERIALS_UNLIT]){const h=i[Ve.KHR_MATERIALS_UNLIT];a=h.getMaterialType(),c.push(h.extendParams(o,r,t))}else{const h=r.pbrMetallicRoughness||{};if(o.color=new Ie(1,1,1),o.opacity=1,Array.isArray(h.baseColorFactor)){const u=h.baseColorFactor;o.color.setRGB(u[0],u[1],u[2],en),o.opacity=u[3]}h.baseColorTexture!==void 0&&c.push(t.assignTexture(o,"map",h.baseColorTexture,Nt)),o.metalness=h.metallicFactor!==void 0?h.metallicFactor:1,o.roughness=h.roughnessFactor!==void 0?h.roughnessFactor:1,h.metallicRoughnessTexture!==void 0&&(c.push(t.assignTexture(o,"metalnessMap",h.metallicRoughnessTexture)),c.push(t.assignTexture(o,"roughnessMap",h.metallicRoughnessTexture))),a=this._invokeOne(function(u){return u.getMaterialType&&u.getMaterialType(e)}),c.push(Promise.all(this._invokeAll(function(u){return u.extendMaterialParams&&u.extendMaterialParams(e,o)})))}r.doubleSided===!0&&(o.side=Xt);const d=r.alphaMode||lo.OPAQUE;if(d===lo.BLEND?(o.transparent=!0,o.depthWrite=!1):(o.transparent=!1,d===lo.MASK&&(o.alphaTest=r.alphaCutoff!==void 0?r.alphaCutoff:.5)),r.normalTexture!==void 0&&a!==In&&(c.push(t.assignTexture(o,"normalMap",r.normalTexture)),o.normalScale=new _e(1,1),r.normalTexture.scale!==void 0)){const h=r.normalTexture.scale;o.normalScale.set(h,h)}if(r.occlusionTexture!==void 0&&a!==In&&(c.push(t.assignTexture(o,"aoMap",r.occlusionTexture)),r.occlusionTexture.strength!==void 0&&(o.aoMapIntensity=r.occlusionTexture.strength)),r.emissiveFactor!==void 0&&a!==In){const h=r.emissiveFactor;o.emissive=new Ie().setRGB(h[0],h[1],h[2],en)}return r.emissiveTexture!==void 0&&a!==In&&c.push(t.assignTexture(o,"emissiveMap",r.emissiveTexture,Nt)),Promise.all(c).then(function(){const h=new a(o);return r.name&&(h.name=r.name),Tn(h,r),t.associations.set(h,{materials:e}),r.extensions&&Ii(i,h,r),h})}createUniqueName(e){const t=st.sanitizeNodeName(e||"");return t in this.nodeNamesUsed?t+"_"+ ++this.nodeNamesUsed[t]:(this.nodeNamesUsed[t]=0,t)}loadGeometries(e){const t=this,n=this.extensions,i=this.primitiveCache;function r(o){return n[Ve.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(o,t).then(function(l){return Vd(l,o,t)})}const a=[];for(let o=0,l=e.length;o<l;o++){const c=e[o],d=Jx(c),h=i[d];if(h)a.push(h.promise);else{let u;c.extensions&&c.extensions[Ve.KHR_DRACO_MESH_COMPRESSION]?u=r(c):u=Vd(new Ct,c,t),c.mode===sn.TRIANGLE_STRIP?u=u.then(f=>Bd(f,yh)):c.mode===sn.TRIANGLE_FAN&&(u=u.then(f=>Bd(f,sl))),i[d]={primitive:c,promise:u},a.push(u)}}return Promise.all(a)}loadMesh(e){const t=this,n=this.json,i=this.extensions,r=n.meshes[e],a=r.primitives,o=[];for(let l=0,c=a.length;l<c;l++){const d=a[l].material===void 0?Kx(this.cache):this.getDependency("material",a[l].material);o.push(d)}return o.push(t.loadGeometries(a)),Promise.all(o).then(async function(l){const c=l.slice(0,l.length-1),d=l[l.length-1],h=[];for(let f=0,g=d.length;f<g;f++){const y=d[f],p=a[f];let m;const S=c[f];if(p.mode===sn.TRIANGLES||p.mode===sn.TRIANGLE_STRIP||p.mode===sn.TRIANGLE_FAN||p.mode===void 0){const T=r.isSkinnedMesh===!0,_=y.hasAttribute("skinIndex")&&y.hasAttribute("skinWeight");T&&_===!1&&console.warn("THREE.GLTFLoader: Missing skinIndex or skinWeight attributes. Skinning disabled."),m=T&&_?new Yf(y,S):new yt(y,S),m.isSkinnedMesh===!0&&m.normalizeSkinWeights()}else if(p.mode===sn.LINES)m=new ep(y,S);else if(p.mode===sn.LINE_STRIP)m=new Qs(y,S);else if(p.mode===sn.LINE_LOOP)m=new tp(y,S);else if(p.mode===sn.POINTS)m=new np(y,S);else throw new Error("THREE.GLTFLoader: Primitive mode unsupported: "+p.mode);Object.keys(m.geometry.morphAttributes).length>0&&Zx(m,r),m.name=t.createUniqueName(r.name||"mesh_"+e),Tn(m,r),p.extensions&&Ii(i,m,p),t.assignFinalMaterial(m),h.push(m)}for(let f=0,g=h.length;f<g;f++)t.associations.set(h[f],{meshes:e,primitives:f});if(h.length===1)return r.extensions&&Ii(i,h[0],r),h[0];const u=new Jn;r.extensions&&Ii(i,u,r),t.associations.set(u,{meshes:e});for(let f=0,g=h.length;f<g;f++)u.add(h[f]);return u})}loadCamera(e){let t;const n=this.json.cameras[e],i=n[n.type];if(!i){console.warn("THREE.GLTFLoader: Missing camera parameters.");return}return n.type==="perspective"?t=new Wt(Sh.radToDeg(i.yfov),i.aspectRatio||1,i.znear||1,i.zfar||2e6):n.type==="orthographic"&&(t=new fa(-i.xmag,i.xmag,i.ymag,-i.ymag,i.znear,i.zfar)),n.name&&(t.name=this.createUniqueName(n.name)),Tn(t,n),Promise.resolve(t)}loadSkin(e){const t=this.json.skins[e],n=[];for(let i=0,r=t.joints.length;i<r;i++)n.push(this._loadNodeShallow(t.joints[i]));return t.inverseBindMatrices!==void 0?n.push(this.getDependency("accessor",t.inverseBindMatrices)):n.push(null),Promise.all(n).then(function(i){const r=i.pop(),a=i,o=[],l=[];for(let c=0,d=a.length;c<d;c++){const h=a[c];if(h){o.push(h);const u=new Be;r!==null&&u.fromArray(r.array,c*16),l.push(u)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',t.joints[c])}return new Bl(o,l)})}loadAnimation(e){const t=this.json,n=this,i=t.animations[e],r=i.name?i.name:"animation_"+e,a=[],o=[],l=[],c=[],d=[];for(let h=0,u=i.channels.length;h<u;h++){const f=i.channels[h],g=i.samplers[f.sampler],y=f.target,p=y.node,m=i.parameters!==void 0?i.parameters[g.input]:g.input,S=i.parameters!==void 0?i.parameters[g.output]:g.output;y.node!==void 0&&(a.push(this.getDependency("node",p)),o.push(this.getDependency("accessor",m)),l.push(this.getDependency("accessor",S)),c.push(g),d.push(y))}return Promise.all([Promise.all(a),Promise.all(o),Promise.all(l),Promise.all(c),Promise.all(d)]).then(function(h){const u=h[0],f=h[1],g=h[2],y=h[3],p=h[4],m=[];for(let T=0,_=u.length;T<_;T++){const b=u[T],E=f[T],w=g[T],v=y[T],A=p[T];if(b===void 0)continue;b.updateMatrix&&b.updateMatrix();const C=n._createAnimationTracks(b,E,w,v,A);if(C)for(let L=0;L<C.length;L++)m.push(C[L])}const S=new Up(r,void 0,m);return Tn(S,i),S})}createNodeMesh(e){const t=this.json,n=this,i=t.nodes[e];return i.mesh===void 0?null:n.getDependency("mesh",i.mesh).then(function(r){const a=n._getNodeRef(n.meshCache,i.mesh,r);return i.weights!==void 0&&a.traverse(function(o){if(o.isMesh)for(let l=0,c=i.weights.length;l<c;l++)o.morphTargetInfluences[l]=i.weights[l]}),a})}loadNode(e){const t=this.json,n=this,i=t.nodes[e],r=n._loadNodeShallow(e),a=[],o=i.children||[];for(let c=0,d=o.length;c<d;c++)a.push(n.getDependency("node",o[c]));const l=i.skin===void 0?Promise.resolve(null):n.getDependency("skin",i.skin);return Promise.all([r,Promise.all(a),l]).then(function(c){const d=c[0],h=c[1],u=c[2];u!==null&&d.traverse(function(f){f.isSkinnedMesh&&f.bind(u,Qx)});for(let f=0,g=h.length;f<g;f++)d.add(h[f]);if(d.userData.pivot!==void 0&&h.length>0){const f=d.userData.pivot,g=h[0];d.pivot=new P().fromArray(f),d.position.x-=f[0],d.position.y-=f[1],d.position.z-=f[2],g.position.set(0,0,0),delete d.userData.pivot}return d})}_loadNodeShallow(e){const t=this.json,n=this.extensions,i=this;if(this.nodeCache[e]!==void 0)return this.nodeCache[e];const r=t.nodes[e],a=r.name?i.createUniqueName(r.name):"",o=[],l=i._invokeOne(function(c){return c.createNodeMesh&&c.createNodeMesh(e)});return l&&o.push(l),r.camera!==void 0&&o.push(i.getDependency("camera",r.camera).then(function(c){return i._getNodeRef(i.cameraCache,r.camera,c)})),i._invokeAll(function(c){return c.createNodeAttachment&&c.createNodeAttachment(e)}).forEach(function(c){o.push(c)}),this.nodeCache[e]=Promise.all(o).then(function(c){let d;if(r.isBone===!0?d=new Rh:c.length>1?d=new Jn:c.length===1?d=c[0]:d=new mt,d!==c[0])for(let h=0,u=c.length;h<u;h++)d.add(c[h]);if(r.name&&(d.userData.name=r.name,d.name=a),Tn(d,r),r.extensions&&Ii(n,d,r),r.matrix!==void 0){const h=new Be;h.fromArray(r.matrix),d.applyMatrix4(h)}else r.translation!==void 0&&d.position.fromArray(r.translation),r.rotation!==void 0&&d.quaternion.fromArray(r.rotation),r.scale!==void 0&&d.scale.fromArray(r.scale);if(!i.associations.has(d))i.associations.set(d,{});else if(r.mesh!==void 0&&i.meshCache.refs[r.mesh]>1){const h=i.associations.get(d);i.associations.set(d,{...h})}return i.associations.get(d).nodes=e,d}),this.nodeCache[e]}loadScene(e){const t=this.extensions,n=this.json.scenes[e],i=this,r=new Jn;n.name&&(r.name=i.createUniqueName(n.name)),Tn(r,n),n.extensions&&Ii(t,r,n);const a=n.nodes||[],o=[];for(let l=0,c=a.length;l<c;l++)o.push(i.getDependency("node",a[l]));return Promise.all(o).then(function(l){for(let d=0,h=l.length;d<h;d++){const u=l[d];u.parent!==null?r.add(Mx(u)):r.add(u)}const c=d=>{const h=new Map;for(const[u,f]of i.associations)(u instanceof Nn||u instanceof Ut)&&h.set(u,f);return d.traverse(u=>{const f=i.associations.get(u);f!=null&&h.set(u,f)}),h};return i.associations=c(r),r})}_createAnimationTracks(e,t,n,i,r){const a=[],o=e.name?e.name:e.uuid,l=[];function c(f){f.morphTargetInfluences&&l.push(f.name?f.name:f.uuid)}mi[r.path]===mi.weights?(c(e),e.isGroup&&e.children.forEach(c)):l.push(o);let d;switch(mi[r.path]){case mi.weights:d=tr;break;case mi.rotation:d=nr;break;case mi.translation:case mi.scale:d=aa;break;default:switch(n.itemSize){case 1:d=tr;break;case 2:case 3:default:d=aa;break}break}const h=i.interpolation!==void 0?qx[i.interpolation]:Zs,u=this._getArrayFromAccessor(n);for(let f=0,g=l.length;f<g;f++){const y=new d(l[f]+"."+mi[r.path],t.array,u,h);i.interpolation==="CUBICSPLINE"&&this._createCubicSplineTrackInterpolant(y),a.push(y)}return a}_getArrayFromAccessor(e){let t=e.array;if(e.normalized){const n=ul(t.constructor),i=new Float32Array(t.length);for(let r=0,a=t.length;r<a;r++)i[r]=t[r]*n;t=i}return t}_createCubicSplineTrackInterpolant(e){e.createInterpolant=function(n){const i=this instanceof nr?$x:Zh;return new i(this.times,this.values,this.getValueSize()/3,n)},e.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0}}function ty(s,e,t){const n=e.attributes,i=new ri;if(n.POSITION!==void 0){const o=t.json.accessors[n.POSITION],l=o.min,c=o.max;if(l!==void 0&&c!==void 0){if(i.set(new P(l[0],l[1],l[2]),new P(c[0],c[1],c[2])),o.normalized){const d=ul(hs[o.componentType]);i.min.multiplyScalar(d),i.max.multiplyScalar(d)}}else{console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");return}}else return;const r=e.targets;if(r!==void 0){const o=new P,l=new P;for(let c=0,d=r.length;c<d;c++){const h=r[c];if(h.POSITION!==void 0){const u=t.json.accessors[h.POSITION],f=u.min,g=u.max;if(f!==void 0&&g!==void 0){if(l.setX(Math.max(Math.abs(f[0]),Math.abs(g[0]))),l.setY(Math.max(Math.abs(f[1]),Math.abs(g[1]))),l.setZ(Math.max(Math.abs(f[2]),Math.abs(g[2]))),u.normalized){const y=ul(hs[u.componentType]);l.multiplyScalar(y)}o.max(l)}else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}i.expandByVector(o)}s.boundingBox=i;const a=new Hn;i.getCenter(a.center),a.radius=i.min.distanceTo(i.max)/2,s.boundingSphere=a}function Vd(s,e,t){const n=e.attributes,i=[];function r(a,o){return t.getDependency("accessor",a).then(function(l){s.setAttribute(o,l)})}for(const a in n){const o=hl[a]||a.toLowerCase();o in s.attributes||i.push(r(n[a],o))}if(e.indices!==void 0&&!s.index){const a=t.getDependency("accessor",e.indices).then(function(o){s.setIndex(o)});i.push(a)}return qe.workingColorSpace!==en&&"COLOR_0"in n&&console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${qe.workingColorSpace}" not supported.`),Tn(s,e),ty(s,e,t),Promise.all(i).then(function(){return e.targets!==void 0?Yx(s,e.targets,t):s})}const Wd=16645111,Xd=1317400,Br=4877149,ts=13135185,ny=2043197,$d=2590069,qd=14254635;class iy{constructor(e,t={}){he(this,"container");he(this,"scene");he(this,"camera");he(this,"renderer");he(this,"controls");he(this,"raycaster");he(this,"mouse");he(this,"bodyMeshGroup",null);he(this,"bodyMeshes",[]);he(this,"skinMeshes",[]);he(this,"muscleMeshes",[]);he(this,"tendonMeshes",[]);he(this,"skeletonMeshes",[]);he(this,"skinMaterial");he(this,"muscleMaterial");he(this,"tendonMaterial");he(this,"skeletonMaterial");he(this,"displayMode","anatomy");he(this,"anatomyBlend",1);he(this,"isXrayMode",!1);he(this,"pointsGroup");he(this,"linesGroup");he(this,"pointMeshesMap",new Map);he(this,"pointDataMap",new Map);he(this,"aliasToIdMap",new Map);he(this,"visibleMeridians",new Set(["herz","lunge"]));he(this,"selectedPointId",null);he(this,"hoveredPointId",null);he(this,"highlightedPointIds",new Set);he(this,"recommendedPointIds",new Set);he(this,"isBilateralMode",!1);he(this,"mirroredPointMeshesMap",new Map);he(this,"isCalibrationMode",!1);he(this,"lastCalibrationMarker",null);he(this,"tooltipEl");he(this,"loadingOverlayEl");he(this,"calibrationReadoutEl");he(this,"callbacks");he(this,"animationFrameId",null);he(this,"resizeObserver",null);he(this,"cameraTween",null);he(this,"sphereGeo");he(this,"haloRingMesh");this.container=e,this.callbacks=t,this.scene=new kf;const n=document.documentElement.getAttribute("data-theme")==="dark";this.scene.background=new Ie(n?Xd:Wd);const i=Math.max(e.clientWidth,320),r=Math.max(e.clientHeight,320);this.camera=new Wt(38,i/r,.01,50),this.camera.position.set(.18,.22,2.35),this.renderer=new ax({antialias:!0,powerPreference:"high-performance"}),this.renderer.setSize(i,r),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,2)),this.renderer.outputColorSpace=Nt,this.renderer.toneMapping=Sl,this.renderer.toneMappingExposure=1.08,this.container.appendChild(this.renderer.domElement),this.controls=new lx(this.camera,this.renderer.domElement),this.controls.enableDamping=!0,this.controls.dampingFactor=.065,this.controls.minDistance=.22,this.controls.maxDistance=3.8,this.controls.maxPolarAngle=Math.PI*.92,this.controls.target.set(.05,.12,0),this.controls.update(),this.setupLights(),this.setupGroundPedestal(),this.pointsGroup=new Jn,this.pointsGroup.name="AcupointsGroup",this.pointsGroup.renderOrder=5,this.linesGroup=new Jn,this.linesGroup.name="MeridianSplinesGroup",this.linesGroup.renderOrder=4,this.scene.add(this.linesGroup),this.scene.add(this.pointsGroup),this.skinMaterial=new Kt({color:new Ie(n?3886407:15459546),roughness:.48,metalness:.02,clearcoat:.12,clearcoatRoughness:.38,transparent:!0,opacity:.18,side:ni,depthWrite:!1}),this.muscleMaterial=new Kt({color:new Ie(11026998),roughness:.5,metalness:.02,clearcoat:.14,clearcoatRoughness:.34,transparent:!1,opacity:1,side:Xt,depthWrite:!0}),this.tendonMaterial=new Kt({color:new Ie(15130579),roughness:.28,metalness:.03,clearcoat:.25,clearcoatRoughness:.22,transparent:!1,opacity:1,side:Xt,depthWrite:!0}),this.skeletonMaterial=new Kt({color:new Ie(15722709),roughness:.42,metalness:.02,clearcoat:.08,clearcoatRoughness:.4,transparent:!1,opacity:1,side:Xt,depthWrite:!0}),this.sphereGeo=new Vl(.0072,20,20);const a=new sa(.01,.0145,32),o=new In({color:ts,side:Xt,transparent:!0,opacity:.85,depthTest:!1});this.haloRingMesh=new yt(a,o),this.haloRingMesh.visible=!1,this.haloRingMesh.renderOrder=999,this.scene.add(this.haloRingMesh),this.raycaster=new om,this.mouse=new _e(-999,-999),this.tooltipEl=this.createTooltipElement(),this.loadingOverlayEl=this.createLoadingOverlay(),this.calibrationReadoutEl=this.createCalibrationReadout(),this.bindEvents(),this.startAnimationLoop()}setupLights(){const e=new Vp(16776437,13227728,1.15);e.position.set(0,2.5,0),this.scene.add(e);const t=new $r(16775920,1.35);t.position.set(1.8,2.2,2.6),this.scene.add(t);const n=new $r(14413032,.75);n.position.set(-2,1,1.5),this.scene.add(n);const i=new $r(16115423,.65);i.position.set(.2,1.6,-2.5),this.scene.add(i)}setupGroundPedestal(){const e=new Hl(.42,48);e.rotateX(-Math.PI/2);const t=new In({color:Br,transparent:!0,opacity:.08}),n=new yt(e,t);n.position.y=-.903,this.scene.add(n);const i=new sa(.415,.425,64);i.rotateX(-Math.PI/2);const r=new In({color:ny,transparent:!0,opacity:.22,side:Xt}),a=new yt(i,r);a.position.y=-.902,this.scene.add(a)}createTooltipElement(){const e=document.createElement("div");return e.className="viewer3d-tooltip",e.style.display="none",this.container.appendChild(e),e}createLoadingOverlay(){const e=document.createElement("div");return e.className="viewer3d-loading-overlay",e.innerHTML=`
      <div class="viewer3d-spinner"></div>
      <div class="viewer3d-loading-text">Lade anatomisches 3D-Körpermodell…</div>
    `,this.container.appendChild(e),e}createCalibrationReadout(){const e=document.createElement("div");e.className="viewer3d-calibration-bar",e.style.display="none",e.innerHTML=`
      <div class="cal-info">
        <span class="cal-badge">🎯 3D-Kalibrierung aktiv</span>
        <span class="cal-coords" id="cal-coords-display">Klicken Sie auf die Körperoberfläche…</span>
      </div>
      <div class="cal-actions">
        <button type="button" class="cal-btn" id="cal-copy-btn" title="Aktuelle [x, y, z]-Koordinate kopieren">📋 Kopieren</button>
        <button type="button" class="cal-btn cal-btn-primary" id="cal-export-btn" title="Vollständige points_3d.json herunterladen">💾 JSON Export</button>
      </div>
    `,this.container.appendChild(e);const t=e.querySelector("#cal-copy-btn"),n=e.querySelector("#cal-export-btn");return t&&t.addEventListener("click",i=>{var a;i.stopPropagation();const r=e.dataset.lastCoords||"";r&&((a=navigator.clipboard)==null||a.writeText(r),t.textContent="✓ Kopiert!",setTimeout(()=>{t.textContent="📋 Kopieren"},1500))}),n&&n.addEventListener("click",i=>{i.stopPropagation(),this.exportPoints3DJson()}),e}async loadModel(e="models/human_body.glb"){this.loadingOverlayEl.style.display="flex";const t=new bx;return new Promise((n,i)=>{t.load(e,r=>{this.bodyMeshGroup&&this.scene.remove(this.bodyMeshGroup),this.bodyMeshes=[],this.skinMeshes=[],this.muscleMeshes=[],this.tendonMeshes=[],this.skeletonMeshes=[],this.bodyMeshGroup=r.scene,this.bodyMeshGroup.traverse(a=>{var o;if(a.isMesh){const l=a;l.geometry.attributes.normal||l.geometry.computeVertexNormals(),l.castShadow=!1,l.receiveShadow=!1,this.bodyMeshes.push(l);const c=(l.name||((o=a.parent)==null?void 0:o.name)||"").toLowerCase();c.includes("muscle")?(l.material=this.muscleMaterial,this.muscleMeshes.push(l)):c.includes("tendon")?(l.material=this.tendonMaterial,this.tendonMeshes.push(l)):c.includes("skeleton")?(l.material=this.skeletonMaterial,this.skeletonMeshes.push(l)):(l.material=this.skinMaterial,this.skinMeshes.push(l))}}),this.applyDisplayMode(),this.scene.add(this.bodyMeshGroup),this.loadingOverlayEl.style.display="none",this.handleResize(),n()},r=>{if(r.total>0){const a=Math.round(r.loaded/r.total*100),o=this.loadingOverlayEl.querySelector(".viewer3d-loading-text");o&&(o.textContent=`Lade anatomisches 3D-Körpermodell… (${a}%)`)}},r=>{console.error("Error loading 3D human body model:",r);const a=this.loadingOverlayEl.querySelector(".viewer3d-loading-text");a&&(a.textContent="Fehler beim Laden des 3D-Modells."),i(r)})})}async loadPointsData(e="data/points_3d.json"){const t=await fetch(e);if(!t.ok)throw new Error(`Failed to fetch ${e}: ${t.status}`);const n=await t.json(),i=localStorage.getItem("similapunktur_points_3d_overrides_bp3d_v2");let r={};if(i)try{r=JSON.parse(i)}catch{r={}}return this.pointDataMap.clear(),this.aliasToIdMap.clear(),n.points.forEach(a=>{r[a.id]&&(a.position=r[a.id]),this.pointDataMap.set(a.id,a),this.aliasToIdMap.set(a.id.toUpperCase(),a.id),a.aliases&&a.aliases.forEach(o=>{this.aliasToIdMap.set(o.toUpperCase().replace(/\s+/g,"_"),a.id),this.aliasToIdMap.set(o.toUpperCase(),a.id)})}),this.rebuildPointsAndSplines(),Array.from(this.pointDataMap.values())}resolvePointId(e){if(this.pointDataMap.has(e))return e;const t=e.toUpperCase().trim();return this.aliasToIdMap.get(t)||this.aliasToIdMap.get(t.replace(/\s+/g,"_"))||null}getPointData(e){const t=this.resolvePointId(e);return t?this.pointDataMap.get(t):void 0}getAllPoints(){return Array.from(this.pointDataMap.values())}setVisibleMeridians(e){this.visibleMeridians=new Set(e),this.rebuildPointsAndSplines()}toggleMeridian(e,t){const n=t!==void 0?t:!this.visibleMeridians.has(e);return n?this.visibleMeridians.add(e):this.visibleMeridians.delete(e),this.rebuildPointsAndSplines(),n}getVisibleMeridians(){return Array.from(this.visibleMeridians)}getActiveMaterial(){return this.displayMode==="skeleton"?this.skeletonMaterial:this.displayMode==="clinical"?this.skinMaterial:this.muscleMaterial}setDisplayMode(e){this.displayMode=e,this.applyDisplayMode()}getDisplayMode(){return this.displayMode}setAnatomyBlend(e){this.anatomyBlend=Math.max(0,Math.min(1,e)),this.displayMode!=="clinical"&&(this.muscleMaterial.opacity=.25+.75*this.anatomyBlend,this.muscleMaterial.transparent=this.anatomyBlend<.99,this.muscleMaterial.needsUpdate=!0)}applyDisplayMode(){this.isXrayMode=this.displayMode==="xray",this.displayMode==="anatomy"?(this.skeletonMaterial.transparent=!1,this.skeletonMaterial.opacity=1,this.skeletonMaterial.depthWrite=!0,this.skeletonMaterial.needsUpdate=!0,this.muscleMaterial.transparent=!1,this.muscleMaterial.opacity=1,this.muscleMaterial.depthWrite=!0,this.muscleMaterial.needsUpdate=!0,this.tendonMaterial.transparent=!1,this.tendonMaterial.opacity=1,this.tendonMaterial.depthWrite=!0,this.tendonMaterial.needsUpdate=!0,this.skinMaterial.transparent=!0,this.skinMaterial.opacity=.18,this.skinMaterial.depthWrite=!1,this.skinMaterial.needsUpdate=!0,this.skeletonMeshes.forEach(e=>{e.visible=!0,e.renderOrder=0}),this.muscleMeshes.forEach(e=>{e.visible=!0,e.renderOrder=0}),this.tendonMeshes.forEach(e=>{e.visible=!0,e.renderOrder=0}),this.skinMeshes.forEach(e=>{e.visible=!0,e.renderOrder=2})):this.displayMode==="skeleton"?(this.skeletonMaterial.transparent=!1,this.skeletonMaterial.opacity=1,this.skeletonMaterial.depthWrite=!0,this.skeletonMaterial.needsUpdate=!0,this.skinMaterial.transparent=!0,this.skinMaterial.opacity=.24,this.skinMaterial.depthWrite=!1,this.skinMaterial.needsUpdate=!0,this.skeletonMeshes.forEach(e=>{e.visible=!0,e.renderOrder=0}),this.muscleMeshes.forEach(e=>{e.visible=!1}),this.tendonMeshes.forEach(e=>{e.visible=!1}),this.skinMeshes.forEach(e=>{e.visible=!0,e.renderOrder=2})):this.displayMode==="clinical"?(this.skinMaterial.transparent=!0,this.skinMaterial.opacity=.96,this.skinMaterial.depthWrite=!0,this.skinMaterial.needsUpdate=!0,this.skeletonMeshes.forEach(e=>{e.visible=!1}),this.muscleMeshes.forEach(e=>{e.visible=!1}),this.tendonMeshes.forEach(e=>{e.visible=!1}),this.skinMeshes.forEach(e=>{e.visible=!0,e.renderOrder=0})):this.displayMode==="xray"&&(this.skeletonMaterial.transparent=!0,this.skeletonMaterial.opacity=.88,this.skeletonMaterial.depthWrite=!0,this.skeletonMaterial.needsUpdate=!0,this.muscleMaterial.transparent=!0,this.muscleMaterial.opacity=.34,this.muscleMaterial.depthWrite=!1,this.muscleMaterial.needsUpdate=!0,this.tendonMaterial.transparent=!0,this.tendonMaterial.opacity=.38,this.tendonMaterial.depthWrite=!1,this.tendonMaterial.needsUpdate=!0,this.skinMaterial.transparent=!0,this.skinMaterial.opacity=.22,this.skinMaterial.depthWrite=!1,this.skinMaterial.needsUpdate=!0,this.skeletonMeshes.forEach(e=>{e.visible=!0,e.renderOrder=0}),this.muscleMeshes.forEach(e=>{e.visible=!0,e.renderOrder=1}),this.tendonMeshes.forEach(e=>{e.visible=!0,e.renderOrder=1}),this.skinMeshes.forEach(e=>{e.visible=!0,e.renderOrder=2}))}setBilateralMode(e){this.isBilateralMode!==e&&(this.isBilateralMode=e,this.rebuildPointsAndSplines())}isBilateral(){return this.isBilateralMode}toggleBilateral(){return this.setBilateralMode(!this.isBilateralMode),this.isBilateralMode}isBilateralMeridian(e){return e!=="konzeptionsgefaess"&&e!=="lenkergefaess"}setXrayTransparency(e){const t=e!==void 0?e:this.displayMode!=="xray";return t?this.setDisplayMode("xray"):this.setDisplayMode("anatomy"),t}isXray(){return this.isXrayMode}setTheme(e){const t=e==="dark";this.scene.background=new Ie(t?Xd:Wd),this.skinMaterial.color.setHex(t?3886407:15459546),this.skinMaterial.needsUpdate=!0,this.displayMode==="clinical"&&this.applyDisplayMode()}setCalibrationMode(e){this.isCalibrationMode=e,this.calibrationReadoutEl.style.display=e?"flex":"none",this.renderer.domElement.style.cursor=e?"crosshair":"grab",!e&&this.lastCalibrationMarker&&(this.scene.remove(this.lastCalibrationMarker),this.lastCalibrationMarker=null)}isCalibrationActive(){return this.isCalibrationMode}setHighlightedPoints(e,t){this.highlightedPointIds=new Set(e),this.recommendedPointIds=new Set(t),this.updatePointVisualStates()}selectPoint(e,t=!0){const n=e?this.resolvePointId(e):null;if(this.selectedPointId=n,n){const i=this.pointDataMap.get(n);i&&!this.visibleMeridians.has(i.meridian_id)&&(this.visibleMeridians.add(i.meridian_id),this.rebuildPointsAndSplines()),i&&t&&this.flyToPoint(i)}else this.haloRingMesh.visible=!1;this.updatePointVisualStates()}focusCameraPreset(e){const t=this.camera.position.clone(),n=this.controls.target.clone();let i=new P(0,.08,2.45),r=new P(0,0,0);e==="pilot_arm"?(i=new P(.28,.16,.85),r=new P(.21,.18,.01)):e==="head_chest"?(i=new P(0,.56,.92),r=new P(0,.52,.02)):e==="back"&&(i=new P(0,.15,-2.15),r=new P(0,.12,0)),this.cameraTween={active:!0,startTime:performance.now(),duration:650,startPos:t,endPos:i,startTarget:n,endTarget:r}}flyToPoint(e){const t=new P(e.position[0],e.position[1],e.position[2]),i=(e.normal?new P(e.normal[0],e.normal[1],e.normal[2]).normalize():new P(0,0,1)).clone();i.y=Math.max(-.15,Math.min(.45,i.y)),Math.abs(i.z)<.35&&Math.abs(i.x)>.5&&(i.z+=.65),i.normalize();const a=t.clone().addScaledVector(i,.58);this.cameraTween={active:!0,startTime:performance.now(),duration:680,startPos:this.camera.position.clone(),endPos:a,startTarget:this.controls.target.clone(),endTarget:t}}sortMeridianPointsForSpline(e){return e.filter(n=>!n.id.endsWith("_MANN")).sort((n,i)=>{const r=parseInt(n.id.split("_")[1]||"0",10),a=parseInt(i.id.split("_")[1]||"0",10);return r-a})}rebuildPointsAndSplines(){for(;this.pointsGroup.children.length>0;){const t=this.pointsGroup.children[0];t.material&&t.material.dispose(),this.pointsGroup.remove(t)}for(this.pointMeshesMap.clear(),this.mirroredPointMeshesMap.clear();this.linesGroup.children.length>0;){const t=this.linesGroup.children[0];t.geometry&&t.geometry.dispose(),t.material&&t.material.dispose(),this.linesGroup.remove(t)}const e=new Map;this.pointDataMap.forEach(t=>{if(!this.visibleMeridians.has(t.meridian_id))return;const n=new ds({color:Br,emissive:$d,emissiveIntensity:.28,roughness:.25,metalness:.1}),i=new yt(this.sphereGeo,n);if(i.position.set(t.position[0],t.position[1],t.position[2]),i.userData={pointId:t.id},this.pointsGroup.add(i),this.pointMeshesMap.set(t.id,i),this.isBilateralMode&&this.isBilateralMeridian(t.meridian_id)){const r=n.clone(),a=new yt(this.sphereGeo,r);a.position.set(-t.position[0],t.position[1],t.position[2]),a.userData={pointId:t.id,isMirrored:!0},this.pointsGroup.add(a),this.mirroredPointMeshesMap.set(t.id,a)}e.has(t.meridian_id)||e.set(t.meridian_id,[]),e.get(t.meridian_id).push(t)}),e.forEach((t,n)=>{const i=this.sortMeridianPointsForSpline(t);if(i.length<2)return;const r=i.map(m=>{const S=new P(m.position[0],m.position[1],m.position[2]);return m.normal&&S.addScaledVector(new P(m.normal[0],m.normal[1],m.normal[2]),.0012),S}),a=new ol(r,!1,"centripetal",.35),o=Math.max(i.length*16,48),l=a.getPoints(o),d=n==="herz"?ts:Br,h=new ra(a,o,.0018,8,!1),u=new ds({color:d,emissive:d,emissiveIntensity:.22,roughness:.35,transparent:!0,opacity:.88}),f=new yt(h,u);this.linesGroup.add(f);const g=new Ct().setFromPoints(l),y=new zl({color:d,transparent:!0,opacity:.95}),p=new Qs(g,y);if(this.linesGroup.add(p),this.isBilateralMode&&this.isBilateralMeridian(n)){const m=i.map(C=>{const L=new P(-C.position[0],C.position[1],C.position[2]);return C.normal&&L.addScaledVector(new P(-C.normal[0],C.normal[1],C.normal[2]),.0012),L}),S=new ol(m,!1,"centripetal",.35),T=S.getPoints(o),_=new ra(S,o,.0018,8,!1),b=u.clone(),E=new yt(_,b);this.linesGroup.add(E);const w=new Ct().setFromPoints(T),v=y.clone(),A=new Qs(w,v);this.linesGroup.add(A)}}),this.updatePointVisualStates()}updatePointVisualStates(){const e=this.highlightedPointIds.size>0||this.recommendedPointIds.size>0;this.pointMeshesMap.forEach((n,i)=>{const r=n.material,a=i===this.selectedPointId,o=i===this.hoveredPointId,l=this.recommendedPointIds.has(i),c=this.highlightedPointIds.has(i);if(a||o){r.color.setHex(ts),r.emissive.setHex(ts),r.emissiveIntensity=a?.65:.5,r.opacity=1,r.transparent=!1;const d=a?1.55:1.38;n.scale.set(d,d,d)}else l||c?(r.color.setHex(qd),r.emissive.setHex(qd),r.emissiveIntensity=.55,r.opacity=1,r.transparent=!1,n.scale.set(1.35,1.35,1.35)):(r.color.setHex(Br),r.emissive.setHex($d),r.emissiveIntensity=.25,e?(r.transparent=!0,r.opacity=.42):(r.transparent=!1,r.opacity=1),n.scale.set(1,1,1));r.needsUpdate=!0}),this.mirroredPointMeshesMap.forEach((n,i)=>{const r=this.pointMeshesMap.get(i);if(r){const a=r.material,o=n.material;o.color.copy(a.color),o.emissive.copy(a.emissive),o.emissiveIntensity=a.emissiveIntensity,o.opacity=a.opacity,o.transparent=a.transparent,n.scale.copy(r.scale),o.needsUpdate=!0}});const t=this.selectedPointId||this.hoveredPointId;if(t&&this.pointMeshesMap.has(t)){const n=this.pointMeshesMap.get(t);this.haloRingMesh.position.copy(n.position),this.haloRingMesh.lookAt(this.camera.position),this.haloRingMesh.visible=!0}else this.haloRingMesh.visible=!1}bindEvents(){const e=this.renderer.domElement;let t={x:0,y:0};e.addEventListener("pointerdown",n=>{t={x:n.clientX,y:n.clientY}}),e.addEventListener("pointermove",n=>{const i=e.getBoundingClientRect();this.mouse.x=(n.clientX-i.left)/i.width*2-1,this.mouse.y=-((n.clientY-i.top)/i.height)*2+1,this.handleHoverRaycast(n.clientX-i.left,n.clientY-i.top)}),e.addEventListener("pointerleave",()=>{this.hoveredPointId=null,this.tooltipEl.style.display="none",this.updatePointVisualStates()}),e.addEventListener("pointerup",n=>{const i=n.clientX-t.x,r=n.clientY-t.y;if(Math.hypot(i,r)>5)return;const a=e.getBoundingClientRect();this.mouse.x=(n.clientX-a.left)/a.width*2-1,this.mouse.y=-((n.clientY-a.top)/a.height)*2+1,this.handleClickRaycast()}),this.resizeObserver=new ResizeObserver(()=>{this.handleResize()}),this.resizeObserver.observe(this.container),window.addEventListener("resize",()=>this.handleResize())}handleHoverRaycast(e,t){this.raycaster.setFromCamera(this.mouse,this.camera);const n=[...Array.from(this.pointMeshesMap.values()),...Array.from(this.mirroredPointMeshesMap.values())],i=this.raycaster.intersectObjects(n,!1);if(i.length>0){const a=i[0].object.userData.pointId,o=this.pointDataMap.get(a);if(o){this.hoveredPointId!==a&&(this.hoveredPointId=a,this.updatePointVisualStates()),this.renderer.domElement.style.cursor="pointer";const l=o.translation?` – ${o.translation}`:"",c=o.id.replace("_"," ");this.tooltipEl.innerHTML=`
          <div class="v3d-tt-header">
            <span class="v3d-tt-code">${c}</span>
            <span class="v3d-tt-meridian">${o.meridian}</span>
          </div>
          <div class="v3d-tt-title">${o.name_de}${l}</div>
        `,this.tooltipEl.style.display="block",this.tooltipEl.style.left=`${Math.min(e+14,this.container.clientWidth-230)}px`,this.tooltipEl.style.top=`${Math.max(t-12,10)}px`;return}}this.hoveredPointId!==null&&(this.hoveredPointId=null,this.updatePointVisualStates()),this.tooltipEl.style.display="none",this.renderer.domElement.style.cursor=this.isCalibrationMode?"crosshair":"grab"}handleClickRaycast(){this.raycaster.setFromCamera(this.mouse,this.camera);const e=[...Array.from(this.pointMeshesMap.values()),...Array.from(this.mirroredPointMeshesMap.values())],t=this.raycaster.intersectObjects(e,!1);if(t.length>0&&!this.isCalibrationMode){const i=t[0].object,r=i.userData.pointId,a=this.pointDataMap.get(r);if(a){if(i.userData.isMirrored){const o={...a,position:[-a.position[0],a.position[1],a.position[2]],normal:a.normal?[-a.normal[0],a.normal[1],a.normal[2]]:void 0};this.selectedPointId=r,this.updatePointVisualStates(),this.flyToPoint(o),this.callbacks.onPointClick&&this.callbacks.onPointClick(r,o)}else this.selectPoint(r,!0),this.callbacks.onPointClick&&this.callbacks.onPointClick(r,a);return}}const n=this.skinMeshes.length>0?this.skinMeshes:this.bodyMeshes;if(this.isCalibrationMode&&n.length>0){const i=this.raycaster.intersectObjects(n,!0);if(i.length>0){const r=i[0],a=r.face?r.face.normal.clone().transformDirection(r.object.matrixWorld).normalize():new P(0,0,1),o=r.point.clone().addScaledVector(a,.0022),l=[Number(o.x.toFixed(4)),Number(o.y.toFixed(4)),Number(o.z.toFixed(4))],c=[Number(a.x.toFixed(4)),Number(a.y.toFixed(4)),Number(a.z.toFixed(4))],d=this.selectedPointId||"UNASSIGNED_POINT";console.log(`🎯 [Similapunktur 3D-Editor] Punkt: ${d} | Position [x, y, z]:`,l,"| Normal:",c,`
JSON: "${d}": { "position": [${l.join(", ")}], "normal": [${c.join(", ")}] }`);const h=this.calibrationReadoutEl.querySelector("#cal-coords-display"),u=`[${l[0]}, ${l[1]}, ${l[2]}]`;if(this.calibrationReadoutEl.dataset.lastCoords=u,h&&(h.textContent=`${this.selectedPointId?this.selectedPointId+" → ":""}${u}`),this.selectedPointId&&this.pointDataMap.has(this.selectedPointId)){const f=this.pointDataMap.get(this.selectedPointId);f.position=l,f.normal=c,this.saveCalibrationOverride(this.selectedPointId,l),this.rebuildPointsAndSplines()}else{if(!this.lastCalibrationMarker){const f=new ds({color:ts,emissive:ts,emissiveIntensity:.6});this.lastCalibrationMarker=new yt(this.sphereGeo,f),this.lastCalibrationMarker.scale.set(1.4,1.4,1.4),this.scene.add(this.lastCalibrationMarker)}this.lastCalibrationMarker.position.set(l[0],l[1],l[2])}this.callbacks.onPointCalibrate&&this.callbacks.onPointCalibrate(this.selectedPointId,l,c)}}}saveCalibrationOverride(e,t){const n=localStorage.getItem("similapunktur_points_3d_overrides_bp3d_v2");let i={};if(n)try{i=JSON.parse(n)}catch{i={}}i[e]=t,localStorage.setItem("similapunktur_points_3d_overrides_bp3d_v2",JSON.stringify(i)),fetch("/api/update-point-3d-coordinate",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({point_id:e,position:t})}).catch(()=>{})}exportPoints3DJson(){const e={version:"1.0.0",model:"models/human_body.glb",coordinate_system:"Three.js Right-Handed (+X anatomical left / viewer right, +Y up, +Z anterior / front)",pilot_meridians:["Herz-Leitbahn","Lungen-Leitbahn"],points:Array.from(this.pointDataMap.values())},t=new Blob([JSON.stringify(e,null,2)],{type:"application/json"}),n=URL.createObjectURL(t),i=document.createElement("a");i.href=n,i.download="points_3d.json",i.click(),URL.revokeObjectURL(n)}handleResize(){const e=this.container.clientWidth,t=this.container.clientHeight;e<=0||t<=0||(this.camera.aspect=e/t,this.camera.updateProjectionMatrix(),this.renderer.setSize(e,t))}startAnimationLoop(){const e=t=>{if(this.animationFrameId=requestAnimationFrame(e),this.cameraTween&&this.cameraTween.active){const n=t-this.cameraTween.startTime,i=Math.min(1,n/this.cameraTween.duration),r=1-Math.pow(1-i,3);this.camera.position.lerpVectors(this.cameraTween.startPos,this.cameraTween.endPos,r),this.controls.target.lerpVectors(this.cameraTween.startTarget,this.cameraTween.endTarget,r),i>=1&&(this.cameraTween.active=!1)}if(this.haloRingMesh.visible){this.haloRingMesh.lookAt(this.camera.position);const n=1+.14*Math.sin(t*.005);this.haloRingMesh.scale.set(n,n,1)}this.controls.update(),this.renderer.render(this.scene,this.camera)};this.animationFrameId=requestAnimationFrame(e)}dispose(){this.animationFrameId!==null&&cancelAnimationFrame(this.animationFrameId),this.resizeObserver&&this.resizeObserver.disconnect(),this.renderer.dispose()}}function sy({container:s,selectedSymptoms:e,allPointsData:t,staticTtbData:n=null,staticBoerickeRepData:i=null,rubricsRemediesMap:r=new Map,activeModalities:a=new Set,remedyContraindications:o=new Map,useExponentialScoring:l=!0,onRemedyClick:c}){if(e.length===0){s.innerHTML="<p class='dimmed' style='padding: 24px;'>Keine Symptome im Fall vorhanden.</p>";return}const d=new Map;i!=null&&i.rubrics&&i.rubrics.forEach(p=>{d.set(p.full_path.toLowerCase().trim(),p.remedies)});const h=new Map;e.forEach(p=>{const m=p.text.startsWith("[TTB] "),S=p.text.startsWith("[Boericke] "),T=m?p.text.substring(6).toLowerCase().trim():S?p.text.substring(11).toLowerCase().trim():p.text.toLowerCase().trim();if(S){const _=d.get(T);_&&_.forEach(b=>{const E=b.name.replace(/\.$/,"");h.has(E)||h.set(E,{matches:new Set,score:0,grades:{}});const w=h.get(E);if(!w.matches.has(p.id)){w.matches.add(p.id);const v=l?b.grade*b.grade:b.grade;w.score+=v*p.weight}w.grades[p.id]=Math.max(w.grades[p.id]||0,b.grade)})}else if(m){if(n){const b=Object.keys(n).find(E=>E.toLowerCase().trim()===T);b&&n[b].forEach(w=>{const v=w.name.replace(/\.$/,"");h.has(v)||h.set(v,{matches:new Set,score:0,grades:{}});const A=h.get(v);if(!A.matches.has(p.id)){A.matches.add(p.id);const C=l?w.grade*w.grade:w.grade;A.score+=C*p.weight}A.grades[p.id]=Math.max(A.grades[p.id]||0,w.grade)})}}else t.forEach(_=>{_.general_analysis_rubrics&&_.general_analysis_rubrics.forEach(E=>{E.rubric_name.toLowerCase().includes(T)&&E.remedies.forEach(w=>{h.has(w.name)||h.set(w.name,{matches:new Set,score:0,grades:{}});const v=h.get(w.name);if(!v.matches.has(p.id)){v.matches.add(p.id);const A=l?w.grade*w.grade:w.grade;v.score+=A*p.weight}v.grades[p.id]=Math.max(v.grades[p.id]||0,w.grade)})}),(_.effects&&_.effects.some(E=>E.toLowerCase().includes(T))||_.indications&&_.indications.some(E=>E.toLowerCase().includes(T)))&&_.assigned_homeopathics&&_.assigned_homeopathics.forEach(E=>{h.has(E)||h.set(E,{matches:new Set,score:0,grades:{}});const w=h.get(E);if(!w.matches.has(p.id)){w.matches.add(p.id);const v=l?9:3;w.score+=v*p.weight}w.grades[p.id]=Math.max(w.grades[p.id]||0,3)})})});const u=[];h.forEach((p,m)=>{let S=0;const T={};a.forEach(_=>{const b=r.get(_);if(b){const E=b.get(m);if(E){const w=l?E*E*2:E*2;S+=w,T[_]=E}}}),u.push({name:m,matchesCount:p.matches.size,score:p.score+S,grades:p.grades,modalityGrades:T})}),u.sort((p,m)=>m.matchesCount!==p.matchesCount?m.matchesCount-p.matchesCount:m.score-p.score);const f=u.slice(0,30);let g='<table class="matrix-table">';g+='<thead><tr><th class="remedy-col-header">Heilmittel</th>',e.forEach(p=>{const m=p.text.startsWith("[TTB] "),S=p.text.startsWith("[Boericke] "),T=m?p.text.substring(6):S?p.text.substring(11):p.text;g+=`<th class="${m?"symptom-header ttb-symptom-header":"symptom-header"}" data-symptom-id="${p.id}"><span>${T} <small class="dimmed" style="font-weight: normal;">(x${p.weight})</small></span></th>`}),a.forEach(p=>{let m=p.replace(", Agg.","").replace("Teils, wie Kopf, Hände, usw. in kaltem Wasser, usw. Agg.","Kaltes Wasser").replace("Wasser feuchte Räume, usw. Agg.","Feuchtigkeit").replace("Überhitzung, usw. Agg.","Überhitzung").trim();m.length>20&&(m=m.substring(0,18)+"..."),g+=`<th class="symptom-header modality-header" title="${p}"><span>⚡ ${m}</span></th>`}),g+='<th class="total-header">Treffer</th>',g+='<th class="total-header">Score</th>',g+="</tr></thead>",g+="<tbody>",f.forEach(p=>{g+=`<tr data-remedy="${p.name}">`;const m=o.has(p.name),S=m?"remedy-cell contraindicated":"remedy-cell";let T="";m&&(T=`<span class="contraindicated-badge" title="Polaritäts-Widerspruch: ${Array.from(o.get(p.name)).join(", ")}">⚠️</span>`),g+=`<td class="${S}">${p.name}${T}</td>`,e.forEach(_=>{const b=p.grades[_.id]||0;let E="";b===3?E=`<span class="matrix-badge grade-3" title="${p.name}: Grad 3 für '${_.text}'"></span>`:b===2?E=`<span class="matrix-badge grade-2" title="${p.name}: Grad 2 für '${_.text}'"></span>`:b===1&&(E=`<span class="matrix-badge grade-1" title="${p.name}: Grad 1 für '${_.text}'"></span>`),g+=`<td class="matrix-cell" data-symptom-id="${_.id}"><div class="matrix-badge-wrapper">${E}</div></td>`}),a.forEach(_=>{const b=p.modalityGrades[_]||0;let E="";b===3?E=`<span class="matrix-badge grade-3" title="${p.name}: Grad 3 für '${_}'"></span>`:b===2?E=`<span class="matrix-badge grade-2" title="${p.name}: Grad 2 für '${_}'"></span>`:b===1&&(E=`<span class="matrix-badge grade-1" title="${p.name}: Grad 1 für '${_}'"></span>`),g+=`<td class="${b?"matrix-cell modality-cell-active":"matrix-cell"}"><div class="matrix-badge-wrapper">${E}</div></td>`}),g+=`<td class="total-cell">${p.matchesCount}</td>`,g+=`<td class="total-cell font-bold">${p.score}</td>`,g+="</tr>"}),g+="</tbody></table>",s.innerHTML=g;const y=s.querySelector(".matrix-table");y&&(y.querySelectorAll("[data-symptom-id]").forEach(m=>{const S=m,T=S.dataset.symptomId;T&&(S.addEventListener("mouseenter",()=>{y.querySelectorAll(`[data-symptom-id="${T}"]`).forEach(_=>{_.classList.add("col-highlight")})}),S.addEventListener("mouseleave",()=>{y.querySelectorAll(`[data-symptom-id="${T}"]`).forEach(_=>{_.classList.remove("col-highlight")})}))}),y.querySelectorAll(".remedy-cell").forEach(m=>{var _;const S=m,T=(((_=S.childNodes[0])==null?void 0:_.textContent)||S.textContent||"").trim();T&&c&&S.addEventListener("click",()=>{c(T)})}))}function ry({allPointsData:s,staticBoerickeData:e,staticTtbData:t,getPointSynonym:n}){const i=document.getElementById("dev-points-tbody");i&&(i.innerHTML="",s.forEach(o=>{const l=document.createElement("tr");l.style.borderBottom="1px solid var(--color-border)";const c=o.effects?o.effects.join(", "):"",d=o.indications?o.indications.join(", "):"",h=o.general_analysis_rubrics?o.general_analysis_rubrics.length:0,u=o.assigned_homeopathics?o.assigned_homeopathics.length:0;let f="";o.general_analysis_rubrics&&o.general_analysis_rubrics.length>0?f=o.general_analysis_rubrics.map(y=>{const p=y.remedies?y.remedies.map(m=>`${m.name} (Grad ${m.grade})`).join(", "):"Keine Heilmittel";return`
            <div style="margin-bottom: 6px; padding-left: 8px; border-left: 2px solid rgba(39, 133, 117, 0.3);">
              <span style="color: var(--color-secondary-teal); font-weight: 700;">${y.rubric_name}:</span>
              <span style="color: var(--color-text-dark);">${p}</span>
            </div>
          `}).join(""):f='<div style="font-style: italic; color: var(--color-text-muted);">Keine Allgemein-Analyse-Rubriken</div>';const g=o.assigned_homeopathics&&o.assigned_homeopathics.length>0?o.assigned_homeopathics.join(", "):"<i>Keine direkten Heilmittel zugeordnet</i>";l.innerHTML=`
        <td style="padding: 10px 14px; font-weight: 700; color: var(--color-primary-teal);">${n(o.point_id)}</td>
        <td style="padding: 10px 14px;">${o.meridian}</td>
        <td style="padding: 10px 14px; font-weight: 700;">${o.name_german}</td>
        <td style="padding: 10px 14px; font-style: italic;">${o.name_chinese||""}</td>
        <td style="padding: 10px 14px; max-width: 250px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;" title="${c}">${c}</td>
        <td style="padding: 10px 14px; max-width: 250px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;" title="${d}">${d}</td>
        <td style="padding: 10px 14px;">
          <details class="dev-rubrics-details" style="outline: none;">
            <summary style="cursor: pointer; color: var(--color-primary-teal); font-weight: 700; font-size: 13px; user-select: none; display: flex; align-items: center; gap: 4px;">
              <span>📊 ${h} Rubriken / ${u} Direkt-Mittel</span>
            </summary>
            <div class="dev-rubrics-content" style="margin-top: 8px; font-size: 12px; line-height: 1.5; padding: 10px; background-color: var(--color-bg-light-gray); border-radius: 6px; border-left: 3px solid var(--color-primary-teal); max-width: 450px; white-space: normal;">
              <div style="margin-bottom: 8px;">
                <strong style="color: var(--color-deep-navy); display: block; font-size: 11px; text-transform: uppercase; margin-bottom: 2px;">Direkte Zuordnung (Phase 1):</strong>
                <span style="color: var(--color-text-dark);">${g}</span>
              </div>
              <div>
                <strong style="color: var(--color-deep-navy); display: block; font-size: 11px; text-transform: uppercase; margin-bottom: 4px;">Rubriken-Hierarchie (Phase 4):</strong>
                ${f}
              </div>
            </div>
          </details>
        </td>
      `,i.appendChild(l)}));const r=document.getElementById("dev-remedies-tbody");if(r){r.innerHTML="";const o=new Set;s.forEach(c=>{c.assigned_homeopathics&&c.assigned_homeopathics.forEach(d=>o.add(d.trim())),c.general_analysis_rubrics&&c.general_analysis_rubrics.forEach(d=>{d.remedies&&d.remedies.forEach(h=>o.add(h.name.replace(/\.$/,"").trim()))})}),Array.from(o).sort().forEach(c=>{const d=document.createElement("tr");d.style.borderBottom="1px solid var(--color-border)";let h="",u="❌ Kein Text vorhanden";if(e&&e[c]){const f=e[c];h=f.full_name||"",u=f.overview?`✔️ Text vorhanden (${f.overview.substring(0,80)}...)`:"❌ Kein Text"}else u="❌ Text noch nicht geladen (oder fehlt)";d.innerHTML=`
        <td style="padding: 10px 14px; font-weight: 700; color: var(--color-secondary-teal);">${c}</td>
        <td style="padding: 10px 14px; font-style: italic;">${h}</td>
        <td style="padding: 10px 14px; color: var(--color-text-muted);">${u}</td>
      `,r.appendChild(d)})}const a=document.getElementById("dev-ttb-tbody");a&&(a.innerHTML="",t?Object.keys(t).sort().forEach(o=>{const l=document.createElement("tr");l.style.borderBottom="1px solid var(--color-border)";const c=t[o],d=c.length,h=c.map(u=>`${u.name} (Grad ${u.grade}${u.guernsey?"*":""})`).join(", ");l.innerHTML=`
          <td style="padding: 10px 14px; font-weight: 700; color: var(--color-text-dark);">${o}</td>
          <td style="padding: 10px 14px; font-weight: 700; color: var(--color-primary-teal);">${d} Heilmittel</td>
          <td style="padding: 10px 14px; max-width: 600px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; color: var(--color-text-muted);" title="${h}">${h}</td>
        `,a.appendChild(l)}):a.innerHTML='<tr><td colspan="3" style="padding: 20px; text-align: center; color: var(--color-text-muted);">Bönninghausen Repertorium nicht geladen.</td></tr>')}function ay(){const s=document.getElementById("dev-review-search");if(!s)return;const e=s.value.toLowerCase().trim(),t=document.querySelector(".dev-tab-btn.active");if(!t)return;const n=t.getAttribute("data-dev-tab");let i=null;if(n==="points-review"?i=document.getElementById("dev-points-tbody"):n==="remedies-review"?i=document.getElementById("dev-remedies-tbody"):n==="ttb-review"&&(i=document.getElementById("dev-ttb-tbody")),!i)return;const r=i.getElementsByTagName("tr");for(let a=0;a<r.length;a++){const o=r[a];let l=!1;const c=o.getElementsByTagName("td");for(let d=0;d<c.length;d++)if((c[d].textContent||c[d].innerText).toLowerCase().includes(e)){l=!0;break}o.style.display=l?"":"none"}}function ns(s){return s.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}class oy{constructor(e){he(this,"dataset");he(this,"getSelectedSymptoms");he(this,"onAddSymptom");he(this,"onHighlightPoints");he(this,"chaptersContainer");he(this,"tocCountEl");he(this,"pageTitleEl");he(this,"pageCountEl");he(this,"pageContentEl");he(this,"filterInputEl");he(this,"rubricsByChapter",new Map);he(this,"activeChapter","");he(this,"filterQuery","");this.dataset=e.dataset,this.getSelectedSymptoms=e.getSelectedSymptoms,this.onAddSymptom=e.onAddSymptom,this.onHighlightPoints=e.onHighlightPoints,this.chaptersContainer=document.getElementById("boericke-book-chapters"),this.tocCountEl=document.getElementById("boericke-toc-count"),this.pageTitleEl=document.getElementById("boericke-page-chapter-title"),this.pageCountEl=document.getElementById("boericke-page-rubric-count"),this.pageContentEl=document.getElementById("boericke-book-content"),this.filterInputEl=document.getElementById("boericke-book-filter");for(const n of this.dataset.rubrics){const i=n.chapter||n.full_path.split(" > ")[0]||"Sonstiges";this.rubricsByChapter.has(i)||this.rubricsByChapter.set(i,[]),this.rubricsByChapter.get(i).push(n)}const t=this.getOrderedChapters();this.activeChapter=t[0]||"",this.bindEvents(),this.renderChapters(),this.renderActiveChapter()}getOrderedChapters(){return Array.isArray(this.dataset.chapters)&&this.dataset.chapters.length>0?this.dataset.chapters.map(e=>e.name).filter(e=>{var t;return(((t=this.rubricsByChapter.get(e))==null?void 0:t.length)||0)>0}):Array.from(this.rubricsByChapter.keys())}bindEvents(){this.filterInputEl&&this.filterInputEl.addEventListener("input",()=>{var e;this.filterQuery=((e=this.filterInputEl)==null?void 0:e.value.trim().toLowerCase())||"",this.renderActiveChapter()})}openChapter(e){this.rubricsByChapter.has(e)&&(this.activeChapter=e,this.filterQuery="",this.filterInputEl&&(this.filterInputEl.value=""),this.renderChapters(),this.renderActiveChapter(),this.pageContentEl&&(this.pageContentEl.scrollTop=0))}refresh(){this.renderChapters(),this.renderActiveChapter()}refreshSelectionState(){if(!this.pageContentEl)return;const e=new Set(this.getSelectedSymptoms().map(n=>n.text));this.pageContentEl.querySelectorAll(".boericke-rubric-entry[data-full-text]").forEach(n=>{const i=n.dataset.fullText||"",r=e.has(i);n.classList.toggle("is-selected",r);const a=n.querySelector(".boericke-rubric-add-btn");a&&(a.textContent=r?"✓":"+",a.title=r?"Bereits im Warenkorb":"Zur Fallanalyse hinzufügen")})}renderChapters(){if(!this.chaptersContainer)return;const e=this.getOrderedChapters();this.tocCountEl&&(this.tocCountEl.textContent=`${e.length}`),this.chaptersContainer.innerHTML="",e.forEach((t,n)=>{var a;const i=((a=this.rubricsByChapter.get(t))==null?void 0:a.length)||0,r=document.createElement("button");r.type="button",r.className="boericke-toc-item"+(t===this.activeChapter?" active":""),r.innerHTML=`
        <span class="boericke-toc-num">${n+1}.</span>
        <span class="boericke-toc-name">${ns(t)}</span>
        <span class="boericke-toc-badge">${i}</span>
      `,r.addEventListener("click",()=>{this.openChapter(t)}),this.chaptersContainer.appendChild(r)})}buildChapterTree(e){const t={label:this.activeChapter,fullPath:this.activeChapter,depth:-1,rubric:null,children:new Map};for(const n of e){const i=n.full_path.split(" > "),r=i.length>1?i.slice(1):[n.rubric||n.full_path];let a=t,o=this.activeChapter;r.forEach((l,c)=>{o=`${o} > ${l}`,a.children.has(l)||a.children.set(l,{label:l,fullPath:o,depth:c,rubric:null,children:new Map}),a=a.children.get(l),c===r.length-1&&(a.rubric=n)})}return t}nodeMatchesFilter(e,t){if(t.length===0)return!0;const n=`${e.fullPath} ${e.rubric?e.rubric.remedies.map(i=>i.name).join(" "):""}`.toLowerCase();if(t.every(i=>n.includes(i)))return!0;for(const i of e.children.values())if(this.nodeMatchesFilter(i,t))return!0;return!1}renderActiveChapter(){if(!this.pageContentEl)return;const e=this.rubricsByChapter.get(this.activeChapter)||[];this.pageTitleEl&&(this.pageTitleEl.textContent=this.activeChapter);const t=this.filterQuery.split(/\s+/).map(l=>l.trim()).filter(Boolean),n=this.buildChapterTree(e),i=new Set(this.getSelectedSymptoms().map(l=>l.text)),r=document.createDocumentFragment();let a=0;const o=l=>{if(t.length>0&&!this.nodeMatchesFilter(l,t))return;const c=`depth-${Math.min(l.depth,3)}`;if(l.rubric){a++;const d=`[Boericke] ${l.rubric.full_path}`,h=i.has(d),u=document.createElement("div");u.className=`boericke-rubric-entry ${c}${h?" is-selected":""}`,u.dataset.fullText=d;const f=l.rubric.remedies.map(m=>`<span class="${m.grade>=2?"boericke-remedy grade-2":"boericke-remedy grade-1"}">${ns(m.name)}</span>`).join(", "),g=l.rubric.points||[],y=g.length>0?`<div class="boericke-rubric-points">
                ${g.map(m=>{const S=m.source==="both",T=m.reason?m.reason:m.source==="both"?"Indikation & Wirkung":m.source==="effect"?"Wirkung":"Indikation",_=m.id.replace(/_/g," ");return`<button type="button" class="boericke-point-badge${S?" is-confirmed":""}" data-point-id="${ns(m.id)}" title="${ns(T)} • Klick: Im 3D-Skelett zeigen">${S?"★ ":""}${ns(_)}</button>`}).join("")}
                <button type="button" class="boericke-points-3d-btn" title="Alle zugeordneten Punkte im 3D-Skelett zeigen">🦴 3D</button>
              </div>`:"";u.innerHTML=`
          <div class="boericke-rubric-head">
            <span class="boericke-rubric-label">${ns(l.label)}</span>
            <button type="button" class="boericke-rubric-add-btn" title="${h?"Bereits im Warenkorb":"Zur Fallanalyse hinzufügen"}">${h?"✓":"+"}</button>
          </div>
          <div class="boericke-rubric-remedies">${f}</div>
          ${y}
        `;const p=u.querySelector(".boericke-rubric-add-btn");if(p==null||p.addEventListener("click",m=>{m.stopPropagation(),this.onAddSymptom(d),this.refreshSelectionState()}),g.length>0&&this.onHighlightPoints){u.querySelectorAll(".boericke-point-badge").forEach(S=>{S.addEventListener("click",T=>{T.stopPropagation();const _=S.dataset.pointId;_&&this.onHighlightPoints([_])})});const m=u.querySelector(".boericke-points-3d-btn");m==null||m.addEventListener("click",S=>{S.stopPropagation(),this.onHighlightPoints(g.map(T=>T.id))})}u.addEventListener("click",()=>{this.onAddSymptom(d),this.refreshSelectionState()}),r.appendChild(u)}else if(l.depth>=0){const d=document.createElement("div");d.className=`boericke-rubric-group-heading ${c}`,d.textContent=l.label,r.appendChild(d)}for(const d of l.children.values())o(d)};for(const l of n.children.values())o(l);if(this.pageCountEl&&(this.pageCountEl.textContent=t.length>0?`${a} von ${e.length} Rubriken`:`${e.length} Rubriken`),this.pageContentEl.innerHTML="",a===0){const l=document.createElement("div");l.className="boericke-book-empty",l.textContent=`Keine Rubriken für „${this.filterQuery}“ im Kapitel „${this.activeChapter}“ gefunden.`,this.pageContentEl.appendChild(l)}else this.pageContentEl.appendChild(r)}}const Kd="similapunktur_hitl_curation_v1";function ke(s){return s.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function ly(s){return ke(s).replace(/^(Lokalisation:|Wirkung:|Indikationen:|Zugewiesene[ns]? Hom[öo]opathik[a]?:|Rubriken (?:in|der) General Analysis:|Vorsicht:|Kontraindikation:)/gm,'<strong class="curation-raw-label">$1</strong>')}class cy{constructor(e){he(this,"modalEl");he(this,"getAllPoints");he(this,"getBoerickeData");he(this,"ensureBoerickeLoaded");he(this,"onDataUpdated");he(this,"auditData",null);he(this,"state",{verifiedPoints:{},flaggedPoints:{},verifiedBoericke:{},flaggedBoericke:{}});he(this,"activeTab","points");he(this,"pointFilter","issues");he(this,"pointSearch","");he(this,"selectedPointId","");he(this,"boerickeFilter","issues");he(this,"boerickeChapterFilter","");he(this,"boerickeSearch","");he(this,"selectedBoerickePath","");he(this,"boerickeRenderLimit",150);he(this,"showRawRubricsEditor",!1);he(this,"statusToastTimer",null);this.modalEl=e.modalEl,this.getAllPoints=e.getAllPoints,this.getBoerickeData=e.getBoerickeData,this.ensureBoerickeLoaded=e.ensureBoerickeLoaded,this.onDataUpdated=e.onDataUpdated,this.loadLocalState()}loadLocalState(){try{const e=localStorage.getItem(Kd);if(e){const t=JSON.parse(e);this.state={verifiedPoints:t.verifiedPoints||{},flaggedPoints:t.flaggedPoints||{},verifiedBoericke:t.verifiedBoericke||{},flaggedBoericke:t.flaggedBoericke||{}}}}catch{}}saveLocalState(){try{localStorage.setItem(Kd,JSON.stringify(this.state))}catch{}}async loadAuditAndOverrides(){if(!this.auditData)try{const e=await fetch("curation_audit.json");e.ok&&(this.auditData=await e.json())}catch(e){console.warn("Could not load curation_audit.json:",e)}try{const e=await fetch("/api/curation/overrides");if(e.ok){const t=await e.json();t&&typeof t=="object"&&(this.state={verifiedPoints:{...this.state.verifiedPoints,...t.verifiedPoints||{}},flaggedPoints:{...this.state.flaggedPoints,...t.flaggedPoints||{}},verifiedBoericke:{...this.state.verifiedBoericke,...t.verifiedBoericke||{}},flaggedBoericke:{...this.state.flaggedBoericke,...t.flaggedBoericke||{}}},this.saveLocalState())}}catch{}}async persistToServer(e={}){this.saveLocalState();try{return(await fetch("/api/curation/save",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({overrides:this.state,...e})})).ok}catch{return!1}}async open(){var n;this.modalEl.style.display="flex",this.modalEl.innerHTML='<div class="modal-content curation-modal-content"><div class="curation-loading">Lade Quellen-Audit & Datenbasis...</div></div>',await Promise.all([this.loadAuditAndOverrides(),this.ensureBoerickeLoaded()]);const e=this.getAllPoints();if(!this.selectedPointId&&e.length>0){const i=this.getFilteredPoints()[0];this.selectedPointId=(i||e[0]).point_id}const t=this.getBoerickeData();if(!this.selectedBoerickePath&&((n=t==null?void 0:t.rubrics)!=null&&n.length)){const i=this.getFilteredBoerickeRubrics()[0];this.selectedBoerickePath=(i||t.rubrics[0]).full_path}this.render()}close(){this.modalEl.style.display="none"}showStatusToast(e,t=!1){const n=this.modalEl.querySelector("#curation-status-toast");n&&(n.textContent=e,n.className=`curation-toast visible ${t?"is-warning":"is-success"}`,this.statusToastTimer!==null&&window.clearTimeout(this.statusToastTimer),this.statusToastTimer=window.setTimeout(()=>{n.classList.remove("visible")},3200))}getPointAudit(e){var t,n;return(n=(t=this.auditData)==null?void 0:t.points_audit)==null?void 0:n[e]}getFilteredPoints(){const e=this.pointSearch.trim().toLowerCase();return this.getAllPoints().filter(t=>{const n=this.getPointAudit(t.point_id),i=!!this.state.verifiedPoints[t.point_id],r=n?n.status!=="ok":!1;return!(this.pointFilter==="issues"&&!r||this.pointFilter==="unverified"&&i||this.pointFilter==="verified"&&!i||e&&!`${t.point_id} ${t.name_german} ${t.name_translation||""} ${t.meridian} ${(t.indications||[]).join(" ")}`.toLowerCase().includes(e))})}getFilteredBoerickeRubrics(){var i;const e=this.getBoerickeData();if(!(e!=null&&e.rubrics))return[];const t=this.boerickeSearch.trim().toLowerCase(),n=((i=this.auditData)==null?void 0:i.boericke_issues)||{};return e.rubrics.filter(r=>{var c;if(this.boerickeChapterFilter&&r.chapter!==this.boerickeChapterFilter)return!1;const a=!!((c=n[r.full_path])!=null&&c.length),o=!!(r.points&&r.points.length>0),l=!!this.state.verifiedBoericke[r.full_path];return!(this.boerickeFilter==="issues"&&!a||this.boerickeFilter==="with_points"&&!o||this.boerickeFilter==="without_points"&&o||this.boerickeFilter==="verified"&&!l||t&&!`${r.full_path} ${r.remedies.map(h=>h.name).join(" ")}`.toLowerCase().includes(t))})}render(){var o;const e=this.getAllPoints(),t=e.length,n=e.filter(l=>this.state.verifiedPoints[l.point_id]).length,i=this.getBoerickeData(),r=((o=i==null?void 0:i.rubrics)==null?void 0:o.length)||0,a=Object.values(this.state.verifiedBoericke).filter(Boolean).length;this.modalEl.innerHTML=`
      <div class="modal-content curation-modal-content">
        <header class="modal-header curation-header">
          <div class="curation-title-wrap">
            <h2>🛡️ Quellen-Prüfung & Kuration (HITL)</h2>
            <span class="curation-progress-pill" id="curation-progress-pill">
              Similapunkte: <strong>${n}/${t}</strong> geprüft &nbsp;|&nbsp;
              Boericke: <strong>${a}/${r}</strong> geprüft
            </span>
          </div>
          <div class="curation-tabs">
            <button type="button" class="curation-tab-btn ${this.activeTab==="points"?"active":""}" data-tab="points">
              🪡 Similapunkte (Quelle vs. JSON)
            </button>
            <button type="button" class="curation-tab-btn ${this.activeTab==="boericke"?"active":""}" data-tab="boericke">
              📖 Boericke Repertorium & Punkt-Mapping
            </button>
          </div>
          <div class="curation-header-actions">
            <button type="button" id="curation-export-btn" class="curation-btn-secondary" title="Aktualisierte JSON-Dateien herunterladen">
              ⬇️ Bereinigte JSONs exportieren
            </button>
            <button type="button" id="curation-close-btn" class="modal-close-btn" title="Schließen">&times;</button>
          </div>
        </header>

        <div id="curation-status-toast" class="curation-toast"></div>

        <div class="curation-body">
          ${this.activeTab==="points"?this.renderPointsTabHtml():this.renderBoerickeTabHtml()}
        </div>
      </div>
    `,this.bindEvents()}renderPointsTabHtml(){const e=this.getFilteredPoints(),t=this.getAllPoints(),n=t.find(a=>a.point_id===this.selectedPointId)||e[0]||t[0]||null;n&&n.point_id!==this.selectedPointId&&(this.selectedPointId=n.point_id);const i=e.length===0?'<div class="curation-empty-list">Keine Punkte für diesen Filter.</div>':e.map(a=>{const o=this.getPointAudit(a.point_id),l=(o==null?void 0:o.status)==="error"?"🔴":(o==null?void 0:o.status)==="warning"?"🟡":"🟢",c=this.state.verifiedPoints[a.point_id]?"✅":"",d=this.state.flaggedPoints[a.point_id]&&!c?"🚩":"";return`
                <button type="button" class="curation-list-item${(n==null?void 0:n.point_id)===a.point_id?" active":""}" data-point-id="${ke(a.point_id)}">
                  <span class="curation-status-dot">${l}</span>
                  <span class="curation-item-main">
                    <strong>${ke(a.point_id)}</strong> · ${ke(a.name_german)}
                    <small>${ke(a.meridian||"")}</small>
                  </span>
                  <span class="curation-item-mark">${c||d}</span>
                </button>
              `}).join("");let r='<div class="curation-empty-pane">Kein Punkt ausgewählt.</div>';if(n){const a=this.getPointAudit(n.point_id),o=a&&a.issues.length>0?`<div class="curation-issues-box is-${a.status}">
               <strong>Automatisch erkannte Hinweise (${a.issues.length}):</strong>
               <ul>${a.issues.map(h=>`<li>${ke(h)}</li>`).join("")}</ul>
             </div>`:'<div class="curation-issues-box is-ok">🟢 Keine automatischen Struktur-Abweichungen erkannt.</div>',l=a!=null&&a.raw_text?`<pre class="curation-raw-text">${ly(a.raw_text)}</pre>`:'<div class="curation-empty-raw">Kein direkter Rohtext-Block in Maier-Similapunkte.txt gefunden.</div>',c=(n.general_analysis_rubrics||[]).map(h=>{const u=(h.remedies||[]).map(f=>`${f.name}${f.grade>=2?` (G${f.grade})`:""}`).join(", ");return`<li><strong>${ke(h.rubric_name)}:</strong> ${ke(u||"—")}</li>`}).join(""),d=JSON.stringify(n.general_analysis_rubrics||[],null,2);r=`
        <div class="curation-split">
          <section class="curation-pane curation-source-pane">
            <div class="curation-pane-header">
              <h3>📄 Originalquelle (Maier-Similapunkte.txt)</h3>
              ${(a==null?void 0:a.page)!==null&&(a==null?void 0:a.page)!==void 0?`<span class="curation-page-badge">Seite ${a.page}</span>`:""}
            </div>
            ${o}
            <div class="curation-raw-scroll">${l}</div>
          </section>

          <section class="curation-pane curation-edit-pane">
            <div class="curation-pane-header">
              <h3>✏️ Programm-JSON (${ke(n.point_id)})</h3>
              ${this.state.verifiedPoints[n.point_id]?'<span class="curation-verified-badge">✅ 100% geprüft</span>':this.state.flaggedPoints[n.point_id]?'<span class="curation-flagged-badge">🚩 Zurückgestellt</span>':'<span class="curation-pending-badge">⏳ Ungeprüft</span>'}
            </div>

            <div class="curation-form-scroll">
              <div class="curation-form-row-2">
                <label class="curation-field">
                  <span>Deutscher Name</span>
                  <input type="text" id="cur-pt-name-de" value="${ke(n.name_german||"")}" />
                </label>
                <label class="curation-field">
                  <span>Übersetzung / Chinesischer Name</span>
                  <input type="text" id="cur-pt-trans" value="${ke(n.name_translation||"")}" />
                </label>
              </div>

              <label class="curation-field">
                <span>Lokalisation</span>
                <textarea id="cur-pt-loc" rows="2">${ke(n.localisation_text||"")}</textarea>
              </label>

              <label class="curation-field">
                <span>Wirkungen (1 Eintrag pro Zeile)</span>
                <textarea id="cur-pt-effects" rows="3">${ke((n.effects||[]).join(`
`))}</textarea>
              </label>

              <label class="curation-field">
                <span>Indikationen (1 Eintrag pro Zeile)</span>
                <textarea id="cur-pt-indications" rows="5">${ke((n.indications||[]).join(`
`))}</textarea>
              </label>

              <label class="curation-field">
                <span>Zugewiesene Homöopathika (Komma-separiert)</span>
                <input type="text" id="cur-pt-remedies" value="${ke((n.assigned_homeopathics||[]).join(", "))}" />
              </label>

              <label class="curation-field">
                <span>Vorsichtsmaßnahmen / Kontraindikationen</span>
                <input type="text" id="cur-pt-precautions" value="${ke(n.precautions_or_contraindications||"")}" />
              </label>

              <div class="curation-field">
                <div class="curation-rubrics-head">
                  <span>General Analysis Rubriken (${(n.general_analysis_rubrics||[]).length})</span>
                  <button type="button" id="cur-toggle-rubrics-json" class="curation-link-btn">
                    ${this.showRawRubricsEditor?"Vorschau anzeigen":"Als JSON bearbeiten"}
                  </button>
                </div>
                ${this.showRawRubricsEditor?`<textarea id="cur-pt-rubrics-json" rows="7" class="curation-mono-textarea">${ke(d)}</textarea>`:`<ul class="curation-rubrics-preview">${c||"<li><em>Keine Rubriken</em></li>"}</ul>`}
              </div>
            </div>

            <div class="curation-actions-bar">
              <button type="button" id="cur-pt-verify-next" class="curation-btn-primary">
                ✅ Speichern, als 100% geprüft markieren & Weiter
              </button>
              <button type="button" id="cur-pt-save-only" class="curation-btn-secondary">
                💾 Nur Änderungen speichern
              </button>
              <button type="button" id="cur-pt-flag" class="curation-btn-flag">
                🚩 Zurückstellen
              </button>
            </div>
          </section>
        </div>
      `}return`
      <div class="curation-layout">
        <aside class="curation-sidebar">
          <input type="text" id="cur-pt-search" class="curation-search" placeholder="Punkt suchen (ID, Name, Indikation)..." value="${ke(this.pointSearch)}" />
          <div class="curation-filter-pills">
            <button type="button" class="curation-filter-pill ${this.pointFilter==="all"?"active":""}" data-pt-filter="all">Alle (${t.length})</button>
            <button type="button" class="curation-filter-pill ${this.pointFilter==="issues"?"active":""}" data-pt-filter="issues">🔴/🟡 Auffällig</button>
            <button type="button" class="curation-filter-pill ${this.pointFilter==="unverified"?"active":""}" data-pt-filter="unverified">⏳ Ungeprüft</button>
            <button type="button" class="curation-filter-pill ${this.pointFilter==="verified"?"active":""}" data-pt-filter="verified">✅ Geprüft</button>
          </div>
          <div class="curation-list-meta">${e.length} Treffer</div>
          <div class="curation-list-scroll">${i}</div>
        </aside>
        <main class="curation-main">${r}</main>
      </div>
    `}renderBoerickeTabHtml(){var d,h;const e=this.getBoerickeData(),t=this.getFilteredBoerickeRubrics(),n=t.slice(0,this.boerickeRenderLimit),i=((d=this.auditData)==null?void 0:d.boericke_issues)||{},r=((h=e==null?void 0:e.rubrics)==null?void 0:h.find(u=>u.full_path===this.selectedBoerickePath))||n[0]||null;r&&r.full_path!==this.selectedBoerickePath&&(this.selectedBoerickePath=r.full_path);const a=(e==null?void 0:e.chapters)||[],o=[`<option value="">Alle Kapitel (${a.length})</option>`,...a.map(u=>`<option value="${ke(u.name)}"${u.name===this.boerickeChapterFilter?" selected":""}>${ke(u.num)}. ${ke(u.name)}</option>`)].join(""),l=n.length===0?'<div class="curation-empty-list">Keine Rubriken für diesen Filter.</div>':n.map(u=>{var S,T;const f=!!((S=i[u.full_path])!=null&&S.length),g=((T=u.points)==null?void 0:T.length)||0,y=this.state.verifiedBoericke[u.full_path]?"✅":"",p=this.state.flaggedBoericke[u.full_path]&&!y?"🚩":"";return`
                <button type="button" class="curation-list-item${(r==null?void 0:r.full_path)===u.full_path?" active":""}" data-boericke-path="${ke(u.full_path)}">
                  <span class="curation-status-dot">${f?"🟡":g>0?"🎯":"⭕"}</span>
                  <span class="curation-item-main">
                    <strong>${ke(u.rubric)}</strong>
                    <small>${ke(u.chapter)}${u.parent_rubric?` > ${ke(u.parent_rubric)}`:""} · ${u.remedies.length} Mittel · ${g} Pkt</small>
                  </span>
                  <span class="curation-item-mark">${y||p}</span>
                </button>
              `}).join("")+(t.length>n.length?`<button type="button" id="cur-boericke-load-more" class="curation-load-more-btn">Weitere laden (${n.length} von ${t.length})</button>`:"");let c='<div class="curation-empty-pane">Keine Boericke-Rubrik ausgewählt.</div>';if(r){const u=i[r.full_path]||[],f=u.length>0?`<div class="curation-issues-box is-warning">
               <strong>Parsing-Hinweise (${u.length}):</strong>
               <ul>${u.map(T=>`<li>${ke(T)}</li>`).join("")}</ul>
             </div>`:'<div class="curation-issues-box is-ok">🟢 Keine Parsing-Auffälligkeiten in dieser Rubrik.</div>',g=r.remedies.map(T=>T.grade>=2?`<span class="boericke-remedy grade-2">${ke(T.name)}</span>`:`<span class="boericke-remedy grade-1">${ke(T.name)}</span>`).join(", "),y=r.remedies.map(T=>T.grade>=2?`${T.name}:${T.grade}`:T.name).join(", "),p=r.points||[],m=p.length>0?p.map(T=>`
                  <span class="curation-mapped-pt-chip">
                    <strong>${ke(T.id.replace(/_/g," "))}</strong>
                    <small>${ke(T.reason||T.source)} (${T.score})</small>
                    <button type="button" class="curation-remove-pt-btn" data-remove-pt-id="${ke(T.id)}" title="Punkt entfernen">&times;</button>
                  </span>
                `).join(""):'<span class="curation-empty-pts">Keine Punkte zugeordnet.</span>',S=this.getAllPoints().map(T=>`<option value="${ke(T.point_id)}">${ke(T.point_id)} — ${ke(T.name_german)}</option>`).join("");c=`
        <div class="curation-split">
          <section class="curation-pane curation-source-pane">
            <div class="curation-pane-header">
              <h3>📖 Boericke-Eintrag (Quelle)</h3>
              <span class="curation-page-badge">Kap. ${ke(r.chapter_num)}</span>
            </div>
            ${f}
            <div class="curation-boericke-path">${ke(r.full_path)}</div>
            <div class="curation-boericke-preview">
              <div class="curation-boericke-preview-title">${ke(r.rubric)}</div>
              <div class="curation-boericke-preview-rems">${g}</div>
            </div>
          </section>

          <section class="curation-pane curation-edit-pane">
            <div class="curation-pane-header">
              <h3>✏️ Rubrik & Punkt-Kuration</h3>
              ${this.state.verifiedBoericke[r.full_path]?'<span class="curation-verified-badge">✅ Geprüft</span>':this.state.flaggedBoericke[r.full_path]?'<span class="curation-flagged-badge">🚩 Zurückgestellt</span>':'<span class="curation-pending-badge">⏳ Ungeprüft</span>'}
            </div>

            <div class="curation-form-scroll">
              <label class="curation-field">
                <span>Oberrubrik (parent_rubric)</span>
                <input type="text" id="cur-br-parent" value="${ke(r.parent_rubric||"")}" />
              </label>

              <label class="curation-field">
                <span>Rubrik (rubric)</span>
                <input type="text" id="cur-br-rubric" value="${ke(r.rubric||"")}" />
              </label>

              <label class="curation-field">
                <span>Mittel (Komma-separiert; Grad 2 mit :2 kennzeichnen, z. B. Acon.:2, Bell.)</span>
                <textarea id="cur-br-remedies" rows="4">${ke(y)}</textarea>
              </label>

              <div class="curation-field">
                <span>Zugeordnete Akupunkturpunkte (${p.length})</span>
                <div class="curation-mapped-pts-wrap" id="cur-br-points-list">${m}</div>
                <div class="curation-add-pt-row">
                  <input type="text" id="cur-br-add-pt-input" list="curation-points-datalist" placeholder="Punkt-ID eingeben (z. B. ST_36, SP_6)..." />
                  <datalist id="curation-points-datalist">${S}</datalist>
                  <button type="button" id="cur-br-add-pt-btn" class="curation-btn-secondary">+ Punkt hinzufügen</button>
                </div>
              </div>
            </div>

            <div class="curation-actions-bar">
              <button type="button" id="cur-br-verify-next" class="curation-btn-primary">
                ✅ Rubrik bestätigen & Weiter
              </button>
              <button type="button" id="cur-br-save-only" class="curation-btn-secondary">
                💾 Nur Änderungen speichern
              </button>
              <button type="button" id="cur-br-flag" class="curation-btn-flag">
                🚩 Zurückstellen
              </button>
            </div>
          </section>
        </div>
      `}return`
      <div class="curation-layout">
        <aside class="curation-sidebar">
          <select id="cur-br-chapter" class="curation-select">${o}</select>
          <input type="text" id="cur-br-search" class="curation-search" placeholder="Rubrik oder Mittel suchen..." value="${ke(this.boerickeSearch)}" />
          <div class="curation-filter-pills">
            <button type="button" class="curation-filter-pill ${this.boerickeFilter==="all"?"active":""}" data-br-filter="all">Alle</button>
            <button type="button" class="curation-filter-pill ${this.boerickeFilter==="issues"?"active":""}" data-br-filter="issues">🟡 Parsing</button>
            <button type="button" class="curation-filter-pill ${this.boerickeFilter==="with_points"?"active":""}" data-br-filter="with_points">🎯 Mit Pkt</button>
            <button type="button" class="curation-filter-pill ${this.boerickeFilter==="without_points"?"active":""}" data-br-filter="without_points">⭕ Ohne Pkt</button>
            <button type="button" class="curation-filter-pill ${this.boerickeFilter==="verified"?"active":""}" data-br-filter="verified">✅ Geprüft</button>
          </div>
          <div class="curation-list-meta">${t.length} Treffer</div>
          <div class="curation-list-scroll">${l}</div>
        </aside>
        <main class="curation-main">${c}</main>
      </div>
    `}bindEvents(){var e,t;(e=this.modalEl.querySelector("#curation-close-btn"))==null||e.addEventListener("click",()=>this.close()),(t=this.modalEl.querySelector("#curation-export-btn"))==null||t.addEventListener("click",()=>this.exportCleanJsons()),this.modalEl.querySelectorAll(".curation-tab-btn").forEach(n=>{n.addEventListener("click",()=>{const i=n.dataset.tab;i&&i!==this.activeTab&&(this.activeTab=i,this.render())})}),this.activeTab==="points"?this.bindPointsEvents():this.bindBoerickeEvents()}bindPointsEvents(){var t,n,i,r;const e=this.modalEl.querySelector("#cur-pt-search");e==null||e.addEventListener("input",()=>{this.pointSearch=e.value;const a=e.selectionStart;this.render();const o=this.modalEl.querySelector("#cur-pt-search");o&&(o.focus(),a!==null&&o.setSelectionRange(a,a))}),this.modalEl.querySelectorAll("[data-pt-filter]").forEach(a=>{a.addEventListener("click",()=>{this.pointFilter=a.dataset.ptFilter;const o=this.getFilteredPoints()[0];o&&(this.selectedPointId=o.point_id),this.render()})}),this.modalEl.querySelectorAll("[data-point-id]").forEach(a=>{a.addEventListener("click",()=>{this.selectedPointId=a.dataset.pointId||"",this.showRawRubricsEditor=!1,this.render()})}),(t=this.modalEl.querySelector("#cur-toggle-rubrics-json"))==null||t.addEventListener("click",()=>{this.showRawRubricsEditor=!this.showRawRubricsEditor,this.render()}),(n=this.modalEl.querySelector("#cur-pt-save-only"))==null||n.addEventListener("click",()=>this.saveCurrentPoint(!1)),(i=this.modalEl.querySelector("#cur-pt-verify-next"))==null||i.addEventListener("click",()=>this.saveCurrentPoint(!0)),(r=this.modalEl.querySelector("#cur-pt-flag"))==null||r.addEventListener("click",()=>{this.selectedPointId&&(this.state.flaggedPoints[this.selectedPointId]=!0,delete this.state.verifiedPoints[this.selectedPointId],this.persistToServer(),this.advanceToNextPoint(),this.render(),this.showStatusToast("Punkt zurückgestellt (Flag gesetzt).",!0))})}async saveCurrentPoint(e){var f,g,y,p,m,S,T;const t=this.getAllPoints().find(_=>_.point_id===this.selectedPointId);if(!t)return;const n=((f=this.modalEl.querySelector("#cur-pt-name-de"))==null?void 0:f.value.trim())||"",i=((g=this.modalEl.querySelector("#cur-pt-trans"))==null?void 0:g.value.trim())||"",r=((y=this.modalEl.querySelector("#cur-pt-loc"))==null?void 0:y.value.trim())||"",a=((p=this.modalEl.querySelector("#cur-pt-effects"))==null?void 0:p.value)||"",o=((m=this.modalEl.querySelector("#cur-pt-indications"))==null?void 0:m.value)||"",l=((S=this.modalEl.querySelector("#cur-pt-remedies"))==null?void 0:S.value)||"",c=((T=this.modalEl.querySelector("#cur-pt-precautions"))==null?void 0:T.value.trim())||"";let d;const h=this.modalEl.querySelector("#cur-pt-rubrics-json");if(h)try{const _=JSON.parse(h.value);if(!Array.isArray(_))throw new Error("Muss ein JSON-Array sein.");d=_}catch(_){this.showStatusToast(`Ungültiges Rubriken-JSON: ${(_==null?void 0:_.message)||"Syntaxfehler"}`,!0);return}t.name_german=n,t.name_translation=i||void 0,t.localisation_text=r,t.effects=a.split(/\r?\n/).map(_=>_.trim()).filter(Boolean),t.indications=o.split(/\r?\n/).map(_=>_.trim()).filter(Boolean),t.assigned_homeopathics=l.split(",").map(_=>_.trim()).filter(Boolean),t.precautions_or_contraindications=c||null,d!==void 0&&(t.general_analysis_rubrics=d),e&&(this.state.verifiedPoints[t.point_id]=!0,delete this.state.flaggedPoints[t.point_id],this.advanceToNextPoint());const u=await this.persistToServer({updatedPoint:t});this.onDataUpdated(),this.render(),this.showStatusToast(u?`${t.point_id} direkt in similapunktur.json gespeichert.`:`${t.point_id} lokal gespeichert (zum Schreiben auf Platte 'bereinigte JSONs exportieren' nutzen).`,!u)}advanceToNextPoint(){const e=this.getFilteredPoints(),t=e.findIndex(i=>i.point_id===this.selectedPointId),n=e.slice(t+1).find(i=>!this.state.verifiedPoints[i.point_id])||e.find(i=>!this.state.verifiedPoints[i.point_id]&&i.point_id!==this.selectedPointId)||e[t+1];n&&(this.selectedPointId=n.point_id,this.showRawRubricsEditor=!1)}bindBoerickeEvents(){var n,i,r,a,o;const e=this.modalEl.querySelector("#cur-br-chapter");e==null||e.addEventListener("change",()=>{this.boerickeChapterFilter=e.value,this.boerickeRenderLimit=150;const l=this.getFilteredBoerickeRubrics()[0];l&&(this.selectedBoerickePath=l.full_path),this.render()});const t=this.modalEl.querySelector("#cur-br-search");t==null||t.addEventListener("input",()=>{this.boerickeSearch=t.value,this.boerickeRenderLimit=150;const l=t.selectionStart;this.render();const c=this.modalEl.querySelector("#cur-br-search");c&&(c.focus(),l!==null&&c.setSelectionRange(l,l))}),this.modalEl.querySelectorAll("[data-br-filter]").forEach(l=>{l.addEventListener("click",()=>{this.boerickeFilter=l.dataset.brFilter,this.boerickeRenderLimit=150;const c=this.getFilteredBoerickeRubrics()[0];c&&(this.selectedBoerickePath=c.full_path),this.render()})}),this.modalEl.querySelectorAll("[data-boericke-path]").forEach(l=>{l.addEventListener("click",()=>{this.selectedBoerickePath=l.dataset.boerickePath||"",this.render()})}),(n=this.modalEl.querySelector("#cur-boericke-load-more"))==null||n.addEventListener("click",()=>{this.boerickeRenderLimit+=150,this.render()}),this.modalEl.querySelectorAll("[data-remove-pt-id]").forEach(l=>{l.addEventListener("click",()=>{var h,u;const c=l.dataset.removePtId,d=(u=(h=this.getBoerickeData())==null?void 0:h.rubrics)==null?void 0:u.find(f=>f.full_path===this.selectedBoerickePath);!d||!c||(d.points=(d.points||[]).filter(f=>f.id!==c),this.saveCurrentBoerickeRubric(!1))})}),(i=this.modalEl.querySelector("#cur-br-add-pt-btn"))==null||i.addEventListener("click",()=>{var u,f;const l=this.modalEl.querySelector("#cur-br-add-pt-input"),c=(l==null?void 0:l.value.trim().toUpperCase())||"";if(!c)return;const d=(f=(u=this.getBoerickeData())==null?void 0:u.rubrics)==null?void 0:f.find(g=>g.full_path===this.selectedBoerickePath);if(!d)return;const h=d.points?[...d.points]:[];h.some(g=>g.id===c)||(h.unshift({id:c,score:25,source:"manual",reason:"Manuell kuratiert (HITL)"}),d.points=h,this.saveCurrentBoerickeRubric(!1))}),(r=this.modalEl.querySelector("#cur-br-save-only"))==null||r.addEventListener("click",()=>this.saveCurrentBoerickeRubric(!1)),(a=this.modalEl.querySelector("#cur-br-verify-next"))==null||a.addEventListener("click",()=>this.saveCurrentBoerickeRubric(!0)),(o=this.modalEl.querySelector("#cur-br-flag"))==null||o.addEventListener("click",()=>{this.selectedBoerickePath&&(this.state.flaggedBoericke[this.selectedBoerickePath]=!0,delete this.state.verifiedBoericke[this.selectedBoerickePath],this.persistToServer(),this.advanceToNextBoericke(),this.render(),this.showStatusToast("Rubrik zurückgestellt (Flag gesetzt).",!0))})}async saveCurrentBoerickeRubric(e){var c,d,h,u,f;const t=(d=(c=this.getBoerickeData())==null?void 0:c.rubrics)==null?void 0:d.find(g=>g.full_path===this.selectedBoerickePath);if(!t)return;const n=t.full_path,i=((h=this.modalEl.querySelector("#cur-br-parent"))==null?void 0:h.value.trim())||"",r=((u=this.modalEl.querySelector("#cur-br-rubric"))==null?void 0:u.value.trim())||"",o=(((f=this.modalEl.querySelector("#cur-br-remedies"))==null?void 0:f.value)||"").split(",").map(g=>g.trim()).filter(Boolean).map(g=>{const[y,p]=g.split(":"),m=p?Math.max(1,parseInt(p.trim(),10)||1):1;return{name:y.trim(),grade:m}});t.parent_rubric=i,t.rubric=r||t.rubric,t.full_path=i?`${t.chapter} > ${i} > ${t.rubric}`:`${t.chapter} > ${t.rubric}`,o.length>0&&(t.remedies=o),this.selectedBoerickePath=t.full_path,e&&(this.state.verifiedBoericke[t.full_path]=!0,delete this.state.flaggedBoericke[t.full_path],this.advanceToNextBoericke());const l=await this.persistToServer({updatedBoerickeRubric:{original_full_path:n,full_path:t.full_path,rubric:t}});this.onDataUpdated(),this.render(),this.showStatusToast(l?"Boericke-Rubrik direkt in boericke_repertory.json gespeichert.":"Boericke-Rubrik lokal gespeichert (Export-Button für Dateidownload nutzen).",!l)}advanceToNextBoericke(){const e=this.getFilteredBoerickeRubrics(),t=e.findIndex(i=>i.full_path===this.selectedBoerickePath),n=e.slice(t+1).find(i=>!this.state.verifiedBoericke[i.full_path])||e.find(i=>!this.state.verifiedBoericke[i.full_path]&&i.full_path!==this.selectedBoerickePath)||e[t+1];n&&(this.selectedBoerickePath=n.full_path)}downloadJsonFile(e,t){const n=new Blob([JSON.stringify(t,null,2)],{type:"application/json;charset=utf-8"}),i=URL.createObjectURL(n),r=document.createElement("a");r.href=i,r.download=e,document.body.appendChild(r),r.click(),r.remove(),URL.revokeObjectURL(i)}async exportCleanJsons(){await this.persistToServer(),this.downloadJsonFile("similapunktur.json",this.getAllPoints());const e=this.getBoerickeData();e&&window.setTimeout(()=>this.downloadJsonFile("boericke_repertory.json",e),250),window.setTimeout(()=>this.downloadJsonFile("curation_overrides.json",this.state),500),this.showStatusToast("Bereinigte JSON-Dateien exportiert.")}}function dy(s,e){const t=s.length,n=e.length,i=Array.from({length:t+1},()=>Array(n+1).fill(0));for(let r=0;r<=t;r++)i[r][0]=r;for(let r=0;r<=n;r++)i[0][r]=r;for(let r=1;r<=t;r++)for(let a=1;a<=n;a++)s[r-1]===e[a-1]?i[r][a]=i[r-1][a-1]:i[r][a]=Math.min(i[r-1][a]+1,i[r][a-1]+1,i[r-1][a-1]+1);return i[t][n]}function Yd(s,e){const t=s.toLowerCase(),n=e.toLowerCase();if(t===n)return 100;if(t.startsWith(n))return 90;const i=t.indexOf(n);if(i!==-1)return i>0&&(t[i-1]===" "||t[i-1]==="-")?85:70;const r=t.split(/[\s,.-]+/);let a=0;for(const o of r){if(o.length<3)continue;if(o.startsWith(n)){a=Math.max(a,80);continue}const l=n.length;if(l>=3){const c=l<=4?1:2;let d=999;for(let h=Math.max(3,l-1);h<=Math.min(o.length,l+1);h++){const u=o.substring(0,h),f=dy(n,u);f<d&&(d=f)}if(d<=c){const h=60-d*15;a=Math.max(a,h)}}}return a}function fl(s,e={}){const n=s.trim().toLowerCase().match(/[a-zA-ZäöüÄÖÜßéèàáíóúñ]+/g)||[],i=new Set;return n.forEach(r=>{e[r]&&e[r].forEach(a=>i.add(a))}),Array.from(i)}function hy(s,e,t={}){const n=s.toLowerCase(),i=e.toLowerCase().trim(),r=i.split(/\s+/).filter(c=>c.length>=2);if(r.length>1){let c=0;for(const d of r){const h=fl(d,t),u=[d,...h];let f=0;for(const g of u){const y=Yd(n,g),p=g===d?y:y*.92;p>f&&(f=p)}if(f===0)return 0;c+=f}return Math.round(c/r.length)}const a=fl(i,t),o=[i,...a];let l=0;for(const c of o){const d=Yd(n,c),h=c===i?d:d*.92;h>l&&(l=h)}return l}function uy(s,e,t={},n=10){if(!e||e.trim().length<2)return[];const i=e.trim();return s.map(r=>({text:r,score:hy(r,i,t)})).filter(r=>r.score>0).sort((r,a)=>a.score-r.score).slice(0,n)}function Jh(s){const e=s.toLowerCase();return e.includes("kopf")||e.includes("gehirn")||e.includes("nerv")||e.includes("schwindel")||e.includes("migrän")||e.includes("krampf")?"Kopf & Nervensystem":e.includes("gemüt")||e.includes("geist")||e.includes("schlaf")||e.includes("traum")||e.includes("angst")||e.includes("traurig")||e.includes("unruh")||e.includes("hyster")||e.includes("reizbar")?"Gemüt & Psyche":e.includes("herz")||e.includes("puls")||e.includes("blut")||e.includes("ader")||e.includes("gefäß")||e.includes("angina")?"Herz & Kreislauf":e.includes("magen")||e.includes("darm")||e.includes("verdau")||e.includes("appetit")||e.includes("übel")||e.includes("erbr")||e.includes("leber")||e.includes("galle")||e.includes("abdomen")||e.includes("stuhl")?"Magen & Verdauung":e.includes("lung")||e.includes("atmung")||e.includes("hust")||e.includes("kehlkopf")||e.includes("nase")||e.includes("hals")||e.includes("heiser")||e.includes("atemnot")||e.includes("schnupf")?"Atmung & Hals":e.includes("urin")||e.includes("blas")||e.includes("nier")||e.includes("mens")||e.includes("uter")||e.includes("gebärmutter")||e.includes("schwanger")?"Urogenitaltrakt":e.includes("haut")||e.includes("juck")||e.includes("ausschlag")||e.includes("schwitz")||e.includes("schwell")||e.includes("geschwür")||e.includes("ekzem")?"Haut & Äußeres":"Bewegungsapparat & Allgemeines"}const jh=[{key1:"kälte überhaupt, agg",key2:"wärme überhaupt, von",name1:"Kälte-Agg.",name2:"Wärme-Agg."},{key1:"kälte überhaupt, agg",key2:"kälte) eines",name1:"Kälte-Agg.",name2:"Kälte-Lind."},{key1:"wärme überhaupt, von",key2:"äußere wärme",name1:"Wärme-Agg.",name2:"Wärme-Lind."},{key1:"bewegung , agg",key2:"ruhe",name1:"Bewegungs-Agg.",name2:"Ruhe-Agg."},{key1:"trockenes wetter, agg",key2:"feuchtes wetter, agg",name1:"Trockene Luft-Agg.",name2:"Feuchte Luft-Agg."}];function fy(s,e,t,n=jh){const i=new Map;if(!t)return i;const r=e.filter(o=>o.text.startsWith("[TTB] "));if(r.length===0)return i;const a=Object.keys(t);return s.forEach(o=>{const l=o.toLowerCase().replace(/\.$/,"").trim();r.forEach(c=>{const d=c.text.substring(6).toLowerCase().trim();n.forEach(h=>{let u=!1,f="",g="",y="";if(d.includes(h.key1.toLowerCase())?(u=!0,f=h.key2,g=h.name1,y=h.name2):d.includes(h.key2.toLowerCase())&&(u=!0,f=h.key1,g=h.name2,y=h.name1),u){let p=0;const m=a.find(T=>T.toLowerCase().trim()===d);if(m){const _=t[m].find(b=>b.name.toLowerCase().replace(/\.$/,"").trim()===l);_&&(p=_.grade)}let S=0;for(const T of a)if(T.toLowerCase().includes(f.toLowerCase())){const b=t[T].find(E=>E.name.toLowerCase().replace(/\.$/,"").trim()===l);b&&b.grade>S&&(S=b.grade)}S>p&&(i.has(o)||i.set(o,new Set),i.get(o).add(`${y} (Grad ${S}) vs. ${g} (Grad ${p})`))}})})}),i}function py(s,e,t,n=jh){if(!t)return{patientPoleSum:0,oppositePoleSum:0,polarityDifference:0};const i=s.toLowerCase().replace(/\.$/,"").trim(),r=e.filter(c=>c.text.startsWith("[TTB] ")),a=Object.keys(t);let o=0,l=0;return r.forEach(c=>{const d=c.text.substring(6).toLowerCase().trim();let h=!1,u=0,f=0;n.forEach(g=>{let y=!1,p="";if(d.includes(g.key1.toLowerCase())?(y=!0,p=g.key2):d.includes(g.key2.toLowerCase())&&(y=!0,p=g.key1),y){if(h=!0,u===0){const m=a.find(S=>S.toLowerCase().trim()===d);if(m){const T=t[m].find(_=>_.name.toLowerCase().replace(/\.$/,"").trim()===i);T&&(u=T.grade)}}for(const m of a)if(m.toLowerCase().includes(p.toLowerCase())){const T=t[m].find(_=>_.name.toLowerCase().replace(/\.$/,"").trim()===i);T&&T.grade>f&&(f=T.grade)}}}),h&&(o+=u,l+=f)}),{patientPoleSum:o,oppositePoleSum:l,polarityDifference:o-l}}function my(s,e,t={}){const n=e.toLowerCase().trim();if(s.effects&&s.effects.some(r=>r.toLowerCase().includes(n))||s.indications&&s.indications.some(r=>r.toLowerCase().includes(n))||s.general_analysis_rubrics&&s.general_analysis_rubrics.some(r=>r.rubric_name.toLowerCase().includes(n)))return!0;const i=n.replace(".","");for(const r in t){const a=t[r];if(a.some(l=>l.toLowerCase().replace(".","").includes(i))||r.toLowerCase().replace(".","").includes(i))for(const l of[r,...a]){const c=l.toLowerCase();if(s.effects&&s.effects.some(d=>d.toLowerCase().includes(c))||s.indications&&s.indications.some(d=>d.toLowerCase().includes(c))||s.general_analysis_rubrics&&s.general_analysis_rubrics.some(d=>d.rubric_name.toLowerCase().includes(c)))return!0}}return!1}function gy(s){const e=new Set;return s.forEach(t=>{t.assigned_homeopathics&&t.assigned_homeopathics.forEach(n=>e.add(n)),t.general_analysis_rubrics&&t.general_analysis_rubrics.forEach(n=>{n.remedies&&n.remedies.forEach(i=>e.add(i.name))})}),Array.from(e).sort((t,n)=>t.localeCompare(n,"de",{sensitivity:"base"}))}function Qh(s,e){const t=s.toLowerCase().replace(/\.$/,"").trim(),n=[],i=new Map;e.forEach(a=>{a.assigned_homeopathics&&a.assigned_homeopathics.some(l=>l.toLowerCase().replace(/\.$/,"").trim()===t)&&(n.includes(a.point_id)||n.push(a.point_id)),a.general_analysis_rubrics&&a.general_analysis_rubrics.forEach(o=>{if(o.remedies){const l=o.remedies.find(c=>c.name.toLowerCase().replace(/\.$/,"").trim()===t);if(l){const c=i.get(o.rubric_name)||0;l.grade>c&&i.set(o.rubric_name,l.grade)}}})});const r=Array.from(i.entries()).map(([a,o])=>({rubric:a,grade:o}));return r.sort((a,o)=>o.grade-a.grade),{remedy:s,rubrics:r,direct_points:n}}function _y({selectedSymptoms:s,allPointsData:e,staticTtbData:t=null,staticBoerickeRepData:n=null,rubricsRemediesMap:i=new Map,activeModalities:r=new Set,synonymsData:a={},useExponentialScoring:o=!0,useCoverageBonus:l=!0,usePolarityPenalty:c=!0}){if(s.length===0)return{remedyScores:[],pointScores:[],recommendedPointIds:new Set,contraindications:new Map};const d=new Map;n!=null&&n.rubrics&&n.rubrics.forEach(_=>{d.set(_.full_path.toLowerCase().trim(),_)});const h=new Map;s.forEach(_=>{const b=_.text.startsWith("[TTB] "),E=_.text.startsWith("[Boericke] "),w=b?_.text.substring(6).toLowerCase().trim():E?_.text.substring(11).toLowerCase().trim():_.text.toLowerCase().trim();if(E){const v=d.get(w);v!=null&&v.remedies&&v.remedies.forEach(A=>{const C=A.name.replace(/\.$/,"");h.has(C)||h.set(C,{matches:new Set,score:0});const L=h.get(C);if(!L.matches.has(_.id)){L.matches.add(_.id);const B=o?A.grade*A.grade:A.grade;L.score+=B*_.weight}})}else if(b){if(t){const A=Object.keys(t).find(C=>C.toLowerCase().trim()===w);A&&t[A].forEach(L=>{const B=L.name.replace(/\.$/,"");h.has(B)||h.set(B,{matches:new Set,score:0});const V=h.get(B);if(!V.matches.has(_.id)){V.matches.add(_.id);const O=o?L.grade*L.grade:L.grade;V.score+=O*_.weight}})}}else e.forEach(v=>{v.general_analysis_rubrics&&v.general_analysis_rubrics.forEach(C=>{C.rubric_name.toLowerCase().includes(w)&&C.remedies.forEach(L=>{h.has(L.name)||h.set(L.name,{matches:new Set,score:0});const B=h.get(L.name);if(!B.matches.has(_.id)){B.matches.add(_.id);const V=o?L.grade*L.grade:L.grade;B.score+=V*_.weight}})}),(v.effects&&v.effects.some(C=>C.toLowerCase().includes(w))||v.indications&&v.indications.some(C=>C.toLowerCase().includes(w)))&&v.assigned_homeopathics&&v.assigned_homeopathics.forEach(C=>{h.has(C)||h.set(C,{matches:new Set,score:0});const L=h.get(C);if(!L.matches.has(_.id)){L.matches.add(_.id);const B=o?9:3;L.score+=B*_.weight}})})}),h.forEach((_,b)=>{r.forEach(E=>{const w=i.get(E);if(w){const v=w.get(b);if(v){const A=o?v*v*2:v*2;_.score+=A}}})});const u=Array.from(h.keys()),f=fy(u,s,t),g=s.length,y=[];h.forEach((_,b)=>{const E=_.matches.size;let w=_.score;const v=w;let A=!1;if(l&&g>1&&E>1){const O=1+.25*(E/g);w=Math.round(w*O),A=!0}const C=f.has(b),L=C?Array.from(f.get(b)):[],B=py(b,s,t);c&&C&&(w=Math.max(1,Math.round(w*.5))),y.push({name:b,matchesCount:E,score:w,rawScore:v,isContraindicated:C,contraindicationWarnings:L,polarityDifference:B.polarityDifference,coverageBonusApplied:A})}),y.sort((_,b)=>b.matchesCount!==_.matchesCount?b.matchesCount-_.matchesCount:b.score-_.score);const p=new Map,m=new Map;e.forEach(_=>m.set(_.point_id,_)),s.forEach(_=>{if(_.text.startsWith("[Boericke] ")){const E=_.text.substring(11).toLowerCase().trim(),w=d.get(E);w!=null&&w.points&&w.points.length>0&&w.points.forEach(v=>{const A=m.get(v.id);if(!A)return;p.has(v.id)||p.set(v.id,{p:A,matchedSymptoms:new Set,score:0});const C=p.get(v.id);C.matchedSymptoms.has(_.id)||(C.matchedSymptoms.add(_.id),C.score+=v.score*_.weight)})}e.forEach(E=>{const w=p.get(E.point_id);if(!(w!=null&&w.matchedSymptoms.has(_.id))&&my(E,_.text,a)){p.has(E.point_id)||p.set(E.point_id,{p:E,matchedSymptoms:new Set,score:0});const v=p.get(E.point_id);v.matchedSymptoms.add(_.id),v.score+=_.weight}})});const S=[];p.forEach(_=>{_.matchedSymptoms.size>0&&S.push({p:_.p,matchedCount:_.matchedSymptoms.size,score:_.score})}),S.sort((_,b)=>b.matchedCount!==_.matchedCount?b.matchedCount-_.matchedCount:b.score-_.score);const T=new Set(S.map(_=>_.p.point_id));return{remedyScores:y,pointScores:S,recommendedPointIds:T,contraindications:f}}let eu=null,yi=null,Rn=[],rn=new Set,un="",_i=!1,tu=[],Kn=-1,at=[],Mi=null,ho=null,vs=!1,ir={},we=null,Ot=[],Cn=new Set,Ni=null,us=new Set;const oa=new Map;let nu=[],Zd=null;const ks=new Map;let fs=null,Un=null,wt=null;const gn={boericke:!0,ttb:!1,points:!1};let pl=[],ml=[],Kr=[];const or=[{id:"herz",name:"Herz-Leitbahn",short:"Herz (HT)"},{id:"lunge",name:"Lungen-Leitbahn",short:"Lunge (LU)"},{id:"blase",name:"Blasen-Leitbahn",short:"Blase (BL)"},{id:"dickdarm",name:"Dickdarm-Leitbahn",short:"Dickdarm (LI)"},{id:"magen",name:"Magen-Leitbahn",short:"Magen (ST)"},{id:"duenndarm",name:"Dünndarm-Leitbahn",short:"Dünndarm (SI)"},{id:"niere",name:"Nieren-Leitbahn",short:"Niere (KI)"},{id:"perikard",name:"Perikard-Leitbahn",short:"Perikard (PC)"},{id:"dreifacherwaermer",name:"Dreifacherwärmer-Leitbahn",short:"3-Erwärmer (TE)"},{id:"gallenblase",name:"Gallenblasen-Leitbahn",short:"Gallenblase (GB)"},{id:"leber",name:"Leber-Leitbahn",short:"Leber (LR)"},{id:"milz_pankreas",name:"Milz-Pankreas-Leitbahn",short:"Milz (SP)"},{id:"konzeptionsgefaess",name:"Konzeptionsgefäß",short:"Konzeption (CV)"},{id:"lenkergefaess",name:"Lenkergefäß",short:"Lenker (GV)"},{id:"extrapunkte",name:"Extrapunkte",short:"Extrapunkte"}],Fi=document.getElementById("meridian-list"),vy=document.getElementById("visualizer-placeholder"),xy=document.getElementById("visualizer-active"),yy=document.getElementById("meridian-image"),bi=document.getElementById("svg-overlay"),Kl=document.getElementById("theme-toggle"),Jd=Kl.querySelector(".sun-icon"),jd=Kl.querySelector(".moon-icon"),wn=document.getElementById("search-input"),ga=document.getElementById("clear-search-btn"),My=document.getElementById("search-results-section"),by=document.getElementById("results-count"),Sy=document.getElementById("search-query-display"),uo=document.getElementById("search-results-list"),la=document.getElementById("meridian-points-section"),fo=document.getElementById("meridian-points-list"),gl=document.getElementById("detail-placeholder"),xi=document.getElementById("detail-panel"),_l=document.getElementById("warning-banner"),Ey=document.getElementById("warning-text"),iu=document.getElementById("point-id-title"),su=document.getElementById("point-meridian"),ru=document.getElementById("point-name-de"),au=document.getElementById("point-translation"),Ty=document.getElementById("point-localisation"),po=document.getElementById("effects-list"),mo=document.getElementById("indications-list"),go=document.getElementById("remedies-badges"),_o=document.getElementById("rubrics-list");let fn=null;async function wy(){try{const s=await fetch("synonyms.json");s.ok&&(ir=await s.json(),console.log(`Loaded ${Object.keys(ir).length} synonym groups.`))}catch(s){console.warn("Failed to load synonyms.json, falling back.",s)}}function Ay(){nu=gy(at),ou()}function ou(s=""){const e=document.getElementById("remedy-sidebar-list");if(!e)return;e.innerHTML="";const t=s.toLowerCase().trim().replace(/\.$/,"");nu.forEach(n=>{const i=n.toLowerCase().replace(/\.$/,"");if(t&&!i.includes(t))return;const r=Yr(n),a=r.direct_points.length+r.rubrics.length,o=document.createElement("li");o.className="remedy-li-item",Zd===n&&o.classList.add("active"),o.innerHTML=`
      <span class="remedy-li-name">${n}</span>
      <span class="remedy-li-count">${a} P.</span>
    `,o.addEventListener("click",()=>{Zd=n,e.querySelectorAll(".remedy-li-item").forEach(l=>l.classList.remove("active")),o.classList.add("active"),rr(n)}),e.appendChild(o)}),e.children.length===0&&(e.innerHTML='<li class="dimmed" style="padding: 10px 14px; text-align: center;">Keine passenden Heilmittel gefunden.</li>')}async function Ry(){const s=document.getElementById("viewer-3d-container");if(s){we=new iy(s,{onPointClick:(e,t)=>{zn(e,!1)},onPointCalibrate:(e,t)=>{const n=e?`3D-Koordinate für ${e} gesetzt: [${t.join(", ")}]`:`3D-Oberflächenkoordinate: [${t.join(", ")}] (Konsole prüfen)`;si(n)}}),window.bodyViewer3D=we,Cy();try{await Promise.all([we.loadModel("models/human_body.glb"),we.loadPointsData("data/points_3d.json")]);const e=new Set(at.map(n=>n.point_id));we.getAllPoints().forEach(n=>{if(!e.has(n.id)&&n.supplementary_details){const i=n.supplementary_details;at.push({point_id:n.id,name_german:i.name_german,name_chinese:i.name_chinese,name_translation:i.name_translation,meridian:i.meridian,localisation_text:i.localisation_text,effects:i.effects,indications:i.indications,assigned_homeopathics:i.assigned_homeopathics,general_analysis_rubrics:[],precautions_or_contraindications:null,visuals:{image_filename:i.image_filename,relative_coordinates:{x_percent:50,y_percent:50}}})}}),new URLSearchParams(window.location.search).get("edit")==="true"&&lu(!0)}catch(e){console.error("Failed to initialize 3D Body Viewer:",e)}}}function Cy(){const s=document.getElementById("meridian-filter-chips");if(!s||!we)return;s.innerHTML="";const e=new Set(we.getVisibleMeridians());or.forEach(t=>{const n=document.createElement("button");n.type="button",n.className="meridian-filter-chip",n.dataset.meridianId=t.id,e.has(t.id)&&n.classList.add("active"),n.textContent=t.short,n.title=`${t.name} im 3D-Modell ein-/ausblenden`,n.addEventListener("click",()=>{if(!we)return;const i=we.toggleMeridian(t.id);n.classList.toggle("active",i),_a()}),s.appendChild(n)})}function _a(){if(!we)return;const s=new Set(we.getVisibleMeridians()),e=s.size===2&&s.has("herz")&&s.has("lunge"),t=s.size===or.length;document.querySelectorAll(".meridian-filter-chip.preset-chip").forEach(n=>{const i=n;i.dataset.filterPreset==="pilot"?i.classList.toggle("active",e):i.dataset.filterPreset==="all"&&i.classList.toggle("active",t)}),document.querySelectorAll("#meridian-filter-chips .meridian-filter-chip").forEach(n=>{const i=n,r=i.dataset.meridianId||"";i.classList.toggle("active",s.has(r))})}function lu(s){_i=s;const e=document.getElementById("editor-toggle"),t=document.getElementById("editor-banner");e&&e.classList.toggle("active",_i),t&&(t.style.display=_i?"block":"none"),bi&&bi.classList.toggle("editor-active-cursor",_i),we&&we.setCalibrationMode(_i),si(_i?"🎯 3D/2D Kalibrierungs-Editor aktiviert!":"Kalibrierungs-Editor deaktiviert.")}async function Py(){Ly(),await wy();try{const e=await fetch("similapunktur.json");e.ok&&(at=await e.json(),console.log(`Loaded ${at.length} points from static JSON.`),at.forEach(t=>{t.general_analysis_rubrics&&t.general_analysis_rubrics.forEach(n=>{let i=oa.get(n.rubric_name);i||(i=new Map,oa.set(n.rubric_name,i)),n.remedies&&n.remedies.forEach(r=>{const a=i.get(r.name)||0;r.grade>a&&i.set(r.name,r.grade)})})}),location.hostname!=="localhost"&&location.hostname!=="127.0.0.1"&&(vs=!0),Ay())}catch(e){console.warn("Failed to load static similapunktur.json, falling back to API.",e)}await Ry(),Oy(),await Fy();const s=Fi.querySelector("li");if(s){const e=s.dataset.name||"";va(e,s)}}function Ly(){Fi.innerHTML="",or.forEach(s=>{const e=document.createElement("li");e.dataset.id=s.id,e.dataset.name=s.name,e.innerHTML=`
      <div class="point-title-row">
        <span>${s.name}</span>
      </div>
    `,e.addEventListener("click",()=>va(s.name,e)),Fi.appendChild(e)})}function vo(s){return Yl(at.filter(e=>e.meridian===s).map(e=>({id:e.point_id,name_de:e.name_german,translation:e.name_translation,meridian:e.meridian,warning:e.precautions_or_contraindications,visuals:e.visuals})))}async function va(s,e){Fi.querySelectorAll("li").forEach(n=>n.classList.remove("active")),e.classList.add("active"),eu=s;const t=or.find(n=>n.name===s);t&&we&&(we.toggleMeridian(t.id,!0),_a());try{if(vs&&at.length>0)Rn=vo(s);else try{const n=await fetch(`/api/points-by-meridian?name=${encodeURIComponent(s)}`);if(!n.ok)throw new Error(`HTTP ${n.status}`);const i=await n.json();if(i.error)throw new Error(i.error);const r=new Set(i.points.map(o=>o.id)),a=vo(s).filter(o=>!r.has(o.id));Rn=Yl([...i.points,...a])}catch{vs=!0,Rn=vo(s)}if(Rn.length>0){const n=Rn[0].visuals.image_filename;yy.src=`assets/${n}`,vy.style.display="none",xy.style.display="inline-block",ti(),ky()}}catch(n){console.error("Error loading meridian points:",n)}}function Yl(s){return[...s].sort((e,t)=>{const n=/^([A-Z]+)_(\d+)(.*)$/,i=e.id.match(n),r=t.id.match(n);if(i&&r){if(i[1]!==r[1])return i[1].localeCompare(r[1]);const a=parseInt(i[2],10),o=parseInt(r[2],10);return a!==o?a-o:i[3].localeCompare(r[3])}return e.id.localeCompare(t.id)})}function ti(){if(we&&we.setHighlightedPoints(rn,Cn),!bi)return;bi.innerHTML="";const s=document.getElementById("meridian-connections-svg");if(s&&(s.innerHTML="",Rn.length>=2)){const n=Yl(Rn).filter(i=>{const r=i.visuals.relative_coordinates;return!(r.x_percent===50&&r.y_percent===50)});for(let i=0;i<n.length-1;i++){const r=n[i],a=n[i+1],o=r.visuals.relative_coordinates.x_percent,l=r.visuals.relative_coordinates.y_percent,c=a.visuals.relative_coordinates.x_percent,d=a.visuals.relative_coordinates.y_percent,h=document.createElementNS("http://www.w3.org/2000/svg","line");h.setAttribute("x1",`${o}`),h.setAttribute("y1",`${l}`),h.setAttribute("x2",`${c}`),h.setAttribute("y2",`${d}`),h.setAttribute("class","meridian-line"),s.appendChild(h)}}const e=rn.size>0;Rn.forEach(t=>{const n=t.visuals.relative_coordinates.x_percent,i=t.visuals.relative_coordinates.y_percent,r=document.createElement("div");r.className="hotspot-group",r.dataset.id=t.id,r.style.left=`${n}%`,r.style.top=`${i}%`,Cn.size>0?Cn.has(t.id)?r.classList.add("recommended"):r.classList.add("dimmed"):e&&(rn.has(t.id)?r.classList.add("matched"):r.classList.add("dimmed")),t.id===yi&&r.classList.add("active");const o=document.createElement("div");o.className="hotspot-outer";const l=document.createElement("div");l.className="hotspot-inner",r.appendChild(o),r.appendChild(l),r.addEventListener("mouseenter",c=>Ny(t.name_de,t.translation,c)),r.addEventListener("mousemove",c=>cu(c)),r.addEventListener("mouseleave",()=>Uy()),r.addEventListener("click",()=>zn(t.id,!0)),bi.appendChild(r)})}async function zn(s,e=!0){if(yi=s,Ni=s,at&&at.length>0){const t=at.find(n=>n.point_id===s);if(t&&t.meridian){const n=Fi.querySelector("li.active"),i=n?n.dataset.name:"";if(t.meridian!==i){const r=Fi.querySelector(`li[data-name="${t.meridian}"]`);r&&await va(t.meridian,r)}}}we&&(we.selectPoint(s,e),_a()),bi.querySelectorAll(".hotspot-group").forEach(t=>{const n=t;n.dataset.id===s?n.classList.add("active"):n.classList.remove("active")}),document.querySelectorAll(".selector-list li").forEach(t=>{var i;const n=t;n.dataset.id===s?n.classList.add("active"):((i=n.parentElement)==null?void 0:i.id)!=="meridian-list"&&n.classList.remove("active")});try{const t=at.find(n=>n.point_id===s);if(vs&&t)xo(t);else try{const n=await fetch(`/api/point-details?id=${s}`);if(!n.ok)throw new Error(`HTTP ${n.status}`);const i=await n.json();if(i.error)throw new Error(i.error);xo(i)}catch{t&&xo(t)}}catch(t){console.error("Error loading point details:",t)}}function Iy(s){var l,c,d;const e=document.getElementById("original-drawing-modal"),t=document.getElementById("original-drawing-title"),n=document.getElementById("original-drawing-subtitle"),i=document.getElementById("original-drawing-img"),r=document.getElementById("original-drawing-marker"),a=document.getElementById("original-drawing-caption");if(!e||!i)return;const o=((l=s==null?void 0:s.visuals)==null?void 0:l.image_filename)||((c=we==null?void 0:we.getPointData((s==null?void 0:s.point_id)||""))==null?void 0:c.image_filename)||"meridian_herz.png";if(i.src=`assets/${o}`,t&&(t.textContent=`Originalzeichnung – ${s.meridian||"Leitbahn"} (${On(s.point_id)})`),n&&(n.textContent=`${s.name_german}${s.name_translation?" – „"+s.name_translation+"“":""} | Datei: out/assets/${o}`),r){const h=(d=s==null?void 0:s.visuals)==null?void 0:d.relative_coordinates;h&&!(h.x_percent===50&&h.y_percent===50)?(r.style.left=`${h.x_percent}%`,r.style.top=`${h.y_percent}%`,r.style.display="block"):r.style.display="none"}if(a){const h=s.assigned_homeopathics&&s.assigned_homeopathics.length>0?s.assigned_homeopathics.join(", "):"Siehe Rubriken";a.innerHTML=`
      <strong>Lokalisation (${s.name_german}):</strong> ${s.localisation_text||"—"}<br>
      <strong>Zugeordnete Similapunktur-Mittel:</strong> ${h}
    `}e.style.display="flex"}let vl=null;function xo(s){var h,u;vl=s,gl.style.display="none",xi.style.display="flex";const e=xi.querySelectorAll(".detail-section"),t=xi.querySelector(".detail-tabs");e.forEach(f=>f.style.display="block"),t&&(t.style.display="block");const n=document.getElementById("remedy-details-view");n&&(n.style.display="none");const i=s.precautions_or_contraindications;i?(Ey.textContent=i,_l.style.display="flex"):_l.style.display="none",iu.textContent=On(s.point_id),su.textContent=s.meridian,ru.textContent=s.name_german,au.textContent=s.name_translation||"Ohne Übersetzung",Ty.textContent=s.localisation_text;const r=document.getElementById("point-flip-box");r&&r.classList.remove("flipped");const a=document.getElementById("flip-front-title");if(a){const f=s.name_chinese?` (${s.name_chinese})`:"";a.textContent=`${s.name_german}${f}`}const o=document.getElementById("flip-remedies-summary");if(o)if(s.assigned_homeopathics&&s.assigned_homeopathics.length>0)o.textContent=s.assigned_homeopathics.slice(0,5).join(", ");else if(s.general_analysis_rubrics&&s.general_analysis_rubrics.length>0){const f=(s.general_analysis_rubrics[0].remedies||[]).slice(0,4).map(g=>g.name);o.textContent=f.length>0?f.join(", "):"Über Rubriken"}else o.textContent="Keine Direktzuordnung";const l=document.getElementById("flip-polarity-summary");if(l){const g=["Herz-Leitbahn","Lungen-Leitbahn","Perikard-Leitbahn","Nieren-Leitbahn","Leber-Leitbahn","Milz-Pankreas-Leitbahn","Konzeptionsgefäß"].includes(s.meridian)?"Yin-Leitbahn (Innen/Tiefe)":"Yang-Leitbahn (Außen/Dynamik)";l.textContent=g}const c=document.getElementById("flip-coords-3d");if(c){const f=we==null?void 0:we.getPointData(s.point_id);c.textContent=f?`[${f.position.map(g=>g.toFixed(3)).join(", ")}]`:"—"}const d=document.getElementById("flip-meridian-ref");if(d){const f=((h=s.visuals)==null?void 0:h.image_filename)||((u=we==null?void 0:we.getPointData(s.point_id))==null?void 0:u.image_filename)||"meridian_herz.png";d.textContent=f}po.innerHTML="",s.effects&&s.effects.length>0?s.effects.forEach(f=>{const g=document.createElement("li");g.textContent=f;const y=document.createElement("span");y.className="add-symptom-trigger",y.innerHTML="+",y.title="Symptom zum Fall hinzufügen",y.addEventListener("click",()=>Si(f)),g.appendChild(y),po.appendChild(g)}):po.innerHTML="<li>Keine Wirkungen hinterlegt.</li>",mo.innerHTML="",s.indications&&s.indications.length>0?s.indications.forEach(f=>{const g=document.createElement("li");g.textContent=f;const y=document.createElement("span");y.className="add-symptom-trigger",y.innerHTML="+",y.title="Indikation zum Fall hinzufügen",y.addEventListener("click",()=>Si(f)),g.appendChild(y),mo.appendChild(g)}):mo.innerHTML="<li>Keine Indikationen hinterlegt.</li>",go.innerHTML="<p style='font-size: 12.5px; margin-bottom: 10px; color: var(--color-text-muted); font-style: italic;'>Heilmittel zur Massage an diesem Punkt:</p>",s.assigned_homeopathics&&s.assigned_homeopathics.length>0?s.assigned_homeopathics.forEach(f=>{const g=document.createElement("span");g.className="badge-remedy clickable",g.textContent=f,g.title="Klicken für Heilmittel-Details",g.addEventListener("click",()=>rr(f)),go.appendChild(g)}):go.innerHTML="<p>Keine spezifischen Homöopathika zugeordnet.</p>",_o.innerHTML="",s.general_analysis_rubrics&&s.general_analysis_rubrics.length>0?s.general_analysis_rubrics.forEach((f,g)=>{const y=document.createElement("div");y.className="accordion-item";const p=document.createElement("div");p.className="accordion-header";const m=document.createElement("span");m.textContent=f.rubric_name,p.appendChild(m);const S=document.createElement("span");S.className="add-symptom-trigger",S.innerHTML="+",S.title="Rubrik zum Fall hinzufügen",S.addEventListener("click",b=>{b.stopPropagation(),Si(f.rubric_name)}),p.appendChild(S);const T=document.createElement("div");T.className="accordion-body";const _=document.createElement("div");_.className="remedies-list-pills",f.remedies.forEach(b=>{const E=document.createElement("span");E.className=`pill-subremedy grade-${b.grade} clickable`,E.textContent=b.name,E.title="Klicken für Heilmittel-Details",E.addEventListener("click",()=>rr(b.name));const w=b.name.toLowerCase().replace(".",""),v=un?un.toLowerCase().replace(".",""):"";v&&(w===v||w.startsWith(v))&&E.classList.add("bold"),_.appendChild(E)}),T.appendChild(_),y.appendChild(p),y.appendChild(T),p.addEventListener("click",()=>{y.classList.toggle("active")}),g===0&&y.classList.add("active"),_o.appendChild(y)}):_o.innerHTML="<p>Keine Rubriken der Allgemein-Analyse hinterlegt.</p>"}function Dy(s){return fl(s,ir)}async function xl(s){if(un=s.trim(),!un){xa();return}ga.style.display="block";try{let e={},t=[];if((vs||gn.boericke||gn.ttb)&&(at.length>0||wt||Un)){const a=un.toLowerCase(),o=Dy(a),l=new Map;if(gn.points&&at.forEach(c=>{var h,u,f;(h=c.effects)==null||h.forEach(g=>{(g.toLowerCase().includes(a)||o.some(p=>g.toLowerCase().includes(p)))&&(l.has(g)||l.set(g,{text:g,is_ttb:!1,points:[]}),l.get(g).points.push({id:c.point_id,name_de:c.name_german,meridian:c.meridian,type:"wirkung"}))}),(u=c.indications)==null||u.forEach(g=>{(g.toLowerCase().includes(a)||o.some(p=>g.toLowerCase().includes(p)))&&(l.has(g)||l.set(g,{text:g,is_ttb:!1,points:[]}),l.get(g).points.push({id:c.point_id,name_de:c.name_german,meridian:c.meridian,type:"indikation"}))}),c.general_analysis_rubrics&&c.general_analysis_rubrics.forEach(g=>{(g.rubric_name.toLowerCase().includes(a)||o.some(p=>g.rubric_name.toLowerCase().includes(p)))&&(l.has(g.rubric_name)||l.set(g.rubric_name,{text:g.rubric_name,is_ttb:!1,points:[]}),l.get(g.rubric_name).points.push({id:c.point_id,name_de:c.name_german,meridian:c.meridian,type:"rubrik"}))});const d=(f=c.assigned_homeopathics)==null?void 0:f.find(g=>g.toLowerCase().replace(".","").includes(a.replace(".","")));d&&t.push({id:c.point_id,name_de:c.name_german,meridian:c.meridian,sources:[d]})}),gn.boericke&&(await Jl(),wt!=null&&wt.rubrics)){const c=a.startsWith("[boericke] ")?a.substring(11):a,d=c.split(/\s+/).filter(h=>h.length>=2);wt.rubrics.forEach(h=>{const u=h.full_path.toLowerCase();if(d.length>1?d.every(g=>u.includes(g)):u.includes(c)){const g=`[Boericke] ${h.full_path}`;l.set(g,{text:g,is_ttb:!1,points:[]})}})}if(gn.ttb&&(await Zl(),Un)){const c=a.startsWith("[ttb] ")?a.substring(6):a;Object.keys(Un).forEach(d=>{d.toLowerCase().includes(c)&&l.set(`[TTB] ${d}`,{text:`[TTB] ${d}`,is_ttb:!0,points:[]})})}l.forEach((c,d)=>{const h=Jh(d);e[h]||(e[h]=[]),e[h].push({text:c.text,score:1,is_ttb:c.is_ttb,points:c.points})})}else e=(await(await fetch(`/api/search-symptoms?q=${encodeURIComponent(un)}`)).json()).grouped_matches||{},t=(await(await fetch(`/api/points-by-remedy?name=${encodeURIComponent(un)}`)).json()).points||[];uo.innerHTML="";const n=new Set,i=Object.keys(e);if(i.sort(),i.forEach(a=>{const o=e[a];if(!o||o.length===0)return;o.forEach(h=>{h.points&&h.points.forEach(u=>n.add(u.id))});const l=document.createElement("details");l.className="category-details",l.open=!0;const c=document.createElement("summary");c.className="category-summary",c.innerHTML=`
        <span class="category-title">${a}</span>
        <span class="category-badge">${o.length}</span>
      `,l.appendChild(c);const d=document.createElement("ul");d.className="category-symptom-list",o.forEach(h=>{const u=document.createElement("li");u.className="symptom-search-item";let f="";h.points&&h.points.length>0&&(f=`
            <div class="symptom-points-row">
              ${h.points.map(S=>`<span class="symptom-point-badge clickable" data-id="${S.id}">${S.name_de}</span>`).join("")}
            </div>
          `);const g=h.is_ttb,y=g?h.text.replace("[TTB] ",""):h.text,p=h.score&&h.score<1?` <span class="symptom-score">${Math.round(h.score*100)}%</span>`:"";u.innerHTML=`
          <div class="symptom-title-row">
            <span class="symptom-text-label">
              ${g?'<span class="ttb-badge" title="Bönninghausen TTB Rubrik">TTB</span> ':""}
              ${y}${p}
            </span>
            <button class="add-symptom-btn" title="Zum Fall hinzufügen">+</button>
          </div>
          ${f}
        `,u.addEventListener("mouseenter",()=>{rn.clear(),h.points&&h.points.forEach(S=>rn.add(S.id)),ti()}),u.addEventListener("mouseleave",()=>{rn.clear(),n.forEach(S=>rn.add(S)),ti()});const m=u.querySelector(".add-symptom-btn");m&&m.addEventListener("click",S=>{S.stopPropagation(),Si(h.text)}),u.querySelectorAll(".symptom-point-badge").forEach(S=>{S.addEventListener("click",T=>{T.stopPropagation();const _=S.dataset.id;_&&zn(_)})}),d.appendChild(u)}),l.appendChild(d),uo.appendChild(l)}),t&&t.length>0){t.forEach(c=>n.add(c.id));const a=document.createElement("details");a.className="category-details",a.open=!0;const o=document.createElement("summary");o.className="category-summary remedy-summary",o.innerHTML=`
        <span class="category-title">Zugeordnete Akupunkturpunkte</span>
        <span class="category-badge remedy-badge">${t.length}</span>
      `,a.appendChild(o);const l=document.createElement("ul");l.className="category-symptom-list",t.forEach(c=>{const d=document.createElement("li");d.className="remedy-search-item clickable",d.dataset.id=c.id,c.id===yi&&d.classList.add("active");const h=c.sources?c.sources.join(", "):"Heilmittel";d.innerHTML=`
          <div class="point-title-row">
            <span>${c.name_de}</span>
            <span class="point-id-badge">${On(c.id)}</span>
          </div>
          <div class="point-sub">Zugeordnetes Heilmittel: ${h}</div>
        `,d.addEventListener("click",()=>zn(c.id)),l.appendChild(d)}),a.appendChild(l),uo.appendChild(a)}rn.clear(),n.forEach(a=>rn.add(a)),ti(),by.textContent=n.size.toString(),Sy.textContent=`"${un}"`;const r=document.getElementById("tab-search-btn");r&&(r.style.display="inline-flex"),as("search")}catch(e){console.error("Search failed:",e)}}function xa(){un="",wn.value="",ga.style.display="none",My.style.display="none",eu&&la&&(la.style.display="block"),rn.clear(),ti();const s=document.getElementById("tab-search-btn");s&&(s.style.display="none"),as("navigation")}function Ny(s,e,t){fn||(fn=document.createElement("div"),fn.className="hotspot-tooltip",document.body.appendChild(fn));const n=e?` (${e})`:"";fn.textContent=`${s}${n}`,fn.style.display="block",cu(t)}function cu(s){fn&&(fn.style.left=`${s.pageX+12}px`,fn.style.top=`${s.pageY+12}px`)}function Uy(){fn&&(fn.style.display="none")}function Oy(){Kl.addEventListener("click",()=>{const k=document.documentElement.getAttribute("data-theme")==="dark"?"light":"dark";document.documentElement.setAttribute("data-theme",k),k==="dark"?(Jd.style.display="none",jd.style.display="block"):(Jd.style.display="block",jd.style.display="none"),we&&we.setTheme(k)});const s=document.querySelectorAll(".view-mode-btn"),e=document.getElementById("visualizer-stage"),t=document.getElementById("viewer-3d-controls"),n=document.getElementById("meridian-filter-bar");s.forEach(I=>{I.addEventListener("click",()=>{const k=I.dataset.viewMode||"3d";s.forEach(ve=>ve.classList.remove("active")),I.classList.add("active"),e&&(e.classList.remove("mode-book","mode-3d","mode-split","mode-2d"),e.classList.add(`mode-${k}`));const ie=k==="3d"||k==="split";t&&(t.style.display=ie?"flex":"none"),n&&(n.style.display=ie?"flex":"none"),ie&&setTimeout(()=>{we==null||we.handleResize()},60)})}),document.querySelectorAll(".cam-preset-btn[data-cam-preset]").forEach(I=>{I.addEventListener("click",()=>{const k=I.dataset.camPreset;k&&we&&we.focusCameraPreset(k)})});const i=document.getElementById("v3d-mode-anatomy-btn"),r=document.getElementById("v3d-mode-skeleton-btn"),a=document.getElementById("v3d-mode-clinical-btn"),o=document.getElementById("xray-toggle-btn"),l=I=>{i==null||i.classList.toggle("active",I==="anatomy"),r==null||r.classList.toggle("active",I==="skeleton"),a==null||a.classList.toggle("active",I==="clinical"),o==null||o.classList.toggle("active",I==="xray")};i&&i.addEventListener("click",()=>{we&&(we.setDisplayMode("anatomy"),l("anatomy"))}),r&&r.addEventListener("click",()=>{we&&(we.setDisplayMode("skeleton"),l("skeleton"))}),a&&a.addEventListener("click",()=>{we&&(we.setDisplayMode("clinical"),l("clinical"))}),o&&o.addEventListener("click",()=>{if(!we)return;const k=we.getDisplayMode()==="xray"?"anatomy":"xray";we.setDisplayMode(k),l(k)});const c=document.getElementById("v3d-bilateral-btn");c&&c.addEventListener("click",()=>{if(!we)return;const I=we.toggleBilateral();c.classList.toggle("active",I),si(I?"Bilaterale Spiegelung (beide Körperseiten) aktiviert":"Unilaterale Leitbahn-Darstellung aktiviert")}),document.querySelectorAll(".meridian-filter-chip.preset-chip").forEach(I=>{I.addEventListener("click",()=>{if(!we)return;const k=I.dataset.filterPreset;k==="pilot"?(we.setVisibleMeridians(["herz","lunge"]),we.focusCameraPreset("pilot_arm")):k==="all"&&(we.setVisibleMeridians(or.map(ie=>ie.id)),we.focusCameraPreset("full")),_a()})});const d=document.getElementById("point-flip-box");d&&(d.addEventListener("click",()=>{d.classList.toggle("flipped")}),d.addEventListener("keydown",I=>{(I.key==="Enter"||I.key===" ")&&(I.preventDefault(),d.classList.toggle("flipped"))}));const h=document.getElementById("show-original-drawing-btn"),u=document.getElementById("close-original-drawing-btn"),f=document.getElementById("original-drawing-modal");h&&h.addEventListener("click",()=>{vl&&Iy(vl)}),u&&f&&(u.addEventListener("click",()=>{f.style.display="none"}),f.addEventListener("click",I=>{I.target===f&&(f.style.display="none")}));let g;wn.addEventListener("input",()=>{clearTimeout(g);const I=wn.value;yo(I),g=setTimeout(()=>{xl(I)},250)}),ga.addEventListener("click",()=>{xa();const I=document.getElementById("search-suggestions");I&&(I.style.display="none")});const y=document.querySelectorAll(".tab-btn");y.forEach(I=>{I.addEventListener("click",()=>{y.forEach(ve=>ve.classList.remove("active")),I.classList.add("active");const k=I.getAttribute("data-tab");document.querySelectorAll(".tab-pane").forEach(ve=>{ve.id===k?ve.classList.add("active"):ve.classList.remove("active")})})}),wn.addEventListener("focus",()=>{yo(wn.value)}),wn.addEventListener("keydown",I=>{const k=document.getElementById("search-suggestions");if(!k||k.style.display==="none")return;const ie=k.querySelectorAll(".suggestion-item");if(ie.length!==0)if(I.key==="ArrowDown")I.preventDefault(),Kn=(Kn+1)%ie.length,Qd(ie);else if(I.key==="ArrowUp")I.preventDefault(),Kn=(Kn-1+ie.length)%ie.length,Qd(ie);else if(I.key==="Enter"){if(Kn>=0&&Kn<ie.length){I.preventDefault();const fe=ie[Kn].textContent||"";hu(fe)}}else I.key==="Escape"&&(k.style.display="none")}),document.addEventListener("click",I=>{const k=document.getElementById("search-suggestions");k&&!wn.contains(I.target)&&!k.contains(I.target)&&(k.style.display="none")}),document.querySelectorAll("#search-sources-bar .source-filter-chip").forEach(I=>{I.addEventListener("click",()=>{const k=I.dataset.source;if(!k)return;const ie=!gn[k],ve=Object.values(gn).filter(Boolean).length;if(!ie&&ve<=1){si("Mindestens eine Suchquelle muss aktiv bleiben.");return}gn[k]=ie,I.classList.toggle("active",ie),yl(),wn.value.trim().length>=2&&yo(wn.value),un&&xl(un)})});const m=document.getElementById("close-matrix-btn"),S=document.getElementById("matrix-modal");m&&S&&m.addEventListener("click",()=>{S.style.display="none"});const T=document.getElementById("open-matrix-btn");T&&S&&T.addEventListener("click",()=>{S.style.display="flex",Gy()});const _=document.getElementById("tab-nav-btn"),b=document.getElementById("tab-remedies-btn"),E=document.getElementById("tab-search-btn"),w=document.getElementById("tab-rep-btn");_&&_.addEventListener("click",()=>as("navigation")),b&&b.addEventListener("click",()=>as("remedies-list")),E&&E.addEventListener("click",()=>as("search")),w&&w.addEventListener("click",()=>as("repertorisation"));const v=document.getElementById("remedy-tab-search-input");v&&v.addEventListener("input",I=>{const k=I.target.value;ou(k)});const A=document.getElementById("version-badge"),C=document.getElementById("version-modal"),L=document.getElementById("close-version-btn");A&&C&&L&&(A.addEventListener("click",()=>{C.style.display="flex"}),L.addEventListener("click",()=>{C.style.display="none"}));const B=document.getElementById("feedback-toggle"),V=document.getElementById("feedback-modal"),O=document.getElementById("close-feedback-btn");B&&V&&O&&(B.addEventListener("click",()=>{V.style.display="flex";const I=document.getElementById("feedback-subject");I&&(Ni?I.value=`Feedback zu Akupunkturpunkt ${On(Ni)}`:I.value="")}),O.addEventListener("click",()=>{V.style.display="none"}));const G=document.getElementById("feedback-github-btn"),J=document.getElementById("feedback-email-btn"),X=document.getElementById("feedback-form");G&&X&&G.addEventListener("click",()=>{if(!X.reportValidity())return;const I=document.getElementById("feedback-category").value,k=document.getElementById("feedback-subject").value,ie=document.getElementById("feedback-body").value,ve=`[${I}] ${k}`,fe=`### Kategorie
${I}

### Beschreibung
${ie}

---
*Feedback gesendet aus Similapunktur Leitfaden App*`,Ue=`https://github.com/aosl1906/similapunktur-/issues/new?title=${encodeURIComponent(ve)}&body=${encodeURIComponent(fe)}`;window.open(Ue,"_blank"),V.style.display="none",X.reset()}),J&&X&&J.addEventListener("click",()=>{if(!X.reportValidity())return;const I=document.getElementById("feedback-category").value,k=document.getElementById("feedback-subject").value,ie=document.getElementById("feedback-body").value,ve="aosl1@gmx.de",fe=`[Similapunktur Feedback] [${I}] ${k}`,Ue=`mailto:${ve}?subject=${encodeURIComponent(fe)}&body=${encodeURIComponent(ie)}`;window.location.href=Ue,V.style.display="none",X.reset()});const ne=document.getElementById("dev-review-toggle"),q=document.getElementById("dev-review-modal"),Q=document.getElementById("close-dev-review-btn");ne&&q&&Q&&(ne.addEventListener("click",async()=>{q.style.display="flex",await Zl(),await fu(),Vy()}),Q.addEventListener("click",()=>{q.style.display="none"}));const ee=document.getElementById("curation-workbench-toggle"),Pe=document.getElementById("curation-workbench-modal");ee&&Pe&&ee.addEventListener("click",async()=>{ho||(ho=new cy({modalEl:Pe,getAllPoints:()=>at,getBoerickeData:()=>wt,ensureBoerickeLoaded:Jl,onDataUpdated:()=>{Mi==null||Mi.refresh(),sr(),yi&&zn(yi)}})),await ho.open()});const Ee=document.querySelectorAll(".dev-tab-btn");Ee.forEach(I=>{I.addEventListener("click",()=>{Ee.forEach(ve=>ve.classList.remove("active")),I.classList.add("active");const k=I.getAttribute("data-dev-tab");document.querySelectorAll(".dev-tab-pane").forEach(ve=>{ve.id===k?ve.style.display="block":ve.style.display="none"});const ie=document.getElementById("dev-review-search");ie&&(ie.value=""),nh()})});const et=document.getElementById("dev-review-search");et&&et.addEventListener("input",()=>{nh()});const We=document.getElementById("editor-toggle");We&&We.addEventListener("click",()=>{lu(!_i)}),bi.addEventListener("click",I=>{if(!_i||!yi)return;const k=I.target;if(k.classList.contains("hotspot-inner")||k.classList.contains("hotspot-outer"))return;const ie=bi.getBoundingClientRect(),ve=I.clientX-ie.left,fe=I.clientY-ie.top,Ue=parseFloat((ve/ie.width*100).toFixed(2)),vt=parseFloat((fe/ie.height*100).toFixed(2));By(yi,Ue,vt)}),document.querySelectorAll(".modality-chip").forEach(I=>{I.addEventListener("click",()=>{const k=I.getAttribute("data-rubric");k&&(us.has(k)?(us.delete(k),I.classList.remove("active")):(us.add(k),I.classList.add("active")),sr())})})}function Qd(s){s.forEach((e,t)=>{t===Kn?(e.classList.add("selected"),e.scrollIntoView({block:"nearest"})):e.classList.remove("selected")})}function yl(){const s=[];gn.boericke&&s.push(...pl),gn.ttb&&s.push(...ml),gn.points&&s.push(...Kr),tu=s}async function Fy(){if(await Jl(),wt!=null&&wt.rubrics){const s=new Set;wt.rubrics.forEach(e=>{e.full_path&&s.add(`[Boericke] ${e.full_path}`)}),pl=Array.from(s)}if(at.length>0){const s=new Set;if(at.forEach(e=>{e.effects&&e.effects.forEach(t=>{t&&t.length<120&&s.add(t.trim())}),e.indications&&e.indications.forEach(t=>{t&&t.length<120&&s.add(t.trim())}),e.general_analysis_rubrics&&e.general_analysis_rubrics.forEach(t=>{t.rubric_name&&t.rubric_name.length<120&&s.add(t.rubric_name.trim())})}),Kr=Array.from(s),await Zl(),Un){const e=new Set;Object.keys(Un).forEach(t=>{t&&t.length<120&&e.add(`[TTB] ${t.trim()}`)}),ml=Array.from(e)}yl(),console.log(`Suggestions ready: Boericke=${pl.length}, TTB=${ml.length}, Punkte=${Kr.length}`);return}try{Kr=(await(await fetch("/api/symptom-suggestions")).json()).suggestions||[],yl()}catch(s){console.error("Failed to load suggestions:",s)}}function du(s,e){const t=e.trim().split(/\s+/).filter(i=>i.length>=2).map(i=>i.replace(/[.*+?^${}()|[\]\\]/g,"\\$&"));if(t.length===0)return s;const n=new RegExp(`(${t.join("|")})`,"gi");return s.replace(n,"<strong>$1</strong>")}function eh(s,e,t,n,i=!1){const r=document.createElement("div");r.className=i?"suggestion-item suggestion-child-item":"suggestion-item",r.dataset.fullText=s;const a=s.startsWith("[Boericke] "),o=s.startsWith("[TTB] "),l=document.createElement("span");if(l.className="suggestion-text",l.innerHTML=du(e,t),l.style.flexGrow="1",l.style.cursor="pointer",l.addEventListener("click",d=>{d.stopPropagation(),hu(s)}),r.appendChild(l),!i){if(a){const d=document.createElement("span");d.className="boericke-badge-indicator",d.textContent="Boericke",r.appendChild(d)}else if(o){const d=document.createElement("span");d.className="ttb-badge-indicator",d.textContent="TTB",r.appendChild(d)}}const c=document.createElement("button");return c.className="suggestion-add-btn",c.textContent="+",c.title="Symptom hinzufügen",c.addEventListener("click",d=>{d.stopPropagation(),Si(s),n.style.display="none",xa()}),r.appendChild(c),r}function yo(s){const e=document.getElementById("search-suggestions");if(!e)return;if(!s||s.trim().length<2){e.style.display="none";return}const t=s.trim(),n=uy(tu,t,ir,150);if(n.length===0){e.style.display="none";return}const i=new Map;n.forEach(a=>{const o=a.text;if(o.startsWith("[Boericke] ")){const l=o.substring(11),c=l.split(" > ");if(c.length>=3){const d=`${c[0]} > ${c[1]}`,h=c.slice(2).join(" > "),u=`[Boericke] ${d}`;i.has(u)||i.set(u,{key:u,displayParent:d,isBoericke:!0,directMatchText:null,children:[],bestScore:a.score});const f=i.get(u);f.children.push({fullText:o,childLabel:h,score:a.score}),f.bestScore=Math.max(f.bestScore,a.score)}else if(!i.has(o))i.set(o,{key:o,displayParent:l,isBoericke:!0,directMatchText:o,children:[],bestScore:a.score});else{const d=i.get(o);d.directMatchText=o,d.bestScore=Math.max(d.bestScore,a.score)}}else{const l=o.startsWith("[TTB] ")?o.substring(6):o;i.set(o,{key:o,displayParent:l,isBoericke:!1,directMatchText:o,children:[],bestScore:a.score})}});const r=Array.from(i.values()).sort((a,o)=>o.bestScore-a.bestScore).slice(0,15);e.innerHTML="",Kn=-1,r.forEach((a,o)=>{if(a.children.length===0&&a.directMatchText){const g=eh(a.directMatchText,a.displayParent,t,e,!1);g.dataset.index=o.toString(),e.appendChild(g);return}const l=document.createElement("div");l.className="suggestion-group";const c=document.createElement("div");c.className="suggestion-item suggestion-group-header",c.dataset.index=o.toString(),a.directMatchText&&(c.dataset.fullText=a.directMatchText);const d=document.createElement("span");d.className="suggestion-toggle-icon",d.textContent="▸",c.appendChild(d);const h=document.createElement("span");h.className="suggestion-text",h.innerHTML=du(a.displayParent,t),h.style.flexGrow="1",c.appendChild(h);const u=document.createElement("span");if(u.className="suggestion-count-badge",u.textContent=`${a.children.length}`,u.title=`${a.children.length} Unterrubriken`,c.appendChild(u),a.isBoericke){const g=document.createElement("span");g.className="boericke-badge-indicator",g.textContent="Boericke",c.appendChild(g)}if(a.directMatchText){const g=document.createElement("button");g.className="suggestion-add-btn",g.textContent="+",g.title="Übergeordnete Rubrik hinzufügen",g.addEventListener("click",y=>{y.stopPropagation(),Si(a.directMatchText),e.style.display="none",xa()}),c.appendChild(g)}const f=document.createElement("div");f.className="suggestion-children",f.style.display="none",a.children.forEach(g=>{const y=eh(g.fullText,g.childLabel,t,e,!0);f.appendChild(y)}),c.addEventListener("click",g=>{g.stopPropagation();const y=f.style.display!=="none";f.style.display=y?"none":"block",d.textContent=y?"▸":"▾",c.classList.toggle("expanded",!y)}),l.appendChild(c),l.appendChild(f),e.appendChild(l)}),e.style.display="block"}function hu(s){wn.value=s,ga.style.display="block";const e=document.getElementById("search-suggestions");e&&(e.style.display="none"),xl(s)}async function By(s,e,t){var n;try{const r=await(await fetch("/api/update-point-coordinate",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({point_id:s,x_percent:e,y_percent:t})})).json();if(r.success){const a=Rn.find(l=>l.id===s);a&&(a.visuals.relative_coordinates.x_percent=e,a.visuals.relative_coordinates.y_percent=t);const o=at.find(l=>l.point_id===s);(n=o==null?void 0:o.visuals)!=null&&n.relative_coordinates&&(o.visuals.relative_coordinates.x_percent=e,o.visuals.relative_coordinates.y_percent=t),ti(),si(`Punkt ${s} neu platziert!`)}else alert("Fehler beim Speichern der Koordinaten: "+r.error)}catch(i){console.error("Failed to save coordinate:",i),alert("Netzwerkfehler beim Speichern der Koordinaten.")}}function On(s){const e=s.split("_"),t=e[0],n=e[1]||"",r=s.includes("_MANN")?" (Felix Mann)":"";return({HE:`HE ${n} (HT ${n}/H ${n})`,SI:`SI ${n} (Dü ${n})`,BL:`BL ${n} (B ${n})`,KI:`KI ${n} (K ${n})`,PC:`PC ${n} (KS ${n})`,TE:`TE ${n} (SJ ${n}/3E ${n})`,GB:`GB ${n} (G ${n})`,LR:`LR ${n} (LV ${n}/Le ${n})`,LU:`LU ${n} (L ${n})`,LI:`LI ${n} (Di ${n})`,ST:`ST ${n} (M ${n})`,SP:`SP ${n} (MP ${n})`,CV:`CV ${n} (KG ${n}/Ren ${n})`,GV:`GV ${n} (LG ${n}/Du ${n})`,EX:`EX ${n}`}[t]||s.replace("_"," "))+r}function ky(){!fo||!la||(fo.innerHTML="",Rn.forEach(s=>{const e=document.createElement("li");e.dataset.id=s.id,s.id===yi&&e.classList.add("active"),e.innerHTML=`
      <div class="point-title-row">
        <span>${s.name_de}</span>
        <span class="point-id-badge">${On(s.id)}</span>
      </div>
    `,e.addEventListener("click",()=>{zn(s.id)}),fo.appendChild(e)}),la.style.display="block")}function si(s){let e=document.getElementById("editor-toast");e||(e=document.createElement("div"),e.id="editor-toast",e.className="editor-toast",document.body.appendChild(e)),e.textContent=s,e.classList.add("show"),setTimeout(()=>{e==null||e.classList.remove("show")},3e3)}function Si(s){if(s=s.trim(),!s)return;if(Ot.some(t=>t.text.toLowerCase()===s.toLowerCase())){si("Symptom bereits im Fall vorhanden!");return}const e="sym_"+Math.random().toString(36).substr(2,9);Ot.push({id:e,text:s,weight:1}),uu(),sr(),si(`Symptom "${s}" hinzugefügt.`)}function zy(s){const e=Ot.find(n=>n.id===s),t=e?e.text:"";Ot=Ot.filter(n=>n.id!==s),uu(),sr(),t&&si(`Symptom "${t}" entfernt.`)}function Hy(s,e){const t=Ot.find(n=>n.id===s);t&&(t.weight=e,sr(),si(`Gewichtung für "${t.text}" geändert auf x${e}.`))}const th={kopfschmerzen:["Stirnkopfschmerz","Schläfenkopfschmerzen","Hinterkopfschmerz","Halbseitenkopfschmerz, Migräne"],kopfschmerz:["Stirnkopfschmerz","Schläfenkopfschmerzen","Hinterkopfschmerz","Halbseitenkopfschmerz, Migräne"],kopf:["Kopfschmerzen","Völle, Schwere im Kopf","Kälte der Glieder, mit heißem Kopf","Blutandrang zum Kopf mit heftigem Kopfschmerz"],herzbeschwerden:["Schmerzen in der Herzgegend","Angina pectoris","Herzklopfen","Brustschmerz"],schlafstörungen:["Schlaflosigkeit","Einschlafstörungen","Unruhiger Schlaf","Alpträume"],magenbeschwerden:["Sodbrennen","Magenschmerz","Übelkeit, Erbrechen","Völlegefühl im Magen"]};function uu(){var o;const s=document.getElementById("symptom-basket-placeholder"),e=document.getElementById("selected-symptoms-list"),t=document.getElementById("repertorisation-results");if(!s||!e||!t)return;Mi==null||Mi.refreshSelectionState();const n=document.getElementById("basket-badge");if(n&&(Ot.length>0?(n.textContent=Ot.length.toString(),n.style.display="inline-flex",n.classList.remove("pulse-animation"),n.offsetWidth,n.classList.add("pulse-animation")):n.style.display="none"),Ot.length===0){s.style.display="block",e.style.display="none",t.style.display="none";const l=document.getElementById("symptom-refinement-container");l&&(l.innerHTML=""),us.clear(),e.innerHTML="";return}s.style.display="none",e.style.display="flex",t.style.display="block",e.innerHTML="",Ot.forEach(l=>{const c=document.createElement("li");c.className="symptom-chip";const d=document.createElement("div");d.className="symptom-chip-body";const h=Jh(l.text),u=document.createElement("span");u.className="symptom-breadcrumb",u.textContent=`${h} >`,d.appendChild(u);const f=document.createElement("span");f.className="symptom-chip-text";const g=l.text.startsWith("[TTB] "),y=l.text.startsWith("[Boericke] "),p=g?l.text.replace("[TTB] ",""):y?l.text.replace("[Boericke] ",""):l.text;f.innerHTML=y?`<span class="basket-boericke-badge" title="Boericke Repertorium">Boericke</span> ${p}`:g?`<span class="basket-ttb-badge" title="Bönninghausen TTB Rubrik">TTB</span> ${p}`:p,f.title=p,d.appendChild(f),c.appendChild(d);const m=document.createElement("div");m.className="symptom-chip-controls";const S=document.createElement("select");S.className="symptom-weight-select",S.title="Gewichtung des Symptoms";for(let _=1;_<=3;_++){const b=document.createElement("option");b.value=_.toString(),b.textContent=`x${_}`,l.weight===_&&(b.selected=!0),S.appendChild(b)}S.addEventListener("change",()=>{Hy(l.id,parseInt(S.value))}),m.appendChild(S);const T=document.createElement("button");T.className="symptom-delete-btn",T.innerHTML="&times;",T.title="Symptom entfernen",T.addEventListener("click",()=>zy(l.id)),m.appendChild(T),c.appendChild(m),e.appendChild(c)});let i=document.getElementById("symptom-refinement-container");i||(i=document.createElement("div"),i.id="symptom-refinement-container",(o=e.parentNode)==null||o.insertBefore(i,e.nextSibling)),i.innerHTML="";let r="",a=[];for(const l of Ot){const c=l.text.replace("[TTB] ","").toLowerCase().trim();if(th[c]){const d=th[c],h=Ot.map(f=>f.text.replace("[TTB] ","").toLowerCase().trim()),u=d.filter(f=>!h.includes(f.toLowerCase().trim()));if(u.length>0){r=l.text,a=u;break}}}if(a.length>0){const l=document.createElement("div");l.className="refinement-box warning-box",l.style.marginTop="12px",l.style.padding="10px",l.style.borderRadius="6px",l.style.backgroundColor="#fff9db",l.style.border="1px solid #ffe3e3",l.innerHTML=`
      <div class="refinement-header" style="font-size: 11.5px; font-weight: 700; color: #b25e00; margin-bottom: 4px; display: flex; align-items: center; gap: 4px;">
        <span>💡</span> <span>Symptom-Verfeinerung</span>
      </div>
      <div style="font-size: 11px; color: var(--color-text-dark); margin-bottom: 8px; line-height: 1.4;">
        Sie haben "${r}" ausgewählt. Möchten Sie dieses für eine präzisere Analyse verfeinern?
      </div>
      <div class="refinement-chips" style="display: flex; flex-wrap: wrap; gap: 6px;">
        ${a.map(c=>`<button class="refinement-suggestion-btn small-btn" data-text="${c}" style="padding: 3px 6px; font-size: 10.5px; border-radius: 4px; border: 1px solid var(--color-primary-teal); background-color: #ffffff; color: var(--color-primary-teal); cursor: pointer; transition: all 0.2s; font-weight: 600;">+ ${c}</button>`).join("")}
      </div>
    `,l.querySelectorAll(".refinement-suggestion-btn").forEach(c=>{c.addEventListener("click",()=>{const d=c.dataset.text;d&&Si(d)}),c.addEventListener("mouseenter",()=>{c.style.backgroundColor="var(--color-primary-teal)",c.style.color="#ffffff"}),c.addEventListener("mouseleave",()=>{c.style.backgroundColor="#ffffff",c.style.color="var(--color-primary-teal)"})}),i.appendChild(l)}}function sr(){if(Ot.length===0){Cn.clear(),ti();return}const s=_y({selectedSymptoms:Ot,allPointsData:at,staticTtbData:Un,staticBoerickeRepData:wt,rubricsRemediesMap:oa,activeModalities:us,synonymsData:ir});ks.clear(),s.contraindications.forEach((n,i)=>ks.set(i,n));const e=document.getElementById("rec-remedies-list");if(e&&(e.innerHTML="",s.remedyScores.slice(0,15).forEach(i=>{const r=ks.has(i.name),a=document.createElement("li"),o=document.createElement("span");o.className=r?"remedy-score-badge clickable contraindicated":"remedy-score-badge clickable";let l=`${i.name} (${i.score})`;if(r){l+=" ⚠️";const c=Array.from(ks.get(i.name)).join(", ");o.title=`Polaritäts-Widerspruch: ${c}. Klicken für Details.`}else o.title="Klicken für Heilmittel-Details";o.textContent=l,o.addEventListener("click",()=>{rr(i.name)}),a.appendChild(o),e.appendChild(a)}),s.remedyScores.length===0&&(e.innerHTML="<li class='dimmed' style='padding: 8px 0;'>Keine passenden Heilmittel gefunden.</li>")),Cn=s.recommendedPointIds,Cn.size===0&&s.remedyScores.length>0&&at.length>0){const n=Qh(s.remedyScores[0].name,at);Cn=new Set(n.direct_points)}ti(),we&&we.setHighlightedPoints(rn,Cn);const t=document.getElementById("rec-points-list");t&&(t.innerHTML="",s.pointScores.slice(0,5).forEach(i=>{const r=document.createElement("li");r.className="recommendation-item",r.dataset.id=i.p.point_id;const a=document.createElement("span");a.className="recommendation-title",a.textContent=`${On(i.p.point_id)} - ${i.p.name_german}`,a.style.cursor="pointer",a.addEventListener("click",()=>{zn(i.p.point_id)}),r.appendChild(a);const o=document.createElement("span");o.className="match-badge",o.textContent=`${i.matchedCount}/${Ot.length}`,r.appendChild(o),t.appendChild(r)}),s.pointScores.length===0&&(t.innerHTML="<li class='dimmed' style='padding: 8px;'>Keine passenden Punkte gefunden.</li>"))}function Gy(){const s=document.getElementById("matrix-table-container");s&&sy({container:s,selectedSymptoms:Ot,allPointsData:at,staticTtbData:Un,staticBoerickeRepData:wt,rubricsRemediesMap:oa,activeModalities:us,remedyContraindications:ks,onRemedyClick:e=>{const t=document.getElementById("matrix-modal");t&&(t.style.display="none"),rr(e)}})}function as(s){const e=document.getElementById("tab-nav-btn"),t=document.getElementById("tab-remedies-btn"),n=document.getElementById("tab-search-btn"),i=document.getElementById("tab-rep-btn"),r=document.getElementById("tab-content-navigation"),a=document.getElementById("tab-content-remedies-list"),o=document.getElementById("tab-content-search"),l=document.getElementById("tab-content-repertorisation");e&&e.classList.toggle("active",s==="navigation"),t&&t.classList.toggle("active",s==="remedies-list"),n&&n.classList.toggle("active",s==="search"),i&&i.classList.toggle("active",s==="repertorisation"),r&&r.classList.toggle("active",s==="navigation"),a&&a.classList.toggle("active",s==="remedies-list"),o&&o.classList.toggle("active",s==="search"),l&&l.classList.toggle("active",s==="repertorisation")}function Yr(s){return Qh(s,at)}async function fu(){if(!fs)try{const s=await fetch("boericke_materia_medica.json");s.ok&&(fs=await s.json(),console.log("Loaded Boericke Materia Medica static database."))}catch(s){console.error("Failed to load static Boericke Materia Medica:",s)}}async function Zl(){if(!Un)try{const s=await fetch("ttb_repertory.json");s.ok&&(Un=await s.json(),console.log("Loaded TTB Bönninghausen Repertory static database."))}catch(s){console.error("Failed to load static TTB Bönninghausen Repertory:",s)}}async function Jl(){var s;if(!wt)try{const e=await fetch("boericke_repertory.json");e.ok&&(wt=await e.json(),console.log(`Loaded Boericke Repertory (${((s=wt==null?void 0:wt.rubrics)==null?void 0:s.length)||0} rubrics).`))}catch(e){console.error("Failed to load static Boericke Repertory:",e)}wt&&!Mi&&(Mi=new oy({dataset:wt,getSelectedSymptoms:()=>Ot,onAddSymptom:e=>{Si(e)},onHighlightPoints:e=>{Ml(e,!0),e.length===1&&zn(e[0])}}))}function Vy(){ry({allPointsData:at,staticBoerickeData:fs,staticTtbData:Un,getPointSynonym:On})}function nh(){ay()}function Ml(s,e=!1){if(Cn=new Set(s),ti(),we){if(s.length>0){const t=new Set;s.forEach(n=>{const i=at.find(r=>r.point_id===n);i!=null&&i.meridian&&t.add(i.meridian.toLowerCase())}),t.size>0&&(we.setVisibleMeridians(Array.from(t)),document.querySelectorAll(".meridian-filter-chip[data-meridian-id]").forEach(n=>{var r;const i=((r=n.dataset.meridianId)==null?void 0:r.toLowerCase())||"";n.classList.toggle("active",t.has(i))}))}we.setHighlightedPoints(rn,Cn)}if(e){const t=document.querySelector('.view-mode-btn[data-view-mode="3d"]');t==null||t.click();const n=document.getElementById("v3d-mode-skeleton-btn");n==null||n.click(),setTimeout(()=>{we==null||we.focusCameraPreset("full")},100)}}async function rr(s){gl.style.display="none",xi.style.display="flex",_l.style.display="none",iu.textContent=s,su.textContent="Homöopathikum",ru.textContent="Heilmittel-Profil",au.textContent="Resonanz-Massagepunkte";const e=xi.querySelectorAll(".detail-section"),t=xi.querySelector(".detail-tabs");e.forEach(h=>h.style.display="none"),t&&(t.style.display="none");let n=document.getElementById("remedy-details-view");n||(n=document.createElement("div"),n.id="remedy-details-view",n.style.padding="16px 0",xi.appendChild(n)),n.style.display="block";let i=null;try{if(vs&&at.length>0)i=Yr(s);else{const h=await fetch(`/api/remedy-details?name=${encodeURIComponent(s)}`);if(!h.ok)throw new Error(`API error: ${h.status}`);i=await h.json()}}catch(h){console.warn("Failed to load remedy details from API, falling back client-side.",h),i=Yr(s)}if(i&&(!Array.isArray(i.direct_points)||i.direct_points.length===0)&&at.length>0&&(i.direct_points=Yr(s).direct_points),i&&!i.description&&(await fu(),fs)){const h=s.toLowerCase().replace(/\.$/,"").trim(),u=Object.keys(fs).find(f=>f.toLowerCase().replace(/\.$/,"").trim()===h);u&&(i.description=fs[u])}if(!i){n.innerHTML="<p class='dimmed'>Fehler beim Laden des Heilmittel-Profils.</p>";return}const r=(Array.isArray(i.direct_points)?i.direct_points:[]).map(h=>{const u=typeof h=="string"?h:h==null?void 0:h.point_id;if(!u)return null;const f=at.find(g=>g.point_id===u);return{point_id:u,point_name:typeof h=="object"&&(h==null?void 0:h.point_name)||(f==null?void 0:f.name_german)||u,meridian:(f==null?void 0:f.meridian)||""}}).filter(h=>h!==null);Ml(r.map(h=>h.point_id),!1);let a="";if(Ni){const h=On(Ni);a+=`<button id="remedy-back-btn" class="back-btn">← Zurück zu ${h}</button>`}else a+='<button id="remedy-back-btn" class="back-btn">← Zurück</button>';if(a+='<div class="detail-section" style="margin-top: 12px; margin-bottom: 16px;">',a+='<div style="display: flex; align-items: center; justify-content: space-between; gap: 8px; flex-wrap: wrap; margin-bottom: 6px;">',a+=`<h3 style="margin: 0;">Zugeordnete Leitbahn-Punkte (${r.length})</h3>`,r.length>0&&(a+='<button type="button" id="remedy-show-3d-btn" class="cam-preset-btn" style="font-size: 12px; padding: 4px 10px;" title="Alle zugeordneten Punkte auf dem 3D-Skelett anzeigen">🦴 Im 3D-Skelett zeigen</button>'),a+="</div>",a+='<p class="dimmed" style="font-size: 12px; margin-bottom: 10px; font-style: italic;">Punkte auf den Leitbahnen, denen dieses Mittel in der Datenbank zugeordnet ist:</p>',r.length>0?r.forEach(h=>{const u=On(h.point_id);a+=`
        <div class="remedy-point-item clickable" data-point-id="${h.point_id}" title="Klicken, um Punkt ${u} im Detail anzuzeigen">
          <div class="point-badge">${u}</div>
          <div class="point-info">
            <div class="point-name">${h.point_name}</div>
            ${h.meridian?`<div class="dimmed" style="font-size: 11px;">Leitbahn: ${h.meridian}</div>`:""}
          </div>
          <span class="grade-badge grade-3">Punkt</span>
        </div>
      `}):a+='<p class="dimmed" style="padding: 8px 0;">Keine direkten Punktzuordnungen in der Datenbank gefunden.</p>',a+="</div>",i.description){const h=i.description;a+=`<div class="remedy-full-name">${h.name}</div>`,h.overview&&(a+=`
        <div class="remedy-overview-box">
          <strong>Klinisches Portrait:</strong> ${h.overview}
        </div>
      `),a+=`
      <div style="background-color: #f0f7f6; border-left: 4px solid var(--color-primary-teal); padding: 12px; border-radius: 4px; margin: 16px 0; font-size: 13px; line-height: 1.5; color: var(--color-text-dark); font-family: 'Lato', sans-serif;">
        <strong>Massage-Anleitung:</strong> Tragen Sie dieses Heilmittel tropfenweise auf die unten aufgeführten Akupunkturpunkte auf und massieren Sie es mit sanftem, kreisendem Druck ein (ca. 1-2 Minuten pro Punkt).
      </div>
    `;const u=Object.keys(h.sections);u.length>0&&(a+='<div class="materia-medica-section-title">Arzneimittelbild (Boericke)</div>',a+='<div class="materia-medica-accordion">',u.forEach(f=>{const g=h.sections[f];g&&(a+=`
            <div class="accordion-item">
              <button class="accordion-header">
                <span>${f}</span>
                <span class="arrow">▼</span>
              </button>
              <div class="accordion-content">
                ${g}
              </div>
            </div>
          `)}),a+="</div>")}const o={};(i.rubrics||[]).forEach(h=>{h.point_id&&(o[h.point_id]||(o[h.point_id]={point_name:h.point_name||h.point_id,rubric_entries:[]}),o[h.point_id].rubric_entries.push({rubric_name:h.rubric_name||h.rubric,grade:h.grade}))});const l=Object.keys(o).length;l>0&&(a+='<div class="detail-section" style="margin-top: 0;">',a+=`<h3>Zugehörige Massagepunkte (Symptomatisch) (${l})</h3>`,a+='<p class="dimmed" style="font-size: 12px; margin-bottom: 12px; font-style: italic;">Punkte, auf die dieses Mittel bei entsprechender Symptom-Abdeckung einmassiert wird:</p>',Object.keys(o).forEach(h=>{const u=o[h],f=On(h);let g="";u.rubric_entries.forEach(y=>{g+=`
          <div class="remedy-point-rubric" style="display: flex; justify-content: space-between; align-items: center; font-size: 12px; margin-top: 4px; padding: 2px 0; border-top: 1px dashed var(--color-border); color: var(--color-text-dark);">
            <span class="rubric-name" style="color: var(--color-text-dark);">${y.rubric_name}</span>
            <span class="grade-badge grade-${y.grade}" style="margin-left: 8px; flex-shrink: 0;">Grad ${y.grade}</span>
          </div>
        `}),a+=`
        <div class="remedy-point-item clickable" data-point-id="${h}" title="Klicken, um zu Punkt ${f} zu springen" style="display: block; margin-bottom: 12px;">
          <div style="display: flex; align-items: center; margin-bottom: 6px;">
            <div class="point-badge" style="margin-right: 12px;">${f}</div>
            <div class="point-name" style="font-weight: bold; color: var(--color-text-dark);">${u.point_name}</div>
          </div>
          <div class="point-rubrics-container" style="padding-left: 8px;">
            ${g}
          </div>
        </div>
      `}),a+="</div>"),n.innerHTML=a;const c=document.getElementById("remedy-show-3d-btn");c&&c.addEventListener("click",()=>{Ml(r.map(h=>h.point_id),!0)});const d=document.getElementById("remedy-back-btn");d&&d.addEventListener("click",()=>{n.style.display="none",e.forEach(h=>h.style.display="block"),t&&(t.style.display="block"),Ni?zn(Ni):(gl.style.display="flex",xi.style.display="none")}),n.querySelectorAll(".remedy-point-item.clickable").forEach(h=>{h.addEventListener("click",()=>{const u=h.dataset.pointId;if(u){let f="";const g=at.find(y=>y.point_id===u);if(g&&(f=g.meridian),f){const y=Fi.querySelector(`li[data-name="${f}"]`);y&&va(f,y)}n.style.display="none",e.forEach(y=>y.style.display="block"),t&&(t.style.display="block"),zn(u)}})}),n.querySelectorAll(".materia-medica-accordion .accordion-header").forEach(h=>{h.addEventListener("click",()=>{const u=h.parentElement;u&&u.classList.toggle("active")})})}Py();
