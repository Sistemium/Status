// jshint devel:true
'use strict';


$(document).ready(function () {

  var socket = io('http://localhost:3000');

  function displayStatus (data){
    $.get('templates/stats-aggregated.html', function(template) {
      var tpl = Handlebars.compile(template),
        tplData = {
          items:[],
          numberOfProperties: Object.keys(data).length
        };

      labels.forEach (function (label) {
        tplData.items.push ({
          label: label[0],
          value: data[label[1]]
        })
      })
      $('.main').html(tpl(tplData));
    });
  };

  socket.on('news', function (data) {
    var date = moment().format('MMMM Do YYYY, h:mm:ss A');
    displayStatus(data.status);
    socket.emit('my other event', { Date: date, Browser: navigator.appName, Platform: navigator.platform});
  });


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

  var setLocation = function setLocation (path) {
    $('.nav > .button').each (function () {
      var el = $(this);
      if (el.find('a').attr('href') == path) {
        el.addClass('active');
        var loadLink = 'templates/'+path.slice(1)+'.html';
        $('.main').load(loadLink);
        console.log(path);
        console.log(loadLink);
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
