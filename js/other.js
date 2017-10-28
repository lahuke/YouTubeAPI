
var YouTubeSearchURL = 'https://www.googleapis.com/youtube/v3/search';

var RESULT_HTML_TEMPLATE = (
  '<div>' +
    '<a class="js-result-name" img src="" target="_blank"></a>' + 
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
  template.find(".js-result-name").text(result.snippet.title)
  
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
