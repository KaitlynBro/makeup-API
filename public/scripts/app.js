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
		url: 'https://makeup-api.herokuapp.com/api/v1/products.json',
		method: 'GET',
		dataType: 'jsonp',
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJkZXYvc2NyaXB0cy9hcHAuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxJQUFNLFlBQVksRUFBbEI7O0FBRUEsVUFBVSxJQUFWLEdBQWlCLFlBQVc7QUFDM0IsV0FBVSxTQUFWO0FBQ0EsQ0FGRDs7QUFJQSxVQUFVLFNBQVYsR0FBc0IsVUFBUyxXQUFULEVBQXNCLFlBQXRCLEVBQW1DO0FBQ3hELEdBQUUsSUFBRixDQUFPO0FBQ0wsT0FBSyx1REFEQTtBQUVMLFVBQVEsS0FGSDtBQUdMLFlBQVUsT0FITDtBQUlMLFFBQU07QUFDTCxpQkFBYyxXQURUO0FBRUwsa0JBQWU7QUFGVjtBQUpELEVBQVAsRUFRRyxJQVJILENBUVEsVUFBUyxHQUFULEVBQWM7QUFDckI7QUFDQSxZQUFVLGFBQVYsQ0FBd0IsR0FBeEI7QUFDQSxFQVhEO0FBWUEsQ0FiRDs7QUFlQTtBQUNBLFVBQVUsYUFBVixHQUEwQixVQUFTLFFBQVQsRUFBbUI7QUFDekM7QUFDQSxHQUFFLHNCQUFGLEVBQTBCLEtBQTFCLENBQWdDLFFBQWhDLEVBQTBDLFlBQVc7QUFDcEQsSUFBRSxrQkFBRixFQUFzQixLQUF0QjtBQUNHLE1BQUksZ0JBQWdCLEVBQUUsMkJBQUYsRUFBK0IsR0FBL0IsRUFBcEI7QUFDQSxNQUFNLGVBQWUsU0FBUyxNQUFULENBQWdCLFVBQVMsT0FBVCxFQUFrQjtBQUNuRCxVQUFPLFFBQVEsS0FBUixLQUFrQixhQUF6QjtBQUNILEdBRm9CLENBQXJCO0FBR0E7QUFDQSxPQUFLLElBQUksSUFBSSxDQUFiLEVBQWdCLElBQUksYUFBYSxNQUFqQyxFQUF5QyxHQUF6QyxFQUE4QztBQUNoRCxXQUFRLEdBQVIsQ0FBWSxhQUFhLENBQWIsQ0FBWjtBQUNBLEtBQUUsa0JBQUYsRUFBc0IsTUFBdEIsNERBRVEsYUFBYSxDQUFiLEVBQWdC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cEIsYUFBVyxFQUFFLGtCQUFGLEVBQXNCLE1BQXRCLEdBQStCO0FBRHRCLEVBQXhCLEVBRUcsSUFGSDtBQUdILENBSkQ7O0FBTUEsRUFBRSxZQUFVO0FBQ1gsV0FBVSxJQUFWO0FBQ0EsQ0FGRDs7QUFJQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIvL29uIHBhZ2UgbG9hZCwgZGlzcGxheSBuYXYgYmFyIHdpdGggYWxsIGJyYW5kc1xuLy9pZiB1c2VyIGNsaWNrcyBvbiBjZXJ0YWluIGJyYW5kLCBicmluZyB1cCBhbGwgb2YgdGhhdCBicmFuZHMgbWFrZXVwXG4vL2Fsc28gYnJpbmcgdXAgbmV3IG5hdiBiYXIgd2l0aCB0aGUgZGlmZmVyZW50IHByb2R1Y3QgdHlwZXNcbi8vaWYgdXNlciBjbGlja3Mgb24gY2VydGFpbiBwcm9kdWN0IHR5cGUsIGRpc3BsYXkgb25seSB0aGF0IHByb2R1Y3QgYnJhbmQgYW5kIHR5cGVcbi8vYWxzbyBub3cgZGlzcGxheSBuZXcgbmF2IGJhciB3aXRoIHByb2R1Y3QgdGFncyAoaWUuIHZlZ2FuLCBnbHV0ZW4gZnJlZSwgZXRjKVxuLy9pZiB1c2VyIGNsaWNrcyBvbiBhIGNlcnRhaW4gdGFnLCBkaXNwbGF5IG9ubHkgdGhhdCBicmFuZHMgcHJvZHVjdCB0eXBlIHRoYXQgZml0cyB0aGF0IHRhZ1xuXG5jb25zdCBtYWtldXBBcHAgPSB7fVxuXG5tYWtldXBBcHAuaW5pdCA9IGZ1bmN0aW9uKCkge1xuXHRtYWtldXBBcHAuZ2V0TWFrZXVwKCk7XG59XG5cbm1ha2V1cEFwcC5nZXRNYWtldXAgPSBmdW5jdGlvbihwcm9kdWN0VHlwZSwgcHJvZHVjdEJyYW5kKXtcblx0JC5hamF4KHtcblx0ICB1cmw6ICdodHRwczovL21ha2V1cC1hcGkuaGVyb2t1YXBwLmNvbS9hcGkvdjEvcHJvZHVjdHMuanNvbicsXG5cdCAgbWV0aG9kOiAnR0VUJyxcblx0ICBkYXRhVHlwZTogJ2pzb25wJyxcblx0ICBkYXRhOiB7XG5cdCAgXHRwcm9kdWN0X3R5cGU6IHByb2R1Y3RUeXBlLFxuXHQgIFx0cHJvZHVjdF9icmFuZDogcHJvZHVjdEJyYW5kXG5cdCAgfVxuXHR9KS50aGVuKGZ1bmN0aW9uKHJlcykge1xuXHRcdC8vIGNvbnNvbGUubG9nKHJlcylcblx0XHRtYWtldXBBcHAuZGlzcGxheUJyYW5kcyhyZXMpO1xuXHR9KTtcbn07XG5cbi8vaWYgdXNlciBjbGlja3Mgb24gY2VydGFpbiBicmFuZCwgYXBwZW5kIG5hbWUgb2YgdGhhdCBicmFuZCB0byBwYWdlIGFuZCBhbGwgb2YgdGhlIHJlbGF0ZWQgbWFrZXVwXG5tYWtldXBBcHAuZGlzcGxheUJyYW5kcyA9IGZ1bmN0aW9uKHByb2R1Y3RzKSB7XG4gICAgLy9jb25zb2xlLmxvZyhwcm9kdWN0cylcbiAgICAkKCcubWFrZXVwLWJyYW5kLWJ1dHRvbicpLmNsaWNrKHByb2R1Y3RzLCBmdW5jdGlvbigpIHtcbiAgICBcdCQoJyNtYWtldXBDb250YWluZXInKS5lbXB0eSgpO1xuICAgICAgICBsZXQgYnJhbmRTZWxlY3RlZCA9ICQoJ2lucHV0W25hbWU9YnJhbmRdOmNoZWNrZWQnKS52YWwoKTtcbiAgICAgICAgY29uc3QgZmlsdGVyQnJhbmRzID0gcHJvZHVjdHMuZmlsdGVyKGZ1bmN0aW9uKHByb2R1Y3QpIHtcbiAgICAgICAgICAgIHJldHVybiBwcm9kdWN0LmJyYW5kID09PSBicmFuZFNlbGVjdGVkO1xuICAgICAgICB9KVxuICAgICAgICAvL2NvbnNvbGUubG9nKGZpbHRlckJyYW5kcyk7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZmlsdGVyQnJhbmRzLmxlbmd0aDsgaSsrKSB7XG4gICAgXHRcdGNvbnNvbGUubG9nKGZpbHRlckJyYW5kc1tpXSk7XG4gICAgXHRcdCQoJyNtYWtldXBDb250YWluZXInKS5hcHBlbmQoYFxuICAgIFx0XHRcdDxkaXYgY2xhc3M9XCJtYWtldXBJbmZvXCI+XG4gICAgXHRcdFx0XHQ8aDI+JHtmaWx0ZXJCcmFuZHNbaV0uYnJhbmR9PC9oMj4gXG4gICAgXHRcdFx0XHQ8aDM+JHtmaWx0ZXJCcmFuZHNbaV0ubmFtZX08L2gzPiBcbiAgICBcdFx0XHRcdDxkaXY+PGltZyBzcmM9XCIke2ZpbHRlckJyYW5kc1tpXS5pbWFnZV9saW5rfVwiIGFsdD1cIlwiIC8+PC9kaXY+XG4gICAgXHRcdFx0XHQ8cCBjbGFzcz1cInRhZ3NcIj5GZWF0dXJlczogJHtmaWx0ZXJCcmFuZHNbaV0udGFnX2xpc3R9PC9wPlxuICAgIFx0XHRcdFx0PGEgaHJlZj1cIiR7ZmlsdGVyQnJhbmRzW2ldLnByb2R1Y3RfbGlua31cIiB0YXJnZXQ9XCJfYmxhbmtcIiBjbGFzcz1cInBpbmtUZXh0XCI+UHJvZHVjdCB1cmw8L2E+XG4gICAgXHRcdFx0XHQ8cD4ke2ZpbHRlckJyYW5kc1tpXS5kZXNjcmlwdGlvbn08L3A+XG4gICAgXHRcdFx0PC9kaXY+YClcblx0XHR9XG5cdFx0bWFrZXVwQXBwLmZpbHRlclByb2R1Y3RUeXBlcyhwcm9kdWN0cyk7XG5cdFx0bWFrZXVwQXBwLmZpbHRlclRhZ3MocHJvZHVjdHMpO1xuICAgIH0pXG59IFxuXG5tYWtldXBBcHAuZmlsdGVyUHJvZHVjdFR5cGVzID0gZnVuY3Rpb24ocHJvZHVjdHMpIHtcblx0JCgnLnByb2R1Y3QtdHlwZScpLmNsaWNrKHByb2R1Y3RzLCBmdW5jdGlvbigpIHtcblx0XHQkKCcjbWFrZXVwQ29udGFpbmVyJykuZW1wdHkoKTtcblx0XHRsZXQgcHJvZHVjdFR5cGVTZWxlY3RlZCA9ICQoJ2lucHV0W25hbWU9dHlwZV06Y2hlY2tlZCcpLnZhbCgpO1xuXHRcdGNvbnNvbGUubG9nKHByb2R1Y3RUeXBlU2VsZWN0ZWQpO1xuXHRcdGNvbnN0IGZpbHRlclByb2R1Y3RzID0gcHJvZHVjdHMuZmlsdGVyKGZ1bmN0aW9uKHByb2R1Y3QpIHtcblx0XHRcdHJldHVybiBwcm9kdWN0LnByb2R1Y3RfdHlwZSA9PT0gcHJvZHVjdFR5cGVTZWxlY3RlZDtcblx0XHR9KVxuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgZmlsdGVyUHJvZHVjdHMubGVuZ3RoOyBpKyspIHtcblx0XHRcdCQoJyNtYWtldXBDb250YWluZXInKS5hcHBlbmQoYFxuXHRcdFx0XHQ8ZGl2IGNsYXNzPVwibWFrZXVwSW5mb1wiPlxuXHRcdFx0XHRcdDxoMj4ke2ZpbHRlclByb2R1Y3RzW2ldLmJyYW5kfTwvaDI+XG5cdFx0XHRcdFx0PGgzPiR7ZmlsdGVyUHJvZHVjdHNbaV0ubmFtZX08L2gzPiBcbiAgICBcdFx0XHRcdDxkaXY+PGltZyBzcmM9XCIke2ZpbHRlclByb2R1Y3RzW2ldLmltYWdlX2xpbmt9XCIgYWx0PVwiXCIgLz48L2Rpdj5cbiAgICBcdFx0XHRcdDxwIGNsYXNzPVwidGFnc1wiPkZlYXR1cmVzOiAke2ZpbHRlclByb2R1Y3RzW2ldLnRhZ19saXN0fTwvcD5cbiAgICBcdFx0XHRcdDxhIGhyZWY9XCIke2ZpbHRlclByb2R1Y3RzW2ldLnByb2R1Y3RfbGlua31cIiB0YXJnZXQ9XCJfYmxhbmtcIiBjbGFzcz1cInBpbmtUZXh0XCI+UHJvZHVjdCB1cmw8L2E+XG4gICAgXHRcdFx0XHQ8cD4ke2ZpbHRlclByb2R1Y3RzW2ldLmRlc2NyaXB0aW9ufTwvcD5cblx0XHRcdFx0PC9kaXY+YClcblx0XHR9XG5cdH0pXG59XG5cbm1ha2V1cEFwcC5maWx0ZXJUYWdzID0gZnVuY3Rpb24ocHJvZHVjdHMpIHtcblx0Ly9jb25zb2xlLmxvZyhwcm9kdWN0cyk7XG5cdCQoJy5tYWtldXAtYWpheC1idXR0b24nKS5jbGljayhwcm9kdWN0cywgZnVuY3Rpb24oKSB7XG5cdFx0JCgnI21ha2V1cENvbnRhaW5lcicpLmVtcHR5KCk7XG5cdFx0bGV0IHRhZ1NlbGVjdGVkID0gJCgnaW5wdXRbbmFtZT10YWddOmNoZWNrZWQnKS52YWwoKTtcblx0XHRsZXQgYnJhbmRTZWxlY3RlZCA9ICQoJ2lucHV0W25hbWU9YnJhbmRdOmNoZWNrZWQnKS52YWwoKTtcblx0XHRjb25zdCBmaWx0ZXJUYWdzID0gcHJvZHVjdHMuZmlsdGVyKGZ1bmN0aW9uKHByb2R1Y3QpIHtcblx0XHRcdHJldHVybiBwcm9kdWN0LnRhZ19saXN0ID09IHRhZ1NlbGVjdGVkO1xuXHRcdH0pXG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBmaWx0ZXJUYWdzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHQkKCcjbWFrZXVwQ29udGFpbmVyJykuYXBwZW5kKGBcblx0XHRcdFx0PGRpdiBjbGFzcz1cIm1ha2V1cEluZm9cIj5cblx0XHRcdFx0XHQ8aDI+JHtmaWx0ZXJUYWdzW2ldLm5hbWV9PC9oMj4gXG5cdFx0XHRcdFx0PGgzPiR7ZmlsdGVyVGFnc1tpXS5uYW1lfTwvaDM+IFxuXHRcdFx0XHRcdDxkaXY+PGltZyBzcmM9XCIke2ZpbHRlclRhZ3NbaV0uaW1hZ2VfbGlua31cIiBhbHQ9XCJcIiAvPjwvZGl2PlxuXHRcdFx0XHRcdDxwIGNsYXNzPVwidGFnc1wiPkZlYXR1cmVzOiAke2ZpbHRlclRhZ3NbaV0udGFnX2xpc3R9PC9wPlxuXHRcdFx0XHRcdDxhIGhyZWY9XCIke2ZpbHRlclRhZ3NbaV0ucHJvZHVjdF9saW5rfVwiIHRhcmdldD1cIl9ibGFua1wiIGNsYXNzPVwicGlua1RleHRcIj5Qcm9kdWN0IHVybDwvYT5cbiAgICBcdFx0XHRcdDxwPiR7ZmlsdGVyVGFnc1tpXS5kZXNjcmlwdGlvbn08L3A+XG5cdFx0XHRcdDwvZGl2PmApO1xuXHRcdH1cblx0fSlcbn1cblxuLy9yZW1vdmUgaDEgZnJvbSBET00gb25jZSBtZW51IGJ1dHRvbiBpcyBwcmVzc2VkIHRvIGF2b2lkIG92ZXJsYXBcbmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtZW51QnV0dG9uJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbigpIHtcblx0ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RpdGxlJykuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbn0pXG5cblxuLy9yZWxvYWQgcGFnZSBcbmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyZWZyZXNoUGFnZScpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG5cdGNvbnNvbGUubG9nKCdoaScpO1xuXHRsb2NhdGlvbi5yZWxvYWQoKTtcblx0d2luZG93LnNjcm9sbFRvKDAsIDApO1xufSlcblxuLy9zbW9vdGggc2Nyb2xsXG4kKCdpbnB1dFt0eXBlPXJhZGlvXScpLmNsaWNrKGZ1bmN0aW9uKCkge1xuICAgICQoJ2h0bWwsIGJvZHknKS5hbmltYXRlKHtcbiAgICAgICAgc2Nyb2xsVG9wOiAkKCcjbWFrZXVwQ29udGFpbmVyJykub2Zmc2V0KCkudG9wXG4gICAgfSwgMTAwMCk7XG59KTtcblxuJChmdW5jdGlvbigpe1xuXHRtYWtldXBBcHAuaW5pdCgpO1xufSk7XG5cbi8qUHJvYmxlbXMgdG8gYWRkcmVzc1xuMS4gaGlkZSBoMSBvbiBjbGljayBvZiBtYWluIG1lbnUgYnV0dG9uLCB1bmhpZGUgb24gc2Vjb25kIGNsaWNrXG40LiBuZWVkIHRvIGZpZ3VyZSBvdXQgaG93IHRvIGNvbm5lY3QgdGhlIGZ1bmN0aW9ucy4gcmlnaHQgbm93IGkgY2FuIGZpbHRlciBidXQgb25seSBpZiBpZiBzdGF0ZW1lbnRzIG1lZXQgb25lIGNvbmRpdGlvbi4gaWUuIGZvciBleGFtcGxlLCBpZiB1c2VyIGlucHV0ID0gc2VsZWN0ZWRicmFuZCBBTkQgc2VsZWN0ZWQgcHJvZHVjdHR5cGUgQU5EIGNlcnRhaW4gaW5ncmVkaWVudCBmYWN0b3IsIGRpc3BsYXkgcmVsYXRpdmUgY29udGVudFxuNS4gcHJvZHVjdHR5cGUgYW5kIHByb2R1Y3R0YWcgZnVuY3Rpb25zIG9ubHkgZmlyZSBpZiB5b3UgY2xpY2sgb24gcHJvZHVjdGJyYW5kIGZ1bmN0aW9uIGZpcnN0IC0gZG9uJ3Qgd2FudCB0aGlzXG42LiB3aHkgZG9lcyBpdCB0YWtlIGEgYml0IGZvciBkYXRhIHRvIGJlIHB1bGxlZD8gc2hvdWxkIGJlIHByZXNlbnQgcmlnaHQgb24gcGFnZSBsb2FkXG4qL1xuXG5cbiBcbiJdfQ==
