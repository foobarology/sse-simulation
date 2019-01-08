<template>
  <obj id="client-1"
    title="Client 2"
    title-position="bottom"
    bg="#43A047" 
    :width="100"
    :height="100"
    :right="75">
    <div class="actions" v-if="buttons">
      <button :disabled="submitting" class="btn" @click="triggerPostMessage">
        {{ !submitting ? 'Post Message' : 'Submitting...' }}
      </button>
    </div>
  </obj>
</template>

<script>
export default {
  props: {
    submitting: {
      type: Boolean,
      default: false,
    },
    buttons: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    triggerPostMessage () {
      this.$emit('post');      
    }
  }
}
</script>