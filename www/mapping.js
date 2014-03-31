x_coords = [455,461,468,469,473,477,480,483,462,446,423,338,327,237,204,215,227,239,267,247];
y_coords = [335,317,303,291,281,272,263,251,240,231,218,167,159,139,171,179,187,199,211,260];
coords = [x_coords,y_coords];
num_of_mobile_arr = [1,0,1,1,1,1,0,0,3,1,1,1,0,1,1,1,1,1,1,0];
social_class_arr = [2,2,2,2,2,2,2,2,4,2,2,3,3,3,3,3,3,3,3,3];
num_of_child_arr = [4,0,0,2,1,3,1,4,2,2,1,3,3,0,2,4,0,5,0,3];
//SC-1, ST-2, OBC-3, GN-4, others-5

code_socialClass = {1:"SC",2:"ST",3:"OBC",4:"GN",5:"Others"};
key_codes = [code_socialClass];

colornames = ['#00ffff','#0000ff','#ff00ff','#008000',
              '#00ff00','#800000','#000080','#808000','#800080','#ff0000',
              '#c0c0c0','#008080', '#ffff00'];

function get_colour_code(key,items)
{	
	// This method is to get uniform colour code amongst all possible values for the data
	var colour_code_map =[];
	var colour_incrementer = 0;

	for(var i=0; i<items.length; i++) {
		if(!(items[i] in colour_code_map))
		{
			colour_code_map[items[i]] = colornames[colour_incrementer++];					
		}
	}
	return colour_code_map;
}
function generate_points(key, i,colour_code)
{
	//This method generates individual point with correct colour code based on the key passed	
	var code = colour_code;
	var point = $('<div class="'+key+'"></div>'),
            x = coords[0][i],
            y = coords[1][i];	
        point.css({
            "left": x + "px",
            "top": y + "px",
	    "background-color": code,	
        });
	return point;
}

function get_legend_header(key)
{
	if(key=="socialClass")
	{
		return "Social Class Details:";
	}
	else if(key=="numOfMobile")
	{
		return "Number of Mobile Details:";
	}
	else if(key=="numOfChild")
	{
		return "Number of Children Details:";
	}
	else
	{
		return "";
	}

}

function get_decoded_prop(key, prop)
{
	if(key=="socialClass")
	{
		return key_codes[0][prop];
	}
	else
	{
		return prop;
	}
}
function draw_legend(key,colour_items)
{
        legend_header = get_legend_header(key);
	
	legend_items_div = $('<div id="legend_'+key+'" class="legend_'+key+'"></div>');
	legend_items_div.appendTo($('#legend_items'));

	legend_header_div = $('<div class="legend_header"><h4>'+legend_header+'</h4></div>');
	legend_header_div.appendTo($('#legend_'+key));
	
	
	for(var prop in colour_items)
	{
		value = colour_items[prop];
		colour_block = $('<div class="colour_block"></div>');
		colour_block.css({"background-color":value});
		colour_block.appendTo($('#legend_'+key));
		text = $('<div class="colour_text">'+get_decoded_prop(key,prop)+'</div><br>');
		text.appendTo($('#legend_'+key));
		
	}
}

function map_points(key,items)
{
        //This method generates set of points for a particular key
	var colour_map = get_colour_code(key,items);
	draw_legend(key,colour_map);
	for(i=0; i<x_coords.length; i++) {
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
     
});

function show_social_class()
{
	$(".socialClass, .legend_socialClass").css(
            {'visibility':'visible'}
        );
	
        $(".numOfMobile, .numOfChild, .legend_numOfMobile, .legend_numOfChild").css(
            {'visibility':'hidden'}
        );
}

function show_num_of_mobile()
{
	$(".numOfMobile,.legend_numOfMobile").css(
            {'visibility':'visible'}
        );
        $(".numOfChild, .socialClass, .legend_socialClass, .legend_numOfChild").css(
            {'visibility':'hidden'}
        );
}

function show_num_of_child()
{
	$(".numOfChild,.legend_numOfChild").css(
            {'visibility':'visible'}
        );
        $(".numOfMobile, .socialClass, .legend_numOfMobile, .legend_socialClass").css(
            {'visibility':'hidden'}
        );
}

function show_select_option()
{
        $(".numOfMobile, .socialClass,.numOfChild,.legend_numOfMobile,.legend_socialClass,.legend_numOfChild").css(
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


