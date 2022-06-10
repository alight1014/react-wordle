import React, { useState, useEffect } from 'react';

const Wordle = () => {
    const answer = 'START';

    const [currentGuess, setCurrentGuess] = useState('');
    const [isWinner, setIsWinner] = useState(false);
    const [history, setHistory] = useState([]);

    const handleUserKeyUp = (e) => {
        const { key } = e;
        let result = '';

        //限制只能猜英文字且不能超過猜的單字字數上限
        if(/^[A-Za-z]$/.test(key) && currentGuess.length < answer.length) {
             setCurrentGuess(currentGuess + key.toUpperCase());
        }

        // 刪除猜測的字母
        if(key === 'Backspace' && currentGuess.length !== 0) {
            setCurrentGuess(currentGuess.slice(0, -1));
        }

        // 猜測確認
        if(key === 'Enter' && currentGuess.length === answer.length) {

            if(currentGuess === answer) {
                result = 'A'.repeat(answer.length);
                setIsWinner(true);
            } else {

                // 判斷幾 A 幾 B
                for (let i = 0; i < currentGuess.length; i++) {
                    if(answer.indexOf(currentGuess[i]) === i) {
                        result += 'A';
                    } else if(answer.indexOf(currentGuess[i]) !== -1){
                        result += 'B';
                    }else {
                        result += '-';
                    }
                }

                setIsWinner(false);
            }
            setHistory([...history, {
                guessAnswer: currentGuess,
                result
            }]);

            setCurrentGuess('');
        }

    };

    useEffect(() => {
        window.addEventListener('keyup', handleUserKeyUp);
        return  () => window.removeEventListener('keyup', handleUserKeyUp);
    });


    return (
        <div>
            <div> today's answer is : {answer} </div>
            <div> my guess answer is : {currentGuess} </div>
            <div>
                guessing history:
                <ul>
                {history.map((item, index) => {
                    return <li key={index}>{item.guessAnswer}, {item.result}</li>
                })}
                </ul>
            </div>
            <div>{isWinner ? 'yes!!! you got it!' : 'wrong !!! keep guessing' }</div>
        </div>

    );
};


export {Wordle};
