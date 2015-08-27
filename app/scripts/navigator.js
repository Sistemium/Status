'use strict';

window.STM = {} || STM;

STM.Navigator = function (defaultLocation) {

  var locations = [
    ['#stats'],
    ['#graphs'],
    ['#contacts'],
  ];

  var setLocation = function setLocation (path) {

    var loadLink = 'templates/404.html';

    $('.nav.router > .button').each (function () {

      var el = $(this);

      if (el.find('a').attr('href') == path) {
        el.addClass('active');
      } else {
        el.removeClass('active');
      }

    });

    locations.every(function(item){
      if (item == path ){
        loadLink = 'templates/'+path.slice(1)+'.html';
        location.hash = path;
        return false;
      }
      return true;
    });

    $('.main').load(loadLink);
    $(document).trigger('navigate',path);
    $('.path').html(path);

  };

  $(window).on('hashchange', function() {
    setLocation (location.hash);
  });

  setLocation (defaultLocation);

};
