import React, { useContext, useState, useEffect } from 'react'
import { GlobalContext } from '../contexts/Contexts';
import { IoArrowBackOutline } from "react-icons/io5";
import { FaSearch } from "react-icons/fa";
import { TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Search = () => {
    const { darkMode, user, resolution } = useContext(GlobalContext);
    const navigate = useNavigate();

    // search box implimentation
    const [filteredArray, setFilteredArray] = useState([]);
    const [fetchedResult, setFetchedResult] = useState([]);

    useEffect(() => {
        fetchUsers();
        if(resolution.width > 850){
            navigate("/home");
        }
    }, [])

    const fetchUsers = () => {
        const myHeaders = new Headers();
        myHeaders.append("projectID", "ktu17k7gadkn");
        myHeaders.append("Authorization", `Bearer ${user.fbToken}`);

        const requestOptions = {
            method: "GET",
            headers: myHeaders,
            redirect: "follow"
        };

        fetch("https://academics.newtonschool.co/api/v1/facebook/user", requestOptions)
            .then((response) => response.text())
            .then((result) => {
                const parsedResult = JSON.parse(result);
                // console.log(parsedResult);

                if (parsedResult.status === "success") {
                    setFetchedResult(parsedResult.data);
                } else {
                    setFetchedResult([]);
                }
            })
            .catch((error) => console.error(error));
    }

    const handleSearch = (e) => {
        const value = e.target.value;
        if (value !== '') {
            const filteredResult = fetchedResult.filter((user) => {
                return user.name.toLowerCase().includes(value.toLowerCase());
            })
            console.log("filtered", filteredResult);
            setFilteredArray(filteredResult);

        } else {
            setFilteredArray([]);
        }

    }


    // handling navigation to view searched user profile
    const handleViewUser = (id) => {
        const data = {
            pageid: id
        }
        navigate("/user", { state: data });
    }

    return (
        <div className={darkMode ? "dark-background dark-text search-page-main" : "search-page-main"}>
            <div className='search-box'>
                <IoArrowBackOutline onClick={() => navigate(-1)} className='back-icon' />

                <TextField
                    onChange={handleSearch}
                    placeholder='Search...'
                    focused
                    sx={{
                        width: '100%',
                        ".MuiOutlinedInput-notchedOutline": {
                            border: 'none'
                        },
                        "& .MuiInputBase-root": {
                            height: '36px',
                            backgroundColor: (darkMode ? 'rgb(50,52,54)' : '#f0f2f5'),
                            borderRadius: '20px',
                            color: (darkMode ? '#fff' : '#000')
                        },

                    }}
                    variant="outlined"
                />

                <FaSearch className='search-icon' />
            </div>
            <div className='search-result'>
                <div className="search-list">

                    {
                        filteredArray.map((item, index) => {
                            return (

                                <div onClick={() => handleViewUser(item._id)} key={index} className="fetched-user">
                                    <div className='search-profile'>
                                        <img src={item.profileImage} />
                                    </div>
                                    <p>{item.name}</p>
                                </div>
                            )
                        })

                    }

                </div>

            </div>
        </div>
    )
}

export default Search