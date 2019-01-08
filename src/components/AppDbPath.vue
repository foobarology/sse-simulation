<template>
  <div class="app-db-path" :class="{active: active}">
    <svg>
      <path d="M0 0 l0 112"/>
    </svg>
    <em>{{ text }}</em>
  </div>
</template>

<script>
export default {
  props: {
    active: {
      type: Boolean,
      required: true,
    },
    text: {
      type: String,
      default: '',
    },
  }
}
</script>

<style>
.app-db-path {
  position: absolute;
  top: 130px;
  left: 460px;
  width: 75px;
  height: 115px;
  text-align: center;
  color: rgba(0,0,0,0.25);
  line-height: 40px;
}

.app-db-path svg {
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
}

.app-db-path svg path {
  stroke: rgba(0,0,0,0.25);
  fill: transparent;
  stroke-width: 6;
  stroke-dasharray: 10, 5;
}

.app-db-path.active {
  color: #42666B;
}

.app-db-path.active svg path {
  stroke: #42666B;
}
</style>