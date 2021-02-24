<template>
  <div></div>
</template>

<script>
export default {
  name: "Empty",
  created() {
    let id = this.$route.params.id;
    let url = this.$route.params.url;
    this.$router.push({name:url,params: {id:id}})
  }
}

</script>

<style scoped>

</style>
