# Muta

The muta.io framework is targeted towards the rapid creation of simple flat websites with as few dependencies as possible. Our goal is providing maximum reusability through a combination of standardized data models, simple brand injection and the composition of modular web components. In other words, we are simply separating **data** from **branding** and **layouts**.

# QuickStart
1. Define a component registry JSON file with paths to your component definitions:
```
{ 
	"nav-basic": "./_Elements/nav-basic"
}
```

2. Attach a pageData object to the window as required by the utilized components:
```
<script>
  window.pageData = {
    "registry": "./demo-registry.json",           // Component registry URL (required!)
    "sections": [ { id: "one",    name: "One" },  // Component data
                  { id: "two",    name: "Two" }, 
                  { id: "three",  name: "Three"}]
  };
</script>
```

3. Include the Muta script: 
```
<script src="./lib/lib.js"></script>
```

4. Start using components in your HTML: 
```
<header>
  <nav-basic id="test-id" class="test-class" data-brand-name="Test Brand" data-toggle-type="vortex" data-sections="pageData.sections"></nav-basic>
</header>
```

# Philosophy
Nowadays, web technologies are focused on managing the massive complexity of large, rich web applications. As a result, websites for small businesses are fraught with unnecessary complexity and developers are forced to include a large number of constantly-breaking dependencies. Dynamic websites require more processing power and bandwidth at run-time, so cost more to host.

# Working with Muta
## Component Definitions

Each component is defined by the following three files in the component directory:

1. /Definition.json
2. /Template.html
3. /Template.css

### Definition.json
This file contains a component data-attribute interface definition, a name declaration, as well as an optional default model for a better understanding of the expected input.

```
// <component-path>/definition.js
{
	"node-name": "nav-basic",
	"interface": [ "brand-name", "toggle-type", "sections" ],
	"defaultModel": {
		"brand-name": 	"Test Brand",
		"toggle-type": 	"vortex",
		"sections": [	{ "id": "one", 		"name": "One" 	}, 
				{ "id": "two", 		"name": "Two" 	}, 
				{ "id": "three",	"name": "Three" }]
	} 
}
```

### Template.html
Component templates are defined using standard HTML syntax combined with rivets.js / tinybind.js syntax for binding interface data to the DOM. 
```
// <component-path>/template.html
<nav>
	<div>
		<a class="navbar-brand" href="#">
			{ brand-name }
		</a>				
	</div>
	<button class="navbar-toggle" type="button"></button>
	<ul class="navbar-links">
		<li rv-each-section="sections">
			<a rv-href="section.id | hrefId">{ section.name }</a>
		</li>
	</ul>
</nav>
```
### Template.css
Component-specific styling can be provided in a template.css file. Dereferenced component nodes are annotated with the `data-type="mu-<node-name>"` attribute to allow for specific styling without the use of css IDs or classes.
```
// <component-path>/template.css
[data-type="mu-nav-basic"]{
	height:			75px;
	background-color: 	red;
}
```
