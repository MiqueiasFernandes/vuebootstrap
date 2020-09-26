<template>
  <div
    v-for="(alert, index) in alerts"
    v-bind:key="index"
    :id="alert.id"
    class="text-left alert alert-dismissible fade show"
    :class="'alert-' + alert.klass"
    role="alert"
  >
    <strong class="ml-2" v-if="alert.prefix">{{ alert.prefix }}</strong>
    {{ alert.message }}
    <button v-if="alert.btn" class="btn" :class="'btn-' + alert.klass">
      {{ alert.btn }}
    </button>
    <button
      type="button"
      class="close"
      aria-label="Close"
      @click="close(alert.id)"
    >
      <span aria-hidden="true">&times;</span>
    </button>
  </div>
</template>

<script>
import bootstrap from "bootstrap/dist/js/bootstrap.js";

export default {
  props: {
    time: {
      type: Number,
      default: 0,
    },
  },

  created() {
    this.alert_queue = [];
    this.$alert_handler(this);
  },

  data: () => ({
    alert_id: "alert-" + Date.now(),
    alerts: [],
    alert_count: 1,
  }),

  methods: {
    show(prefix, message, btn, klass = "warning", time = 0) {
      const id = this.alert_id + "-" + this.count++;
      this.alerts.push({ id, klass, prefix, message, btn });
      const t = time ? time : this.time;
      if (t && t > 0) {
        setTimeout(() => this.close(id), t * 1000);
      }
    },

    close(id) {
      const elem = document.getElementById(id);
      const instance = new bootstrap.Alert(elem);
      instance.close();
    },
  },
};
</script>