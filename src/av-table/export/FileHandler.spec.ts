import {base64ToBlob} from './FileHandler';

describe('#Should create a new blob from a text', () => {
  it('should create a blob', () => {
    const result = base64ToBlob('SGVsbG8gQXZlbmdlcnMhDQo=', 'text/plain');
    expect(result).not.toBe(null);
  });
});
