<template>
  <obj id="app" 
    title="Web App"
    title-position="bottom"
    bg="rgba(0,0,0,.2)" 
    :width="150"
    :height="150">
    <div class="gear" :class="{active: active}">
      <img src="/assets/gear.svg" alt="">
    </div>
  </obj>
</template>

<script>
export default {
  props: {
    active: {
      type: Boolean,
      default: false,
    }
  }
}
</script>

<style>
.gear {
  width: 50px;
  height: 50px;
  position: absolute;
  left: 0px;
  right: 0px;
  top: 0px;
  bottom: 0px;
  margin: auto;
  text-align: center;
}

.gear img {
  width: 100%;
  height: 100%;
}

.gear.active {
  -webkit-animation: spin 2s linear infinite;
  -moz-animation: spin 2s linear infinite;
  animation: spin 2s linear infinite;
}

@-moz-keyframes spin { 100% { -moz-transform: rotate(360deg); } }
@-webkit-keyframes spin { 100% { -webkit-transform: rotate(360deg); } }
@keyframes spin { 100% { -webkit-transform: rotate(360deg); transform:rotate(360deg); } }

</style>