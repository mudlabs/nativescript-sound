import * as Base from "./sound.common";

export declare class Player extends Base.Player {
  constructor(sounds: Base.Sound[]);
  getPlayer();
  getSession();
  prepare(name: string);
  play(name?: string);
  stop();
  pause();
  rewind(time: number);
  fastForward(time: number);
  reset(name: string);
}

export declare class Recorder extends Base.Recorder {}
