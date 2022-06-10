import React, { useState, useEffect } from 'react';
import Section from './Section';

const Wordle = () => {
    const answer = 'START';
    const COLOR = {
        GREEN: 'green',
        YELLOW: 'yellow',
        GRAY: 'gray',
    };
    const LIMIT_COUNT = 5;


    const [currentGuess, setCurrentGuess] = useState([]);
    const [isEndGame, setIsEndGame] = useState(false);
    const [history, setHistory] = useState([]);
    const [guessCount, setGuessCount] = useState(0);

    const handleUserKeyUp = (event) => {
        const { key } = event;

        // 遊戲結束，不在做任何判斷
        if(isEndGame) return;

        //限制只能猜英文字且不能超過猜的單字字數上限
        if(/^[A-Za-z]$/.test(key) && currentGuess.length < answer.length) {
             setCurrentGuess([...currentGuess, {
                value: key.toUpperCase(),
                color: ''
            }]);
        }

        // 刪除猜測的字母資料
        if(key === 'Backspace' && currentGuess.length !== 0) {
            setCurrentGuess([...currentGuess].slice(0,-1));
        }

        // 猜測確認
        if(key === 'Enter' && currentGuess.length === answer.length) {

            const currentGuessCount = guessCount+1;

            // 判斷幾 A 幾 B
            const roundGuess = currentGuess.map((obj, index) => {

                if(obj.value === answer[index]) {
                    obj.color = COLOR.GREEN;
                } else if(answer.indexOf(obj.value) !== -1) {
                    obj.color = COLOR.YELLOW;
                } else {
                    obj.color = COLOR.GRAY;
                }
                return obj;
            });

            // 有非綠的答案
            if(roundGuess.find((obj) => (obj.color === COLOR.GRAY || obj.color === COLOR.YELLOW))) {
                // 達到猜題上限
                if(currentGuessCount >= LIMIT_COUNT) {
                    setIsEndGame(true);
                } else {
                    // 未達到，清除目前猜除資訊，繼續猜
                    setCurrentGuess([]);
                }
            } else { // 全綠
               setIsEndGame(true);
            }

            setGuessCount(currentGuessCount);

            // 寫紀錄
            setHistory([...history, {
                guessAnswer: roundGuess,
            }]);
        }
    };

    useEffect(() => {
        window.addEventListener('keyup', handleUserKeyUp);
        return  () => window.removeEventListener('keyup', handleUserKeyUp);
    });

    return (
        <div>
            <div> today's answer is : {answer} </div>
            <div>
                my guess answer is :
                <Section source={currentGuess} answer={answer} />
            </div>
            <div>
                guessing history:
                {history.map((item, index) => {
                    return (
                        <Section key={index} source={item.guessAnswer} answer={answer} />
                    );
                })}
            </div>
        </div>

    );
};


export {Wordle};
