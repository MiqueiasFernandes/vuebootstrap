
// npm install bootstrap@next

import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.js"
import bootstrap from "bootstrap/dist/js/bootstrap.bundle.js";

// Alerts       OK
// Badge        OK
// Breadcrumb   CSS
// Buttons      OK
// Button group CSS
// Card         CSS
// Carousel      X
// Close button CSS
// Collapse     --- (complexo)
// Dropdowns     X
// List group   CSS
// Modal        OK
// Navs         --- (complexo)
// Navbar       CSS
// Pagination   --- (facil)
// Popovers     OK
// Progress     --- (facil)
// Scrollspy    ---
// Spinners     OK
// Toasts       OK
// Tooltips     OK

//usage: 
// main.js      => createApp(App).use(Bootstrap).mount('#app')
// App-Main.vue => `` <Dialog />
//                    <Alert />
//                    <Toast />  ``
// this.$alert( ... ...  => call alert
// this.$dialog( ... ... => show dialog
// this.$toast( ... ...  => display toast


import Alert from './Alert.component.vue'
import Dialog from './Dialog.component.vue'
import Toast from './Toast.component.vue'

export default {
    install(app) {

        //Alert
        app.component("Alert", Alert)
        app.config.globalProperties.$alert_handler = (ac) => this.alert_component = ac;
        app.config.globalProperties.$alert = (prefix, message, btn, klass, time) => {
            if (this.alert_component) {
                this.alert_component.show(prefix, message, btn, klass, time);
            }
        };

        //Dialog
        app.component("Dialog", Dialog)
        app.config.globalProperties.$dialog_handler = (dc) => this.dialog_component = dc;
        app.config.globalProperties.$dialog = (config, action) => {
            if (this.dialog_component) {
                this.dialog_component.open(config, action);
            }
        };

        //Toast
        app.component("Toast", Toast)
        app.config.globalProperties.$toast_handler = (tc) => this.toast_component = tc;
        app.config.globalProperties.$toast = (title, text) => {
            if (this.toast_component) {
                this.toast_component.push(title, text);
            }
        };

        //Button
        app.directive('btn', {
            mounted(el, binding) {
                var type = 'primary'
                if (binding.value) {
                    if (typeof binding.value === 'string') {
                        type = binding.value
                    } else {
                        if (binding.value.color) {
                            type = binding.value.color
                        }
                        if (binding.value.outline) {
                            type = 'outline-' + type
                        }
                    }
                }
                el.className += 'btn btn-' + type
            }
        })
        
        //Badge
        app.directive('badge', {
            mounted(el, binding) {
                var type = 'primary'
                if (binding.value) {
                    if (typeof binding.value === 'string') {
                        type = binding.value
                    } else {
                        if (binding.value.color) {
                            type = binding.value.color
                        }
                        if (binding.value.rounded) {
                            type += ' rounded-pill'
                        }
                    }
                }
                el.className += 'badge bg-' + type
            }
        })

        //Spiner
        app.directive('spiner', {
            mounted(el, binding) {
                var t = 'border'
                var type = 'primary'
                if (binding.value) {
                    if (typeof binding.value === 'string') {
                        type = binding.value
                    } else {
                        if (binding.value.color) {
                            type = binding.value.color
                        }
                        if (binding.value.grow) {
                            t = 'grow'
                        }
                        if(binding.value.sm) {
                            type += ' spinner-' + t + '-sm'
                        }
                    }
                }
                el.className += 'spinner-' + t +  ' text-' + type
                el.setAttribute('role', "status")
                el.innerHtml = '<span class="sr-only">Loading...</span>'
            }
        })

        //Tooltip
        app.directive('tooltip', {
            mounted(el, binding) {
                if (binding.value) {
                    if (typeof binding.value === 'string') {
                        el.title = binding.value
                    } else {
                        el.title = binding.value.title

                        if (binding.value.position) {
                            el.setAttribute('data-placement', binding.value.position)
                        }
                    }
                }
                el.setAttribute('data-container', "body")
                el.setAttribute('data-toggle', "tooltip")
                new bootstrap.Tooltip(el);
            }

        })

        //Popover
        app.directive('popover', {
            mounted(el, binding) {
                if (binding.value) {
                    if (typeof binding.value === 'string') {
                        el.title = binding.value
                    } else {
                        el.title = binding.value.title
                        if (binding.value.content) {
                            el.setAttribute('data-content', binding.value.content)
                        }
                        if (binding.value.position) {
                            el.setAttribute('data-placement', binding.value.position)
                        }
                    }
                }
                el.setAttribute('data-container', "body")
                el.setAttribute('data-toggle', "popover")
                new bootstrap.Popover(el);
            }
        })

    }
}
