<template>
  <div id="app">
    <kokk root="./docs/">
      <star-rate slot="demo" :value="3"
                 type="star1"/>
    </kokk>
  </div>
</template>

<script>
import kokk from '../src'
import StarRate from 'vue-cute-rate'

export default {
  components: {
    kokk,
    StarRate
  }
}
</script>
