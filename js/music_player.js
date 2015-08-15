var albums = [
	{
		"name": "Crystal Castles",
		"songs": [
			{"title": "Untrust Us", "length": 186}, 
			{"title": "Alice Practice", "length": 162},
			{"title": "Crimewave", "length": 258},
			{"title": "Magic Spells", "length": 367},
			{"title": "Xxzxcuzx Me", "length": 114},
			{"title": "Air War", "length": 252},
			{"title": "Courtship Dating", "length": 210},
			{"title": "Good Time", "length": 176},
			{"title": "1991", "length": 113},
			{"title": "Vanished", "length": 242},
			{"title": "Knights", "length": 193},
			{"title": "Love and Caring", "length": 138}
			],
		"image": "cc.jpg"
	},
	{
		"name": "Crystal Castles II",
		"songs": [
			{"title": "Fainting Spells", "length": 204}, 
			{"title": "Celestica", "length": 248},
			{"title": "Doe Deer", "length": 98},
			{"title": "Baptism", "length": 253},
			{"title": "Year of Silence", "length": 294},
			{"title": "Empathy", "length": 251},
			{"title": "Suffocation", "length": 242},
			{"title": "Violent Dreams", "length": 275},
			{"title": "Vietnam", "length": 308},
			{"title": "Birds", "length": 191}
			],
		"image": "cc2.jpg"
	}
];

function MusicPlayer(){
	this.playing = true;
	this.playlist = [];
}

var player = new MusicPlayer();

$('#play-button').click(function(){
	$('#play-button').html(player.playing ? '&#9658;' : '&#10074;&#10074;');
	player.playing = !player.playing;
});

$(document).ready(function(){
	albums.forEach(function(album){
		var albumString = '<div class="album"><h3 class="album-title">' + album.name + '</h3>';
		albumString += '<div class="album-cover"><img src="img/' + album.image + '" /></div><ul>'
		album.songs.forEach(function(song){
			albumString += '<li>' + song.title + '</li>';
		});
		albumString += '</ul><div>';
		$('#albums').append(albumString);
	});
});

