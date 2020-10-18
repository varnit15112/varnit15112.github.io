Firebase.enableLogging(true);
var firebaseReadRef= new Firebase("https://ohanahacks-65bae.firebaseio.com");

function getAllHashTags(){
    tagsToSee =  new Array();
    firebaseReadRef.once('value',function(snapshot) {
        snapshot.forEach((child) => {
            var allHashData = child.val();
            var singleHash = allHashData['hash'];
            tagsToSee.push(singleHash);
        });
        updateTags();
    });
}

// pushData("#SaveLives", "Save Lives Donation Link New", "https://www.blacklivesmatteratl223e2r2.org/", "volunteer");
function pushData(hashTag, title, url, type){
    firebaseReadRef.once('value',function(snapshot) {
        var found = 0;
        snapshot.forEach((child) => {
            var randomHashValue = child.name();
            var allHashData = child.val();
            var singleHash = allHashData['hash'];
            if(hashTag == singleHash && found == 0){
                var fr= new Firebase("https://ohanahacks-65bae.firebaseio.com/" + randomHashValue + "/links" );
                fr.push({title: title, type: type, url: url});
                found=1;
            }
        });
        if (found==0){
            console.log("not found");
            var fr= new Firebase("https://ohanahacks-65bae.firebaseio.com/");
            fr.push({hash: hashTag});
            pushData(hashTag, title, url, type);
        }else{
            console.log("found");
        }
    });
}


// getLinksForHash("#blm");
function getLinksForHash(hashTag){

    allDonateLinks = new Map();
    allVolunteerLinks = new Map();
    allPetitionLinks = new Map();
    allEventLinks = new Map();
    allLearnMoreLinks = new Map();

    firebaseReadRef.once('value',function(snapshot) {
        var found = 0;
        snapshot.forEach((child) => {
            var randomHashValue = child.name();
            var allHashData = child.val();
            var singleHash = allHashData['hash'];
            if(hashTag == singleHash && found == 0){
                found=1;
                allLinks = allHashData['links'];
                for (var prop in allLinks) {
                    var singleLink = allLinks[prop];
                    var title = singleLink['title'];
                    var url = singleLink['url'];
                    var type = singleLink['type'];
                    if(type == "donate"){
                        if(allDonateLinks.has(url)){
                            var score = allDonateLinks.get(url)['score'];
                            allDonateLinks.set( url, { title: title, score: score+1});
                        }else{
                            allDonateLinks.set( url, { title: title, score: 1});
                        }
                    }
                    else if(type == "volunteer"){
                        if(allVolunteerLinks.has(url)){
                            var score = allVolunteerLinks.get(url)['score'];
                            allVolunteerLinks.set( url, { title: title, score: score+1});
                        }else{
                            allVolunteerLinks.set( url, { title: title, score: 1});
                        }
                    }
                    else if(type == "petition"){
                        if(allPetitionLinks.has(url)){
                            var score = allPetitionLinks.get(url)['score'];
                            allPetitionLinks.set( url, { title: title, score: score+1});
                        }else{
                            allPetitionLinks.set( url, { title: title, score: 1});
                        }
                    }
                    else if(type == "event"){
                        if(allEventLinks.has(url)){
                            var score = allEventLinks.get(url)['score'];
                            allEventLinks.set( url, { title: title, score: score+1});
                        }else{
                            allEventLinks.set( url, { title: title, score: 1});
                        }
                    }
                    else if(type == "learn-more"){
                        if(allLearnMoreLinks.has(url)){
                            var score = allLearnMoreLinks.get(url)['score'];
                            allLearnMoreLinks.set( url, { title: title, score: score+1});
                        }else{
                            allLearnMoreLinks.set( url, { title: title, score: 1});
                        }
                    }
                }
            }
        });
        updateChildUI();
    });
}
