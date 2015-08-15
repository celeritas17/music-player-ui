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
	$('#play-button').html(player.playing ? '&#9658;' : '&#9612;&#9612;');
	player.playing = !player.playing;
});