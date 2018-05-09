<template>
  <div>
    <h2>I am map</h2>
    <div class="map-wrap">
      <div id="map"  ref="mapCanvas"></div>
    </div>
  </div>
</template>

<script>
  import mapboxgl from 'mapbox-gl';

  export default {
    name: 'Map',
    data () {
      return {
        map: null
      }
    },
    mounted: function() {
      console.log(this.$refs)
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
  }

</script>

<style scoped>

</style>
