/****   DEFAULTS AND MATCHING   ****/
/**
*	This file sets defaults for the configurable styles, as well as assigns
*	the configurable styles to atlas classes that can be used in templates. 
**/

var styleMapJson = {
	"nodes":{
		"nav": ["atl-font-body", 
				"atl-txt-inv", 
				"atl-bg"],

		"#nav-toggle .hamburger-inner, #nav-toggle .hamburger-inner:after, #nav-toggle .hamburger-inner:before": ["atl-bg-hl"],

		"li > a-hov":["atl-txt-hl"],

		"h1, h2, h3, h4":[ 	"atl-font-header", 
							"atl-txt"],

		"body, p, span, div":[ 	"atl-font-body", 
								"atl-txt"],

		"a":[	"atl-txt-inv",
				"atl-txt-hov"],

		"hr": ["atl-bg"],

		"main button":["atl-bg-hl", "atl-bg-hov", "atl-txt-inv", "atl-txt-hl-hov", "atl-brd-hl-hov"],
		
		".legal div":[ "atl-txt-inv" ]
	},

	"colors":{
		"foreground": {
			"classes": ["atl-txt-hov",
						"atl-txt-inv",
						"atl-brd-inv",
						"atl-brd-inv-hov",
						"atl-bg-hov",
						"atl-bg-inv",
						"atl-svg-inv"],
			"default": "rgb(255, 255, 255)"
		},
		"background": {
			"classes": ["atl-txt",
						"atl-txt-inv-hov",
						"atl-brd",
						"atl-brd-hov",
						"atl-bg",
						"atl-bg-inv-hov",
						"atl-svg"],
			"default": "rgb(15, 15, 15)"
		},
		"highlight": {
			"classes": ["atl-txt-hl",
						"atl-txt-hl-hov",
						"atl-brd-hl",
						"atl-brd-hl-hov",
						"atl-bg-hl",
						"atl-bg-hl-hov",
						"atl-svg-hl"],
			"default": "rgb(114, 164, 17)"
		},
		"semantic": {
			"price": "",//"rgb(200, 150, 150)",
			"food":  ""//rgb(164, 149, 16)"
		}
	},


	"images": {
		"banner":{
			"src":"../img/banner.jpg" 
		}
	},

	"fonts":{
		"header": 	"'Dancing Script', cursive",
		"body": 	"'Raleway', sans-serif"
	}
};

var styles = {

      "colors": {
        "foreground": "",
        "background": "",
        "highlight": "",
        "semantic": {
          "price": "",
          "food": ""
        }
      },

      "images": {
        "banner": {
          "src": ""
        }
      },

      "fonts": {
        "header": 	"",
        "body": 	""
      }
};

if (typeof module !== 'undefined' && module.exports) {
	module.exports = styleMapJson;
}