// // smooth scroll
// $(document).ready(function(){
//     // Add smooth scrolling to all links
//     $("a").on('click', function(event) {

//       // Make sure this.hash has a value before overriding default behavior
//       if (this.hash !== "") {
//         // Prevent default anchor click behavior
//         event.preventDefault();

//         // Store hash
//         var hash = this.hash;

//         // Using jQuery's animate() method to add smooth page scroll
//         // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
//         $('html, body').animate({
//           scrollTop: $(hash).offset().top 
//         }, 500, function(){

//           // Add hash (#) to URL when done scrolling (default click behavior)
//           window.location.hash = hash;
//         });
//       } // End if
//     });
//   });


// goto top on name click
$("a[href='#top']").click(function() {
  $("html, body").animate({ scrollTop: 0 }, "slow");
  return false;
});


// collapse navbar on item click (phone view)
$('.nav>li>a').on('click', function(){
    $('.navbar-collapse').removeClass('show');
});


$(document).ready(function() {
  $('a[href="#about"]').click(function() {
      var target = $(this.hash);
      if (target.length == 0) target = $('a[name="' + this.hash.substr(1) + '"]');
      if (target.length == 0) target = $('html');
      $('html, body').animate({ scrollTop: target.offset().top-100 }, 1000);
      return false;
  });
});

// document.getElementById('aboutFocus').focus();


$(document).ready(function() {
  $('a[href="#projects"]').click(function() {
      var target = $(this.hash);
      if (target.length == 0) target = $('a[name="' + this.hash.substr(1) + '"]');
      if (target.length == 0) target = $('html');
      $('html, body').animate({ scrollTop: target.offset().top+50 }, 1000);
      return false;
  });
});



$(document).ready(function() {
  $('a[href="#contact"]').click(function() {
      var target = $(this.hash);
      if (target.length == 0) target = $('a[name="' + this.hash.substr(1) + '"]');
      if (target.length == 0) target = $('html');
      $('html, body').animate({ scrollTop: target.offset().top-100 }, 1000);
      return false;
  });
});

