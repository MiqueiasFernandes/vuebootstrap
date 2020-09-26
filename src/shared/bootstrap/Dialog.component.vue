<template>
  <div :id="dialog_id" class="modal fade" tabindex="-1" aria-hidden="true">
    <div
      class="modal-dialog"
      :class="{ 'modal-dialog-centered': config && config.centered }"
    >
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" v-if="config">
            <Icon v-if="config.icon" :icon="config.icon"/>
            {{ config.title }}
            </h5>
          <button
            type="button"
            class="close"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body" v-if="config">{{ config.text }}</div>
        <div class="modal-footer" v-if="config">
          <button
            v-for="(btn, index) in config.btns"
            v-bind:key="index"
            class="btn"
            :class="btn.klass"
            @click="handleBtn(btn)"
          >
            {{ btn.label }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import bootstrap from "bootstrap/dist/js/bootstrap.js";
const INTERVAL_INTERDIALOG = 500;

export default {
  created() {
    this.dialog_queue = [];
    this.$dialog_handler(this);
  },
  data: () => {
    return {
      dialog_id: "dialog-" + Date.now(),
      config: undefined,
      action: undefined,
      wait_cancel: false,
      instance: undefined,
    };
  },
  methods: {
    getInstance() {
      if (this.instance) {
        return this.instance;
      }
      const elem = document.getElementById(this.dialog_id);
      if (elem) {
        elem.addEventListener("hidden.bs.modal", () => this.close(null, true));
        return (this.instance = new bootstrap.Modal(elem));
      }
      return null;
    },

    show() {
      this.wait_cancel = true;
      const i = this.getInstance();
      if (i) {
        i.show();
      }
    },

    hide() {
      const i = this.getInstance();
      if (i) {
        i.hide();
      }
    },

    btn(label, action = "none", klass = "btn-primary", close = true) {
      return { label, action, klass, close };
    },

    btnCancel(label = "Cancel", klass = "btn-danger") {
      return this.btn(label, "cancel", klass);
    },

    btnOk(label = "Ok", klass = "btn-primary") {
      return this.btn(label, "ok", klass);
    },

    btnsDefault() {
      return [this.btnCancel(), this.btnOk()];
    },

    parseConfig(config) {
      if (!config || !config.title) {
        console.war("Dialog without config!");
        return null;
      }

      if (!config.cancel) {
        config.cancel = "cancel";
      }

      if (!config.btns) {
        config.btns = this.btnsDefault();
      }
      if (!config.events) {
        config.events = [];
      }
      if (!config.text) {
        config.text = config.title;
      }
      return config;
    },

    open(config, action) {
      this.enqueue(config, action);
    },

    handleBtn(btn) {
      if (btn.close) {
        this.close(btn.action);
      } else {
        this.sendAction(btn.action);
      }
    },

    sendAction(action) {
      if (this.config) {
        if (this.config.events.includes(action)) {
          this.$emit(action);
        }
      }

      if (this.action && action) {
        this.action(action);
      }
    },

    close(action = "close", cancel = false) {
      if (!this.wait_cancel && cancel) {
        this.config = null;
        return;
      }
      if (!action && this.config) {
        action = this.config.cancel;
      }
      this.wait_cancel = false;
      this.hide();
      this.sendAction(action);
      setTimeout(() => {
        this.config = null;
        this.next();
      }, INTERVAL_INTERDIALOG);
    },

    enqueue(config, action) {
      config = this.parseConfig(config);
      if (config) {
        this.dialog_queue.push({ config, action });
        setTimeout(() => {
          if (!this.config && this.dialog_queue.length > 0) {
            this.next();
          }
        }, 200);
      }
    },

    next() {
      if (this.dialog_queue.length > 0 && this.config == null) {
        const data = this.dialog_queue[0];
        this.dialog_queue.splice(0, 1);
        this.config = data.config;
        this.action = data.action;
        this.show();
      }
    },
  },
};
</script>