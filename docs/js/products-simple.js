"use strict";document.getElementById("output").innerHTML=Z.products.map(function(n,c){return'\n    <div class="product" onclick="Z.update({view:Z.products['.concat(c,']})">\n        <h2>').concat(n.name,'</h2>\n        <img src="images/').concat(n.image,'" width="200">\n        <span>').concat(n.price," €</span>\n    </div>\n    ")}).join("");