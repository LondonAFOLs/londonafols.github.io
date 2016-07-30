define(function (require) {
    var $ = require('jquery');
    var _bootstrap = require('bootstrap');

    var $carousel = $('.nextmeetup .carousel');
    var $indicators = $('.carousel-indicators', $carousel);
    var $items = $('.carousel-inner', $carousel);

    function noMeetups() {
    }

    function showMeetups(meetups) {
        for (var i = 0; i < meetups.length; i++) {
            var meetup = meetups[i];
            var name = meetup.name;
            if (name && name.indexOf('Lego Meetup - ') == 0) {
                name = name.substring('Lego Meetup - '.length);
            }

            var $indicator = $('<li></li>');
            $indicator.attr('data-target', $carousel.attr('id'));
            $indicator.attr('data-slide-to', i);

            var $item = $('<div class="item"></div>')
                //.append($('<h2></h2>').text(name))
                .append($('<h2></h2>').text(name));

            if (i == 0) {
                $indicator.addClass('active');
                $item.addClass('active');
            }

            $indicators.append($indicator);
            $items.append($item);
        }

        $carousel.removeClass('hidden');
        $carousel.carousel();
    }

    $.ajax({
        action: 'GET',
        url: 'https://api.meetup.com/LondonAFOLs/events?sig_id=9923731&sig=ac774667b4e63e0ecabd772bf30b08e84ed3c34d',
        jsonp: 'callback',
        dataType: 'jsonp'
    }).done(function(response) {
        if (response.data && response.data.length) {
            showMeetups(response.data);
        } else {
            noMeetups();
        }
    }).fail(function() {
        noMeetups();
    }).always(function() {
        $('.nextmeetup .spinner').addClass('hidden');
    });
});