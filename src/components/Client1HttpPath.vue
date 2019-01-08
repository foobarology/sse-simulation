<template>
  <div class="client-1-http-path" :class="{active: active, streaming: streaming}">
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
    streaming: {
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
.client-1-http-path {
  position: absolute;
  top: 240px;
  left: 175px;
  width: 210px;
  height: 50px;
  text-align: center;
  color: rgba(0,0,0,0.25);
  line-height: 40px;
}

.client-1-http-path svg {
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
}

.client-1-http-path svg path {
  stroke: rgba(0,0,0,0.25);
  stroke-width: 5;
  stroke-dasharray: 10, 5;
}

.client-1-http-path.active {
  color: #42666B;
}

.client-1-http-path.active svg path {
  stroke: #42666B;
}

.client-1-http-path.streaming svg path {
  stroke: #4ECCDE;
  animation: dash 2s linear infinite;
}

.client-1-http-path.streaming {
  color: #4ECCDE;
}

@-webkit-keyframes dash {
  to {
    stroke-dashoffset: 90;
  }
}

@-moz-keyframes dash {
  to {
    stroke-dashoffset: 90;
  }
}

@keyframes dash {
  to {
    stroke-dashoffset: 90;
  }
}

</style>