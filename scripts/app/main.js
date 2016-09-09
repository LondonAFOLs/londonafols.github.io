define(function (require) {
    var self = this;
    var $ = require('jquery');
    var _bootstrap = require('bootstrap');
    var _ = require('underscore');

    var $carousel = $('.nextmeetup .carousel');
    var $indicators = $('.carousel-indicators', $carousel);
    var $items = $('.carousel-inner', $carousel);

    function addNoMeetups() {
        //TODO
    }

    function addMeetups(meetups) {
        console.dir(meetups);
        for (var i = 0; i < meetups.length; i++) {
            if (isVisible(meetups[i])) {
                addMeetup(meetups[i], i);
            }
        }

        $carousel.removeClass('hidden');
        $carousel.carousel();
    }

    function addMeetup(meetup, index) {
        var name = meetup.name;
        if (name.indexOf('Lego') == 0) {
            name = name.substring(4).trim();
        }
        var link = meetup.link;
        var venue = meetup.venue;
        if (venue.name === "TBC") {
            venue.name = "To be confirmed";
        }
        var start = new Date(meetup.time);
        var finish = new Date(meetup.time + meetup.duration);

        if (name && link) {
            var $indicator = $('<li></li>');
            $indicator.attr('data-target', $carousel.attr('id'));
            $indicator.attr('data-slide-to', index);

            var $item = $('<div class="item"></div>');

            var $headingRow = $('<h2 class="row"></h2>').text(name);

            var $whereWhenRow = $('<div class="row where-and-when"></div>');

            $whereWhenRow.append($('<div class="col-md-1 col-sm-1"><span class="glyphicon glyphicon-map-marker"></span></div>'));
            var $address = $('<div class="address col-md-4 col-sm-4" itemscope itemtype="http://schema.org/PostalAddress"></div>');
            if (isPublic(meetup)) {
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
            }
            if (venue.city) {
                $address.append($('<span class="city" itemprop="addressLocality"></span>').text(venue.city));
            }
            $whereWhenRow.append($address);

            $whereWhenRow.append($('<div class="col-md-1 col-sm-1"><span class="glyphicon glyphicon-time"></span></div>'));
            var $when = $('<div class="when col-md-4 col-sm-4"></div>').text(start);
            $whereWhenRow.append($when);

            var $learnMoreRow = $('<div class="row"></div>')
                .append($('<a class="btn btn-primary btn-large learnmore" target="_blank">Learn more &raquo;</a>')
                    .attr('href', link)
                    .attr('target', '_blank'));

            $item.append($headingRow);
            $item.append($whereWhenRow);
            $item.append($learnMoreRow);

            if (index == 0) {
                $indicator.addClass('active');
                $item.addClass('active');
            }

            $indicators.append($indicator);
            $items.append($item);
        }
    }

    function isVisible(meetup) {
        return isPublic(meetup) || isPublicLimited(meetup);
    }

    function isPublic(meetup) {
        return meetup.visibility && meetup.visibility === "public";
    }

    function isPublicLimited(meetup) {
        return meetup.visibility && meetup.visibility === "public_limited";
    }

    $.ajax({
        action: 'GET',
        url: 'https://api.meetup.com/LondonAFOLs/events?sig_id=9923731&sig=ac774667b4e63e0ecabd772bf30b08e84ed3c34d',
        jsonp: 'callback',
        dataType: 'jsonp'
    }).done(function(response) {
        if (response.data && response.data.length && _.filter(response.data, isVisible).length) {
            addMeetups(response.data);
        } else {
            addNoMeetups();
        }
    }).fail(function() {
        addNoMeetups();
    }).always(function() {
        $('.nextmeetup .spinner').addClass('hidden');
    });
});