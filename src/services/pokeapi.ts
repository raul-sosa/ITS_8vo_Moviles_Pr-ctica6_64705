export const POKEAPI_BASE_URL = 'https://pokeapi.co/api/v2';

export interface PokemonListItem {
  name: string;
  url: string;
}

export interface PokemonDetails {
  id: number;
  name: string;
  sprites: {
    front_default: string;
    versions: {
      'generation-v': {
        'black-white': {
          animated: {
            front_default: string;
          }
        }
      }
    }
  };
  types: { type: { name: string } }[];
}

export interface ItemListItem {
  name: string;
  url: string;
}

export interface ItemDetails {
  id: number;
  name: string;
  sprites: {
    default: string;
  };
  effect_entries: { effect: string, short_effect: string }[];
}

export const getPokemonList = async (limit = 151): Promise<PokemonListItem[]> => {
  const response = await fetch(`${POKEAPI_BASE_URL}/pokemon?limit=${limit}`);
  const data = await response.json();
  return data.results;
};

export const getPokemonDetails = async (idOrName: string | number): Promise<PokemonDetails> => {
  const response = await fetch(`${POKEAPI_BASE_URL}/pokemon/${idOrName}`);
  return response.json();
};

export const getPokemonSpecies = async (idOrName: string | number): Promise<any> => {
  const response = await fetch(`${POKEAPI_BASE_URL}/pokemon-species/${idOrName}`);
  return response.json();
};

export const getItemList = async (limit = 30): Promise<ItemListItem[]> => {
  const response = await fetch(`${POKEAPI_BASE_URL}/item?limit=${limit}`);
  const data = await response.json();
  return data.results;
};

export const getItemDetails = async (idOrName: string | number): Promise<ItemDetails> => {
  const response = await fetch(`${POKEAPI_BASE_URL}/item/${idOrName}`);
  return response.json();
};
