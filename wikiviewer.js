function displayResults(data) {
  var titles = data[1]
  var extracts = data[2]
  var links = data[3]
  titles.map(function (res, idx) {
    $my.results.append('<p class="result-title">' + res + '</p>')
      .append('<a href="' + links[idx] + '" class="result-link">' + links[idx] + '</a>')
      .append('<p class="result-snippet">' + extracts[idx] + '</p>')
  })
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

  $("#search").click(function(e) {
    submitSearch()
  })

  $("#query").keypress(function(e) {
    if (e.which == 13) submitSearch()
  })
})
