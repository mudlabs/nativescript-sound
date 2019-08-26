export interface Sound {
    name: string;
    path: string;
    volume?: number;
    ambient?: boolean;
    onPlayed?: {
        (name: string, success: boolean): void;
    };
}
export declare class Player {
    protected _sounds: Sound[];
    constructor(sounds: Sound[]);
    addSound(sound: Sound): void;
    removeSound(name: string): void;
    setSoundVolume(name: string, volume: number): void;
    makeSoundAmbient(name: string, ambient: boolean): void;
    protected _getSound(name: string): Sound;
    private _soundValidator;
}
export declare class Recorder {
}
