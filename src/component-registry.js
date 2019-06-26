import Ajax 		from './ajax';
import Component	from './component';

export default class ComponentRegistry{

	constructor(logger, uri){
		this.logger 				= logger;
		this.componentDefinitions 	= {};
		this.components 			= {};
		this.loadComponentDefinitions(uri);
	}

	loadComponentDefinitions(uri){
		Ajax.get(uri)
			.then(	this.setComponentDefinitions.bind(this))
			.catch(	this.handleError.bind(this));
	}

	setComponentDefinitions(componentData){
		this.componentDefinitions = JSON.parse(componentData);

		if(this.logger)
			this.logger.logInfo("Component registry loaded:", this.componentDefinitions);

		this.loadComponents();
	}

	handleError(errorMessage){
		if(this.logger)
			this.logger.logError("Registry Error: Load components:", errorMessage);
	}

	loadComponents(){
		for(let componentName in this.componentDefinitions){
			const componentUri 	= this.componentDefinitions[componentName];
			const component 	= new Component(this.logger, 
												componentName, 
												componentUri);
			this.components[componentName] = component;
		}
	}
}