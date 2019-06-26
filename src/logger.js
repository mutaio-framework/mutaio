
export default class Logger{

	constructor(){
		this.initializeLogActive();
		this.initializeGroupStarted();
	}

	initializeLogActive(){
		let logActive = true;
		this.isActive 		= function(){ return logActive; }
		this.activateLog 	= function(){ logActive = true; }
		this.deactivateLog 	= function(){ logActive = false;}
	}

	initializeGroupStarted(){
		let groupStarted = false;
		this.isGroupStarted	= function(){ return groupStarted; }
		this._startGroup 	= function(){ groupStarted = true; }
		this._endGroup 		= function(){ groupStarted = false;}
	}

	startMutaGroup(){
		if( !this.isActive() )
			return;

		console.groupCollapsed("%cMuta", "color: #1fbb16;");
		this._startGroup();
	}

	endMutaGroup(){
		if( !this.isActive() )
			return;

		console.groupEnd()
		this._endGroup();
	}

	logError(title, errorMsg){
		if( !this.isActive() )
			return;

		if( !this.isGroupStarted() )
			this.startMutaGroup();

		console.warn("%c" + title, "color: #e74c3c;", errorMsg);
	}

	logInfo(title, infoMsg){
		if( !this.isActive() )
			return;

		if( !this.isGroupStarted() )
			this.startMutaGroup();

		console.log("%c" + title, "color: #3498db;", infoMsg);
	}
}