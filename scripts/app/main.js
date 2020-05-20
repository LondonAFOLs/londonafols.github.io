define(function (require) {
    var $ = require('jquery');
    var _bootstrap = require('bootstrap');
    var _ = require('underscore');

    var $carousel = $('.nextmeetup .carousel');
    var $indicators = $('.carousel-indicators', $carousel);
    var $items = $('.carousel-inner', $carousel);

    function addNoMeetups() {
        $indicators.addClass('hidden');
    }

    function addMeetups(meetups) {
        if (meetups.length) {
            for (var i = 0; i < meetups.length; i++) {
                addMeetup(meetups[i], i);
            }
            if (meetups.length < 2) {
                $indicators.addClass('hidden');
            }
            $carousel.removeClass('hidden');
            $carousel.carousel();
        } else {
            addNoMeetups();
        }
    }

    function addMeetup(meetup, index) {
        var name = meetup.name;
        var link = meetup.link;
        var venue = meetup.venue;
        var start = new Date(meetup.time);
        if (name && link) {
            var $indicator = $('<li></li>');
            $indicator.attr('data-target', $carousel.attr('id'));
            $indicator.attr('data-slide-to', index);

            var $item = $('<div class="item"></div>');

            var $headingRow = $('<h2 class="row"></h2>').text(name);

            var $whereWhenRow = $('<div class="row where-and-when"></div>');

            $whereWhenRow.append($('<div class="col-md-1 col-sm-1"><span class="glyphicon glyphicon-map-marker"></span></div>'));
            var $address = $('<div class="address col-md-4 col-sm-4" itemscope itemtype="http://schema.org/PostalAddress"></div>');
            $address.append($('<span class="name" itemprop="name"></span>').text(venue.name));
            if (venue.address_1) {
                $address.append($('<span class="address" itemprop="streetAddress"></span>').text(venue.address_1));
            }
            if (venue.address_2) {
                $address.append($('<span class="address" itemprop="streetAddress"></span>').text(venue.address_2));
            }
            if (venue.address_3) {
                $address.append($('<span class="address" itemprop="streetAddress"></span>').text(venue.address_3));
            }
            if (venue.city) {
                $address.append($('<span class="city" itemprop="addressLocality"></span>').text(venue.city));
            }
            $whereWhenRow.append($address);

            $whereWhenRow.append($('<div class="col-md-1 col-sm-1"><span class="glyphicon glyphicon-time"></span></div>'));
            var options = { weekday: 'long', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'Europe/London', timeZoneName: "short" };
            var $when = $('<div class="when col-md-4 col-sm-4"></div>').text(start.toLocaleString('en-GB', options));
            $whereWhenRow.append($when);

            var $learnMoreRow = $('<div class="row"></div>')
                .append($('<a class="btn btn-primary btn-large learnmore" target="_blank">Learn more &raquo;</a>')
                    .attr('href', link)
                    .attr('target', '_blank'));

            $item.append($headingRow);
            $item.append($whereWhenRow);
            $item.append($learnMoreRow);

            if (index === 0) {
                $indicator.addClass('active');
                $item.addClass('active');
            }

            $indicators.append($indicator);
            $items.append($item);
        }
    }

    function announce(announcements) {
        if (announcements.length) {
            var index = Math.round(Math.random() * (announcements.length - 1));
            var announcement = announcements[index];
            var $announcement = $('<a class="github-fork-ribbon"></a>');
            $announcement.attr('href', announcement.link);
            $announcement.attr('data-ribbon', announcement.title);
            $announcement.attr('title', announcement.title);
            $announcement.text(announcement.title);
            $("#announcements").append($announcement)
        }
    }

    $.ajax({
        action: 'GET',
        url: './events.json',
        dataType: 'json'
    }).done(function(response) {
        addMeetups(response);
    }).fail(function() {
        addNoMeetups();
    }).always(function() {
        $('.nextmeetup .spinner').addClass('hidden');
    });

    $.ajax({
        action: 'GET',
        url: './announcements.json',
        dataType: 'json'
    }).done(function(response) {
        announce(response);
    });
});
