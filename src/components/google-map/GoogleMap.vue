<template>
  <div>
      <v-card>
          <v-card-title>
              Google Map
          </v-card-title>
          <v-card-text>
              <gmap-map
            :center="center"
            :zoom="12"
            style="width:100%;  height: 600px; border-radius: 20px"
            >
            <gmap-marker
                :key="index"
                v-for="(m, index) in markers"
                :position="m.position"
                @click="info(m)"
            ></gmap-marker>
            </gmap-map>
          </v-card-text>
          
      </v-card>
      <Detail/>
  </div>
</template>

<script>
import Detail from './options/Detail'
import bus from '../../event_bus'
export default {
  name: "GoogleMap",
  props: ['hospitals'],
  components: {
      Detail
  },
  data() {
    return {
      // default to Montreal to keep it simple
      // change this to whatever makes sense
      center: { lat: 45.508, lng: -73.587 },
      markers: [],
      places: [],
      currentPlace: null
    };
  },

  mounted() {
    this.geolocate();
    console.log(this.hospitals)
    this.placeMarkers()
  },

  methods: {
    info(item) {
        bus.$emit('openDetail', item)
        console.log(item)
        this.center=item.position
    },
    placeMarkers() {
        this.hospitals.forEach(hospital => {
            const marker = {
                lat: parseFloat(hospital.lat),
                lng: parseFloat(hospital.long)
            };
            this.markers.push({ position: marker, data: hospital });
        });
    },
    // receives a place object via the autocomplete component
    geolocate: function() {
      navigator.geolocation.getCurrentPosition(position => {
        this.center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
      });
    }
  }
};
</script>