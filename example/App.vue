<template>
  <div id="app">
    <kokk root="/docs/" :doc-list="['basic.md', 'demo.md']"
          title-classname="title">
      <star-rate slot="demo-0" :value="4"/>
      <star-rate slot="demo-1" :value="3"
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

<style>
  .title {
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
    font-size: 68px;
    font-weight: 100;
    color: #7175b1;
    letter-spacing: 3px;
  }
</style>
