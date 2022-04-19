import store from '@/store';
import { sleep } from '@/helpers';

const bubbleSort = async () => {
  store.commit('generateSortingArray');
  const array = store.getters.sortingArray;
  await sleep(500);

  for (let i = 1; i < array.length; i++) {
    for (let j = 0; j < array.length - i; j++) {
      array[j].active = true;
      if (array[j].value > array[j + 1].value) {
        [array[j], array[j + 1]] = [array[j + 1], array[j]];
        store.commit('setSortingArray', array);
      } else {
        array[j + 1].active = true;
      }
      await sleep(10);
    }
  }
};

export default bubbleSort;