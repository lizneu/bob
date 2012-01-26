var BOB = (function() {
  var me = {};

  var _courses;

  me.getAllCourses = function(callback) {
    console.log('get');
    $.getJSON('test-data.json', function(response) {
      if (response && response.length) {
        callback(response);
      } else {
        console.error("Response was " + response);
      }
    });
  };

  function _toggleSubmit() {
    var someEmpty = false;
    for (var i = 1; i <= 3; i++) {
      if ($('#fav' + i).val() === '') {
        someEmpty = true;
        break;
      }
    }
    $('#submit').button('option', 'disabled', someEmpty);
  }

  me.init = function() {
    $('#submit').button({ 'disabled' : true });
    me.getAllCourses(function(response) {
      var courses = response.map(function(course) {
        return {
          label: course.code + ' : ' + course.name
            + ' - ' + course.professor,
          cid: course.cid
        };
      });
      for (var i = 1; i <= 3; i++) {
        $('#fav' + i).autocomplete({
          source: courses
        })
        .bind('autocompleteselect', function(event, ui) {
          _toggleSubmit();
          // TODO mark or remove dups
          // TODO do something with the cid
        })
        .change(_toggleSubmit)
          /* TODO figure out a way to make it only catch backspaces
                after a course has been selected
        .keydown(function(event) {
          if (event.keyCode === 8) { // catch backspace
            $(this).val('');
          }
        });
        /*

      }

    });
  };

  return me;
}());

$(document).ready(function() {
  BOB.init();
});
