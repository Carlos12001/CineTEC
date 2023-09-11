
$(function () {
    $(window).on("load resize", function () {
        $(".fill-screen").css("height", window.innerHeight);
    });

    ////////////////////////////////////////////////// watch site
    
        $('.miniWatchView').click(function(){
            $('.miniWatchView').css("border","none");
            $(this).css("border","1px solid #d8d8d8");
            $("#watchHero").css( "background" , "url(../images/watch/"+$(this).attr("id")+".png) no-repeat center" );
        }); 
    
    
    ////////////////////////////////////////////////////////////
    
    // add Bootstrap's scrollspy
    $('body').scrollspy({
        target: '.navbar',
        offset: 160
    });

    // smooth scrolling
    $('nav a, .down-button a').bind('click', function () {
        $('html, body').stop().animate({
            scrollTop: $($(this).attr('href')).offset().top - 100
        }, 1500, 'easeInOutExpo');
        event.preventDefault();
    });
    
    // parallax scrolling with stellar.js
    $(window).stellar();
    
    //Video Walpaper
    $("#video-wallpaper").wallpaper({
        source: {
            poster: "images/back_header.jpg",
            mp4: "video/video.mp4"
            //,
            //ogg: "path/to/video.ogv",
            //webm: "path/to/video.webm"
        }
    });
    
    //Who section, green buttons
    $('.whoSections').click(function(){
		$(".desc").css( "display" , "none" );
		var qtID = $(this).attr("id");
		var ccID = '.' + qtID;            
        $(ccID).removeClass("fadeInLeft");
        $(ccID).removeClass("animated");
        $(ccID).fadeIn("1000");             
	}); 
    
    //
    
    $('.open-icon').click(function(){
        if($(this).hasClass("opened")){
            $(this).removeClass("opened");
            $(this).removeClass("fa-minus-square");
            $(this).addClass("fa-plus-square");            
            var qtID = $(this).attr("id");
            var ccID = '.' + qtID;
            var dhID = '.p-' + qtID;
            $(dhID).fadeOut("500");
            
            if ( $( window ).width() < 992 ){
                $(ccID).animate({"height":"100%"},"slow");
                //When user open a close the section and then increase the window's size.
                setTimeout(
                function() 
                    {
                        var heightDiv = $(ccID).height();
                        $(ccID).css("height", heightDiv+12)
                    }, 800);
            }else{
                if($(this).attr("id") == "serv2"){ // if is "Identificador de conductores"
                    $(ccID).animate({"height":"390px"},"fast");
                    
                }else{
                    $(ccID).animate({"height":"340px"},"fast");
                } 
            }
            
        }else{
            $(this).addClass("opened");
            $(this).removeClass("fa-plus-square");
            $(this).addClass("fa-minus-square");
            var qtID = $(this).attr("id");
            var ccID = '.' + qtID;
            var dhID = '.p-' + qtID;
            $(dhID).fadeIn("500");
            $(ccID).animate({"height":"100%"},"slow");
        }
    });
    
    // initialize WOW for element animation
    new WOW().init();
    
    //IE HACK for rotation animation
    
    var rotation1 = "flipUp";
    var rotation2 = "flipCube";
    
    function detectIE() {
        var ua = window.navigator.userAgent;

        var msie = ua.indexOf('MSIE ');
        if (msie > 0) {
            // IE 10 or older => return version number
            return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
        }

        var trident = ua.indexOf('Trident/');
        if (trident > 0) {
            // IE 11 => return version number
            var rv = ua.indexOf('rv:');
            return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
        }

        var edge = ua.indexOf('Edge/');
        if (edge > 0) {
           // Edge (IE 12+) => return version number
           return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
        }

        // other browser
        return false;
    }
    
    if(detectIE()){
        rotation1 = "dissolve";
        rotation2 = "dissolve";
    }
    
    
    //Text Rotator
    $(".rotate").textrotator({
        animation: rotation1, // You can pick the way it animates when rotating through words. Options are dissolve (default), fade, flip, flipUp, flipCube, flipCubeUp and spin.
        separator: ",", // If you don't want commas to be the separator, you can define a new separator (|, &, * etc.) by yourself using this field.
        speed: 3000 // How many milliseconds until the next word show.
    });

    //Text Rotator
    $(".rotate2").textrotator({
        animation: rotation2, // You can pick the way it animates when rotating through words. Options are dissolve (default), fade, flip, flipUp, flipCube, flipCubeUp and spin.
        separator: ",", // If you don't want commas to be the separator, you can define a new separator (|, &, * etc.) by yourself using this field.
        speed: 3000 // How many milliseconds until the next word show.
    });    
    
    //Check if the contact message has been sent.
    
    if($_GET('message') == "sent"){
        $('html, body').animate({scrollTop: $("#contact-us").offset().top}, 1000);
        $('#message_sent').css("display","block");
    }
    if($_GET('message') == "empty_field"){
        $('html, body').animate({scrollTop: $("#contact-us").offset().top}, 1000);
        $('#message_error').css("display","block");   
    }
    
    //Get parameters from URL
    function $_GET(param) {
        var vars = {};
        window.location.href.replace( location.hash, '' ).replace( 
            /[?&]+([^=&]+)=?([^&]*)?/gi, // regexp
            function( m, key, value ) { // callback
                vars[key] = value !== undefined ? value : '';
            }
        );

        if ( param ) {
            return vars[param] ? vars[param] : null;	
        }
        return vars;
    }
    
});