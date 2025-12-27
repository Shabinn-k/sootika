import { useState } from "react";
import { api } from "../../api/Axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "./WriteFeed.css";
import { useAuth } from "../../Authentication/AuthContext";

const WriteFeed = () => {
  const navigate=useNavigate();
  const {user}=useAuth()
  const [rating,setRating]=useState(0);
  const [review,setReview]=useState("");

  const handleSubmit=async(e)=>{
    e.preventDefault();

    if(rating===0 || review===""){
      toast.error("Please give rating and review")
      return
    }

    const feedbackData={
      name:user.name,
      rating:rating,
      review:review,
      feed:"pending"
    }
      await api.post("/feedbacks",feedbackData)
      toast.success("Thankyou !")
      navigate("/")
  }
  return (
    <div className="writefeed-container">
      <form className="writefeed-form" onSubmit={handleSubmit}>
        <h2>Write a Review</h2>

        <div className="rating-stars">
      {[1,2,3,4,5].map((star,index)=>(
        <span key={index} className={star <=rating?"star filled" :"star"}
         onClick={()=>setRating(star)}>★</span>
      ))}
        </div>

        <textarea placeholder="write your feedback..." value={review}
        onChange={(e)=>setReview(e.target.value)} />

        <button type="submit">Submit</button>
      </form>
    </div>
  )
}
export default WriteFeed