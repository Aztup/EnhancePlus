var enhancePlus=(()=>{var e=async function e(){const{Platform:n,Player:l,CosmosAsync:t}=Spicetify,s=[];if(n&&l&&t){if(o(),!document.querySelector('[class*="main-nowPlayingWidget-nowPlaying"]'))return setTimeout(e,300);c();let t="";l.addEventListener("onprogress",r),r();const d=[];let a=setInterval(()=>{document.querySelectorAll('[class*="os-viewport"').forEach(e=>{d.includes(e)||(d.push(e),3===d.length&&clearInterval(a),e.addEventListener("scroll",i),console.log("listen to",e))})},100);function o(){var e=document.querySelector('[class*="main-nowPlayingWidget-nowPlaying"]');e&&(e.insertAdjacentHTML("beforeend",`
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
        `),e=document.querySelector('[class="enhance-plus-remove-to-playlist"]'),document.querySelector('[class="enhance-plus-add-to-playlist"]').addEventListener("click",()=>{var e=l.data;Spicetify.Platform.EnhanceAPI.addRecommendation(e.context.uri,e.context.metadata.enhanced_session_id,[e.track.uid],0,50),c()}),e.addEventListener("click",async()=>{var e=l.data,t=e.context.metadata.enhanced_session_id;s.push([e.track.metadata.image_small_url.match(/spotify:image:(\w+)/)[1],e.track.metadata.title]),n.EnhanceAPI.removeItems(e.context.uri,t,[e.track.uid],0,50,!0),i(),l.next(),c()}))}function c(){let e=document.querySelector('[class="enhance-plus-remove-to-playlist"]'),t=document.querySelector('[class="enhance-plus-add-to-playlist"]');e&&t||(o(),e=document.querySelector('[class="enhance-plus-remove-to-playlist"]'),t=document.querySelector('[class="enhance-plus-add-to-playlist"]')),console.log("Hide badge"),t.style.display="none",e.style.display="none"}function r(){var e=l.data.track;if(!e||!e.metadata)return console.log("no track/metadata");if(e.uid&&t!==e.uid){if(t=e.uid,"enhanced_recommendation"!=e.metadata.provider)return c();{let e=document.querySelector('[class="enhance-plus-remove-to-playlist"]'),t=document.querySelector('[class="enhance-plus-add-to-playlist"]');e&&t||(o(),e=document.querySelector('[class="enhance-plus-remove-to-playlist"]'),t=document.querySelector('[class="enhance-plus-add-to-playlist"]')),console.log("Show badge"),t.style.display="flex",e.style.display="flex"}}}function i(){s.forEach(([a,n])=>{document.querySelectorAll('[src*="'+a).forEach(e=>{if(e.parentElement.parentElement.querySelector('[class*="main-trackList-enhanced"]')){var t=e.parentElement.querySelector('[class*="main-trackList-rowTitle"]').innerHTML;if(t!=n)return console.log("does not match",t,n);s.splice(s.indexOf(a)),e.parentElement.parentElement.remove()}})})}console.log("EnhancePlus v1.0.1 loaded!")}else setTimeout(e,300)};(async()=>{await e()})()})();(async()=>{var e;document.getElementById("enhancePlus")||((e=document.createElement("style")).id="enhancePlus",e.textContent=String.raw`
  .enhance-plus-btns-container{display:flex;align-items:center;gap:8px;justify-content:center}.enhance-plus-add-to-playlist>button,.enhance-plus-remove-to-playlist>button{border:none;background:0 0;display:flex;justify-content:center;align-items:center}.enhance-plus-svg{fill:currentColor}
      `.trim(),document.head.appendChild(e))})();