import { Threebox } from 'threebox';
import * as THREE from 'three';
import GLTFLoader from 'three-gltf-loader';
import mapboxgl from 'mapbox-gl';

//export const mapParams = (mapContainer) => ({
  //container: mapContainer,
  //style: 'mapbox://styles/nogully/cjg2lpcwt61xp2rmenlcq9ce2',
  ////  maxbounds: [lng, lat],
  //center: [-104.994813, 39.7452204],
  //zoom: 16,
  //bearing: -17.6,
  //pitch: 45
//})

export const renderMapElements = map => {

  map.on('load', () => {
    renderThreebox(map)

    //setTimeout(() => toggleLoad(), 1800)
  })
}

const renderThreebox = map => {
  const threebox = new Threebox(map);
  threebox.setupDefaultLights();

  const loader = new GLTFLoader();

  loader.load("models/unionStation.gltf", gltf => {
    console.log(gltf)
    const children1 = gltf.scene.children[0].children[0].children;
    const children2 = gltf.scene.children[0].children[1].children;
    console.log(children1[1])

    const flattened = children2.slice(41).reduce((flattened, group) => { return [...flattened, ...group.children]},[])

    const geometries = parseChildrenGeoms([
      ...children1,
      ...children2.slice(0,11), 
      ...children2.slice(13,40),
      ...flattened
    ]) 
    
    const position = [-105.00006, 39.75317, 0];

    renderAllChildren(geometries, position, threebox)

  });
}

const parseChildrenGeoms = children => {
  return children.map(child => new THREE.Geometry().fromBufferGeometry(child.geometry) || child.geometry) 
}

const renderAllChildren = (geometries, position, threebox) => {
  const colors = [0xaaaaff, 0x0000FF, 0x00FFFF]
  geometries.map(geometry => {
    geometry.rotateY((90/360)*4*Math.PI);
    geometry.rotateX((90/360)*2*Math.PI);

    let color = colors[Math.floor(Math.random()*colors.length)]
    
    let material = new THREE.MeshPhongMaterial( {color, side: THREE.DoubleSide}); 
    let build = new THREE.Mesh( geometry, material );
    threebox.addAtCoordinate(build, position);
  })
}
