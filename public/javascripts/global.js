// Userlist data array for filling in info box
var cardSetData = [];

// DOM Ready =============================================================
$(document).ready(function() {

    // Populate the user table on initial page load
    populateTable();

    // Username link click
   $('#cardList table tbody').on('click', 'td a.linkshowcard', showCardInfo);
   $('#btnFilter').on('click', getCards);

});

// Functions =============================================================

// Fill table with data
function populateTable() {

    // Empty content string
    var tableContent = '';

    // jQuery AJAX call for JSON
    $.getJSON( '/deckbuilder/cardList', function( data ) {
        cardSetData = data;
        // For each item in our JSON, add a table row and cells to the content string
        $.each(data, function(){
            tableContent += '<tr>';
            tableContent += '<td><a href="#" class="linkshowcard" rel="' + this.name + '">' + this.name + '</a></td>';
            tableContent += '<td>' + this.type + '</td>';
            tableContent += '<td>' + this.power + '/' + this.toughness + '</td>';
            tableContent += '<td><a href="#" class="" rel="' + this._id + '">add</a></td>';
            tableContent += '</tr>';
        });

        // Inject the whole content string into our existing HTML table
        $('#cardList table tbody').html(tableContent);
    });
};

// Show Card Info
function showCardInfo(event) {

    // Prevent Link from Firing
    event.preventDefault();

    // Retrieve cardname from link rel attribute
    var thisCardName = $(this).attr('rel');

    // Get Index of object based on id value
    var arrayPosition = cardSetData.map(function(arrayItem) { return arrayItem.name; }).indexOf(thisCardName);

    // Get our Card Object
   var thisCardObject = cardSetData[arrayPosition];
   var powerTougness = thisCardObject.power + ' / ' + thisCardObject.toughness;

   //Populate Info Box
   $('#cardName').text(thisCardObject.name);
   $('#cardType').text(thisCardObject.type);
   $('#cardManaCost').text(thisCardObject.manaCost);
   $('#cardSet').text('na');
   $('#cardText').text(thisCardObject.text);
   $('#cardFlavor').text(thisCardObject.flavor);
   $('#cardPowerToughness').text(powerTougness);

   // populate image
   $('#cardSpoiler').attr('src', 'http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=' + thisCardObject.multiverseid + '&type=card');


}

// Get Cards
function getCards(event) {
    event.preventDefault();

    // Super basic validation - increase errorCount variable if any fields are blank
    var errorCount = 0;
    $('#addUser input').each(function(index, val) {
        if($(this).val() === '') { errorCount++; }
    });

    // Check and make sure errorCount's still at zero
    if(errorCount === 0) {

        // If it is, compile all user info into one object
        var newUser = {
            'username': $('#addUser fieldset input#inputUserName').val(),
            'email': $('#addUser fieldset input#inputUserEmail').val(),
            'fullname': $('#addUser fieldset input#inputUserFullname').val(),
            'age': $('#addUser fieldset input#inputUserAge').val(),
            'location': $('#addUser fieldset input#inputUserLocation').val(),
            'gender': $('#addUser fieldset input#inputUserGender').val()
        }

        // Use AJAX to post the object to our adduser service
        $.ajax({
            type: 'POST',
            data: newUser,
            url: '/deckbuilder/cardList',
            dataType: 'JSON'
        }).done(function( response ) {

            // Check for successful (blank) response
            if (response.msg === '') {

                // Clear the form inputs
                // $('#addUser fieldset input').val('');

                // Update the table
                populateTable();

            }
            else {

                // If something goes wrong, alert the error message that our service returned
                alert('Error: ' + response.msg);

            }
        });
    }
    else {
        // If errorCount is more than 0, error out
        alert('Please fill in all fields');
        return false;
    }
};
