import * as fs from "tns-core-modules/file-system";
import * as types from "tns-core-modules/utils/types";

export interface Sound {
  name: string;
  path: string;
  volume?: number;
  ambient?: boolean;
  onPlayed?: { (name: string, success: boolean): void };
}

interface Validator {
  validated: boolean;
  configuredPath: string;
  error: string;
}

export class Player {
  protected _sounds: Sound[];

  constructor(sounds: Sound[]) {
    (Array.isArray(sounds)
      ? sounds
      : [sounds]
    ).forEach((sound, index, array) => {
      const validator = this._soundValidator(sound);
      if (validator.validated) {
        array[index].path = validator.configuredPath;
      } else {
        console.log(validator.error);
        return;
      }
    });

    this._sounds = sounds;
  }

  public addSound(sound: Sound): void {
    const validator = this._soundValidator(sound);
    if (validator.validated) {
      sound.path = validator.configuredPath;
      this._sounds.push(sound);
    } else {
      console.log(validator.error);
    }
  }

  public removeSound(name: string): void {
    const sound = this._getSound(name);
    if (sound) this._sounds.splice(this._sounds.indexOf(sound), 1);
  }

  public setSoundVolume(name: string, volume: number): void {
    const sound = this._getSound(name);
    if (sound) sound.volume = volume;
  }

  public makeSoundAmbient(name: string, ambient: boolean): void {
    const sound = this._getSound(name);
    if (sound) sound.ambient = ambient;
  }

  protected _getSound(name: string): Sound {
    return this._sounds.find(sound => sound.name === name);
  }

  private _soundValidator(sound: Sound): Validator {
    let path = types.isString(sound.path) ? sound.path.trim() : "";
    const validation = { validated: false, configuredPath: "", error: "" };

    if (path.indexOf("~/") === 0) {
      path = fs.path.join(
        fs.knownFolders.currentApp().path,
        path.replace("~/", "")
      );
    }

    if (!fs.File.exists(path)) {
      validation.error = `
        NativeScript Sound! Invalid sound.
          - Reason: file not found.
          - Your provided file path: ${sound.path}
          - Configured file system path: ${path}
      `;
    } else if (!types.isString(sound.name)) {
      validation.error = `
        NativeScript Sound! Invalid sound.
          - Reason: invalid name or name type.
          - Your provided name: ${sound.name}
          - Your provided name type: ${typeof sound.name}
      `;
    }

    validation.configuredPath = path;
    return validation;
  }
}

export class Recorder {}
