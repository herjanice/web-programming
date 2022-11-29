/****************************************************************************
  FileName      [ restaurantPage.js ]
  PackageName   [ src ]
  Author        [ Chin-Yi Cheng ]
  Synopsis      [ Implement the restaurant page ]
  Copyright     [ 2022 11 ]
****************************************************************************/

import React, { useState, useEffect } from 'react'
import '../css/restaurantPage.css'
import Information from './information';
import Comment from './comment';
import { useParams } from 'react-router-dom'

import axios from 'axios'
const instance = axios.create({
    baseURL: 'http://localhost:4000/api'
})

const RestaurantPage = () => {
    const { id } = useParams()
    const [info, setInfo] = useState({})
    const [ratings, setRatings] = useState([])
    const [comments, setComments] = useState([])
    const [loading, setLoading] = useState(true)
    const getInfo = async () => {
        // TODO Part III-2: get a restaurant's info
        const {
            data: { contents },
        } = await instance.get('/getInfo'
            ,{
                params: {
                    id: id,
                },
            }
        );
        console.log(contents)
        if (!contents) console.log("No Restaurant's Content!");
        else {
            setInfo(contents[0])
            setRatings(contents[1])
        };    
    }
    const getComments = async () => {
        // TODO Part III-3: get a restaurant's comments 
        const {
            data: { contents },
        } = await instance.get('/getCommentsByRestaurantId'
            ,{
                params: {
                    restaurantId: id,
                },
            }
        );
        console.log(contents)
        if (!contents) console.log("No Restaurant's Comments Content!");
        else setComments(contents)   
    }
    useEffect(() => {
        if (Object.keys(info).length === 0) {
            getInfo()
        }
    }, [])
    
    useEffect(() => {
        // TODO Part III-3-c: update the comment display immediately after submission
        getComments()
    }, [comments])

    /* TODO Part III-2-b: calculate the average rating of the restaurant */
    console.log((ratings.reduce((a,b)=> a+b, 0))/ratings.length)
    let rating = (ratings.reduce((a,b)=> a+b, 0))/ratings.length;
    
    return (
        <div className='restaurantPageContainer'>
            {Object.keys(info).length === 0 ? <></> : <Information info={info} rating={rating} />}
            <Comment restaurantId={id} comments={comments} setComments={setComments} setLoad={setLoading} />
        </div>
    )
}
export default RestaurantPage