const makeupApp = {}

makeupApp.init = function(){
	makeupApp.getMakeup();
};

makeupApp.getMakeup = function(){
		$.ajax({
	  url: 'http://makeup-api.herokuapp.com/api/v1/products.json',
	  method: 'GET',
	  dataType: 'json',
	}).then(function(res) {
	  console.log(res);
	  makeupApp.displayMakeup(res);
	  console.log('hi')
	});
};

//makeupApp.displayMakeup = function(data){
makeupApp.displayMakeup = function(data){
		data.forEach(function(res){
    	const brand = $('<h2>').text(res.brand);
    	const name = $('<p>').text(res.name);
    	const link = $('<p>').text(res.product_link);
    	const price = $('<p>').text(res.price);
    	const image = $('<img>').attr('src', res.image_link);


		var makeupPiece = $('<div>').addClass('piece').append(brand, name, link, price, image);
		$('.pieces').append(makeupPiece);
	});
};


function hello() {
	console.log('hi')
};

$(function(){
		makeupApp.init();
});
