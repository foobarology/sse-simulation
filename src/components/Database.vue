<template>
  <obj id="database"
    title="Notif DB"
    bg="#7B1FA2"
    :width="75"
    :height="75"
    :top="55">
    <div class="messages-count" :class="{empty: !messages.length}">
      {{ messages.length }}
    </div>
  </obj>
</template>

<script>
export default {
  props: {
    messages: {
      type: Array,
      required: true,
    },
  },
}
</script>

<style>
.messages-count {
  position: absolute;
  left: 0px;
  right: 0px;
  top: 0px;
  bottom: 0px;
  margin: auto;
  width: 40px;
  height: 40px;
  line-height: 40px;
  background: #22292A;
  text-align: center;
  font-weight: bold;
  border-radius: 50%;
}
.messages-count.empty {
  color: #607D8B;
}
</style>