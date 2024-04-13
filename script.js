async function getSongs(){
    let a = await fetch("http://127.0.0.1:3000/SPOTIFY/songs/");
    let respone = await a.text();
    let div = document.createElement('div');
    div.innerHTML = respone;
    let as = div.getElementsByTagName("a");
    let songs = [];

    for(let i=0; i < as.length; i++){
        if(as[i].href.endsWith(".mp3")){
            songs.push(as[i].href);
        }
    }

    return songs;
}

async function main(){ 
    let songs = await getSongs();

    let songsUL = document.querySelector(".songlist").getElementsByTagName("ul")[0];
    for( const song of songs){
        let index = song.indexOf("songs/");
        let songn1 = song.substring(index + "songs/".length);
        let songName = songn1.replaceAll(".mp3", "-")
        
        songsUL.innerHTML = songsUL.innerHTML + `<li>

                <img src="music.svg" alt="music" />
                <div class="info">
                  <div>${songName.replaceAll("%20", " ")}</div>
                  <div>Song Artist</div>
                </div>
                <div class="playnow">
                  <span>Play Now</span>
                  <img class="invert" src="play.svg" alt="play">
                </div>

        </li>`;
    }

    var audio = new Audio(songs[4]);
    // audio.play();

    audio.addEventListener("onTimeupdate", () => {
        // let duration = audio.duration;
        console.log(audio.duration, audio.currentSrc, audio.currentTime);
    });
}

main();