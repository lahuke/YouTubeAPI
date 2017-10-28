$(document).ready(function(){
  
  $(function() {
      $('.js-search-form').submit(function (event) {
        event.preventDefault();
        var searchTerm = $('.js-query').val();
        getRequest(searchTerm);
      });
  });

  function getRequest(searchTerm) {
      var query = {
          part: 'snippet',
          key: 'AIzaSyACK3imt8Ow7yrWE8S4o-viM-Da22u5OtU',
          q: searchTerm,
          type: 'video',
          per_page:5
      };
      var url = 'https://www.googleapis.com/youtube/v3/search';

      $.getJSON(url, query, function (data) {
          showResults(data.items);
      });
  }

  function showResults(results){
      var html = "";

      $.each(results, function(index, value){
        $('<img>').attr("src", value.snippet.thumbnails.medium.url).appendTo('body');
        console.log(value.snippet.thumbnails.medium.url);
        $(".js-query").val("");
    });
  }
}); 


