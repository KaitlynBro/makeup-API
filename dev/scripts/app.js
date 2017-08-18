//on page load, display nav bar with all brands
//if user clicks on certain brand, bring up all of that brands makeup
//also bring up new nav bar with the different product types
//if user clicks on certain product type, display only that product brand and type
//also now display new nav bar with product tags (ie. vegan, gluten free, etc)
//if user clicks on a certain tag, display only that brands product type that fits that tag

const makeupApp = {}

makeupApp.init = function() {
	makeupApp.getMakeup();
	//makeupApp.displayBrands();
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
makeupApp.displayBrands = function(products) {
    //console.log(products)
    $('.makeup-brand-button').click(products, function() {
    	$('#makeupContainer').empty();
        let brandSelected = $('input[name=brand]:checked').val();
        const filterBrands = products.filter(function(product) {
            return product.brand === brandSelected;
        })
        //console.log(filterBrands);
        for (var i = 0; i < filterBrands.length; i++) {
    		console.log(filterBrands[i]);
    		$('#makeupContainer').append(`<h2>${filterBrands[i].brand}</h2> <h3>${filterBrands[i].name}</h3> <img src="${filterBrands[i].image_link}" alt="" />`)
		}
    })
}    


$(function(){
	makeupApp.init();
});

 
