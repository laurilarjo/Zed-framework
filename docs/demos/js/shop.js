"use strict";Z.mount({key:"basket",render:function(){return Z.basket.products.length?Z.basket.products.map(function(t,n){return"\n              <div>\n                  <span>".concat(t.name,'</span> <span><button onclick="Z.basket.adjustCart(').concat(n,', -1)">-</button> <span>').concat(t.quantity,'</span> <button onclick="Z.basket.adjustCart(').concat(n,', 1)">+</button></span> <span>').concat((t.price*t.quantity).toFixed(2),"</span>\n              </div>\n            ")}).join("")+"<div>\n            <span>Total: ".concat(Z.basket.total.toFixed(2),"</span>\n          </div>\n          "):""},inner:document.getElementById("basket"),data:{products:JSON.parse(localStorage.getItem("basket"))||[],total:JSON.parse(localStorage.getItem("total"))||0,update:function(){this.total=0,this.products.forEach(function(t){this.total+=t.quantity*t.price},this),localStorage.setItem("basket",JSON.stringify(this.products)),localStorage.setItem("total",JSON.stringify(this.total)),Z.update("basket",{data:this})},adjustCart:function(t,n){Z.basket.products[t].quantity+=n,Z.basket.products[t].quantity||Z.basket.products.splice(t,1),Z.basket.update()},addToBasket:function(t){var n={name:t.name,price:t.price},a=!1;Z.basket.products.forEach(function(t){t.name===n.name&&(a=!0,t.quantity=t.quantity+1)}),a||(n.quantity=1,Z.basket.products.push(n)),Z.basket.update()}}}),Z.mount({key:"products",render:function(){return Z.products.map(function(t,n){return'\n        <div class="product" onclick=\'Z.update("view", {data:Z.products['.concat(n,"]})'>\n            <h2>").concat(t.name,'</h2>\n            <img src="images/').concat(t.image,'" width="200">\n            <span>').concat(t.price," €</span>\n        </div>\n      ")}).join("")},inner:document.getElementById("products"),data:"json/products.json"}),Z.mount({key:"view",render:function(){return Z.view.name?'\n      <div class="view-modal">\n        <div class="view">\n            <button onclick=\'Z.update("view", {data:{}})\'>close</button>\n            <h3>'.concat(Z.view.name,'</h3>\n            <img src="images/').concat(Z.view.image,'" width="250">\n            <p>').concat(Z.view.price,' €</p>\n            <button onclick="Z.basket.addToBasket(Z.view)">Add To Cart</button>\n        </div>\n      </div>\n      '):""},inner:document.getElementById("view"),data:{}});