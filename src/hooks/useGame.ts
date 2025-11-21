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
    wasVisible?: boolean
}

interface Player {
    name: string,
    flipedCards: number,
}


interface MemoramaItemsIA {
    label: string
    isSelected?: boolean,
    wasVisible?: boolean
}

export function useGame() {
    const [progress, setProgress] = useState(0);
    const [time, setTime] = useState(0);
    const [flippedPairs, setFlippedPairs] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isNewGame, setIsNewGame] = useState(false);
    const [flipedCards, setFlipedCards] = useState(0);
    const [memoramaItems, setMemoramaItems] = useState<MemoramaItems[]>([
        { url: A, isLookUp: false, label: 'A', isSelected: false, wasVisible: false },
        { url: A, isLookUp: false, label: 'A', isSelected: false, wasVisible: false },
        { url: B, isLookUp: false, label: 'B', isSelected: false, wasVisible: false },
        { url: B, isLookUp: false, label: 'B', isSelected: false, wasVisible: false },
        { url: C, isLookUp: false, label: 'C', isSelected: false, wasVisible: false },
        { url: C, isLookUp: false, label: 'C', isSelected: false, wasVisible: false },
        { url: D, isLookUp: false, label: 'D', isSelected: false, wasVisible: false },
        { url: D, isLookUp: false, label: 'D', isSelected: false, wasVisible: false },
        { url: E, isLookUp: false, label: 'E', isSelected: false, wasVisible: false },
        { url: E, isLookUp: false, label: 'E', isSelected: false, wasVisible: false },
        { url: F, isLookUp: false, label: 'F', isSelected: false, wasVisible: false },
        { url: F, isLookUp: false, label: 'F', isSelected: false, wasVisible: false },
        { url: G, isLookUp: false, label: 'G', isSelected: false, wasVisible: false },
        { url: G, isLookUp: false, label: 'G', isSelected: false, wasVisible: false },
        { url: H, isLookUp: false, label: 'H', isSelected: false, wasVisible: false },
        { url: H, isLookUp: false, label: 'H', isSelected: false, wasVisible: false },
        { url: I, isLookUp: false, label: 'I', isSelected: false, wasVisible: false },
        { url: I, isLookUp: false, label: 'I', isSelected: false, wasVisible: false },
        { url: J, isLookUp: false, label: 'J', isSelected: false, wasVisible: false },
        { url: J, isLookUp: false, label: 'J', isSelected: false, wasVisible: false },
    ]);
    const [isOpenMenuModal, setIsOpenMenuModal] = useState(false);
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [isOpenInputModalP1, setIsOpenInputModalP1] = useState(false);
    const [isOpenInputModalP2, setIsOpenInputModalP2] = useState(false);
    const [nameP1, setNameP1] = useState('');
    const [nameP2, setNameP2] = useState('');
    const [modalText, setModalText] = useState('')
    const [gameMode, setGameMode] = useState('');
    const [players, setPlayers] = useState<Player[]>([]);
    const [currentPlayer, setCurrentPlayer] = useState(0);
    const [ItemsIA, setItemIA] = useState<MemoramaItemsIA[]>([]);
    const [isResolving, setIsResolving] = useState(false);

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
            setFlipedCards(0);
            setProgress(0);
            setTime(0);
            setFlippedPairs(0);
            setPlayers([]);

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
        setIsOpenMenuModal(true);
    }, []);

    useEffect(() => {
        if (flippedPairs === 10) {

            if (players.length === 1) {
                setModalText(`Felicidades ${players[0].name}, completaste el juego!`);
            }

            if (players.length === 2) {
                if (players[0].flipedCards > players[1].flipedCards)
                    setModalText(`Felicidades Ganaste ${players[0].name}!!`);
                else if (players[0].flipedCards < players[1].flipedCards)
                    setModalText(`Felicidades Ganaste ${players[1].name}!!`);
                else
                    setModalText('Empate !!!');
            }

            setIsPlaying(false);
        }
    }, [flippedPairs]);


    useEffect(() => {

        if (flipedCards === 2) {

            setIsResolving(true);

            const itemSelected = memoramaItems.filter((item) => item.isSelected === true);
            if (itemSelected.length < 2) return;

            const isPair = itemSelected[0].label === itemSelected[1].label;
            setFlipedCards(0);
            console.log(itemSelected);
            if (isPair) {
                setFlippedPairs((prev) => prev + 1);
                setProgress(((flippedPairs + 1) / 10) * 100);

                const newList = memoramaItems.map((item) =>
                    item.isSelected
                        ? { ...item, isLookUp: true, isSelected: false, wasVisible: true }
                        : item
                );

                setPlayers(prev =>
                    prev.map(p =>
                        p.name === players[currentPlayer].name
                            ? { ...p, flipedCards: p.flipedCards + 1 }
                            : p
                    )
                );

                setTimeout(() => {
                    setMemoramaItems(newList);
                    setIsResolving(false);
                   
                }, 600);

            } else {

                const newList = memoramaItems.map((item) =>
                    item.isSelected
                        ? { ...item, isLookUp: false, isSelected: false, wasVisible: true }
                        : item
                );

                setTimeout(() => {
                    setMemoramaItems(newList);
                    if (gameMode !== '1P') {
                        setCurrentPlayer(prev => (prev === 0 ? 1 : 0));
                    }
                    setIsResolving(false);
                }, 600);
            }
        }

    }, [flipedCards]);

    useEffect(() => {
        if (!isResolving && players[currentPlayer]?.name === "IA") {
            handleAITurn();
        }
    }, [flipedCards]);

    useEffect(() => {
        if (!isResolving && players[currentPlayer]?.name === "IA") {
            handleAITurn();
        }
    }, [currentPlayer]);


    const handleAITurn = () => {
        if (isResolving) return;

        setTimeout(() => {
            if (!isResolving && flipedCards < 2) {
                playAITurn();
            }
        }, 300 + Math.random() * 300);
    };

    const playAITurn = () => {
        if (isResolving) return;
        if (flipedCards >= 2) return;

        let n = Math.floor(Math.random() * 20);

        while (memoramaItems[n].isLookUp || memoramaItems[n].isSelected) {
            n = Math.floor(Math.random() * 20);
        }

        const newList = memoramaItems.map((item, index) => {
            if (index === n) {
                return { ...item, isLookUp: true, isSelected: true, wasVisible: true };
            }
            return item;
        });

        setMemoramaItems(newList);
        setFlipedCards(prev => prev + 1);
    };

    const handleCard = async (indexp: number) => {
        if (isResolving) return;
        if (gameMode === "1P vs 2P" || gameMode === "1P" || (gameMode === "1P VS IA" && currentPlayer === 0)) {
            const newList = memoramaItems.map((item, index) => {
                if (index == indexp && item.isLookUp === false) {
                    const flipedCards = memoramaItems.filter((it) => it.isSelected === true).length;
                    setFlipedCards(flipedCards + 1);
                    if (flipedCards < 2) {
                        return { ...item, isLookUp: !item.isLookUp, isSelected: true, wasVisible: true };
                    }
                }
                return item;
            })
            setMemoramaItems(newList);
        }
    };


    const confirmPlayer1 = () => {
        if (!nameP1.trim()) return;

        if (gameMode === '1P') {
            // Solo un jugador
            const p = { name: nameP1, flipedCards: 0 };
            setPlayers([p]);
            setCurrentPlayer(0);
            setIsOpenInputModalP1(false);
            setIsPlaying(true);
        }

        if (gameMode === '1P vs 2P') {
            setPlayers([{ name: nameP1, flipedCards: 0 }]);
            setIsOpenInputModalP1(false);
            setIsOpenInputModalP2(true);
        }

        if (gameMode === '1P VS IA') {
            const p1 = { name: nameP1, flipedCards: 0 };
            const ia = { name: 'IA', flipedCards: 0 };

            setPlayers([p1, ia]);
            setCurrentPlayer(0);
            setIsOpenInputModalP1(false);
            setIsPlaying(true);
        }
    };


    const confirmPlayer2 = () => {
        if (!nameP2.trim()) return;

        const p1 = players[0];
        const p2 = { name: nameP2, flipedCards: 0 };

        setPlayers([p1, p2]);
        setCurrentPlayer(0);
        setIsOpenInputModalP2(false);
        setIsPlaying(true);
    };

    return {
        progress,
        time,
        flippedPairs,
        handleCard,
        memoramaItems,
        modalText,
        isOpenMenuModal, setIsOpenMenuModal,
        isOpenModal, setIsOpenModal,
        confirmPlayer1, confirmPlayer2,
        gameMode,
        isOpenInputModalP1, setIsOpenInputModalP1,
        isOpenInputModalP2, setIsOpenInputModalP2,
        setGameMode,
        nameP1, setNameP1,
        nameP2, setNameP2,
        currentPlayer, setCurrentPlayer,
        players,
    }

}