// jshint devel:true
'use strict';

$(document).ready(function () {
  var text ='';
  $.ajax({
  dataType: 'json',
  url: 'https://api.sistemium.com/status?json',
  success: function(jsondata){
    text += '<ul сlass="sist_list">'
    text += '<li>Pool = ' + jsondata.pool + '</li>'
    text += '<li>Total processes = ' + jsondata['total processes'] + '</li>'
    text += '<li>Total of accepted connections = ' + jsondata['accepted conn'] + '</li>'
    text += '<li>Idle Processes = ' + jsondata['idle processes'] + '</li>'
    text += '<li>Listen Queue = ' + jsondata['listen queue'] + '</li>'
    text += '<li>Listen Queue Length = ' + jsondata['listen queue len'] + '</li>'
    text += '<li>Process Manager = ' + jsondata['process manager'] + '</li>'
    text += '<li>Max Active Processes= ' + jsondata['max active processes'] + '</li>'
    text += '<li>Max Children Reached = ' + jsondata['max children reached'] + '</li>'
    text += '<li>Slow Requests= ' + jsondata['slow requests'] + '</li>'
    text += '<li>Start Since = ' + jsondata['start since'] + '</li>'
    text += '<li>Start Time = ' + jsondata['start time'] + '</li>'
    //$('.jumbotron').html('Pool = ' + jsondata.pool);
    //$('.jumbotron').append('Total processes = ' + jsondata['total processes']);
    text += '</ul>'
    $('.jumbotron').append(text);
    $('.jumbotron').append('Total number of arguments: ' + Object.keys(jsondata).length);

  }
});

});
//# sourceMappingURL=main.js.map
