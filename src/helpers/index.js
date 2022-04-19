const sleep = (time) => {
  return new Promise(resolve => setTimeout(resolve, time))
}

const shuffle = (array) => {
  let currentIndex = array.length,
      randomIndex;

  while (currentIndex != 0) {

    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }

  return array;
}

const generateRandomArray = (length, min = 3, max = 70) =>{
    const result = [];
    
    for(let i = 0; i < length;){
        const number = Math.floor(min + Math.random() * (max + 1 - min));
        if(!result.find(el => el.value === number)){
            result[i] = {value: number, active: false};
            i++;
        }
    }

    return result;
}

export {sleep, shuffle, generateRandomArray};