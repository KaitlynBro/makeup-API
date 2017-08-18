//on page load, display nav bar with all brands
//if user clicks on certain brand, bring up all of that brands makeup
//also bring up new nav bar with the different product types
//if user clicks on certain product type, display only that product brand and type
//also now display new nav bar with product tags (ie. vegan, gluten free, etc)
//if user clicks on a certain tag, display only that brands product type that fits that tag

const makeupApp = {}

makeupApp.init = function() {
	makeupApp.getMakeup();
	makeupApp.displayBrands();
}

makeupApp.getMakeup = function(productType, productBrand){
	$.ajax({
	  url: 'http://makeup-api.herokuapp.com/api/v1/products.json',
	  method: 'GET',
	  dataType: 'json',
	  data: {
	  	product_type: productType,
	  	product_brand: productBrand
	  }
	}).then(function(res) {
		// console.log(res)
		makeupApp.displayBrands(res)
	});
};

//if user clicks on certain brand, append name of that brand to page and all of the related makeup
makeupApp.displayBrands = function(data) {
	//console.log(data)
	$('.makeup-brand-button').click(data, function() {
		let brandSelected = $('input[name=brand]:checked');
		document.getElementById('makeupContainer').append(`${brandSelected.val()}`);
		console.log(data[0])
		// const filterBrands = data.filter(function(data, brand) {
		// 	return data.brand === brandSelected;
		// })
	})
}	


$(function(){
	makeupApp.init();
});

 
 