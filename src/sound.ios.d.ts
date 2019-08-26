import * as Base from "./sound.common";
export declare class Player extends Base.Player {
    private _player;
    private _session;
    private _delegate;
    private _currentSound;
    constructor(sounds: Base.Sound[]);
    getPlayer(): AVAudioPlayer;
    getSession(): AVAudioSession;
    prepare(name: string): void;
    play(name?: string): void;
    stop(): void;
    pause(): void;
    rewind(time: number): void;
    fastForward(time: number): void;
    reset(name: string): void;
    private readonly _playerDelegate;
}
export declare class Recorder extends Base.Recorder {
}
