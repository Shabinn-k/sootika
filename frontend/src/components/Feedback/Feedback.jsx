import { useEffect, useState } from "react";
import { api } from "../../api/Axios";
import { useAuth } from "../../Authentication/AuthContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "./FeedBack.css"

const Feedback = ({setShowLogin}) => {
  const navigate=useNavigate()
  const [feedbacks,setFeedbacks] = useState([]);
  const {user} = useAuth()

  useEffect(()=>{
    const getFeedback=async()=>{
      const res= await api.get("/feedbacks");
      const approved = res.data.filter(
        item=>item.feed==="approved"
      )
      setFeedbacks(approved)
    }
    getFeedback()
  },[])

  const handleFeed=()=>{
    if(!user){
      setShowLogin(true);
      toast.warn("Please login to give feedbacks !");
      return;
    }
    navigate("/feedback")
  }

  const averageRating=feedbacks.length>0?(
    feedbacks.reduce((total,item)=>total+item.rating,0)/feedbacks.length
  ).toFixed(1) :0;

  return (
    <div className="feedback-container">
      <h2>Customer Reviews</h2>
      <p>What our customers say about our producst</p>
      <div className="feedback-cards">
        {feedbacks.map(item=>(
          <div key={item.id} className="feedback-card">
              <div className="user-info">
                <div className="user-dp">{item.name[0]}</div>
                <h4>{item.name}</h4>
              </div>
              <div className="stars">
                {[1,2,3,4,5].map((star,index)=>(
                  <span key={index} className={star <= item.rating?"star filled":"star"}>★</span>
                ))}
                <span className="rating-text">{item.rating}.0</span>
              </div>
                <p className="feedback-review">
                  "{item.review}"
                </p>
          </div>
        ))}</div>
        <div className="average-rate">
          <div className="rating-circle">
            <span className="rating-number">{averageRating}</span>
            <span className="rating-outOf">/5</span>
          </div>
          <div className="rating-info">
            <h3>Overall Rating</h3>
            <p>Based on {feedbacks.length} reviews</p>
          </div>
        </div>

        <button className="write-review" onClick={()=>handleFeed()}>Write a Review</button>
    </div>
  )
}

export default Feedback