export default function create(text, width = 480, height = 320, backgroundColor = '#e6e6e6', fontColor = '#000000', fontSize = 24) {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext('2d');
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, width, height);

    ctx.fillStyle = "#ffa500";
    ctx.rect(0, 0, width, height);
    ctx.lineWidth = 10;
    ctx.stroke();

    ctx.fillStyle = fontColor;
    ctx.font = `${fontSize}px Arial`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(`${text}`, (width / 2), (height / 2));

    return canvas.toDataURL('image/png');
}