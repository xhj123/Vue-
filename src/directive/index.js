import Vue from 'vue'
import {checkArray} from '../common/array.js'

Vue.directive('display-key', {
    inserted:(el,binding) => {
      let displayKey = binding.value;
      // console.log(displayKey)
      if(displayKey) {
        let isHas = checkArray(displayKey);
        if(!isHas) {
          el.parentNode && el.parentNode.removeChild(el);
        } else {
          // throw new Error('你应该添加display-key')
        }
      }
    }
  })