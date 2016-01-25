import pack from 'ndarray-pack';

function chunk(array, shape) {
  array = array.shape ? array : pack(array);

  if (array.shape.length !== shape.length) throw new Error('Shape mismatch');

  let rank = shape.length;

  let remainders = [];
  let nChunks = [];
  for (let i = 0; i < rank; ++i) {
    remainders.push(array.shape[i] % shape[i]);
    nChunks.push(Math.floor(array.shape[i] / shape[i]) + !!remainders[i]);
  }

  let chunks = [];
  let hiCoor = [];
  let loCoor = [];
  let curChunks = chunks;

  // TODO: Generalize to n-dimensional chunking and remove dups
  if (rank === 2) {
    for (let j = 0; j < nChunks[0]; ++j) {
      curChunks = chunks[j] = [];
      hiCoor[0] = Math.min(j * shape[0] + shape[0], array.shape[0]);
      loCoor[0] = j * shape[0];

      for (let i = 0; i < nChunks[1]; ++i) {
        hiCoor[1] = Math.min(i * shape[1] + shape[1], array.shape[1]);
        loCoor[1] = i * shape[1];
        curChunks[i] = array.hi(...hiCoor).lo(...loCoor);
      }
    }
  } else {
    for (let i = 0; i < nChunks[0]; ++i) {
      hiCoor[0] = Math.min(i * shape[0] + shape[0], array.shape[0]);
      loCoor[0] = i * shape[0];
      curChunks[i] = array.hi(...hiCoor).lo(...loCoor);
    }
  }
  return chunks;
}

export {
  chunk
};
