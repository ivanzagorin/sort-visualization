import store from '@/store';
import { sleep } from '@/helpers';

const merge = async (left, right, leftLimit, rightLimit, array, buffer) => {
  let i = left;

  const insertBuffer = async (el) => {
    if (typeof el !== 'undefined') {
      el.active = true;
      store.commit('setSortingArray', buffer);
      await sleep(50);
    }
  }
  
  while (left < leftLimit && right < rightLimit) {
    if (array[left].value <= array[right].value) {
      buffer[i++] = array[left++];
    } else {
      buffer[i++] = array[right++];
    }
    await insertBuffer(buffer[i]);
  }

  while (left < leftLimit) {
    buffer[i++] = array[left++];
    await insertBuffer(buffer[i]);
  }

  while (right < rightLimit) {
    buffer[i++] = array[right++];
    await insertBuffer(buffer[i]);
  }
}

const mergeSort = async () => {

  store.commit('generateSortingArray');
  await sleep(500);

  let array = store.getters.sortingArray;
  let n = array.length;
  let buffer = new Array(n);
  
  for (let size = 1; size < n; size *= 2) {
    if (size > 1) {
      buffer = buffer.map(el => {
        el.active = false
        return el;
      });
    }
    for (let leftStart = 0; leftStart < n; leftStart += 2*size) {
      
      let left = leftStart,
          right = Math.min(left + size, n),
          leftLimit = right,
          rightLimit = Math.min(right + size, n);
      
      if (size > 1) {
        await sleep(100);
      }
      await merge(left, right, leftLimit, rightLimit, array, buffer);
    }
    
    let temp = array;
    array = buffer;
    buffer = temp;
  }
  
  array = array.map(el => {
    el.active = false;
    return el;
  })
  store.commit('setSortingArray', array);
  array.forEach((_, i) => {
    setTimeout(() => {
      array[i].active = true
    }, i * 25);
  });
  await sleep(25 * array.length);
}

export default mergeSort;