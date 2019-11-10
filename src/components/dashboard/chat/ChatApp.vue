<template>
    <v-row>
        <v-col cols="3">
             <v-card
                max-width="500"
                class="mx-auto"
            >
                <v-toolbar flat>
                <v-app-bar-nav-icon></v-app-bar-nav-icon>

                <v-toolbar-title>Chat</v-toolbar-title>

                <v-spacer></v-spacer>

                <v-btn icon>
                    <v-icon>mdi-magnify</v-icon>
                </v-btn>
                </v-toolbar>

                <v-list subheader>
                <v-subheader>Recent chat</v-subheader>

                <v-list-item
                    v-for="item in friends"
                    :key="item.id"
                    @click="selectFriend(item)"
                >
                    <v-list-item-avatar>
                      <v-icon>mdi-account</v-icon>
                    </v-list-item-avatar>

                    <v-list-item-content>
                    <v-list-item-title v-text="item.name"></v-list-item-title>
                    </v-list-item-content>

                    <v-list-item-icon>
                    <v-icon>chat_bubble</v-icon>
                    </v-list-item-icon>
                </v-list-item>
                </v-list>

            </v-card>
        </v-col>
        <v-col cols="9">
            <v-card style="">
                <v-toolbar flat>
                <v-toolbar-title>{{selectedFriend.name? selectedFriend.name : 'Chat'}}</v-toolbar-title>
                </v-toolbar>
                <v-divider></v-divider>
                <v-card-text  style="height: 500px; overflow: auto;" @scroll="onScroll" v-chat-scroll="{always: false, smooth: true, scrollonremoved:true}">
                    <div v-for="(item, index) in chats" :key="index">
                      <div v-if="selectedFriend.id != undefined">
                        <div v-if="currentUser.id == item.user_id" class="outgoing_msg">
                            <div class="sent_msg">
                                <p>{{item.chat}}</p>
                            <span class="time_date"> {{moment(item.created_at).format('LT')}} | {{moment(item.created_at).format('dddd')}}</span> </div>
                        </div>

                          <div v-else  class="incoming_msg">
                            <div class="received_msg">
                                <div class="received_withd_msg">
                                <p>{{item.chat}}</p>
                                <span class="time_date"> {{moment(item.created_at).format('LT')}} | {{moment(item.created_at).format('dddd')}}</span></div>
                            </div>
                          </div>
                      </div>
                    </div>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions>
                    <v-text-field class="pa-5" v-model="message" placeholder="Enter message"></v-text-field>
                    <v-btn :loading="loading" :disabled="this.message==''? true : false" @click="sendChat">Send</v-btn>
                </v-card-actions>
            </v-card>
        </v-col>
    </v-row>
</template>
<script>
var moment = require('moment');
import Vue from 'vue';
import VueChatScroll from 'vue-chat-scroll';
import 'vue-chat-scroll/dist/vue-chat-scroll.js';
Vue.use(VueChatScroll);
export default {
  data: () => ({
      moment: moment,
      selectedFriend: {},
      message: '',
      loading: false,
      // chats: [
      //   { chat: 'Hello Travis Howard', user_id: 1, created_at: 2017-12-22},
      //   { chat: 'Hi', user_id: 2, created_at: 2017-12-22},
      //   { chat: 'Hello Travis Howard', user_id: 1, created_at: 2017-12-22},
      //   { chat: 'Hi', user_id: 2, created_at: 2017-12-22},
      //   { chat: 'Hello Travis Howard', user_id: 1, created_at: 2017-12-22},
      //   { chat: 'Hi', user_id: 2, created_at: 2017-12-22},
      //   { chat: 'Hello Travis Howard', user_id: 1, created_at: 2017-12-22},
      //   { chat: 'Hi', user_id: 2, created_at: 2017-12-22},
      //   { chat: 'Hello Travis Howard', user_id: 1, created_at: 2017-12-22},
      //   { chat: 'Hi', user_id: 2, created_at: 2017-12-22},
      // ],
    }),
  created() {//User_id.Reciever_id
    
    //if (this.selectedFriend.id) {
      var userId = this.currentUser.id;
      var receiverId = this.selectedFriend.id;
      console.log(userId, receiverId)
      
      //if (this.selectedFriend.id != undefined) {
        //console.log(`Chat.${this.currentUser.id}.${this.selectedFriend.id}`)
        window.Echo.channel('Chat.'+ userId)
          .listen('BroadcastChat', (e) => {
              console.log(e);
              console.log('Success');
              if (e.chat.receiver_id == userId) {
                this.$store.commit('pushChat', e.chat)
              }
              
          })
      //}
          //window.Echo.channel(`Chat.${this.selectedFriend.id}.${this.currentUser.id}`)
          
    //}

        this.getFriends()
  },
  methods: {
    sendChat() {
      let form = {
        receiver_id: this.selectedFriend.id,
        chat: this.message
      }
    this.loading = true
      this.$store.dispatch('sendChat', form)
        .then(res => {
          this.loading = false
          this.message = ''
        })

    },
    selectFriend(item) {
      this.selectedFriend = item
      this.getChats(item.id)
      console.log(`Chat.${this.currentUser.id}.${this.selectedFriend.id}`)
    },
    onScroll ({ target: { scrollTop, clientHeight, scrollHeight }}) {
      if (scrollTop + clientHeight >= scrollHeight) {
        if (this.selectedFriend.id) {
          this.getChats(this.selectedFriend.id)
        }
      }
    },
    getFriends(id) {
      this.loading = true
      this.$store.dispatch('retrieveFriends')
        .then(res => {
          this.loading = false
        })
    },
    getChats(id) {
      this.loading = true
      this.$store.dispatch('retrieveChats', id)
        .then(res => {
          this.loading = false
        })
    }
  },
    computed: {
        currentUser(){
            return JSON.parse(this.$store.state.auth.currentUser)
        },
        chats(){
            return this.$store.getters['retrieveChats']
        },
        friends(){
            return this.$store.getters['retrieveFriends']
        },
    },
}
</script>
<style scoped>

.image
{   

    margin-right: 10px;
    border-radius: 50%;
    height: 50px;
    width: 50px;
}
.name-count
{   
    margin-left: 10px;
    margin-top: 5px;
}


	





.wrapper {
  position: relative;
}

.regular-input {
  padding: 0.5rem 1rem;
  border-radius: 3px;
  border: 1px solid #ccc;
  width: 20rem;
  height: 12rem;
}

.emoji-invoker {
  position: absolute;
  top: 0.5rem;
  right: 4rem;
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.2s;
}
.emoji-invoker:hover {
  transform: scale(1.1);
}
.emoji-invoker > svg {
  fill: #b1c6d0;
}

.emoji-picker {
  position: absolute;
  z-index: 1;
  font-family: Montserrat;
  border: 1px solid #ccc;
  width: 15.5rem;
  height: 20rem;
  overflow: scroll;
  padding: 1rem;
  box-sizing: border-box;
  border-radius: 0.5rem;
  background: #fff;
  box-shadow: 1px 1px 8px #c7dbe6;
  overflow-x: hidden;
}
.emoji-picker__search {
  display: flex;
}
.emoji-picker__search > input {
  flex: 1;
  border-radius: 10rem;
  border: 1px solid #ccc;
  padding: 0.5rem 1rem;
  outline: none;
}
.emoji-picker h5 {
  margin-bottom: 0;
  color: #b1b1b1;
  text-transform: uppercase;
  font-size: 0.8rem;
  cursor: default;
}
.emoji-picker .emojis {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.emoji-picker .emojis:after {
  content: "";
  flex: auto;
}
.emoji-picker .emojis span {
  padding: 0.2rem;
  cursor: pointer;
  border-radius: 5px;
}
.emoji-picker .emojis span:hover {
  background: #ececec;
  cursor: pointer;
}





img{ max-width:100%;}


.incoming_msg_img {
  display: inline-block;
  width: 7%;
}
.received_msg {
  display: inline-block;
  padding: 0 0 0 10px;
  vertical-align: top;
  width: 92%;
 }
 .received_withd_msg p {
  background: #ebebeb none repeat scroll 0 0;
  border-radius: 20px 20px 20px 3px;
  color: #646464;
  font-size: 14px;
  margin: 0;
  padding: 5px 10px 5px 12px;
  width: 100%;
}
.time_date {
  color: #747474;
  display: block;
  font-size: 12px;
  margin: 8px 0 0;
}
.received_withd_msg { width: 57%;}
.mesgs {
  float: left;
  padding: 30px 15px 0 25px;
  width: 60%;
}

 .sent_msg p {
  background: #42a5f5 none repeat scroll 0 0;
  border-radius: 20px 20px 3px 20px;
  font-size: 14px;
  margin: 0; color:#fff;
  padding: 5px 10px 5px 12px;
  width:100%;
}
.outgoing_msg{ overflow:hidden; margin:26px 0 26px;}
.sent_msg {
  float: right;
  width: 46%;
}


</style>