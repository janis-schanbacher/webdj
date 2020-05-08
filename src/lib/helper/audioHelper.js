const getFile = async (audioContext, filepath) => {
  const response = await fetch(filepath);
  const arrayBuffer = await response.arrayBuffer();
  const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
  return audioBuffer;
}

export const setupSong = async (audioContext, filePath) => {
  // const filePath = 'assets/Medular-Neuroluminescence.mp3';
  const song = await getFile(audioContext, filePath);
  return song;
}

export const playSong = (audioContext, audioBuffer) => {
  const songSource = audioContext.createBufferSource();
  songSource.buffer = audioBuffer;
  songSource.connect(audioContext.destination)
  songSource.start();
  return songSource;
}