# Music Machine

This was a fun project to learn webpack with. TL;DR webpack is hard. But
there's a lot of batteries on the shelf. And most of them seem to work alright?
So sure, why not.

This is a toy synth in pure es6. I used [timbre](https://mohayonao.github.io/timbre.js/) to make sounds. Timbre is pretty cool.

Bottom row of keyboard keys is your piano (Z=C, X=D, ... ,=C'). Half-tones are on the second row (S=C#, G=F#, etc)

The back-tick (\`) will start a metronome and recording. Hit it again to stop. `1` starts playback. This recording system quantizes to 16th notes.

# Developing

`npm install` the world

Run dev server: `webpack-dev-server --hot`
