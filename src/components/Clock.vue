<template>
  <div class="clock">
    <img src="/assets/clock.svg" alt="Clock"/>
    <div class="counter">{{ counter }}</div>
    <span class="floating-message">zZz</span> 
  </div>
</template>

<script>
export default {
  data () {
    return {
      counter: null
    }
  },
  methods: {
    async countdown (second) {
      return new Promise(resolve => {
        this.counter = second;
        const interval = setInterval(() => {
          this.counter -= 1;
          if (this.counter == 0) {
            clearInterval(interval);
            resolve();
          }
        }, 1000);
      });
    }
  }
}
</script>

<style>
.clock {
  width: 50px;
  height: 50px;
  position: absolute;
  left: 360px;
  top: 212.5px;
  text-align: center;
}

.clock img {
  width: 100%;
  height: 100%;
}

.clock .counter {
  position: absolute;
  top: 0px;
  left: 0px;
  bottom: 0px;
  right: 0px;
  margin: auto;
  width: 40px;
  height: 40px;
  text-align: center;
  line-height: 45px;
  font-weight: bold;
}

span.floating-message {
  display: inline-block;
  position: absolute;
  top: -20px;
  left: 0px;
  text-align: center;
  width: 100%;
  transform: rotate(-10deg);
  -webkit-animation: floating 2s linear infinite;
  -moz-animation: floating 2s linear infinite;
  animation: floating 2s linear infinite;

}

@-moz-keyframes floating { 
  50% { 
    -moz-transform:  translateY(-5px) scale(1.1) rotate(5deg); 
  }
  100% { 
    -moz-transform:  translateY(0px) scale(1) rotate(-5deg); 
  }
}

@-webkit-keyframes floating { 
  50% { 
    -webkit-transform:  translateY(-5px) scale(1.1) rotate(5deg); 
  }
  100% { 
    -webkit-transform:  translateY(0px) scale(1) rotate(-5deg); 
  }
}

@keyframes floating { 
  50% { 
    -webkit-transform:  translateY(-5px) scale(1.1) rotate(5deg); 
    transform:  translateY(-5px) scale(1.1); 
  }
  100% { 
    -webkit-transform:  translateY(0px) scale(1) rotate(-5deg); 
    transform:  translateY(0px) scale(1) rotate(-5deg); 
  }
}
</style>