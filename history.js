// Global tracking nodes anchored at the root level
window.previouslyPlayedTrack = null;
window.currentlyPlayingTrack = null;

// Spliced into your main player trigger (right where audioPlayer.src is assigned)
function trackTelemetryUpdate(newTrackData) {
    // Shift current track to the previous historical slot before updating
    window.previouslyPlayedTrack = window.currentlyPlayingTrack;
    window.currentlyPlayingTrack = newTrackData;
}

// Dedicated execution routine for the Previous Button
function stepBackOneTrack() {
    if (!window.previouslyPlayedTrack) {
        console.warn("📡 History Warning: No previous track telemetry recorded in this session.");
        return;
    }

    // Capture target to prevent loop erasing during the manual override execution
    const targetTrack = window.previouslyPlayedTrack;

    // Call your existing client-side manual override/loading function
    // (Replace 'loadTrackIntoPlayer' with the exact name of your frontend loader function)
    if (typeof window.loadTrackIntoPlayer === "function") {
        window.loadTrackIntoPlayer(targetTrack);
        
        // Reset the telemetry states so the current becomes previous
        window.currentlyPlayingTrack = targetTrack;
        window.previouslyPlayedTrack = null; // Cleared until the next track transition fires
        
        console.log(`⏪ Step-Back Successful: Reloaded ${targetTrack.title || 'Previous Track'}`);
    } else {
        console.error("❌ Critical: Main player loader function not found in global scope.");
    }
}

// Bind event listener to hardware element once DOM context loads
document.addEventListener("DOMContentLoaded", () => {
    const prevBtn = document.getElementById("prevTrackBtn");
    if (prevBtn) {
        prevBtn.addEventListener("click", stepBackOneTrack);
    }
});
