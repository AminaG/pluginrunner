var app=require('express')()
var docs_plugin=require('./docs_plugin.js')

var settings=require('./settings.json')

var somewhere=require('somewhere')
var db=new somewhere(__dirname + '/docs_plugin_db.json')  // This is a JSON DB. I will give the plugin access to one "collection" in the DB

/* 
	Register the routes, the function will be called once, every time the app started.
*/

docs_plugin.app({
	db:db,  					// The plugin will make all DB access using this object
	app:app,					// The plugin will register routes using this object	
	server_settings:settings	// the plugin needs to know some details like, ip port, domain, protocol and others.
})

app.get('/documents',function(req,res){

	/* 	Get list of ducment per space
		If there is not callback, it will work in sync mode. And return the result
	*/
	var result=docs_plugin.getDocuments({
		db:db,
		app:app,
		place:'Unique_id. For Each unqiue ID, the plugin save information',
		server_settings:settings,
		admin:true   /* If the current user is admin or not. 
						IF the user is admin, and he didn't choose a folder yet, the function will return a URL to display to the user
						IF the user is not admin, and this is no folder assign to this place, the function will return "no data"
						*/
	})

	/* result should be a JSON of documents or URL to redirect to*/
	if(result.type=='url'){
		res.redirect(result.url)
	}
	else if(result.type=='documents')
		res.send(result.documents)  
		/* Each document have:
			id
			title
			snippet
			thumbnail
		*/
	else if(result.type=='error')
		res.send(result.error.message)

})

app.get('/documents/:id',function(req,res){

	/* 	Get list of ducment per space
		If there is not callback, it will work in sync mode. And return the result
	*/
	//*********************
	var result=docs_plugin.getDocument({
		// IT's get exactly same paramters as above (docs_plugin.getDocuments)
		db:db,
		app:app,
		place:'Unique_id. For Each unqiue ID, the plugin save information',
		server_settings:settings,
		admin:true   /* If the current user is admin or not. 
						IF the user is admin, and he didn't choose a folder yet, the function will return a URL to display to the user
						IF the user is not admin, and this is no folder assign to this place, the function will return "no data"
						*/
	})


	/* result should be a JSON of documents or URL to redirect to*/
	if(result.type=='url'){
		res.redirect(result.url)
	}
	else if(result.type=='document')
		res.send(result.document)  
		/* 
			id
			title
			snippet
			thumbnail
		*/
	else if(result.type=='error')
		res.send(result.error.message)

})



