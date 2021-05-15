import { useCallback, useEffect, useState } from 'react';
import { FaLock, FaLockOpen, FaSave } from "react-icons/fa";

import pants from './data/pants.json';
import shirts from './data/shirts.json';
import shoes from './data/shoes.json';

import './index.css';

const getRandomIndex = (listLength) => Math.floor(Math.random() * listLength);

const App = () => {
  const [ShirtIdx, setShirtIdx] = useState(getRandomIndex(shirts.length));
  const [PantsIdx, setPantsIdx] = useState(getRandomIndex(pants.length));
  const [ShoesIdx, setShoesIdx] = useState(getRandomIndex(shoes.length));

  const [isShirtLocked, setIsShirtLocked] = useState(false);
  const [isPantsLocked, setIsPantsLocked] = useState(false);
  const [isShoesLocked, setIsShoesLocked] = useState(false);

  const onKeyPress = useCallback(({key}) => {
    console.log(key);
    if (key === ' ') {
      if (!isShirtLocked) {
        setShirtIdx(getRandomIndex(shirts.length));
      }

      if (!isPantsLocked) {
        setPantsIdx(getRandomIndex(pants.length));
      }

      if (!isShoesLocked) {
        setShoesIdx(getRandomIndex(shoes.length));
      }
    }
  }, [isShirtLocked, isPantsLocked, isShoesLocked]);

  useEffect(() => {
    document.addEventListener('keyup', onKeyPress);

    return () => document.removeEventListener('keyup', onKeyPress);
  }, [onKeyPress]);

  return (
    <div className="px-12 py-8">
      <div className="mb-8 flex">
        <input className="flex-1 rounded-md border-2 border-gray-600 px-2 py-1" placeholder="TODO: filter by style/retailer/designer/price/available sizes/etc..." />
      </div>
      <div style={{height: '35vh'}}>
        <ClothingItem item={shirts[ShirtIdx]} imageHeight="140%" isLocked={isShirtLocked} onLockChange={(newValue) => setIsShirtLocked(newValue)} />
      </div>
      <div style={{height: '35vh', marginTop: '-8vh'}}>
        <ClothingItem item={pants[PantsIdx]} imageHeight="140%" isLocked={isPantsLocked} onLockChange={(newValue) => setIsPantsLocked(newValue)} />
      </div>
      <div style={{height: '10vh', marginTop: '-2vh'}}>
        <ClothingItem item={shoes[ShoesIdx]} imageHeight="200%" isDoubleItem isLocked={isShoesLocked} onLockChange={(newValue) => setIsShoesLocked(newValue)} />
      </div>
    </div>  
  );
}

const ClothingItem = ({ item, imageHeight, isDoubleItem, isLocked, onLockChange  }) => {
  return (
    <div className="w-full h-full flex items-center justify-between">
      <div className="h-full flex flex-col items-center">
        <div className="h-full flex flex-row-reverse items-center overflow-hidden">
          <img style={{height: imageHeight, width: 'auto' }} src={item.imgLink} alt="clothing" />
          {isDoubleItem && <img style={{height: imageHeight, width: 'auto', transform: 'translateX(60%)' }} src={item.imgLink} alt="clothing" />}
        </div>
      </div>  
      <div className="flex items-center">
        <div className="mr-8 flex flex-col items-end">
          <div>{item.name}</div>
          <div className="font-bold">{item.price}</div>
          <div className="text-sm italic text-gray-600">{item.brand}</div>
          <div className="text-sm italic text-gray-600">{item.retailer}</div>
          <a className="font-bold text-blue-600 hover:text-blue-700" href={item.buyLink} target="_blank" rel="noreferrer">View Item Here</a>
        </div>
        <button
          className="no-focus-btn"
          onClick={(event) => {
            event.preventDefault();
            document.activeElement.blur();
            onLockChange(!isLocked)
          }}
        >
          {isLocked ? <FaLock size={20} className="text-gray-600 hover:text-gray-700" /> : <FaLockOpen size={20} className="text-gray-600 hover:text-gray-700" />}
        </button>
      </div>
    </div>
  );
};

export default App;
