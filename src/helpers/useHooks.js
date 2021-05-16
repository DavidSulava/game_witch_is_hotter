import {computed} from 'vue';
import {useStore} from 'vuex';


export function useState(arr){

    const store = useStore();
    const kPair = arr.map((k)=>[ k, computed(()=>store.state[k]) ] );

    return Object.fromEntries(kPair)
}
export function useGetter(arr){

    const store = useStore();
    const kPair = arr.map((k)=>[ k, computed(()=>store.getters[k]) ] );

    return Object.fromEntries(kPair)
}
export function useMutation(arr){

    const store = useStore();
    const kPair = arr.map((k)=>[ k, input => computed(()=>store.commit(k, input)).value ] );

    return Object.fromEntries(kPair)
}
export function useDispatch(arr){
    const store = useStore();
    const kPair = arr.map((k)=>[ k, input => computed(()=>store.dispatch(k, input)).value ] );

    return Object.fromEntries(kPair)
}