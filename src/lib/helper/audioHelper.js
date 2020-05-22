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
