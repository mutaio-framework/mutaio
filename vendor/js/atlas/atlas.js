/* Atlas.js
* version: 0.0.1
* author: Brennan Nunamaker
* license: MIT
*/
(function() {
  window.AtlasModules = (function() {
    function AtlasModules(io) {
      this.io = io;
      this.Logger = {};
      this.Parser = {};
      this.Atlas = {};
      return;
    }

    return AtlasModules;

  })();

}).call(this);

(function() {
  var Logger;

  Logger = (function() {
    function Logger() {}

    Logger.groupStarted = false;

    Logger.logActive = true;

    Logger.startAtlasGroup = function() {
      if (!this.logActive) {
        return;
      }
      if (this.groupStarted) {
        return;
      }
      console.groupCollapsed("%cAtlas Template", "color: #d35400;");
      this.groupStarted = true;
    };

    Logger.endAtlasGroup = function() {
      if (!this.logActive) {
        return;
      }
      console.groupEnd();
      this.groupStarted = false;
    };

    Logger.logError = function(title, errorMsg) {
      if (!this.logActive) {
        return;
      }
      console.warn("%c" + title, "color: #e74c3c;", errorMsg);
    };

    Logger.logInfo = function(title, infoMsg) {
      if (!this.logActive) {
        return;
      }
      console.log("%c" + title, "color: #3498db;", infoMsg);
    };

    return Logger;

  })();

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = Logger;
  } else {
    AtlasModules.Logger = Logger;
  }

}).call(this);

(function() {
  var Parser, logger;

  if (typeof require !== 'undefined') {
    logger = require('./atl-logger');
  } else {
    logger = AtlasModules.Logger;
  }

  Parser = (function() {
    function Parser() {}

    Parser.parseStyleMap = function(styles, styleMap) {
      var atlasRules, colorRules, fontRules, imageRules, nodeRules;
      colorRules = this.getColorRules(styles, styleMap);
      imageRules = this.getImageRules(styles, styleMap);
      fontRules = this.getFontRules(styles, styleMap);
      atlasRules = [].concat.apply([], [colorRules, imageRules, fontRules]);
      logger.logInfo("Atlas Rules", atlasRules);
      nodeRules = this.getNodeRules(styleMap, atlasRules);
      logger.logInfo("Node Rules", nodeRules);
      atlasRules = atlasRules.concat(nodeRules);
      logger.logInfo("Final Rules", atlasRules);
      return atlasRules;
    };

    Parser.getColorRules = function(styles, styleMap) {
      var color, colorObj, mapColors, rules, styleColors, value;
      rules = [];
      mapColors = styleMap["colors"];
      styleColors = styles["colors"];
      for (color in mapColors) {
        colorObj = this.getObjVal(mapColors, color);
        value = this.getObjVal(styleColors, color);
        if (color !== "semantic") {
          rules = rules.concat(this.createColorRulesForClasses(colorObj, value));
          continue;
        }
        rules = rules.concat(this.createColorRulesForSemanticClasses(colorObj, value));
      }
      return rules;
    };

    Parser.getImageRules = function(styles, styleMap) {
      var mapImages, styleImages;
      mapImages = this.getObjVal(styleMap, "images");
      styleImages = this.getObjVal(styles, "images");
      return this.createImageRules(mapImages, styleImages);
    };

    Parser.getFontRules = function(styles, styleMap) {
      var mapFonts, styleFonts;
      mapFonts = this.getObjVal(styleMap, "fonts");
      styleFonts = this.getObjVal(styles, "fonts");
      return this.createFontRules(mapFonts, styleFonts);
    };

    Parser.getNodeRules = function(styleMap, atlasRules) {
      var mapNodes;
      mapNodes = this.getObjVal(styleMap, "nodes");
      return this.createNodeRules(mapNodes, atlasRules);
    };

    Parser.getCssRuleFromAtlasRule = function(atlasRule) {
      var cssAttrs, selector;
      selector = atlasRule.selector;
      cssAttrs = atlasRule.cssAttrs;
      if (this.isAtlasSelector(selector)) {
        selector = this.getSelectorWithPseudoSuffix(selector);
        return "." + selector + "{ " + cssAttrs + " }";
      }
      if (this.isPseudoSelector(selector)) {
        return this.getCssNodeRuleWithPseudoSelector(selector, cssAttrs);
      }
      return selector + "{ " + cssAttrs + " }";
    };

    Parser.createColorRulesForClasses = function(colorObj, value) {
      var atlClass, borderObj, cssClass, fillObj, i, len, ref, ruleObj, ruleType, rules, strokeObj;
      rules = [];
      value = this.getSafeValue(value, this.getObjVal(colorObj, "default"));
      ref = colorObj.classes;
      for (i = 0, len = ref.length; i < len; i++) {
        atlClass = ref[i];
        cssClass = atlClass;
        ruleType = this.getColorRuleForClassType(atlClass);
        if (ruleType === "svg") {
          strokeObj = {
            "selector": cssClass,
            "cssAttrs": "stroke: " + value + ";"
          };
          fillObj = {
            "selector": cssClass,
            "cssAttrs": "fill: " + value + ";"
          };
          rules.push(strokeObj);
          rules.push(fillObj);
          continue;
        } else if (ruleType === "brd") {
          borderObj = {
            "selector": cssClass,
            "cssAttrs": "border: 1px solid " + value + ";"
          };
          rules.push(borderObj);
          continue;
        }
        ruleObj = {
          "selector": cssClass,
          "cssAttrs": ruleType + ": " + value + ";"
        };
        rules.push(ruleObj);
      }
      return rules;
    };

    Parser.createColorRulesForSemanticClasses = function(semanticColorObj, valueObj) {
      var cssClass, ruleObj, rules, value;
      rules = [];
      for (cssClass in semanticColorObj) {
        value = this.getSafeValue(this.getObjVal(valueObj, cssClass), this.getObjVal(semanticColorObj, cssClass));
        cssClass = "atl-" + cssClass;
        ruleObj = {
          "selector": cssClass,
          "cssAttrs": "color: " + value + ";"
        };
        rules.push(ruleObj);
      }
      return rules;
    };

    Parser.getColorRuleForClassType = function(className) {
      if (className.indexOf("txt") !== -1) {
        return "color";
      }
      if (className.indexOf("bg") !== -1) {
        return "background-color";
      }
      if (className.indexOf("brd") !== -1) {
        return "brd";
      }
      if (className.indexOf("svg") !== -1) {
        return "svg";
      }
      return "";
    };

    Parser.createImageRules = function(defaultMap, srcObj) {
      var cssClass, ruleObj, rules, value;
      rules = [];
      for (cssClass in defaultMap) {
        value = this.getSafeValue(this.getImageSrc(srcObj, cssClass), this.getImageSrc(defaultMap, cssClass));
        cssClass = "atl-img-" + cssClass;
        ruleObj = {
          "selector": cssClass,
          "cssAttrs": "background: url('" + value + "') no-repeat center center; background-size: cover;"
        };
        rules.push(ruleObj);
      }
      return rules;
    };

    Parser.createFontRules = function(defaultMap, fontObj) {
      var cssClass, ruleObj, rules, value;
      rules = [];
      for (cssClass in defaultMap) {
        value = this.getSafeValue(this.getObjVal(fontObj, cssClass), this.getObjVal(defaultMap, cssClass));
        if (this.isFontPseudonym(value)) {
          value = this.mapFontPseudonymToCss(value);
        }
        cssClass = "atl-font-" + cssClass;
        ruleObj = {
          "selector": cssClass,
          "cssAttrs": "font-family: " + value + ";"
        };
        rules.push(ruleObj);
      }
      return rules;
    };

    Parser.isFontPseudonym = function(value) {
      return value in this.getFontPseudonymMap();
    };

    Parser.mapFontPseudonymToCss = function(value) {
      var mapObj;
      mapObj = this.getFontPseudonymMap();
      if (!value in mapObj) {
        return value;
      }
      return mapObj[value];
    };

    Parser.getFontPseudonymMap = function() {
      var pseudonymMap;
      pseudonymMap = {
        "montserrat": "'Montserrat', sans-serif",
        "montserrat-alternates": "'Montserrat Alternates', sans-serif",
        "roboto": "'Roboto', sans-serif",
        "chewy": "'Chewy', cursive",
        "averia-libre": "'Averia Libre', cursive",
        "dancing-script": "'Dancing Script', cursive",
        "pangolin": "'Pangolin', cursive",
        "caesar-dressing": "'Caesar Dressing', cursive",
        "covered-by-your-grace": "'Covered By Your Grace', cursive",
        "indie-flower": "'Indie Flower', cursive",
        "east-sea-dokdo": "'East Sea Dokdo', cursive",
        "yeon-sung": "'Yeon Sung', cursive",
        "lobster": "'Lobster', cursive",
        "gloria-hallelujah": "'Gloria Hallelujah', cursive",
        "amatic-sc": "'Amatic SC', cursive",
        "cinzel": "'Cinzel', serif",
        "gugi": "'Gugi', cursive",
        "permanent-marker": "'Permanent Marker', cursive",
        "arial": "'Arial', sans-serif",
        "garamond": "'Garamond', serif",
        "raleway": "'Raleway', sans-serif"
      };
      return pseudonymMap;
    };

    Parser.createNodeRules = function(defaultMap, atlasRules) {
      var nodeAtlasTags, nodeSelector, rules;
      rules = [];
      for (nodeSelector in defaultMap) {
        nodeAtlasTags = defaultMap[nodeSelector];
        rules = rules.concat(this.getMatchingAtlasRules(nodeSelector, nodeAtlasTags, atlasRules));
      }
      return rules;
    };

    Parser.getMatchingAtlasRules = function(nodeSelector, atlasSelectors, atlasRules) {
      var atlasRule, atlasSelector, i, j, len, len1, ruleObj, rules, uniqueNodeSelector;
      rules = [];
      for (i = 0, len = atlasSelectors.length; i < len; i++) {
        atlasSelector = atlasSelectors[i];
        for (j = 0, len1 = atlasRules.length; j < len1; j++) {
          atlasRule = atlasRules[j];
          if (atlasSelector === atlasRule["selector"]) {
            uniqueNodeSelector = this.getSelectorWithNodePseudoSuffix(nodeSelector, atlasSelector);
            ruleObj = {
              "selector": uniqueNodeSelector,
              "cssAttrs": atlasRule["cssAttrs"]
            };
            rules.push(ruleObj);
          }
        }
      }
      return rules;
    };

    Parser.getSelectorWithNodePseudoSuffix = function(nodeSelector, atlasSelector) {
      if (atlasSelector.indexOf("hov") !== -1) {
        return nodeSelector + "-hov";
      }
      return nodeSelector;
    };

    Parser.getSafeValue = function(value, defaultVal) {
      if (value === null || value === void 0 || value === "") {
        return defaultVal;
      }
      return value;
    };

    Parser.getObjVal = function(obj, key) {
      if (!obj || !key) {
        return "";
      }
      if (!obj instanceof Object) {
        return "";
      }
      if (!key in obj) {
        return "";
      }
      return obj[key];
    };

    Parser.getImageSrc = function(imgObj, cssClass) {
      var srcContainer;
      if (!imgObj || !cssClass) {
        return "";
      }
      if (!imgObj instanceof Object) {
        return "";
      }
      if (!cssClass in imgObj) {
        return "";
      }
      srcContainer = imgObj[cssClass];
      if (!"src" in srcContainer) {
        return "";
      }
      return srcContainer["src"];
    };

    Parser.getSelectorWithPseudoSuffix = function(atlasSelector) {
      if (atlasSelector.indexOf("hov") !== -1) {
        return atlasSelector + ":hover";
      }
      return atlasSelector;
    };

    Parser.getCssNodeRuleWithPseudoSelector = function(selector, cssAttrs) {
      selector = selector.replace("\-hov", "\:hover");
      return selector + "{ " + cssAttrs + " }";
    };

    Parser.isAtlasSelector = function(selector) {
      return selector.indexOf("atl") === 0;
    };

    Parser.isPseudoSelector = function(selector) {
      return selector.indexOf("hov") !== -1;
    };

    return Parser;

  })();

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = Parser;
  } else {
    AtlasModules.Parser = Parser;
  }

}).call(this);

(function() {
  var Atlas, logger, parser;

  logger = AtlasModules.Logger;

  parser = AtlasModules.Parser;


  /*
   * Refer to https://www.quirksmode.org/dom/w3c_css.html for cross-browser reference
   */

  Atlas = (function() {
    Atlas.originalRules = [];

    function Atlas(styleSheets) {
      logger.startAtlasGroup();
      this.styleSheet = this.getAtlasStylesheet(styleSheets);
      this.originalRules = this.getRulesCloneFromStylesheet();
      this.rules = this.getRulesCloneFromStylesheet();
      return;
    }

    Atlas.prototype.getRulesCloneFromStylesheet = function() {
      var clonedRules, cssRule, i, len, ref;
      clonedRules = [];
      if (!"cssRules" in this.styleSheet || !this.styleSheet.cssRules) {
        logger.logError("No original stylesheet rules!", this.styleSheet);
        return [];
      }
      ref = this.styleSheet.cssRules;
      for (i = 0, len = ref.length; i < len; i++) {
        cssRule = ref[i];
        clonedRules.push(cssRule);
      }
      return clonedRules;
    };

    Atlas.prototype.renderCss = function(styles, styleMapJson) {
      logger.startAtlasGroup();
      this.rollbackInjectedRules();
      this.rules = parser.parseStyleMap(styles, styleMapJson);
      this.injectRulesIntoStyleSheet(this.rules);
      logger.logInfo("Stylesheets", document.styleSheets);
      logger.endAtlasGroup();
    };

    Atlas.prototype.getAtlasStylesheet = function(styleSheets) {
      var i, len, styleSheet;
      for (i = 0, len = styleSheets.length; i < len; i++) {
        styleSheet = styleSheets[i];
        if (styleSheet.href !== null && styleSheet.href.indexOf("atlas") !== -1) {
          logger.logInfo("Stylesheet found!", styleSheet);
          return styleSheet;
        }
      }
      logger.logError("No Atlas Stylesheet detected!");
    };

    Atlas.prototype.injectRulesIntoStyleSheet = function(atlasRules) {
      var atlasRule, cssRule, i, len;
      logger.logInfo("Injecting Rules", atlasRules);
      for (i = 0, len = atlasRules.length; i < len; i++) {
        atlasRule = atlasRules[i];
        cssRule = parser.getCssRuleFromAtlasRule(atlasRule);
        this.styleSheet.insertRule(cssRule, this.getLastRuleIdx());
      }
      logger.logInfo("Injected Stylesheet", this.styleSheet.cssRules);
    };

    Atlas.prototype.rollbackInjectedRules = function() {
      this.removeAllStyleSheetRules();
      this.insertOriginalStyleSheetRules();
    };

    Atlas.prototype.removeAllStyleSheetRules = function() {
      if (!this.styleSheet.cssRules) {
        return;
      }
      while (this.styleSheet.cssRules.length > 0) {
        this.removeStylesheetRule(0);
      }
    };

    Atlas.prototype.removeStylesheetRule = function(position) {
      if ("removeRule" in this.styleSheet) {
        this.styleSheet.removeRule(0);
        return;
      } else if ("deleteRule" in this.styleSheet) {
        this.styleSheet.deleteRule(0);
        return;
      }
      logger.logError("Rule could not be removed!", this.styleSheet);
    };

    Atlas.prototype.insertOriginalStyleSheetRules = function() {
      var cssRule, i, len, ref;
      logger.logInfo("Inserting rules", this.originalRules);
      ref = this.originalRules;
      for (i = 0, len = ref.length; i < len; i++) {
        cssRule = ref[i];
        logger.logInfo("Inserting rule", cssRule);
        if (typeof cssRule === "object" && "cssText" in cssRule && cssRule.cssText.length) {
          this.styleSheet.insertRule(cssRule.cssText, this.getLastRuleIdx());
          continue;
        }
        this.styleSheet.insertRule(cssRule, this.getLastRuleIdx());
      }
    };

    Atlas.prototype.getLastRuleIdx = function() {
      if (!this.styleSheet.cssRules) {
        return 0;
      }
      return this.styleSheet.cssRules.length;
    };

    return Atlas;

  })();

  AtlasModules.Atlas = Atlas;

}).call(this);

(function() {
  $(document).ready(function() {
    var baseNode;
    window.atlas = new AtlasModules.Atlas(document.styleSheets);
    window.atlas.renderCss(styles, styleMapJson);
    baseNode = document.getElementsByTagName("html")[0];
    rivets.bind(baseNode, pageData);
    if (typeof window.parent.injectStyles === 'function') {
      window.parent.injectStyles();
    }
  });

}).call(this);