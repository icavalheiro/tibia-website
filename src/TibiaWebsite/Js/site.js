import ButtonHelper from "./helpers/button";

//wait for the page to finish loading
jQuery($ => {
    //setup buttons
    new ButtonHelper($).setupButtons();
});