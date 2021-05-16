<template>
  <div class="settings">
    <h3>Setting:</h3>
  </div>
  <Form :units='units' :setUnits='SET_UNITS'/>
  <History :list='history'/>
</template>

<script>
import History from '@/components/historyList.vue'
import Form from '@/components/form.vue'

import { onBeforeMount, onMounted, ref, watch } from 'vue'
import { useState, useMutation, useDispatch } from '@/helpers/useHooks.js'

export default {
  name: 'Settings',
  components: { History, Form },

  setup(){
    const { history, units } = useState(['history', 'units']);
    const { SET_UNITS }      = useMutation(['SET_UNITS']);
     const {  API_CALL }     = useDispatch(['API_CALL']);

    watch( units, (newValues, prevValues) => {
      if(newValues !== prevValues)
        API_CALL()
    })

    return { history, units, SET_UNITS }
  }
}

</script>
