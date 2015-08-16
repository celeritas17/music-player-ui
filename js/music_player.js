function MusicPlayer(){
	this.playing = false;
	this.playlist = [];
	this.currentSong = null;
	this.timer = null;
	this.currentSongLength = null;
	this.currentSongTime = 0;
	this.playlistPos = -1;
}

MusicPlayer.prototype.addSong = function(song){
	this.playlist.push(song);
};

MusicPlayer.prototype.nextSong = function(skips){
	this.playlistPos += skips;
	this.playlistPos = ((this.playlistPos % this.playlist.length) + this.playlist.length) % this.playlist.length; 
	this.currentSong = this.playlist[this.playlistPos];
	this.currentSongLength = musicData.songs[this.currentSong].time;
	this.currentSongTime = 0;	
};

MusicPlayer.prototype.startPlaylist = function(song, songLength){
	this.currentSong = song;
	this.currentSongLength = songLength;	
	this.nextSong(1);
};

MusicPlayer.prototype.togglePlay = function(){
	this.playing = !this.playing;
}

MusicPlayer.prototype.secondsToSongTime = function(s){
	var timeString;
	if (s < 10){
		timeString = '0:0' + s;
	}
	else {
		var minutes = Math.floor(s/60);
		var seconds = s%60;
		seconds = seconds < 10 ? '0' + seconds : seconds;
		timeString = minutes + ':' + seconds;
	}
	return timeString;
};
