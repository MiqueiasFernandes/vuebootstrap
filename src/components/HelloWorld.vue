<template>

<Icon icon="heart" color="danger" fill/>
<Icon icon="shop" size="64"/>
<Icon icon="lock" color="primary" fill/>


  Child compenent <span v-badge="'info'">rounded</span> <span v-badge="{rounded: true}">rounded</span>
  <button @click="opend" v-btn><span v-spiner="{color: 'danger', sm: true, grow: true}"></span> <img src="../../node_modules/bootstrap-icons/icons/heart-fill.svg"> {{ msg }}</button>
</template>

<script>
export default {
  name: "HelloWorld",
  props: {
    msg: String
  },
  data: () => ({cont: 4}),
  methods: {
    opend() {
      // this.$dialog({ title: "Do filho", text: "abri do filho" }, (action) => {
      //   console.log(" Dialogo do filho, action: " + action);
      // });
      this.$toast('ola ' + ++this.cont, 'mundo' + this.cont)
      this.$dialog(
          {
            title: "Login",
            icon: 'lock-fill',
            text: "no cancel?",
            centered: true
          },
          (action) => {
            console.log(" cancel: " + action);
          }
        );
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
