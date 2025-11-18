import { useEffect, useState } from 'react';
import A from './../assets/A.png';
import B from './../assets/B.png';
import C from './../assets/C.png';
import D from './../assets/D.png';
import E from './../assets/E.png';
import F from './../assets/F.png';
import G from './../assets/G.png';
import H from './../assets/H.png';
import I from './../assets/I.png';
import J from './../assets/J.png';

interface MemoramaItems {
    url: string,
    isLookUp: boolean,
    label: string
    isSelected?: boolean,
    wasVisible?:boolean
}

export function useMemorama() {
    const [progress, setProgress] = useState(0);
    const [time, setTime] = useState(0);
    const [attempts, setAttempts] = useState(0);
    const [flippedPairs, setFlippedPairs] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isNewGame, setIsNewGame] = useState(false);
    const [flipedCards, setFlipedCards] = useState(0);
    const [memoramaItems, setMemoramaItems] = useState<MemoramaItems[]>([
        { url: A, isLookUp: false, label: 'A', isSelected: false,wasVisible:false },
        { url: A, isLookUp: false, label: 'A', isSelected: false,wasVisible:false },
        { url: B, isLookUp: false, label: 'B', isSelected: false,wasVisible:false },
        { url: B, isLookUp: false, label: 'B', isSelected: false,wasVisible:false },
        { url: C, isLookUp: false, label: 'C', isSelected: false,wasVisible:false },
        { url: C, isLookUp: false, label: 'C', isSelected: false,wasVisible:false },
        { url: D, isLookUp: false, label: 'D', isSelected: false,wasVisible:false },
        { url: D, isLookUp: false, label: 'D', isSelected: false,wasVisible:false },
        { url: E, isLookUp: false, label: 'E', isSelected: false,wasVisible:false },
        { url: E, isLookUp: false, label: 'E', isSelected: false,wasVisible:false },
        { url: F, isLookUp: false, label: 'F', isSelected: false,wasVisible:false },
        { url: F, isLookUp: false, label: 'F', isSelected: false,wasVisible:false },
        { url: G, isLookUp: false, label: 'G', isSelected: false,wasVisible:false },
        { url: G, isLookUp: false, label: 'G', isSelected: false,wasVisible:false },
        { url: H, isLookUp: false, label: 'H', isSelected: false,wasVisible:false },
        { url: H, isLookUp: false, label: 'H', isSelected: false,wasVisible:false },
        { url: I, isLookUp: false, label: 'I', isSelected: false,wasVisible:false },
        { url: I, isLookUp: false, label: 'I', isSelected: false,wasVisible:false },
        { url: J, isLookUp: false, label: 'J', isSelected: false,wasVisible:false },
        { url: J, isLookUp: false, label: 'J', isSelected: false,wasVisible:false },
    ]);

    //Metodo creado por chatgpt para el ordenamiento aletorio de elementos del arreglo 
    //El metodo shuffle es conocido por hacer un ordenamiento aleatorio en los elementos de un arreglo o coleccion 
    const shuffleArray = <T,>(array: T[]): T[] => {
        const newArray = [...array];
        for (let i = newArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
        }
        return newArray;
    };

    useEffect(() => {
        if (!isNewGame) {
            const newList = shuffleArray(memoramaItems);
            setMemoramaItems(newList);
            setAttempts(0);
            setFlipedCards(0);
            setProgress(0);
            setTime(0);
            setFlippedPairs(0);
            setIsPlaying(true);
        }
    }, [isNewGame]);

    useEffect(() => {
        if (isPlaying) {
            const timer = setInterval(() => {
                setTime(prev => (prev + 1));
            }, 1000);
            return () => clearInterval(timer);
        }

    }, [isPlaying]);

    useEffect(() => {
        if (flipedCards === 2) {
            const itemSelected = memoramaItems.filter((item) => item.isSelected === true);
            const isPair = itemSelected[0].label === itemSelected[1].label;
            setAttempts((prev) => prev + 1);
            setFlipedCards(0);
            if (isPair) {
                setFlippedPairs((prev) => prev + 1);
                setProgress(((flippedPairs + 1) / 10) * 100);
                const newList = memoramaItems.map((item) => {
                    return item.isSelected ? { ...item, isLookUp: true, isSelected: false,wasVisible:true } : item
                });
                setMemoramaItems(newList);
            } else {
                const newList = memoramaItems.map((item) => {
                    return item.isSelected ? { ...item, isLookUp: false, isSelected: false,wasVisible:true } : item
                });
                setTimeout(() => {
                    setMemoramaItems(newList);
                }, 600);
            }
        }
    }, [memoramaItems]);

    useEffect(() => {
        if (flippedPairs === 10) {
            console.log('Ya ganaste');
            setIsPlaying(false);
        }
    }, [flippedPairs]);

    const handleCard = async (indexp: number) => {
        const newList = memoramaItems.map((item, index) => {
            if (index == indexp && item.isLookUp === false) {
                const flipedCards = memoramaItems.filter((it) => it.isSelected === true).length;
                setFlipedCards(flipedCards + 1);
                if (flipedCards < 2) {
                    return { ...item, isLookUp: !item.isLookUp, isSelected: true };
                }
            }
            return item;
        })
        setMemoramaItems(newList);
    };

    return {
        progress,
        time,
        attempts,
        flippedPairs,
        handleCard,
        memoramaItems
    }

}