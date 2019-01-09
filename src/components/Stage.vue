<template>
  <div class="stage">
    <h1 class="title">
      <img src="/assets/logo.svg" alt="Foobarology" class="logo">
      <br>
      Server Sent Events (SSE)
    </h1>

    <client-1-http-path :active="client1HttpActive" :streaming="eventStreamActive" :text="client1HttpText"></client-1-http-path>
    <client-1-app-db-path :active="client1AppDbActive" :text="client1AppDbText"></client-1-app-db-path>
    <client-2-http-path :active="client2HttpActive" :text="client2HttpText"></client-2-http-path>
    <client-2-app-db-path :active="client2AppDbActive" :text="client2AppDbText"></client-2-app-db-path>
    <app-db-path :active="client1AppDbActive || client2AppDbActive" :text="client1AppDbText"></app-db-path>

    <client-1 ref="client1" 
      :notifications-count="notificationsCount"
      :polling="polling"
      :buttons="buttons"
      @run="client1StartStream"
      @stop="client1StopStream">
    </client-1>
    <app ref="app" :active="client1AppDbActive || client2AppDbActive"></app>
    <database ref="database" :messages="messages"></database>
    <bullet ref="client2HttpBullet"></bullet>
    <client-2 ref="client2" :buttons="buttons" :submitting="client2HttpActive" @post="client2PostMessage"></client-2>

    <bullet ref="client1HttpBullet"></bullet>
    <bullet ref="client1StreamBullet"></bullet>
    <bullet ref="client1AppToDatabaseBullet"></bullet>
    <bullet ref="client2AppToDatabaseBullet"></bullet>

    <transition name="fade">
      <clock v-show="showClock" ref="clock"></clock>
    </transition>

    <footer>
      &copy; 2019 by Foobarology 
      <span class="sep">/</span>
      <a target="_blank" href="https://www.instagram.com/foobarology">instagram</a> 
      <span class="sep">/</span>
      <a target="_blank" href="https://www.facebook.com/foobarology">facebook</a> 
      <span class="sep">/</span>
      <a target="_blank" href="https://www.github.com/foobarology">github</a> 
    </footer>
  </div>
</template>

<script>
import App from './App';
import Clock from './Clock';
import Database from './Database';
import Bullet from './Bullet';
import AppDbPath from './AppDbPath';
import Client1 from './Client1';
import Client1HttpPath from './Client1HttpPath';
import Client1AppDbPath from './Client1AppDbPath';
import Client2 from './Client2';
import Client2HttpPath from './Client2HttpPath';
import Client2AppDbPath from './Client2AppDbPath';

export default {
  components: { 
    App, 
    Clock, 
    Database,
    AppDbPath,
    Client1,
    Client1HttpPath,
    Client1AppDbPath,
    Client2,
    Client2HttpPath,
    Client2AppDbPath,
    Bullet,
  },
  data () {
    return {
      polling: false,
      messages: [],
      notificationsCount: 0,
      buttons: true,

      showClock: false,

      client1HttpActive: false,
      client1HttpText: '',
      client1AppDbActive: false,
      client1AppDbText: '',

      client2HttpActive: false,
      client2HttpText: '',
      client2AppDbActive: false,
      client2AppDbText: '',

      eventStreamActive: false,
    }
  },
  mounted () {
    window.onkeydown = e => {
      if (e.ctrlKey && e.keyCode == 13) {
        if (this.buttons) {
          this.buttons = false;
        } else if (!this.polling) {
          this.client1StartStream();
        } else {
          if (!this.client2HttpActive) {
            this.client2PostMessage();
          }
        }
      }
    };
  },
  methods: {
    client1StartStream () {
      this.polling = true;
      this.client1DoPolling();
    },
    
    client1StopStream () {
      this.polling = false;
    },
    
    async client1DoPolling () {
      if (this.polling) {
        this.client1HttpActive = true;
        await this.client1RequestToApp();
        this.client1AppDbActive = true;
        const messages = await this.appGetMessagesFromDatabase();
        this.client1AppDbActive = false;
        await this.appResponseToClient1(messages);
        this.client1HttpActive = false;

        if (this.polling) {
          await this.client1DoPolling();
        }
      }
    },

    async client1RequestToApp () {
      // Reset bullet text
      this.eventStreamActive = false;
      this.client1HttpText = 'http request';
      this.$refs.client1HttpBullet.setText('');

      // Move bullet from client 1 to app
      await this.$refs.client1HttpBullet.move({x: 160, y: 225}, {x: 370, y: 225}, {
        duration: 750,
        message: 'http request',
        messagePosition: 'top',
        color: '#21A9BE',
      });

      this.client1HttpText = 'text/event-stream';
      this.eventStreamActive = true;
    },

    async clockCountdown (second) {
      this.showClock = true;
      await this.$refs.clock.countdown(second);
      this.showClock = false;
    },

    async appGetMessagesFromDatabase () {
      // Reset bullet text
      this.$refs.client1AppToDatabaseBullet.setText('');

      // Move bullet from app to database
      await this.$refs.client1AppToDatabaseBullet.move({x: 370, y: 225}, {x: 445.5, y: 225}, {
        duration: 200,
        message: 'get messages',
        color: '#187F8F',
        messagePosition: 'top',
      });
      await this.$refs.client1AppToDatabaseBullet.move({x: 445.5, y: 225}, {x: 445.5, y: 77.5}, {
        duration: 500,
        message: 'get messages',
        color: '#187F8F',
        messagePosition: 'top',
      });

      // Get all messages
      const messages = this.messages.splice(0, this.messages.length);

      // Set bullet text
      await this.$refs.client1AppToDatabaseBullet.glow(300);
      this.$refs.client1AppToDatabaseBullet.setText(messages.length);
      await this.$refs.client1AppToDatabaseBullet.glow(300);

      // Move bullet back from database to app
      await this.$refs.client1AppToDatabaseBullet.move({x: 445.5, y: 75}, {x: 445.5, y: 225}, {
        duration: 500,
        message: 'get messages',
        color: '#187F8F',
        messagePosition: 'top',
      });
      await this.$refs.client1AppToDatabaseBullet.move({x: 445.5, y: 225}, {x: 370, y: 225}, {
        duration: 200,
        message: 'get messages',
        color: '#187F8F',
        messagePosition: 'top',
      });

      // Hide bullet
      this.$refs.client1AppToDatabaseBullet.hide();

      if (messages.length) {
        this.streamMessages(messages);
      }

      await this.clockCountdown(5);
      return this.appGetMessagesFromDatabase();
    },
    async streamMessages (messages) {
      this.client1HttpText = 'data: ' + messages.length;
      await this.$refs.client1StreamBullet.move({x: 370, y: 225}, {x: 110, y: 225}, {
        duration: 750,
        message: 'http request',
        messagePosition: 'top',
        color: '#DA842A',
        text: messages.length,
      });
      this.client1HttpText = 'text/event-stream';

      this.notificationsCount += messages.length;
      this.$refs.client1StreamBullet.hide();
      await this.$refs.client1.blastNotification();

    },

    async client2PostMessage () {
      this.client2HttpActive = true;
      await this.client2RequestToApp();
      this.client2AppDbActive = true;
      await this.appInsertMessageToDatabase();
      this.client2AppDbActive = false;
      await this.appResponseToClient2();
      this.client2HttpActive = false;
    },

    async client2RequestToApp () {
      // Reset bullet text
      this.client2HttpText = 'http request';
      this.$refs.client2HttpBullet.setText('');

      // Move bullet from client 1 to app
      await this.$refs.client2HttpBullet.move({x: 770, y: 225}, {x: 520, y: 225}, {
        duration: 750,
        message: 'http request',
        messagePosition: 'top',
        color: '#65B83F',
        text: '1',
      });
      this.$refs.client2HttpBullet.setText('');
    },

    async appInsertMessageToDatabase () {
      // Set bullet text
      this.$refs.client2AppToDatabaseBullet.setText('1');

      // Move bullet from app to database
      await this.$refs.client2AppToDatabaseBullet.move({x: 520, y: 225}, {x: 445.5, y: 225}, {
        duration: 200,
        message: 'insert new message',
        color: '#4B8A2F',
        messagePosition: 'top',
      });
      await this.$refs.client2AppToDatabaseBullet.move({x: 445.5, y: 225}, {x: 445.5, y: 77.5}, {
        duration: 500,
        message: 'get messages',
        color: '#4B8A2F',
        messagePosition: 'top',
      });

      // Get all messages
      this.messages.push('message');

      // Set bullet text
      await this.$refs.client2AppToDatabaseBullet.glow(300);
      this.$refs.client2AppToDatabaseBullet.setText('');
      await this.$refs.client2AppToDatabaseBullet.glow(300);

      // Move bullet back from database to app
      await this.$refs.client2AppToDatabaseBullet.move({x: 445.5, y: 75}, {x: 445.5, y: 225}, {
        duration: 500,
        message: 'get messages',
        color: '#4B8A2F',
        messagePosition: 'top',
      });
      await this.$refs.client2AppToDatabaseBullet.move({x: 445.5, y: 225}, {x: 520, y: 225}, {
        duration: 200,
        message: 'get messages',
        color: '#4B8A2F',
        messagePosition: 'top',
      });

      // Hide bullet
      this.$refs.client2AppToDatabaseBullet.hide();
    },

    async appResponseToClient2 () {
      this.client2HttpText = 'http response';
      await this.$refs.client2HttpBullet.move({x: 520, y: 225}, {x: 770, y: 225}, {
        duration: 750,
        message: 'http response',
        messagePosition: 'top',
        color: '#65B83F',
      });

      this.client2HttpText = '';
      this.$refs.client2HttpBullet.hide();
    },

  }
}
</script>

<style lang="css">
* {
  font-family: sans-serif;
}

body {
  background: #21292E;
  color: white;
  text-align: center;
}

.title {
  margin-top: -100px;
  color: #7B989D;
  font-weight: normal;
}

.title .logo {
  clear: both;
}

.btn {
  background: #345257;
  color: white;
  border: none;
  border-radius: 3px;
  font-size: 10px;
  padding: 6px 12px;
  text-align: center;
  cursor: pointer;
}

.btn:hover {
  background-color: #2D484C;
}

.btn:focus {
  outline: none;
}

.btn:disabled {
  background-color: #2B3435;
  cursor: default;
  opacity: .5;
}

.stage {
  position: absolute;
  width: 920px;
  height: 480px;
  background: transparent;
  /*border: 1px solid rgba(0,0,0,.5);*/
  margin: auto;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
}

.fade-enter-active, .fade-leave-active {
  transform: scale(1);
  transition: all .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: scale(1.5);
}

footer {
  position: fixed;
  bottom: 15px;
  text-align: center;
  width: 100%;
  left: 0px;
  color: #729297;
  font-size: .9rem;
}

footer a[href] {
  color: #42818A;
  text-decoration: none;
}

footer .sep {
  opacity: .2;
}
</style>