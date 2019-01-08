<template>
  <div class="object" :style="styles">
    <div class="object--title" :class="{
      top: titlePosition == 'top', 
      bottom: titlePosition == 'bottom'
    }">
      {{ title }}
    </div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    titlePosition: {
      type: String,
      default: 'top',
    },
    width: {
      type: Number,
      default: 120,
    },
    height: {
      type: Number,
      default: 120,
    },
    bg: {
      type: String,
      default: '#aaaaaa',
    },
    fg: {
      type: String,
      default: 'white',
    },
    top: {
      type: Number,
      default: 0,
    },
    right: {
      type: Number,
      default: 0,
    },
    bottom: {
      type: Number,
      default: 0,
    },
    left: {
      type: Number,
      default: 0,
    },
    margin: {
      type: String,
      default: 'auto',
    },
  },
  computed: {
    styles () {
      const styles = {
        width: `${this.width}px`,
        height: `${this.height}px`,
        top: `${this.top}px`,
        bottom: `${this.bottom}px`,
        right: `${this.right}px`,
        left: `${this.left}px`,
        color: `${this.fg}`,
        margin: `${this.margin}`,
        backgroundColor: `${this.bg}`,
      };

      if (this.top && !this.bottom) {
        delete styles.bottom;
      } else if (this.bottom && !this.top) {
        delete styles.top;
      }

      if (this.left && !this.right) {
        delete styles.right;
      } else if (this.right && !this.left) {
        delete styles.left;
      }

      return styles;
    }
  }
}
</script>

<style>
.object {
  position: absolute;
  border-radius: 10px;
}
.object--title {
  position: absolute;
  width: 100%;
  text-align: center;
  left: 0px;
  right: 0px;
  margin: auto;
  color: white;
}
.object--title.top {
  top: -30px;
}
.object--title.bottom {
  bottom: -30px;
}
</style>