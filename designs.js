// REGISTER DOCUMENT READY HANDLER
$(function () {

    // FUNCTION DEFINITION: Create a grid using HTML table elements
    function makeGrid(height, width) {
        console.log(`>> makeGrid(${height}, ${width})`);
        const table = $('#pixel_canvas');
        // Clear the previous table before creating a new one
        table.empty();
        // Create new grid
        for (let r = 1; r <= height; r++) {
            const row = $('<tr></tr>');
            table.append(row);
            for (let c = 1; c <= width; c++) {
                const cell = $('<td></td>');
                row.append(cell);
            }
        }
    }

    // FUNCTION DEFINITION: Call makeGrid() or send alert
    function checkGrid() {
        // Get the grid dimensions submitted by the user:
        const gridHeight = $('input[type=number][name=height]').val();
        const gridWidth = $('input[type=number][name=width]').val();
        // Check the submitted dimensions against max and min dimensions allowed:
        if ((gridHeight > 0 && gridWidth > 0) && (gridHeight < 50 && gridWidth < 50)) {
            console.log('Grid dimension limits respected.');
            makeGrid(gridHeight, gridWidth);
        } else {
            console.log('Grid dimension limits not respected.');
            alert('No can do! :) Please input an integer greater than 0 and less than 50.');
        }
    }

    // EVENT LISTENER: Upon the user submitting grid size, check if anything was drawn and call checkGrid()
    $('input[type=submit]').click(function (event) {
        // Prevent form submission
        event.preventDefault(); // document where got this from
        // Check whether the user has drawn anything:
        // (https://stackoverflow.com/questions/10641258/jquery-select-data-attributes-that-arent-empty)
        const colorCheck = $('td[style][style!=""]').length;
        console.log(`Has the user drawn something: ${colorCheck > 0}. This many cells were colored: ${colorCheck}`);
        // If the user has drawn something, ask for confirmation of grid change
        if (colorCheck === 0) {
            checkGrid();
        } else if (confirm('Careful! Submitting a grid size will also clear your art. Please confirm submission.')) {
            console.log('The user has confirmed the grid change');
            checkGrid();
        } else {
            console.log('The user has cancelled the grid change.');
        }
        // Prevent form submission
        return false;
    });

    // EVENT LISTENER: Log the color picked by the user
    $('#colorPicker').on('input', function () {
        console.log(`The user has selected the color ${$('#colorPicker').val()}`);
    });

    // EVENT LISTENER: Upon the user clicking a grid cell, change the cell background color appropriately
    // My HEX-to-RGB color converter <div>
    const colorConverter = $('<div></div>');
    // Event Listener:
    $('#pixel_canvas').on('click', 'td', function () {
        // Get the value of the color picked by the user
        const colorPicked = $('#colorPicker').val();
        console.log(`>> The current color picked in HEX is ${colorPicked}`); // analytics code
        // Convert the color picked from HEX to RGB format by assigning it to a non-attached <div> element
        const colorPickedRGB = colorConverter.css('background-color', colorPicked).css('background-color');
        console.log(`>> The current color picked in RGB is ${colorPickedRGB}`); // analytics code
        // Get the initial background-color value of the clicked cell
        const colorStart = $(this).css('background-color');
        // Set the clicked cell's color back to white, or to a new color depending on:
        if (colorStart === colorPickedRGB) {
            $(this).removeAttr('style');
            console.log(`>> This cell ${JSON.stringify(this)} was colored ${colorStart}. It is now blank canvas.`); // analytics code
        } else {
            $(this).css('background-color', colorPicked);
            console.log(`>> This cell was colored ${colorStart}. It is now ${colorPicked}.`); // analytics code
        }
    });

    // EVENT LISTENER: Upon the user clicking the 'clean canvas' button --> clear grid of any colours but keep at current user-selected size
    $('input[type=button]').click(function () {
        $('td').removeAttr('style');
    });

});