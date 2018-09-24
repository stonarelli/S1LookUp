({
    doInit : function(component, event, helper) {        
        
    },
    scriptsLoaded : function(component, event, helper) {
        $( document ).ready(function() { 
        });
    },
    closeErrorMessage: function( component, codeError, messageError ) {
        $( '#errorMessage' ).hide();
    },
    toogleContact : function(component, event, helper) {
		$('#srchContactPnl, #mainPanel').toggle();$('#srchContactTxt').focus();
        $('html, body').animate({ scrollTop: 0 }, 'slow');
    },
    doneContactTyping : function(component, event, helper) {
        clearTimeout( component.get( 'v.typingTimer' ) );
        component.set('v.contacts', null );
        if( $('#srchContactTxt').val ) {
            component.set( 'v.typingTimer', setTimeout( function(){
            	helper.searchContact( component, 7 );
            }, 800 ) );
        }
    },
    clearContactTyping : function(component, event, helper) {
        clearTimeout( component.get( 'v.typingTimer' ) );
        $('#srchContactTxt').val('');
    },
    searchContactMore : function( component, event, helper ) {
        var n = component.get("v.loadMoreNumb");
        helper.searchContact( component, n + 7 );
    },
    loadContact : function(component, event, helper) {
        var contactId = event.currentTarget.dataset.record;
        var a1 = component.get("c.selectedContact");
        a1.setParams({ contactId : contactId });
        $('.loadSpinner').show();
        a1.setCallback( this, function( response ) { 
            var state = response.getState();
            if (state === "SUCCESS"){
                // Set selected contact
                component.set('v.nuContact', response.getReturnValue()); 
            }
        });
        $A.enqueueAction(a1);
    }, 
    handleSaveNewTask  : function( component, event, helper ) {
        
    },
    handleCancelNewTask  : function( component, event, helper ) {
       
    }
})