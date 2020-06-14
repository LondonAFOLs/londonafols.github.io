requirejs.config({
    baseUrl: 'scripts',
    shim: {
        "bootstrap" : { "deps" :['jquery'] }
    },
    paths: {
        jquery: '//code.jquery.com/jquery-2.2.4.min',
        bootstrap: '//maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min'
    }
});
requirejs(['app/main']);