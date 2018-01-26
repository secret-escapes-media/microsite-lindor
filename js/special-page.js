// Special page specific JS goes here
// Gets added as a separate link after the main js in the head

// vvvvvv things like this vvvvvv


// ///////////////////////////////////////
// //      Expand Interview
// ///////////////////////////////////////
//
// $('.js-interview').hide();
// $('.js-expand-interview-toggle').on('click',function(e){
//   e.preventDefault();
//   // finds closest interview
//   var parent = $(this).closest('.interview'),
//       interview = $('.js-interview',parent);
//
//   // shows and hides interview
//   interview.stop().slideToggle(600);
//
//   // Toggles between the text content
//   if ($(this).text() === 'Read Interview') {
//     $(this).text('Hide Interview');
//   } else {
//     $(this).text('Read Interview');
//   }
// });