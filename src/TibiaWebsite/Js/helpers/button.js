function tieLinkButtonsHref(){
    //loads all the buttons in the page that match the attr type "link"
    //and make sure the user gets redirected uppon clicking it
    $('button[data-type=link]').each(function(){
        var btn = $(this);
        var href = btn.attr('href');

        //add a listener to click event
        btn.click(function(){

            //redirect it to the right location
            window.location.href = href;
        })
    })
}

function tieToggleButtons(){
    //get all the buttons that will e used to toggle something
    //and then tie them to the DIVs they are supposed to toggle
    $('button[data-type=toggle]').each(function(){
        var btn = $(this);
        var id = btn.attr('data-toggle-id');
        var storageId = "navigation-item: " + id;

        //add a listener to click event
        btn.click(function(){
            $('div[data-toggle-id='+id+']').each(function(){
                var div = $(this);
                div.toggle(0.0001);//defualt is 400
                btn.toggleClass('opened');

                window.localStorage.setItem(storageId, btn.hasClass('opened'));
            })
        })

        if(window.localStorage.getItem(storageId) == "true"){
            btn.click();
        }
    })
}

//wait for the page to finish loading
jQuery(function($){
    tieLinkButtonsHref();
    tieToggleButtons();
});