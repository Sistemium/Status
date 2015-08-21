// jshint devel:true
'use strict';


$(document).ready(function () {

  var socket = io('http://localhost:4000/status');
  var statusTpl;

  function displayStatus(data){

    var tpl = statusTpl;

    var tplData = {
      items:[],
      numberOfProperties: Object.keys(data).length
    };

    labels.forEach (function (label) {
      tplData.items.push ({
        label: label[0],
        value: data[label[1]]
      })
    })

    $('.outlet.stats-aggregated').html(tpl(tplData));

  }

  function loadStatusTpl(){
    $.ajax({
      url: 'templates/stats-aggregated.html',
      success: function(template){
        statusTpl = Handlebars.compile(template);
      },
      beforeSend: function(){
          $('.wrapper').addClass('is-loading');
      },
      complete: function(){
          $('.wrapper').removeClass('is-loading');
      }
    });

  }

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

    $('.nav.router > .button').each (function () {
      var el = $(this);
      if (el.find('a').attr('href') == path) {
        el.addClass('active');
      } else {
        el.removeClass('active');
      }
    });

    var loadLink = 'templates/'+path.slice(1)+'.html';

    $('.main').load(loadLink);
    $('.path').html(path);

    if (path=='#stats') {
      startSocket();
    } else {
      stopSocket();
    }

  };

  $('.nav.router .button').click(function(){
    setLocation ($(this).find('a').attr('href'));
  });

  setLocation (location.hash || '#stats');
  $('.not-ready').removeClass('not-ready');
  loadStatusTpl();

  function stopSocket () {
    socket.off('news');
  }

  function startSocket () {

    socket.on('news', function (data) {
      var date = moment().format('MMMM Do YYYY, h:mm:ss A');
      displayStatus(data.status);
      socket.emit('my other event', {
        Date: date,
        Browser: navigator.appName,
        Platform: navigator.platform,
        Page: location.hash
      });
    });

  }

});
//# sourceMappingURL=main.js.map
