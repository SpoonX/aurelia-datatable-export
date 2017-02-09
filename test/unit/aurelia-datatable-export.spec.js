import {configure} from 'src/index';

describe('configure callbac', () => {
  it('exports a configure callback', () => {
    expect(typeof configure).toBe('function');
  });
})
