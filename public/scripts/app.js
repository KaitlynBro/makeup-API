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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJkZXYvc2NyaXB0cy9hcHAuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxJQUFNLFlBQVksRUFBbEI7O0FBRUEsVUFBVSxJQUFWLEdBQWlCLFlBQVc7QUFDM0IsV0FBVSxTQUFWO0FBQ0EsQ0FGRDs7QUFJQSxVQUFVLFNBQVYsR0FBc0IsVUFBUyxXQUFULEVBQXNCLFlBQXRCLEVBQW1DO0FBQ3hELEdBQUUsSUFBRixDQUFPO0FBQ0wsT0FBSyx1REFEQTtBQUVMLFVBQVEsS0FGSDtBQUdMLFlBQVUsTUFITDtBQUlMLFFBQU07QUFDTCxpQkFBYyxXQURUO0FBRUwsa0JBQWU7QUFGVjtBQUpELEVBQVAsRUFRRyxJQVJILENBUVEsVUFBUyxHQUFULEVBQWM7QUFDckI7QUFDQSxZQUFVLGFBQVYsQ0FBd0IsR0FBeEI7QUFDQSxFQVhEO0FBWUEsQ0FiRDs7QUFlQTtBQUNBLFVBQVUsYUFBVixHQUEwQixVQUFTLFFBQVQsRUFBbUI7QUFDekM7QUFDQSxHQUFFLHNCQUFGLEVBQTBCLEtBQTFCLENBQWdDLFFBQWhDLEVBQTBDLFlBQVc7QUFDcEQsSUFBRSxrQkFBRixFQUFzQixLQUF0QjtBQUNHLE1BQUksZ0JBQWdCLEVBQUUsMkJBQUYsRUFBK0IsR0FBL0IsRUFBcEI7QUFDQSxNQUFNLGVBQWUsU0FBUyxNQUFULENBQWdCLFVBQVMsT0FBVCxFQUFrQjtBQUNuRCxVQUFPLFFBQVEsS0FBUixLQUFrQixhQUF6QjtBQUNILEdBRm9CLENBQXJCO0FBR0E7QUFDQSxPQUFLLElBQUksSUFBSSxDQUFiLEVBQWdCLElBQUksYUFBYSxNQUFqQyxFQUF5QyxHQUF6QyxFQUE4QztBQUNoRCxXQUFRLEdBQVIsQ0FBWSxhQUFhLENBQWIsQ0FBWjtBQUNBLEtBQUUsa0JBQUYsRUFBc0IsTUFBdEIsNERBRVEsYUFBYSxDQUFiLEVBQWdC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cEIsYUFBVyxFQUFFLGtCQUFGLEVBQXNCLE1BQXRCLEdBQStCO0FBRHRCLEVBQXhCLEVBRUcsSUFGSDtBQUdILENBSkQ7O0FBTUEsRUFBRSxZQUFVO0FBQ1gsV0FBVSxJQUFWO0FBQ0EsQ0FGRDs7QUFJQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIvL29uIHBhZ2UgbG9hZCwgZGlzcGxheSBuYXYgYmFyIHdpdGggYWxsIGJyYW5kc1xuLy9pZiB1c2VyIGNsaWNrcyBvbiBjZXJ0YWluIGJyYW5kLCBicmluZyB1cCBhbGwgb2YgdGhhdCBicmFuZHMgbWFrZXVwXG4vL2Fsc28gYnJpbmcgdXAgbmV3IG5hdiBiYXIgd2l0aCB0aGUgZGlmZmVyZW50IHByb2R1Y3QgdHlwZXNcbi8vaWYgdXNlciBjbGlja3Mgb24gY2VydGFpbiBwcm9kdWN0IHR5cGUsIGRpc3BsYXkgb25seSB0aGF0IHByb2R1Y3QgYnJhbmQgYW5kIHR5cGVcbi8vYWxzbyBub3cgZGlzcGxheSBuZXcgbmF2IGJhciB3aXRoIHByb2R1Y3QgdGFncyAoaWUuIHZlZ2FuLCBnbHV0ZW4gZnJlZSwgZXRjKVxuLy9pZiB1c2VyIGNsaWNrcyBvbiBhIGNlcnRhaW4gdGFnLCBkaXNwbGF5IG9ubHkgdGhhdCBicmFuZHMgcHJvZHVjdCB0eXBlIHRoYXQgZml0cyB0aGF0IHRhZ1xuXG5jb25zdCBtYWtldXBBcHAgPSB7fVxuXG5tYWtldXBBcHAuaW5pdCA9IGZ1bmN0aW9uKCkge1xuXHRtYWtldXBBcHAuZ2V0TWFrZXVwKCk7XG59XG5cbm1ha2V1cEFwcC5nZXRNYWtldXAgPSBmdW5jdGlvbihwcm9kdWN0VHlwZSwgcHJvZHVjdEJyYW5kKXtcblx0JC5hamF4KHtcblx0ICB1cmw6ICdodHRwczovL21ha2V1cC1hcGkuaGVyb2t1YXBwLmNvbS9hcGkvdjEvcHJvZHVjdHMuanNvbicsXG5cdCAgbWV0aG9kOiAnR0VUJyxcblx0ICBkYXRhVHlwZTogJ2pzb24nLFxuXHQgIGRhdGE6IHtcblx0ICBcdHByb2R1Y3RfdHlwZTogcHJvZHVjdFR5cGUsXG5cdCAgXHRwcm9kdWN0X2JyYW5kOiBwcm9kdWN0QnJhbmRcblx0ICB9XG5cdH0pLnRoZW4oZnVuY3Rpb24ocmVzKSB7XG5cdFx0Ly8gY29uc29sZS5sb2cocmVzKVxuXHRcdG1ha2V1cEFwcC5kaXNwbGF5QnJhbmRzKHJlcyk7XG5cdH0pO1xufTtcblxuLy9pZiB1c2VyIGNsaWNrcyBvbiBjZXJ0YWluIGJyYW5kLCBhcHBlbmQgbmFtZSBvZiB0aGF0IGJyYW5kIHRvIHBhZ2UgYW5kIGFsbCBvZiB0aGUgcmVsYXRlZCBtYWtldXBcbm1ha2V1cEFwcC5kaXNwbGF5QnJhbmRzID0gZnVuY3Rpb24ocHJvZHVjdHMpIHtcbiAgICAvL2NvbnNvbGUubG9nKHByb2R1Y3RzKVxuICAgICQoJy5tYWtldXAtYnJhbmQtYnV0dG9uJykuY2xpY2socHJvZHVjdHMsIGZ1bmN0aW9uKCkge1xuICAgIFx0JCgnI21ha2V1cENvbnRhaW5lcicpLmVtcHR5KCk7XG4gICAgICAgIGxldCBicmFuZFNlbGVjdGVkID0gJCgnaW5wdXRbbmFtZT1icmFuZF06Y2hlY2tlZCcpLnZhbCgpO1xuICAgICAgICBjb25zdCBmaWx0ZXJCcmFuZHMgPSBwcm9kdWN0cy5maWx0ZXIoZnVuY3Rpb24ocHJvZHVjdCkge1xuICAgICAgICAgICAgcmV0dXJuIHByb2R1Y3QuYnJhbmQgPT09IGJyYW5kU2VsZWN0ZWQ7XG4gICAgICAgIH0pXG4gICAgICAgIC8vY29uc29sZS5sb2coZmlsdGVyQnJhbmRzKTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBmaWx0ZXJCcmFuZHMubGVuZ3RoOyBpKyspIHtcbiAgICBcdFx0Y29uc29sZS5sb2coZmlsdGVyQnJhbmRzW2ldKTtcbiAgICBcdFx0JCgnI21ha2V1cENvbnRhaW5lcicpLmFwcGVuZChgXG4gICAgXHRcdFx0PGRpdiBjbGFzcz1cIm1ha2V1cEluZm9cIj5cbiAgICBcdFx0XHRcdDxoMj4ke2ZpbHRlckJyYW5kc1tpXS5icmFuZH08L2gyPiBcbiAgICBcdFx0XHRcdDxoMz4ke2ZpbHRlckJyYW5kc1tpXS5uYW1lfTwvaDM+IFxuICAgIFx0XHRcdFx0PGRpdj48aW1nIHNyYz1cIiR7ZmlsdGVyQnJhbmRzW2ldLmltYWdlX2xpbmt9XCIgYWx0PVwiXCIgLz48L2Rpdj5cbiAgICBcdFx0XHRcdDxwIGNsYXNzPVwidGFnc1wiPkZlYXR1cmVzOiAke2ZpbHRlckJyYW5kc1tpXS50YWdfbGlzdH08L3A+XG4gICAgXHRcdFx0XHQ8YSBocmVmPVwiJHtmaWx0ZXJCcmFuZHNbaV0ucHJvZHVjdF9saW5rfVwiIHRhcmdldD1cIl9ibGFua1wiIGNsYXNzPVwicGlua1RleHRcIj5Qcm9kdWN0IHVybDwvYT5cbiAgICBcdFx0XHRcdDxwPiR7ZmlsdGVyQnJhbmRzW2ldLmRlc2NyaXB0aW9ufTwvcD5cbiAgICBcdFx0XHQ8L2Rpdj5gKVxuXHRcdH1cblx0XHRtYWtldXBBcHAuZmlsdGVyUHJvZHVjdFR5cGVzKHByb2R1Y3RzKTtcblx0XHRtYWtldXBBcHAuZmlsdGVyVGFncyhwcm9kdWN0cyk7XG4gICAgfSlcbn0gXG5cbm1ha2V1cEFwcC5maWx0ZXJQcm9kdWN0VHlwZXMgPSBmdW5jdGlvbihwcm9kdWN0cykge1xuXHQkKCcucHJvZHVjdC10eXBlJykuY2xpY2socHJvZHVjdHMsIGZ1bmN0aW9uKCkge1xuXHRcdCQoJyNtYWtldXBDb250YWluZXInKS5lbXB0eSgpO1xuXHRcdGxldCBwcm9kdWN0VHlwZVNlbGVjdGVkID0gJCgnaW5wdXRbbmFtZT10eXBlXTpjaGVja2VkJykudmFsKCk7XG5cdFx0Y29uc29sZS5sb2cocHJvZHVjdFR5cGVTZWxlY3RlZCk7XG5cdFx0Y29uc3QgZmlsdGVyUHJvZHVjdHMgPSBwcm9kdWN0cy5maWx0ZXIoZnVuY3Rpb24ocHJvZHVjdCkge1xuXHRcdFx0cmV0dXJuIHByb2R1Y3QucHJvZHVjdF90eXBlID09PSBwcm9kdWN0VHlwZVNlbGVjdGVkO1xuXHRcdH0pXG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBmaWx0ZXJQcm9kdWN0cy5sZW5ndGg7IGkrKykge1xuXHRcdFx0JCgnI21ha2V1cENvbnRhaW5lcicpLmFwcGVuZChgXG5cdFx0XHRcdDxkaXYgY2xhc3M9XCJtYWtldXBJbmZvXCI+XG5cdFx0XHRcdFx0PGgyPiR7ZmlsdGVyUHJvZHVjdHNbaV0uYnJhbmR9PC9oMj5cblx0XHRcdFx0XHQ8aDM+JHtmaWx0ZXJQcm9kdWN0c1tpXS5uYW1lfTwvaDM+IFxuICAgIFx0XHRcdFx0PGRpdj48aW1nIHNyYz1cIiR7ZmlsdGVyUHJvZHVjdHNbaV0uaW1hZ2VfbGlua31cIiBhbHQ9XCJcIiAvPjwvZGl2PlxuICAgIFx0XHRcdFx0PHAgY2xhc3M9XCJ0YWdzXCI+RmVhdHVyZXM6ICR7ZmlsdGVyUHJvZHVjdHNbaV0udGFnX2xpc3R9PC9wPlxuICAgIFx0XHRcdFx0PGEgaHJlZj1cIiR7ZmlsdGVyUHJvZHVjdHNbaV0ucHJvZHVjdF9saW5rfVwiIHRhcmdldD1cIl9ibGFua1wiIGNsYXNzPVwicGlua1RleHRcIj5Qcm9kdWN0IHVybDwvYT5cbiAgICBcdFx0XHRcdDxwPiR7ZmlsdGVyUHJvZHVjdHNbaV0uZGVzY3JpcHRpb259PC9wPlxuXHRcdFx0XHQ8L2Rpdj5gKVxuXHRcdH1cblx0fSlcbn1cblxubWFrZXVwQXBwLmZpbHRlclRhZ3MgPSBmdW5jdGlvbihwcm9kdWN0cykge1xuXHQvL2NvbnNvbGUubG9nKHByb2R1Y3RzKTtcblx0JCgnLm1ha2V1cC1hamF4LWJ1dHRvbicpLmNsaWNrKHByb2R1Y3RzLCBmdW5jdGlvbigpIHtcblx0XHQkKCcjbWFrZXVwQ29udGFpbmVyJykuZW1wdHkoKTtcblx0XHRsZXQgdGFnU2VsZWN0ZWQgPSAkKCdpbnB1dFtuYW1lPXRhZ106Y2hlY2tlZCcpLnZhbCgpO1xuXHRcdGxldCBicmFuZFNlbGVjdGVkID0gJCgnaW5wdXRbbmFtZT1icmFuZF06Y2hlY2tlZCcpLnZhbCgpO1xuXHRcdGNvbnN0IGZpbHRlclRhZ3MgPSBwcm9kdWN0cy5maWx0ZXIoZnVuY3Rpb24ocHJvZHVjdCkge1xuXHRcdFx0cmV0dXJuIHByb2R1Y3QudGFnX2xpc3QgPT0gdGFnU2VsZWN0ZWQ7XG5cdFx0fSlcblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGZpbHRlclRhZ3MubGVuZ3RoOyBpKyspIHtcblx0XHRcdCQoJyNtYWtldXBDb250YWluZXInKS5hcHBlbmQoYFxuXHRcdFx0XHQ8ZGl2IGNsYXNzPVwibWFrZXVwSW5mb1wiPlxuXHRcdFx0XHRcdDxoMj4ke2ZpbHRlclRhZ3NbaV0ubmFtZX08L2gyPiBcblx0XHRcdFx0XHQ8aDM+JHtmaWx0ZXJUYWdzW2ldLm5hbWV9PC9oMz4gXG5cdFx0XHRcdFx0PGRpdj48aW1nIHNyYz1cIiR7ZmlsdGVyVGFnc1tpXS5pbWFnZV9saW5rfVwiIGFsdD1cIlwiIC8+PC9kaXY+XG5cdFx0XHRcdFx0PHAgY2xhc3M9XCJ0YWdzXCI+RmVhdHVyZXM6ICR7ZmlsdGVyVGFnc1tpXS50YWdfbGlzdH08L3A+XG5cdFx0XHRcdFx0PGEgaHJlZj1cIiR7ZmlsdGVyVGFnc1tpXS5wcm9kdWN0X2xpbmt9XCIgdGFyZ2V0PVwiX2JsYW5rXCIgY2xhc3M9XCJwaW5rVGV4dFwiPlByb2R1Y3QgdXJsPC9hPlxuICAgIFx0XHRcdFx0PHA+JHtmaWx0ZXJUYWdzW2ldLmRlc2NyaXB0aW9ufTwvcD5cblx0XHRcdFx0PC9kaXY+YCk7XG5cdFx0fVxuXHR9KVxufVxuXG4vL3JlbW92ZSBoMSBmcm9tIERPTSBvbmNlIG1lbnUgYnV0dG9uIGlzIHByZXNzZWQgdG8gYXZvaWQgb3ZlcmxhcFxuZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21lbnVCdXR0b24nKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuXHRkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGl0bGUnKS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xufSlcblxuXG4vL3JlbG9hZCBwYWdlIFxuZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3JlZnJlc2hQYWdlJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbigpIHtcblx0Y29uc29sZS5sb2coJ2hpJyk7XG5cdGxvY2F0aW9uLnJlbG9hZCgpO1xuXHR3aW5kb3cuc2Nyb2xsVG8oMCwgMCk7XG59KVxuXG4vL3Ntb290aCBzY3JvbGxcbiQoJ2lucHV0W3R5cGU9cmFkaW9dJykuY2xpY2soZnVuY3Rpb24oKSB7XG4gICAgJCgnaHRtbCwgYm9keScpLmFuaW1hdGUoe1xuICAgICAgICBzY3JvbGxUb3A6ICQoJyNtYWtldXBDb250YWluZXInKS5vZmZzZXQoKS50b3BcbiAgICB9LCAxMDAwKTtcbn0pO1xuXG4kKGZ1bmN0aW9uKCl7XG5cdG1ha2V1cEFwcC5pbml0KCk7XG59KTtcblxuLypQcm9ibGVtcyB0byBhZGRyZXNzXG4xLiBoaWRlIGgxIG9uIGNsaWNrIG9mIG1haW4gbWVudSBidXR0b24sIHVuaGlkZSBvbiBzZWNvbmQgY2xpY2tcbjQuIG5lZWQgdG8gZmlndXJlIG91dCBob3cgdG8gY29ubmVjdCB0aGUgZnVuY3Rpb25zLiByaWdodCBub3cgaSBjYW4gZmlsdGVyIGJ1dCBvbmx5IGlmIGlmIHN0YXRlbWVudHMgbWVldCBvbmUgY29uZGl0aW9uLiBpZS4gZm9yIGV4YW1wbGUsIGlmIHVzZXIgaW5wdXQgPSBzZWxlY3RlZGJyYW5kIEFORCBzZWxlY3RlZCBwcm9kdWN0dHlwZSBBTkQgY2VydGFpbiBpbmdyZWRpZW50IGZhY3RvciwgZGlzcGxheSByZWxhdGl2ZSBjb250ZW50XG41LiBwcm9kdWN0dHlwZSBhbmQgcHJvZHVjdHRhZyBmdW5jdGlvbnMgb25seSBmaXJlIGlmIHlvdSBjbGljayBvbiBwcm9kdWN0YnJhbmQgZnVuY3Rpb24gZmlyc3QgLSBkb24ndCB3YW50IHRoaXNcbjYuIHdoeSBkb2VzIGl0IHRha2UgYSBiaXQgZm9yIGRhdGEgdG8gYmUgcHVsbGVkPyBzaG91bGQgYmUgcHJlc2VudCByaWdodCBvbiBwYWdlIGxvYWRcbiovXG5cblxuIFxuIl19
