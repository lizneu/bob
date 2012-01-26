var BOB = (function() {
  var me = {};

  var _courses, _lists = {};

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

  me.init = function() {
    me.getAllCourses(function(response) {
      var courses = response.map(function(course) {
        return {
          label: course.code + ' : ' + course.name
            + ' - ' + course.professor,
          cid: course.cid
        };
      });
      $('#fav1').autocomplete({
        source: courses
      })
      .bind('autocompleteselect', function(event, ui) {
        // TODO mark or remove dups
      });
    });
  };

  return me;
}());

$(document).ready(function() {
  BOB.init();
});
