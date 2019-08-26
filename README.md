# NativeScript Sound

Play and record sound in your NativeScript application.

## Table of Contents
  * [Intallation](#installation)
  * [Player](#player)
    * [Usage](#player-usage)
    * [Methods](#player-methods)
    * [Sound Object](#sound-object)
  * [Recorder](#recorder)
    * [Usage](#recorder-usage)
    * [Methods](#recorder-methods)

## Installation

Run the following command from the root of your project:

```
tns plugin add nativescript-sound
```

## Player

### Player Usage
A sound `Player` must be provided an array of [Sound Objects](#sound-object).
```js
// First, require the plugin.
const sound = require("nativescript-sound");

// Then create your Player.
const Player = new sound.Player([{ name:"Tada", path:"~/sounds/tada.mp3" }]);

// Now prepare the sound you want to play, and play it.
Player.prepare("Tada");
Player.play()
```

### Player Methods

#### prepare
It's important to preload the audio file before playing, as there's a delay during creation due to the audio being processed.
  * Only one sound can be prepared to play at any time. 
```js
// Prepare a sound to be played at some future time.
Player.prepare("Tada");

// Or prepare a sound and play it ASAP.
Player.prepare("Tada").play();
```

#### play
Play the currently prepared sound, or prepare one and then play it.
```js
// Play the currently prepared sound.
Player.play();

// Or prepare a new sound and then play it ASAP.
Player.play("Bang");
```

#### stop
Stops the playing sound. A subsequent call to `play` will pick-up where you left off.
```js
Player.stop();
```

#### pause
Same as stop.
```js
Player.pause();
```

#### reset
Stops the playing sound and resets its current play time to `0`. A subsiquent call to `play` will play the sound from the start.
```js
Player.reset();
```

#### back
Set the play time of the current sound back by __X__ millseconds.
```js
Player.back(10000);// 10 seconds
```

#### forward
Set the play time of the current sound forward by __X__ millseconds.
```js
Player.forward(10000);//10 seconds
```

#### isPrepared
Whether or not the Player has a sound prepared and ready to play.
```js
Player.isPrepared();
```

#### isPlaying
Whether or not a sound is currenlty playing.
```js
Player.isPlaying();
```

#### getTime
The current playback time of the prepared sound.
  * Returns a `number`(milliseconds), or `null` if there is no prepared sound.
```js
Player.getTime();
```

#### getDuration
The duration of the prepared sound.
  * Returns a `number`(milliseconds), or `null` if there is no prepared sound.
```js
Player.getDuration()
```

#### getName
The name of the prepared sound.
  * Returns the `name` of the prepared sound, or `null` if there is no prepared sound.
```js
Player.getName()
```

#### addSound
Add a new sound to the Players' sounds array.
```js
Player.addSound({
  name: "Ding",
  path: "~/sounds/ding.mp3"
});
```

#### removeSound
Remove a sound from the Players' sounds array.
```js
Player.removeSound("Ding");
```

#### getSoundVolume
Get the playback volume of a given sound.
  * Returns a `number`, or null if the provided name does not match any of the Players' sounds.
```js
Player.getSoundVolume("Tada");
```
#### setSoundVolume
Set the playback volume of a given sound.
```js
Player.setSoundVolume("Tada",3);
```

#### getSoundRate
Get the playback rate of a given sound.
  * Returns a `number`, or null if the provided name does not match any of the Players' sounds.
```js
Player.getSoundRate("Tada");
```
#### setSoundRate
Set the playback rate of a given sound.
```js
Player.setSoundRate("Tada", 2);
```

#### getSoundAmbience
Get the ambient state of a given sound
  * Retuns a `boolean`, or null if the provided _name_ does not match any of the Players' sounds.
```js
Player.getSoundAmbience("Tada");
```
#### setSoundAmbience
Set the ambient state of a given sound
```js
Player.setSoundAmbience("Tada", true);
```

#### getSoundLoops
Get the playback loop count of a given sound.
  * Retuns a `number`, or null if the provided _name_ does not match any of the Players' sounds.
```js
Player.getSoundLoops("Tada");
```
#### setSoundLoops
Set the playback loop count of a given sound.
```js
Player.setSoundLoops("Tada",2);
```

#### Native Control
If you need to implement any unexposed native behaviour, you can get the underlying native objects and then do whatever you need.
```js
/* 
 * Returns the underlying native audio player.
 *  iOS - AVAudioPlayer
 *  Android - android.media.MediaPlayer
 */
Player.getNativePlayer();

/*
 * Returns the underlying native audio player controller.
 *  iOS - AVAudioSession
 *  Android - ...
 */
Player.getNativePlayerController();
```

### Sound Object

| Property | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| name | string | YES | n/a | The name of your sound. It should be unque, as it's how you will manage the sound through the public methods. |
| path | string | YES | n/a | The path to your sound, including its extension. |
| volume | number | no | 5 | How loud should your sound play. |
| rate | number | no | 1 | Sets the playback rate _(i.e. 2 x speed)_. |
| loops | number | no | 1 | Number of times to play on each call to `play`. |
| ambient | boolean | no | false | Should your sound play in the background, and allow other sounds, from other apps to play at the same time. |
| onPlayed | callback | no | n/a | A callback to receive notification when a sound finishes playing. |


---

## Recorder

### Recorder Usage

### Recorder Methods