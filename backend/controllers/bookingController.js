import Booking from '../models/Booking.js';


//create new booking
export const createBooking = async (req, res) => {
    try {
        const newBooking = new Booking(req.body);

        const savedBooking = await newBooking.save();
        res.status(200).json({ success: true, message: 'Your tour is booked', data: savedBooking });

    } catch (err) {
        res.status(500).json({ success: false, message: 'Internal server error', error: err.message });
    }
};


//get single booking
export const getBooking = async(req,res)=>{
    const id = req.params.id

    try {
        const book = await Booking.findById(id)

        res
        .status(200)
        .json({ 
            success: true, 
            message: 'Successful', 
            data: book,
        });
        
    } catch (error) {
        res.status(400).json({ success: true, message: 'not found'});
    }
}


//get all booking
export const getAllBooking = async(req,res)=>{

    try {
        const books = await Booking.find();

        res
        .status(200)
        .json({ 
            success: true, 
            message: 'Successful', 
            data: books,
        });
        
    } catch (error) {
        res.status(500).json({ success: true, message: 'internal server error'});
    }
};