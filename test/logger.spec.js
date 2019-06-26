import Logger from '../src/logger';

describe('Logger', () => {

  it('should be initializable', () => {
  	let logger = new Logger();
    expect(logger.isActive()).toBe(true);
    expect(logger.isGroupStarted()).toBe(false);
  });

  it('should be possible to disable', () => {
  	let logger = new Logger();

  	logger.deactivateLog();

    expect(logger.isActive()).toBe(false);
    expect(logger.isGroupStarted()).toBe(false);
  });

  it('should be possible to start the Muta group', () => {
  	let logger = new Logger();

  	logger.startMutaGroup();

    expect(logger.isActive()).toBe(true);
    expect(logger.isGroupStarted()).toBe(true);
  });

});
