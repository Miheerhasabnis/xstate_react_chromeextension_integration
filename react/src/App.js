/*global chrome*/
import React from 'react';
import { useMachine } from '@xstate/react';
import { createMachine} from 'xstate';
// var data='one';
const  fetchData = () => {
  return new Promise((resolve)=>{
    const u='http://ip.jsontest.com/'
    chrome.runtime.sendMessage("oebaklkpfoheclphkoehncafcomnbikg", { openUrlInEditor: u},
     function(response){
     alert("see console");
     console.log(typeof response)
     resolve(response)
      }
    );
  })
  };
// return new Promise(async(resolve) => {
//   const u='http://ip.jsontest.com/'
//    await chrome.runtime.sendMessage("oebaklkpfoheclphkoehncafcomnbikg", { openUrlInEditor: u},
//     function(response){
//      alert("see console");
//     console.log(response.ip)
//      resolve(response);
//    })
// })
const appMachine = createMachine(
  {
    initial: 'idle',
    context: {
      inputValue: 'no ip',
      url: 'http://ip.jsontest.com/',
    },
    states: {
      idle: {
        on: {
          CLICK: 'loading',
        },
      },
      loading: {
        invoke: {
          src: 'fetchData',
          onDone: {
            target: 'success',
            actions: 'setInputValue',
          },
          onError: 'failure',
        },
      },
      success: {},
      failure: {},
    },
  },
   {
    actions:{ 
      setInputValue:(context,event)=>{
        context.inputValue=event.data.ip;
      }
    },
    services:{
      //servicse begin
      fetchData
      //service end
     }
    })
const App = () => {
  const [state, send] = useMachine(appMachine);
  return (
    <div>
      <h1>below is state value</h1>
     <p>{state.value}</p>
      {state.matches('loading') && <p>Loading...</p>}
      {state.matches('failure') && <p>Failed to fetch data.</p>}
      {state.matches('success') && <h1>{state.context.inputValue}</h1>}
      {state.matches('idle') && <button onClick={() => send('CLICK')}>click me</button>}
    </div>
  );
};

export default App;
