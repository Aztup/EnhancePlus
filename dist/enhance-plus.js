var enhanceDplus=(()=>{var e=async function e(){const{Platform:t,Player:n,CosmosAsync:a}=Spicetify;if(t&&n&&a){document.querySelector('[class="main-nowPlayingWidget-nowPlaying"]').insertAdjacentHTML("beforeend",`
  <div class="enhance-plus-btns-container">
  <span class="enhance-plus-add-to-playlist">
     <button type="button" aria-label="Conserver dans la playlist" class="TRDgmejiOzKjissuLFSx" tabindex="-1" aria-expanded="false">
        <svg role="img" height="16" width="16" viewBox="0 0 16 16" class="Svg-ytk21e-0 eqtHWV">
           <path d="M8 1.5a6.5 6.5 0 100 13 6.5 6.5 0 000-13zM0 8a8 8 0 1116 0A8 8 0 010 8z"></path>
           <path d="M11.75 8a.75.75 0 01-.75.75H8.75V11a.75.75 0 01-1.5 0V8.75H5a.75.75 0 010-1.5h2.25V5a.75.75 0 011.5 0v2.25H11a.75.75 0 01.75.75z"></path>
        </svg>
     </button>
  </span>
  <span class="enhance-plus-remove-to-playlist">
     <button type="button" aria-label="Conserver dans la playlist" class="TRDgmejiOzKjissuLFSx" tabindex="-1" aria-expanded="false">
      <svg role="img" height="16" width="16" viewBox="0 0 16 16" class="Svg-ytk21e-0 eqtHWV">
          <path d="M8 1.5a6.5 6.5 0 100 13 6.5 6.5 0 000-13zM0 8a8 8 0 1116 0A8 8 0 010 8z"></path>
          <path d="M12 8.75H4v-1.5h8v1.5z"></path>
      </svg>
     </button>
  </span>
  </div>
  `);const l=document.querySelector('[class="enhance-plus-add-to-playlist"]'),i=document.querySelector('[class="enhance-plus-remove-to-playlist"]');let a;function s(){console.log("Hide badge"),l.style.display="none",i.style.display="none"}s(),l.addEventListener("click",()=>{Spicetify.Platform.EnhanceAPI.addRecommendation(n.data.context_uri,n.data.context_metadata["reporting.uri"].match(/sessionId=(\d+)/)[1],[n.data.track.uid],0,50),s()}),i.addEventListener("click",async()=>{var a=n.data.context_metadata["reporting.uri"].match(/sessionId=(\d+)/)[1];try{document.querySelector(`[src*="${n.data.track.metadata.image_small_url.match(/spotify:image:(\w+)/)[1]}"]`).parentElement.parentElement.querySelector('[class="main-trackList-rowSectionEnd"]').children[1].click()}catch(e){t.EnhanceAPI.removeItems(n.data.context_uri,a,[n.data.track.uid],0,50,!0)}n.next(),s()}),setInterval(()=>{var e=n.data.track.uri;if(a!=e){if(a=e,"enhanced_recommendation"!=n.data.track.metadata.provider)return s();console.log("Show badge"),l.style.display="flex",i.style.display="flex"}},10)}else setTimeout(e,300)};(async()=>{await e()})()})();(async()=>{var e;document.getElementById("enhanceDplus")||((e=document.createElement("style")).id="enhanceDplus",e.textContent=String.raw`
  .enhance-plus-btns-container{display:flex;align-items:center;gap:8px;justify-content:center}.enhance-plus-add-to-playlist>button,.enhance-plus-remove-to-playlist>button{border:none;background:0 0;display:flex;justify-content:center;align-items:center}
      `.trim(),document.head.appendChild(e))})();