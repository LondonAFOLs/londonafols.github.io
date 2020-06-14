define(function (require) {
    var $ = require('jquery');
    var _bootstrap = require('bootstrap');

    $('.nextmeetup .carousel').carousel();

    // choose an announcement at random and show it by removing its hidden attribute
    var $announcements = $('#announcements a');
    if ($announcements.length) {
        var index = Math.round(Math.random() * ($announcements.length - 1));
        var $announcement = $($announcements[index]);
        $announcement.removeAttr('hidden');
    }
});
