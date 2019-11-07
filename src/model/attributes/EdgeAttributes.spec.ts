import { GraphvizObject } from '../../common/abstract';
import { EdgeAttributes } from './EdgeAttributes';

describe('class EdgeAttributes', () => {
  let attrs: EdgeAttributes;
  beforeEach(() => {
    attrs = new EdgeAttributes();
  });

  it('should be instance of GraphvizObject', () => {
    expect(attrs).toBeInstanceOf(GraphvizObject);
  });

  it('size should be 0 by default', () => {
    expect(attrs.size).toBe(0);
  });

  describe('renders correctly by toDot method', () => {
    it('no attributes', () => {
      expect(attrs.toDot()).toMatchSnapshot();
    });

    it('one attribute', () => {
      attrs.set('label', 'test');
      expect(attrs.toDot()).toMatchSnapshot();
    });

    it('some attributes', () => {
      attrs.set('label', 'test');
      attrs.set('color', 'red');
      expect(attrs.toDot()).toMatchSnapshot();
    });
  });
});
