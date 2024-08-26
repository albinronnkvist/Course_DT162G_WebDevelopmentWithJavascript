/*
Description: Materialize configurations
Author: Albin Rönnkvist
*/



// Tabs
$(document).ready(function(){
    $('ul.tabs').tabs();
  });
$(document).ready(function(){
    $('ul.tabs').tabs('select', 'active', 'tab_id');
});

// Collapsible
$(document).ready(function(){
    $('.collapsible').collapsible();
});

// Modal
$(document).ready(function(){
    $('.modal').modal();
});

// Tooltip
$(document).ready(function(){
    $('.tooltipped').tooltip();
});