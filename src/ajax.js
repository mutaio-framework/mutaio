export default class Ajax{

	static get(url){
		const request = new XMLHttpRequest();
		return new Promise(function(resolve, reject) {
			request.open('GET', url, true);

			request.onload = function() {
				if (request.status >= 200 && request.status < 400) {
					var response = request.responseText;
					resolve(response);
				} else {
					reject("Server returned error code '" + request.status + "'");
				}
			};

			request.onerror = function(){
				reject("Server connection error.");
			}

			request.send();
		});
	}

}