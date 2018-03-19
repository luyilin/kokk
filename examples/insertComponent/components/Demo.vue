<template>
  <div id="app">
    <juri :doc-list="docList" :expand-all="expandAll">
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
import basic from 'raw-loader!../docs/basic.md'
import half from 'raw-loader!../docs/half.md'

export default {
  components: {
    Juri,
    StarRate
  },

  props: {
    expandAll: {
      type: Boolean,
      default: false
    }
  },

  data () {
    return {
      docList: [basic, half]
    }
  },

  methods: {
    onChangeFn (value) {
      console.log(value)
    }
  }
}
</script>
