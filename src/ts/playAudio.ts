const playAudio = (src: string) => {
	const audio = document.createElement("audio");
	audio.src = src;
	audio.play();
};

export default playAudio;
