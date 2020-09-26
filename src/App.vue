<template>
  <Dialog />
  <Alert />
  <Toast />

  <br />
  <div class="container col-8">
<HelloWorld msg="Welcome" />


<div class="btn-group">
  <a href="#" class="btn btn-secondary active">Active link</a>
  <a href="#" class="btn btn-secondary">Link</a>
  <a href="#" class="btn btn-secondary">Link</a>
</div>
    <h3>hello world</h3>
    <br />
    <button @click="open" v-tooltip="'abrir alert'" v-btn="'warning'">
      ok
    </button>
    <button class="btn btn-primary" @click="alr">alert</button>

    <button
      type="button"
      class="btn btn-secondary"
      v-tooltip="'tooltipo massa'"
    >
      Tooltip on top
    </button>

    <button
      type="button"
      class="btn btn-secondary"
      v-popover="{ title: 'Titulo', content: 'OK', position: 'bottom' }"
    >
      Popover on top
    </button>
  </div>

  <img alt="Vue logo" src="./assets/logo.png" />
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";

export default {
  name: "App",
  components: {
    HelloWorld,
  },
  data: () => ({ cont: 0 }),
  methods: {
    open() {
      for (var i = 1; i < 5; i++) {
        this.$dialog(
          {
            title: i + "Ta funcionando direito",
            text: "O diálogo esta funcionando direitinho?",
            btns: [
              {
                label: "Sim",
                action: "sim",
                klass: "btn-primary",
                close: true,
              },
              {
                label: "Não",
                action: "não",
                klass: "btn-warning",
                close: true,
              },
            ],
          },
          (action) => {
            console.log(" Dialogo esta ok? " + action);
          }
        );
      }
    },

    alr() {
      this.$alert("Veja" + this.cont++, "mesage" + this.cont++, "ok", 'info');
    },
  },
  mounted() {},
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
