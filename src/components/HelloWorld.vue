<template>
  Child compenent <span v-badge="'info'">rounded</span> <span v-badge="{rounded: true}">rounded</span>
  <button @click="opend" v-btn><span v-spiner="{color: 'danger', sm: true, grow: true}"></span> {{ msg }}</button>
</template>

<script>
export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  methods: {
    opend() {
      // this.$dialog({ title: "Do filho", text: "abri do filho" }, (action) => {
      //   console.log(" Dialogo do filho, action: " + action);
      // });
      this.$toast('ola', 'mundo')
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
