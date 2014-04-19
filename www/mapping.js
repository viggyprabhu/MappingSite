(function ($) {
    "use strict";
    
    var x_coords = [ 454, 459, 465, 469, 471, 477, 480, 481, 462, 445, 424, 340, 327, 236, 205, 214, 226,  239, 267, 248, 261, 274, 170, 320, 342, 354, 365, 385, 393, 366, 379, 399, 414, 431, 448, 463, 470, 475, 462, 433, 459, 470, 482, 515],
        y_coords =  [334, 316, 303, 291, 280, 270, 263, 251, 241, 232, 217, 167, 159, 139, 171, 179, 185, 197, 210, 259, 267, 273, 169, 121, 138, 131, 124, 114, 130, 154, 159, 154, 150, 145, 138, 160, 172, 184, 190, 193, 216, 222, 227, 252],
        coords = [x_coords, y_coords],
        num_of_mobile_arr =  [1, 0, 1, 1, 1, 1, 0, 0, 3, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 2],
        social_class_arr =  [2, 2, 2, 2, 2, 2, 2, 2, 4, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 4, 2, 2, 2],
        num_of_child_arr =  [4, 0, 0, 2, 1, 3, 1, 4, 2, 2, 1, 3, 3, 0, 2, 4, 0, 5, 0, 3, 2, 1, 0, 0, 5, 5, 2, 0, 0, 5, 0, 5, 1, 3, 1, 5, 6, 0, 5, 0, 0, 3, 0, 0],
        priority_class_arr =  [0, 4, 0, 0, 2, 0, 2, 0, 1, 2, 2, 0, 0, 2, 0, 0, 0, 0, 2, 0, 2, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 2, 0],

        keys = ["numOfMobile", "numOfChild", "socialClass", "priorityClass"],
        arrs = [num_of_mobile_arr, num_of_child_arr, social_class_arr, priority_class_arr],

    //SC-1, ST-2, OBC-3, GN-4, others-5
        code_socialClass = {1 : "SC", 2 : "ST", 3 : "OBC", 4 : "GN", 5 : "Others"},

    // Not Applicale-0, Disabled/handicapped-1, Single women/widow-2, Women headed household-3, others(old/destitute etc)-4
        code_priorityClass = {0 : "Not Applicable", 1 : "Disabled/handicapped", 2 : "Single women/widow", 3 : "Women headed household", 4 : "others(old/destitute etc)"},

        key_codes = [code_socialClass, code_priorityClass],

        current_divs = [],

        colornames = ['#00ffff', '#0000ff', '#ff00ff', '#008000',
              '#00ff00', '#800000', '#000080', '#808000', '#800080', '#ff0000',
              '#c0c0c0', '#008080', '#ffff00'],
        
        selected_village = "",
        selectedFilter = "",
        //ImageSize can be 0 or 1, 0-small, 1-big   
        imageSize = 0;

    function get_colour_code(key, items) {
        // This method is to get uniform colour code amongst all possible values for the data
        var colour_code_map = [],
            i,
            colour_incrementer = 0;
        for (i = 0; i < items.length; i += 1) {
            if (!(items[i] in colour_code_map)) {
                colour_code_map[items[i]] = colornames[colour_incrementer += 1];
            }
        }
        return colour_code_map;
    }
    
    function get_decoded_prop(key, prop) {
        if (key == "socialClass") {
            return key_codes[0][prop];
        } else if (key == "priorityClass") {
            return key_codes[1][prop];
        } else {
            return prop;
        }
    }

    function get_title(i) {
        var houseID = parseInt(i) + 1,
            sC,
            pC,
            numMob;
        sC = get_decoded_prop("socialClass", social_class_arr[i]);
        pC = get_decoded_prop("priorityClass", priority_class_arr[i]);
        numMob = get_decoded_prop("numOfMobile", num_of_mobile_arr[i]);
        return "House #" + houseID + "\nSocial Class : " + sC + "\nPriority Class : " + pC + "\nNumber of Mobile : " + numMob;

    }

    function scaleAsSizeFactor(toScale) {
        var sizeFactor = 1;
        if(imageSize == 1) {
            sizeFactor = 1.5;
        }
        return toScale*sizeFactor;
    }
    function generate_points(key, i, colour_code) {
        //This method generates individual point with correct colour code based on the key passed
        var code = colour_code,
            point = $('<div class="'+key+'"></div>'),
            x = coords[0][i],
            y = coords[1][i],
            houseID;
        
        point.css({
            "left": scaleAsSizeFactor(x-4) + "px",
            "top": scaleAsSizeFactor(y-4) + "px",
        "background-color": code,	
        }),
        houseID = parseInt(i)+1;
        point.attr('title',get_title(i));
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
        else if(key=="priorityClass")
        {
            return "Priority Class Details:";
        }
        else
        {
            return "";
        }

    }

    function draw_legend(key,colour_items)
    {
        var legend_header = get_legend_header(key),
            legend_header_div,
            value,
            colour_block,
            text,
            legend_items_div = $('<div id="legend_'+key+'" class="legend_'+key+'"></div>');
            
        legend_items_div.appendTo($('#legend_items'));
        legend_header_div = $('<div class="legend_header"><h4>'+legend_header+'</h4></div>');
        legend_header_div.appendTo($('#legend_'+key));
        $("#legend_fields").css(
            { 'margin-left':scaleAsSizeFactor(600)}
            );

        for(var prop in colour_items)
        {
            value = colour_items[prop];
            colour_block = $('<div class="colour_block"></div>');
            colour_block.css({"background-color":value});
            colour_block.appendTo($('#legend_'+key));
            text = $('<div class="colour_text">'+get_decoded_prop(key,prop)+'</div><br>');
            text.appendTo($('#legend_'+key));

        }
        return legend_items_div;
    }

    function map_points(key,items)
    {
            //This method generates set of points for a particular key
        var colour_map = get_colour_code(key,items),
            currentDivs = [],
            point;
        currentDivs["legend"] = draw_legend(key,colour_map);
        var points = [];
        for(var i=0; i<x_coords.length; i++) {
                point = generate_points(key,i,colour_map[items[i]]); 
            point.appendTo($('#map_wrapper'));
            points[i] = point;
        }
        currentDivs["points"] = points;
        return currentDivs;
    }

    function showKey(key,display)
    {
        var displayValue = "hidden";
        if(display)
        {
            displayValue = "visible";
        }
        $("."+key+", .legend_"+key).css(
                {'visibility':displayValue}
            );
    }

    function remove_current_divs()
    {
        var i;
        if("legend" in current_divs)
        {
            var legendDiv = current_divs["legend"];
            legendDiv.remove();
            var pointsDivs = current_divs["points"];	
            for(i=0;i<pointsDivs.length;i++)
            {
                pointsDivs[i].remove();
            }	
        }
    }

    function add_current_divs(newDivs)
    {
        current_divs = newDivs;
    }

    function show_points(key, arr)
    {
        remove_current_divs();
        var newDivs = map_points(key,arr);
        add_current_divs(newDivs);
    }

    function show_selected_key()
    {
        var key=selectedFilter;
        for(var i in keys)
        {
            if(keys[i]==key)
            {
                show_points(key,arrs[i]);		
                showKey(key,1);
            }
            else
            {
                showKey(keys[i],0);
            }
        }
    }

    $(function(){

        //Method to listen to change of Criteria selection list
        $("#selectionField").change(function() {
            selectedFilter = this.value; 
            show_selected_key();
        });

        //Method to listen to change of Village selection list
        $("#selectionVillage").change(function() {
            var village = this.value;
            if(village=="select") {
                $("#selectionField").prop("disabled", true);
                selected_village="";
            } else {
                selected_village=village;
                $("#selectionField").prop("disabled", false);
            }
        });

        //Initiate the jquery tooltip
        $( "[title]" ).tooltip();

        //Initiate Jquery button for SizeSeletion buttons
        $('#sizeSelection').buttonset();

        /* $('#').click(function() {
            var selValue = $('input[name=rbnNumber]:checked').val(); 
            $('p').html('<br/>Selected Radio Button Value is : <b>' + selValue + '</b>');
        });*/

        $("#small").click(function() {
            imageSize=0;
            $("#villageImage").removeAttr("src").attr("src", "images/kataria-small.jpg").attr("width",scaleAsSizeFactor(600)).attr("height",scaleAsSizeFactor(397));
            show_selected_key();
            
        });

        $("#big").click(function() {
            imageSize=1;
            $("#villageImage").removeAttr("src").attr("src", "images/kataria-big.jpg").attr("width", scaleAsSizeFactor(600)).attr("height",scaleAsSizeFactor(397));
            show_selected_key();
            
        });
    });
})(jQuery);