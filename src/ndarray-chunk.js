import pack from 'ndarray-pack';

function chunk(array, shape) {
  array = array.shape ? array : pack(array);

  if (array.shape.length !== shape.length) throw new Error('Shape mismatch');

  let rank = shape.length;
  if(rank === 1) {
    let remainder = array.shape[0] % shape[0];
    let nChunk = Math.floor(array.shape[0] / shape[0]) + !!remainder;
    let chunks = new Array(nChunk);
    for(var i = 0; i < nChunk; ++i) {
      chunks[i] = array
        .hi(Math.min(i * shape[0] + shape[0], array.shape[0]))
        .lo(i * shape[0]);
    }
    return chunks;
  } else if(rank === 2) {
    let remainder0 = array.shape[0] % shape[0];
    let remainder1 = array.shape[1] % shape[1];
    let nChunk0 = Math.floor(array.shape[0] / shape[0]) + !!remainder0;
    let nChunk1 = Math.floor(array.shape[1] / shape[1]) + !!remainder1;
    let chunks = new Array(nChunk0);
    for(var i = 0; i < nChunk0; ++i) {
      chunks[i] = new Array(nChunk1);
      for(var j = 0; j < nChunk1; ++j) {
        chunks[i][j] = array
          .hi(
            Math.min(i * shape[0] + shape[0], array.shape[0]),
            Math.min(j * shape[1] + shape[1], array.shape[1])
          )
          .lo(
            i * shape[0],
            j * shape[1]
          );
      }
    }
    return chunks;
  } else {
    throw new Error('Unsupported rank');
  }
}

export {
  chunk
};
