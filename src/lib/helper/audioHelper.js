import { guess } from "web-audio-beat-detector";

const getFile = async (audioContext, filepath) => {
  const response = await fetch(filepath);
  const arrayBuffer = await response.arrayBuffer();
  const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
  return audioBuffer;
};

export const setupSong = async (audioContext, filePath) => {
  const song = await getFile(audioContext, filePath);

  const { bpm, offset } = await guess(song);

  return {
    song,
    bpm,
    offset,
  };
};

export const resolveBpm = (detectedBpm, taggedBpm) => {
  const tagged = Number(taggedBpm);
  if (Number.isFinite(tagged) && tagged > 0) {
    return tagged;
  }
  return detectedBpm;
};
