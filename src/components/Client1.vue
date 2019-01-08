<template>
  <obj id="client-1" 
    title="Client 1"
    title-position="bottom"
    bg="#1E88E5" 
    :width="100"
    :height="100"
    :left="75">
    <div class="notifications-count" :class="{
      'not-empty': notificationsCount > 0,
      'blast': blast
    }">
      <transition name="slide-fade">
        <div v-if="tooltip" class="tooltip">
          {{ tooltip }}
        </div>
      </transition>
      {{ notificationsCount }}
    </div>
    <div class="actions" v-if="buttons">
      <button v-if="!polling" class="btn" @click="triggerRunPolling">
        Run Polling
      </button>
      <!-- <button v-if="polling" class="btn" @click="triggerStopPolling">
        Stop Polling
      </button> -->
    </div>
  </obj>
</template>

<script>
export default {
  props: {
    notificationsCount: {
      type: Number,
      default: 0,
    },
    polling: {
      type: Boolean,
      default: false,
    },
    buttons: {
      type: Boolean,
      default: false,
    },
  },
  data () {
    return {
      blast: false,
      tooltip: '',
    }
  },
  watch: {
    notificationsCount (b, a) {
      const added = b - a;
      if (added > 0) {
        this.showTooltip(`${added} new notification${added > 1 ? 's' : ''}`);
      }
    }
  },
  mounted () {
  },
  methods: {
    triggerRunPolling () {
      this.$emit('run');
    },
    triggerStopPolling () {
      this.$emit('stop');
    },
    async blastNotification () {
      return new Promise(resolve => {
        this.blast = true;
        setTimeout(() => {
          this.blast = false;
          setTimeout(() => {
            resolve();
          }, 250);
        }, 250);
      });
    },
    showTooltip (message) {
      this.tooltip = message;
      setTimeout(() => {
        this.tooltip = '';
      }, 1500);
    }
  }
}
</script>

<style>
.notifications-count {
  position: absolute;
  left: 0px;
  right: 0px;
  top: 0px;
  bottom: 0px;
  margin: auto;
  width: 40px;
  height: 40px;
  color: #607D8B;
  line-height: 40px;
  background: #21272A;
  text-align: center;
  font-weight: bold;
  border-radius: 50%;
  transition: box-shadow .25s ease-out;
  box-shadow: 0px 0px 0px 0px rgba(255, 255, 255, 0);
}

.notifications-count.not-empty {
  background: #C2185B;
  color: white;
}

.notifications-count.blast {
  box-shadow: 0px 0px 0px 10px rgba(255, 0, 0, .3);
}

.actions {
  position: absolute;
  bottom: -70px;
  width: 100%;
}

.actions .btn {
  width: 100%;
  margin-top: 10px;
}

.tooltip {
  position: absolute;
  width: 200px;
  background: #C2185B;
  color: white;
  border-radius: 5px;
  left: -80px;
  top: -60px;
  font-weight: normal;
}
.tooltip:after {
  content: '';
  position: absolute;
  border-top: 10px solid #C2185B;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-bottom: none;
  bottom: -10px;
  left: 0;
  right: 0;
  width: 0px;
  margin: auto;
}

.slide-fade-enter-active, .slide-fade-leave-active {
  transform: translateY(0px) scale(1);
  transition: all .2s ease-in;
}
.slide-fade-enter, .slide-fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translateY(20px) scale(0.75);
}
</style>