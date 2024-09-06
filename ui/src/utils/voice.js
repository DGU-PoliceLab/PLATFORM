const tts = (text) => {
    const speech = new SpeechSynthesisUtterance();
    speech.lang = "ko-KR";
    speech.text = text;
    speech.volume = 1;
    speech.rate = 1;
    speech.pitch = 0.6;
    window.speechSynthesis.speak(speech);
};

export { tts };
