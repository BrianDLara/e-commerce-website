import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import Reviews from '../components/Reviews'

const Product = () => {
    let { productId } = useParams()


    const [product, setProduct] = useState(null)
    const [reviews, setReviews] = useState([])
    
    const findProductById = async () => {
        const response = await axios.get(`http://localhost:3001/api/product/${productId}`)
        setProduct(response.data.product)
        console.log(response.data.product)
        
        
    }

    const findProductReviews = async () => {
        const response = await axios.get(`http://localhost:3001/api/product/reviews/${productId}`)
        setReviews(response.data.reviews)
        console.log(response.data.reviews)
        
    }
    


    useEffect(() => {
        findProductById()
      }, [])
     
     
      useEffect(() => {
        findProductReviews()
      }, [])

     

      
    return product !== null ? (
    <div className= 'product-page'>
        <section className='product-info'> 
            <img src={product.image} alt={product.productName} />
            <h1>{product.product_name}</h1>
            <h3>{product.description}</h3>
        </section>

        <section className='product-reviews'> 
        {reviews.map((review) => (
            <Reviews 
            key = {review._id}
            title = {review.title}
            description = {review.description}
            />
        ))
            
            
            
        }




        </section>
    </div>
    ) : null
}

export default Product