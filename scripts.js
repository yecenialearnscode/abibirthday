document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById("myModal");
    const btn = document.querySelector(".button");
    const span = document.getElementsByClassName("close")[0];
    const popupImage = document.getElementById("popupImage");

    btn.addEventListener("click", function(event) {
        event.preventDefault();
        modal.style.display = "block";
    });

    span.addEventListener("click", function() {
        modal.style.display = "none";
        window.speechSynthesis.cancel(); // Stop any ongoing speech
    });

    window.addEventListener("click", function(event) {
        if (event.target === modal) {
            modal.style.display = "none";
            window.speechSynthesis.cancel(); // Stop any ongoing speech
        }
    });

    popupImage.addEventListener("click", speakBirthdayWish);

    function speakBirthdayWish() {
        if ('speechSynthesis' in window) {
            const message = "Happy Birthday!I hope you have the most amazing most blessed most sexy the most rich most vapes most baddie year yet!";
            const speech = new SpeechSynthesisUtterance(message);
            
            console.log("Attempting to speak");
            
            // Cancel any ongoing speech before starting a new one
            window.speechSynthesis.cancel();

            window.speechSynthesis.speak(speech);

            speech.onstart = function() {
                console.log("Speech has started");
                popupImage.style.border = "3px solid #ff69b4"; // Visual feedback
            };

            speech.onend = function() {
                console.log("Speech has finished");
                popupImage.style.border = "none"; // Remove visual feedback
            };

            speech.onerror = function(event) {
                console.error("Speech synthesis error:", event);
                popupImage.style.border = "none"; // Remove visual feedback
            };
        } else {
            console.log("Speech synthesis is not supported");
            alert("Happy Birthday! (Your browser doesn't support voice, so here's a text message instead!)");
        }
    }
});