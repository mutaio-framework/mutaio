/****   DEFAULT DATA   ****/
/**
*	This file sets defaults for the expected data models that
*   are later injected into the template by rivets.js. 
**/
var pageData = {
	date:{
		day: 	(new Date()).getDay() + 1,
		month: 	(new Date()).getMonth() + 1,
		year: 	(new Date()).getFullYear()
	},
	
	images:{
		about: 		"img/dummy.jpg",
		contact: 	"img/dummy.jpg",
		business: [	"img/dummy.jpg", 
					"img/dummy.jpg", 
					"img/dummy.jpg", 
					"img/dummy.jpg",  
					"img/dummy.jpg", 
					"img/dummy.jpg"],

		menu: [	"img/dummy.jpg",  
				"img/dummy.jpg", 
				"img/dummy.jpg"]
	},

	sections:{
		active: ["home", "about", "menu", "images", "contact"],

		home: {
			id: 		"home",
			name: 		"Home",
			title: 		"Unser Restaurant",
			subtitle: 	"Das beste Essen",
			details: 	""
		},

		about: {
			id: 		"about", 
			name: 		"Über Uns",
			title: 		"Über Uns",
			subtitle: 	"Unser Restaurant",
			details: 	"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sed dapibus leo nec ornare diam. Sed commodo nibh ante facilisis bibendum dolor feugiat at. Duis sed dapibus leo nec ornare diam commodo nibh."
		},

		menu: {
			id: 		"menu", 
			name: 		"Speisekarte",
			title: 		"Speisekarte",
			subtitle: 	"Wir bieten Ihnen ausgewählte Speisen Italiens, welche wir stets frisch und schmackhaft zubereiten.",
			details: 	""
		},

		images: {
			id: 		"images", 
			name: 		"Bilder",
			title: 		"Bilder",
			subtitle: 	"Lorem ipsum dolor sit amet, consectetur adipiscing elit duis sed.",
			details: 	""
		},

		contact:{
			id: 		"contact", 
			name: 		"Kontakt",
			title: 		"Kontakt",
			subtitle: 	"Möchten Sie Reservieren? Zögern Sie nicht! Kontaktieren Sie uns:",
			details: 	"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sed dapibus leo nec ornare diam."
		}
	},

	business:{
		name: 'Pizzeria Mistanzo',
		description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sed dapibus leo nec ornare diam. Sed commodo nibh ante facilisis bibendum dolor feugiat at. Duis sed dapibus leo nec ornare diam commodo nibh.',
		address: {
			street: 'Mistanzostr.',
			streetNumber: '13b',
			zipCode: '67999',
			city: 'Musterstadt'
		},
		contactInfo: {
			homePhone: '+49 234 5678 9101',
			mobilePhone: '',
			emailAddress: 'info@pizzeria-mistanzo.de',
			websiteUrl: 'www.pizzeria-mistanzo.de',
		},
		socialMedia:{
			facebookUrl: 	'https://www.facebook.com/',
			twitterUrl: 	'https://www.twitter.com/',
			googlePlusUrl: 	'https://plus.google.com/'
		},
		openingHours:[
			{
				fromDay: 	"Mo",
				toDay: 		"Fr",
				closed: 	false,
				singleDay: 	false,
				timeRanges: 	[
					{
						fromTime: "09:00",
						toTime: "13:30"
					},
					{
						fromTime: "17:00",
						toTime: "23:00"
					}
				]
			},
			{
				fromDay: 	"Sa",
				toDay: 		"Sa",
				closed: 	false,
				singleDay: 	true,
				timeRanges: 	[
					{
						fromTime: 	"10:00",
						toTime: 	"14:00"
					},
					{
						fromTime: 	"17:00",
						toTime: 	"21:00"
					}
				]
			},
			{
				fromDay: 	"Sonntags",
				toDay: 		"Sonntags",
				closed: 	true,
				singleDay: 	true,
				timeRanges: 	[
					{
						fromTime: 	"00:00",
						toTime: 	"00:00"
					}
				]
			}
		]
	},
	legalInfo:{
		tradeName: "Pizzeria-Verwaltung GmbH",
		managerName: "Alex Mustermann",
		vatId: "DE75 9999 9999 9999",
		address: {
			street: 'Pizzeria-Weg',
			streetNumber: '4',
			zipCode: '96799',
			city: 'Verwaltungsstadt'
		},
		contactInfo: {
			homePhone: '+49 234 5678 9999',
			mobilePhone: '+49 196 4321 0000',
			emailAddress: 'info@pizzeria-verwaltung.de',
			websiteUrl: 'www.pizzeria-verwaltung.de',
		},
	},
	menu:{
	  "sections": [
	    {
	      "title": "Vorspeisen",
	      "items": [
	        {
	          "name": "Bunter Marktsalat",
	          "description": "Bunter Marktsalat mit gebratenen Steinchampignons  und Parmesan",
	          "quantity": "",
	          "price": "6,90 €"
	        },
	        {
	          "name": "Kleiner Marktsalat",
	          "description": "Kleiner Marktsalat mit warmem Ziegenfrischkäse und Honig",
	          "quantity": "",
	          "price": "7,90 €"
	        },
	        {
	          "name": "Kleiner Marktsalat",
	          "description": "Kleiner Marktsalat mit Peperoni und gegrilltem Schafskäse",
	          "quantity": "",
	          "price": "7,90 €"
	        },
	        {
	          "name": "Tomatensuppe",
	          "description": "Tomatensuppe mit Basilikum",
	          "quantity": "",
	          "price": "3,90 €"
	        },
	        {
	          "name": "Arabische Gemüsecremesuppe",
	          "description": "Arabische Gemüsecremesuppe - sehr pikant!",
	          "quantity": "",
	          "price": "3,90 €"
	        },
	        {
	          "name": "Pfälzer Kürbissuppe",
	          "description": "",
	          "quantity": "",
	          "price": "4,20 €"
	        },
	        {
	          "name": "Bunter Beilagensalat",
	          "description": "",
	          "quantity": "",
	          "price": "3,20 €"
	        }
	      ]
	    },
	    {
	      "title": "Hauptspeisen - Fleisch",
	      "items": [
	        {
	          "name": "Kalbsrückensteak mit Pesto",
	          "description": "Kalbsrückensteak mit Pesto, Tomatenflocken, Gemüse und Kartoffelgratin",
	          "quantity": "",
	          "price": "19,80 €"
	        },
	        {
	          "name": "Kalbsrückensteak mit Steinchampignons",
	          "description": "Kalbsrückensteak mit gebratenen Steinchampignons auf Gemüsenudeln",
	          "quantity": "",
	          "price": "19,80 €"
	        },
	        {
	          "name": "Kalbsrückensteak mit Gambas",
	          "description": "Kalbsrückensteak mit Gambas und Grillgemüse, Pommes Frites",
	          "quantity": "",
	          "price": "21,80 €"
	        },
	        {
	          "name": "Schweinefilet mit Steinchampignons",
	          "description": "Schweinefilet mit Steinchampignons auf Nudeln und ein Beilagensalat",
	          "quantity": "",
	          "price": "18,60 €"
	        },
	        {
	          "name": "Schweinefilet in Weintraubensoße",
	          "description": "Schweinefilet in Weintraubensoße mit Gemüse-Basmatireis",
	          "quantity": "",
	          "price": "16,90 €"
	        },
	        {
	          "name": "Medaillons vom Rinderfilet",
	          "description": "Medaillons vom Rinderfilet an großem Marktsalat mit Kartoffelgratin",
	          "quantity": "",
	          "price": "24,20 €"
	        },
	        {
	          "name": "Medaillons vom Rinderfilet in Walnuß-Pfeffersoße",
	          "description": "Medaillons vom Rinderfilet in Walnuß-Pfeffersoße mit Gemüse und Pommes Frites",
	          "quantity": "",
	          "price": "24,20 €"
	        },
	        {
	          "name": "Rehrückensteak mit Preiselbeeren",
	          "description": "Rehrückensteak mit Preiselbeeren, Spätzle und Gemüse",
	          "quantity": "",
	          "price": "26,80 €"
	        },
	        {
	          "name": "Rinderfiletstreifen mit Steinchampignons",
	          "description": "Rinderfiletstreifen mit Steinchampignons auf großem bunten Marktsalat mit Röstis",
	          "quantity": "",
	          "price": "16,90 €"
	        },
	        {
	          "name": "Gebratenes Hühnchenbrustfilet",
	          "description": "Gebratenes Hühnchenbrustfilet auf großem buntem Marktsalat mit Früchten",
	          "quantity": "",
	          "price": "13,80 €"
	        },
	        {
	          "name": "Gebratenes Hühnchenbrustfilet mit Gambas",
	          "description": "Gebratenes Hühnchenbrustfilet mit Gambas und Gemüse-Basmatireis",
	          "quantity": "",
	          "price": "16,90 €"
	        },
	        {
	          "name": "Putenstreifen mit arabischen Gewürzen",
	          "description": "Putenstreifen mit arabischen Gewürzen auf Gemüsenudeln - pikant",
	          "quantity": "",
	          "price": "14,90 €"
	        },
	        {
	          "name": "Putenstreifen auf großem bunten Marktsalat",
	          "description": "Putenstreifen auf großem bunten Marktsalat mit Röstis",
	          "quantity": "",
	          "price": "14,90 €"
	        }
	      ]
	    },
	    {
	      "title": "Hauptspeisen - Fisch",
	      "items": [
	        {
	          "name": "Wolfsbarschfilet mit Grillgemüse",
	          "description": "Wolfsbarschfilet mit Grillgemüse und Pommes Frites",
	          "quantity": "",
	          "price": "16,90 €"
	        },
	        {
	          "name": "Wolfsbarschfilet auf Nudeln",
	          "description": "Wolfsbarschfilet auf Nudeln mit Gemüse und ein Beilagensalat",
	          "quantity": "",
	          "price": "17,90 €"
	        },
	        {
	          "name": "Norweg. Lachsfilet mit Pesto",
	          "description": "Norweg. Premium Lachsfilet mit hausgemachtem Pesto auf Gemüse-Basmati-Reis",
	          "quantity": "",
	          "price": "18,90 €"
	        },
	        {
	          "name": "Norweg. Lachsfilet mit Gambas",
	          "description": "Norweg. Premium Lachsfilet mit gebratenen Gambas auf großem buntem Marktsalat",
	          "quantity": "",
	          "price": "19,80 €"
	        },
	        {
	          "name": "Gebratenes Zanderfilet mit Zitrone",
	          "description": "Gebratenes Zanderfilet mit Zitrone auf großem buntem Marktsalat",
	          "quantity": "",
	          "price": "16,90 €"
	        },
	        {
	          "name": "Gebratenes Zanderfilet auf Rieslingsoße",
	          "description": "Gebratenes Zanderfilet auf Rieslingsoße mit Gemüse und Kartoffelgratin",
	          "quantity": "",
	          "price": "18,80 €"
	        },
	        {
	          "name": "3 Kartoffelpuffer mit Räucherlachs",
	          "description": "3 Kartoffelpuffer mit Räucherlachs und Meerrettichfrischkäse und großem Marktsalat",
	          "quantity": "",
	          "price": "13,80 €"
	        }
	      ]
	    },
	    {
	      "title": "Hauptspeisen - Vegetarisches / Veganes",
	      "items": [
	        {
	          "name": "Bunter Marktsalat mit Schafskäse und warmem Ziegenfrischkäse",
	          "description": "Großer bunter Marktsalat mit Schafskäse und warmem Ziegenfrischkäse mit Honig",
	          "quantity": "",
	          "price": "10,80 €"
	        },
	        {
	          "name": "Gemüse-Nudelauflauf mit Schafskäse",
	          "description": "Gemüse-Nudelauflauf mit Schafskäse, bunten Datteltomaten, Olive und Peperoni",
	          "quantity": "",
	          "price": "11,80 €"
	        },
	        {
	          "name": "Chilinudeln mit Grillgemüse",
	          "description": "Chilinudeln - leicht pikant - mit frischem Grillgemüse und Parmesan",
	          "quantity": "",
	          "price": "11,80 €"
	        },
	        {
	          "name": "Spätzle mit Steinchampignons, Ziegenkäse",
	          "description": "Spätzle mit Steinchampignons, gebratenen Möhren, Ziegenfrischkäse und Pesto",
	          "quantity": "",
	          "price": "12,80 €"
	        },
	        {
	          "name": "Grillgemüse, Marktsalat und Kartoffelgratin",
	          "description": "Grillgemüse auf großem buntem Marktsalat mit Kartoffelgratin",
	          "quantity": "",
	          "price": "12,80 €"
	        },
	        {
	          "name": "Arabisches Grillgemüse mit Reise",
	          "description": "Grillgemüse mit arabischen Gewürzen, Dattel Tomaten und Basmati-Reis",
	          "quantity": "",
	          "price": "12,80 €"
	        },
	        {
	          "name": "Gemüseschafskäse Quiche an buntem Marktsalat",
	          "description": "Warme Gemüseschafskäse Quiche an einem großem buntem Marktsalat",
	          "quantity": "",
	          "price": "11,80 €"
	        },
	        {
	          "name": "Glacierte Kastanien auf Gemüse-Reis",
	          "description": "Glacierte Kastanien mit gebratenen Steinchampignons auf Gemüse-Basmatireis",
	          "quantity": "",
	          "price": "13,80 €"
	        },
	        {
	          "name": "Couscous mit Kichererbsen, Grillgemüse",
	          "description": "Couscous mit Kichererbsen, mediterranem Grillgemüse und Cranberries - pikant",
	          "quantity": "",
	          "price": "11,80 €"
	        }
	      ]
	    },
	    {
	      "title": "Kinderteller",
	      "items": [
	        {
	          "name": "Schnitzel mit Pommes",
	          "description": "Paniertes Schnitzel mit Pommes Frites",
	          "quantity": "",
	          "price": "8,40 €"
	        },
	        {
	          "name": "Schnitzel mit Pommes (Groß)",
	          "description": "Paniertes Schnitzel mit Pommes Frites (große Portion)",
	          "quantity": "",
	          "price": "11,40 €"
	        },
	        {
	          "name": "Gemüsenudeln mit Tomatensoße",
	          "description": "",
	          "quantity": "",
	          "price": "5,40 €"
	        },
	        {
	          "name": "Kartoffelpuffer mit Apfelmus",
	          "description": "3 Kartoffelpuffer mit Apfelmus",
	          "quantity": "",
	          "price": "4,80 €"
	        }
	      ]
	    },
	    {
	      "title": "Nachspeisen",
	      "items": [
	        {
	          "name": "Panna Cotta mit Früchten",
	          "description": "Panna Cotta mit frischen Früchten",
	          "quantity": "",
	          "price": "5,40 €"
	        },
	        {
	          "name": "Schokoladenküchlein mit Mango Sorbet, Erdbeeren",
	          "description": "Schokoladenküchlein mit Mango Sorbet und Erdbeeren",
	          "quantity": "",
	          "price": "6,90 €"
	        },
	        {
	          "name": "Vanilleeis mit Erdbeeren",
	          "description": "Vanilleeis mit frischen Erdbeeren",
	          "quantity": "",
	          "price": "5,90 €"
	        },
	        {
	          "name": "Warmer Apfelstrudel",
	          "description": "Warmer Apfelstrudel mit Vanilleeis und Sahne",
	          "quantity": "",
	          "price": "5,40 €"
	        },
	        {
	          "name": "Walnusseis auf Waldbeeren",
	          "description": "",
	          "quantity": "",
	          "price": "5,40 €"
	        },
	        {
	          "name": "Vanille- und Schokoladeneis mit Caramelsoße",
	          "description": "",
	          "quantity": "",
	          "price": "5,40 €"
	        },
	        {
	          "name": "Zitroneneis in Sekt",
	          "description": "Zitroneneis in Sekt - brut",
	          "quantity": "",
	          "price": "4,90 €"
	        }
	      ]
	    }
	  ]
	}
}

if (typeof module !== 'undefined' && module.exports) {
	module.exports = pageData;
}