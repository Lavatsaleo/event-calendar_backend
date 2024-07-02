const express = require('express');
const { Event } = require('../models');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Get all events
router.get('/', async (req, res) => {
  try {
    const events = await Event.findAll();
    res.json(events);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching events' });
  }
});

// Create a new event (protected route)
router.post('/', authMiddleware, async (req, res) => {
  const { startDate, endDate, startTime, endTime, venue, theme, person } = req.body;
  const start = new Date(`${startDate}T${startTime}`);
  const end = new Date(`${endDate}T${endTime}`);

  if (end <= start) {
    return res.status(400).json({ error: 'End date and time must be after start date and time.' });
  }

  try {
    const event = await Event.create({ 
      start_date: startDate, 
      end_date: endDate, 
      start_time: startTime, 
      end_time: endTime, 
      venue, 
      theme, 
      person 
    });
    res.status(201).json(event);
  } catch (err) {
    res.status(400).json({ error: 'Error creating event' });
  }
});

// Update an event (protected route)
router.put('/:id', authMiddleware, async (req, res) => {
  const { id } = req.params;
  const { startDate, endDate, startTime, endTime, venue, theme, person } = req.body;
  const start = new Date(`${startDate}T${startTime}`);
  const end = new Date(`${endDate}T${endTime}`);

  if (end <= start) {
    return res.status(400).json({ error: 'End date and time must be after start date and time.' });
  }

  try {
    const event = await Event.findByPk(id);
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }
    event.start_date = startDate;
    event.end_date = endDate;
    event.start_time = startTime;
    event.end_time = endTime;
    event.venue = venue;
    event.theme = theme;
    event.person = person;
    await event.save();
    res.json(event);
  } catch (err) {
    res.status(400).json({ error: 'Error updating event' });
  }
});

// Delete an event (protected route)
router.delete('/:id', authMiddleware, async (req, res) => {
  const { id } = req.params;

  try {
    const event = await Event.findByPk(id);
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }
    await event.destroy();
    res.json({ message: 'Event deleted' });
  } catch (err) {
    res.status(400).json({ error: 'Error deleting event' });
  }
});

module.exports = router;
