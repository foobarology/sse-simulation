<template>
  <div class="client-2-http-path" :class="{active: active}">
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
.client-2-http-path {
  position: absolute;
  top: 240px;
  left: 535px;
  width: 210px;
  height: 50px;
  text-align: center;
  color: rgba(0,0,0,0.25);
  line-height: 40px;
}

.client-2-http-path svg {
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
}

.client-2-http-path svg path {
  stroke: rgba(0,0,0,0.25);
  stroke-width: 5;
  stroke-dasharray: 10, 5;
}

.client-2-http-path.active {
  color: #42666B;
}

.client-2-http-path.active svg path {
  stroke: #42666B;
}
</style>