import fs from 'fs';
import path from 'path';
import { nativeImage } from 'electron';

const imgRegExp = /^data\:image/g;

const clippingsHandler = (timestamp, clipping) => {
  const slice = clipping.slice(0, 12);
  // console.log(imgRegExp.test(slice));
  if (imgRegExp.test(slice)) {
    const img = nativeImage.createFromDataURL(clipping).toPNG();
    const filepath = path.resolve(__dirname, `../clippings/${timestamp}.png`);
    fs.writeFile(filepath, img, (err) => {
      if (err) throw err;
      // console.log(`${timestamp}.png is saved at ${filepath}.`);
    })
    return filepath;
  } else {
    return clipping;
  }
}

export default clippingsHandler;
