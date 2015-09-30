function MusicPlayer(musicData){
	this.playing = false;
	this.playlist = [];
	this.currentSong = null;
	this.timer = null;
	this.currentSongLength = null; // song length in millieconds
	this.currentSongTime = 0; // elapsed time in milliseconds
	this.playlistPos = -1;
	this.musicData = musicData;
}

MusicPlayer.prototype.addSong = function(song){
	this.playlist.push(song);
};

MusicPlayer.prototype.nextSong = function(skips, toSongNum){
	if (toSongNum !== undefined){
		this.playlistPos = toSongNum;
	}
	else {
		this.playlistPos += skips;
		this.playlistPos = ((this.playlistPos % this.playlist.length) + this.playlist.length) % this.playlist.length; 
	}
	
	this.currentSong = this.playlist[this.playlistPos];
	this.currentSongLength = this.musicData.songs[this.currentSong].time*1000;
	this.currentSongTime = 0;	
};

MusicPlayer.prototype.startPlaylist = function(song){
	this.currentSong = song;
	this.nextSong(1);
};

MusicPlayer.prototype.togglePlay = function(){
	this.playing = !this.playing;
};

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