---
title: Half star
desc: Support select half star.
---

```vue
<template>
  <star-rate :value="2.5" type="star1"
             :star-half="true"
             :on-change="onChangeFn"/>
</template>

<script>
import StarRate from 'vue-cute-rate'

export default {
  components: {
    StarRate
  },
  methods: {
    onChangeFn (value) {
      console.log(value)
    }
  }
}
</script>
```
