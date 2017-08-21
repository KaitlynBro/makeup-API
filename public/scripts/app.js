(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var makeupApp = {};

//init function that holds the function I want fired on page load
makeupApp.init = function () {
	makeupApp.getMakeup();
};

//ajax request to access makeup API data
makeupApp.getMakeup = function (productType, productBrand) {
	$.ajax({
		url: 'https://makeup-api.herokuapp.com/api/v1/products.json',
		method: 'GET',
		dataType: 'json',
		data: {
			product_type: productType,
			product_brand: productBrand
			//my 3 functions that I want available once ajax request is complete
		} }).then(function (res) {
		makeupApp.displayBrands(res);
		makeupApp.filterProductTypes(res);
		makeupApp.filterTags(res);
	});
};

makeupApp.displayBrands = function (products) {
	//on click of makeup brand radio buttons, access product data
	$('.makeup-brand-button').click(products, function () {
		//empty container to remove existing content
		$('#makeupContainer').empty();
		//store the value of the radio button user clicked on into variable
		var brandSelected = $('input[name=brand]:checked').val();
		//filter through product data, and return the brand that is exactly equal to users input
		var filterBrands = products.filter(function (product) {
			return product.brand === brandSelected;
		});
		//loop over the filtered brands, and for every piece of data that comes back...
		//dynamically create a div that will hold all of the product data, including h2, p tags, images, etc.
		for (var i = 0; i < filterBrands.length; i++) {
			$('#makeupContainer').append('\n    \t\t\t<div class="makeupInfo">\n    \t\t\t\t<h2>' + filterBrands[i].brand + '</h2> \n    \t\t\t\t<h3>' + filterBrands[i].name + '</h3> \n    \t\t\t\t<div><img src="' + filterBrands[i].image_link + '" alt="" /></div>\n    \t\t\t\t<p class="tags">Features: ' + filterBrands[i].tag_list + '</p>\n    \t\t\t\t<a href="' + filterBrands[i].product_link + '" target="_blank" class="pinkText">Product url</a>\n    \t\t\t\t<p>' + filterBrands[i].description + '</p>\n    \t\t\t</div>');
		}
	});
};

makeupApp.filterProductTypes = function (products) {
	//on click of makeup product type radio buttons, access product data
	$('.product-type').click(products, function () {
		//empty container to remove existing content
		$('#makeupContainer').empty();
		//store the value of the radio button user clicked on into variable
		var productTypeSelected = $('input[name=type]:checked').val();
		//filter through product data, and return the product type that is exactly equal to users input
		var filterProducts = products.filter(function (product) {
			return product.product_type === productTypeSelected;
		});
		//loop over the filtered products, and for every piece of data that comes back...
		//dynamically create a div that will hold all of the product data, including h2, p tags, images, etc.
		for (var i = 0; i < filterProducts.length; i++) {
			$('#makeupContainer').append('\n\t\t\t\t<div class="makeupInfo">\n\t\t\t\t\t<h2>' + filterProducts[i].brand + '</h2>\n\t\t\t\t\t<h3>' + filterProducts[i].name + '</h3> \n    \t\t\t\t<div><img src="' + filterProducts[i].image_link + '" alt="" /></div>\n    \t\t\t\t<p class="tags">Features: ' + filterProducts[i].tag_list + '</p>\n    \t\t\t\t<a href="' + filterProducts[i].product_link + '" target="_blank" class="pinkText">Product url</a>\n    \t\t\t\t<p>' + filterProducts[i].description + '</p>\n\t\t\t\t</div>');
		}
	});
};

makeupApp.filterTags = function (products) {
	//on click of makeup product type radio buttons, access product data
	$('.makeup-ajax-button').click(products, function () {
		//empty container to remove existing content
		$('#makeupContainer').empty();
		//store the value of the radio button user clicked on into variable
		var tagSelected = $('input[name=tag]:checked').val();
		//filter through product data, and return the tags that are exactly equal to users input
		var filterTags = products.filter(function (product) {
			return product.tag_list == tagSelected;
		});
		//loop over the filtered tags, and for every piece of data that comes back...
		//dynamically create a div that will hold all of the product data, including h2, p tags, images, etc.
		for (var i = 0; i < filterTags.length; i++) {
			$('#makeupContainer').append('\n\t\t\t\t<div class="makeupInfo">\n\t\t\t\t\t<h2>' + filterTags[i].name + '</h2> \n\t\t\t\t\t<h3>' + filterTags[i].name + '</h3> \n\t\t\t\t\t<div><img src="' + filterTags[i].image_link + '" alt="" /></div>\n\t\t\t\t\t<p class="tags">Features: ' + filterTags[i].tag_list + '</p>\n\t\t\t\t\t<a href="' + filterTags[i].product_link + '" target="_blank" class="pinkText">Product url</a>\n    \t\t\t\t<p>' + filterTags[i].description + '</p>\n\t\t\t\t</div>');
		}
	});
};

//changing margin-top on aboutWebsite section to account for h1 sliding down and overlapping text on click of hamburger menu button
window.addEventListener('resize', function (event) {
	var win = $(window);
	if (win.width() < 514) {
		document.getElementById('aboutWebsite').style.marginTop = '400px';
	} else {
		document.getElementById('aboutWebsite').style.marginTop = '100px';
	}
});

//reload page on click of refresh button
document.getElementById('refreshPage').addEventListener('click', function () {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJkZXYvc2NyaXB0cy9hcHAuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0FBLElBQU0sWUFBWSxFQUFsQjs7QUFFQTtBQUNBLFVBQVUsSUFBVixHQUFpQixZQUFXO0FBQzNCLFdBQVUsU0FBVjtBQUNBLENBRkQ7O0FBSUE7QUFDQSxVQUFVLFNBQVYsR0FBc0IsVUFBUyxXQUFULEVBQXNCLFlBQXRCLEVBQW1DO0FBQ3hELEdBQUUsSUFBRixDQUFPO0FBQ0wsT0FBSyx1REFEQTtBQUVMLFVBQVEsS0FGSDtBQUdMLFlBQVUsTUFITDtBQUlMLFFBQU07QUFDTCxpQkFBYyxXQURUO0FBRUwsa0JBQWU7QUFFaEI7QUFKTSxHQUpELEVBQVAsRUFTRyxJQVRILENBU1EsVUFBUyxHQUFULEVBQWM7QUFDckIsWUFBVSxhQUFWLENBQXdCLEdBQXhCO0FBQ0EsWUFBVSxrQkFBVixDQUE2QixHQUE3QjtBQUNBLFlBQVUsVUFBVixDQUFxQixHQUFyQjtBQUNBLEVBYkQ7QUFjQSxDQWZEOztBQWtCQSxVQUFVLGFBQVYsR0FBMEIsVUFBUyxRQUFULEVBQW1CO0FBQzVDO0FBQ0csR0FBRSxzQkFBRixFQUEwQixLQUExQixDQUFnQyxRQUFoQyxFQUEwQyxZQUFXO0FBQ3BEO0FBQ0EsSUFBRSxrQkFBRixFQUFzQixLQUF0QjtBQUNBO0FBQ0csTUFBSSxnQkFBZ0IsRUFBRSwyQkFBRixFQUErQixHQUEvQixFQUFwQjtBQUNBO0FBQ0EsTUFBTSxlQUFlLFNBQVMsTUFBVCxDQUFnQixVQUFTLE9BQVQsRUFBa0I7QUFDbkQsVUFBTyxRQUFRLEtBQVIsS0FBa0IsYUFBekI7QUFDSCxHQUZvQixDQUFyQjtBQUdBO0FBQ0M7QUFDRCxPQUFLLElBQUksSUFBSSxDQUFiLEVBQWdCLElBQUksYUFBYSxNQUFqQyxFQUF5QyxHQUF6QyxFQUE4QztBQUNoRCxLQUFFLGtCQUFGLEVBQXNCLE1BQXRCLDREQUVR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QixLQUF2QixDQUE2QixZQUFXO0FBQ3BDLEdBQUUsWUFBRixFQUFnQixPQUFoQixDQUF3QjtBQUNwQixhQUFXLEVBQUUsa0JBQUYsRUFBc0IsTUFBdEIsR0FBK0I7QUFEdEIsRUFBeEIsRUFFRyxJQUZIO0FBR0gsQ0FKRDs7QUFNQSxFQUFFLFlBQVU7QUFDWCxXQUFVLElBQVY7QUFDQSxDQUZEOztBQUlBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImNvbnN0IG1ha2V1cEFwcCA9IHt9XG5cbi8vaW5pdCBmdW5jdGlvbiB0aGF0IGhvbGRzIHRoZSBmdW5jdGlvbiBJIHdhbnQgZmlyZWQgb24gcGFnZSBsb2FkXG5tYWtldXBBcHAuaW5pdCA9IGZ1bmN0aW9uKCkge1xuXHRtYWtldXBBcHAuZ2V0TWFrZXVwKCk7XG59XG5cbi8vYWpheCByZXF1ZXN0IHRvIGFjY2VzcyBtYWtldXAgQVBJIGRhdGFcbm1ha2V1cEFwcC5nZXRNYWtldXAgPSBmdW5jdGlvbihwcm9kdWN0VHlwZSwgcHJvZHVjdEJyYW5kKXtcblx0JC5hamF4KHtcblx0ICB1cmw6ICdodHRwczovL21ha2V1cC1hcGkuaGVyb2t1YXBwLmNvbS9hcGkvdjEvcHJvZHVjdHMuanNvbicsXG5cdCAgbWV0aG9kOiAnR0VUJyxcblx0ICBkYXRhVHlwZTogJ2pzb24nLFxuXHQgIGRhdGE6IHtcblx0ICBcdHByb2R1Y3RfdHlwZTogcHJvZHVjdFR5cGUsXG5cdCAgXHRwcm9kdWN0X2JyYW5kOiBwcm9kdWN0QnJhbmRcblx0ICB9XG5cdCAgLy9teSAzIGZ1bmN0aW9ucyB0aGF0IEkgd2FudCBhdmFpbGFibGUgb25jZSBhamF4IHJlcXVlc3QgaXMgY29tcGxldGVcblx0fSkudGhlbihmdW5jdGlvbihyZXMpIHtcblx0XHRtYWtldXBBcHAuZGlzcGxheUJyYW5kcyhyZXMpO1xuXHRcdG1ha2V1cEFwcC5maWx0ZXJQcm9kdWN0VHlwZXMocmVzKTtcblx0XHRtYWtldXBBcHAuZmlsdGVyVGFncyhyZXMpO1xuXHR9KTtcbn07XG5cblxubWFrZXVwQXBwLmRpc3BsYXlCcmFuZHMgPSBmdW5jdGlvbihwcm9kdWN0cykge1xuXHQvL29uIGNsaWNrIG9mIG1ha2V1cCBicmFuZCByYWRpbyBidXR0b25zLCBhY2Nlc3MgcHJvZHVjdCBkYXRhXG4gICAgJCgnLm1ha2V1cC1icmFuZC1idXR0b24nKS5jbGljayhwcm9kdWN0cywgZnVuY3Rpb24oKSB7XG4gICAgXHQvL2VtcHR5IGNvbnRhaW5lciB0byByZW1vdmUgZXhpc3RpbmcgY29udGVudFxuICAgIFx0JCgnI21ha2V1cENvbnRhaW5lcicpLmVtcHR5KCk7XG4gICAgXHQvL3N0b3JlIHRoZSB2YWx1ZSBvZiB0aGUgcmFkaW8gYnV0dG9uIHVzZXIgY2xpY2tlZCBvbiBpbnRvIHZhcmlhYmxlXG4gICAgICAgIGxldCBicmFuZFNlbGVjdGVkID0gJCgnaW5wdXRbbmFtZT1icmFuZF06Y2hlY2tlZCcpLnZhbCgpO1xuICAgICAgICAvL2ZpbHRlciB0aHJvdWdoIHByb2R1Y3QgZGF0YSwgYW5kIHJldHVybiB0aGUgYnJhbmQgdGhhdCBpcyBleGFjdGx5IGVxdWFsIHRvIHVzZXJzIGlucHV0XG4gICAgICAgIGNvbnN0IGZpbHRlckJyYW5kcyA9IHByb2R1Y3RzLmZpbHRlcihmdW5jdGlvbihwcm9kdWN0KSB7XG4gICAgICAgICAgICByZXR1cm4gcHJvZHVjdC5icmFuZCA9PT0gYnJhbmRTZWxlY3RlZDtcbiAgICAgICAgfSlcbiAgICAgICAgLy9sb29wIG92ZXIgdGhlIGZpbHRlcmVkIGJyYW5kcywgYW5kIGZvciBldmVyeSBwaWVjZSBvZiBkYXRhIHRoYXQgY29tZXMgYmFjay4uLlxuICAgICAgICBcdC8vZHluYW1pY2FsbHkgY3JlYXRlIGEgZGl2IHRoYXQgd2lsbCBob2xkIGFsbCBvZiB0aGUgcHJvZHVjdCBkYXRhLCBpbmNsdWRpbmcgaDIsIHAgdGFncywgaW1hZ2VzLCBldGMuXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZmlsdGVyQnJhbmRzLmxlbmd0aDsgaSsrKSB7XG4gICAgXHRcdCQoJyNtYWtldXBDb250YWluZXInKS5hcHBlbmQoYFxuICAgIFx0XHRcdDxkaXYgY2xhc3M9XCJtYWtldXBJbmZvXCI+XG4gICAgXHRcdFx0XHQ8aDI+JHtmaWx0ZXJCcmFuZHNbaV0uYnJhbmR9PC9oMj4gXG4gICAgXHRcdFx0XHQ8aDM+JHtmaWx0ZXJCcmFuZHNbaV0ubmFtZX08L2gzPiBcbiAgICBcdFx0XHRcdDxkaXY+PGltZyBzcmM9XCIke2ZpbHRlckJyYW5kc1tpXS5pbWFnZV9saW5rfVwiIGFsdD1cIlwiIC8+PC9kaXY+XG4gICAgXHRcdFx0XHQ8cCBjbGFzcz1cInRhZ3NcIj5GZWF0dXJlczogJHtmaWx0ZXJCcmFuZHNbaV0udGFnX2xpc3R9PC9wPlxuICAgIFx0XHRcdFx0PGEgaHJlZj1cIiR7ZmlsdGVyQnJhbmRzW2ldLnByb2R1Y3RfbGlua31cIiB0YXJnZXQ9XCJfYmxhbmtcIiBjbGFzcz1cInBpbmtUZXh0XCI+UHJvZHVjdCB1cmw8L2E+XG4gICAgXHRcdFx0XHQ8cD4ke2ZpbHRlckJyYW5kc1tpXS5kZXNjcmlwdGlvbn08L3A+XG4gICAgXHRcdFx0PC9kaXY+YClcblx0XHR9XG4gICAgfSlcbn0gXG5cbm1ha2V1cEFwcC5maWx0ZXJQcm9kdWN0VHlwZXMgPSBmdW5jdGlvbihwcm9kdWN0cykge1xuXHQvL29uIGNsaWNrIG9mIG1ha2V1cCBwcm9kdWN0IHR5cGUgcmFkaW8gYnV0dG9ucywgYWNjZXNzIHByb2R1Y3QgZGF0YVxuXHQkKCcucHJvZHVjdC10eXBlJykuY2xpY2socHJvZHVjdHMsIGZ1bmN0aW9uKCkge1xuXHRcdC8vZW1wdHkgY29udGFpbmVyIHRvIHJlbW92ZSBleGlzdGluZyBjb250ZW50XG5cdFx0JCgnI21ha2V1cENvbnRhaW5lcicpLmVtcHR5KCk7XG5cdFx0Ly9zdG9yZSB0aGUgdmFsdWUgb2YgdGhlIHJhZGlvIGJ1dHRvbiB1c2VyIGNsaWNrZWQgb24gaW50byB2YXJpYWJsZVxuXHRcdGxldCBwcm9kdWN0VHlwZVNlbGVjdGVkID0gJCgnaW5wdXRbbmFtZT10eXBlXTpjaGVja2VkJykudmFsKCk7XG5cdFx0Ly9maWx0ZXIgdGhyb3VnaCBwcm9kdWN0IGRhdGEsIGFuZCByZXR1cm4gdGhlIHByb2R1Y3QgdHlwZSB0aGF0IGlzIGV4YWN0bHkgZXF1YWwgdG8gdXNlcnMgaW5wdXRcblx0XHRjb25zdCBmaWx0ZXJQcm9kdWN0cyA9IHByb2R1Y3RzLmZpbHRlcihmdW5jdGlvbihwcm9kdWN0KSB7XG5cdFx0XHRyZXR1cm4gcHJvZHVjdC5wcm9kdWN0X3R5cGUgPT09IHByb2R1Y3RUeXBlU2VsZWN0ZWQ7XG5cdFx0fSlcblx0XHQvL2xvb3Agb3ZlciB0aGUgZmlsdGVyZWQgcHJvZHVjdHMsIGFuZCBmb3IgZXZlcnkgcGllY2Ugb2YgZGF0YSB0aGF0IGNvbWVzIGJhY2suLi5cbiAgICAgICAgXHQvL2R5bmFtaWNhbGx5IGNyZWF0ZSBhIGRpdiB0aGF0IHdpbGwgaG9sZCBhbGwgb2YgdGhlIHByb2R1Y3QgZGF0YSwgaW5jbHVkaW5nIGgyLCBwIHRhZ3MsIGltYWdlcywgZXRjLlxuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgZmlsdGVyUHJvZHVjdHMubGVuZ3RoOyBpKyspIHtcblx0XHRcdCQoJyNtYWtldXBDb250YWluZXInKS5hcHBlbmQoYFxuXHRcdFx0XHQ8ZGl2IGNsYXNzPVwibWFrZXVwSW5mb1wiPlxuXHRcdFx0XHRcdDxoMj4ke2ZpbHRlclByb2R1Y3RzW2ldLmJyYW5kfTwvaDI+XG5cdFx0XHRcdFx0PGgzPiR7ZmlsdGVyUHJvZHVjdHNbaV0ubmFtZX08L2gzPiBcbiAgICBcdFx0XHRcdDxkaXY+PGltZyBzcmM9XCIke2ZpbHRlclByb2R1Y3RzW2ldLmltYWdlX2xpbmt9XCIgYWx0PVwiXCIgLz48L2Rpdj5cbiAgICBcdFx0XHRcdDxwIGNsYXNzPVwidGFnc1wiPkZlYXR1cmVzOiAke2ZpbHRlclByb2R1Y3RzW2ldLnRhZ19saXN0fTwvcD5cbiAgICBcdFx0XHRcdDxhIGhyZWY9XCIke2ZpbHRlclByb2R1Y3RzW2ldLnByb2R1Y3RfbGlua31cIiB0YXJnZXQ9XCJfYmxhbmtcIiBjbGFzcz1cInBpbmtUZXh0XCI+UHJvZHVjdCB1cmw8L2E+XG4gICAgXHRcdFx0XHQ8cD4ke2ZpbHRlclByb2R1Y3RzW2ldLmRlc2NyaXB0aW9ufTwvcD5cblx0XHRcdFx0PC9kaXY+YClcblx0XHR9XG5cdH0pXG59XG5cbm1ha2V1cEFwcC5maWx0ZXJUYWdzID0gZnVuY3Rpb24ocHJvZHVjdHMpIHtcblx0Ly9vbiBjbGljayBvZiBtYWtldXAgcHJvZHVjdCB0eXBlIHJhZGlvIGJ1dHRvbnMsIGFjY2VzcyBwcm9kdWN0IGRhdGFcblx0JCgnLm1ha2V1cC1hamF4LWJ1dHRvbicpLmNsaWNrKHByb2R1Y3RzLCBmdW5jdGlvbigpIHtcblx0XHQvL2VtcHR5IGNvbnRhaW5lciB0byByZW1vdmUgZXhpc3RpbmcgY29udGVudFxuXHRcdCQoJyNtYWtldXBDb250YWluZXInKS5lbXB0eSgpO1xuXHRcdC8vc3RvcmUgdGhlIHZhbHVlIG9mIHRoZSByYWRpbyBidXR0b24gdXNlciBjbGlja2VkIG9uIGludG8gdmFyaWFibGVcblx0XHRsZXQgdGFnU2VsZWN0ZWQgPSAkKCdpbnB1dFtuYW1lPXRhZ106Y2hlY2tlZCcpLnZhbCgpO1xuXHRcdC8vZmlsdGVyIHRocm91Z2ggcHJvZHVjdCBkYXRhLCBhbmQgcmV0dXJuIHRoZSB0YWdzIHRoYXQgYXJlIGV4YWN0bHkgZXF1YWwgdG8gdXNlcnMgaW5wdXRcblx0XHRjb25zdCBmaWx0ZXJUYWdzID0gcHJvZHVjdHMuZmlsdGVyKGZ1bmN0aW9uKHByb2R1Y3QpIHtcblx0XHRcdHJldHVybiBwcm9kdWN0LnRhZ19saXN0ID09IHRhZ1NlbGVjdGVkO1xuXHRcdH0pXG5cdFx0Ly9sb29wIG92ZXIgdGhlIGZpbHRlcmVkIHRhZ3MsIGFuZCBmb3IgZXZlcnkgcGllY2Ugb2YgZGF0YSB0aGF0IGNvbWVzIGJhY2suLi5cbiAgICAgICAgXHQvL2R5bmFtaWNhbGx5IGNyZWF0ZSBhIGRpdiB0aGF0IHdpbGwgaG9sZCBhbGwgb2YgdGhlIHByb2R1Y3QgZGF0YSwgaW5jbHVkaW5nIGgyLCBwIHRhZ3MsIGltYWdlcywgZXRjLlxuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgZmlsdGVyVGFncy5sZW5ndGg7IGkrKykge1xuXHRcdFx0JCgnI21ha2V1cENvbnRhaW5lcicpLmFwcGVuZChgXG5cdFx0XHRcdDxkaXYgY2xhc3M9XCJtYWtldXBJbmZvXCI+XG5cdFx0XHRcdFx0PGgyPiR7ZmlsdGVyVGFnc1tpXS5uYW1lfTwvaDI+IFxuXHRcdFx0XHRcdDxoMz4ke2ZpbHRlclRhZ3NbaV0ubmFtZX08L2gzPiBcblx0XHRcdFx0XHQ8ZGl2PjxpbWcgc3JjPVwiJHtmaWx0ZXJUYWdzW2ldLmltYWdlX2xpbmt9XCIgYWx0PVwiXCIgLz48L2Rpdj5cblx0XHRcdFx0XHQ8cCBjbGFzcz1cInRhZ3NcIj5GZWF0dXJlczogJHtmaWx0ZXJUYWdzW2ldLnRhZ19saXN0fTwvcD5cblx0XHRcdFx0XHQ8YSBocmVmPVwiJHtmaWx0ZXJUYWdzW2ldLnByb2R1Y3RfbGlua31cIiB0YXJnZXQ9XCJfYmxhbmtcIiBjbGFzcz1cInBpbmtUZXh0XCI+UHJvZHVjdCB1cmw8L2E+XG4gICAgXHRcdFx0XHQ8cD4ke2ZpbHRlclRhZ3NbaV0uZGVzY3JpcHRpb259PC9wPlxuXHRcdFx0XHQ8L2Rpdj5gKTtcblx0XHR9XG5cdH0pXG59XG5cbi8vY2hhbmdpbmcgbWFyZ2luLXRvcCBvbiBhYm91dFdlYnNpdGUgc2VjdGlvbiB0byBhY2NvdW50IGZvciBoMSBzbGlkaW5nIGRvd24gYW5kIG92ZXJsYXBwaW5nIHRleHQgb24gY2xpY2sgb2YgaGFtYnVyZ2VyIG1lbnUgYnV0dG9uXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgZnVuY3Rpb24oZXZlbnQpe1xuICB2YXIgd2luID0gJCh3aW5kb3cpO1xuICAgICAgaWYgKHdpbi53aWR0aCgpIDwgNTE0KSB7IFxuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Fib3V0V2Vic2l0ZScpLnN0eWxlLm1hcmdpblRvcCA9ICc0MDBweCc7IFxuICAgICAgIH1cbiAgICBlbHNlXG4gICAge1xuICAgIFx0ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Fib3V0V2Vic2l0ZScpLnN0eWxlLm1hcmdpblRvcCA9ICcxMDBweCc7XG4gICAgfVxufSk7XG5cblxuLy9yZWxvYWQgcGFnZSBvbiBjbGljayBvZiByZWZyZXNoIGJ1dHRvblxuZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3JlZnJlc2hQYWdlJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbigpIHtcblx0bG9jYXRpb24ucmVsb2FkKCk7XG5cdHdpbmRvdy5zY3JvbGxUbygwLCAwKTtcbn0pXG5cbi8vc21vb3RoIHNjcm9sbFxuJCgnaW5wdXRbdHlwZT1yYWRpb10nKS5jbGljayhmdW5jdGlvbigpIHtcbiAgICAkKCdodG1sLCBib2R5JykuYW5pbWF0ZSh7XG4gICAgICAgIHNjcm9sbFRvcDogJCgnI21ha2V1cENvbnRhaW5lcicpLm9mZnNldCgpLnRvcFxuICAgIH0sIDEwMDApO1xufSk7XG5cbiQoZnVuY3Rpb24oKXtcblx0bWFrZXVwQXBwLmluaXQoKTtcbn0pO1xuXG4vKlByb2JsZW1zIHRvIGFkZHJlc3NcbjQuIG5lZWQgdG8gZmlndXJlIG91dCBob3cgdG8gY29ubmVjdCB0aGUgZnVuY3Rpb25zLiByaWdodCBub3cgaSBjYW4gZmlsdGVyIGJ1dCBvbmx5IGlmIGlmIHN0YXRlbWVudHMgbWVldCBvbmUgY29uZGl0aW9uLiBpZS4gZm9yIGV4YW1wbGUsIGlmIHVzZXIgaW5wdXQgPSBzZWxlY3RlZGJyYW5kIEFORCBzZWxlY3RlZCBwcm9kdWN0dHlwZSBBTkQgY2VydGFpbiBpbmdyZWRpZW50IGZhY3RvciwgZGlzcGxheSByZWxhdGl2ZSBjb250ZW50XG42LiB3aHkgZG9lcyBpdCB0YWtlIGEgYml0IGZvciBkYXRhIHRvIGJlIHB1bGxlZD8gc2hvdWxkIGJlIHByZXNlbnQgcmlnaHQgb24gcGFnZSBsb2FkXG4qL1xuXG5cbiBcbiJdfQ==
