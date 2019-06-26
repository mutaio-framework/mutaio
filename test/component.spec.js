import Component from '../src/component';

describe('Component', () => {

  it('should be initializable', () => {
  	let component = new Component(undefined, "test-name", "test/path/to/test-name");

    expect(component.name).toEqual("test-name");
    expect(component.uri).toEqual("test/path/to/test-name");
  });

});
