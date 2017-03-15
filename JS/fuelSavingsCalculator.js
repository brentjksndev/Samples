/* A calculator for a boiler manufacturing company to allow the user to see energy savings based on a specific boiler */
var x = 5;
var y = 4;
var total=x+y;	
var OpenWindow = "ProcessInformation";
var jQBoilerSize = 0;
var jQBoilerEfficiency = 0;
var jQFuel = 0;
var jQOperatingHours = 0;
		
/* Current APPROXIMATE Fuel Prices Here   */
	
var jQFuelCost = 0;
var jQGasCost = 3.16;
var jQOilCost = 4.05;
	
/* END Fuel Prices  */
	
var jQExcessAirAdder = 0;
var jQFGRAdder = 0;
var jQMwater = 0;
var jQMgas = 0;
var jQTgasin = 0;
var jQTgasout = 0;
var jQHeatRecovered = 0;
var jQHeatRecovered_yr_mmBtu = 0;
var jQHeatRecovered_yr_therm = 0;
var jQMetricTonsCO2 = 0;
var jQFuelSaved_yr = 0;
	
$(document).ready(function(){
    $('#Input2').hide();
	$('#Input3').hide();
    $('#txtFuelCost').attr({value:jQGasCost})

/* controls for the alternate unit links  */
	$('#altBoilerHP').click(function(event){
		if ($('#altBoilerHP').text() == "Change Units to BHP") {
			$('#altBoilerHP').text("Change Units to PPH");
			$('#lblBoilerSize').text("Boiler Size (BHP)");
		} else {
			$('#altBoilerHP').text("Change Units to BHP");
			$('#lblBoilerSize').text("Boiler Size (PPH)");			
		};
	});

/* controls for fuel prices */
	$('#drpFuel').click(function(event){
		if ($('#drpFuel').val() == "Natural Gas") {	
			$('#lblFuelCost').text("Fuel Cost   ($/mmBtu)");
            $('#txtFuelCost').attr({value:jQGasCost});
		} else {
			$('#lblFuelCost').text("Fuel Cost   ($/Gal)");
			$('#txtFuelCost').attr({value:jQOilCost});
		};
	});
/* controls for the continue buttons */
	$('#btnContinue1').click(function(event){
		SeeApplicationDetails();
	});
		
	$('#btnContinue2').click(function(event){
		SeeSavings();
        goToByScroll("Input1");
	});
/* controls for the header ribbon buttons */
	$('#Header2').click(function(event){
		SeeApplicationDetails();
	});
	
	$('#Header3').click(function(event){
        SeeSavings();                        
        goToByScroll("Input1");
	});
		
	$('#Header1').click(function(event){
		SeeProcessInformation()
	});
/* CONTROL functions */
	function SeeProcessInformation(){
		if( OpenWindow == "ProcessInformation") {	

		} else if (OpenWindow == "ApplicationDetails") {
            if (ValidateBoilerSize("FuelCost","ApplicationDetails","Input Valid Number") == false || ValidateBoilerSize("OpHours","ApplicationDetails","Input Valid Number") == false  ){
		        OpenWindow = "ApplicationDetails";
			} else {
                $('#Input2').slideUp('slow', 'linear');
				$('#btnContinue2').slideUp('fast');
			    $('#Input1').slideDown('slow');
			    $('#btnContinue1').slideDown('fast');
				OpenWindow = "ProcessInformation"	
            }
		} else if (OpenWindow == "Savings") {
			$('#Input3').slideUp('slow', 'linear');
			$('#Input1').slideDown('slow');
			$('#btnContinue1').slideDown('fast');
            OpenWindow = "ProcessInformation"
		};	
	};

	function SeeApplicationDetails(){}
	    if( OpenWindow == "ProcessInformation") {
			if (ValidateBoilerSize("BoilerSize","ProcessInformation","Input Valid Number") == false || ValidateBoilerSize("BoilerFlueGasOut","ProcessInformation","Input Valid Number") == false ){
			    OpenWindow = "ProcessInformation";	
			} else {
				$('#Input1').slideUp('slow', 'linear');
				$('#btnContinue1').slideUp('fast');
				$('#Input2').slideDown('slow');
				$('#btnContinue2').slideDown('fast');
				OpenWindow = "ApplicationDetails";
			};	
		} else if (OpenWindow == "ApplicationDetails") {
			
		} else if (OpenWindow == "Savings") {
			$('#Input3').slideUp('slow', 'linear');
			$('#Input2').slideDown('slow');
			$('#btnContinue2').slideDown('fast');
			OpenWindow = "ApplicationDetails";
		};
    };

	function SeeSavings(){
		if( OpenWindow == "ProcessInformation") {
			if (ValidateBoilerSize("BoilerSize","ProcessInformation","Input Valid Number") == false || ValidateBoilerSize("BoilerFlueGasOut","ProcessInformation","Input Valid Number") == false  ){
			    OpenWindow = "ProcessInformation";
			} else {
				$('#Input1').slideUp('slow', 'linear');
				$('#btnContinue1').slideUp('fast');
				$('#Input3').slideDown('slow');
				OpenWindow = "Savings";
			};
		} else if (OpenWindow == "ApplicationDetails") {
			if (ValidateBoilerSize("FuelCost","ApplicationDetails","Input Valid Number") == false || ValidateBoilerSize("OpHours","ApplicationDetails","Input Valid Number") == false  ){
			    OpenWindow = "ApplicationDetails";
			} else {
                $('#Input2').slideUp('slow', 'linear');
				$('#btnContinue2').slideUp('fast');
				$('#Input3').slideDown('slow');
				OpenWindow = "Savings";
            }
		} else if (OpenWindow == "Savings") {

		};

		SavingsMath();
			
			/*This goes at the bottom to allow for checks*/ 
	
	};
/* Supplemental Functions */      
    function ValidateBoilerSize(FieldName,WindowName,Text){
	    var TempNum = 0;
		FieldName += "";

		if ($('#txt' + FieldName).val()==null || $('#txt' + FieldName).val()=="" || $('#txt' + FieldName).val()=="0"|| $('#txt' + FieldName).val()== Text){
		    $('#lbl'+ FieldName).attr({style:'color:red'});
			$('#txt'+ FieldName).attr({value:Text});		
			return false;
		} else {
		/*this cleans out any special characters besides decimals    */
			TempNum = $('#txt'+ FieldName).val();
			TempNum = TempNum.replace(/[^0-9.]/g,"");
			$('#txt'+ FieldName).attr({value:TempNum});

	        if (FieldName == "BoilerSize"){
			    if ($('#lblBoilerSize').text() == "Boiler Size (BHP)"){
					if($('#txtBoilerSize').val() > 2500) {
					    $('#txtBoilerSize').attr({value:"Change Units to PPH"});
						alert("This number seems abnormally large; Please input your Boiler Size in PPH");
						$('#lblBoilerSize').attr({style:'color:red'});
						return false;
					} else {
						$('#lblBoilerSize').attr({style:'color:black'});
						return true;
					};
				} else {
					if($('#txtBoilerSize').val() > 2500000) {
					    $('#txtBoilerSize').attr({value:"Input Valid Number"});
						alert("This number seems abnormally large; Please double check your figures.");	 						                $('#lblBoilerSize').attr({style:'color:red'});
						    return false;
					} else {
						$('#lblBoilerSize').attr({style:'color:black'});
						return true;
                    };
				};
			} else if (FieldName == "FuelCost") {
			    if($('#txtFuelCost').val() > 100) {
				    $('#txtFuelCost').attr({value:"Fuel Cost is High"});
					$('#lblFuelCost').attr({style:'color:red'});
					return false;
				} else {
					$('#lblFuelCost').attr({style:'color:black'});
					return true;
				};
			} else if (FieldName == "BoilerFlueGasOut"){
				if($('#txtBoilerFlueGasOut').val() > 1500) {
					$('#txtBoilerFlueGasOut').attr({value:"Temp is High"});
					$('#lblBoilerFlueGasOut').attr({style:'color:red'});
					return false;
				} else {
					$('#lblBoilerFlueGasOut').attr({style:'color:black'});
					return true;
				};
			} else if (FieldName == "OpHours"){
				if($('#txtOpHours').val() > 8766) {
					$('#txtOpHours').attr({value:"Enter in HRS/YR"});
					$('#lblOpHours').attr({style:'color:red'});
					return false;
				} else {
					$('#lblOpHours').attr({style:'color:black'});
					return true;	
				};
			}						
			$('#lbl'+ FieldName).attr({style:'color:black'});
			return true;
		};
	};
/* SHOW ME THE MATHS BABY */	
	function SavingsMath(){
	    jQBoilerSize = $('#txtBoilerSize').val();
		jQTgasin = $('#txtBoilerFlueGasOut').val();
		jQFuel = $('#drpFuel').val();  		
		jQOperatingHours = $('#txtOpHours').val();
		jQFuelCost = $('#txtFuelCost').val();

		if (jQFuel == "Natural Gas") {
			jQExcessAirAdder = 1.28;
			jQTgasout = 260;
		} else {
			jQExcessAirAdder = 1.25
			jQTgasout = 300;
		};
			
		if ($('#lblBoilerSize').text() == "Boiler Size (BHP)") {
			jQMwater = jQBoilerSize*34.5*1.02;
			jQMgas = jQMwaterjQMgas = jQMwater*jQExcessAirAdder; 
		} else {
			jQMwater = jQBoilerSize*1.02
			jQMgas = jQMwater*jQExcessAirAdder;
		};
			
		jQHeatRecovered = jQMgas*0.275*(jQTgasin-jQTgasout);
		jQHeatRecovered_yr_mmBtu = jQOperatingHours*jQHeatRecovered/1000000;
		jQFuelSaved_yr = jQHeatRecovered_yr_mmBtu*jQFuelCost;
        
        if (jQFuel == "Natural Gas") {
		    jQHeatRecovered_yr_therm = jQHeatRecovered_yr_mmBtu*10;
            jQMetricTonsCO2 = 0.005*jQHeatRecovered_yr_therm;
        } else {
	/*Obtained this from---- http://www.eia.gov/tools/faqs/faq.cfm?id=307&t=11     ---*/
            jQMetricTonsCO2 = 0.010151*(jQHeatRecovered_yr_mmBtu/0.14);
		};             
		$('#Result').text("$" + addCommas(Math.floor(jQFuelSaved_yr)) );
		$('#C02Result').html("Cuts down on <b style='color: #014C90'>" + addCommas(Math.floor(jQMetricTonsCO2))+"</b> metric tons of CO2 emmissions annually "  );
		$('#GasResult').html("Which is the same as CO2 emissions from consuming <b style='color: #014C90'>" + addCommas(Math.floor(jQMetricTonsCO2/.00892))+ "</b> gallons of gasoline"  );
		$('#TreesResult').html("Same amount of C02 annually removed from the atmosphere by <b style='color: #014C90'>" + addCommas(Math.floor(jQMetricTonsCO2/4.69))+"</b> acres of pine forest"  );
	};

    function goToByScroll(id){  
    /*Obtained this from---- $('html,body').animate({scrollTop: $("#"+id).offset().top-600},'slow');  ---*/
        $("html").animate({scrollTop:300},'slow');
	}; 
}); //end of ready.application



/* Supplemental Functions */
function addCommas(nStr){
    nStr += "";
	x = nStr.split(".");
	x1 = x[0];
				
	if (x.length > 1){
	    x2 = "." + x[1];
	} else {
		x2 = "";
	};
	var test = null;
	var i = 0;
	var y = x1.split("");
    var CommaNum = y.length/3;
	var CommaLoc = 0;
				
    CommaNum += "";
	CommaNum1 = CommaNum.split(".");
	if (CommaNum1[0] >= 1){
        x1 = y[0];
		for (i = 1 ; i <= y.length - 1; i++){
            CommaLoc = (y.length - i)/3;
			CommaLoc += "";
			CommaLoc = CommaLoc.split(".");
            if (CommaLoc.length > 1){
			    x1 = x1  + y[i];
            } else {
				x1 = x1 + "," + y[i];
			};
        };
    }

	return x1 + x2;
};	
