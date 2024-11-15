import '../styles/card.css';

function Card({pokemon, onChoice}) {
    return (
        <div onClick={() => {onChoice(pokemon.name)}} className="pokeCard">
            <img src={pokemon.imageURL} alt={pokemon.name} />
            <h2>{pokemon.name[0].toUpperCase() + pokemon.name.slice(1)}</h2>
        </div>
    )
};


export {Card};