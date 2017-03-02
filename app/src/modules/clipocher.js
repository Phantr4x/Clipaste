import { clipboard } from 'electron';

const clipocher = (options = { delay: 1000 }) => {
  let lastTxt = clipboard.readText();
  let lastImg = clipboard.readImage();

  const intervalId = setInterval(() => {
    const txt = clipboard.readText();
    const img = clipboard.readImage();

    if (options.onimagechange && imgDiff(img, lastImg)) {
      lastImg = img;
      return options.onimagechange(img);
    }

    if (options.ontextchange && txtDiff(txt, lastTxt)) {
      lastTxt = txt;
      return options.ontextchange(txt);
    }
  }, options.delay);

  return {
    stop: () => clearInterval(intervalId),
  }
}

const txtDiff = (a, b) => a && b !== a;
const imgDiff = (a, b) => !a.isEmpty() && b.toDataURL() !== a.toDataURL();

export default clipocher;
