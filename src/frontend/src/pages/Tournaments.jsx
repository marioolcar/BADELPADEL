import { useEffect, useState } from "react"
import Tournament from "../components/Tournament.jsx"
import Header from "../components/Header.jsx";
import "../styles/pages/Tournaments.css"
import api from "../api.js";

function Tournaments(){

    const [tournaments, setTournaments] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [filters, setFilters] = useState([]);
    const [sliderValue, setSliderValue] = useState(50);
    const [maxPriceValue, setMaxPriceValue] = useState(50)


    useEffect(() =>{
        api
        .get("/api/turniri/")
        .then((res) => res.data)
        .then((data) => {
            setTournaments(data);
            setFilteredData(data);
            console.log(data);
        })
        .catch(//(err) => alert(err)
        );
    }, [])

    useEffect(() =>{

        setFilteredData(tournaments.filter(function(item){
            //console.log(filters, item.otvorenost)
            if (filters.includes(item.otvorenost) || filters.length === 0){

                if (maxPriceValue >= parseInt(item.cijena_kotizacije)){
                    return true;
                }

            }
            return false;
        }));

    }, [filters, maxPriceValue])

    const handleTypeFilterUpdate = (e, tournament_openness) => {

        const { checked } = e.target;

        if (checked){
            setFilters((prev) => [...prev, tournament_openness])
        }
        else{
            setFilters(filters.filter((x) => x !== tournament_openness))
        }
        //console.log(filters)            
    }

    function handleRangeChange(e){
        setSliderValue(e.target.value);
    }

    function applyRangeChange(){
        setMaxPriceValue(sliderValue);
    }

    return (
        <>
            <Header />

            <div className="filter-container">

                <div className="checkbox-container">

                    <input type="checkbox" id="otvoren" name="otvoren" onClick={(e) => handleTypeFilterUpdate(e, "otvoren")}></input>
                    <label htmlFor="otvoren">Otvoren</label>
                    <input type="checkbox" id="zavrsen" name="zavrsen" onClick={(e) => handleTypeFilterUpdate(e, "zavrsen")}></input>
                    <label htmlFor="zavrsen">Zavrsen</label>

                </div>

                <input id="slider" type="range" min={0} max={99} step={1} value={sliderValue} onChange={handleRangeChange}></input>
                <input id="slider-numeric-input" type="number" inputMode="numeric" value={sliderValue} onChange={handleRangeChange} maxLength={2}></input>
                <button onClick={applyRangeChange}>Apply</button>

            </div>

            <div className="tournaments-container">

                {filteredData.map((tournament) => (
                <Tournament tournament={tournament} key={tournament.id} />
                ))}

            </div>
        </>
    );

}
export default Tournaments