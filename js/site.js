// call this from the developer console and you can control both instances
var calendars = {};
$(document).ready(function () {
    // Configure/customize these variables.
    var showChar = 60; // How many characters are shown by default
    var ellipsestext = "...";
    var moretext = "Read more+";
    var lesstext = "Read less-";
    $('.more').each(function () {
        var content = $(this).html();
        if (content.length > showChar) {
            var c = content.substr(0, showChar);
            var h = content.substr(showChar, content.length - showChar);
            var html = c + '<span class="moreellipses">' + ellipsestext + '&nbsp;</span><span class="morecontent"><span>' + h + '</span>&nbsp;&nbsp;<a href="" class="morelink">' + moretext + '</a></span>';
            $(this).html(html);
        }
    });
    $(".morelink").click(function () {
        if ($(this).hasClass("less")) {
            $(this).removeClass("less");
            $(this).html(moretext);
        }
        else {
            $(this).addClass("less");
            $(this).html(lesstext);
        }
        $(this).parent().prev().toggle();
        $(this).prev().toggle();
        return false;
    });
    // assuming you've got the appropriate language files,
    // clndr will respect whatever moment's language is set to.
    // moment.lang('ru');
    // here's some magic to make sure the dates are happening this month.
    var thisMonth = moment().format('YYYY-MM');
    var eventArray = [
        {
            startDate: thisMonth + '-10'
            , endDate: thisMonth + '-14'
            , title: 'Multi-Day Event'
        }
        , {
            startDate: thisMonth + '-21'
            , endDate: thisMonth + '-23'
            , title: 'Another Multi-Day Event'
        }
  ];
    // the order of the click handlers is predictable.
    // direct click action callbacks come first: click, nextMonth, previousMonth, nextYear, previousYear, or today.
    // then onMonthChange (if the month changed).
    // finally onYearChange (if the year changed).
    calendars.clndr1 = $('.cal1').clndr({
        events: eventArray
        , // constraints: {
        //   startDate: '2013-11-01',
        //   endDate: '2013-11-15'
        // },
        clickEvents: {
            click: function (target) {
                console.log(target);
                if ($(target.element).hasClass('inactive')) {
                    console.log('not a valid datepicker date.');
                }
                else {
                    console.log('VALID datepicker date.');
                }
            }
            , nextMonth: function () {
                console.log('next month.');
            }
            , previousMonth: function () {
                console.log('previous month.');
            }
            , onMonthChange: function () {
                console.log('month changed.');
            }
            , nextYear: function () {
                console.log('next year.');
            }
            , previousYear: function () {
                console.log('previous year.');
            }
            , onYearChange: function () {
                console.log('year changed.');
            }
        }
        , multiDayEvents: {
            startDate: 'startDate'
            , endDate: 'endDate'
        }
        , showAdjacentMonths: true
        , adjacentDaysChangeMonth: false
    });
    // calendars.clndr2 = $('.cal2').clndr({
    //   template: $('#template-calendar').html(),
    //   events: eventArray,
    //   startWithMonth: moment().add('month', 1),
    //   clickEvents: {
    //     click: function(target) {
    //       console.log(target);
    //     }
    //   }
    // });
    // bind both clndrs to the left and right arrow keys
    $(document).keydown(function (e) {
        if (e.keyCode == 37) {
            // left arrow
            calendars.clndr1.back();
            calendars.clndr2.back();
        }
        if (e.keyCode == 39) {
            // right arrow
            calendars.clndr1.forward();
            calendars.clndr2.forward();
        }
    });
});