import { useContext, useState } from "react";
import { MusicPlayerContext } from "../contexts/MusicPlayerContext";


const useMusicPlayer = () => {
  const { state, setState } = useContext(MusicPlayerContext);

  // Toggle loop state
  function toggleLoop() {
    setState((state) => ({ ...state, loop: !state.loop }));
    state.audioPlayer.loop = !state.audioPlayer.loop;
    console.log(state.audioPlayer.loop)
  }

  // Play a specific track
  function playTrack(index) {
    if (index === state.currentTrackIndex) {
      togglePlay();
    } else {
      state.audioPlayer.pause();

      const audio = new Audio(state.tracks[index].file);
      audio.loop = state.loop;  // Set loop state
      state.audioPlayer = audio;
      state.audioPlayer.play();

      setState((state) => ({
        ...state,
        currentTrackIndex: index,
        isPlaying: true,
      }));
    }
  }

  // Toggle play or pause
  function togglePlay() {
    if (state.isPlaying) {
      state.audioPlayer.pause();
    } else {
      state.audioPlayer.play();
    }
    setState((state) => ({ ...state, isPlaying: !state.isPlaying }));
  }

  // Play the previous track in the tracks array
  function playPreviousTrack() {
    const newIndex =
      (((state.currentTrackIndex + -1) % state.tracks.length) +
        state.tracks.length) %
      state.tracks.length;
    playTrack(newIndex);
  }
  // Play the next track in the tracks array
  function playNextTrack() {
    const newIndex = (state.currentTrackIndex + 1) % state.tracks.length;
    playTrack(newIndex);
  }

  return {
    playTrack,
    togglePlay,
    toggleLoop, // Add toggleLoop to the return object
    currentTrackName:
      state.currentTrackIndex !== null &&
      state.tracks[state.currentTrackIndex].name,
    trackList: state.tracks,
    isPlaying: state.isPlaying,
    loop: state.loop, // Add loop state to the return object
    currentTrackIndex: state.currentTrackIndex,
    playPreviousTrack,
    playNextTrack,
  };
};

export default useMusicPlayer;
