//on page load, display nav bar with all brands
//if user clicks on certain brand, bring up all of that brands makeup
//also bring up new nav bar with the different product types
//if user clicks on certain product type, display only that product brand and type
//also now display new nav bar with product tags (ie. vegan, gluten free, etc)
//if user clicks on a certain tag, display only that brands product type that fits that tag

const makeupApp = {}

makeupApp.init = function() {
	makeupApp.getMakeup();
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
		makeupApp.displayBrands(res);
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
    		$('#makeupContainer').append(`
    			<div class="makeupInfo">
    				<h2>${filterBrands[i].brand}</h2> 
    				<h3>${filterBrands[i].name}</h3> 
    				<div><img src="${filterBrands[i].image_link}" alt="" /></div>
    				<p class="tags">Features: ${filterBrands[i].tag_list}</p>
    				<a href="${filterBrands[i].product_link}" target="_blank" class="pinkText">Product url</a>
    				<p>${filterBrands[i].description}</p>
    			</div>`)
		}
		makeupApp.filterProductTypes(products);
		makeupApp.filterTags(products);
    })
} 

makeupApp.filterProductTypes = function(products) {
	$('.product-type').click(products, function() {
		$('#makeupContainer').empty();
		let productTypeSelected = $('input[name=type]:checked').val();
		console.log(productTypeSelected);
		const filterProducts = products.filter(function(product) {
			return product.product_type === productTypeSelected;
		})
		for (var i = 0; i < filterProducts.length; i++) {
			$('#makeupContainer').append(`
				<div class="makeupInfo">
					<h2>${filterProducts[i].brand}</h2>
					<h3>${filterProducts[i].name}</h3> 
    				<div><img src="${filterProducts[i].image_link}" alt="" /></div>
    				<p class="tags">Features: ${filterProducts[i].tag_list}</p>
    				<a href="${filterProducts[i].product_link}" target="_blank" class="pinkText">Product url</a>
    				<p>${filterProducts[i].description}</p>
				</div>`)
		}
	})
}

makeupApp.filterTags = function(products) {
	//console.log(products);
	$('.makeup-ajax-button').click(products, function() {
		$('#makeupContainer').empty();
		let tagSelected = $('input[name=tag]:checked').val();
		let brandSelected = $('input[name=brand]:checked').val();
		const filterTags = products.filter(function(product) {
			return product.tag_list == tagSelected;
		})
		for (var i = 0; i < filterTags.length; i++) {
			$('#makeupContainer').append(`
				<div class="makeupInfo">
					<h2>${filterTags[i].name}</h2> 
					<h3>${filterTags[i].name}</h3> 
					<div><img src="${filterTags[i].image_link}" alt="" /></div>
					<p class="tags">Features: ${filterTags[i].tag_list}</p>
					<a href="${filterTags[i].product_link}" target="_blank" class="pinkText">Product url</a>
    				<p>${filterTags[i].description}</p>
				</div>`);
		}
	})
}

//remove h1 from DOM once menu button is pressed to avoid overlap
document.getElementById('menuButton').addEventListener('click', function() {
	document.getElementById('title').style.display = 'none';
})


//reload page 
document.getElementById('refreshPage').addEventListener('click', function() {
	console.log('hi');
	location.reload();
	window.scrollTo(0, 0);
})

//smooth scroll
$('input[type=radio]').click(function() {
    $('html, body').animate({
        scrollTop: $('#makeupContainer').offset().top
    }, 1000);
});

$(function(){
	makeupApp.init();
});

/*Problems to address
1. hide h1 on click of main menu button, unhide on second click
4. need to figure out how to connect the functions. right now i can filter but only if if statements meet one condition. ie. for example, if user input = selectedbrand AND selected producttype AND certain ingredient factor, display relative content
5. producttype and producttag functions only fire if you click on productbrand function first - don't want this
6. why does it take a bit for data to be pulled? should be present right on page load
*/


 
