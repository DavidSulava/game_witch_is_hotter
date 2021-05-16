<template>
  <div class="c_history">
    <h3 class='settings'>History:</h3>
    <div v-for="[index, item] of list.entries()" :key="index" class="history">

      <div class="c_row">
          <div v-for="city in item.citys" :key="city.name" class='history_item'>
              <p>{{city.name}}</p>
              <p>{{city.temp}}</p>
          </div>
          <div>
              <p>{{item.status?check:cross}}</p>
          </div>
      </div>

    </div>
  </div>
</template>

<script>


export default {
  name: 'History',
  props:['list'],

  setup({ list }){

      const check = '✔️';
      const cross = '❌';

    return { list, check, cross }
  }
}

</script>