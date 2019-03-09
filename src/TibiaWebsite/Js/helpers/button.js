
//loads all the buttons in the page
//and make sure the user gets redirected uppon clicking it
jQuery(function($){

    //select all the buttons that match the attr type
    $('button[data-type=link]').each(function(){
        var item = $(this);
        var href = item.attr('href');

        //add a listener to click event
        item.click(function(){

            //redirect it to the right location
            window.location.href = href;
        })
    })
});