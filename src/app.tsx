import 'css/main.css';

async function main () : Promise<any> {
    const { Platform, Player, CosmosAsync } = Spicetify;
    const toRemove: any[] = [];

    if (!Platform || !Player || !CosmosAsync) {
        setTimeout(main, 300);
        return;
    }

    function makeButtons() {
        const playingWidgetContainer: any = document.querySelector('[class*="main-nowPlayingWidget-nowPlaying"]');
        if (!playingWidgetContainer) return;

        playingWidgetContainer.insertAdjacentHTML('beforeend', `
            <div class="enhance-plus-btns-container">
            <span class="enhance-plus-add-to-playlist">
                <button type="button" aria-label="Conserver dans la playlist" class="TRDgmejiOzKjissuLFSx" tabindex="-1" aria-expanded="false">
                <svg role="img" height="16" width="16" viewBox="0 0 16 16" class="enhance-plus-svg Svg-ytk21e-0 eqtHWV">
                    <path d="M8 1.5a6.5 6.5 0 100 13 6.5 6.5 0 000-13zM0 8a8 8 0 1116 0A8 8 0 010 8z"></path>
                    <path d="M11.75 8a.75.75 0 01-.75.75H8.75V11a.75.75 0 01-1.5 0V8.75H5a.75.75 0 010-1.5h2.25V5a.75.75 0 011.5 0v2.25H11a.75.75 0 01.75.75z"></path>
                </svg>
                </button>
            </span>
            <span class="enhance-plus-remove-to-playlist">
                <button type="button" aria-label="Conserver dans la playlist" class="TRDgmejiOzKjissuLFSx" tabindex="-1" aria-expanded="false">
                <svg role="img" height="16" width="16" viewBox="0 0 16 16" class="enhance-plus-svg Svg-ytk21e-0 eqtHWV">
                    <path d="M8 1.5a6.5 6.5 0 100 13 6.5 6.5 0 000-13zM0 8a8 8 0 1116 0A8 8 0 010 8z"></path>
                    <path d="M12 8.75H4v-1.5h8v1.5z"></path>
                </svg>
                </button>
            </span>
            </div>
        `)

        const removeToPlaylist: any = document.querySelector('[class="enhance-plus-remove-to-playlist"]');
        const addToPlaylist: any = document.querySelector('[class="enhance-plus-add-to-playlist"]');

        addToPlaylist.addEventListener('click', () => {
            const playerAny = (Player.data as any);
            Spicetify.Platform.EnhanceAPI.addRecommendation(playerAny.context.uri, playerAny.context.metadata.enhanced_session_id, [playerAny.track.uid], 0, 50)
            hideBadges();
        });

        let canSkip = true;

        removeToPlaylist.addEventListener('click', async () => {
            if (!canSkip) return;
            const playerData: any = Player.data;
            const sessionId = playerData.context.metadata.enhanced_session_id;

            toRemove.push([
                playerData.track.metadata['image_small_url'].match(/spotify:image:(\w+)/)[1],
                playerData.track.metadata.title
            ]);

            Platform.EnhanceAPI.removeItems(playerData.context.uri, sessionId, [playerData.track.uid], 0, 50, true);

            updateToRemoveQueue();

            Player.next();
            hideBadges();

            // Turn off and on shuffle to update the enhance state it's a little bit of an hacky way but it works
            if (Player.getShuffle()) {
                canSkip =false;
                Player.toggleShuffle();

                // Looks like toggleShuffle has some kind of cooldown
                setTimeout(() => {
                    canSkip = true;
                    Player.toggleShuffle();
                }, 500);
            }
        });
    };

    makeButtons();

    const playingWidgetContainer: any = document.querySelector('[class*="main-nowPlayingWidget-nowPlaying"]')
    if (!playingWidgetContainer) return setTimeout(main, 300);

    function hideBadges() {
        let removeToPlaylist: any = document.querySelector('[class="enhance-plus-remove-to-playlist"]');
        let addToPlaylist: any = document.querySelector('[class="enhance-plus-add-to-playlist"]');

        if (!removeToPlaylist || !addToPlaylist) {
            makeButtons();
            removeToPlaylist = document.querySelector('[class="enhance-plus-remove-to-playlist"]');
            addToPlaylist = document.querySelector('[class="enhance-plus-add-to-playlist"]');
        }

        console.log('Hide badge');
        addToPlaylist.style.display = 'none';
        removeToPlaylist.style.display = 'none';
    }

    function showBadges() {
        let removeToPlaylist: any = document.querySelector('[class="enhance-plus-remove-to-playlist"]');
        let addToPlaylist: any = document.querySelector('[class="enhance-plus-add-to-playlist"]');

        if (!removeToPlaylist || !addToPlaylist) {
            makeButtons();
            removeToPlaylist = document.querySelector('[class="enhance-plus-remove-to-playlist"]');
            addToPlaylist = document.querySelector('[class="enhance-plus-add-to-playlist"]');
        }

        console.log('Show badge');
        addToPlaylist.style.display = 'flex';
        removeToPlaylist.style.display = 'flex';
    }

    hideBadges();

    let lastUid = '';

    function onSongProgress() {
        const track = Player.data.track;
        if (!track || !track.metadata) return console.log('no track/metadata');

        if (!track.uid || lastUid === track.uid) return;
        lastUid = track.uid;

        const provider = track.metadata.provider;
        if (provider != 'enhanced_recommendation') return hideBadges();
        showBadges();
    };

    function updateToRemoveQueue() {
        toRemove.forEach(([imageURI, songTitle]) => {
            const trackImages: any = (document as any).querySelectorAll(`[src*="${imageURI}`);
            
            trackImages.forEach((trackImage: any) => {
                const isEnhanced = trackImage.parentElement.parentElement.querySelector('[class*="main-trackList-enhanced"]');
                if (!isEnhanced) return;

                const trackSngTitle = trackImage.parentElement.querySelector('[class*="main-trackList-rowTitle"]').innerHTML;
                if (trackSngTitle != songTitle) return console.log('does not match', trackSngTitle, songTitle);

                toRemove.splice(toRemove.indexOf(imageURI));
                trackImage.parentElement.parentElement.remove();
            });
        });
    };

    Player.addEventListener('onprogress', onSongProgress);
    onSongProgress();

    const listenedEls: any[] = [];

    let loop = setInterval(() => {
        document.querySelectorAll('[class*="os-viewport"').forEach((el) => {
            if (listenedEls.includes(el)) return;
            listenedEls.push(el);
            if (listenedEls.length === 3) clearInterval(loop)
            el.addEventListener('scroll', updateToRemoveQueue);
            console.log('listen to', el);
        });
    }, 100);

    console.log('EnhancePlus v1.0.2 loaded!');
}

export default main;
