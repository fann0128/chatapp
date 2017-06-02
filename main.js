var socket = io();
new Vue({
  el:'#chat-app',
  data:{
    msg:'',
    msgHis:[],
  },
  created: function(){
    socket.on('chat.message',function(message){
      this.msgHis.push(message)
    }.bind(this));
  },
  methods:{
    send:function(){
      socket.emit('chat.message', this.msg);
      this.msg = '';
    }
  }
})
