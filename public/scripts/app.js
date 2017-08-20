(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

//on page load, display nav bar with all brands
//if user clicks on certain brand, bring up all of that brands makeup
//also bring up new nav bar with the different product types
//if user clicks on certain product type, display only that product brand and type
//also now display new nav bar with product tags (ie. vegan, gluten free, etc)
//if user clicks on a certain tag, display only that brands product type that fits that tag

var makeupApp = {};

makeupApp.init = function () {
	makeupApp.getMakeup();
};

makeupApp.getMakeup = function (productType, productBrand) {
	$.ajax({
		url: 'http://makeup-api.herokuapp.com/api/v1/products.json',
		method: 'GET',
		dataType: 'json',
		data: {
			product_type: productType,
			product_brand: productBrand
		}
	}).then(function (res) {
		// console.log(res)
		makeupApp.displayBrands(res);
	});
};

//if user clicks on certain brand, append name of that brand to page and all of the related makeup
makeupApp.displayBrands = function (products) {
	//console.log(products)
	$('.makeup-brand-button').click(products, function () {
		$('#makeupContainer').empty();
		var brandSelected = $('input[name=brand]:checked').val();
		var filterBrands = products.filter(function (product) {
			return product.brand === brandSelected;
		});
		//console.log(filterBrands);
		for (var i = 0; i < filterBrands.length; i++) {
			console.log(filterBrands[i]);
			$('#makeupContainer').append('\n    \t\t\t<div class="makeupInfo">\n    \t\t\t\t<h2>' + filterBrands[i].brand + '</h2> \n    \t\t\t\t<h3>' + filterBrands[i].name + '</h3> \n    \t\t\t\t<div><img src="' + filterBrands[i].image_link + '" alt="" /></div>\n    \t\t\t\t<p class="tags">Features: ' + filterBrands[i].tag_list + '</p>\n    \t\t\t\t<a href="' + filterBrands[i].product_link + '" target="_blank" class="pinkText">Product url</a>\n    \t\t\t\t<p>' + filterBrands[i].description + '</p>\n    \t\t\t</div>');
		}
		makeupApp.filterProductTypes(products);
		makeupApp.filterTags(products);
	});
};

makeupApp.filterProductTypes = function (products) {
	$('.product-type').click(products, function () {
		$('#makeupContainer').empty();
		var productTypeSelected = $('input[name=type]:checked').val();
		console.log(productTypeSelected);
		var filterProducts = products.filter(function (product) {
			return product.product_type === productTypeSelected;
		});
		for (var i = 0; i < filterProducts.length; i++) {
			$('#makeupContainer').append('\n\t\t\t\t<div class="makeupInfo">\n\t\t\t\t\t<h2>' + filterProducts[i].brand + '</h2>\n\t\t\t\t\t<h3>' + filterProducts[i].name + '</h3> \n    \t\t\t\t<div><img src="' + filterProducts[i].image_link + '" alt="" /></div>\n    \t\t\t\t<p class="tags">Features: ' + filterProducts[i].tag_list + '</p>\n    \t\t\t\t<a href="' + filterProducts[i].product_link + '" target="_blank" class="pinkText">Product url</a>\n    \t\t\t\t<p>' + filterProducts[i].description + '</p>\n\t\t\t\t</div>');
		}
	});
};

makeupApp.filterTags = function (products) {
	//console.log(products);
	$('.makeup-ajax-button').click(products, function () {
		$('#makeupContainer').empty();
		var tagSelected = $('input[name=tag]:checked').val();
		var brandSelected = $('input[name=brand]:checked').val();
		var filterTags = products.filter(function (product) {
			return product.tag_list == tagSelected;
		});
		for (var i = 0; i < filterTags.length; i++) {
			$('#makeupContainer').append('\n\t\t\t\t<div class="makeupInfo">\n\t\t\t\t\t<h2>' + filterTags[i].name + '</h2> \n\t\t\t\t\t<h3>' + filterTags[i].name + '</h3> \n\t\t\t\t\t<div><img src="' + filterTags[i].image_link + '" alt="" /></div>\n\t\t\t\t\t<p class="tags">Features: ' + filterTags[i].tag_list + '</p>\n\t\t\t\t\t<a href="' + filterTags[i].product_link + '" target="_blank" class="pinkText">Product url</a>\n    \t\t\t\t<p>' + filterTags[i].description + '</p>\n\t\t\t\t</div>');
		}
	});
};

//remove h1 from DOM once menu button is pressed to avoid overlap
document.getElementById('menuButton').addEventListener('click', function () {
	document.getElementById('title').style.display = 'none';
});

//reload page 
document.getElementById('refreshPage').addEventListener('click', function () {
	console.log('hi');
	location.reload();
	window.scrollTo(0, 0);
});

//smooth scroll
$('input[type=radio]').click(function () {
	$('html, body').animate({
		scrollTop: $('#makeupContainer').offset().top
	}, 1000);
});

$(function () {
	makeupApp.init();
});

/*Problems to address
1. hide h1 on click of main menu button, unhide on second click
4. need to figure out how to connect the functions. right now i can filter but only if if statements meet one condition. ie. for example, if user input = selectedbrand AND selected producttype AND certain ingredient factor, display relative content
5. producttype and producttag functions only fire if you click on productbrand function first - don't want this
6. why does it take a bit for data to be pulled? should be present right on page load
*/

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJkZXYvc2NyaXB0cy9hcHAuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxJQUFNLFlBQVksRUFBbEI7O0FBRUEsVUFBVSxJQUFWLEdBQWlCLFlBQVc7QUFDM0IsV0FBVSxTQUFWO0FBQ0EsQ0FGRDs7QUFJQSxVQUFVLFNBQVYsR0FBc0IsVUFBUyxXQUFULEVBQXNCLFlBQXRCLEVBQW1DO0FBQ3hELEdBQUUsSUFBRixDQUFPO0FBQ0wsT0FBSyxzREFEQTtBQUVMLFVBQVEsS0FGSDtBQUdMLFlBQVUsTUFITDtBQUlMLFFBQU07QUFDTCxpQkFBYyxXQURUO0FBRUwsa0JBQWU7QUFGVjtBQUpELEVBQVAsRUFRRyxJQVJILENBUVEsVUFBUyxHQUFULEVBQWM7QUFDckI7QUFDQSxZQUFVLGFBQVYsQ0FBd0IsR0FBeEI7QUFDQSxFQVhEO0FBWUEsQ0FiRDs7QUFlQTtBQUNBLFVBQVUsYUFBVixHQUEwQixVQUFTLFFBQVQsRUFBbUI7QUFDekM7QUFDQSxHQUFFLHNCQUFGLEVBQTBCLEtBQTFCLENBQWdDLFFBQWhDLEVBQTBDLFlBQVc7QUFDcEQsSUFBRSxrQkFBRixFQUFzQixLQUF0QjtBQUNHLE1BQUksZ0JBQWdCLEVBQUUsMkJBQUYsRUFBK0IsR0FBL0IsRUFBcEI7QUFDQSxNQUFNLGVBQWUsU0FBUyxNQUFULENBQWdCLFVBQVMsT0FBVCxFQUFrQjtBQUNuRCxVQUFPLFFBQVEsS0FBUixLQUFrQixhQUF6QjtBQUNILEdBRm9CLENBQXJCO0FBR0E7QUFDQSxPQUFLLElBQUksSUFBSSxDQUFiLEVBQWdCLElBQUksYUFBYSxNQUFqQyxFQUF5QyxHQUF6QyxFQUE4QztBQUNoRCxXQUFRLEdBQVIsQ0FBWSxhQUFhLENBQWIsQ0FBWjtBQUNBLEtBQUUsa0JBQUYsRUFBc0IsTUFBdEIsNERBRVEsYUFBYSxDQUFiLEVBQWdC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cEIsYUFBVyxFQUFFLGtCQUFGLEVBQXNCLE1BQXRCLEdBQStCO0FBRHRCLEVBQXhCLEVBRUcsSUFGSDtBQUdILENBSkQ7O0FBTUEsRUFBRSxZQUFVO0FBQ1gsV0FBVSxJQUFWO0FBQ0EsQ0FGRDs7QUFJQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIvL29uIHBhZ2UgbG9hZCwgZGlzcGxheSBuYXYgYmFyIHdpdGggYWxsIGJyYW5kc1xuLy9pZiB1c2VyIGNsaWNrcyBvbiBjZXJ0YWluIGJyYW5kLCBicmluZyB1cCBhbGwgb2YgdGhhdCBicmFuZHMgbWFrZXVwXG4vL2Fsc28gYnJpbmcgdXAgbmV3IG5hdiBiYXIgd2l0aCB0aGUgZGlmZmVyZW50IHByb2R1Y3QgdHlwZXNcbi8vaWYgdXNlciBjbGlja3Mgb24gY2VydGFpbiBwcm9kdWN0IHR5cGUsIGRpc3BsYXkgb25seSB0aGF0IHByb2R1Y3QgYnJhbmQgYW5kIHR5cGVcbi8vYWxzbyBub3cgZGlzcGxheSBuZXcgbmF2IGJhciB3aXRoIHByb2R1Y3QgdGFncyAoaWUuIHZlZ2FuLCBnbHV0ZW4gZnJlZSwgZXRjKVxuLy9pZiB1c2VyIGNsaWNrcyBvbiBhIGNlcnRhaW4gdGFnLCBkaXNwbGF5IG9ubHkgdGhhdCBicmFuZHMgcHJvZHVjdCB0eXBlIHRoYXQgZml0cyB0aGF0IHRhZ1xuXG5jb25zdCBtYWtldXBBcHAgPSB7fVxuXG5tYWtldXBBcHAuaW5pdCA9IGZ1bmN0aW9uKCkge1xuXHRtYWtldXBBcHAuZ2V0TWFrZXVwKCk7XG59XG5cbm1ha2V1cEFwcC5nZXRNYWtldXAgPSBmdW5jdGlvbihwcm9kdWN0VHlwZSwgcHJvZHVjdEJyYW5kKXtcblx0JC5hamF4KHtcblx0ICB1cmw6ICdodHRwOi8vbWFrZXVwLWFwaS5oZXJva3VhcHAuY29tL2FwaS92MS9wcm9kdWN0cy5qc29uJyxcblx0ICBtZXRob2Q6ICdHRVQnLFxuXHQgIGRhdGFUeXBlOiAnanNvbicsXG5cdCAgZGF0YToge1xuXHQgIFx0cHJvZHVjdF90eXBlOiBwcm9kdWN0VHlwZSxcblx0ICBcdHByb2R1Y3RfYnJhbmQ6IHByb2R1Y3RCcmFuZFxuXHQgIH1cblx0fSkudGhlbihmdW5jdGlvbihyZXMpIHtcblx0XHQvLyBjb25zb2xlLmxvZyhyZXMpXG5cdFx0bWFrZXVwQXBwLmRpc3BsYXlCcmFuZHMocmVzKTtcblx0fSk7XG59O1xuXG4vL2lmIHVzZXIgY2xpY2tzIG9uIGNlcnRhaW4gYnJhbmQsIGFwcGVuZCBuYW1lIG9mIHRoYXQgYnJhbmQgdG8gcGFnZSBhbmQgYWxsIG9mIHRoZSByZWxhdGVkIG1ha2V1cFxubWFrZXVwQXBwLmRpc3BsYXlCcmFuZHMgPSBmdW5jdGlvbihwcm9kdWN0cykge1xuICAgIC8vY29uc29sZS5sb2cocHJvZHVjdHMpXG4gICAgJCgnLm1ha2V1cC1icmFuZC1idXR0b24nKS5jbGljayhwcm9kdWN0cywgZnVuY3Rpb24oKSB7XG4gICAgXHQkKCcjbWFrZXVwQ29udGFpbmVyJykuZW1wdHkoKTtcbiAgICAgICAgbGV0IGJyYW5kU2VsZWN0ZWQgPSAkKCdpbnB1dFtuYW1lPWJyYW5kXTpjaGVja2VkJykudmFsKCk7XG4gICAgICAgIGNvbnN0IGZpbHRlckJyYW5kcyA9IHByb2R1Y3RzLmZpbHRlcihmdW5jdGlvbihwcm9kdWN0KSB7XG4gICAgICAgICAgICByZXR1cm4gcHJvZHVjdC5icmFuZCA9PT0gYnJhbmRTZWxlY3RlZDtcbiAgICAgICAgfSlcbiAgICAgICAgLy9jb25zb2xlLmxvZyhmaWx0ZXJCcmFuZHMpO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGZpbHRlckJyYW5kcy5sZW5ndGg7IGkrKykge1xuICAgIFx0XHRjb25zb2xlLmxvZyhmaWx0ZXJCcmFuZHNbaV0pO1xuICAgIFx0XHQkKCcjbWFrZXVwQ29udGFpbmVyJykuYXBwZW5kKGBcbiAgICBcdFx0XHQ8ZGl2IGNsYXNzPVwibWFrZXVwSW5mb1wiPlxuICAgIFx0XHRcdFx0PGgyPiR7ZmlsdGVyQnJhbmRzW2ldLmJyYW5kfTwvaDI+IFxuICAgIFx0XHRcdFx0PGgzPiR7ZmlsdGVyQnJhbmRzW2ldLm5hbWV9PC9oMz4gXG4gICAgXHRcdFx0XHQ8ZGl2PjxpbWcgc3JjPVwiJHtmaWx0ZXJCcmFuZHNbaV0uaW1hZ2VfbGlua31cIiBhbHQ9XCJcIiAvPjwvZGl2PlxuICAgIFx0XHRcdFx0PHAgY2xhc3M9XCJ0YWdzXCI+RmVhdHVyZXM6ICR7ZmlsdGVyQnJhbmRzW2ldLnRhZ19saXN0fTwvcD5cbiAgICBcdFx0XHRcdDxhIGhyZWY9XCIke2ZpbHRlckJyYW5kc1tpXS5wcm9kdWN0X2xpbmt9XCIgdGFyZ2V0PVwiX2JsYW5rXCIgY2xhc3M9XCJwaW5rVGV4dFwiPlByb2R1Y3QgdXJsPC9hPlxuICAgIFx0XHRcdFx0PHA+JHtmaWx0ZXJCcmFuZHNbaV0uZGVzY3JpcHRpb259PC9wPlxuICAgIFx0XHRcdDwvZGl2PmApXG5cdFx0fVxuXHRcdG1ha2V1cEFwcC5maWx0ZXJQcm9kdWN0VHlwZXMocHJvZHVjdHMpO1xuXHRcdG1ha2V1cEFwcC5maWx0ZXJUYWdzKHByb2R1Y3RzKTtcbiAgICB9KVxufSBcblxubWFrZXVwQXBwLmZpbHRlclByb2R1Y3RUeXBlcyA9IGZ1bmN0aW9uKHByb2R1Y3RzKSB7XG5cdCQoJy5wcm9kdWN0LXR5cGUnKS5jbGljayhwcm9kdWN0cywgZnVuY3Rpb24oKSB7XG5cdFx0JCgnI21ha2V1cENvbnRhaW5lcicpLmVtcHR5KCk7XG5cdFx0bGV0IHByb2R1Y3RUeXBlU2VsZWN0ZWQgPSAkKCdpbnB1dFtuYW1lPXR5cGVdOmNoZWNrZWQnKS52YWwoKTtcblx0XHRjb25zb2xlLmxvZyhwcm9kdWN0VHlwZVNlbGVjdGVkKTtcblx0XHRjb25zdCBmaWx0ZXJQcm9kdWN0cyA9IHByb2R1Y3RzLmZpbHRlcihmdW5jdGlvbihwcm9kdWN0KSB7XG5cdFx0XHRyZXR1cm4gcHJvZHVjdC5wcm9kdWN0X3R5cGUgPT09IHByb2R1Y3RUeXBlU2VsZWN0ZWQ7XG5cdFx0fSlcblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGZpbHRlclByb2R1Y3RzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHQkKCcjbWFrZXVwQ29udGFpbmVyJykuYXBwZW5kKGBcblx0XHRcdFx0PGRpdiBjbGFzcz1cIm1ha2V1cEluZm9cIj5cblx0XHRcdFx0XHQ8aDI+JHtmaWx0ZXJQcm9kdWN0c1tpXS5icmFuZH08L2gyPlxuXHRcdFx0XHRcdDxoMz4ke2ZpbHRlclByb2R1Y3RzW2ldLm5hbWV9PC9oMz4gXG4gICAgXHRcdFx0XHQ8ZGl2PjxpbWcgc3JjPVwiJHtmaWx0ZXJQcm9kdWN0c1tpXS5pbWFnZV9saW5rfVwiIGFsdD1cIlwiIC8+PC9kaXY+XG4gICAgXHRcdFx0XHQ8cCBjbGFzcz1cInRhZ3NcIj5GZWF0dXJlczogJHtmaWx0ZXJQcm9kdWN0c1tpXS50YWdfbGlzdH08L3A+XG4gICAgXHRcdFx0XHQ8YSBocmVmPVwiJHtmaWx0ZXJQcm9kdWN0c1tpXS5wcm9kdWN0X2xpbmt9XCIgdGFyZ2V0PVwiX2JsYW5rXCIgY2xhc3M9XCJwaW5rVGV4dFwiPlByb2R1Y3QgdXJsPC9hPlxuICAgIFx0XHRcdFx0PHA+JHtmaWx0ZXJQcm9kdWN0c1tpXS5kZXNjcmlwdGlvbn08L3A+XG5cdFx0XHRcdDwvZGl2PmApXG5cdFx0fVxuXHR9KVxufVxuXG5tYWtldXBBcHAuZmlsdGVyVGFncyA9IGZ1bmN0aW9uKHByb2R1Y3RzKSB7XG5cdC8vY29uc29sZS5sb2cocHJvZHVjdHMpO1xuXHQkKCcubWFrZXVwLWFqYXgtYnV0dG9uJykuY2xpY2socHJvZHVjdHMsIGZ1bmN0aW9uKCkge1xuXHRcdCQoJyNtYWtldXBDb250YWluZXInKS5lbXB0eSgpO1xuXHRcdGxldCB0YWdTZWxlY3RlZCA9ICQoJ2lucHV0W25hbWU9dGFnXTpjaGVja2VkJykudmFsKCk7XG5cdFx0bGV0IGJyYW5kU2VsZWN0ZWQgPSAkKCdpbnB1dFtuYW1lPWJyYW5kXTpjaGVja2VkJykudmFsKCk7XG5cdFx0Y29uc3QgZmlsdGVyVGFncyA9IHByb2R1Y3RzLmZpbHRlcihmdW5jdGlvbihwcm9kdWN0KSB7XG5cdFx0XHRyZXR1cm4gcHJvZHVjdC50YWdfbGlzdCA9PSB0YWdTZWxlY3RlZDtcblx0XHR9KVxuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgZmlsdGVyVGFncy5sZW5ndGg7IGkrKykge1xuXHRcdFx0JCgnI21ha2V1cENvbnRhaW5lcicpLmFwcGVuZChgXG5cdFx0XHRcdDxkaXYgY2xhc3M9XCJtYWtldXBJbmZvXCI+XG5cdFx0XHRcdFx0PGgyPiR7ZmlsdGVyVGFnc1tpXS5uYW1lfTwvaDI+IFxuXHRcdFx0XHRcdDxoMz4ke2ZpbHRlclRhZ3NbaV0ubmFtZX08L2gzPiBcblx0XHRcdFx0XHQ8ZGl2PjxpbWcgc3JjPVwiJHtmaWx0ZXJUYWdzW2ldLmltYWdlX2xpbmt9XCIgYWx0PVwiXCIgLz48L2Rpdj5cblx0XHRcdFx0XHQ8cCBjbGFzcz1cInRhZ3NcIj5GZWF0dXJlczogJHtmaWx0ZXJUYWdzW2ldLnRhZ19saXN0fTwvcD5cblx0XHRcdFx0XHQ8YSBocmVmPVwiJHtmaWx0ZXJUYWdzW2ldLnByb2R1Y3RfbGlua31cIiB0YXJnZXQ9XCJfYmxhbmtcIiBjbGFzcz1cInBpbmtUZXh0XCI+UHJvZHVjdCB1cmw8L2E+XG4gICAgXHRcdFx0XHQ8cD4ke2ZpbHRlclRhZ3NbaV0uZGVzY3JpcHRpb259PC9wPlxuXHRcdFx0XHQ8L2Rpdj5gKTtcblx0XHR9XG5cdH0pXG59XG5cbi8vcmVtb3ZlIGgxIGZyb20gRE9NIG9uY2UgbWVudSBidXR0b24gaXMgcHJlc3NlZCB0byBhdm9pZCBvdmVybGFwXG5kb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbWVudUJ1dHRvbicpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG5cdGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0aXRsZScpLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG59KVxuXG5cbi8vcmVsb2FkIHBhZ2UgXG5kb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncmVmcmVzaFBhZ2UnKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuXHRjb25zb2xlLmxvZygnaGknKTtcblx0bG9jYXRpb24ucmVsb2FkKCk7XG5cdHdpbmRvdy5zY3JvbGxUbygwLCAwKTtcbn0pXG5cbi8vc21vb3RoIHNjcm9sbFxuJCgnaW5wdXRbdHlwZT1yYWRpb10nKS5jbGljayhmdW5jdGlvbigpIHtcbiAgICAkKCdodG1sLCBib2R5JykuYW5pbWF0ZSh7XG4gICAgICAgIHNjcm9sbFRvcDogJCgnI21ha2V1cENvbnRhaW5lcicpLm9mZnNldCgpLnRvcFxuICAgIH0sIDEwMDApO1xufSk7XG5cbiQoZnVuY3Rpb24oKXtcblx0bWFrZXVwQXBwLmluaXQoKTtcbn0pO1xuXG4vKlByb2JsZW1zIHRvIGFkZHJlc3NcbjEuIGhpZGUgaDEgb24gY2xpY2sgb2YgbWFpbiBtZW51IGJ1dHRvbiwgdW5oaWRlIG9uIHNlY29uZCBjbGlja1xuNC4gbmVlZCB0byBmaWd1cmUgb3V0IGhvdyB0byBjb25uZWN0IHRoZSBmdW5jdGlvbnMuIHJpZ2h0IG5vdyBpIGNhbiBmaWx0ZXIgYnV0IG9ubHkgaWYgaWYgc3RhdGVtZW50cyBtZWV0IG9uZSBjb25kaXRpb24uIGllLiBmb3IgZXhhbXBsZSwgaWYgdXNlciBpbnB1dCA9IHNlbGVjdGVkYnJhbmQgQU5EIHNlbGVjdGVkIHByb2R1Y3R0eXBlIEFORCBjZXJ0YWluIGluZ3JlZGllbnQgZmFjdG9yLCBkaXNwbGF5IHJlbGF0aXZlIGNvbnRlbnRcbjUuIHByb2R1Y3R0eXBlIGFuZCBwcm9kdWN0dGFnIGZ1bmN0aW9ucyBvbmx5IGZpcmUgaWYgeW91IGNsaWNrIG9uIHByb2R1Y3RicmFuZCBmdW5jdGlvbiBmaXJzdCAtIGRvbid0IHdhbnQgdGhpc1xuNi4gd2h5IGRvZXMgaXQgdGFrZSBhIGJpdCBmb3IgZGF0YSB0byBiZSBwdWxsZWQ/IHNob3VsZCBiZSBwcmVzZW50IHJpZ2h0IG9uIHBhZ2UgbG9hZFxuKi9cblxuXG4gXG4iXX0=
