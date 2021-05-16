<template>
  <div>
    <div v-if='data.length' class='c_column'>

      <div>
        <h3 class="text_qustion">{{msg}}</h3>
        <p class="score">score:
          <text class="score_text">{{score}}</text>
        </p>
      </div>

      <div class="c_row">
        <div
          @click="()=>handleSelcet(index, GET_DATA)"
          v-for="[index, item] of GET_DATA.entries()"  :key="item.name" :class="['city', { highlight:highlight.city }]">

            <p>{{item.name}}</p>
            <p>{{isCityChosen? item.temp + GET_UNITS : '?'}}</p>

        </div>
      </div>

      <button v-show="isCityChosen" @click.prevent='nextTurn' :class="{highlight:highlight.button}" >Next Turn</button>

    </div>
  </div>
</template>

<script>
import { onBeforeMount, onMounted, onUnmounted, ref } from 'vue'
import { useState, useGetter, useDispatch, useMutation } from '@/helpers/useHooks.js'


export default {
  name: 'Game',

  setup(){
    const { data, score }            = useState(['data','score']);
    const { GET_DATA, GET_UNITS }    = useGetter(['GET_DATA', 'GET_UNITS']);
    const { NEW_PAIR, API_CALL }     = useDispatch(['NEW_PAIR','API_CALL']);
    const { SET_SCORE, SET_HISTORY } = useMutation(['SET_SCORE', 'SET_HISTORY']);

    const msg_default = 'Which city is hotter ?';
    const msg_win     = 'You wone! 😀';
    const msg_lose    = 'You lose ☹️';

    let msg           = ref(msg_default);
    let isCityChosen  = ref(false);
    let isClickable   = true;
    let highlight     = ref({
      city:false,
      button: false,
    });


    if(data.value.length) NEW_PAIR();

    //--LifeCicles
    onBeforeMount(()=>{
      if(!data.value.length) API_CALL();
    });
    onMounted(()=>{
      document.addEventListener('keydown', shiftPress)
      document.addEventListener('keyup', shiftUp)
    });
    onUnmounted(()=>{
      document.removeEventListener('keydown', shiftPress);
      document.removeEventListener('keyup', shiftUp)
    })

    //--Functions
    const shiftPress = (event)=>{

        if (event.shiftKey && !event.repeat){

          highlight.value = isClickable ?
          {
            city   : true,
            button : false,
          }
          :
          {
            city   : false,
            button : true,
          }
        }
    }
    const shiftUp = (event)=>{
        if ( event.keyCode === 16 || event.charCode === 16 ){

          highlight.value = {
            city:false,
            button: false,
          }
        }
    }
    const nextTurn = ()=>{
      msg.value          = msg_default;
      isCityChosen.value = false;
      isClickable        = true;
      NEW_PAIR();
    }
    const handleSelcet = (index, array)=>{

      if(!isClickable) return;

      const secondIndex = index? 0:1;

      let tempOnTarget     = array[index].temp
      let tempOnComparable = array[secondIndex].temp;

      let isCorrect = tempOnTarget > tempOnComparable;

      if( isCorrect ){
        SET_SCORE();
        msg.value = msg_win;
      }
      else
        msg.value = msg_lose


      isCityChosen.value = true

      SET_HISTORY({
        citys:array,
        status: isCorrect
      });
      isClickable = false;
    }


    return {
      data, score,
      GET_DATA, GET_UNITS,
      msg, isCityChosen, highlight,
      handleSelcet, nextTurn
    }
  }
}
</script>

