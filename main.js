var socket = io();

Vue.component('message',{
      props: ['message'],
      template:`<li class="message">
                  <div class="sender">
                    <h3>{{message.sender}}</h3>
                  </div>
                  <div class="messageText">
                    <h3>{{message.text}}</h3>
                  </div>
                </li>`,
        mounted() {
        },
        methods:{
        }
    });

Vue.component('chatbox',{
      props: ['messages'],
      template:`
      <ul>
        <message v-for="message in messages" :message="message"></message>
      </ul>
      `
    });

new Vue({
  el:'#chat-app',
  data:{
    msgtext:'',
    msg:{},
    msgHis:[],
  },
  created: function(){
    socket.on('chat.message',function(message){
      this.msgHis.push(message)
    }.bind(this));
  },
  methods:{
    send:function(){
      this.msg = {sender:'fan',text:this.msgtext}
      socket.emit('chat.message', this.msg);
      this.msgtext = '';
      this.msg = {};
    }
  }
})
