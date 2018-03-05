// call this from the developer console and you can control both instances
var calendars = {};
$(document).ready(function () {
    // Configure/customize these variables.
    if (localStorage.getItem('MH_user_name') != null) {
        $.mobile.navigate('#profile');
    }
    $('.next1').on('click', function () {
        if ($('input[name=user_name]').val() != "" && $('input[name=user_age]').val() != "") {
            localStorage.setItem('MH_user_name', $('input[name=user_name]').val());
            localStorage.setItem('MH_user_age', $('input[name=user_age]').val());
            $('input[name=gender][value='+$('input[name=gender]:checked').attr('value')+']').attr('checked', true);
            localStorage.setItem('MH_user_gender', $('input[name=gender]:checked').attr('value'));
            if (localStorage.getItem('MH_user_name') != null && localStorage.getItem('MH_user_name') != "" && localStorage.getItem('MH_user_age') != '' && localStorage.getItem('MH_user_age') != null) {
                $.mobile.navigate('#landing2');
                $('.profile_picture_name h2').html(localStorage.getItem('MH_user_name'));
                if (localStorage.getItem('MH_user_gender') == 'male') {
                    $('.profile_user_age img').attr('src', 'images/masculine.png');
                }
                else {
                    $('.profile_user_age img').attr('src', 'images/femenine.png');
                }
                $('.profile_user_age age').html(localStorage.getItem('MH_user_age'));
            }
        }
        else {
            alert('Sila lengkapkan pendaftaran anda.');
        }
    });
    $('.next2').on('click', function () {
        if ($('input[name=user_weight]').val() != "" && $('input[name=user_height]').val() != "") {
            var weightObj = '[{"date" : "'+new Date()+'","weight" : '+$('input[name=user_weight]').val()+'}]';
            var heightObj = '[{"date" : "'+new Date()+'","height" : '+$('input[name=user_height]').val()+'}]';
            localStorage.setItem('MH_user_weight', weightObj);
            localStorage.setItem('MH_user_height', heightObj);
            if (localStorage.getItem('MH_user_weight') != null && localStorage.getItem('MH_user_height') != null) {
                $.mobile.navigate('#profile');
                $('.profile_user_weight').html($('input[name=user_weight]').val());
                $('.profile_user_height').html($('input[name=user_height]').val());
                var weight = $('input[name=user_weight]').val();
                var height = $('input[name=user_height]').val();
                if (weight > 0 && height > 0) {
                    var finalBmi = weight / (height / 100 * height / 100);
                    var bmiObj = '[{"date" : "'+new Date()+'","bmi" : '+finalBmi.toFixed(2)+'}]';
                    localStorage.setItem('MH_user_bmi', bmiObj);
                }
                $('.profile_user_bmi').html(finalBmi.toFixed(2));
                location.reload();
            }
        }
        else {
            alert('Sila lengkapkan pendaftaran anda.');
        }
    });
    $('.profile_picture_name h2').html(localStorage.getItem('MH_user_name'));
    $('input[name=update_user_name]').val(localStorage.getItem('MH_user_name'));
    $('input[name=update_user_age]').val(localStorage.getItem('MH_user_age'));
    $('input[name=update_gender]').val(localStorage.getItem('MH_user_gender'));
    if (localStorage.getItem('MH_user_gender') == 'male') {
        $('.profile_user_age img').attr('src', 'images/masculine.png');
    }
    else {
        $('.profile_user_age img').attr('src', 'images/femenine.png');
    }
    $('.profile_user_age age').html(localStorage.getItem('MH_user_age'));
    if (localStorage.getItem('MH_user_weight') != null && localStorage.getItem('MH_user_height') != null) {
        var weightJSON = JSON.parse(localStorage.getItem('MH_user_weight'));
        var heightJSON = JSON.parse(localStorage.getItem('MH_user_height'));
//        var weight = weightJSON[0].weight;
//        var height = heightJSON[0].height;
//        if (weight > 0 && height > 0) {
//            var finalBmi = weight / (height / 100 * height / 100);
//            var bmiJSON = JSON.parse(localStorage.getItem('MH_user_bmi'));
//            bmiJSON.unshift({date : ""+new Date(), bmi : finalBmi.toFixed(2)});
//            localStorage.setItem('MH_user_bmi', JSON.stringify(bmiJSON));
//        }
        
        if(localStorage.getItem('MH_user_medicine_note') != null){
            updateMedicineNote();
        }
        
        var bmiJSON = JSON.parse(localStorage.getItem('MH_user_bmi'));
        $('.profile_user_weight').html(weightJSON[0].weight);
        $('.profile_user_height').html(heightJSON[0].height);
        $('.profile_user_bmi').html(bmiJSON[0].bmi);
        
        $('ul.weight-list').html("");
        
        $.each(weightJSON, function(i,v){
            var date = v.date;
            date = date.split(" ");
            var stats = "unchanged";
            if (v.weight > v.weight){
                stats = "increase";
            }else if (v.weight < v.weight){
                stast = "drop";
            }
            var weightStr = '<li><a href="#"><span class="day_name">'+date[0]+'</span>&nbsp; '+date[1]+' '+date[2]+' <label class="digits"><i> <img src="images/'+stats+'.png" alt="" width="16" height="16"></i> '+v.weight+' <i style="color: #9099B7">kg</i></label><div class="clear"></div></a></li>';
            $('ul.weight-list').append(weightStr);
        });
        
        $.each(heightJSON, function(i,v){
            var date = v.date;
            date = date.split(" ");
            var stats = "unchanged";
            if (v.height > v.height){
                stats = "increase";
            }else if (v.height < v.height){
                stast = "drop";
            }
            var heightStr = '<li><a href="#"><span class="day_name">'+date[0]+'</span>&nbsp; '+date[1]+' '+date[2]+' <label class="digits"><i> <img src="images/'+stats+'.png" alt="" width="16" height="16"></i> '+v.height+' <i style="color: #9099B7">kg</i></label><div class="clear"></div></a></li>';
            $('ul.height-list').append(heightStr);
        });
        
        $.each(bmiJSON, function(i,v){
            var date = v.date;
            date = date.split(" ");
            var stats = "unchanged";
            if (v.bmi > v.bmi){
                stats = "increase";
            }else if (v.bmi < v.bmi){
                stast = "drop";
            }
            var bmiStr = '<li><a href="#"><span class="day_name">'+date[0]+'</span>&nbsp; '+date[1]+' '+date[2]+' <label class="digits">healthy <i style="color: #9099B7">'+v.bmi+'</i> <i> <img src="images/unchanged.png" alt="" width="16" height="16"></i></label><div class="clear"></div></a></li>';
            $('ul.bmi-list').append(bmiStr);
        });
        
    }
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
    $('.update-weight').on('click', function () {
        var weight = $('input[name=update_user_weight]').val();    
        var date = new Date();
        var weightJSON = JSON.parse(localStorage.getItem('MH_user_weight'));
        weightJSON.unshift({date : ""+new Date(), weight : weight});
        localStorage.setItem('MH_user_weight', JSON.stringify(weightJSON));
        
        var heightJSON = JSON.parse(localStorage.getItem('MH_user_height'));
        var height = heightJSON[0].height;
        if (weight > 0 && height > 0) {
            var finalBmi = weight / (height / 100 * height / 100);
            var bmiJSON = JSON.parse(localStorage.getItem('MH_user_bmi'));
            bmiJSON.unshift({date : ""+new Date(), bmi : finalBmi.toFixed(2)});
            localStorage.setItem('MH_user_bmi', JSON.stringify(bmiJSON));
        }
        
        location.reload();
    });
    $('.update-height').on('click', function () {
        var height = $('input[name=update_user_height]').val();    
        var date = new Date();
        var heightJSON = JSON.parse(localStorage.getItem('MH_user_height'));
        heightJSON.unshift({date : ""+new Date(), height : height});
        localStorage.setItem('MH_user_height', JSON.stringify(heightJSON));
        
        var weightJSON = JSON.parse(localStorage.getItem('MH_user_weight'));
        var weight = weightJSON[0].weight;
        if (weight > 0 && height > 0) {
            var finalBmi = weight / (height / 100 * height / 100);
            var bmiJSON = JSON.parse(localStorage.getItem('MH_user_bmi'));
            bmiJSON.unshift({date : ""+new Date(), bmi : finalBmi.toFixed(2)});
            localStorage.setItem('MH_user_bmi', JSON.stringify(bmiJSON));
        }
        location.reload();
    });
    $('.update-profile').on('click', function () {
        if (confirm("Kemaskini profile anda?")){
            localStorage.setItem('MH_user_name',$('input[name=update_user_name]').val());
            localStorage.setItem('MH_user_age',$('input[name=update_user_age]').val());
           $('input[name=gender][value='+$('input[name=gender]:checked').attr('value')+']').attr('checked', true);
            localStorage.setItem('MH_user_gender',$('input[name=gender]:checked').attr('value'));
            
            location.reload();
        }
    });
    $('.save-medicine').on('click', function(){
        if(confirm("Simpan nota ubat?")){
            var medicineName = $('input[name=medicine_name]').val();
            var medicineHour = $('input[name=medicine_hour]').val();
            var medicineMinute = $('input[name=medicine_minute]').val();
            var medicine24 = "AM";
            if(medicineHour >= 12){
                if(medicineHour != 12){
                    medicineHour = medicineHour - 12;
                }
                
                medicine24 = "PM";
            }
            var medicineTime = medicineHour+":"+medicineMinute;
            if(localStorage.getItem('MH_user_medicine_note') != null){
                var medicineJSON = JSON.parse(localStorage.getItem('MH_user_medicine_note'));
                medicineJSON.push({time : ""+medicineTime, meridian: medicine24, medicine_name : medicineName});

                localStorage.setItem("MH_user_medicine_note", JSON.stringify(medicineJSON));
            }else{
                var medicineJSON = '[{"time" : "'+medicineTime+'", "meridian": "'+medicine24+'","medicine_name" : "'+medicineName+'"}]';
                localStorage.setItem("MH_user_medicine_note", medicineJSON);
            }
            updateMedicineNote();
            $.mobile.navigate('#medicine');
        }
        
        
//        var medicineRepeat = true;
//        if($('input[name=medicine_repeat]').attr('checked') == false){
//            medicineRepeat = false;
//        }
    });
    
    function updateMedicineNote(){
        if(localStorage.getItem('MH_user_medicine_note') != null){
            var medicineJSON = JSON.parse(localStorage.getItem('MH_user_medicine_note'));
            
            $('.medicine-list').html("");
            
            var currentTime = new Date();
            var newArr = [];
            
            $.each(medicineJSON, function(i,v){
                time = v.time.split(":");
                
            });
            $.each(medicineJSON, function(i,v){
                time = v.time.split(":");
                if(time[0].length == 1){
                    time[0] = "0"+time[0];
                }
                if(time[1].length == 1){
                    time[1] = "0"+time[1];
                }
                time = time.join(":");
                if(i >= 0){
                    var medicineStr = '<li><a href="#edit-medicine"> <label class="digits">'+time+'<em>'+v.meridian+'</em></label> <label style="color: #fff;margin: 0 15px 0 0;width: 15em; overflow: hidden;text-overflow: ellipsis;">'+v.medicine_name+'</label> <div class="clear"></div></a> </li>';
                    $('.medicine-list').append(medicineStr);
                }
//                }else{
//                    $('.latest-medicine-name').html(v.medicine_name);
//                    $('.latest-medicine-time').html(time+"<em>"+v.meridian+"</em>");
//                }
            });
        }
    }
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
        events: eventArray, // constraints: {
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