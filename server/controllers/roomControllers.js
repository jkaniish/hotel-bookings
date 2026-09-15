import Hotel from "../models/Hotel.js";
import {v2 as cloudinary} from "cloudinary";
import Room from "../models/Room.js";

//api to create new room for a hotel

export const createRoom = async (req, res) => {
  try {
    const { roomType, pricePerNight, amenities } = req.body;
    const hotel = await Hotel.findOne({ owner: req.user._id });

    if (!hotel) return res.json({ success: false, message: "No Hotel found" });

    // Cloudinary config verification
    console.log("Cloudinary Config:", cloudinary.config().cloud_name, cloudinary.config().api_key ? "Key present" : "Key missing");

    if (!req.files || req.files.length === 0) {
      return res.json({ success: false, message: "No images provided" });
    }

    // upload images to cloudinary
    const uploadImages = req.files.map(async (file) => {
      const response = await cloudinary.uploader.upload(file.path, {
        resource_type: "image",
      });
      return response.secure_url;
    });

    const images = await Promise.all(uploadImages);

    await Room.create({
      hotel: hotel._id,
      roomType,
      pricePerNight: +pricePerNight,
      amenities: typeof amenities === "string" ? JSON.parse(amenities) : amenities,
      images,
    });

    res.json({ success: true, message: "Room created successfully" });
  } catch (error) {
    console.error("DETAILED CLOUDINARY/CREATE ERROR:", error);
    res.json({ success: false, message: error.message });
  }
};
//API to get all rooms
export const getRooms = async (req, res)=>{
    try{
        const rooms = await Room.find({ isAvailable: true })
              .populate({
                path: 'hotel',
                populate: {
                  path: 'owner', 
                  select: 'image',
                },
              }).sort({ createdAt: -1 });
            res.json({ success: true, rooms });
    }catch (error){
    console.error("Create room error:", error);
    res.status(500).json({
      success: false,
      message: "Room could not be created. Image upload failed. Please check Cloudinary settings."
    });
    }
}

//API to get all rooms for a specific hotel
export const getOwnerRooms = async(req,res)=>{
    try{
        const hotelData = await Hotel.findOne({ owner: req.user._id });
        if (!hotelData) {
            return res.json({ success: false, message: "No Hotel found" });
        }
        const rooms = await Room.find({ hotel: hotelData._id.toString() }).populate("hotel");
        res.json({ success: true, rooms });

    }catch (error){
        res.json({ success: false, message: error.message });

    }

}


//API to toggle availability of a room
export const toggleRoomAvailability = async (req, res)=>{
    try{
        const { roomId } = req.body;
        const roomData = await Room.findById(roomId);
        roomData.isAvailable = !roomData.isAvailable;
        await roomData.save();
        res.json({ success: true, message: "Room availability Updated" });

    }catch (error){
         res.json({ success: false, message: error.message });

    }

}