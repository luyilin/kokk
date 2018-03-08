<template>
  <div id="app">
    <juri :doc-list="['basic.md', 'half.md']" :expandAll="expandAll">
      <star-rate
        slot="demo-0"
        :value="3"/>
      <star-rate
        slot="demo-1"
        :value="2.5"
        :star-half="true"
        :on-change="onChangeFn"
        type="star1"/>
    </juri>
  </div>
</template>

<script>
  import Juri from 'vue-juri'
  import StarRate from 'vue-cute-rate'

  export default {
    props: ['expandAll'],
    components: {
      Juri,
      StarRate
    },

    methods: {
      onChangeFn (value) {
        console.log(value)
      }
    }
  }
</script>
