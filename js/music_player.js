function MusicPlayer(){
	this.playing = false;
	this.playlist = [];
	this.currentSong = null;
	this.timer = null;
	this.currentSongLength = null;
	this.currentSongTime = 0;
	this.playlistPos = -1;
	this.added = {};
}

MusicPlayer.prototype.nextSong = function(){
	this.playlistPos++;
	this.playlistPos = this.playlistPos%this.playlist.length;
	this.currentSong = this.playlist[this.playlistPos];
	this.currentSongLength = musicData.songs[this.currentSong].time;
	this.currentSongTime = 0;	
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

var player = new MusicPlayer();
