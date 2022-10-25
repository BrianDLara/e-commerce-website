import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import Reviews from '../components/Reviews'
import { Link } from 'react-router-dom'

const Product = () => {
    let { productId } = useParams()


    const [product, setProduct] = useState(null)
    const [reviews, setReviews] = useState([])
    
    const findProductById = async () => {
        const response = await axios.get(`http://localhost:3001/api/product/${productId}`)
        setProduct(response.data.product)
        
        
        
    }

    const findProductReviews = async () => {
        const response = await axios.get(`http://localhost:3001/api/product/reviews/${productId}`)
        setReviews(response.data.reviews)
        
        
    }
    


    useEffect(() => {
        findProductById()
      }, [])
     
     
      useEffect(() => {
        findProductReviews()
      }, [])

     

      
    return product !== null ? (
    <div className= 'product-page'>
        <section className='product-container'> 
            <img src={product.image} alt={product.productName} className='product-image'/>
            <div className='product-text'> 
            <h1>{product.product_name}</h1>
            <h3 className='product-description'>{product.description}</h3>
            <h3 className='product-description'>Price {product.price} USD</h3>
            <button className='buy-button'>Buy Now</button>
            </div>
        </section>
        
        <span  className='divider'></span>
        <h1>Customer Reviews</h1>
        <span  className='divider'></span>
        
        <section className='product-reviews'> 
            {reviews.map((review) => (
                <Reviews 
                key = {review._id}
                title = {review.title}
                description = {review.description}
                />
            ))}
        </section>

        <Link type="button" to ={ `/api/product/${productId}/new_review`} >
    <button className="review-button">Add Review</button>
        </Link>
    </div>
    ) : null
}

export default Product
