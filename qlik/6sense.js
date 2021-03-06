/*global require*/
/*
 * Bootstrap-based responsive mashup
 * @owner Erik Wetterberg (ewg)
 */
/*
 *    Fill in host and port for Qlik engine
 */
var prefix = window.location.pathname.substr( 0, window.location.pathname.toLowerCase().lastIndexOf( "/resources" ) + 1 );

var config = {
    host: window.location.hostname,
    prefix: prefix,
    port: window.location.port,
    isSecure: window.location.protocol === "https:"
};
//to avoid errors in workbench: you can remove this when you have added an app
var app;
require.config( {
    baseUrl: (config.isSecure ? "https://" : "http://" ) + config.host + (config.port ? ":" + config.port : "" ) + config.prefix + "resources"
} );

require( ["js/qlik"], function ( qlik ) {

    qlik.setOnError( function ( error ) {
        $('#popupText').append(error.message +"<br>");
        popup();
    } );
    var bool = false;
    function popup(){
        if(bool){
            return;
        }
        bool = true;
        $('#popup').delay(1000).fadeIn(1000);
        $('#popup').delay(11000).fadeOut(1000);
    }
    $( "#closePopup" ).click(function() {
        $('#popup').hide();
    });
     if ($('ul#qbmlist li').length == 0){
        $('#qbmlist').append("<li><a href='#'>No bookmarks available</a></li>");
    }
    //
    $("body").css("overflow: hidden;")
    function AppUi ( app ) {
        var me = this;
        this.app = app;
        app.global.isPersonalMode( function ( reply ) {
            me.isPersonalMode = reply.qReturn;
        } );
        app.getAppLayout( function ( layout ) {
            $( "#title" ).html( layout.qTitle );
            $( "#title" ).attr("title", "Last reload:" + layout.qLastReloadTime.replace( /T/, ' ' ).replace( /Z/, ' ' ) );
            //TODO: bootstrap tooltip ??
        } );
        app.getList( 'SelectionObject', function ( reply ) {
            $( "[data-qcmd='back']" ).parent().toggleClass( 'disabled', reply.qSelectionObject.qBackCount < 1 );
            $( "[data-qcmd='forward']" ).parent().toggleClass( 'disabled', reply.qSelectionObject.qForwardCount < 1 );
        } );
        app.getList( "BookmarkList", function ( reply ) {
            var str = "";
            reply.qBookmarkList.qItems.forEach( function ( value ) {
                if ( value.qData.title ) {
                    str += '<li><a href="#" data-id="' + value.qInfo.qId + '">' + value.qData.title + '</a></li>';
                }
            } );
            str += '<li><a href="#" data-cmd="create">Create</a></li>';
            $( '#qbmlist' ).html( str ).find( 'a' ).on( 'click', function () {
                var id = $( this ).data( 'id' );
                if ( id ) {
                    app.bookmark.apply( id );
                } else {
                    var cmd = $( this ).data( 'cmd' );
                    if ( cmd === "create" ) {
                        $('#createBmModal' ).modal();
                    }
                }
            } );
        } );
        $( "[data-qcmd]" ).on( 'click', function () {
            var $element = $( this );
            switch ( $element.data( 'qcmd' ) ) {
                    //app level commands
                case 'clearAll':
                    app.clearAll();
                    break;
                case 'back':
                    app.back();
                    break;
                case 'forward':
                    app.forward();
                    break;
                case 'lockAll':
                    app.lockAll();
                    break;
                case 'unlockAll':
                    app.unlockAll();
                    break;
                case 'createBm':
                    var title = $("#bmtitle" ).val(), desc = $("#bmdesc" ).val();
                    app.bookmark.create( title, desc );
                    $('#createBmModal' ).modal('hide');
                    break;
            }
        } );
    }
    //callbacks -- inserted here --
    //open apps -- inserted here --


 app = qlik.openApp('35335b3a-bc39-4c5f-bf8e-091edc9800fa', config);
// hexbin vjpJJy
app.getObject('QV01','kBFguNG');
//	app.getObject('QV01','a0122bc0-5147-42ae-ad6e-2d8988fdf165');
	app.getObject('QV020','HuvTCW');
	app.getObject('QV021','3d6bd82a-1673-436f-8ba4-aefcd842bf4d');
	app.getObject('QV03','dsDwpPT');
	app.getObject('QV04','fPzUgD');

  app.getObject('QV05','3d6bd82a-1673-436f-8ba4-aefcd842bf4d');
	app.getObject('QV06','HuvTCW');
	app.getObject('QV07','vjpJJy'); 

//	app.getObject('QV08','HuvTCW');
//	app.getObject('QV09','vjpJJy');

//	app.getObject('QV10','HuvTCW');

			app.getObject('QV08','mKxQh');
			  app.getObject('QV09','JFmvwWy');

	//create cubes and lists -- inserted here --
	app.getObject( 'CurrentSelections', 'CurrentSelections' );

	if(app) {
			new AppUi( app );
	}

} );
