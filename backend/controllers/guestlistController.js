const QRCode = require('qrcode');
const { Guest, GuestAttendee, OtherGuest, Event } = require('../db/models');
const emailService = require('../utils/email');

// Get all guests for an event
exports.getGuestsByEvent = async (req, res) => {
  try {
    const guests = await Guest.findAll({
      where: { eventId: req.params.eventId },
      include: [
        { model: GuestAttendee, as: 'actualAttendees' },
        { model: OtherGuest, as: 'otherGuests' }
      ]
    });
    res.json(guests);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Add new guest
exports.addGuest = async (req, res) => {
  const {
    primaryName,
    primaryEmail,
    otherGuests,
    numberInParty,
    relation
  } = req.body;

  try {
    // Check if event exists
    const event = await Event.findByPk(req.params.eventId);
    if (!event) {
      return res.status(404).json({ msg: 'Event not found' });
    }

    // Create QR code for RSVP
    const rsvpUrl = `${process.env.CLIENT_URL}/rsvp/${req.params.eventId}`;
    const qrCode = await QRCode.toDataURL(rsvpUrl);

    // Create guest in a transaction
    const result = await sequelize.transaction(async (t) => {
      const newGuest = await Guest.create({
        eventId: req.params.eventId,
        primaryName,
        primaryEmail,
        numberInParty,
        relation,
        qrCode
      }, { transaction: t });

      // Create related other guests if provided
      if (otherGuests && otherGuests.length > 0) {
        const otherGuestsData = otherGuests.map(guest => ({
          name: guest.name,
          guestId: newGuest.id
        }));
        await OtherGuest.bulkCreate(otherGuestsData, { transaction: t });
      }

      return newGuest;
    });

    // Get the guest with related data
    const guest = await Guest.findByPk(result.id, {
      include: [{ model: OtherGuest, as: 'otherGuests' }]
    });

    // Send invitation email
    await emailService.sendInvitation(
      primaryEmail,
      primaryName,
      event.title,
      event.date,
      qrCode,
      rsvpUrl
    );

    res.json(guest);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Update guest RSVP
exports.updateRSVP = async (req, res) => {
  const {
    rsvpStatus,
    actualAttendees,
    slowDanceSong,
    danceSong
  } = req.body;

  try {
    let guest = await Guest.findByPk(req.params.id, {
      include: [{ model: GuestAttendee, as: 'actualAttendees' }]
    });

    if (!guest) {
      return res.status(404).json({ msg: 'Guest not found' });
    }

    // Update in a transaction
    await sequelize.transaction(async (t) => {
      // Update guest info
      await guest.update({
        rsvpStatus,
        rsvpDate: new Date(),
        slowDanceSong: slowDanceSong || guest.slowDanceSong,
        danceSong: danceSong || guest.danceSong,
        updatedAt: new Date()
      }, { transaction: t });

      // Handle actualAttendees if accepted
      if (rsvpStatus === 'accepted' && actualAttendees && actualAttendees.length > 0) {
        // Remove existing attendees
        await GuestAttendee.destroy({
          where: { guestId: guest.id },
          transaction: t
        });

        // Add new attendees
        const attendeesData = actualAttendees.map(attendee => ({
          name: attendee.name,
          mealChoice: attendee.mealChoice || null,
          guestId: guest.id
        }));
        await GuestAttendee.bulkCreate(attendeesData, { transaction: t });
      }
    });

    // If declined, send email
    if (rsvpStatus === 'declined') {
      const event = await Event.findByPk(guest.eventId);
      await emailService.sendDeclineMessage(
        guest.primaryEmail,
        guest.primaryName,
        event.title,
        process.env.PAYMENT_LINK
      );
    }

    // Get updated guest with all relations
    const updatedGuest = await Guest.findByPk(req.params.id, {
      include: [
        { model: GuestAttendee, as: 'actualAttendees' },
        { model: OtherGuest, as: 'otherGuests' }
      ]
    });

    res.json(updatedGuest);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Delete a guest
exports.deleteGuest = async (req, res) => {
  try {
    const guest = await Guest.findByPk(req.params.id);
    
    if (!guest) {
      return res.status(404).json({ msg: 'Guest not found' });
    }
    
    await guest.destroy();
    res.json({ msg: 'Guest removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};