// container player.js

import React, { Component } from 'react'

import { AUDIO_EXTENSIONS, SEEK_ON_PLAY_EXPIRY, canPlay } from '../../utils/player'
import { propTypes, defaultProps } from '../../props'

export default class Player extends Component {
  static displayName = 'Podcast Player'
  static canPlay = canPlay
  static propTypes = propTypes
  static defaultProps = defaultProps
  mounted = false
  isReady = false
  isPlaying = false // Track playing state internally to prevent bugs
  startOnPlay = true
  seekOnPlay = null

  componentDidMount() {
    this.mounted = true
    this.player.load(this.props.url, this.isReady)
    this.addListeners()
  }

  componentWillReceiveProps(nextProps) {
    if (this.shouldUseAudio(this.props) !== this.shouldUseAudio(nextProps)) {
      this.removeListeners()
    }
  }
  componentDidUpdate(prevProps) {
    if (this.shouldUseAudio(this.props) !== this.shouldUseAudio(prevProps)) {
      this.addListeners()
    }
  }

  componentWillUnmount() {
    if (this.isReady) {
      this.player.stop()
    }
    this.mounted = false
    this.removeListeners()
  }

  addListeners() {
    const { onReady, onPlay, onPause, onEnded, onError, playsinline } = this.props
    this.player.addEventListener('canplay', onReady)
    this.player.addEventListener('play', onPlay)
    this.player.addEventListener('pause', onPause)
    this.player.addEventListener('seeked', this.onSeek)
    this.player.addEventListener('ended', onEnded)
    this.player.addEventListener('error', onError)
    if (playsinline) {
      this.player.setAttribute('playsinline', '')
      this.player.setAttribute('webkit-playsinline', '')
    }
  }

  removeListeners() {
    const { onReady, onPlay, onPause, onEnded, onError } = this.props
    this.player.removeEventListener('canplay', onReady)
    this.player.removeEventListener('play', onPlay)
    this.player.removeEventListener('pause', onPause)
    this.player.removeEventListener('seeked', this.onSeek)
    this.player.removeEventListener('ended', onEnded)
    this.player.removeEventListener('error', onError)
  }

  onSeek = elem => {
    this.props.onSeek(elem.target.currentTime)
  }

  shouldUseAudio(props) {
    return AUDIO_EXTENSIONS.test(props.url) || props.config.file.forceAudio
  }

  play() {
    const promise = this.player.play()
    if (promise) {
      promise.catch(this.props.onError)
    }
  }

  pause() {
    this.player.pause()
  }

  stop() {
    this.player.removeAttribute('src')
    if (this.hls) {
      this.hls.destroy()
    }
    if (this.dash) {
      this.dash.reset()
    }
  }

  seekTo(seconds) {
    this.player.currentTime = seconds
  }

  setVolume(fraction) {
    this.player.volume = fraction
  }

  setPlaybackRate(rate) {
    this.player.playbackRate = rate
  }

  getDuration() {
    return this.player.duration
  }

  getCurrentTime() {
    return this.player.currentTime
  }

  getSecondsLoaded() {
    if (this.player.buffered.length === 0) return 0
    return this.player.buffered.end(0)
  }

  renderSource = source => {
    if (typeof source === 'string') {
      return <source key={source} src={source} />
    }
    const { src, type } = source
    return <source key={src} src={src} type={type} />
  }

  renderTrack = (track, index) => {
    return <track key={index} {...track} />
  }

  ref = player => {
    this.player = player
  }

  render() {
    const { url, loop, controls, config, width, height } = this.props
    const useAudio = this.shouldUseAudio(this.props)
    const Element = useAudio ? 'audio' : 'video'
    const src = url instanceof Array ? undefined : url
    const style = {
      width: !width || width === 'auto' ? width : '100%',
      height: !height || height === 'auto' ? height : '100%'
    }
    return (
      <Element
        ref={this.ref}
        src={src}
        style={style}
        preload="auto"
        controls={controls}
        loop={loop}
        {...config.file.attributes}>
        {url instanceof Array &&
          url.map(this.renderSource)
        }
        {config.file.tracks.map(this.renderTrack)}
      </Element>
    )
  }
}
