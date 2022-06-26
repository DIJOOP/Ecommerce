const catchAssynErrors= require ("../middleware/catchAssyncErrors")

const stripe= require ("stripe")(process.env.STRIPE_SECRET_KEY)


exports.processPayment=catchAssynErrors(async(req,res,next)=>{

    console.log(req.body);
    const myPayment=await stripe.paymentIntents.create({
        amount:req.body.amount,
        currency:"inr",
        metadata:{
            company:"DP ECOM"
        }
    })

    res.status(200).json({success:true,client_secret:myPayment.client_secret})
})

exports.sendStripeApiKey=catchAssynErrors(async(req,res,net)=>{
    res.status(200).json({stripeApiKey:process.env.STRIPE_API_KEY})
})