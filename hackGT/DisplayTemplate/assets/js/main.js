Firebase.enableLogging(true);
var firebaseReadRef= new Firebase("https://ohanahacks-65bae.firebaseio.com");

var tagsToSee = [];
var allDonateLinks = new Map();
var allVolunteerLinks = new Map();
var allPetitionLinks = new Map();
var allEventLinks = new Map();
var allLearnMoreLinks = new Map();

$(document).ready(function() {
    $(".accordion>li:first-of-type>.submenu").slideDown().addClass("active").parent().addClass("open");
    $(".link").click(function() {

        var y = $(this).parent().find(".submenu").hasClass("active");
        if (y == 0) {
            var x = $(this).parents(".accordion").find(".submenu").hasClass("active");
            if (x == 1) {
                $(this).parents(".accordion").find(".active").slideUp().removeClass("active").parent().removeClass("open");
            }
            $(this).parent().find(".submenu").slideDown().addClass("active").parent().addClass("open");
        } else {
            $(this).parent().find(".submenu").slideUp().removeClass("active").parent().removeClass("open");
        }
    })


    $(".cancel").click(function() {
        $(".twitter-frame").slideUp();
    })

    $('#form').submit(function(event) {
        event.preventDefault();

        var hashTagArray = $('#hashtag').val().split(' ');
        var link = $('#link').val();
        var title = $('#title').val();
        var category = $('#category-selector').val();

        for (var tag of hashTagArray) {
            // console.log(tag, title, link, category);
            pushData(tag.toLowerCase(), title, link, category);
        }
    });

    $(".submit-it").click(function() {
        $(".views").addClass("moveleft");
        $(".views").removeClass("moveright");
    })

    $(".cancel-button").click(function() {
        $(".views").addClass("moveright");
        $(".views").removeClass("moveleft");
    })

    $(".submit-now").click(function() {
        $(".views").addClass("moveleft-2x");
    })

    var selector = document.getElementById("tag-selector");

    // while (selector.firstChild) {
    //     parent.removeChild(parent.firstChild);
    // }

    var hashTags = location.href.split('?')[1].split("=")[1];
    var allTags = hashTags.split("#");

    for(var i in allTags){
        if(allTags[i].length>0){
            var singleTag = "#" + allTags[i];
            var option = document.createElement('option');
            option.setAttribute("value", singleTag);
            option.innerHTML = singleTag;
            selector.appendChild(option);

        }
    }

    console.log(selector);
    onTagInit();

});

function onTagInit(){
    var selector = document.getElementById("tag-selector");
    var hashValue = selector.options[0].value;
    getLinksForHash(hashValue);
}


function onTagChange(){
    var selector = document.getElementById("tag-selector");
    var hashValue = selector.options[ selector.selectedIndex ].value;
    getLinksForHash(hashValue);
}

function updateChildUI(){

    $(".accordion>li>.submenu").hide().removeClass("active").parent().removeClass("open");

    var found = 0;
    var singleLinkObject = document.getElementsByClassName("singleLinkElement")[0];

    var parent = document.getElementsByClassName("donate")[0];
    if(allDonateLinks.size==0){
        parent.style.display = "none";
    }else{
        parent.style.display = "block";

        if(found==0){
            $(".accordion>li:nth-of-type(" + 1 + ")>.submenu").slideDown().addClass("active").parent().addClass("open");
            found=1;
        }

        var subParent = document.querySelectorAll(".donate .submenu")[0];
        subParent.innerHTML = "";
        for(var i of allDonateLinks){
            var singleLinkObjectNew = singleLinkObject.cloneNode(true);
            singleLinkObjectNew.querySelector(".singleLinkTitle").innerText = i[1]['title'];
            singleLinkObjectNew.querySelector(".singleLinkURL").setAttribute('href', i[0]);
            singleLinkObjectNew.style.display = 'block';
            subParent.appendChild(singleLinkObjectNew);
        }

    }

    var parent = document.getElementsByClassName("volunteer")[0];
    if(allVolunteerLinks.size==0){
        parent.style.display = "none";
    }else{
        parent.style.display = "block";

        if(found==0){
            $(".accordion>li:nth-of-type(" + 2 + ")>.submenu").slideDown().addClass("active").parent().addClass("open");
            found=2;
        }

        var subParent = document.querySelectorAll(".volunteer .submenu")[0];
        subParent.innerHTML = "";
        for(var i of allVolunteerLinks){
            var singleLinkObjectNew = singleLinkObject.cloneNode(true);
            singleLinkObjectNew.querySelector(".singleLinkTitle").innerText = i[1]['title'];
            singleLinkObjectNew.querySelector(".singleLinkURL").setAttribute('href', i[0]);
            singleLinkObjectNew.style.display = 'block';
            subParent.appendChild(singleLinkObjectNew);
        }

    }

    var parent = document.getElementsByClassName("petitions")[0];
    if(allPetitionLinks.size==0){
        parent.style.display = "none";
    }else{
        parent.style.display = "block";

        if(found==0){
            $(".accordion>li:nth-of-type(" + 3 + ")>.submenu").slideDown().addClass("active").parent().addClass("open");
            found=3;
        }

        var subParent = document.querySelectorAll(".petitions .submenu")[0];
        subParent.innerHTML = "";
        for(var i of allPetitionLinks){
            var singleLinkObjectNew = singleLinkObject.cloneNode(true);
            singleLinkObjectNew.querySelector(".singleLinkTitle").innerText = i[1]['title'];
            singleLinkObjectNew.querySelector(".singleLinkURL").setAttribute('href', i[0]);
            singleLinkObjectNew.style.display = 'block';
            subParent.appendChild(singleLinkObjectNew);
        }

    }

    var parent = document.getElementsByClassName("events")[0];
    if(allEventLinks.size==0){
        parent.style.display = "none";
    }else{
        parent.style.display = "block";

        if(found==0){
            $(".accordion>li:nth-of-type(" + 4 + ")>.submenu").slideDown().addClass("active").parent().addClass("open");
            found=4;
        }

        var subParent = document.querySelectorAll(".events .submenu")[0];
        subParent.innerHTML = "";
        for(var i of allEventLinks){
            var singleLinkObjectNew = singleLinkObject.cloneNode(true);
            singleLinkObjectNew.querySelector(".singleLinkTitle").innerText = i[1]['title'];
            singleLinkObjectNew.querySelector(".singleLinkURL").setAttribute('href', i[0]);
            singleLinkObjectNew.style.display = 'block';
            subParent.appendChild(singleLinkObjectNew);
        }

    }

    var parent = document.getElementsByClassName("learn-more")[0];
    if(allLearnMoreLinks.size==0){
        parent.style.display = "none";
    }else{
        parent.style.display = "block";

        if(found==0){
            $(".accordion>li:nth-of-type(" + 5 + ")>.submenu").slideDown().addClass("active").parent().addClass("open");
            found=5;
        }

        var subParent = document.querySelectorAll(".learn-more .submenu")[0];
        subParent.innerHTML = "";
        for(var i of allLearnMoreLinks){
            var singleLinkObjectNew = singleLinkObject.cloneNode(true);
            singleLinkObjectNew.querySelector(".singleLinkTitle").innerText = i[1]['title'];
            singleLinkObjectNew.querySelector(".singleLinkURL").setAttribute('href', i[0]);
            singleLinkObjectNew.style.display = 'block';
            subParent.appendChild(singleLinkObjectNew);
        }

    }

    console.log(allDonateLinks);
    console.log(allVolunteerLinks);
    console.log(allPetitionLinks);
    console.log(allEventLinks);
    console.log(allLearnMoreLinks);
}
