import 'css/main.css';

async function main () : Promise<any> {
    const { Platform, Player, CosmosAsync } = Spicetify;
    const toRemove: string[] = [];

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
            const playerAny = (Player as any);
            Spicetify.Platform.EnhanceAPI.addRecommendation(Player.data.context_uri, playerAny.data.context_metadata['reporting.uri'].match(/sessionId=(\d+)/)[1], [playerAny.data.track.uid], 0, 50)
            hideBadges();
        });

        removeToPlaylist.addEventListener('click', async () => {
            const playerData: any = Player.data;
            const sessionId = playerData.context_metadata['reporting.uri']!.match(/sessionId=(\d+)/)![1];

            try {
                const removeRecommendation: any = (document as any).querySelector(`[src*="${playerData.track.metadata['image_small_url'].match(/spotify:image:(\w+)/)[1]}"]`).parentElement.parentElement.querySelector('[class="main-trackList-rowSectionEnd"]').children[1];
                removeRecommendation.click();
            } catch (error) {
                console.log(error);
                toRemove.push(playerData.track.metadata['image_small_url'].match(/spotify:image:(\w+)/)[1]);
                Platform.EnhanceAPI.removeItems(Player.data.context_uri, sessionId, [playerData.track.uid], 0, 50, true);
            }

            Player.next();
            hideBadges();
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

    function onScroll() {
        toRemove.forEach((imageURI) => {
            const trackImage: any = (document as any).querySelector(`[src*="${imageURI}`);
            if (!trackImage) return;

            const isEnhanced = trackImage.parentElement.parentElement.querySelector('[class*="main-trackList-enhanced"]');
            if (!isEnhanced) return;

            console.log('We removed!', trackImage);

            toRemove.splice(toRemove.indexOf(imageURI));
            trackImage.parentElement.parentElement.remove();
        });
    };

    Player.addEventListener('onprogress', onSongProgress);
    onSongProgress();

    document.querySelectorAll('[class*="os-viewport"').forEach((el) => {
        el.addEventListener('scroll', onScroll);
    });
}

export default main;
