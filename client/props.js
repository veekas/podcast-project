import PropTypes from 'prop-types'

const { string, bool, number, array, oneOfType, shape, object, func } = PropTypes

export const propTypes = {
  url: oneOfType([string, array]),
  playing: bool,
  loop: bool,
  controls: bool,
  volume: number,
  muted: bool,
  playbackRate: number,
  width: oneOfType([string, number]),
  height: oneOfType([string, number]),
  style: object,
  progressFrequency: number,
  playsinline: bool,
  config: shape({
    file: shape({
      attributes: object,
      tracks: array,
      forceAudio: bool,
      forceHLS: bool,
      forceDASH: bool
    })
  }),
  onReady: func,
  onStart: func,
  onPlay: func,
  onPause: func,
  onBuffer: func,
  onEnded: func,
  onError: func,
  onDuration: func,
  onSeek: func,
  onProgress: func
}

export const defaultProps = {
  playing: false,
  loop: false,
  controls: false,
  volume: 0.8,
  muted: false,
  playbackRate: 1,
  width: 640,
  height: 360,
  style: {},
  progressFrequency: 1000,
  playsinline: false,
  config: {
    file: {
      attributes: {},
      tracks: [],
      forceAudio: false,
      forceHLS: false,
      forceDASH: false
    }
  },
  onReady: function () { },
  onStart: function () { },
  onPlay: function () { },
  onPause: function () { },
  onBuffer: function () { },
  onEnded: function () { },
  onError: function () { },
  onDuration: function () { },
  onSeek: function () { },
  onProgress: function () { }
}
