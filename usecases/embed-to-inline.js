// functions on strings
var sourceJs = smutil.file.readSync(sourcePath);
var sourceMapPath = smutil.file.findMapPath(sourceJs);
// var sourceMapPath = smutil.file.readMapPathSync(sourcePath);
var sourceMap = smutil.sourcemap.readSync(sourceMapPath);
smutil.sourcemap.removeSync(sourceMapPath);
sourceMap = smutil.sourcemap.setMapStyle('inline', sourceMap);
var sourceMapAsPath = smutil.sourcemap.writeSync(sourceMap);
sourceJs = smutil.file.storeSourceMapPath(sourceJs, sourceMapAsPath);
smutil.file.writeSync(sourceJs);

// async
async.waterfall([
  smutil.file.readSourceMapPath,
  function(path, callback) {
    smutil.sourcemap.read(path, function(map) {
      smutil.sourcemap.remove(path, function() {
        callback(map);
      });
    });
  },
  
])

// promise
whenSource = whenNode.call(smutil.file.read, sourcePath);
whenMap = whenSource
  .then(smutil.file.findMapPath)
  .then(whenNode.bind(smutil.sourcemap.read));
whenMap
  .then(whenNode.bind(smutil.sourcemap.remove));
whenMap
  .then(whenNode.bind(smutil.sourcemap.setMapStyle, 'inline'))
  .then(whenNode.bind(smutil.sourcemap.write))
  .then(smutil.file.storeSourceMapPath)
  .then(whenNode.bind(smutil.file.write));

// streams
smutil.file.readStream(sourcePath)
  .pipe()
  // ... i don't understand streams well enough or rather know libs with streams to make them easier, use them in more powerful methods, hmmm

// high level
smutil.both.setMapStyle('inline', sourcePath);
