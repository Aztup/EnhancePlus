var enhancePlus=(()=>{var e=async function e(){const{Platform:n,Player:l,CosmosAsync:t}=Spicetify;if(n&&l&&t){if(a(),!document.querySelector('[class*="main-nowPlayingWidget-nowPlaying"]'))return setTimeout(e,300);s();let t="";function a(){var e=document.querySelector('[class*="main-nowPlayingWidget-nowPlaying"]');e&&(e.insertAdjacentHTML("beforeend",`
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
        `),e=document.querySelector('[class="enhance-plus-remove-to-playlist"]'),document.querySelector('[class="enhance-plus-add-to-playlist"]').addEventListener("click",()=>{var e=l;Spicetify.Platform.EnhanceAPI.addRecommendation(l.data.context_uri,e.data.context_metadata["reporting.uri"].match(/sessionId=(\d+)/)[1],[e.data.track.uid],0,50),s()}),e.addEventListener("click",async()=>{var t=l.data,a=t.context_metadata["reporting.uri"].match(/sessionId=(\d+)/)[1];try{document.querySelector(`[src*="${t.track.metadata.image_small_url.match(/spotify:image:(\w+)/)[1]}"]`).parentElement.parentElement.querySelector('[class="main-trackList-rowSectionEnd"]').children[1].click()}catch(e){console.log(e),n.EnhanceAPI.removeItems(l.data.context_uri,a,[t.track.uid],0,50,!0)}l.next(),s()}))}function s(){let e=document.querySelector('[class="enhance-plus-remove-to-playlist"]'),t=document.querySelector('[class="enhance-plus-add-to-playlist"]');e&&t||(a(),e=document.querySelector('[class="enhance-plus-remove-to-playlist"]'),t=document.querySelector('[class="enhance-plus-add-to-playlist"]')),console.log("Hide badge"),t.style.display="none",e.style.display="none"}function c(){var e=l.data.track;if(!e||!e.metadata)return console.log("no track/metadata");if(e.uid&&t!==e.uid){if(t=e.uid,"enhanced_recommendation"!=e.metadata.provider)return s();{let e=document.querySelector('[class="enhance-plus-remove-to-playlist"]'),t=document.querySelector('[class="enhance-plus-add-to-playlist"]');e&&t||(a(),e=document.querySelector('[class="enhance-plus-remove-to-playlist"]'),t=document.querySelector('[class="enhance-plus-add-to-playlist"]')),console.log("Show badge"),t.style.display="flex",e.style.display="flex"}}}l.addEventListener("onprogress",c),c()}else setTimeout(e,300)};(async()=>{await e()})()})();(async()=>{var e;document.getElementById("enhancePlus")||((e=document.createElement("style")).id="enhancePlus",e.textContent=String.raw`
  .enhance-plus-btns-container{display:flex;align-items:center;gap:8px;justify-content:center}.enhance-plus-add-to-playlist>button,.enhance-plus-remove-to-playlist>button{border:none;background:0 0;display:flex;justify-content:center;align-items:center}.enhance-plus-svg{fill:currentColor}
      `.trim(),document.head.appendChild(e))})();