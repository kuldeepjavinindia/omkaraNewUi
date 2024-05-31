import { useState } from 'react'
import PriceChart from './PriceChart'
import PEChart from './PEChart'
import PBChart from './PBChart'
import { Button } from '@material-tailwind/react'

const StockChart_Main = () => {

    

    
  let chartBtn = [
    {
      "id":1,
      "label":"Price",
      "component":<PriceChart />,
      "value":"",
    },
    {
      "id":2,
      "label":"PE",
      "component":<PEChart />,
      "value":"",
    },
    {
      "id":3,
      "label":"PB",
      "component":<PBChart />,
      "value":"",
    },
  ]

  const [ChartBtn, setChartBtn] = useState(chartBtn[0]);

  return (
    <>
        <div>
        <div className="flex gap-2 mb-4">
            {chartBtn.map((item, i) => (
              <Button
                onClick={() => setChartBtn(item)}
                size="sm"
                variant={`${ChartBtn?.id == item?.id ? "" : "outlined"}`}
                className={`${
                  ChartBtn?.id == item?.id
                    ? "bg-theme"
                    : "text-gray-400 border border-gray-400"
                }`}
                key={i}
              >
                {item.label}
              </Button>
            ))}
          </div>
        </div>

        <div className=' overflow-hidden' style={{ 
          height: '80vh'
         }}>
            {ChartBtn.component}
        </div>
    </>
  )
}

export default StockChart_Main
