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
