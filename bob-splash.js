var BOB = (function() {
  var me = {};

  var _courses, _selected = {};

  me.getAllCourses = function(callback) {
    $.getJSON('test-data.json', function(response) {
      if (response && response.length) {
        callback(response);
      } else {
        console.error("Response was " + response);
      }
    });
  };

  me.sendFavorites = function(callback) {
  };

  function _toggleSubmitEnabled() {
    $('#submit').button('option', 'disabled',
        !(_selected[1] && _selected[2] && _selected[3]));
  }

  me.init = function() {

    $('#submit')
      .button({ 'disabled' : true })
      .click(function() {
        console.log(_selected[1] + ', ' + _selected[2] + ', ' + _selected[3]);
      });

    me.getAllCourses(function(response) {
      var courses = response.map(function(course) {
        return {
          label: course.code + ' : ' + course.name +
            ' - ' + course.professor,
          cid: course.cid
        };
      });

      function _bindHandlers(i) {
        $('#fav' + i).autocomplete({
          source: courses
        })
        .bind('autocompleteselect', function(event, ui) {
          // TODO do something with the cid
          _selected[i] = ui.item.cid;
          _toggleSubmitEnabled();
          // TODO mark or remove dups
        })
        .change(function () {
          _selected[i] = null;
          _toggleSubmitEnabled();
        });
      }
      for (var i = 1; i <= 3; i++) {
        _bindHandlers(i);
      }
          /* TODO figure out a way to make it only catch backspaces
                after a course has been selected
        .keydown(function(event) {
          if (event.keyCode === 8) { // catch backspace
            $(this).val('');
          }
        });
        */


    });
  };

  return me;
}());

$(document).ready(function() {
  BOB.init();
});
