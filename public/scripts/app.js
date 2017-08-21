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
		dataType: 'json',
		data: {
			product_type: productType,
			product_brand: productBrand
		}
	}).then(function (res) {
		// console.log(res)
		makeupApp.displayBrands(res);
		makeupApp.filterProductTypes(res);
		makeupApp.filterTags(res);
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

//changing margin-top on aboutWebsite section to account for h1 sliding down and overlapping text on click of hamburger menu button
window.addEventListener('resize', function (event) {
	var win = $(window);
	if (win.width() < 514) {
		console.log('resized');
		//$('aboutWebsite').addClass('mobile');
		document.getElementById('aboutWebsite').style.marginTop = '400px';
	} else {
		document.getElementById('aboutWebsite').style.marginTop = '100px';
	}
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
4. need to figure out how to connect the functions. right now i can filter but only if if statements meet one condition. ie. for example, if user input = selectedbrand AND selected producttype AND certain ingredient factor, display relative content
6. why does it take a bit for data to be pulled? should be present right on page load
*/

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJkZXYvc2NyaXB0cy9hcHAuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxJQUFNLFlBQVksRUFBbEI7O0FBRUEsVUFBVSxJQUFWLEdBQWlCLFlBQVc7QUFDM0IsV0FBVSxTQUFWO0FBQ0EsQ0FGRDs7QUFJQSxVQUFVLFNBQVYsR0FBc0IsVUFBUyxXQUFULEVBQXNCLFlBQXRCLEVBQW1DO0FBQ3hELEdBQUUsSUFBRixDQUFPO0FBQ0wsT0FBSyx1REFEQTtBQUVMLFVBQVEsS0FGSDtBQUdMLFlBQVUsTUFITDtBQUlMLFFBQU07QUFDTCxpQkFBYyxXQURUO0FBRUwsa0JBQWU7QUFGVjtBQUpELEVBQVAsRUFRRyxJQVJILENBUVEsVUFBUyxHQUFULEVBQWM7QUFDckI7QUFDQSxZQUFVLGFBQVYsQ0FBd0IsR0FBeEI7QUFDQSxZQUFVLGtCQUFWLENBQTZCLEdBQTdCO0FBQ0EsWUFBVSxVQUFWLENBQXFCLEdBQXJCO0FBQ0EsRUFiRDtBQWNBLENBZkQ7O0FBaUJBO0FBQ0EsVUFBVSxhQUFWLEdBQTBCLFVBQVMsUUFBVCxFQUFtQjtBQUN6QztBQUNBLEdBQUUsc0JBQUYsRUFBMEIsS0FBMUIsQ0FBZ0MsUUFBaEMsRUFBMEMsWUFBVztBQUNwRCxJQUFFLGtCQUFGLEVBQXNCLEtBQXRCO0FBQ0csTUFBSSxnQkFBZ0IsRUFBRSwyQkFBRixFQUErQixHQUEvQixFQUFwQjtBQUNBLE1BQU0sZUFBZSxTQUFTLE1BQVQsQ0FBZ0IsVUFBUyxPQUFULEVBQWtCO0FBQ25ELFVBQU8sUUFBUSxLQUFSLEtBQWtCLGFBQXpCO0FBQ0gsR0FGb0IsQ0FBckI7QUFHQTtBQUNBLE9BQUssSUFBSSxJQUFJLENBQWIsRUFBZ0IsSUFBSSxhQUFhLE1BQWpDLEVBQXlDLEdBQXpDLEVBQThDO0FBQ2hELFdBQVEsR0FBUixDQUFZLGFBQWEsQ0FB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QVQsQ0FBd0IsYUFBeEIsRUFBdUMsZ0JBQXZDLENBQXdELE9BQXhELEVBQWlFLFlBQVc7QUFDM0UsU0FBUSxHQUFSLENBQVksSUFBWjtBQUNBLFVBQVMsTUFBVDtBQUNBLFFBQU8sUUFBUCxDQUFnQixDQUFoQixFQUFtQixDQUFuQjtBQUNBLENBSkQ7O0FBTUE7QUFDQSxFQUFFLG1CQUFGLEVBQXVCLEtBQXZCLENBQTZCLFlBQVc7QUFDcEMsR0FBRSxZQUFGLEVBQWdCLE9BQWhCLENBQXdCO0FBQ3BCLGFBQVcsRUFBRSxrQkFBRixFQUFzQixNQUF0QixHQUErQjtBQUR0QixFQUF4QixFQUVHLElBRkg7QUFHSCxDQUpEOztBQU1BLEVBQUUsWUFBVTtBQUNYLFdBQVUsSUFBVjtBQUNBLENBRkQ7O0FBSUEiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiLy9vbiBwYWdlIGxvYWQsIGRpc3BsYXkgbmF2IGJhciB3aXRoIGFsbCBicmFuZHNcbi8vaWYgdXNlciBjbGlja3Mgb24gY2VydGFpbiBicmFuZCwgYnJpbmcgdXAgYWxsIG9mIHRoYXQgYnJhbmRzIG1ha2V1cFxuLy9hbHNvIGJyaW5nIHVwIG5ldyBuYXYgYmFyIHdpdGggdGhlIGRpZmZlcmVudCBwcm9kdWN0IHR5cGVzXG4vL2lmIHVzZXIgY2xpY2tzIG9uIGNlcnRhaW4gcHJvZHVjdCB0eXBlLCBkaXNwbGF5IG9ubHkgdGhhdCBwcm9kdWN0IGJyYW5kIGFuZCB0eXBlXG4vL2Fsc28gbm93IGRpc3BsYXkgbmV3IG5hdiBiYXIgd2l0aCBwcm9kdWN0IHRhZ3MgKGllLiB2ZWdhbiwgZ2x1dGVuIGZyZWUsIGV0Yylcbi8vaWYgdXNlciBjbGlja3Mgb24gYSBjZXJ0YWluIHRhZywgZGlzcGxheSBvbmx5IHRoYXQgYnJhbmRzIHByb2R1Y3QgdHlwZSB0aGF0IGZpdHMgdGhhdCB0YWdcblxuY29uc3QgbWFrZXVwQXBwID0ge31cblxubWFrZXVwQXBwLmluaXQgPSBmdW5jdGlvbigpIHtcblx0bWFrZXVwQXBwLmdldE1ha2V1cCgpO1xufVxuXG5tYWtldXBBcHAuZ2V0TWFrZXVwID0gZnVuY3Rpb24ocHJvZHVjdFR5cGUsIHByb2R1Y3RCcmFuZCl7XG5cdCQuYWpheCh7XG5cdCAgdXJsOiAnaHR0cHM6Ly9tYWtldXAtYXBpLmhlcm9rdWFwcC5jb20vYXBpL3YxL3Byb2R1Y3RzLmpzb24nLFxuXHQgIG1ldGhvZDogJ0dFVCcsXG5cdCAgZGF0YVR5cGU6ICdqc29uJyxcblx0ICBkYXRhOiB7XG5cdCAgXHRwcm9kdWN0X3R5cGU6IHByb2R1Y3RUeXBlLFxuXHQgIFx0cHJvZHVjdF9icmFuZDogcHJvZHVjdEJyYW5kXG5cdCAgfVxuXHR9KS50aGVuKGZ1bmN0aW9uKHJlcykge1xuXHRcdC8vIGNvbnNvbGUubG9nKHJlcylcblx0XHRtYWtldXBBcHAuZGlzcGxheUJyYW5kcyhyZXMpO1xuXHRcdG1ha2V1cEFwcC5maWx0ZXJQcm9kdWN0VHlwZXMocmVzKTtcblx0XHRtYWtldXBBcHAuZmlsdGVyVGFncyhyZXMpO1xuXHR9KTtcbn07XG5cbi8vaWYgdXNlciBjbGlja3Mgb24gY2VydGFpbiBicmFuZCwgYXBwZW5kIG5hbWUgb2YgdGhhdCBicmFuZCB0byBwYWdlIGFuZCBhbGwgb2YgdGhlIHJlbGF0ZWQgbWFrZXVwXG5tYWtldXBBcHAuZGlzcGxheUJyYW5kcyA9IGZ1bmN0aW9uKHByb2R1Y3RzKSB7XG4gICAgLy9jb25zb2xlLmxvZyhwcm9kdWN0cylcbiAgICAkKCcubWFrZXVwLWJyYW5kLWJ1dHRvbicpLmNsaWNrKHByb2R1Y3RzLCBmdW5jdGlvbigpIHtcbiAgICBcdCQoJyNtYWtldXBDb250YWluZXInKS5lbXB0eSgpO1xuICAgICAgICBsZXQgYnJhbmRTZWxlY3RlZCA9ICQoJ2lucHV0W25hbWU9YnJhbmRdOmNoZWNrZWQnKS52YWwoKTtcbiAgICAgICAgY29uc3QgZmlsdGVyQnJhbmRzID0gcHJvZHVjdHMuZmlsdGVyKGZ1bmN0aW9uKHByb2R1Y3QpIHtcbiAgICAgICAgICAgIHJldHVybiBwcm9kdWN0LmJyYW5kID09PSBicmFuZFNlbGVjdGVkO1xuICAgICAgICB9KVxuICAgICAgICAvL2NvbnNvbGUubG9nKGZpbHRlckJyYW5kcyk7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZmlsdGVyQnJhbmRzLmxlbmd0aDsgaSsrKSB7XG4gICAgXHRcdGNvbnNvbGUubG9nKGZpbHRlckJyYW5kc1tpXSk7XG4gICAgXHRcdCQoJyNtYWtldXBDb250YWluZXInKS5hcHBlbmQoYFxuICAgIFx0XHRcdDxkaXYgY2xhc3M9XCJtYWtldXBJbmZvXCI+XG4gICAgXHRcdFx0XHQ8aDI+JHtmaWx0ZXJCcmFuZHNbaV0uYnJhbmR9PC9oMj4gXG4gICAgXHRcdFx0XHQ8aDM+JHtmaWx0ZXJCcmFuZHNbaV0ubmFtZX08L2gzPiBcbiAgICBcdFx0XHRcdDxkaXY+PGltZyBzcmM9XCIke2ZpbHRlckJyYW5kc1tpXS5pbWFnZV9saW5rfVwiIGFsdD1cIlwiIC8+PC9kaXY+XG4gICAgXHRcdFx0XHQ8cCBjbGFzcz1cInRhZ3NcIj5GZWF0dXJlczogJHtmaWx0ZXJCcmFuZHNbaV0udGFnX2xpc3R9PC9wPlxuICAgIFx0XHRcdFx0PGEgaHJlZj1cIiR7ZmlsdGVyQnJhbmRzW2ldLnByb2R1Y3RfbGlua31cIiB0YXJnZXQ9XCJfYmxhbmtcIiBjbGFzcz1cInBpbmtUZXh0XCI+UHJvZHVjdCB1cmw8L2E+XG4gICAgXHRcdFx0XHQ8cD4ke2ZpbHRlckJyYW5kc1tpXS5kZXNjcmlwdGlvbn08L3A+XG4gICAgXHRcdFx0PC9kaXY+YClcblx0XHR9XG5cdFx0bWFrZXVwQXBwLmZpbHRlclByb2R1Y3RUeXBlcyhwcm9kdWN0cyk7XG5cdFx0bWFrZXVwQXBwLmZpbHRlclRhZ3MocHJvZHVjdHMpO1xuICAgIH0pXG59IFxuXG5tYWtldXBBcHAuZmlsdGVyUHJvZHVjdFR5cGVzID0gZnVuY3Rpb24ocHJvZHVjdHMpIHtcblx0JCgnLnByb2R1Y3QtdHlwZScpLmNsaWNrKHByb2R1Y3RzLCBmdW5jdGlvbigpIHtcblx0XHQkKCcjbWFrZXVwQ29udGFpbmVyJykuZW1wdHkoKTtcblx0XHRsZXQgcHJvZHVjdFR5cGVTZWxlY3RlZCA9ICQoJ2lucHV0W25hbWU9dHlwZV06Y2hlY2tlZCcpLnZhbCgpO1xuXHRcdGNvbnNvbGUubG9nKHByb2R1Y3RUeXBlU2VsZWN0ZWQpO1xuXHRcdGNvbnN0IGZpbHRlclByb2R1Y3RzID0gcHJvZHVjdHMuZmlsdGVyKGZ1bmN0aW9uKHByb2R1Y3QpIHtcblx0XHRcdHJldHVybiBwcm9kdWN0LnByb2R1Y3RfdHlwZSA9PT0gcHJvZHVjdFR5cGVTZWxlY3RlZDtcblx0XHR9KVxuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgZmlsdGVyUHJvZHVjdHMubGVuZ3RoOyBpKyspIHtcblx0XHRcdCQoJyNtYWtldXBDb250YWluZXInKS5hcHBlbmQoYFxuXHRcdFx0XHQ8ZGl2IGNsYXNzPVwibWFrZXVwSW5mb1wiPlxuXHRcdFx0XHRcdDxoMj4ke2ZpbHRlclByb2R1Y3RzW2ldLmJyYW5kfTwvaDI+XG5cdFx0XHRcdFx0PGgzPiR7ZmlsdGVyUHJvZHVjdHNbaV0ubmFtZX08L2gzPiBcbiAgICBcdFx0XHRcdDxkaXY+PGltZyBzcmM9XCIke2ZpbHRlclByb2R1Y3RzW2ldLmltYWdlX2xpbmt9XCIgYWx0PVwiXCIgLz48L2Rpdj5cbiAgICBcdFx0XHRcdDxwIGNsYXNzPVwidGFnc1wiPkZlYXR1cmVzOiAke2ZpbHRlclByb2R1Y3RzW2ldLnRhZ19saXN0fTwvcD5cbiAgICBcdFx0XHRcdDxhIGhyZWY9XCIke2ZpbHRlclByb2R1Y3RzW2ldLnByb2R1Y3RfbGlua31cIiB0YXJnZXQ9XCJfYmxhbmtcIiBjbGFzcz1cInBpbmtUZXh0XCI+UHJvZHVjdCB1cmw8L2E+XG4gICAgXHRcdFx0XHQ8cD4ke2ZpbHRlclByb2R1Y3RzW2ldLmRlc2NyaXB0aW9ufTwvcD5cblx0XHRcdFx0PC9kaXY+YClcblx0XHR9XG5cdH0pXG59XG5cbm1ha2V1cEFwcC5maWx0ZXJUYWdzID0gZnVuY3Rpb24ocHJvZHVjdHMpIHtcblx0Ly9jb25zb2xlLmxvZyhwcm9kdWN0cyk7XG5cdCQoJy5tYWtldXAtYWpheC1idXR0b24nKS5jbGljayhwcm9kdWN0cywgZnVuY3Rpb24oKSB7XG5cdFx0JCgnI21ha2V1cENvbnRhaW5lcicpLmVtcHR5KCk7XG5cdFx0bGV0IHRhZ1NlbGVjdGVkID0gJCgnaW5wdXRbbmFtZT10YWddOmNoZWNrZWQnKS52YWwoKTtcblx0XHRsZXQgYnJhbmRTZWxlY3RlZCA9ICQoJ2lucHV0W25hbWU9YnJhbmRdOmNoZWNrZWQnKS52YWwoKTtcblx0XHRjb25zdCBmaWx0ZXJUYWdzID0gcHJvZHVjdHMuZmlsdGVyKGZ1bmN0aW9uKHByb2R1Y3QpIHtcblx0XHRcdHJldHVybiBwcm9kdWN0LnRhZ19saXN0ID09IHRhZ1NlbGVjdGVkO1xuXHRcdH0pXG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBmaWx0ZXJUYWdzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHQkKCcjbWFrZXVwQ29udGFpbmVyJykuYXBwZW5kKGBcblx0XHRcdFx0PGRpdiBjbGFzcz1cIm1ha2V1cEluZm9cIj5cblx0XHRcdFx0XHQ8aDI+JHtmaWx0ZXJUYWdzW2ldLm5hbWV9PC9oMj4gXG5cdFx0XHRcdFx0PGgzPiR7ZmlsdGVyVGFnc1tpXS5uYW1lfTwvaDM+IFxuXHRcdFx0XHRcdDxkaXY+PGltZyBzcmM9XCIke2ZpbHRlclRhZ3NbaV0uaW1hZ2VfbGlua31cIiBhbHQ9XCJcIiAvPjwvZGl2PlxuXHRcdFx0XHRcdDxwIGNsYXNzPVwidGFnc1wiPkZlYXR1cmVzOiAke2ZpbHRlclRhZ3NbaV0udGFnX2xpc3R9PC9wPlxuXHRcdFx0XHRcdDxhIGhyZWY9XCIke2ZpbHRlclRhZ3NbaV0ucHJvZHVjdF9saW5rfVwiIHRhcmdldD1cIl9ibGFua1wiIGNsYXNzPVwicGlua1RleHRcIj5Qcm9kdWN0IHVybDwvYT5cbiAgICBcdFx0XHRcdDxwPiR7ZmlsdGVyVGFnc1tpXS5kZXNjcmlwdGlvbn08L3A+XG5cdFx0XHRcdDwvZGl2PmApO1xuXHRcdH1cblx0fSlcbn1cblxuLy9jaGFuZ2luZyBtYXJnaW4tdG9wIG9uIGFib3V0V2Vic2l0ZSBzZWN0aW9uIHRvIGFjY291bnQgZm9yIGgxIHNsaWRpbmcgZG93biBhbmQgb3ZlcmxhcHBpbmcgdGV4dCBvbiBjbGljayBvZiBoYW1idXJnZXIgbWVudSBidXR0b25cbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCBmdW5jdGlvbihldmVudCl7XG4gIHZhciB3aW4gPSAkKHdpbmRvdyk7XG4gICAgICBpZiAod2luLndpZHRoKCkgPCA1MTQpIHsgXG4gICAgICBjb25zb2xlLmxvZygncmVzaXplZCcpO1xuICAgICAgLy8kKCdhYm91dFdlYnNpdGUnKS5hZGRDbGFzcygnbW9iaWxlJyk7XG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYWJvdXRXZWJzaXRlJykuc3R5bGUubWFyZ2luVG9wID0gJzQwMHB4JzsgXG4gICAgICAgfVxuICAgIGVsc2VcbiAgICB7XG4gICAgXHRkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYWJvdXRXZWJzaXRlJykuc3R5bGUubWFyZ2luVG9wID0gJzEwMHB4JztcbiAgICB9XG59KTtcblxuXG4vL3JlbG9hZCBwYWdlIFxuZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3JlZnJlc2hQYWdlJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbigpIHtcblx0Y29uc29sZS5sb2coJ2hpJyk7XG5cdGxvY2F0aW9uLnJlbG9hZCgpO1xuXHR3aW5kb3cuc2Nyb2xsVG8oMCwgMCk7XG59KVxuXG4vL3Ntb290aCBzY3JvbGxcbiQoJ2lucHV0W3R5cGU9cmFkaW9dJykuY2xpY2soZnVuY3Rpb24oKSB7XG4gICAgJCgnaHRtbCwgYm9keScpLmFuaW1hdGUoe1xuICAgICAgICBzY3JvbGxUb3A6ICQoJyNtYWtldXBDb250YWluZXInKS5vZmZzZXQoKS50b3BcbiAgICB9LCAxMDAwKTtcbn0pO1xuXG4kKGZ1bmN0aW9uKCl7XG5cdG1ha2V1cEFwcC5pbml0KCk7XG59KTtcblxuLypQcm9ibGVtcyB0byBhZGRyZXNzXG40LiBuZWVkIHRvIGZpZ3VyZSBvdXQgaG93IHRvIGNvbm5lY3QgdGhlIGZ1bmN0aW9ucy4gcmlnaHQgbm93IGkgY2FuIGZpbHRlciBidXQgb25seSBpZiBpZiBzdGF0ZW1lbnRzIG1lZXQgb25lIGNvbmRpdGlvbi4gaWUuIGZvciBleGFtcGxlLCBpZiB1c2VyIGlucHV0ID0gc2VsZWN0ZWRicmFuZCBBTkQgc2VsZWN0ZWQgcHJvZHVjdHR5cGUgQU5EIGNlcnRhaW4gaW5ncmVkaWVudCBmYWN0b3IsIGRpc3BsYXkgcmVsYXRpdmUgY29udGVudFxuNi4gd2h5IGRvZXMgaXQgdGFrZSBhIGJpdCBmb3IgZGF0YSB0byBiZSBwdWxsZWQ/IHNob3VsZCBiZSBwcmVzZW50IHJpZ2h0IG9uIHBhZ2UgbG9hZFxuKi9cblxuXG4gXG4iXX0=
