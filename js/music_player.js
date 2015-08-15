var albums = {
	"Crystal Castles": {
		"songs": [{"title": "blah", "length": 123}, {"title": "blah", "length":200}],
		"image": "cc.jpg"
	}
};

function MusicPlayer(){
	this.playing = true;
}

var player = new MusicPlayer();

$('#play-button').click(function(){
	$('#play-button').html(player.playing ? '&#9658;' : '&#10074;&#10074;');
	player.playing = !player.playing;
});