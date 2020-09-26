<template>
  <svg
    :class="'bi' + (color ? ' text-' + color : '')"
    :width="size"
    :height="size"
    fill="currentColor"
  >
    <use
      :xlink:href="
        require('@/assets/bootstrap-icons.svg') +
        '#' +
        icon +
        (fill ? '-fill' : '')
      "
    />
  </svg>
</template>

<script>
export default {
  props: {
    icon: String,
    fill: Boolean,
    color: {
      type: String,
    },
    size: {
      default: '32'
    },
  },
};
</script>