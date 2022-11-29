// * ////////////////////////////////////////////////////////////////////////
// *
// * FileName     [ info.js ]
// * PackageName  [ server ]
// * Synopsis     [ Get restaurant info from database ]
// * Author       [ Chin-Yi Cheng ]
// * Copyright    [ 2022 11 ]
// *
// * ////////////////////////////////////////////////////////////////////////

import Info from '../models/info'
import Comment from '../models/comment'

exports.GetSearch = async (req, res) => {
    /*******    NOTE: DO NOT MODIFY   *******/
    const priceFilter = req.query.priceFilter
    const mealFilter  = req.query.mealFilter
    const typeFilter  = req.query.typeFilter
    const sortBy      = req.query.sortBy
    /****************************************/

    // NOTE Hint: 
    // use `db.collection.find({condition}).exec(err, data) {...}`
    // When success, 
    //   do `res.status(200).send({ message: 'success', contents: ... })`
    // When fail,
    //   do `res.status(403).send({ message: 'error', contents: ... })` 
    

    // TODO Part I-3-a: find the information to all restaurants
    // TODO Part II-2-a: revise the route so that the result is filtered with priceFilter, mealFilter and typeFilter

    // id: { type: Number, required: true },
    // name: { type: String, required: true },
    // tag: [{ type: String }],
    // img: { type: String },
    // time: { type: Schema.Types.Mixed },
    // distance: { type: Number },
    // price: { type: Number }
    try {
        let data = []

        data = await Info.find();

        if(priceFilter) {
            data = data.filter((restaurant) => {
                return priceFilter.includes(restaurant.price+'')
            })
        }
        if(mealFilter) {
            data = data.filter((restaurant) => {
                const union = restaurant.tag.filter(value => mealFilter.includes(value));
                if (union.length > 0) return true;
                else return false;
            })
        }
        if(typeFilter) {
            data = data.filter((restaurant) => {
                const union = restaurant.tag.filter(value => typeFilter.includes(value));
                if (union.length > 0) return true;
                else return false;
            })
        }
        if(sortBy) {
            if (sortBy === 'price')
                data = data.sort((a,b) => a.price - b.price)
            else if (sortBy === 'distance')
                data = data.sort((a,b) => a.distance - b.distance)
        }

        res.status(200).send(
            {
                message: 'success',
                contents: data
            }
        );
    } catch (error) {
        console.error(error.name + ' ' + error.message)
        res.status(403).send(
            {
                message: 'error',
                contents: null
            }
        )
    }

    // TODO Part II-2-b: revise the route so that the result is sorted by sortBy
}

exports.GetInfo = async (req, res) => {
    /*******    NOTE: DO NOT MODIFY   *******/
    const id = req.query.id
    /****************************************/

    // NOTE USE THE FOLLOWING FORMAT. Send type should be 
    // if success:
    // {
    //    message: 'success'
    //    contents: the data to be sent. Hint: A dictionary of the restaruant's information.
    // }
    // else:
    // {
    //    message: 'error'
    //    contents: []
    // }
    try {
        let [ data ] = await Info.find({id: id});
        let rating = await Comment.find({restaurantId: id}).select('rating')

        let star = rating.map((star) => (star.rating))

        console.log(data)
        
        res.status(200).send(
            {
                message: 'success',
                contents: [data, star]
            }
        );
    } catch (error) {
        console.error(error.name + ' ' + error.message)
        res.status(403).send(
            {
                message: 'error',
                contents: []
            }
        )
    }

    // TODO Part III-2: find the information to the restaurant with the id that the user requests
}