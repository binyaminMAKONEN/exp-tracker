import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement } from "chart.js";
import Labels from './Labels'
import {default as api} from '../store/apiSlice'
import { chartData,getTotal} from '../helper/helper'
Chart.register(ArcElement);


const Graph = () => {
  const myStorage = window.localStorage;
  const { data, isFetching , isSuccess, isError } = api.useGetLabelsQuery()
  let graphData;
  const userData = data?.filter(val=>val.username === myStorage.getItem('user'))

  if(isFetching){
      graphData = <div>Fetching</div>;
  }else if(isSuccess){
    chartData(data)
      graphData =  <Doughnut {...chartData(userData)} />
      
  }else if(isError){
      graphData = <div>Error</div>
  }
  return (
    <div className="flex justify-content max-w-xs mx-auto sm:mt-24 md:mt-0" >
      <div className="item">
        <div className="chart relative">
         {graphData}
          <h3 className='mb-4 font-bold exp-title'>Total
                    <span className='block text-3xl text-emerald-400'>${getTotal(userData) ?? 0}</span>
                </h3>
        </div>
        <div className="flex flex-col py-10 gap-4">
            <Labels/>
        </div>
      </div>
    </div>
  );
};

export default Graph;
