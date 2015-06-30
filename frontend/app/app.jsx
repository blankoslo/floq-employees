var React = require('react');

var Header = require('./header.jsx');
var Cards = require('./cards.jsx');


var statistics = require('./js/statistics.js');
var rest = require('./js/rest.js');

var _ = require('underscore');

React.initializeTouchEvents(true);

rest.getArtists(function (artists) {
  statistics.artists = artists;

  React.render(
    <div className="wrapper">
      <Header title="woodstk" />
      <Cards initialArtists={_.shuffle(statistics.artists)} />

    </div>
    ,
    document.getElementById('page'));
});

