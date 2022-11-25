import { useState } from "react";
import Bar from "./Bar";

const timer = (ms: number) => new Promise(res => setTimeout(res, ms));

const randomNumber = (min: number, max: number): number => Math.random() * (max - min) + min;

const generateRandomList = (length: number, min: number, max: number): number[] => {
  let list: number[] = [];

  for (let i = 0; i < length; i++) 
    list.push(randomNumber(min, max));
  return list;
};

function AlgorithmVisualizer() {
  const [count, setCount] = useState(10);
  const [values, setValues] = useState(generateRandomList(count, 0, 500));
  const [width, setWidth] = useState(window.innerWidth/count);

  const sort = async () => {
    let _values = [...values];
    
    const quicksort = list => {
      if (list.length <= 1) return list;
      
      let smaller = [];
      let greater = [];
      
      for (let element of list) {
        if (element <= list[0]) smaller.push(element);
        else greater.push(element);
      }
      
      smaller.remove(smaller.indexOf(list[0], 1));
      
      setValues([...smaller.concat(list[0], greater)]);
      await timer(0);
      
      return quicksort(smaller)
        .concat(
          list[0], 
          quicksort(greater));
    };
    
    setValues([...quicksort(_values)]);
    
    /* Bubble Sort
    for (let i = 0; i < _values.length; i++) {
      for (let j = 0; j < _values.length - i - 1; j++) {
        if (_values[j] > _values[j+1]) {
          [_values[j], _values[j+1]] = [_values[j+1], _values[j]];
        }
        setValues([..._values]);
        await timer(0);
      }
    }
    */
  };

  return (<>
    <h1>Algorithm Visualizer (BETA)</h1>
    <p>Made by Nelson</p>

    <button onClick={sort} style={{
      padding: '10px'
    }}>Sort</button>

    <button onClick={() => setValues(generateRandomList(count, 0, 500))} style={{
      padding: '10px'
    }}>Generate</button>

    <p style={{display: 'inline', margin: '10px'}}>{count}</p>
    
    <input style={{display: 'inline', margin: '10px', width: '50%'}} value={count} min='2' max='500' type='range' onChange={e => {
      let value = e.target.valueAsNumber;

      setCount(value);
      setValues(generateRandomList(value, 0, 500))
      setWidth(window.innerWidth/value); 
    }}/>

    <div style={{
      height: '500px',
      border: '1px solid black',
      display: 'flex',
      alignItems: 'end'
    }}>
      {values.map(value => <Bar width={`${width}px`} height={`${value}px`} />)}
    </div>

  </>);
}

export default AlgorithmVisualizer;
