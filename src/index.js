import Logger 				from './logger';
import ComponentRegistry 	from './component-registry';

function main(){
	let logger = new Logger();

	if(! window.pageData){
		logger.logError("No PageData", "No page data available.");
		logger.endMutaGroup();
		return;
	}

	let registryUri	 	= window.pageData.registry;
	let registry 		= new ComponentRegistry(logger, registryUri);
	logger.endMutaGroup();
}

main();

export let Muta = {
	Logger,
	ComponentRegistry
};
