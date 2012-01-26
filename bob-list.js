var BOB = (function() {
  var me = {};

  me.getAllCourses = function(callback) {
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
      var courses = response,
          $list = $('#list'),
          course;
      courses.sort(function(c1, c2) {
        return c1.count < c2.count;
      });
      console.log(courses);
      for (var i = 0; i < courses.length; i++) {
        course = courses[i];
        console.log(course);
        $list.append(
          '<tr>' +
            '<td>' + course.count + '</td>' +
            '<td>' + course.code + ': ' + course.name + 
              '  <a href="http://brown.mochacourses.com/mocha/search.action?q=' +
              course.code + '">Mocha</a></td>' +
            '<td>' + course.professor + '</td>' +
          '</tr>'
        );
      }
    });
  };

  return me;
}());

$(document).ready(function() {
  BOB.init();
});
