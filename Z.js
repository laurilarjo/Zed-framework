! function(w, d) {
    if (!w.Z) {
        w.Z = {};
        var topics = {};
        function filt(obj) {
            return Object.keys(obj).filter(function(el) {
                return el != "html" && el != "entry";
            })[0];
        }
        Z.update = function(obj) {
            var subscribers = topics[filt(obj)];
            var len = subscribers ? subscribers.length : 0;
            while (len--) {
                subscribers[len](obj);
            }
        }
        Z.render = function(obj, noSubscribe) {
            var x = filt(obj);
            if (x && !noSubscribe) {
                topics[x] = topics[x] || [];
                topics[x].push(
                    function(data) {
                        for (var key in data) {
                            obj[key] = data[key];
                        }
                        Z.render(obj, true);
                    }
                );
            }
            var objResolved = {};
            var arr = obj.html ? [obj.html] : [];
            typeof obj[x] === 'string' ? arr.push(obj[x]) : Z[x] = obj[x];
            arr.forEach(function(url, index) {
                objResolved[index] = null;
                var xhr = new XMLHttpRequest();
                xhr.onreadystatechange = function() {
                    if (xhr.readyState == 4 && xhr.status == 200) {
                        objResolved[index] = xhr.responseText;
                        var allResolved = true;
                        for (var key in objResolved) {
                            if (objResolved[key] === null) {
                                allResolved = false;
                            }
                        }
                        if (allResolved) {
                            if (objResolved[1]) {
                                Z[x] = JSON.parse(objResolved[1]);
                            }
                            obj.entry.innerHTML = objResolved[0];
                            var scripts = new DOMParser().parseFromString(objResolved[0], 'text/html').querySelectorAll("SCRIPT");
                            var i = 0;
                            var j = scripts.length;
                            while (i < j) {
                                var newScript = d.createElement("SCRIPT");
                                scripts[i].src ? newScript.src = scripts[i].src : newScript.innerHTML = scripts[i].innerHTML;
                                d.head.appendChild(newScript);
                                i++;
                            }
                        }
                    }
                };
                xhr.open("GET", url, true);
                xhr.send();
            });
        }
    }
}(window, document);