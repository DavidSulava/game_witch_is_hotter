import { createStore } from 'vuex'

export default createStore({
  state : {
    pair    : [],
    history : [],
    units   : 'metric',// metric || imperial
    score   : 0,
    data    : [],
  },
  getters:{
    GET_DATA:(state)=>{
      if (!state.data.length) return null;

      return[
        {
          name:state.pair[0].name,
          temp:state.pair[0].main.temp,
        },
        {
          name:state.pair[1].name,
          temp:state.pair[1].main.temp,
        }
      ]

    },
    GET_UNITS:(state)=>{
      return state.units === 'metric'? ' C':' F'
    },
  },
  mutations: {
    SET_DATA: (state, payload)=>{
      state.data = payload;
    },
    SET_UNITS: (state, payload)=>{
      state.units = payload;
    },
    SET_PAIR: (state, payload)=>{
      state.pair = payload
    },
    SET_HISTORY: (state, payload)=>{
      state.history.push(payload);
    },
    SET_SCORE: (state)=>{
      state.score += 1;
    },


  },
  actions: {
    API_CALL: async ({ commit, state, dispatch },)=>{
      try {

        // const [lat, lon] = [51.76544623067615, -1.262887951496125]; // Oxford
        const [lat, lon] = [56.85006248230474, 53.22942012532568] // Ижевск
        const apiKey = 'e413654e90c686ecc2c6a644de1e6883';

        const API    = `http://api.openweathermap.org/data/2.5/find?lat=${lat}&lon=${lon}&cnt=50&&units=${state.units}&bbox=12,32,15,37,25&lang=en&appid=${apiKey}`;

        const response = await fetch(API);
        const data     = await response.json();


        if(data && data.list) {
          commit('SET_DATA', data.list);
          dispatch('NEW_PAIR');
        }

      } catch (error) {
        console.log(error);
      }
    },
    //---Get random Cities
    NEW_PAIR: ({ commit, state })=>{

      const list        = state.data;
      const randomIndex = (length)=>Math.floor( Math.random() * (length) );

      const randomIndex_1 = randomIndex(list.length)
      const randomItem_1  = list[randomIndex_1];

      list.splice(randomIndex_1, 1);

      let randomItem_2 = list[ randomIndex(list.length) ];

      //--- if temperatures are equal then get another Random value
      while ( randomItem_1.main.temp === randomItem_2.main.temp) {
        randomItem_2 = list[ randomIndex(list.length) ];
      }

      state.pair = [randomItem_1, randomItem_2];
    }
  }
})
