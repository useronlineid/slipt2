window.onload = function() {
    setCurrentDateTime();
    updateDisplay();
};

function setCurrentDateTime() {
    const now = new Date();
    const localDateTime = now.toLocaleString('sv-SE', { timeZone: 'Asia/Bangkok', hour12: false });
    const formattedDateTime = localDateTime.replace(' ', 'T');
    document.getElementById('datetime').value = formattedDateTime;
}

function padZero(number) {
    return number < 10 ? '0' + number : number;
}

function formatDate(date) {
    const options = { day: 'numeric', month: 'short', year: '2-digit' };
    let formattedDate = new Date(date).toLocaleDateString('th-TH', options);
    formattedDate = formattedDate.replace(/ /g, ' ').replace(/\./g, '');
    const months = ['ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.', 'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'];
    const day = formattedDate.split(' ')[0];
    const month = months[new Date(date).getMonth()];
    const year = formattedDate.split(' ')[2];
    return `${day} ${month} ${year}`;
}

function generateUniqueID() {
    const now = new Date(document.getElementById('datetime').value);
    const year = now.getFullYear().toString().slice(-4);
    const month = padZero(now.getMonth() + 1);
    const day = padZero(now.getDate());
    const hours = padZero(now.getHours());
    const minutes = padZero(now.getMinutes());
    const randomNumber = Math.floor(Math.random() * 10000000000).toString().padStart(10, '0');
    return `${year}${month}${day}${randomNumber}`;
}


function updateDisplay() {
    const sendername = document.getElementById('sendername').value || '-';
    const senderaccount = document.getElementById('senderaccount').value || '-';
    const receivername = document.getElementById('receivername').value || '-';
    const receiveraccount = document.getElementById('receiveraccount').value || '-';
    const bank = document.getElementById('bank').value || '-';
    const amount11 = document.getElementById('amount11').value || '-';
    const amountDecimal = document.getElementById('amountDecimal').value || '-';
    const datetime = document.getElementById('datetime').value || '-';
    const AideMemoire = document.getElementById('AideMemoire').value || '-';
    const selectedImage = document.getElementById('imageSelect').value || '';
    const QRCode = document.getElementById('QRCode').value || '';

    let bankLogoUrl = '';
    switch (bank) {
        case 'KBANK':
            bankLogoUrl = 'https://github.com/useronlineid/Theslipcame/blob/main/KBANK1.png?raw=true';
            break;
        case 'KTB':
            bankLogoUrl = 'https://github.com/useronlineid/Theslipcame/blob/main/KTB2.png?raw=true';
            break;
        case 'BBL':
            bankLogoUrl = 'https://github.com/useronlineid/Theslipcame/blob/main/BBL2.png?raw=true';
            break;
        case 'SCB':
            bankLogoUrl = 'https://github.com/useronlineid/Theslipcame/blob/main/SCB.png?raw=true';
            break;
        case 'BAY':
            bankLogoUrl = 'https://github.com/useronlineid/Theslipcame/blob/main/BAY.png?raw=true';
            break;
        case 'ttb':
            bankLogoUrl = 'https://github.com/useronlineid/Theslipcame/blob/main/TTB2.png?raw=true';
            break;
        case 'GSB':
            bankLogoUrl = 'https://github.com/useronlineid/Theslipcame/blob/main/O2.png?raw=true';
            break;
        case 'ฺBAAC':
            bankLogoUrl = 'https://github.com/useronlineid/Theslipcame/blob/main/T2.png?raw=true';
            break;
        case 'GHB':
            bankLogoUrl = 'https://github.com/useronlineid/Theslipcame/blob/main/C1.png?raw=true';
            break;
        case 'KKP':
            bankLogoUrl = 'https://github.com/useronlineid/Theslipcame/blob/main/K1.png?raw=true';
            break;
        case 'CIMB':
            bankLogoUrl = 'https://github.com/useronlineid/Theslipcame/blob/main/CIMB.png?raw=true';
            break;
        case 'UOB':
            bankLogoUrl = 'https://github.com/useronlineid/Theslipcame/blob/main/UOB.png?raw=true';
            break;
        case 'LH BANK':
            bankLogoUrl = 'https://github.com/useronlineid/Theslipcame/blob/main/LHBANK1.png?raw=true';
            break;
        case 'ICBC':
            bankLogoUrl = 'https://github.com/useronlineid/Theslipcame/blob/main/ICBC.png?raw=true';
            break;
    }

    const formattedDate = formatDate(datetime);
    const formattedTime = new Date(datetime).toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' });

    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    
    // Load background image
    const backgroundImage = new Image();
    backgroundImage.src = 'https://github.com/useronlineid/slipt2/blob/main/PNG-TTB1.jpg?raw=true';
    backgroundImage.onload = function() {
        // Clear the canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw background image
        ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
        
        // Draw bank logo
        const bankLogo = new Image();
        bankLogo.src = bankLogoUrl;
        bankLogo.onload = function() {
            ctx.drawImage(bankLogo, 51.4, 703.7, 78.5, 78.5); // Adjust position and size as needed
            
            // Draw text with custom styles
            drawText(ctx, `${formattedDate}, ${formattedTime} น.`, 55.8, 395.7, '23.5px TTB Money', '#8e959d', '500', 'center', 1.5, 3, 0, 0, 800, 1);

            drawText(ctx, `${sendername}`, 138.5, 583.2, '26.9px TTB Money', '#124374', '600', 'left', 1.5, 3, 0, 0, 800, 0);
            drawText(ctx, `ttb`, 138.5, 655.6, '23.5px TTB Money', '#8e959d', '500', 'left', 1.5, 2, 0, 0, 500, 0);
            drawText(ctx, `${senderaccount}`, 138.5, 619.4, '25.2px TTB Money', '#8e959d', '500', 'left', 1.5, 1, 0, 0, 500, -0.50);
            
            drawText(ctx, `${receivername}`, 138.5, 735.8, '26.9px TTB Money', '#124374', '600', 'left', 1.5, 3, 0, 0, 800, 0);
            drawText(ctx, `${bank}`, 138.5, 809.0, '23.5px TTB Money', '#8e959d', '500', 'left', 1.5, 2, 0, 0, 500, 0);
            drawText(ctx, `${receiveraccount}`, 138.5, 771.9, '25.2px TTB Money', '#8e959d', '500', 'left', 1.5, 1, 0, 0, 500, -0.50);
            
            drawText(ctx, `${generateUniqueID()}`, 171.2, 940.5, '21.60px TTB Money', '#8e959d', '500', 'left', 1.5, 3, 0, 0, 500, 0.50);

            const amountText = `${amount11}`;
            const amountUnit = `${amountDecimal}`;
            const totalText = amountText + ' ' + amountUnit;
            const canvasWidth = canvas.width;
            const centerX = canvasWidth / 2;
          
            const amountX = centerX - (ctx.measureText(totalText).width / 0.85);
            const amountY = 476.2;
            
            drawText(ctx, amountText, amountX, amountY, '56.40px TTB Money', '#00225c', '600', 'left', 1.5, 3, 0, 0, 500, 1);
            
            const amountWidth = ctx.measureText(amountText).width;
            drawText(ctx, amountUnit, amountX + amountWidth + 7.5, amountY, '40.30px TTB Money', '#00225c', '600', 'left', 1.5, 0, 0, 0, 500, 1.5);
            
            
            drawText(ctx, `${QRCode}`, 238.9, 599.0, '33px Kanit', '#4e4e4e', '500', 'left', 1.5, 5, 0, 0, 500, 0);
            drawImage(ctx, 'https://github.com/useronlineid/Theslipcame/blob/main/TTB2.png?raw=true', 51.4, 550.0, 78.5, 78.5);  
       
            drawText(ctx, `${AideMemoire}`, 49.0, 877.0, '27.4px TTB Money', '#124374', '500', 'right', 1.5, 1, 0, 0, 800, 0);
            
          
            // Draw the selected image
            if (selectedImage) {
                const customImage = new Image();
                customImage.src = selectedImage;
                customImage.onload = function() {
                    ctx.drawImage(customImage, 0, 0, 646, 1200); // Adjust the position and size as needed
                }
            }
            //ถึงที่นี่
            
            
        }
    }
}

function drawText(ctx, text, x, y, font, color, weight, align, lineHeight, maxLines, shadowColor, shadowBlur, maxWidth, letterSpacing) {
    ctx.font = `${weight} ${font}`;
    ctx.fillStyle = color;
    ctx.textAlign = 'left'; // Always use left alignment for drawing text with custom letterSpacing
    ctx.shadowColor = shadowColor;
    ctx.shadowBlur = shadowBlur;

    const paragraphs = text.split('<br>');
    let currentY = y;

    paragraphs.forEach(paragraph => {
        const words = paragraph.split(' ');
        let currentLine = '';
        const lines = [];

        for (let i = 0; i < words.length; i++) {
            const testLine = currentLine + words[i] + ' ';
            const metrics = ctx.measureText(testLine);
            const testWidth = metrics.width + (testLine.length - 1) * letterSpacing;

            if (testWidth > maxWidth && i > 0) {
                lines.push(currentLine);
                currentLine = words[i] + ' ';
            } else {
                currentLine = testLine;
            }
        }
        lines.push(currentLine);

        lines.forEach((line, index) => {
            let currentX = x;
            if (align === 'center') {
                currentX = (ctx.canvas.width - ctx.measureText(line).width) / 2 - ((line.length - 1) * letterSpacing) / 2;
            } else if (align === 'right') {
                currentX = ctx.canvas.width - x - ctx.measureText(line).width - ((line.length - 1) * letterSpacing);
            }

            drawTextLine(ctx, line.trim(), currentX, currentY, letterSpacing);
            currentY += lineHeight;
            if (maxLines && index >= maxLines - 1) {
                return;
            }
        });
    });
}

function drawTextLine(ctx, text, x, y, letterSpacing) {
    if (!letterSpacing) {
        ctx.fillText(text, x, y);
        return;
    }

    const characters = text.split('');
    let currentPosition = x;

    characters.forEach((char, index) => {
        const charCode = char.charCodeAt(0);
        const prevChar = index > 0 ? characters[index - 1] : null;
        const prevCharCode = prevChar ? prevChar.charCodeAt(0) : null;

        const isUpperVowel = (charCode >= 0x0E34 && charCode <= 0x0E37);
        const isToneMark = (charCode >= 0x0E48 && charCode <= 0x0E4C);
        const isBeforeVowel = (charCode === 0x0E31);
        const isBelowVowel = (charCode >= 0x0E38 && charCode <= 0x0E3A);

        let yOffset = 0;
        let xOffset = 0;

        if (isUpperVowel) {
            yOffset = 1;
            xOffset = -1;
        }

        if (isToneMark) {
            if (prevChar && ((prevChar.charCodeAt(0) >= 0x0E34 && prevChar.charCodeAt(0) <= 0x0E37) || prevChar.charCodeAt(0) === 0x0E31)) {
                yOffset = -8; // วรรณยุกต์ที่มีสระ เลื่อนขึ้น 8 หน่วย
                xOffset = -5; // เลื่อนในแนวนอน ซ้าย 5 หน่วย
            } else {
                yOffset = -0; // วรรณยุกต์ไม่มีสระ เลื่อนขึ้น 8 หน่วย
                xOffset = -9; // เลื่อนในแนวนอน ซ้าย 5 หน่วย
            }
        }

        if (isBeforeVowel) {
            yOffset = 0;
            xOffset = -8;
        }

        if (isBelowVowel) {
            yOffset = 0;
            xOffset = -4;
        }

        ctx.fillText(char, currentPosition + xOffset, y + yOffset);

        if (!isToneMark && !isBeforeVowel && !isBelowVowel) {
            currentPosition += ctx.measureText(char).width + letterSpacing;
        } else {
            currentPosition += ctx.measureText(char).width;
        }
    });
}


document.getElementById('generate').addEventListener('click', updateDisplay);

function drawImage(ctx, imageUrl, x, y, width, height) {
    const image = new Image();
    image.src = imageUrl;
    image.onload = function() {
        ctx.drawImage(image, x, y, width, height);
    };
}

