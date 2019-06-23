$(document).ready(function () {
	$( document ).on( 'click', '.nav li', function ( e ) {
		$( this ).addClass( 'active' ).siblings().removeClass( 'active' );
	} );

	$("#contact-form").submit(function(event){		
		event.preventDefault();	

		var appKeyPub = "1234567890abcdefghijklmnopqrstuvwxyz";
		var objArrayToKeyValObj = function(obj, cur) { 
			obj[cur.name] = cur.value; 
			return obj; 
		}
		var postData = $("#contact-form")
						.serializeArray()
						.reduce(objArrayToKeyValObj, {});
		console.log(postData);

		//$.post("townscape.de/api/v1/mail/" + appKeyPub, postData);
	});
});