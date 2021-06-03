// This is a small program. There are only two sections. This first section is what runs
// as soon as the page loads and is where you should call your functions.
$(document).ready(function(){
    const $display = $('#display');

    // TODO: Call your apply function(s) here
applyFilterNoBackground(reddify);
applyFilterNoBackground(decreaseBlue);
applyFilter(increaseGreenByBlue);




    render($display, image);
});

/////////////////////////////////////////////////////////
// "apply" and "filter" functions should go below here //
/////////////////////////////////////////////////////////

// TODO 1 & 3: Create the applyFilter function here
function applyFilter(filterFunction){
    for(var i = 0; i < image.length; i++){
        var row = image[i];
        for(var j = 0; j < row.length; j++){
            var rgbString = rgbStringToArray(row[j]);
            filterFunction(rgbString);
            rgbString = rgbArrayToString(rgbString);
            image[i][j] = rgbString;
        }
    }
}

// TODO 5: Create the applyFilterNoBackground function
function applyFilterNoBackground(filterFunction){
    backGroundStr = image[0][0];
    for(var i = 0; i < image.length; i++){
        var row = image[i];
        for(var j = 0; j < row.length; j++){
            
            if(backGroundStr !== row[j]){
              var rgbString = rgbStringToArray(row[j]);
              filterFunction(rgbString);
              rgbString = rgbArrayToString(rgbString);
              image[i][j] = rgbString;
            };
            
        }
    }
}

// TODO 2 & 4: Create filter functions
function reddify(array){
    var maxAmount = 255;
    array[RED] = maxAmount;
}

function decreaseBlue(array){
    var minusAmount = 30;
    var minAmount = 0;
    array[BLUE] = Math.max(array[BLUE] - minusAmount, minAmount);
}

function increaseGreenByBlue(array){
    var maxAmount = 255;
    array[GREEN] = Math.min(array[GREEN] + array[BLUE], maxAmount);
}
// CHALLENGE code goes below here
