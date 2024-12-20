import React from "react";
import { QRCodeCanvas } from "qrcode.react";

interface QRCodeGeneratorProps {
    link: string;
}

const QRCodeGenerator: React.FC<QRCodeGeneratorProps> = ({ link }) => {
    return (
        <QRCodeCanvas
            value={link}
            size={232}
            bgColor={"#ffffff"} // Background color
            fgColor={"#000000"} // Foreground color
            level={"H"} // Error correction level (L, M, Q, H)
        />
    );
};

export default QRCodeGenerator;
