function displayResults(data) {
  var titles = data[1]
  var extracts = data[2]
  var links = data[3]
  var html = ''
  for (var idx = 0; idx < titles.length; idx++) {
    html += '<div class="wiki-result">'
    html += '<a href="' + links[idx] + '" class="result-link">'
    html += '<span class="result-title">' + titles[idx] + '</span>' + '</a>'
    html += '<p class="result-snippet">' + extracts[idx] + '</p>'
    html += '</div>'
  }
  $my.results.append(html)
}

function submitSearch() {
  $my.results.empty()
  var query = $("#query").val()
  if (query) {
    $.ajax({
      url: $my.baseStr,
      jsonp: "callback",
      dataType: "jsonp",
      data: {
        action: "opensearch",
        format: "json",
        profile: "classic",
        limit: "25",
        search: query
      },
      xhrFields: {
        withCredentials: true
      },
      success: displayResults
    })
  }
}

$(function() {
  window.$my = {
    results: $("#results"),
    baseStr: "https://en.wikipedia.org/w/api.php"
  }

  $("#search-icon").click(function(e) {
    submitSearch()
  })

  $("#query").keypress(function(e) {
    if (e.which == 13) submitSearch()
  })
})
