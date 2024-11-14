function Card({pokemon, onChoice}) {
    return (
        <div onClick={() => {onChoice(pokemon.name)}} >
            <img src={pokemon.imageURL} alt={pokemon.name} />
            <h2>{pokemon.name}</h2>
        </div>
    )
};


export {Card};