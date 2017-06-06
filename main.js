var socket = io();

Vue.component('message',{
      props: ['message'],
      template:`<li class="chatMessage">
                  <div class="sender">
                    <h3>{{message.senderId + " - " + message.sender}}</h3>
                  </div>
                  <div class="messageText">
                    <span class="tag is-info is-large">{{message.text}}</span>
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
      setTimeout(function(){
        let elem = document.getElementById('mychatbox');
        let boxHeight = elem.scrollHeight + 100;
        elem.scrollTop = boxHeight;
        });
    }.bind(this))
  },
  methods:{
    send:function(){
      if(this.msgtext.length)
      {
        this.msg = {sender:'fan',text:this.msgtext,senderId:socket.id}
        socket.emit('chat.message', this.msg);
        this.msgtext = '';
        this.msg = {};
      }
    }
  }
})