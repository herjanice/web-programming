/****************************************************************************
  FileName      [ information.js ]
  PackageName   [ src ]
  Author        [ Chin-Yi Cheng ]
  Synopsis      [ display the information of restaurant ]
  Copyright     [ 2022 11 ]
****************************************************************************/

import React from 'react'
import { MdTagFaces } from 'react-icons/md';
import Stars from '../components/stars';
import '../css/restaurantPage.css'

const Information = ({ info, rating }) => {

    const getTag = (tags) => {
        return (
            <>
                {/* TODO Part III-2-a render tags */}
                {tags.map((tag) => {
                    return (<div className='tag' key={tag}> {tag} </div>)
                })}
            </>
        )
    }
    const getPriceTag = (price) => {
        let priceText = ""
        for (let i = 0; i < price; i++)
            priceText += "$"
        return (
            <>
                {/* TODO Part III-2-a render price tags; hint: convert price number to dollar signs first */}
                <div className='tag'>{priceText}</div>
            </>
        )
    }

    const getBusiness = (time) => {

        // let businessHour = [{"day": "Mon", "time": ""},
        //                     {"day": "Tue", "time": ""},
        //                     {"day": "Wed", "time": ""},
        //                     {"day": "Thr", "time": ""},
        //                     {"day": "Fri", "time": ""},
        //                     {"day": "Sat", "time": ""},
        //                     {"day": "Sun", "time": ""}
        //                 ]

        let businessHour = ["Mon", "Tue", "Wed", "Thr", "Fri", "Sat", "Sun"]

        // businessHour = businessHour.forEach((hour) => {
            // if(time.hasOwnProperty(hour.day)){
            //     return hour.time = time[hour.day]
            // }
            // else {
            //     return hour.time = "Closed"
            // }
        // })
        // console.log(businessHour)
        
        return (
            <div className='businessTime'>
                {/* TODO Part III-2-c: render business time for each day*/}
                {
                    businessHour.map((day) => {
                        if(time['All']) {
                            return (
                                <div className='singleDay'>
                                    <div className='day'>{day}</div>
                                    <div className='time'>{time['All']}</div>
                                </div>
                            )
                        }
                        else if(!time[day]) {
                            return (
                                <div className='singleDay'>
                                    <div className='day'>{day}</div>
                                    <div className='time'>Closed</div>
                                </div>
                            )
                        }
                        else {
                            return (
                                <div className='singleDay'>
                                    <div className='day'>{day}</div>
                                    <div className='time'>{time[day]}</div>
                                </div>
                            )
                        }
                    })
                }
                {/* {Object.keys(time).forEach((item) => {
                    return `
                        <div className='singleDay'>
                            <div className='time'>{item}</div>
                            <div className='day'>{time[item]}</div>
                        </div>
                    `
                })} */}
            </div>
        )
    }

    return (
        <div className='infoContainer'>
            <h2>{info.name}</h2>
            <div className='infoRow'>
                <div className='rate'>
                    {rating === 0 ? <p>No Rating</p> : <Stars rating={rating} displayScore={true} />}
                </div>
                <div className='distance'>{info.distance / 1000} km</div>
            </div>
            <div className='infoRow'>
                {getPriceTag(info.price)}
                {getTag(info.tag)}
            </div>
            <h5>Business hours:</h5>
            {getBusiness(info.time)}
        </div>
    )
}
export default Information