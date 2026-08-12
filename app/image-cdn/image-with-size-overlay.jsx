'use client';

import { useCallback, useRef, useState } from 'react';
import { getResourceSize } from 'utils';

export function ImageWithSizeOverlay({ src, srcSet, sizes, overlayPosition }) {
    const imageRef = useRef();
    const [imgSize, setImgSize] = useState(undefined);

    const handleImageLoad = useCallback((imgElement = imageRef.current) => {
        if (imgElement?.complete) {
            const size = getResourceSize(imgElement?.currentSrc);
            setImgSize(size);
        } else {
            setImgSize(undefined);
        }
    }, []);

    const setImageRef = useCallback((imgElement) => {
        imageRef.current = imgElement;
        if (imgElement?.complete) {
            handleImageLoad(imgElement);
        }
    }, [handleImageLoad]);

    return (
        <div className="relative">
            {imgSize && (
                <span
                    className={`absolute py-1.5 px-2.5 text-sm rounded bg-neutral-900/70 top-2.5 ${
                        overlayPosition === 'right' ? 'right-2.5' : 'left-2.5'
                    }`}
                >{`Size: ${Math.ceil(imgSize / 1024)}KB`}</span>
            )}

            <img
                src={src}
                srcSet={srcSet}
                sizes={sizes}
                alt="Corgi"
                onLoad={(event) => handleImageLoad(event.currentTarget)}
                ref={setImageRef}
            />
        </div>
    );
}
