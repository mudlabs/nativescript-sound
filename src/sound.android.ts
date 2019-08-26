import * as Base from "./sound.common";

export class Player extends Base.Player {
  constructor(sounds: Base.Sound[]) {
    super(sounds);
  }

  private setListeners() {
    // setOnCompletionListener(
    //   new android.media.MediaPlayer.OnCompletionListener({
    //     onCompletion: media_player => {
    //       //...
    //     }
    //   })
    // )
  }
}

export class Recorder extends Base.Recorder {}
