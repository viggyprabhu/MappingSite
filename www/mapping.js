x_coords = [455,461,468,469,473,477,480,483,462,446,423,338,327,237,204,215,227,239,267,247];
y_coords = [335,317,303,291,281,272,263,251,240,231,218,167,159,139,171,179,187,199,211,260];
coords = [x_coords,y_coords];
num_of_mobile_arr = [1,0,1,1,1,1,0,0,3,1,1,1,0,1,1,1,1,1,1,0];
social_class_arr = [2,2,2,2,2,2,2,2,4,2,2,3,3,3,3,3,3,3,3,3];
num_of_child_arr = [4,0,0,2,1,3,1,4,2,2,1,3,3,0,2,4,0,5,0,3];

function get_colour_code_for_num_of_mobile(num_of_mobile)
{	
	if(num_of_mobile==0)
	{
		
	}
	else if(num_of_mobile==1)
	{
	
	}
}
function point_num_of_mobile(i)
{
	var point = $('<div class="numOfMobile"></div>'),
            x = coords[0][i],
            y = coords[1][i];
	    colour_code = get_colour_code_for_num_of_mobile(num_of_mobile_arr[i]);	
        point.css({
            left: x + "px",
            top: y + "px"
        });
	return point;
}
function map_num_of_mobile()
{
	//This method maps all the points for Number of Mobiles for each house on the map but all points are hidden.
	    var NumOfMobile = new Array(x_coords.length);
	    for(var i=0; i<NumOfMobile.length; i++) {
		    NumOfMobile[i] = $('#map_wrapper');
		    point = point_num_of_mobile(i); 
		    point.appendTo(NumOfMobile[i]);
	    }
}

function map_social_class()
{
    //This method maps all the points for Social Class for each house on the map but all points are hidden.
    var SocialClass = new Array(x_coords.length);
    for(var i=0; i<SocialClass.length; i++) {
	    SocialClass[i] = $('#map_wrapper');
        var point = $('<div class="socialClass"></div>'),
            x = coords[0][i],
            y = coords[1][i];
        point.css({
            left: x + "px",
            top: y + "px"
        });
        point.appendTo(SocialClass[i]);
    }
}

function map_num_of_child()
{
    //This method maps all the points for Number of children for each house on the map but all points are hidden.
    var NumOfChild = new Array(x_coords.length);
    for(var i=0; i<NumOfChild.length; i++) {
	    NumOfChild[i] = $('#map_wrapper');
        var point = $('<div class="numOfChild"></div>'),
            x = coords[0][i],
            y = coords[1][i];
        point.css({
            left: x + "px",
            top: y + "px"
        });
        point.appendTo(NumOfChild[i]);
    }
}

$(function(){
$(document).ready(function()
{
    map_num_of_mobile();
    map_social_class();
    map_num_of_child();
     
});
/*$('#plot_form').submit(function(ev) {
    ev.preventDefault();
    var map = $('#map_wrapper'),
        point = $('<div class="map-point"></div>'),
        x = $('#lon').val(),
        y = $('#lat').val();
    
    point.css({
        left: x + "px",
        top: y + "px"
    });
    point.appendTo(map);
});

$('#reset').click(function() {
    $('.map-point').remove();
    $('#lat').val('');
    $('#lon').val('');
});*/
function show_social_class()
{
	$('.socialClass').css(
            {'visibility':'visible'}
        );
        $(".numOfMobile, .numOfChild").css(
            {'visibility':'hidden'}
        );
}

function show_num_of_mobile()
{
	$('.numOfMobile').css(
            {'visibility':'visible'}
        );
        $(".numOfChild, .socialClass").css(
            {'visibility':'hidden'}
        );
}

function show_num_of_child()
{
	$('.numOfChild').css(
            {'visibility':'visible'}
        );
        $(".numOfMobile, .socialClass").css(
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


