var audioID = document.getElementById("myAudio");

function startMP3(){
    audioID.play();
}

function startSongTimer(player){
	player.timer = setInterval(function(){
		renderTime(player, player.currentSongTime, 200);
	}, 200);
	animation = startTimerAnimation(player);
}

function startTimerAnimation(player){
	var timeStep = 200;
	var timerLength = 493; // pixels; a hack for timer animation
	var steps = player.currentSongLength/timeStep;
	var stepSize = timerLength/steps;
	return setInterval(function(){
		moveTimer(player, stepSize, timerLength);
	}, timeStep);
}

function startPlaylist(player, song){
	player.startPlaylist(song);
	renderTime(player, 0, 200);
	togglePlay(player);
	$('div.' + player.playlistPos).addClass('current-song');
    startMP3.play();
}

function togglePlay(player){
	if (player.playlist.length){
		$('#play-button').html(player.playing ? '&#9658;' : '&#10074;&#10074;');
		player.togglePlay();
		$('marquee').text((player.playing ? 'Now Playing - ' : 'Paused - ') + player.currentSong);
		
		if (!player.playing){
			clearInterval(player.timer);
			clearInterval(animation);
		}
		else {
			startSongTimer(player);
		}
	}
}

function skipSong(player, skips, toSongNum){
	clearInterval(player.timer);
	$('div.' + player.playlistPos).removeClass('current-song');
	if (toSongNum !== undefined){
		player.nextSong(0, toSongNum);	
	}
	else { 
		player.nextSong(skips);	
	}
	renderTime(player, 0, 200);
	clearAnimation(animation);
	$('div.' + player.playlistPos).addClass('current-song');
	if (player.playing){
		startSongTimer(player);
		$('marquee').text('Now Playing - ' + player.currentSong);
	}
	else {
		$('marquee').text('Paused - ' + player.currentSong);
	}
}

function moveTimer(player, stepSize, maxLength){
	var currentTime = parseFloat($('#current-time').css('left'));
	if (player.currentSongTime <= player.currentSongLength){
		if (currentTime < maxLength){
			$('#current-time').css('left', (currentTime + stepSize) + 'px');
		}
	}
	else {
		clearInterval(animation);
		$('#current-time').css('left', 2);	
	}
}

function renderTime(player, elapsedTime, timeStep){
	if (player.currentSongTime <= player.currentSongLength){
		if (elapsedTime%1000 === 0){
			$('#time-elapsed').text(player.secondsToSongTime(elapsedTime/1000));
			$('.time-left').text(player.secondsToSongTime(player.musicData.songs[player.currentSong].time - elapsedTime/1000));
		}
		player.currentSongTime += timeStep;
	}
	else {
		skipSong(player, 1);
	}
}

function clearAnimation(animation){
	clearInterval(animation);
	$('#current-time').css('left', 2);
}

$(document).ready(function(){
	var player = new MusicPlayer(musicData);
	var animation;

	player.musicData.albums.forEach(function(album){
		var albumString = '<div class="album"><h3 class="album-title">' + album.name + '</h3>';
		albumString += '<div class="album-cover"><img src="img/' + album.image + '" /></div><ul>';
		album.songs.forEach(function(song){
			albumString += '<li class="song">' + song.title + '<audio id="myAudio"><source src="audio/../assets/audio/' + song.file + '" type="audio/mpeg"></audio></li>';
		});
		albumString += '</ul><div>';
		$('#albums').append(albumString);
	});

	$('#play-button').click(function(){
		togglePlay(player);
	});

	$('#next-song').click(function(){
		if (player.playlist.length){
			skipSong(player, 1);
		}
	});

	$('#last-song').click(function(){
		if (player.playlist.length){
			skipSong(player, -1);
		}
	});

	$('div').mousedown(function(event){ event.preventDefault(); });

	$('#albums').on('click', 'li', function(event){
		event.preventDefault();
		player.addSong($(this).text());
		$('#play-list').append('<div class="' + (player.playlist.length - 1) + '">' + $(this).text() + '</div>');

		if (player.playlist.length === 1){
			startPlaylist(player, $(this).text());
		}
	});

	$('#play-list').on('dblclick', 'div', function(event){
		event.preventDefault();
		skipSong(player, 0, parseInt($(this).attr('class')));
	});
});