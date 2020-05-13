const getFile = async (audioContext, filepath) => {
  const response = await fetch(filepath);
  const arrayBuffer = await response.arrayBuffer();
  const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
  return audioBuffer;
};

export const setupSong = async (audioContext, filePath) => {
  const song = await getFile(audioContext, filePath);
  return song;
};

export const playSong = (audioContext, audioBuffer) => {
  const songSource = audioContext.createBufferSource();
  songSource.buffer = audioBuffer;
  // connect the AudioBufferSourceNode to the destination so that the sound can be heard
  songSource.connect(audioContext.destination);
  songSource.start();
  return songSource;
};
