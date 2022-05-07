import html2canvas from "html2canvas";
import { Camera, Trash } from "phosphor-react";
import { useState } from "react";
import { Loading } from "./Loading";

interface ScreenShotButtonProps {
    screenshot: string | null;
    onScreenshotTook: (screenshot: string | null) => void;
}

export function ScreenShotButton({ 
    screenshot, 
    onScreenshotTook 
}: ScreenShotButtonProps) {
    const [isTakingScreenshot, setIsTakingScreenshot] = useState(false)

    async function handleTakeScreenShot() {
        setIsTakingScreenshot(true);

        const canvas = await html2canvas(document.querySelector('html')!); //! força para que o document nunca será null
        const base64image = canvas.toDataURL('image/png'); // tira print da tela , converte para png no formato base64 = formato de texto e esse texto representa 1 imagem
        // console.log(base64image);
        
        onScreenshotTook(base64image);
        setIsTakingScreenshot(false);
    }
    
    // Se já tiver 1 screenshot
    if (screenshot) {
        return (
            <button
                type="button"
                className="p-1 w-10 h-10 rounded-md border-transparent flex justify-end items-end text-zinc-100 hover:text-zinc-100 transition-colors"
                onClick={() => onScreenshotTook(null)}
                // 1 {} para indicar que é um código JS dentro do html e outra para indicar que isso é um objeto
                style={{
                    backgroundImage: `url(${screenshot})`,
                    backgroundPosition: 'right bottom',
                    backgroundSize: 180
                }}
            >
                <Trash weight="fill" />
            </button>
        )
    }

    return (
        <button
            type="button"
            onClick={handleTakeScreenShot}
            className="p-2 bg-zinc-800 rounded-md border-transparent hover:bg-zinc-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-brand-500"
        >
            { isTakingScreenshot ? <Loading /> : <Camera className="w-6 h-6" /> }
        </button>
    )
}