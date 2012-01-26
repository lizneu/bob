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
    /*
  me.init = (function() {
    function makeAutocomplete(num, field) {
      var idBase = '#fav' + num + '-';
      var id = idBase + field;
      $(id).autocomplete({
        source: _lists[field],
        select: function(event, ui) {
          $(idBase + 'code').val(ui.item.course.code);
          $(idBase + 'name').val(ui.item.course.name);
          $(idBase + 'prof').val(ui.item.course.professor);
          return false;
        }
      })
    }
    return function() {
      me.getAllCourses(function(response) {
        _courses = response;
        _lists.code = _createFieldList('code');
        _lists.name = _createFieldList('name');
        _lists.prof = _createFieldList('prof');

        for(var i=1; i<=3; i++) {
          makeAutocomplete(i, 'code');
          makeAutocomplete(i, 'name');
          makeAutocomplete(i, 'prof');
        }
      });
    };
  }());
    */

  /*
  function _createFieldList(field) {
    var list = [];
    for (var i = 0; i < _courses.length; i++) {
      list.push({
        label: _courses[i][field],
        course: _courses[i] 
      });
    }
    return list;
  }
    */

  return me;
}());

$(document).ready(function() {
  BOB.init();
});
