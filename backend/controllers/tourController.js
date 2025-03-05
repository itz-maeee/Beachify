import Tour from '../models/Tour.js'

export const createTour = async (req, res) => {
    try {
      let { title } = req.body;
  
      // Check if the title already exists
      let existingTour = await Tour.findOne({ title });
      
      if (existingTour) {
        // Append a number to make the title unique
        let count = await Tour.countDocuments({ title: new RegExp(`^${title}`) });
        title = `${title} (${count})`;
      }
  
      const newTour = new Tour({ ...req.body, title });
      const savedTour = await newTour.save();
  
      res.status(201).json({
        success: true,
        message: 'Tour created successfully!',
        data: savedTour
      });
  
    } catch (err) {
      // console.error('❌ Error creating tour:', err.message);
  
      res.status(400).json({
        success: false,
        message: err.message || 'Failed to create. Try again.',
      });
    }
  };


  //update tour
  export const updateTour = async(req, res) => {
    const id = req.params.id
    try{
        const updatedTour = await Tour.findByIdAndUpdate(id, {
            $set: req.body
        }, {new:true})

        res.status(200).json({
            success: true,
            message: 'Successfully updated!',
            data: updatedTour,
          });
    } catch(err) {
        res.status(500).json({
            success: false,
            message: 'failed to update',
          });
    }
  }

  import mongoose from 'mongoose';

export const deleteTour = async (req, res) => {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid ID format.',
    });
  }

  try {
    const tour = await Tour.findByIdAndDelete(id);
    
    if (!tour) {
      return res.status(404).json({
        success: false,
        message: 'Tour not found.',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Successfully deleted!',
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Failed to delete.',
    });
  }
};


//getSingle tour
export const getSingleTour = async(req, res) => {
    const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid ID format.',
    });
  }

  try {
    const tour = await Tour.findById(id).populate('reviews');
    
    if (!tour) {
      return res.status(404).json({
        success: false,
        message: 'Tour not found.',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Successful',
      data: tour,
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      message: 'not found',
    });
  }
  }

  //getAll tour
  export const getAllTour = async(req, res) => {

    //for pagination
    const page = parseInt(req.query.page);

    try{

        const tours = await Tour.find({})
            .populate('reviews')
            .skip(page*8)
            .limit(8);

        res.status(200).json({
            success: true,
            count: tours.length,
            message: 'Successful',
            data: tours,
        })

    } catch(err) {
        res.status(404).json({
            success: false,
            message: 'not found',
          });
    }
  };


//get tour by search
export const getTourBySearch = async (req, res) => {
  const { city, distance, maxGroupSize } = req.query;
  console.log(typeof distance);

  // console.log("📩 Incoming Query Params:", req.query); // Log query parameters

  let query = {};

  if (city) query.city = { $regex: city, $options: "i" };
  if (distance) query.distance = { $lte: parseInt(distance) };
  if (maxGroupSize) query.maxGroupSize = { $gte: parseInt(maxGroupSize) };



  // console.log("🔍 Constructed MongoDB Query:", query); // Log MongoDB query

  try {
    const tours = await Tour.find(query);
    console.log("tours line 171: ", tours);
    if (tours.length === 0) {
      console.log("⚠️ No tours found for:", query); // Debugging
      return res.status(404).json({ success: false, message: "No tours found" });
    }

    console.log("✅ Tours found:", tours); // Debugging
    res.status(200).json({ success: true, data: tours });

  } catch (err) {
    console.error("❌ Error fetching tours:", err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};



//get featured tour
export const getFeaturedTour = async(req, res) => {

    try{

        const tours = await Tour.find({featured:true})
        .populate('reviews')
        .limit(8);

        res.status(200).json({
            success: true,
            message: 'Successful',
            data: tours,
        })

    } catch(err) {
        res.status(404).json({
            success: false,
            message: 'not found',
          });
    }
  };


  //get tour counts
  export const getTourCount = async(req, res) => {
    try{
      const tourCount = await Tour.estimatedDocumentCount();

      res.status(200).json({success:true, data:tourCount});
    } catch(err){
      res.status(500).json({success:false, message:"failed to fetch"});
    }
  }
