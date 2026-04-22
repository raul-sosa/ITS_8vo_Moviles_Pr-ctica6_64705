import React, { useContext, useEffect, useState } from 'react';
import { MenuPokedexContext } from '../contexts/MenuPokedexContext';
import { getPokemonDetails, getPokemonList, PokemonDetails, PokemonListItem } from '../services/pokeapi';

export const PokedexPage: React.FC = () => {
  const { listIndex } = useContext(MenuPokedexContext);
  const [pokemonList, setPokemonList] = useState<PokemonListItem[]>([]);
  const [currentPokemon, setCurrentPokemon] = useState<PokemonDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchList = async () => {
      try {
        const list = await getPokemonList(151); // Get Gen 1
        setPokemonList(list);
      } catch (error) {
        console.error('Error fetching pokemon list', error);
      }
    };
    fetchList();
  }, []);

  useEffect(() => {
    const fetchDetails = async () => {
      if (pokemonList.length > 0 && pokemonList[listIndex]) {
        setLoading(true);
        try {
          const details = await getPokemonDetails(pokemonList[listIndex].name);
          setCurrentPokemon(details);
        } catch (error) {
          console.error('Error fetching pokemon details', error);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchDetails();
  }, [listIndex, pokemonList]);

  if (loading || !currentPokemon) {
    return <div className="p-4 text-center font-pokemon text-xs">Cargando...</div>;
  }

  // Fallback if animated sprite is not available
  const spriteUrl = 
    currentPokemon.sprites.versions['generation-v']?.['black-white']?.animated?.front_default || 
    currentPokemon.sprites.front_default;

  return (
    <div className="flex flex-col items-center justify-center h-full p-2 font-pokemon text-xs border-4 border-black rounded-lg bg-green-100" style={{ height: 'calc(100% - 1rem)', margin: '0.5rem' }}>
      <div className="w-full flex justify-between mb-2">
        <span>No. {currentPokemon.id.toString().padStart(3, '0')}</span>
        <span className="uppercase">{currentPokemon.name}</span>
      </div>
      
      <div className="border-2 border-black bg-white p-2 mb-2 w-32 h-32 flex items-center justify-center rounded">
        <img src={spriteUrl} alt={currentPokemon.name} className="w-20 h-20" style={{ imageRendering: 'pixelated' }} />
      </div>

      <div className="w-full text-left">
        <p className="mb-1">Tipo: {currentPokemon.types.map(t => t.type.name).join(', ')}</p>
      </div>
    </div>
  );
};
