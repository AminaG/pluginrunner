
/* This plugin always use same credentials. This why we not sending it as paramters
*  Why the main app not send this parameters?
		Because we want all plugins to get the same parameters from the main app.
*/

var client_email='this_is_from_google_api_console'
var client_secret='this_is_from_google_api_console'

// This function will register all route in the main app.
module.exports.app=function(options){
	options.app.use('/docs_plugin',function(app){
		/*
			From now. Every time I'm type app.get('/'), It will be under /docs_plugin route			
			for Example http://api.127.0.0.1.xip.io/docs_plugin/token?code=12312

			We will use route, for oAuth.
		*/
		app.get('/token',function(){
			//This function will convert the code, to access_token. And save the token, expiry date, and refresh token in db			
		})
	})
}

module.exports.getDocuments=function(options,callback){
	/* 
		This function will return all the documents for specific instance.
		If the specific instance not connected to any folder yet AND options.admin is true, we will return a URL of "Asking Permissions"
	*/

	/* -  Check if there is options.instance in the options.db table
		- If no instance. We should create this instance
		- Check if there is folder & access token attached to this instance
			If YES - Great! get all the documents and return it
			IF NO - check if options.admin is true.
					IF YES - Great! create URL for getting access token, and return the URL (options.settings.procotol + '://' + options.settings.domain + '/docs_plugin/requestToken')
					IF NO- To Bad!! return an error
	*/

}

module.exports.getDocument=function(options,callback){
	// We want this function to work in sync mode, and async mode.
	// This is how we do this:

	if(callback){
		inner(callback)
	}
	else{
		//If no callback, we need to wait, until the function is finish, and then to return
		// More info here: https://github.com/abbr/deasync
		require('deasync')(inner)(options)
	}

	function inner(callback){
		//This is regular function that do all our alogirhm. When it finish, it call to callback
	}
}

