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
  const { date, time, venue, theme, person } = req.body;

  try {
    const event = await Event.create({ date, time, venue, theme, person });
    res.status(201).json(event);
  } catch (err) {
    res.status(400).json({ error: 'Error creating event' });
  }
});

// Update an event (protected route)
router.put('/:id', authMiddleware, async (req, res) => {
  const { id } = req.params;
  const { date, time, venue, theme, person } = req.body;

  try {
    const event = await Event.findByPk(id);
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }
    event.date = date;
    event.time = time;
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
