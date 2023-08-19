import React, { useContext, useEffect } from 'react'
import { getAllPokemons } from '../services/services';
import { FilterBar, PokemonList } from '../components';
import { PokemonContext } from '../context/pokemonContext';
import { Chart } from 'primereact/chart';
export const HomePage = () => {
const {onScrollLoadMore}=useContext(PokemonContext)
const [chartData, setChartData] = useState({});
const [chartOptions, setChartOptions] = useState({});

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      console.log("entre aqui")
      onScrollLoadMore()
    }
  };
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    // return () => {
    //   window.removeEventListener('scroll', handleScroll);
    // };
  }, [document.documentElement.offsetHeight]);
  
  return (
    <>
    <PokemonList />
  </>
  )
}
