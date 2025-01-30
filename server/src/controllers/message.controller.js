import User from "../models/user.model.js";
import Message from "../models/message.model.js";
import cloudinary from '../lib/cloudinary.js'

export const getUsersForSidebar = async (req, res) => {
    try {
        const loggedInUserId = req.user._id; //get the logged in user id
        const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password"); //find all users except the logged in user

        res.status(200).json(filteredUsers);
    } catch (error) {
        console.error("Error in getUsersForSidebar: ", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const getMessages = async (req, res) => {
    try {
        const { id: userToChatId } = req.params;
        const myId = req.user._id;

        const messages = await Message.find({
            $or: [
                { senderId: myId, receiverId: userToChatId },
                { senderId: userToChatId, receiverId: myId }
            ]
        })

        res.status(200).json(messages);
    } catch (error) {
        console.log("Error in getMessages: ", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const sendMessage = async (req, res) => {
    try {
        const { id: receiverId } = req.params;
        const { text, image } = req.body;
        const senderId = req.user._id;

        let imageUrl;
        if (image) {
            const uploadResponse = await cloudinary.uploader.upload(image);
            imageUrl = uploadResponse.secure_url;
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            text,
            image: imageUrl
        });

        await newMessage.save();

        //TODO: realtime functionalty is yet to be added

        res.status(201).json(newMessage);
    } catch (error) {
        console.error("Error in sendMessage: ", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}