import React, { useContext, useEffect, useState } from 'react';
import { MenuPokedexContext } from '../contexts/MenuPokedexContext';
import { getItemDetails, getItemList, ItemDetails, ItemListItem } from '../services/pokeapi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretRight } from '@fortawesome/free-solid-svg-icons';

export const PackPage: React.FC = () => {
  const { listIndex } = useContext(MenuPokedexContext);
  const [itemList, setItemList] = useState<ItemListItem[]>([]);
  const [itemDetailsMap, setItemDetailsMap] = useState<Record<string, ItemDetails>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchList = async () => {
      try {
        const list = await getItemList(20);
        setItemList(list);
      } catch (error) {
        console.error('Error fetching item list', error);
      } finally {
        setLoading(false);
      }
    };
    fetchList();
  }, []);

  useEffect(() => {
    const fetchCurrentItemDetails = async () => {
      if (itemList.length > 0 && itemList[listIndex]) {
        const itemName = itemList[listIndex].name;
        if (!itemDetailsMap[itemName]) {
          try {
            const details = await getItemDetails(itemName);
            setItemDetailsMap(prev => ({ ...prev, [itemName]: details }));
          } catch (error) {
            console.error('Error fetching item details', error);
          }
        }
      }
    };
    fetchCurrentItemDetails();
  }, [listIndex, itemList, itemDetailsMap]);

  if (loading) {
    return <div className="p-4 text-center font-pokemon text-xs">Cargando Mochila...</div>;
  }

  // Determine pagination (show 4 items at a time)
  const itemsPerPage = 4;
  const page = Math.floor(listIndex / itemsPerPage);
  const startIndex = page * itemsPerPage;
  const visibleItems = itemList.slice(startIndex, startIndex + itemsPerPage);
  
  const currentItemName = itemList[listIndex]?.name;
  const currentItemDetails = currentItemName ? itemDetailsMap[currentItemName] : null;

  return (
    <div className="flex flex-col h-full p-2 font-pokemon text-[10px] border-4 border-black rounded-lg bg-green-100" style={{ height: 'calc(100% - 1rem)', margin: '0.5rem' }}>
      <h2 className="text-center font-bold mb-2 border-b-2 border-black pb-1 uppercase">MOCHILA</h2>
      
      <div className="flex-1 overflow-hidden">
        <ul className="space-y-2">
          {visibleItems.map((item, idx) => {
            const actualIndex = startIndex + idx;
            const isSelected = actualIndex === listIndex;
            return (
              <li key={item.name} className="flex items-center">
                <div className="w-4 flex-shrink-0 text-right mr-1">
                  {isSelected && <FontAwesomeIcon icon={faCaretRight} />}
                </div>
                <span className="uppercase truncate">{item.name.replace(/-/g, ' ')}</span>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="h-1/3 border-t-2 border-black pt-2 flex mt-auto">
        {currentItemDetails && (
          <>
            <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center mr-2 border border-black rounded bg-white">
              <img src={currentItemDetails.sprites.default} alt={currentItemDetails.name} className="w-8 h-8" style={{ imageRendering: 'pixelated' }} />
            </div>
            <div className="flex-1 overflow-y-auto" style={{ fontSize: '8px', lineHeight: '1.2' }}>
              {currentItemDetails.effect_entries.find(e => e.short_effect)?.short_effect || 'Sin descripción.'}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
