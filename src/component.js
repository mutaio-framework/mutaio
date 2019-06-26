import Ajax from './ajax';
import tinybind from 'tinybind'

export default class Component{

	constructor(logger, name, uri){
		this.name 	= name;
		this.uri 	= uri;

		this.logger = logger;
		if(this.logger)
			this.logger.logInfo("Component initialized", this);

		this.onCreate();
	}

	onCreate(){
		const uri 			= this.uri;
		const definitionUrl = uri + "/definition.json";
		const templateUrl 	= uri + "/template.html";
		
		Promise.all([	Ajax.get(definitionUrl).then(	this.parseComponentDefinition.bind(this)),
						Ajax.get(templateUrl).then(		this.storeTemplateData.bind(this))])
				.then(	this.onRender.bind(this))
				.catch(	this.handleError.bind(this));
	}

	onRender(){
		this.dereferenceDocumentElements();
		if(this.logger)
			this.logger.logInfo("Component rendered", this.name);
	}
	
	dereferenceDocumentElements(){
		let documentElements 	= document.getElementsByTagName(this.name);
		let pageData 			= window.pageData;

		for(var elemIdx = 0; elemIdx < documentElements.length; elemIdx++){
			const element 	= documentElements[elemIdx];
			const elemData 	= this.dereferenceElementData(pageData, element, this.definition.interface);
			
			this.injectTemplateData(element, elemData, this.templateData);
		}
	}

	parseComponentDefinition(componentDefinition){
		return new Promise(function(resolve, reject){
			this.definition = JSON.parse(componentDefinition);
			resolve();
		}.bind(this));
	}

	storeTemplateData(templateData){		
		return new Promise(function(resolve, reject){
			this.templateData = templateData;
			resolve();
		}.bind(this));
	}

	handleError(errorMessage){
		let logger 	= this.logger;
		if(logger)
			logger.logError("Component Error: OnLoad:", errorMessage);
	}

	dereferenceElementData(pageData, element, elementInterface){
		let elemData = {};

		for (var attrIdx = elementInterface.length - 1; attrIdx >= 0; attrIdx--) {
			const elemAttrName 	= this.snakeToCamelCase(elementInterface[attrIdx]);
			const elemAttrValue = this.dereferenceElementValue(pageData, element, elemAttrName);

			elemData[elemAttrName] = elemAttrValue;
		}

		return elemData;
	}

	dereferenceElementValue(pageData, element, elemAttrName){
		let elemValue = element.dataset[elemAttrName];
		if(elemValue.indexOf("pageData.") !== 0)
			return elemValue;

		const pageDataAttrName = elemValue.replace("pageData.", "");
		if(! pageDataAttrName in pageData)
			return "";

		return pageData[pageDataAttrName];
	}

	injectTemplateData(element, elemData, elemTemplate){
		const elemId 		= elemData["id"];

		const newElement = this.parseHtml(elemTemplate);
		newElement.setAttribute("id", elemId);
		element.outerHTML = newElement.outerHTML;

		const bindableElem = document.getElementById(elemId);
		tinybind.bind(bindableElem, elemData);
	}

	snakeToCamelCase(str){
		return str.replace(/(-\w)/g, function(m){return m[1].toUpperCase();});
	}

	parseHtml(htmlString) {
		var nodeDocument = document.implementation.createHTMLDocument();
		nodeDocument.body.innerHTML = htmlString;
		console.log(nodeDocument.body.children);
		return nodeDocument.body.children[0];
	};
}