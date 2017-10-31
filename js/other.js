
var YouTubeSearchURL = 'https://www.googleapis.com/youtube/v3/search';

var RESULT_HTML_TEMPLATE = (
  '<div>' +
    '<a class="thumbnailLink" href=""><img class="thethumbnails" src=""></img></a>' + 
  '</div>'
);

function getDataFromApi(searchTerm, callback) {
  var query = {
  	part: 'snippet',
    key: 'AIzaSyACK3imt8Ow7yrWE8S4o-viM-Da22u5OtU',
    q: searchTerm,
    type: 'video',
    per_page: 5
  }
  $.getJSON(YouTubeSearchURL, query, callback);
}

function renderResult(result) {
  var template = $(RESULT_HTML_TEMPLATE);
  template.find(".thethumbnails").attr('src', result.snippet.thumbnails.medium.url)
  template.find(".thumbnailLink").attr('href', 'https://www.youtube.com/watch?v=' + result.id.videoId)
  return template;
}

function displayYouTubeSearchData(data) {
  var results = data.items.map(function(item, index) {
    return renderResult(item);
  });
  $('.js-search-results').html(results);
}

function watchSubmit() {
  $('.js-search-form').submit(function(event) {
    console.log('Submit Button Clicked');
    event.preventDefault();
    var queryTarget = $(event.currentTarget).find('.js-query');
    var query = queryTarget.val();
    // clear out the input
    queryTarget.val("");
    getDataFromApi(query, displayYouTubeSearchData);
  });
}

$(watchSubmit);
