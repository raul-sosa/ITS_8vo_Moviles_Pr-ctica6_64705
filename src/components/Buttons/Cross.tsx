import { useContext } from "react";
import { EPokedexScreen, MenuPokedexContext } from "../../contexts/MenuPokedexContext";

export const Cross = () => {
  const { screen, menuOption, setMenuOption, nextItem, prevItem } = useContext(MenuPokedexContext);

  return (
    <div id="cross">
      <div id="leftcross" className="gameboy-button">
        <div id="leftT"></div>
      </div>
      <div
        id="topcross"
        className="gameboy-button"
        onClick={() => {
          if (screen === EPokedexScreen.MENU) {
            const newOption = menuOption - 1 < 1 ? 3 : menuOption - 1
            setMenuOption(newOption)
          } else if (screen === EPokedexScreen.POKEDEX) {
            prevItem(151); // Gen 1 has 151 pokemon
          } else if (screen === EPokedexScreen.PACK) {
            prevItem(20); // Let's use 20 items for the pack
          }
        }}
      >
        <div id="upT"></div>
      </div>
      <div id="rightcross" className="gameboy-button">
        <div id="rightT"></div>
      </div>
      <div id="midcross" className="gameboy-button">
        <div id="midCircle"></div>
      </div>
      <div
        id="botcross"
        className="gameboy-button"
        onClick={() => {
          if (screen === EPokedexScreen.MENU) {
            const newOption = menuOption + 1 > 3 ? 1 : menuOption + 1
            setMenuOption(newOption)
          } else if (screen === EPokedexScreen.POKEDEX) {
            nextItem(151);
          } else if (screen === EPokedexScreen.PACK) {
            nextItem(20);
          }
        }}
      >
        <div id="downT"></div>
      </div>
    </div>
  )
}