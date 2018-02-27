<template>
  <ul class="menu">
    <li
      class="item"
      :class="{active: isActive(item.slug)}"
      :key="item.slug"
      v-for="item in menu">
      <a :href="`#${item.slug}`">{{ item.title }}</a>
    </li>
  </ul>
</template>

<script>
export default {
  props: ['menu'],

  data() {
    return {
      hash: ''
    }
  },

  methods: {
    isActive(slug) {
      return slug === this.hash.slice(1)
    },

    handleHashChange() {
      this.hash = location.hash
    }
  },

  mounted() {
    this.handleHashChange()
    window.addEventListener('hashchange', this.handleHashChange)
  },

  beforeDestroy() {
    window.removeEventListener('hashchange', this.handleHashChange)
  }
}
</script>

<style scoped lang="scss">
.menu {
  font-size: 12px;
  margin: 16px 0;
  padding-left: 0;
  border-left: 1px solid #ebedf0;
  list-style: none;
  & > .item:not(:last-child) {
    margin-bottom: 4px;
  }
  .item {
    margin: 0;
    & a {
      padding-left: 16px;
      display: block;
      transition: all 0.3s ease;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      color: #314659;
      width: 110px;
      border-left: 1px solid transparent;
      margin-left: -1px;
      border-bottom: none;
      cursor: pointer;
      padding-bottom: 0;
      line-height: 2;
    }
    &.active a {
      color: var(--blue);
      border-color: var(--blue)
    }
  }
}
</style>
