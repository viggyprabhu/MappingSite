x_coords = [455,461,468,469,473,477,480,483,462,446,423,338,327,237,204,215,227,239,267,247];
y_coords = [335,317,303,291,281,272,263,251,240,231,218,167,159,139,171,179,187,199,211,260];
coords = [x_coords,y_coords];
num_of_mobile_arr = [1,0,1,1,1,1,0,0,3,1,1,1,0,1,1,1,1,1,1,0];
social_class_arr = [2,2,2,2,2,2,2,2,4,2,2,3,3,3,3,3,3,3,3,3];
num_of_child_arr = [4,0,0,2,1,3,1,4,2,2,1,3,3,0,2,4,0,5,0,3];

function rgbToHex(r, g, b) {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

function get_colour_code(key,items)
{	
	// This method is to get uniform colour code amongst all possible values for the data
	var colour_code_map =[];
	var colour_incrementer =1;
	var interval = 255/(items.filter(function (value, index, self) { 
	    			return self.indexOf(value) === index;
				}).length);

	for(var i=0; i<items.length; i++) {
		if(!(items[i] in colour_code_map))
		{
			var code = interval*colour_incrementer++;
			colour_code_map[items[i]] = rgbToHex(255,255-code,code);					
		}
	}
	return colour_code_map;
}
function generate_points(key, i,colour_code)
{
	//This method generates individual point with correct colour code based on the key passed	
	var code = colour_code;
	var key1 = "mapPoint";
	var point = $('<div id ="'+key+'" class="'+key1+'"></div>'),
            x = coords[0][i],
            y = coords[1][i];	
        point.css({
            "left": x + "px",
            "top": y + "px",
	    "background-color": code,	
        });
	return point;
}

function map_points(key,items)
{
        //This method generates set of points for a particular key
	var colour_map = get_colour_code(key,items);
	for(var i=0; i<x_coords.length; i++) {
	        point = generate_points(key,i,colour_map[items[i]]); 
		point.appendTo($('#map_wrapper'));
	}
}


$(function(){
$(document).ready(function()
{
    map_points("numOfMobile",num_of_mobile_arr);
    map_points("socialClass",social_class_arr);
    map_points("numOfChild",num_of_child_arr);
    //draw_legend("numOfMobile",num_of_mobile_arr);
     
});

function show_social_class()
{
	$('#socialClass').css(
            {'visibility':'visible'}
        );
        $("#numOfMobile, #numOfChild").css(
            {'visibility':'hidden'}
        );
}

function show_num_of_mobile()
{
	$('#numOfMobile').css(
            {'visibility':'visible'}
        );
        $("#numOfChild, #socialClass").css(
            {'visibility':'hidden'}
        );
}

function show_num_of_child()
{
	$('#numOfChild').css(
            {'visibility':'visible'}
        );
        $("#numOfMobile, #socialClass").css(
            {'visibility':'hidden'}
        );
}

function show_select_option()
{
        $(".numOfMobile, .socialClass,.numOfChild").css(
            {'visibility':'hidden'}
        );
}

$("#selectionField").change(function() {
    var filter = this.value 
    if(filter == "SocialClass")
    {
	show_social_class(); 
    }
    if(filter == "NumOfMobile")
    {
        show_num_of_mobile();
    }
    if(filter == "NumOfChild")
    { 
        show_num_of_child();
    }
    if(filter == "Select")
    { 
        show_select_option();
    }
 });
});


