import { NumberInput } from '@mantine/core';
import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [finalNum, setFinalNum] = useState(0);
  const [deals, setDeals] = useState();
  const [qualified, setQualified] = useState();
  const [wins, setWins] = useState();
  const [dealSize, setDealSize] = useState();

  useEffect(() => {
    const potentialQualified = deals * (qualified/100) * .15;
    console.log('pq', potentialQualified);
    const closeRatio = potentialQualified * (wins/100);
    console.log('close ratio', closeRatio);
    if(!isNaN(closeRatio) && !isNaN(dealSize)) {
      const total = closeRatio * dealSize;
      setFinalNum(total.toFixed(2));
    }


  }, [deals, qualified, wins, dealSize]);

  return (
    <div className="App wrapper">
      <div className="prompt">
        <NumberInput
          value={deals} 
          onChange={(val) => setDeals(val)} 
          size="md"
          min={0}
          label="Number of all deals over the course of your company's history"
          parser={(value) => value.replace(/%\s?|(,*)/g, '')}
          formatter={(value) =>
            !Number.isNaN(parseFloat(value))
              ? `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
              : ''
          }
        />
      </div> 
      <div className="prompt">
        <NumberInput
          value={qualified} 
          onChange={(val) => setQualified(val)} 
          size="md"
          label="If you are given a Referral/personal introduction into an org, what percentage of those deals enter the pipeline as qualified opportunities?"
          min={0}
          parser={(value) => value.replace(/%\s?|(,*)/g, '')}
          formatter={(value) =>
            !Number.isNaN(parseFloat(value))
              ? `${value}%`.replace(/\B(?=(\d{3})+(?!\d))/g, '')
              : ''
          }
        />
      </div> 
      <div className='prompt'>
        <NumberInput
          value={wins} 
          onChange={(val) => setWins(val)} 
          size="md"
          label="What is your average closing ratio on qualified deals in your pipeline?"
          max={100}
          min={0}
          parser={(value) => value.replace(/%\s?|(,*)/g, '')}
          formatter={(value) =>
            !Number.isNaN(parseFloat(value))
              ? `${value}%`.replace(/\B(?=(\d{3})+(?!\d))/g, '')
              : ''
          }
        />
      </div> 
      <div className='prompt'>
        <NumberInput
          value={dealSize} 
          onChange={(val) => setDealSize(val)} 
          size="md"
          label="What is your average deal size?"
          min={0}
          parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
          formatter={(value) =>
            !Number.isNaN(parseFloat(value))
              ? `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
              : ''
          }
        />
      </div> 
      <div className='total'>
        Your revenue opportunity with ReLead: 
        <span className='dollarSign'>$</span><div className='total_number'>{finalNum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</div>
      </div>
    </div>
    
  );
}

export default App;
