import { useEffect, useState } from "react"
import Field from "../components/Field"
import Header from "../components/Header"
import "../styles/pages/Fields.css"
import api from "../api"

function Fields(){

    const [fields, setFields] = useState([]);
    const [filteredData, setFilteredData] = useState(fields);
    const [selectedType, setSelectedType] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() =>{
        api
        .get("/api/tereni/")
        .then((res) => res.data)
        .then((data) => {
            setFields(data);
            setFilteredData(data);
            //console.log(data);
        })
        .catch(//(err) => alert(err)
        );
    }, [])

    useEffect(() =>{
        setFilteredData(fields.filter(function(item){
            //console.log(selectedType, item.tip)
            if (selectedType.includes(item.tip) || selectedType.length === 0){
                var keywords = item.lokacija_grad.toLowerCase().split(" ")
                keywords.push(...item.lokacija_ulica.toLowerCase().split(" "))

                //abominacija koja funkcionira
                if (search.split(" ").every((word) => 
                    keywords.some((keyword) => 
                        keyword.includes(word))))
                    return true
            }
            return false;
        }));
    }, [selectedType, search])

    const handleTypeFilterUpdate = (e, field_type) => {

        const { checked } = e.target;
        if (checked){
            setSelectedType((prev) => [...prev, field_type])
        } else{
            setSelectedType(selectedType.filter((x) => x !== field_type))
        }
        console.log(selectedType)            
    }

    if (fields.length === 0){
        return (
            <>
                <Header />
                <p>Nisu pronadeni tereni</p>
            </>
        )
    }

    return (
        <>
            <Header/>
            <input type="checkbox" id="indoor" name="type" onClick={(e) => handleTypeFilterUpdate(e, "unutarnji")}></input>
            <label htmlFor="indoor">Unutarnji</label>
            <input type="checkbox" id="outdoor" name="type" onClick={(e) => handleTypeFilterUpdate(e, "vanjski")}></input>
            <label htmlFor="outdoor">Vanjski</label>
            <br/>
            <label>Filter: </label>
            <input type="text" onChange={(e) => setSearch(e.target.value)}></input>
            
            <div className="fields-container">

                {filteredData.map((field) => (
                <Field field={field} key={field.id} value = {`${field.lokacija_grad}, ${field.lokacija_ulica}`} />
                ))}

            </div>
        </>
    );

}
export default Fields