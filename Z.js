// IIFE
! function(w, d) {
    // check if Z is already loaded
    if (!w.Z) {
        // object store
        w.Z = {};
        // PubSub store
        var topics = {};
        // last key in object filter
        function filt(obj) {
            var x = Object.keys(obj);
            return x[x.length-1];
        }

        function injector(obj, x, requests, resolved){
            if (resolved.data && resolved.html) {
                Z[x] = requests.data ? JSON.parse(resolved.data) : resolved.data;
                if(requests.html){
                    obj.inner ? obj.inner.innerHTML = resolved.html : obj.outer.outerHTML = resolved.html;
                    // inject nested scripts into the head.
                    var scripts = new DOMParser().parseFromString(resolved.html, 'text/html').querySelectorAll("SCRIPT");
                    for(var i = 0; i < scripts.length; i++){
                        var newScript = d.createElement("SCRIPT");
                        scripts[i].src ? newScript.src = scripts[i].src : newScript.innerHTML = scripts[i].innerHTML;
                        d.head.appendChild(newScript);
                    }
                }else{
                    obj.inner ? obj.inner.innerHTML = resolved.html() : obj.outer.outerHTML = resolved.html();
                }
            }
        }

        function ajax(requests, resolved, req, obj, x){
            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function() {
                if (xhr.readyState == 4 && xhr.status == 200) {
                    resolved[req] = xhr.responseText;
                    injector(obj, x, requests, resolved);
                }
            };
            xhr.open("GET", requests[req], true);
            xhr.send();
        }

        // update method (simple PubSub publish)
        Z.update = function(obj) {
            topics[filt(obj)] && topics[filt(obj)](obj);
        }
        // render
        Z.render = function(obj, noSubscribe) {
            var x = filt(obj);
            if (x && !noSubscribe) {
                topics[x] = function(data) {
                    for (var key in data) {
                        obj[key] = data[key];
                    }
                    Z.render(obj, true);
                };
            }
            // async ajax
            var resolved = {};
            var requests = {};

            typeof obj[x] === 'string' ? requests.data = obj[x] : resolved.data = obj[x];
            typeof obj.html === 'string' ? requests.html = obj.html : resolved.html = obj.html;
            
            injector(obj, x, requests, resolved);
            for (var req in requests){
                ajax(requests, resolved, req, obj, x);
            }
        }
    }
    // init    
}(window, document);