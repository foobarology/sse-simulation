<template>
  <div class="client-1-app-db-path" :class="{active: active}">
    <svg>
      <path d="M0 0 l210 0"/>
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
.client-1-app-db-path {
  position: absolute;
  top: 240px;
  left: 385px;
  width: 75px;
  height: 50px;
  text-align: center;
  color: rgba(0,0,0,0.25);
  line-height: 40px;
}

.client-1-app-db-path svg {
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
}

.client-1-app-db-path svg path {
  stroke: rgba(0,0,0,0.25);
  stroke-width: 5;
  stroke-dasharray: 10, 5;
}

.client-1-app-db-path.active {
  color: #42666B;
}

.client-1-app-db-path.active svg path {
  stroke: #42666B;
}
</style>