function expandHex(collapsedHex) {
    return collapsedHex
        .split('')
        .map((char) => `${char}${char}`)
        .join('');
}

function findNormalizedRGB(hex) {
    const rawHex = hex.charAt(0) === '#' ? hex.substr(1) : hex;
    const expandedHex = rawHex.length === 6 ? rawHex : expandHex(rawHex);
    const r = parseInt(expandedHex.substr(0, 2), 16);
    const g = parseInt(expandedHex.substr(2, 2), 16);
    const b = parseInt(expandedHex.substr(4, 2), 16);

    return { rSRGB: r / 255, gSRGB: g / 255, bSRGB: b / 255 };
}

function calculateColor(srgb) {
    if (srgb <= 0.03928) {
        return srgb / 12.92;
    }
    return ((srgb + 0.055) / 1.055) ** 2.4;
}

function findNormalizedSRGB(hex) {
    const { rSRGB, gSRGB, bSRGB } = findNormalizedRGB(hex);

    const r = calculateColor(rSRGB);
    const g = calculateColor(gSRGB);
    const b = calculateColor(bSRGB);

    return { r, g, b };
}

function calculateLuma(hex) {
    const { r, g, b } = findNormalizedSRGB(hex);

    return (0.2126 * r) + (0.7152 * g) + (0.0722 * b);
}

function calculateContrast(foregroundHex, backgroundHex) {
    const l1 = calculateLuma(foregroundHex);
    const l2 = calculateLuma(backgroundHex);

    if (l1 > l2) {
        return (l1 + 0.05) / (l2 + 0.05);
    }
    return (l2 + 0.05) / (l1 + 0.05);
}

export default function createContrastString(foregroundHex, backgroundHex) {
    const contrast = calculateContrast(foregroundHex, backgroundHex);

    let WCAGLevel = '';
    if (contrast > 7) {
        WCAGLevel = 'AAA';
    } else if (contrast > 4.5) {
        WCAGLevel = 'AA';
    } else if (contrast > 3) {
        WCAGLevel = 'AA Large';
    }

    return `${WCAGLevel} ${contrast.toFixed(2)}`;
}
