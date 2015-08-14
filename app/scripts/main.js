// jshint devel:true
'use strict';


$(document).ready(function () {

  var labels = [
    ['Pool', 'pool'],
    ['Total processes', 'total processes'],
    ['Total of accepted connections', 'accepted conn'],
    ['Idle Processes', 'idle processes'],
    ['Listen Queue', 'listen queue'],
    ['Listen Queue Length', 'listen queue len'],
    ['Process Manager', 'process manager'],
    ['Max Active Processes', 'max active processes'],
    ['Max Children Reached', 'max children reached'],
    ['Slow Requests', 'slow requests'],
    ['Start Since', 'start since'],
    ['Start Time', 'start time']
  ];

  $.ajax({
    dataType: 'json',
    url: 'https://api.sistemium.com/status?json',
    success: function(jsondata){
      $.get('templates/stats-aggregated.html', function(template) {
        var tpl = Handlebars.compile(template),
          tplData = {
            items:[],
            numberOfProperties: Object.keys(jsondata).length
          };

        labels.forEach (function (label) {
          tplData.items.push ({
            label: label[0],
            value: jsondata[label[1]]
          })
        })

        $('.main').html(tpl(tplData));

      });
    }
  });

  var setLocation = function setLocation (path) {
    $('.nav > .button').each (function () {
      var el = $(this);
      if (el.find('a').attr('href') == path) {
        el.addClass('active');
      } else {
        el.removeClass('active');
      }
    });
    $('.copy').html(path);
  };

  $('.button').click(function(){
    setLocation ($(this).find('a').attr('href'));
  });

  setLocation (location.hash || '#home');

  $('.not-ready').removeClass('not-ready');

});
//# sourceMappingURL=main.js.map
