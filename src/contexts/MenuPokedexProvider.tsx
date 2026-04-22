import { JSX, ReactNode, useState } from "react";
import { EPokedexMenuOption, EPokedexScreen, MenuPokedexContext } from "./MenuPokedexContext";

export const MenuPokedexProvider = ({ children }: { children: ReactNode | JSX.Element | JSX.Element[] }) => {
  const [screen, setScreen] = useState(EPokedexScreen.MENU);
  const [menuOption, setMenuOption] = useState(EPokedexMenuOption.POKEDEX);
  const [listIndex, setListIndex] = useState(0);

  const setScreenOption = (option: EPokedexScreen) => {
    setScreen(option);
    setListIndex(0); // Reset index when changing screen
  };

  const getScreenOption = () => {
    return screen;
  }

  const setMenuOptionValue = (option: EPokedexMenuOption) => {
    setMenuOption(option);
  };

  const getMenuOption = () => {
    return menuOption;
  }

  const nextItem = (max: number) => {
    setListIndex((prev) => (prev + 1 >= max ? 0 : prev + 1));
  };

  const prevItem = (max: number) => {
    setListIndex((prev) => (prev - 1 < 0 ? max - 1 : prev - 1));
  };

  return (
    <MenuPokedexContext.Provider
      value={{
        screen: getScreenOption(),
        setScreen: setScreenOption,
        menuOption: getMenuOption(),
        setMenuOption: setMenuOptionValue,
        listIndex,
        setListIndex,
        nextItem,
        prevItem,
      }}
    >
      {children}
    </MenuPokedexContext.Provider>
  )
}