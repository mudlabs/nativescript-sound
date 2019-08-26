import * as Base from "./sound.common";

export class Player extends Base.Player {
  private _player: AVAudioPlayer;
  private _session: AVAudioSession;
  private _delegate: AVAudioPlayerDelegate;
  private _currentSound: Base.Sound;

  constructor(sounds: Base.Sound[]) {
    super(sounds);
    // setup session
  }

  /**
   * Gets the underlying native audio player.
   */
  public getPlayer(): AVAudioPlayer {
    return this._player;
  }

  /**
   * Gets the underlying native audio session.
   */
  public getSession(): AVAudioSession {
    return this._session;
  }

  /**
   * Takes the name of one of the pre-defined sounds and prepares it to be played.
   */
  public prepare(name: string): void {
    const sound = this._getSound(name);
    if (sound) {
      this._player = new AVAudioPlayer({
        contentsOfURL: NSURL.fileURLWithPath(sound.path)
      });
      this._player.delegate = this._playerDelegate;
      this._player.numberOfLoops = 1;
      this._player.volume = sound.volume;
      this._player.prepareToPlay();
      this._currentSound = sound;
    }
  }

  /**
   * Plays the currently prepared sound.
   * Or if a valid name is provided, prepares that sound and then plays it.
   */
  public play(name?: string): void {
    if (name) {
      this.prepare(name);
      this._player.play();
    } else if (this._player && !this._player.playing) {
      this._player.play();
    }
  }

  /**
   * Stops any playing sound.
   */
  public stop(): void {
    if (this._player.playing) this._player.stop();
  }

  /**
   * Pauses any playing sound.
   */
  public pause(): void {
    if (this._player.playing) this._player.pause();
  }

  /**
   * Rewinds any playing sound by the time provided
   */
  public rewind(time: number): void {
    if (this._player.playing) {
      const past = this._player.currentTime - time;
      this._player.playAtTime(past < 0 ? 0 : past);
    }
  }

  /**
   * Fast forwards any playing sound by the time provided
   */
  public fastForward(time: number): void {
    if (this._player.playing) {
      const future = this._player.currentTime + time;
      this._player.playAtTime(
        future > this._player.duration ? this._player.duration : future
      );
    }
  }

  /**
   * Resets any playing sound to its begining. Does not play it.
   */
  public reset(name: string): void {
    if (this._player.playing) {
      this._player.stop();
      this._player.currentTime = 0;
      this._player.prepareToPlay();
    }
  }

  /**
   * Captures player events such as when the sound finishes.
   */
  private get _playerDelegate(): AVAudioPlayerDelegate {
    return (this._delegate = NSObject["extend"](
      {
        audioPlayerDidFinishPlayingSuccessfully: (player, success) => {
          if (this._currentSound.onPlayed) {
            this._currentSound.onPlayed(this._currentSound.name, success);
          }
        }
      },
      {
        protocols: [AVAudioPlayerDelegate]
      }
    )
      .alloc()
      .init());
  }
}

export class Recorder extends Base.Recorder {}
