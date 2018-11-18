// Initialize app
var myApp = new Framework7();


// If we need to use custom DOM library, let's save it to $$ variable:
var $$ = Dom7;

// Add view
var mainView = myApp.addView('.view-main', {
    // Because we want to use dynamic navbar, we need to enable it for this view:
    dynamicNavbar: true
});

// Handle Cordova Device Ready Event
$$(document).on('deviceready', function () {
    console.log("Device is ready!");
});


// Now we need to run the code that will be executed only for About page.

// Option 1. Using page callback for page (for "about" page in this case) (recommended way):
myApp.onPageInit('about', function (page) {
    // Do something here for "about" page

})

// Option 2. Using one 'pageInit' event handler for all pages:
$$(document).on('pageInit', function (e) {
    // Get page data from event data
    var page = e.detail.page;

    if (page.name === 'about') {
        // Following code will be executed for page with data-page attribute equal to "about"
        myApp.alert('Here comes About page');
    }
})

// Option 2. Using live 'pageInit' event handlers for each page
$$(document).on('pageInit', '.page[data-page="about"]', function (e) {
    // Following code will be executed for page with data-page attribute equal to "about"
    myApp.alert('Here comes About page');
})

newFunction();
 

function newFunction() {
    $(document).bind("mobileinit", function() {
        $.mobile.pushStateEnabled = true;
    });
    $(function() {
        var menuStatus;
        var show = function() {
            if (menuStatus) {
                return;
            }
            $('#menu').show();
            $.mobile.activePage.animate({
                marginLeft: "165px",
            }, 300, function() {
                menuStatus = true;
            });
        };
        var hide = function() {
            if (!menuStatus) {
                return;
            }
            $.mobile.activePage.animate({
                marginLeft: "0px",
            }, 300, function() {
                menuStatus = false;
                $('#menu').hide();
            });
        };
        var toggle = function() {
            if (!menuStatus) {
                show();
            }
            else {
                hide();
            }
            return false;
        };
        // Show/hide the menu
        $("a.showMenu").click(toggle);
        $('#menu, .pages').live("swipeleft", hide);
        $('.pages').live("swiperight", show);
        $('div[data-role="page"]').live('pagebeforeshow', function(event, ui) {
            menuStatus = false;
            $(".pages").css("margin-left", "0");
        });
        // Menu behaviour
        $("#menu li a").click(function() {
            var p = $(this).parent();
            p.siblings().removeClass('active');
            p.addClass('active');
        });
    });
}
