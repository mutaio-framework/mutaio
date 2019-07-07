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
		const uri 				= this.uri;
		const definitionUrl 	= uri + "/definition.json";
		const templateHtmlUrl 	= uri + "/template.html";
		const templateCssUrl 	= uri + "/template.css";
		
		Promise.all([	Ajax.get(definitionUrl).then(	this.parseComponentDefinition.bind(this)),
						Ajax.get(templateHtmlUrl).then(	this.storeTemplateHtmlData.bind(this)),
						Ajax.get(templateCssUrl).then(	this.storeTemplateCssData.bind(this))])
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

	storeTemplateHtmlData(templateData){		
		return new Promise(function(resolve, reject){
			this.templateData = templateData;
			resolve();
		}.bind(this));
	}

	storeTemplateCssData(cssData){		
		return new Promise(function(resolve, reject){
			this.cssData = cssData;
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
		const elemSelector = "mu-" + this.name;

		this.injectComponentHtml(element, elemTemplate, elemSelector);

		const bindableElems = document.querySelectorAll('[data-type=\'' + elemSelector + '\']');
		for (var elemIdx = bindableElems.length - 1; elemIdx >= 0; elemIdx--) {
			const elem = bindableElems[elemIdx];
			tinybind.bind(elem, elemData);
		}
	}

	injectComponentHtml(element, elemTemplate, elemSelector){		
		const newElement = this.parseHtml(elemTemplate);

		this.cloneAttributes(element, newElement);
		newElement.setAttribute("data-type", 	elemSelector);

		const cssElement 		= this.parseHtml("<style></style>");
		cssElement.innerHTML 	= this.cssData;

		newElement.appendChild(cssElement);
		element.outerHTML = newElement.outerHTML;
	}

	cloneAttributes(element, newElement){
		const elemAttributes = element.attributes;

		for (var attrIdx = elemAttributes.length - 1; attrIdx >= 0; attrIdx--) {
			const attribute = elemAttributes.item(attrIdx);
			if(attribute.name.indexOf("data-") != 0)
				newElement.setAttribute(attribute.name, attribute.value);
		}
	}

	snakeToCamelCase(str){
		return str.replace(/(-\w)/g, function(m){return m[1].toUpperCase();});
	}

	parseHtml(htmlString) {
		var nodeDocument = document.implementation.createHTMLDocument();
		nodeDocument.body.innerHTML = htmlString;
		return nodeDocument.body.children[0];
	};
}