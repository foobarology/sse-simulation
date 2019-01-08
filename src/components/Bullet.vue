<template>
  <div class="bullet" :class="{'hidden': !show, 'glowing': glowing}" :style="{
    'background': color,
    'color': textColor,
  }">
    {{ text }}
  </div>
</template>

<script>
import anime from 'animejs';

export default {
  data () {
    return {
      show: false,
      glowing: false,
      color: 'yellow',
      text: '',
      textColor: 'white',
    };
  },
  methods: {
    async move (from, to, {
      color = 'yellow', 
      message = '', 
      duration = 1000,
      text = null,
      textColor = null
    }) {
      return new Promise(resolve => {
        this.show = true;
        this.color = color;
        if (text !== null) this.text = text;
        if (textColor !== null) this.textColor = textColor;

        anime({
          targets: this.$el,
          left: [
            {value: from.x, duration: 0, easing: 'linear'},
            {value: to.x, duration, easing: 'linear'},
          ],
          top: [
            {value: from.y, duration: 0, easing: 'linear'},
            {value: to.y, duration, easing: 'linear'},
          ],
          complete: resolve
        });
      });
    },
    async glow (duration) {
      return new Promise(resolve => {
        this.glowing = true;
        setTimeout(() => {
          this.glowing = false;
          resolve();
        }, duration);
      });
    },
    async idle (duration) {
      return new Promise(resolve => {
        setTimeout(resolve, duration);
      });
    },
    hide () {
      this.show = false;
    },
    setText (text = '', textColor = '') {
      this.text = text;
      if (textColor) this.textColor = textColor;
    },
  }
}
</script>

<style>
.bullet {
  position: absolute;
  width: 30px;
  height: 30px;
  left: 0px;
  top: 0px;
  border-radius: 50%;
  background: yellow;
  text-align: center;
  line-height: 30px;
  font-weight: bold;
  transition: box-shadow .2s ease-out;
}  

.bullet.hidden {
  opacity: 0 !important;
}

.bullet.glowing {
  box-shadow: 0px 0px 0px 5px rgba(255, 0, 255, .5);
}
</style>