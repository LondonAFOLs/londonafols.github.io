// Remove events that have already finished from the meetup carousel.
// The page is only rebuilt when the nightly Meetup fetch succeeds, so a stale
// build can still contain past events — filter client-side, where the clock
// is always current. Items without a parseable data-end-iso are kept.
// Runs before Bootstrap's data-api initialises the carousel on window load.
(function () {
    var carousel = document.getElementById('nextmeetup-carousel');
    if (!carousel) return;
    var now = Date.now();
    carousel.querySelectorAll('.carousel-item').forEach(function (item) {
        var end = Date.parse(item.getAttribute('data-end-iso'));
        if (!isNaN(end) && end < now) {
            item.remove();
        }
    });

    var remaining = carousel.querySelectorAll('.carousel-item');
    remaining.forEach(function (item, i) {
        item.classList.toggle('active', i === 0);
    });
    if (!remaining.length) {
        carousel.classList.add('d-none');
    }

    // Indicator buttons are identical apart from their slide index, so trim
    // the surplus and renumber the rest.
    var indicators = carousel.querySelector('.carousel-indicators');
    indicators.querySelectorAll('button').forEach(function (button, i) {
        if (i >= remaining.length) {
            button.remove();
            return;
        }
        button.setAttribute('data-bs-slide-to', i);
        button.setAttribute('aria-label', 'Slide ' + (i + 1));
        button.classList.toggle('active', i === 0);
    });
    if (remaining.length < 2) {
        indicators.classList.add('d-none');
    }
})();

// Reveal one randomly-chosen announcement (the rest stay hidden).
// Bootstrap 5's carousel auto-initialises via data-bs-ride="carousel".
(function () {
    var announcements = document.querySelectorAll('#announcements a');
    if (!announcements.length) return;
    var index = Math.floor(Math.random() * announcements.length);
    announcements[index].removeAttribute('hidden');
})();
