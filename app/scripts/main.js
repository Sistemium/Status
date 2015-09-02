// jshint devel:true
'use strict';

$(document).ready(function () {

  var socket = io('http://localhost:4000/status');
  var statusTpl;
  var fullStatusTpl;
  var durationTpl = Handlebars.compile('{{days}}{{hours}}{{minutes}}{{seconds}}');

  function displayStatus(data){

    var elemSize = data['total processes'];
    var tpl = statusTpl;
    var fullTpl = fullStatusTpl;

    var tplData = {
      items:[],
      numberOfProperties: labels.length
    };

    var tplFullData = {
      itemsFull:[],
      numberOfProperties: labelsFull.length,
      labels: labelsFull
    };

    labels.forEach (function (label) {
      var val = data[label[1]];
      switch (label[2]) {
        case 'seconds':
          val = durationTpl(moment.duration(val,'seconds'));
          break;
        case 'date':
          val = moment.unix(val).format('MMMM Do YYYY, h:mm:ss A');
          break;
      }
      tplData.items.push ({
        label: label[0],
        value: val
      });

    });

    data.processes.forEach(function (prcss,idx) {
      tplFullData.itemsFull.push({
        index: idx+1,
        data: prcss
      });
    });

    $('.outlet.stats-aggregated').html(tpl(tplData));
    $('.fullStats').html(fullTpl(tplFullData));
  }

  function loadStatusTpl(){
    $.ajax({
      url: 'templates/stats-aggregated.html',
      success: function(template){
        statusTpl = Handlebars.compile(template);
      }
    });
  }

  function loadFullStatusTpl(){
    $.ajax({
      url: 'templates/stats-aggregated-full.html',
      success: function(template){
        fullStatusTpl = Handlebars.compile(template);
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
    ['Start Since', 'start since', 'seconds'],
    ['Start Time', 'start time', 'date']
  ];

  var labelsFull = [
    ['Content Length', 'content length'],
    ['Pid', 'pid'],
    ['Requst duration', 'request duration'],
    ['Requst method', 'request method'],
    ['Requst URI', 'request uri'],
    ['Requests', 'requests'],
    ['Script', 'script'],
    ['Start Since', 'start since', 'date'],
    ['Start Time', 'start time', 'seconds'],
    ['State', 'state'],
    ['User', 'user'],
    ['CPU usage', 'last request cpu'],
    ['Memory usage','last request memory']
  ];



  $('.not-ready').removeClass('not-ready');
  loadStatusTpl();
  loadFullStatusTpl();

  function stopSocket () {
    socket.off('news');
  }

  function startSocket () {
    socket.on('news', function (data) {
      displayStatus(data.status);
    });
  }

  $(document).on('navigate', function (event,path){
    if (path == '#stats') {
      startSocket();
    } else {
      stopSocket();
    }
  });

  STM.Navigator (location.hash || '#stats');

});
//# sourceMappingURL=main.js.map
