import Event from '../models/Event.js';

// @desc    Get all events
// @route   GET /api/events
// @access  Public
const getEvents = async (req, res, next) => {
    try {
        // If 'activeOnly' query param is present, filter by isActive: true
        const filter = {};
        if (req.query.activeOnly === 'true') {
            filter.isActive = true;
        }

        const events = await Event.find(filter).sort({ date: 1 }); // Sort by date ascending
        res.json(events);
    } catch (error) {
        next(error);
    }
};

// @desc    Get single event
// @route   GET /api/events/:id
// @access  Public
const getEventById = async (req, res, next) => {
    try {
        const event = await Event.findById(req.params.id);

        if (event) {
            res.json(event);
        } else {
            res.status(404);
            throw new Error('Event not found');
        }
    } catch (error) {
        next(error);
    }
};

// @desc    Create an event
// @route   POST /api/events
// @access  Private/Admin
const createEvent = async (req, res, next) => {
    try {
        const { title, description, date, image, isActive } = req.body;

        const event = new Event({
            title,
            description,
            date,
            image,
            isActive: isActive !== undefined ? isActive : true,
        });

        const createdEvent = await event.save();
        res.status(201).json(createdEvent);
    } catch (error) {
        next(error);
    }
};

// @desc    Update an event
// @route   PUT /api/events/:id
// @access  Private/Admin
const updateEvent = async (req, res, next) => {
    try {
        const { title, description, date, image, isActive } = req.body;

        const event = await Event.findById(req.params.id);

        if (event) {
            event.title = title || event.title;
            event.description = description || event.description;
            event.date = date || event.date;
            event.image = image || event.image;
            event.isActive = isActive !== undefined ? isActive : event.isActive;

            const updatedEvent = await event.save();
            res.json(updatedEvent);
        } else {
            res.status(404);
            throw new Error('Event not found');
        }
    } catch (error) {
        next(error);
    }
};

// @desc    Delete an event
// @route   DELETE /api/events/:id
// @access  Private/Admin
const deleteEvent = async (req, res, next) => {
    try {
        const event = await Event.findById(req.params.id);

        if (event) {
            await event.deleteOne();
            res.json({ message: 'Event removed' });
        } else {
            res.status(404);
            throw new Error('Event not found');
        }
    } catch (error) {
        next(error);
    }
};

export {
    getEvents,
    getEventById,
    createEvent,
    updateEvent,
    deleteEvent,
};
