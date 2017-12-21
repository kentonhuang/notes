import { Meteor } from 'meteor/meteor';
import expect from 'expect';
import { Notes } from './notes'

if (Meteor.isServer) {
  describe('notes', function () {
    const noteOne = {
      _id: 'testNoteId1',
      title: 'My Title',
      body: 'My body or note',
      updateAt: 0,
      userId: 'testUserId1'
    };

    const noteTwo = {
      _id: 'testNoteId2',
      title: 'Things to do',
      body: 'Couch',
      updateAt: 0,
      userId: 'testUserId2'
    };

    beforeEach(function () {
      Notes.remove({});
      Notes.insert(noteOne);
      Notes.insert(noteTwo);
    });

    it('should insert new note', function () {
      const userId = 'testid';
      const _id = Meteor.server.method_handlers['notes.insert'].apply({userId});

      expect(Notes.findOne({ _id, userId})).toBeTruthy();
    });

    it('should ont insert note if not authenticated', function() {
      expect(() => {
        Meteor.server.method_handlers['notes.insert']();
      }).toThrow();
    })

    it('should remove note', function() {
      Meteor.server.method_handlers['notes.remove'].apply({userId: noteOne.userId}, [noteOne._id])

      expect(Notes.findOne({_id: noteOne.userId})).toBeFalsy();
    });

    it('should not remove note if unauthenticated', function () {
      expect(() => {
        Meteor.server.method_handlers['notes.remove'].apply({}, [noteOne._id]);
      }).toThrow();
    });

    it('should not remove note if invalid id', function () {
      expect(() => {
        Meteor.server.method_handlers['notes.remove'].apply({userId: noteOne.userId}, []);
      }).toThrow();
    })

    it('should update note', function () {
      const title = "This is an updated title";
      Meteor.server.method_handlers['notes.update'].apply({
        userId: noteOne.userId
      }, [
        noteOne._id,
        { title }
      ]);

      const note = Notes.findOne(noteOne._id);

      expect(note.updateAt).toBeGreaterThan(0);
      expect(note).toMatchObject({
        title,
        body: noteOne.body
      });
    });

    it('should throw error if extra updates', function (){
      const title = 'This is an updated title';
      const body = 'This is an updated body';
      const name = 'extra update'

      expect(() => {
        Meteor.server.method_handlers['notes.update'].apply({
          userId: noteOne.userId
        }, [
          noteOne._id,
          { title, body, name }
        ]);
      }).toThrow();
    });

    it('should not update note if user was not creator', function (){
      const title = "This is an updated title";
      Meteor.server.method_handlers['notes.update'].apply({
        userId: 'testid'
      }, [
        noteOne._id,
        { title }
      ]);

      const note = Notes.findOne(noteOne._id);

      expect(note).toMatchObject(noteOne);
    })

    it('should not remove note if unauthenticated', function () {
      expect(() => {
        Meteor.server.method_handlers['notes.update'].apply({}, [noteOne._id]);
      }).toThrow();
    });

    it('should not remove note if invalid id', function () {
      expect(() => {
        Meteor.server.method_handlers['notes.update'].apply({userId: noteOne.userId}, []);
      }).toThrow();
    })

    it('should return a users notes', function () {
      const res = Meteor.server.publish_handlers.notes.apply({ userId: noteOne.userId });
      const notes = res.fetch();

      expect(notes.length).toBe(1);
      expect(notes[0]).toEqual(noteOne);
    });

    it('should return a zero notes for user that has none', function () {
      const res = Meteor.server.publish_handlers.notes.apply({ userId: 'testid' });
      const notes = res.fetch();

      expect(notes.length).toBe(0);
    });


  });
}