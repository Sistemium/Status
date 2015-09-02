'use strict';

(function (Handlebars) {

  var iifHelper = function (prop,suf) {
    return function () {
      return this[prop]() ? this[prop]() + suf : '';
    };
  };

  ['days','hours','minutes','seconds'].forEach(function(key){
    Handlebars.registerHelper (key,iifHelper(key,key.charAt(0)+' '));
  });

  Handlebars.registerHelper ('valueForLabel',function(data,obj){
    return data[this[1]];
  });

})(Handlebars);
