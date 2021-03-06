(function() {
    if (window.ksRunnerInit) return;

    // This line gets patched up by the cloud
    var pxtConfig = null;

    var scripts = [
        "/blb/highlight.js/highlight.pack.js",
        "/blb/bluebird.min.js",
        "/blb/semantic.js",
        "/blb/marked/marked.min.js",
        "/blb/target.js",
        "/blb/pxtembed.js"
    ]

    if (typeof jQuery == "undefined")
        scripts.unshift("/blb/jquery.js")

    var pxtCallbacks = []

    window.ksRunnerReady = function(f) {
        if (pxtCallbacks == null) f()
        else pxtCallbacks.push(f)
    }

    window.ksRunnerWhenLoaded = function() {
        pxt.docs.requireHighlightJs = function() { return hljs; }
        pxt.setupWebConfig(pxtConfig || window.pxtWebConfig)
        pxt.runner.initCallbacks = pxtCallbacks
        pxtCallbacks.push(function() {
            pxtCallbacks = null
        })
        pxt.runner.init();
    }

    scripts.forEach(function(src) {
        var script = document.createElement('script');
        script.src = src;
        script.async = false;
        document.head.appendChild(script);
    })

} ())
