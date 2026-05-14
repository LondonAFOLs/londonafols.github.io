// Reveal one randomly-chosen announcement (the rest stay hidden).
// Bootstrap 5's carousel auto-initialises via data-bs-ride="carousel".
(function () {
    var announcements = document.querySelectorAll('#announcements a');
    if (!announcements.length) return;
    var index = Math.floor(Math.random() * announcements.length);
    announcements[index].removeAttribute('hidden');
})();
