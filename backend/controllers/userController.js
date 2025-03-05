import User from '../models/User.js'

export const createUser = async (req, res) => {
    try {
      let { title } = req.body;
  
      // Check if the title already exists
      let existingUser = await User.findOne({ title });
      
      if (existingUser) {
        // Append a number to make the title unique
        let count = await User.countDocuments({ title: new RegExp(`^${title}`) });
        title = `${title} (${count})`;
      }
  
      const newUser = new User({ ...req.body, title });
      const savedUser = await newTour.save();
  
      res.status(201).json({
        success: true,
        message: 'User created successfully!',
        data: savedTour
      });
  
    } catch (err) {
      console.error('❌ Error creating tour:', err.message);
  
      res.status(400).json({
        success: false,
        message: err.message || 'Failed to create. Try again.',
      });
    }
  };


  //update tour
  export const updateUser = async(req, res) => {
    const id = req.params.id
    try{
        const updatedUser = await User.findByIdAndUpdate(id, {
            $set: req.body
        }, {new:true})

        res.status(200).json({
            success: true,
            message: 'Successfully updated!',
            data: updatedUser,
          });
    } catch(err) {
        res.status(500).json({
            success: false,
            message: 'failed to update',
          });
    }
  }

  import mongoose from 'mongoose';

export const deleteUser = async (req, res) => {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid ID format.',
    });
  }

  try {
    const tour = await User.findByIdAndDelete(id);
    
    if (!tour) {
      return res.status(404).json({
        success: false,
        message: 'User not found.',
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
export const getSingleUser = async(req, res) => {
    const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid ID format.',
    });
  }

  try {
    const tour = await User.findById(id);
    
    if (!tour) {
      return res.status(404).json({
        success: false,
        message: 'User not found.',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Successful',
      data: user,
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      message: 'not found',
    });
  }
  }

  //getAll tour
  export const getAllUser = async(req, res) => {


    //for pagination
    const page = parseInt(req.query.page);

    try{

        const users = await User.find({})

        res.status(200).json({
            success: true,
            message: 'Successful',
            data: users,
        })

    } catch(err) {
        res.status(404).json({
            success: false,
            message: 'not found',
          });
    }
  };