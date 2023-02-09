const notes = require('express').Router();
const { readFromFile, readAndAppend, readAndRemove } = require('./apiHelpers/fsUtils');
const uuid = require('./apiHelpers/uuid');

notes.get('/', (req, res) =>
{
  readFromFile('../../db/db.json').then((data) => res.json(JSON.parse(data)));
});

notes.post('/', (req, res) =>
{
  const { title, text } = req.body;

  if (title && text)
  {
    const newNote = { title, text, id: uuid() };

    readAndAppend(newNote, '../../db/db.json');

    response = { status: 'great success', data: req.body };
    res.status(201).json(response);
  } else
  {
    res.status(400).json('Bad request');
  }
});

notes.delete('/:id', (req, res) =>
{
  const requestedID = req.params.id;

  if (requestedID)
  {
    readAndRemove(requestedID, '../../db/db.json');

    response = { status: 'Successfully Deleted' }
    res.status(201).json(response);
  } else
  {
    res.status(400).json('Bad request');
  }
});

module.exports = notes;