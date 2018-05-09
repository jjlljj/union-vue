<template>
  <div class="map-wrap">
    <div id="map"  ref="mapCanvas"></div>
  </div>
</template>

<script>
  import mapboxgl from 'mapbox-gl';
  import { MB_TOKEN } from '../../key' ;

  export default {
    name: 'Map',
    data () {
      return {
        map: null
      }
    },
    mounted: function() {
  
      mapboxgl.accessToken = MB_TOKEN
      const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v9',
        //  maxbounds: [lng, lat],
        center: [-104.994813, 39.7452204],
        zoom: 16,
        bearing: -17.6,
        pitch: 45
      })

     this.map = map
    }
  },
  beforeDestroy() {
	this.map.remove();
  }

</script>

<style scoped>

  .map-wrap {
    position: relative;
    width: 100%;
    height: 80vh;
  }

  #map {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 100%;
  }

  #map canvas {
    width: 100%;
  }

</style>
