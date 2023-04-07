<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "app",
  data() {
    return {};
  },
  watch: {},
  created() {
  },
  methods: {},
  computed: {}
};
</script>
<style lang="scss">
$border : '1px solid #e8e8e8';
#app {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.avue--detail .el-col{
  margin-bottom: 0;
}

</style>
