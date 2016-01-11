/**
 * Created by nthanh on 1/6/2016.
 */
$(document).ready(function(){
    Common.run();
});

// Linh: Need to setup laguage before every js script run
Lang.setLocale(document.getElementsByTagName('html')[0].lang);

var Common = {
    run: function() {
        this.setupLeftMenu();
        this.setupContentMinHigh();
        this.fancyboxInit();
        this.editingPageUnloadHandler();
    },

    setupLeftMenu: function(){
        $(".sidebar-menu a").click(function(e){
            e.preventDefault();
            location.href = $(this).attr("href");
            return false;
        });
    },

    setupContentMinHigh: function(){
        $("#adm-body").css('min-height', $(".main-sidebar").height() + 95);
    },

    fancyboxInit: function(){
        // Detecting IE more effectively : http://msdn.microsoft.com/en-us/library/ms537509.aspx
        function getInternetExplorerVersion() {
            // Returns the version of Internet Explorer or -1 (other browser)
            var rv = -1; // Return value assumes failure.
            if (navigator.appName == 'Microsoft Internet Explorer') {
                var ua = navigator.userAgent;
                var re = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
                if (re.exec(ua) != null)
                    rv = parseFloat(RegExp.$1);
            }
            return rv;
        }
        // set some general variables
        var $video_player, _videoHref, _videoPoster, _videoWidth, _videoHeight, _dataCaption, _player, _isPlaying = false, _verIE = getInternetExplorerVersion();
        jQuery(document).ready(function ($) {
            jQuery(".fancy_video")
                .prepend("<span class=\"playbutton\"/>") //cosmetic : append a play button image
                .fancybox({
                    // set type of content (remember, we are building the HTML5 <video> tag as content)
                    type       : "html",
                    // other API options
                    scrolling  : "no",
                    padding    : 0,
                    nextEffect : "fade",
                    prevEffect : "fade",
                    nextSpeed  : 0,
                    prevSpeed  : 0,
                    fitToView  : false,
                    autoSize   : false,
                    modal      : true, // hide default close and navigation buttons
                    helpers    : {
                        title  : {
                            type : "over"
                        },
                        buttons: {} // use buttons helpers so navigation button won't overlap video controls
                    },
                    beforeLoad : function () {
                        // if video is playing and we navigate to next/prev element of a fancyBox gallery
                        // safely remove Flash objects in IE
                        if (_isPlaying && (_verIE > -1)) {
                            // video is playing AND we are using IE
                            _verIE < 9.0 ? _player.remove() : $video_player.remove(); // remove player instance for IE
                            _isPlaying = false; // reinitialize flag
                        }
                        // build the HTML5 video structure for fancyBox content with specific parameters
                        _videoHref   = this.href;
                        // validates if data values were passed otherwise set defaults
                        _videoPoster = typeof this.element.data("poster")  !== "undefined" ? this.element.data("poster")  :  "";
                        _videoWidth  = typeof this.element.data("width")   !== "undefined" ? this.element.data("width")   : 500;
                        _videoHeight = typeof this.element.data("height")  !== "undefined" ? this.element.data("height")  : 500;
                        _dataCaption = typeof this.element.data("caption") !== "undefined" ? this.element.data("caption") :  "";
                        // construct fancyBox title (optional)
                        this.title = _dataCaption ? _dataCaption : (this.title ? this.title : "");
                        // set fancyBox content and pass parameters
                        //this.content = "<video id='video_player' src='" + _videoHref + "'  poster='" + _videoPoster + "' width='" + _videoWidth + "' height='" + _videoHeight + "'  controls='controls' preload='none' type='video/mp4' ></video>";
                        var videoHtml = $('#box_video_item_common_tpl').html();
                        var videoData = {
                            _videoHref: _videoHref,
                            _videoWidth: _videoWidth,
                            _videoHeight: _videoHeight
                        };
                        this.content = Mustache.render(videoHtml, videoData);
                        // set fancyBox dimensions
                        this.width = _videoWidth;
                        this.height = _videoHeight;
                    },
                    afterShow : function () {
                        // initialize MEJS player
                        var $video_player = new MediaElementPlayer('#video_player', {
                            defaultVideoWidth : this.width,
                            defaultVideoHeight : this.height,
                            // if set, overrides <video width>
                            videoWidth: -1,
                            // if set, overrides <video height>
                            videoHeight: -1,
                            // width of audio player
                            audioWidth: 400,
                            // height of audio player
                            audioHeight: 30,
                            // initial volume when the player starts
                            startVolume: 0.8,
                            // useful for <audio> player loops
                            loop: false,
                            // enables Flash and Silverlight to resize to content size
                            enableAutosize: false,
                            // the order of controls you want on the control bar (and other plugins below)
                            features: ['playpause','progress','current','duration','tracks','volume','fullscreen'],
                            // Hide controls when playing and mouse is not over the video
                            alwaysShowControls: false,
                            // force iPad's native controls
                            iPadUseNativeControls: true,
                            // force iPhone's native controls
                            iPhoneUseNativeControls: true,
                            // force Android's native controls
                            AndroidUseNativeControls: false,
                            // forces the hour marker (##:00:00)
                            alwaysShowHours: false,
                            // show framecount in timecode (##:00:00:00)
                            showTimecodeFrameCount: false,
                            // used when showTimecodeFrameCount is set to true
                            framesPerSecond: 25,
                            // turns keyboard support on and off for this instance
                            enableKeyboard: true,
                            // when this player starts, it will pause other players
                            pauseOtherPlayers: true,
                            // array of keyboard commands
                            keyActions: [],
                            // Enable click video element to toggle play/pause
                            clickToPlayPause: true,
                            // path to Flash and Silverlight plugins
                            /*pluginPath: '/assets/mediaelement/',
                             // name of flash file
                             flashName: 'flashmediaelement.swf',
                             // name of silverlight file
                             silverlightName: 'silverlightmediaelement.xap',
                             // remove or reorder to change plugin priority
                             plugins: ['silverlight','flash'],
                             // none: forces fallback view
                             mode: 'auto_plugin',*/
                            success : function (mediaElement, domObject) {
                                _player = mediaElement; // override the "mediaElement" instance to be used outside the success setting
                                _player.load(); // fixes webkit firing any method before player is ready
                                //_player.play(); // autoplay video (optional)
                                _player.addEventListener('playing', function () {
                                    _isPlaying = true;
                                }, false);
                            } // success
                        });
                    },
                    beforeClose : function () {
                        // if video is playing and we close fancyBox
                        // safely remove Flash objects in IE
                        if (_isPlaying && (_verIE > -1)) {
                            // video is playing AND we are using IE
                            _verIE < 9.0 ? _player.remove() : $video_player.remove(); // remove player instance for IE
                            _isPlaying = false; // reinitialize flag
                        };
                    }
                });

            //image popup
            jQuery(".fancy_image").fancybox({
                // set type of content (remember, we are building the HTML5 <video> tag as content)
                type       : "image",
                // other API options
                scrolling  : "no",
                padding    : 0,
                nextEffect : "fade",
                prevEffect : "fade",
                nextSpeed  : 0,
                prevSpeed  : 0,
                fitToView  : true,
                autoSize   : true,
                modal      : true, // hide default close and navigation buttons
                autoDimensions: true,
                helpers    : {
                    title  : {
                        type : "over",
                    },
                    overlay: {
                        locked: false
                    },
                    buttons: {} // use buttons helpers so navigation button won't overlap video controls
                },
                beforeLoad : function () {
                    // if video is playing and we navigate to next/prev element of a fancyBox gallery
                    // safely remove Flash objects in IE
                    if (_isPlaying && (_verIE > -1)) {
                        // video is playing AND we are using IE
                        _verIE < 9.0 ? _player.remove() : $image_player.remove(); // remove player instance for IE
                        _isPlaying = false; // reinitialize flag
                    };
                    // build the HTML5 video structure for fancyBox content with specific parameters
                    _videoHref   = this.href;
                    // validates if data values were passed otherwise set defaults
                    _videoPoster = typeof this.element.data("poster")  !== "undefined" ? this.element.data("poster")  :  "";
                    _videoWidth  = typeof this.element.data("width")   !== "undefined" ? this.element.data("width")   : 500;
                    _videoHeight = typeof this.element.data("height")  !== "undefined" ? this.element.data("height")  : 500;
                    _dataCaption = typeof this.element.data("caption") !== "undefined" ? this.element.data("caption") :  "";
                    // construct fancyBox title (optional)
                    this.title = _dataCaption ? _dataCaption : (this.title ? this.title : "");
                    // set fancyBox content and pass parameters
                    this.content = "<img id='image_player' src='" + _videoHref + "'  poster='" + _videoPoster + "' width='" + _videoWidth + "' height='auto'  controls='controls' preload='none' />";
                    // set fancyBox dimensions
                    this.width = _videoWidth;
                    this.height = _videoHeight;
                },
                afterShow : function () {
                },
                beforeClose : function () {
                    if (_isPlaying && (_verIE > -1)) {
                        _verIE < 9.0 ? _player.remove() : $image_player.remove(); // remove player instance for IE
                        _isPlaying = false; // reinitialize flag
                    };
                }
            });

        }); // ready
    },

    // Display a confirmation popup when leaving a Edit page
    editingPageUnloadHandler: function(){

        var isSubmit = false;
        var isChanged = false;
        // Confirm when leave page
        if($('#editingPage').find('#form-training-plan').length == 0) {
            $(window).on('beforeunload', function () {
                if ($('#editingPage').length && !isSubmit && isChanged)
                    return Lang.get("dialogs.leave_page_confirm");
            });
        }

        //handle common
        $('body form:not("#conditioning_datas")').on('change', 'input, form, select, textarea, slide', function(){
            isChanged = true;
        });

        // jquery Slider handling
        $(".slider").on('slide', function() {
            isChanged = true;
        });

        //iCheck change event
        $('input').not('[name="searchType"]').on('ifClicked', function(event){
            isChanged = true;
        });

        $('form').submit(function(){
            isSubmit = true;
        });

        // Won't confirm if change calorie objective
        $('#calorie_objective , #calorie_objective-2').on('change', function(){
            isSubmit = true;
        });

        // Won't confirm if click Back and when submit form on /admin/permission/user/view page
        $('#submit_permission , .btn-warning ').click(function(e){
            isSubmit = true;
        });

        var countTrInTable = $('#training-plan-exercises-table > tbody > tr').length;
        var j = countTrInTable;
        $(document).on('click', '#ok-modal', function() {
            j++;
            if(j != countTrInTable) {
                isChanged = true;
            }
        });

        $('#training-plan-exercises-table .exercise-action-delete').on('click', function() {
            j++;
            if(j != countTrInTable) {
                isChanged = true;
            }
        });
        //handle custom for conditioning data
        var i = 0;
        var countSelect2 = $('#conditioning_datas .select2.form-control').length;
        $('#conditioning_datas ').on('change', 'form, input, select, textarea, slide, .select2', function(){
            i++;
            if(i > countSelect2)
                isChanged = true;
        });

        //when change painpoint isChanged set false
        $('#front_ok').click(function() {
            var length = $(".painpoint-container").children().length;
            if(length)
                isChanged = true;
        });

        //when close button of modal is clicked
        $('#medical_check_medication .modal-content').find('.btn-default, .close').click(function(){
            isChanged = false;
        });

        $('#medical_check_medication .modal-content').find('.btn-primary').click(function(){
            isSubmit = true;
        });

        var trainingPlanTableBeforeSort = $( "#training-plan-exercises-table" ).html();
        /*$( "#training-plan-exercises-table" ).on( "sortbeforestop sortstop", function( event, ui ) {
         var trainingPlanTableAfterSort = $( "#training-plan-exercises-table" ).html();
         if(trainingPlanTableBeforeSort != trainingPlanTableAfterSort) {
         isChanged = true;
         }
         });*/

        $(document).on('click', '#btn-check-edit-next', function() {
            var trainingPlanTableAfterChange = $( "#training-plan-exercises-table" ).html();
            if(trainingPlanTableBeforeSort != trainingPlanTableAfterChange) {
                isChanged = true;
            }
        });

        $(document).on('click', '.select-exercise-separator', function() {
            var trainingPlanTableAfterSort = $( "#training-plan-exercises-table" ).html();
            if(trainingPlanTableBeforeSort != trainingPlanTableAfterSort) {
                isChanged = true;
            }
        });

        //when change injury body parts of modal
        $('.save-data-body-part, .save-data-treatment-content').click(function() {
            var arrValue = $('input:checkbox[name="injury[]"]');
            if(arrValue){
                $.each(arrValue, function(key, itemInput) {
                    if($(this).is(":checked"))
                        isChanged = true;
                });
            }
            var arrValueTreatment = $('input:checkbox[name="injury_treatment[]"]');
            if(arrValueTreatment){
                $.each(arrValueTreatment, function(key, itemInput) {
                    if($(this).is(":checked"))
                        isChanged = true;
                });
            }
        });
    },

};
