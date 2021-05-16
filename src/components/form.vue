<template>
  <form>
        <p class="form_header">{{header}} :</p>

        <div class="c_input">
            <input ref='inputMetric' type="radio" :id="metric" name="units" :value="metric"
                @click="()=>setUnits('metric')"
            >
            <label :for="metric">{{metric}}</label><br>
        </div>
        <div class="c_input">
            <input ref='inputImperial' type="radio" :id="imperial" name="units" :value="imperial"
                @click="()=>setUnits('imperial')"
            >
            <label :for="imperial">{{imperial}}</label><br>
        </div>

  </form>
</template>

<script>
import { ref, onMounted } from 'vue';


export default {
    name: 'Form',
    props:['units', 'setUnits'],

    setup({units, setUnits}){

    const header   = 'Please select your units';
    const metric   = 'Celsius';
    const imperial = 'Fahrenheit';

    const inputMetric   = ref(false);
    const inputImperial = ref(false);

    onMounted(()=>{

        if( units === 'metric' )
            inputMetric.value.checked = true ;
        else
            inputImperial.value.checked = true
    })

    return {
        header, metric, imperial,
        inputMetric, inputImperial,
        setUnits
    }
    }
}

</script>