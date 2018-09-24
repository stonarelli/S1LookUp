({
   searchContact : function( component, loadMoreNumb ) {
        component.set('v.loadMoreNumb', loadMoreNumb );
        var action = component.get("c.searchContact");
        action.setParams({  q : $('#srchContactTxt').val(), loadMoreNumb : loadMoreNumb  });
        $('#srchContactResult').hide();
        $('.loadSpinner').show();
        action.setCallback( this, function( response ) { 
            if (response.getState() === "SUCCESS"){
                if( response.getReturnValue().length == loadMoreNumb ) $('#srchContactMore').show();
                if( response.getReturnValue().length < loadMoreNumb ) $('#srchContactMore').hide();
                if( response.getReturnValue().length == '0' ) $('#srchContactResult').show();
                component.set('v.contacts', response.getReturnValue()); 
            }else{
                $('#srchContactResult').show();
            }
            $('.loadSpinner').hide();
        });
        $A.enqueueAction(action);
    },
    errorMessage: function( component, codeError, messageError ) {
        $('#messageError').html( messageError );
        
        $('#errorMessage div').first().removeClass('slds-theme_error').removeClass('slds-theme_success');
        if( codeError == 'success' ) $('#errorMessage div').first().addClass('slds-theme_success');
        else if( codeError == 'error' ) $('#errorMessage div').first().addClass('slds-theme_error');
        
        $( '#errorMessage' ).show();
        setTimeout( function(){ $( '#errorMessage' ).hide(); }, 3000 );
    }
})