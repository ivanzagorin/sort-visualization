import store from '@/store';
import { sleep } from '@/helpers';

const sortSpeed = 100;

const swap = async (array, left, right) =>  {
  const temp = array[left]
  array[left] = array[right]
  array[right] = temp;

  array[left].active = true;
  array[right].active = true;
  store.commit('setSortingArray', array);
  await sleep(sortSpeed);
}

const partitionHigh = async (array, low, high) => {
  let pivot = array[high].value;
  let i = low;

  array.forEach((_, i) => {
    array[i].active = false;
  });
  array[high].active = true;
  array[low].active = true;
  store.commit('setSortingArray', array);
  await sleep(sortSpeed);
  
  for (let j = low; j < high; j++) {
    if (array[j].value <= pivot) {
      await swap(array, i, j);
      i++;
    }
  }
  
  await swap(array, i, high);

  array[high].active = false;
  array[low].active = false;
  store.commit('setSortingArray', array);
  
  return i;
}

const quickSort = async () => {
  store.commit('generateSortingArray');
  const array = store.getters.sortingArray;
  await sleep(500);

  let stack = [],
      start = 0,
      end = array.length - 1;
  
  stack.push({ x: start, y: end });

  while(stack.length) {
    const { x, y } = stack.shift();
    const PI = await partitionHigh(array, x, y);

    if(PI - 1 > x){
      stack.push({x: x, y: PI - 1});
    }
    
    if(PI + 1 < y){
      stack.push({x: PI + 1, y: y});
    }
  }
  
  array.forEach((_, i) => {
    setTimeout(() => {
      array[i].active = true;
    }, 25 * i);
  });
  await sleep(25 * array.length);
}

export default quickSort;