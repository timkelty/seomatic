// LOAD EVENTS

/* -- Define our dynamic XXX drop-down menu items */

var selectedItem = "";

var items = {
    'Airline':  [
        ],
    'Corporation': [
        ],
    'EducationalOrganization': [
            {name: '', value:''},
            {name: 'College Or University', value:'CollegeOrUniversity'},
            {name: 'Elementary School', value:'ElementarySchool'},
            {name: 'High School', value:'HighSchool'},
            {name: 'Middle School', value:'MiddleSchool'},
            {name: 'Preschool', value:'Preschool'},
            {name: 'School', value:'School'},
        ],
    'GovernmentOrganization': [
        ],
    'LocalBusiness': [
            {name: '', value:''},
            {name: 'Animal Shelter', value:'AnimalShelter'},
        ],
    'NGO': [
        ],
    'PerformingGroup': [
            {name: '', value:''},
            {name: 'DanceGroup', value:'DanceGroup'},
            {name: 'Music Group', value:'MusicGroup'},
            {name: 'Theater Group', value:'TheaterGroup'},
        ],
    'SportsOrganization': [
            {name: '', value:''},
            {name: 'Sports Team', value:'SportsTeam'},
        ],
    };

function setSelectedValue(whichValue) {
    selectedItem = whichValue;
} /* -- setSelectedValue */

function fillDynamicMenu(whichValue) {
    var menu = $("#siteOwnerSpecificType");

    menu.empty();
    if (items[whichValue]) {
        $.each(items[whichValue], function(){
            $("<option />")
            .attr("value", this.value)
            .html(this.name)
            .appendTo(menu);
        });
    }
} /* -- fillDynamicMenu */

$(function () {

/* -- Set the panes to the right visibility based on the settings */

    $('.metaPane').hide();
    $('.metaSubPane').hide();
    $('.metaSpecificPane').hide();

    var value = $('#siteOwnerType').val();
    value = value.capitalizeFirstLetter();
    $('#'+value).show();

    if (value =="Person") {
        $('#siteOwnerSubType-field').hide();
        $('#siteOwnerSpecificType-field').hide();
        $('#siteOwnerSubType').val("");
        $('#siteOwnerSpecificType').val("");
        $('#siteOwnerSubType').prop('selectedIndex', -1);
        $('#siteOwnerSpecificType').prop('selectedIndex', -1);
    }

    var value = $('#siteOwnerSubType').val();
    $('#'+value).show();

/* -- Fill in the dynamic menu */

    fillDynamicMenu(value);

    $('#siteOwnerSpecificType').val(selectedItem);
    var value = $('#siteOwnerSpecificType').val();
    if ($('#'+value).length != 0)
        $('#'+value).show();

    if ($("#siteOwnerSpecificType option").length == 0) {
        $('#siteOwnerSpecificType-field').hide();
        $('#siteOwnerSpecificType').val("");
        $('#siteOwnerSpecificType').prop('selectedIndex', -1);
    }

/* -- Handle clicks on the siteOwnerType dropdown */

    $('#siteOwnerType').on('change', function(e) {
        $('.metaPane').hide();
        $('.metaSubPane').hide();
        $('.metaSpecificPane').hide();
        $('#'+this.value).show();
        $('#siteOwnerSubType-field').show();
        $('#siteOwnerSpecificType-field').show();
        var value = $('#siteOwnerSubType').val();
        $('#'+value).show();
        if (this.value =="Person") {
            $('#siteOwnerSubType-field').hide();
            $('#siteOwnerSpecificType-field').hide();
            $('#siteOwnerSubType').val("");
            $('#siteOwnerSpecificType').val("");
            $('#siteOwnerSubType').prop('selectedIndex', -1);
            $('#siteOwnerSpecificType').prop('selectedIndex', -1);
        }

        fillDynamicMenu(value);

        var value = $('#siteOwnerSpecificType').val();
        if ($('#'+value).length != 0)
            $('#'+value).show();
        if ($("#siteOwnerSpecificType option").length == 0) {
            $('#siteOwnerSpecificType-field').hide();
            $('#siteOwnerSpecificType').val("");
            $('#siteOwnerSpecificType').prop('selectedIndex', -1);
        }
    });

/* -- Handle clicks on the siteOwnerSubType dropdown */

    $('#siteOwnerSubType').on('change', function(e) {
        $('.metaSubPane').hide();
        $('.metaSpecificPane').hide();
        $('#'+this.value).show();

        fillDynamicMenu(this.value);

        var value = $('#siteOwnerSpecificType').val();
        if ($('#'+value).length != 0)
            $('#'+value).show();
        $('#siteOwnerSpecificType-field').show();
        if ($("#siteOwnerSpecificType option").length == 0) {
            $('#siteOwnerSpecificType-field').hide();
            $('#siteOwnerSpecificType').val("");
            $('#siteOwnerSpecificType').prop('selectedIndex', -1);
        }
    });

/* -- Handle clicks on the siteOwnerSpecificType dropdown */

    $('#siteOwnerSpecificType').on('change', function(e) {
        $('.metaSpecificPane').hide();
        if ($('#'+this.value).length != 0)
            $('#'+this.value).show();
    });

/* -- Handle clicks on the "Look up Latitude/Longitude" button  */

    $('#geolookup').on('click', function(e) {
        address = $('#genericOwnerStreetAddress').val() + ", "
                    + $('#genericOwnerAddressLocality').val() + ", "
                    + $('#genericOwnerAddressRegion').val() + ", "
                    + $('#genericOwnerPostalCode').val() + ", "
                    + $('#genericOwnerAddressCountry').val();
        $.ajax({
            url:"http://maps.googleapis.com/maps/api/geocode/json?address="+address+"&sensor=false",
            type: "POST",
            success:function(res) {
                $('#geolookup-errors').hide();
                if (res.results.length) {
                    $('#genericOwnerGeoLatitude').val(res.results[0].geometry.location.lat);
                    $('#genericOwnerGeoLongitude').val(res.results[0].geometry.location.lng);
                } else {
                    $('#geolookup-errors').show();
                }
            }
        });
    });

});

String.prototype.capitalizeFirstLetter = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}
