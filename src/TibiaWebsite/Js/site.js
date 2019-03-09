import jQuery from "jquery";
//setup jquery globally
window.jQuery = window.$ = jQuery;

import "popper.js";
import "bootstrap";
import ButtonHelper from "./helpers/button";

//wait for the page to finish loading
jQuery($ => {
    //setup buttons
    new ButtonHelper($).setupButtons();
});