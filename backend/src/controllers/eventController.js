import eventModel from "../models/events.js";

//Array de funciones
const eventController = {};

//SELECT
eventController.getEvents = async (req, res) => {
    try {
        //Solicitar en que página estamos
        //y cual es el límite de datos a mostrar
        const page = parseInt(req.body.page) || 1;
        const limit = parseInt(req.body.limit) || 20;

        const skip = (page - 1) * limit;

        const events = await eventModdel.find().skip(skip).limit(limit);

        return res.status(200).json(events);
    } catch (error) {
        console.log("error " + error);
        return res.status(500).json({ message: "Internal server error" });
    }
}