import React, { useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const Payment = ({ course, amount }) => {
  let navigate = useNavigate();
  let { user } = useContext(AppContext);
  async function handlePayment() {
    try {
      let orderRes = await axios.post(
        "https://edunex-5ms8.onrender.com/api/orders/create-order",
        { amount },
        { withCredentials: true }
      );
      let {data} = orderRes
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: data.order.amount,
        currency: "INR",
        name: "EduNex",
        description: "Pay karo tabhi milega course",
        order_id: data.order.id,
        handler: async function (response) {
          let newResponse = { ...response };
          newResponse.instructor = course?.educatorId;
          try {
            let verifyRes = await axios.post(
              `https://edunex-5ms8.onrender.com/api/orders/verify-payment/${course?._id}`,
              newResponse,
              { withCredentials: true }
            );
            // toast.success("Payment Successfull")
            navigate("/")
            if (verifyRes.data.success) {
              toast.success("Payment Successfull");
              navigate("/");
            } else {
              toast.error(
                "Payment Failed. Try again after some time. Your amount has not been deducted"
              );
            }
          } catch (error) {
            toast.error("Payment verification failed!");
          }
        },
        prefill: {
          name: user?.name,
          email: user?.email,
        },
        theme: {
          color: "#3399cc",
        },
      };

      const razorpayInstance = new window.Razorpay(options);
      razorpayInstance.open();
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  }

  return (
    <button
      onClick={handlePayment}
      className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-4 rounded-xl mb-4 flex items-center justify-center"
    >
      Proceed to Checkout
    </button>
  );
};

export default Payment;
