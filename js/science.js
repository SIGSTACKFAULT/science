///////////////////////////////////////////////// VARS



/// Numbers
var sci = 0;
var money = 0;

/// Diff/sec
var mprofit = 0;
var sprofit = 0;

/// sci/click
var clickamt = 1;

/// Sell resarch rights
var RR_sellamt = 1;
var RR_sellexp = 0;


/// Cog menu
var menu = false;


/// Classes
var stat = new Stat();
var hire = new Hire();


///////////////////////////////////////////////// FUNCTIONS -- MISC

function recalc(){ // call ALL the update functions
	hire.update();
	stat.update();
	updateNumbers();
}

function clickbutton(){ // called when you click the button
	sci+=clickamt;
}

function updateNumbers(){ // Update top numbers
	$("#sci").html(sci);
	$("#money").html(money);
}

function addProfit(){
	sci += sprofit;
	money += mprofit;
}

function sellRR(i){
	if(i == undefined){
		if(sci >= RR_sellamt){
			money += RR_sellamt;
			sci -= RR_sellamt;
		} else {
			$("#sellRR .notenough").show();
			$("#sellRR .notenough").delay(500).fadeOut(1000);
		}
	} else {
		RR_sellexp+=i;
		if(RR_sellexp < 0) RR_sellexp = 0;
		RR_sellamt = Math.pow(10,RR_sellexp);
		$("#sellRR .amt").html(RR_sellamt);
	}
}



///////////////////////////////////////////////// FUNCTIONS -- COG MENU


function cogmenu(){
	// Toggle cog menu
	var box = $("#cogmenu");
	if(menu){
		box.animate({top:"100%"});
		$("#cog").animateRotate(0,-90);
		menu = false;
	} else {
		box.animate({top:$(document).height()-box.height()*1.5});
		$("#cog").animateRotate(0,90);
		menu = true;
	}
}



///////////////////////////////////////////////// REAAAAAAAADY TO RUUUUUUUMBLE!



$(document).ready(function(){

	/// Intervals:
	setInterval(addProfit, 1000);
	setInterval(updateNumbers, 20);
	setInterval(recalc, 5000);

	// Dynamic css
	$("#cog").css("bottom", $("#cogmenu").height()+20);
	$(".dropdown").css("max-width", $(document).width());
	
	recalc();

	// edge? display a warning.
	if(navigator.userAgent.match(/edge/i)){
		$("#UserAgent").text("Working on proper Edge support.");
	}
	// that was anti-climactic.
});
