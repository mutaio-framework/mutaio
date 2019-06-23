
function dereferenceElementValue(pageData, element, elemAttrName){
	let elemValue = $(element).data(elemAttrName);
	if(elemValue.indexOf("pageData.") !== 0)
		return elemValue;

	const pageDataAttrName = elemValue.replace("pageData.", "");
	if(! pageDataAttrName in pageData)
		return "";

	return pageData[pageDataAttrName];
}

function dereferenceElementData(pageData, element, elementInterface){
	let elemData = {};

	for (var attrIdx = elementInterface.length - 1; attrIdx >= 0; attrIdx--) {
		const elemAttrName 	= elementInterface[attrIdx];
		const elemAttrValue = dereferenceElementValue(pageData, element, elemAttrName);

		elemData[elemAttrName] = elemAttrValue;
	}

	return elemData;
}

function injectTemplateData(element, elemData, elemTemplate){
	const elemId 		= elemData["id"];
	const elemSelector 	= "#" + elemId;

	let templateHtml = $.parseHTML(elemTemplate);
	$(templateHtml).attr("id", elemId);
	$(element).replaceWith(templateHtml);

	rivets.bind($(elemSelector), elemData);
}

function dereferenceElements(pageData, documentElements, elementDefinition){
	for (var elemIdx = documentElements.length - 1; elemIdx >= 0; elemIdx--) {
		const 	element 	= documentElements.get(elemIdx);
		let 	elemData 	= dereferenceElementData(pageData, element, elementDefinition["interface"]);

		const elemTemplate = elementDefinition["template"];
		injectTemplateData(element, elemData, elemTemplate);
	}
}

function replaceElements(pageData, registeredElements){

	for (elementName in registeredElements){
		const documentElements 	= $(elementName);

		const elementPath 		= registeredElements[elementName];
		const elementDefinition = {};

		$.when(
		    $.get(elementPath + "/template.html", function(template){
				elementDefinition["template"] 	= template;
		    }),
		   	$.get(elementPath + "/model.json", function(model){
				const jsonModel = JSON.parse(model);
				elementDefinition["interface"] = jsonModel.interface;
			})
		).then(function(){
		 	dereferenceElements(pageData, documentElements, elementDefinition);
		}).fail(function(){
			console.log("Failed to fetch element definiton for " + elementName + " (Path: " + elementPath + ")");
		});
	}
}

function getMutaRegistry(callback){
	$.getJSON(_REGISTRY_PATH, callback);
}

function initialize(){
	$.holdReady(true);

	const pageData			= { "sections": [	{ id: "one", 	name: "One" 	}, 
												{ id: "two", 	name: "Two" 	}, 
												{ id: "three", 	name: "Three" 	}]};

	const registeredElements = getMutaRegistry(function(registeredElements){
		replaceElements(pageData, registeredElements);
		$.holdReady( false );
	});
}

/** Env Variables **/
const _REGISTRY_PATH = "./lib/muta-registry.json";

initialize();
