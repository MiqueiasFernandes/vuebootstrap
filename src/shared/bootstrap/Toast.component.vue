<template>
 <div aria-live="polite" aria-atomic="true" style="position: relative; min-height: 200px;">
  <!-- Position it -->
  <div style="position: absolute; top: 0; right: 0;">

    <!-- Then put toasts within -->
    <div :id="t.id"  v-for="(t, i) in toast_queue" v-bind:key="i" class="toast" role="alert" aria-live="assertive" aria-atomic="true">
      <div class="toast-header">
       
        <strong class="mr-auto">Bootstrap {{i}}</strong>
        <small class="text-muted">just now</small>
        <button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="toast-body">
       {{t}}
      </div>
    </div>

  </div>
</div>
</template>

<script>
import bootstrap from "bootstrap/dist/js/bootstrap.js";
export default {
  created() {
    this.toast_queue = [];
    this.$toast_handler(this);
     const toastElList = [].slice.call(document.querySelectorAll('.toast'))
 toastElList.map(function (toastEl) {
  return new bootstrap.Toast(toastEl)
})

  },
  data() {
    return { toast_queue: [], cont: 0 };
  },
  methods: {
    push(t, k) {
       const  id = 'toast'+this.cont++
      this.toast_queue.push({t, k, id });
      setTimeout(() => {
       const elem = document.getElementById(id);
       if (elem){
            (new bootstrap.Toast(elem)).show();
       } else {
           console.log(id)
       }
      }, 1000);
     
    },
  },
};
</script>