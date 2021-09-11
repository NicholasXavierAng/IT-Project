//////////////////////////////
// Author(s): Terry, Zakarya Butt, Rebecca
// Date Made: 08/09/2021
//////////////////////////////
import React, { useState } from 'react';
// import { MyContext } from './Provider';
import SearchBar from 'material-ui-search-bar';

const Searchbar = ({keyword}) => {
    const [words, setSearchWord] = useState();

    const search = async (e) => {
        e.preventDefault();
        const credentials = {words};
        console.log(words);
     

        var res = await fetch('http://localhost:5000/user/search', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
        }); 



    }

    

    
    return (
        <div className = "searchbar">
            {/* <MyContext.Consumer> */}
                {/* {(context) => {
                    context.setMessage(true); 
                }} */}
            <form onSubmit={search}>        
                {/*<input 
                type= "barStyling"
                key= "random1"
                value={keyword}
                onChange={e => setSearchWord(e.target.value)}
                placeholder={"Search for contacts"}
                />*/}
                {/*can't handle searches yet*/}
                <SearchBar
                value={keyword}
                onChange={e => setSearchWord(e.target.value)}
                /*onRequestSearch={() => doSomethingWith(this.state.value)}*/
                placeholder={"Search for contacts"}
            />
            </form>
            {/* </MyContext.Consumer> */}
        </div>
        
    );
}

export default Searchbar
