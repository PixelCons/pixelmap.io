// eslint-disable-next-line @typescript-eslint/no-var-requires
const sharp = require('sharp');

export async function renderImage(tileImageData: string, outputPath: string) {
  if (tileImageData.length >= 768) {
    // OWN IMAGE

    const imageDataArray = tileImageData.match(/.{1,3}/g);

    let counter = 0;

    const array = [];
    for (let x = 0; x <= 15; x++) {
      for (let y = 0; y <= 15; y++) {
        const index = counter;
        const hexstr = imageDataArray[index];
        const newhex =
          hexstr.substr(0, 1) +
          hexstr.substr(0, 1) +
          hexstr.substr(1, 1) +
          hexstr.substr(1, 1) +
          hexstr.substr(2, 1) +
          hexstr.substr(2, 1);
        // image.setPixelColor(parseInt('0x' + newhex + 'FF', 16), y, x);
        const bigint = parseInt('0x' + newhex, 16);
        const r = (bigint >> 16) & 255;
        const g = (bigint >> 8) & 255;
        const b = bigint & 255;
        array.push(r);
        array.push(g);
        array.push(b);
        counter++;
      }
    }
    const image = sharp(Uint8Array.from(array), {
      raw: {
        width: 16,
        height: 16,
        channels: 3,
      },
    }).resize(512, 512, { kernel: sharp.kernel.nearest });
    await image.toFile(outputPath);
  } else {
    console.log('Not saving image, invalid image data found!');
  }
}
