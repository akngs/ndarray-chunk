import { expect } from 'chai'
import pack from 'ndarray-pack'
import unpack from 'ndarray-unpack'
import { chunk } from '../../src/ndarray-chunk'

describe('1D chunking', () => {
  it('should chunk 1d array', () => {
    let array = pack([1, 2, 3, 4, 5, 6]);
    let actual = chunk(array, [3]);

    expect(actual.length).to.equal(2);
    expect(unpack(actual[0])).to.deep.equal([1, 2, 3]);
    expect(unpack(actual[1])).to.deep.equal([4, 5, 6]);
  });

  it('should deal with remainder', () => {
    let array = pack([1, 2, 3, 4, 5, 6]);
    let actual = chunk(array, [4]);

    expect(actual.length).to.equal(2);
    expect(unpack(actual[0])).to.deep.equal([1, 2, 3, 4]);
    expect(unpack(actual[1])).to.deep.equal([5, 6]);
  });

  it('should return empty array if the original array is empty', () => {
    expect(chunk(pack([]), [1]).length).to.equal(0);
  });
});

describe('2D chunking', () => {
  it('should chunk 2d array', () => {
    let array = pack([
      [1, 2, 3, 4, 5],
      [6, 7, 8, 9, 10],
      [11, 12, 13, 14, 15],
      [16, 17, 18, 19, 20],
      [21, 22, 23, 24, 25]
    ]);

    let actual = chunk(array, [3, 2]);
    expect(actual.length).to.equal(2);

    expect(actual[0].length).to.equal(3);
    expect(unpack(actual[0][0])).to.deep.equal([[1, 2], [6, 7], [11, 12]]);
    expect(unpack(actual[0][1])).to.deep.equal([[3, 4], [8, 9], [13, 14]]);
  });
});

describe('Parameter checking', () => {
  it('should pack plain JS array', () => {
    expect(chunk([1, 2, 3], [2]).length).to.equal(2);
  });

  it('should check rank', () => {
    let array = pack([[1, 2], [3, 4]]);
    expect(() => chunk(array, [2])).to.throw(/Shape mismatch/);

    expect(() => chunk([[[1]]], [1, 1, 1])).to.throw(/Unsupported rank/);
  });
});
