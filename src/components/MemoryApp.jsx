import { useState, useEffect } from 'react';
import { Card } from './Card';

function MemoryApp() {
    const [pokeData, setPokeData] = useState([
        {name: "charizard", imageURL: ""},
        {name: "bulbasaur", imageURL: ""},
        {name: "squirtle", imageURL: ""},
        {name: "pikachu", imageURL: ""},
        {name: "moltres", imageURL: ""},
        {name: "excadrill", imageURL: ""},
        {name: "arceus", imageURL: ""},
        {name: "magikarp", imageURL: ""},
        {name: "gyarados", imageURL: ""},
        {name: "togepi", imageURL: ""}
    ]);
    const [score, setScore] = useState({currentScore: 0, currentCards: [], currentOrder: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],  bestScore: 0});

    if (!pokeData.every((val) => val.imageURL !== "")) {
        getData(pokeData).then((val) => setPokeData(val));
    };


    function updateScore(name) {
        if (!score.currentCards.every((val) => val !== name) ) {
            setScore({...score, currentCards: [], bestScore: score.currentScore > score.bestScore ? score.currentScore : score.bestScore, currentScore: 0, currentOrder: reOrder(score.currentOrder)});
            return;
        } else if (score.currentCards.length === 9) {
            setScore({...score, currentCards: [], bestScore: score.currentScore + 1, currentScore: 0, currentOrder: reOrder(score.currentOrder)});
        }

        const newCardArray = score.currentCards;
        newCardArray.push(name);
        setScore({...score, currentCards: newCardArray, currentScore: score.currentScore + 1, currentOrder: reOrder(score.currentOrder) });
    };

    return (
        <div>
            <header>Memory Card Game</header>
            <main>
                <div>
                    <div>Score: {score.currentScore} </div>
                    <div>Best Score:{score.bestScore} </div>
                </div>
                {score.currentOrder.map((index) => {
                    return <Card key={pokeData[index].name} pokemon={pokeData[index]} onChoice={updateScore} />
                })}
            </main>
        </div>
    )
    

};

async function getData(data) {
    const fullArray = await Promise.all(data.map(async (item) => {
        if (item.imageURL === "") {
            const newURL =  await getPokeData(item.name);
            return {...item, imageURL: newURL}
        } else {
            return item;
        }
    }));
    return fullArray;

}

async function getPokeData(name) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`, {mode: 'cors'});
    const pokeData = await response.json();
    return pokeData.sprites.front_default;
}

function reOrder(orderArray) {
    const newOrder = orderArray;
    for (let i = newOrder.length - 1; i > 0; i--) { 
    
        const j = Math.floor(Math.random() * (i + 1));
                    
        const temp = newOrder[i];
        newOrder[i] = newOrder[j];
        newOrder[j] = temp;
    }

    return newOrder;
}

export {MemoryApp};