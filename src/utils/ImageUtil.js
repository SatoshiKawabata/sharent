class ImageUtil {
  static loadImg(src:string):Promise<HTMLImageElement> {
    return new Promise(resolve => {
      const img = new Image();
      img.onload = () => {
        resolve(img);
      };
      img.src = src;
    });
  }

  static canvas2imgUrl(canvas:HTMLCanvasElement):string {
    const url = canvas.toDataURL('image/png');
    return url;
  }

  static img2canvasWithRotation(img:HTMLImageElement):HTMLCanvasElement {
    const canvas = document.createElement('canvas');
    canvas.width = img.height;
    canvas.height = img.width;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.rotate(90 * Math.PI / 180);
    ctx.translate(0, -img.height);
    ctx.drawImage(img, 0, 0);
    ctx.restore();
    return canvas;
  }
}

export default ImageUtil;