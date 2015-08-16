var startSongTimer = function(){
	player.timer = setInterval(function(){
		renderTime(player.currentSongTime);
	}, 1000);
}

var startPlaylist = function(song){
	player.currentSong = song;
	player.currentSongLength = musicData.songs[song].time;
	renderTime(0);
	player.nextSong();
	togglePlay();
	$('div.' + player.playlistPos).addClass('current-song');
};

var togglePlay = function(){
	if (player.playlist.length){
		$('#play-button').html(player.playing ? '&#9658;' : '&#10074;&#10074;');
		player.playing = !player.playing;
		$('marquee').text((player.playing ? 'Now Playing - ' : 'Paused - ') + player.currentSong);
		
		if (!player.playing){
			clearInterval(player.timer);
		}
		else {
			startSongTimer();
		}
	}
};

var skipSong = function(){
	$('div.' + player.playlistPos).removeClass('current-song');
	player.nextSong();
	renderTime(0);
	$('div.' + player.playlistPos).addClass('current-song');
	if (player.playing){
		startSongTimer();
		$('marquee').text('Now Playing - ' + player.currentSong);
	}
	else {
		$('marquee').text('Paused - ' + player.currentSong);
	}
};

var renderTime = function(elapsedTime){
	if (player.currentSongTime <= player.currentSongLength){
		$('#time-elapsed').text(player.secondsToSongTime(elapsedTime));
		$('.time-left').text(player.secondsToSongTime(musicData.songs[player.currentSong].time - elapsedTime));
		player.currentSongTime++;
	}
	else {
		clearInterval(player.timer);
		if (player.playlistPos < player.playlist.length){
			skipSong();
		}
	}
}

$('#play-button').click(function(){
	togglePlay();
});

$('#next-song').click(function(){
	clearInterval(player.timer);
	skipSong();
});

$('#albums').on('click', 'li', function(event){
	event.preventDefault();
	player.playlist.push($(this).text());
	$('#play-list').append('<div class="' + (player.playlist.length - 1) + '">' + $(this).text() + '</div>');

	if (player.playlist.length === 1){
		startPlaylist($(this).text());
	}
});

$(document).ready(function(){
	musicData.albums.forEach(function(album){
		var albumString = '<div class="album"><h3 class="album-title">' + album.name + '</h3>';
		albumString += '<div class="album-cover"><img src="img/' + album.image + '" /></div><ul>'
		album.songs.forEach(function(song){
			albumString += '<li class="song">' + song.title + '</li>';
		});
		albumString += '</ul><div>';
		$('#albums').append(albumString);
	});
});