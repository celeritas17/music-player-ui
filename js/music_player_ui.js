function startSongTimer(player){
	player.timer = setInterval(function(){
		renderTime(player, player.currentSongTime);
	}, 1000);
}

function startPlaylist(player, song){
	player.startPlaylist(song, musicData.songs[song].time);
	renderTime(player, 0);
	togglePlay(player);
	$('div.' + player.playlistPos).addClass('current-song');
};

function togglePlay(player){
	if (player.playlist.length){
		$('#play-button').html(player.playing ? '&#9658;' : '&#10074;&#10074;');
		player.togglePlay();
		$('marquee').text((player.playing ? 'Now Playing - ' : 'Paused - ') + player.currentSong);
		
		if (!player.playing){
			clearInterval(player.timer);
		}
		else {
			startSongTimer(player);
		}
	}
};

function skipSong(player, skips){
	$('div.' + player.playlistPos).removeClass('current-song');
	player.nextSong(skips);	
	renderTime(player, 0);
	$('div.' + player.playlistPos).addClass('current-song');
	if (player.playing){
		startSongTimer(player);
		$('marquee').text('Now Playing - ' + player.currentSong);
	}
	else {
		$('marquee').text('Paused - ' + player.currentSong);
	}
};

function renderTime(player, elapsedTime){
	if (player.currentSongTime <= player.currentSongLength){
		$('#time-elapsed').text(player.secondsToSongTime(elapsedTime));
		$('.time-left').text(player.secondsToSongTime(musicData.songs[player.currentSong].time - elapsedTime));
		player.currentSongTime++;
	}
	else {
		clearInterval(player.timer);
		if (player.playlistPos < player.playlist.length){
			skipSong(player, 1);
		}
	}
};

$(document).ready(function(){
	var player = new MusicPlayer();

	musicData.albums.forEach(function(album){
		var albumString = '<div class="album"><h3 class="album-title">' + album.name + '</h3>';
		albumString += '<div class="album-cover"><img src="img/' + album.image + '" /></div><ul>'
		album.songs.forEach(function(song){
			albumString += '<li class="song">' + song.title + '</li>';
		});
		albumString += '</ul><div>';
		$('#albums').append(albumString);
	});

	$('#play-button').click(function(){
		togglePlay(player);
	});

	$('#next-song').click(function(){
		if (player.playlist.length){
			clearInterval(player.timer);
			skipSong(player, 1);
		}
	});

	$('#last-song').click(function(){
		if (player.playlist.length){
			clearInterval(player.timer);
			skipSong(player, -1);
		}
	});

	$('#albums').on('click', 'li', function(event){
		event.preventDefault();
		player.addSong($(this).text());
		$('#play-list').append('<div class="' + (player.playlist.length - 1) + '">' + $(this).text() + '</div>');

		if (player.playlist.length === 1){
			startPlaylist(player, $(this).text());
		}
	});
});